"""Dependency-free checks of the published static surface; not a pentest."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re

root = Path(__file__).parent / 'dist'
errors = []
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.links, self.ids = path, [], set()
        self.csp, self.h1, self.lang, self.viewport = '', 0, False, False
        self.scripts = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids: errors.append(f'{self.path.name}: duplicate id {a["id"]}')
            self.ids.add(a['id'])
        if tag == 'html': self.lang = a.get('lang', '').startswith('es')
        if tag == 'h1': self.h1 += 1
        if tag == 'meta':
            if a.get('http-equiv', '').lower() == 'content-security-policy': self.csp = a.get('content', '')
            if a.get('name') == 'viewport': self.viewport = True
        if tag == 'script':
            if not a.get('src'): errors.append(f'{self.path.name}: inline script')
            self.scripts.append(a.get('src', ''))
        if tag in ('form', 'iframe', 'object', 'embed', 'video', 'audio'):
            errors.append(f'{self.path.name}: unexpected active surface {tag}')
        for k, v in attrs:
            if k.lower().startswith('on') or k == 'style': errors.append(f'{self.path.name}: inline {k}')
            if k in ('href', 'src') and v:
                if v.lower().startswith(('javascript:', 'data:text/html')): errors.append(f'{self.path.name}: unsafe URL')
                self.links.append((tag, k, v))
        if tag == 'a' and a.get('target') == '_blank' and 'noopener' not in a.get('rel', ''):
            errors.append(f'{self.path.name}: missing noopener')

pages = {}
for p in root.rglob('*.html'):
    page = Page(p)
    page.feed(p.read_text())
    pages[p.resolve()] = page
    if not page.lang or not page.viewport or page.h1 != 1: errors.append(f'{p.name}: lang/viewport/h1')
    for required in ("script-src 'self'", "style-src 'self'", "connect-src 'none'", "object-src 'none'", "base-uri 'none'", "form-action 'none'"):
        if required not in page.csp: errors.append(f'{p.name}: CSP missing {required}')
    if 'frame-ancestors' in page.csp: errors.append(f'{p.name}: ineffective meta frame-ancestors')
    if not re.search(r'<title>[^<]+</title>', p.read_text()): errors.append(f'{p.name}: missing title')

links = 0
for p, page in pages.items():
    for tag, attr, value in page.links:
        links += 1
        u = urlsplit(value)
        if u.scheme or u.netloc:
            if attr == 'src' or tag == 'link': errors.append(f'{p.name}: external resource {value}')
            continue
        target = (p.parent / unquote(u.path)).resolve() if u.path else p
        if target.is_dir(): target = target / 'index.html'
        if not target.is_relative_to(root.resolve()) or not target.exists(): errors.append(f'{p.name}: broken link {value}')
        elif u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids: errors.append(f'{p.name}: broken fragment {value}')

for p in root.rglob('*'):
    if not p.is_file() or p.suffix.lower() not in ('.html', '.js', '.css', '.svg', '.txt'): continue
    txt = p.read_text()
    if p.suffix == '.js':
        for pattern in (r'\binnerHTML\b', r'\bouterHTML\b', r'\beval\s*\(', r'new\s+Function\b', r'\bfetch\s*\(', r'\bXMLHttpRequest\b', r'\blocalStorage\b', r'\bsessionStorage\b', r'document\.cookie', r'insertAdjacentHTML', r'\bWebSocket\b', r'\bsendBeacon\b', r'navigator\.mediaDevices', r'\breadPixels\s*\(', r'\btoDataURL\s*\('):
            if re.search(pattern, txt): errors.append(f'{p.name}: prohibited JS capability {pattern}')
    if p.suffix == '.css' and re.search(r'@import|https?://|url\s*\(\s*[\"\']?//', txt): errors.append(f'{p.name}: external stylesheet resource')
    if re.search(r'-----BEGIN .*PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{20}|sk-[A-Za-z0-9]{24}', txt): errors.append(f'{p.name}: probable secret')
if len(pages) < 8: errors.append('Expected homepage and at least seven distinct policy pages')
print(f'{len(pages)} HTML documents; {links} links/resources checked; {len(errors)} failures')
for error in errors: print('FAIL:', error)
raise SystemExit(bool(errors))

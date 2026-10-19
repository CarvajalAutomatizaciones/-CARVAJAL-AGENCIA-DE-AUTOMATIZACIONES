"""Requisitos comerciales y destino exacto autorizado; no procesa pagos."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import hashlib, re
root=Path(__file__).parent/'dist'
qr=root/'assets/binance-pay-crv-original.png'
assert hashlib.sha256(qr.read_bytes()).hexdigest()=='4848d683f49f233218b400708e2df60ff1aa9a9f88f2f0f9ab86bed07acda6b9','El QR no coincide con el original autorizado'
class Parse(HTMLParser):
 def __init__(self): super().__init__(); self.text=[]; self.href=[]
 def handle_data(self,data): self.text.append(data)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='a' and a.get('href'): self.href.append(a['href'])
for file in [root/'index.html',root/'legal/suscripciones.html']:
 parsed=Parse(); parsed.feed(file.read_text()); txt=' '.join(parsed.text)
 assert '4,99' in txt and '9,99' in txt,(file.name,'Faltan importes autorizados')
 assert all(x in txt for x in ['Inglés','Gimnasio','Chef','USD','Binance Pay']),(file.name,'Faltan planes/moneda/medio')
 assert '62230618' in txt.replace(' ',''),(file.name,'Falta contacto autorizado')
 assert not re.search(r'(?:mensualidad|precio|precios)\s+(?:está[n]?\s+)?(?:aún\s+)?(?:por definir|por confirmar|no está[n]? definid)',txt,re.I),(file.name,'Precio aún marcado pendiente')
for file in root.rglob('*.html'):
 parsed=Parse(); parsed.feed(file.read_text())
 for link in parsed.href:
  u=urlsplit(link)
  if u.netloc=='wa.me': assert u.path=='/59162230618',(file.name,'WhatsApp incorrecto')
  if 'binance' in u.netloc: assert link=='https://app.binance.com/uni-qr/AKe6U7bh',(file.name,'Enlace Binance no corresponde al QR verificado')
print('PASS: importes, planes, USD, Binance Pay, contacto y QR original íntegro.')

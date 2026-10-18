const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function element(interest) {
  return {dataset:{interest},attributes:{},textContent:'',hidden:true,
    setAttribute(key,value){this.attributes[key]=value;},
    addEventListener(type,fn){this[type]=fn;}};
}
const result=element();
const link=element();
const buttons=['cocina','ingles','gimnasio','desconocido'].map(element);
const document={getElementById:id=>id==='recommendation'?result:id==='recommend-link'?link:null,
  querySelectorAll:()=>buttons};
vm.runInNewContext(fs.readFileSync(__dirname+'/dist/app.js','utf8'),{document});
assert.equal(result.textContent,'');
for (const [index,fragment,word] of [[0,'#chef','Chef'],[1,'#ingles','Inglés'],[2,'#movimiento','Gimnasio']]) {
  buttons[index].click();
  assert.ok(result.textContent.includes(word));
  assert.equal(link.attributes.href,fragment);
  assert.equal(link.hidden,false);
  assert.equal(buttons.filter(b=>b.attributes['aria-pressed']==='true').length,1);
}
const prior=result.textContent;
buttons[3].click();
assert.equal(result.textContent,prior);
console.log('PASS: tres intereses, enlaces, selección única y rechazo de interés desconocido.');

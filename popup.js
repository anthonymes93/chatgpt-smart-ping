const ids=['enabled','background','long','threshold','sound','volume','notify'];
const defaults={enabled:true,background:true,long:true,threshold:30,sound:'soft',volume:65,notify:false};
const el=id=>document.getElementById(id);
function render(){el('thresholdValue').textContent=el('threshold').value+' sec';el('volumeValue').textContent=el('volume').value+'%';el('status').textContent=el('enabled').checked?'ON':'OFF';el('status').style.color=el('enabled').checked?'#80e4ac':'#a0a8b8';el('threshold').disabled=!el('long').checked;}
chrome.storage.sync.get(defaults).then(s=>{ids.forEach(id=>{if(typeof defaults[id]==='boolean')el(id).checked=s[id];else el(id).value=s[id]});render()});
ids.forEach(id=>el(id).addEventListener('input',()=>{const value=typeof defaults[id]==='boolean'?el(id).checked:typeof defaults[id]==='number'?Number(el(id).value):el(id).value;chrome.storage.sync.set({[id]:value});render()}));
el('test').addEventListener('click',()=>chrome.runtime.sendMessage({type:'TEST_SOUND',sound:el('sound').value,volume:Number(el('volume').value)}));
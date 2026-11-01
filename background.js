const defaults = {enabled:true,background:true,long:true,threshold:30,sound:'soft',volume:65,notify:false};
let creating;
async function ensureOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  if (!creating) creating = chrome.offscreen.createDocument({url:'offscreen.html',reasons:['AUDIO_PLAYBACK'],justification:'Play completion alert audio in background tabs'}).finally(()=>creating=null);
  await creating;
}
async function ping(sound,volume) {
  await ensureOffscreen();
  await chrome.runtime.sendMessage({type:'PLAY_SOUND',sound,volume});
}
chrome.runtime.onMessage.addListener((msg,sender) => {
  if(msg.type==='TEST_SOUND') return ping(msg.sound,msg.volume).catch(console.error);
  if(msg.type!=='RESPONSE_FINISHED') return;
  (async()=>{
    const s = {...defaults,...await chrome.storage.sync.get(defaults)};
    if(!s.enabled || !((s.background && msg.away)||(s.long && msg.duration>=s.threshold*1000))) return;
    await ping(s.sound,s.volume);
    if(s.notify) await chrome.notifications.create({type:'basic',iconUrl:'icon.png',title:'ChatGPT finished',message:'Your response is ready.'});
  })().catch(console.error);
});
chrome.runtime.onInstalled.addListener(async()=>{const existing=await chrome.storage.sync.get(null);await chrome.storage.sync.set({...defaults,...existing});});
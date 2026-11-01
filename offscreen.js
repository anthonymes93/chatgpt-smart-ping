let ctx;
chrome.runtime.onMessage.addListener(msg=>{
  if(msg.type!=='PLAY_SOUND') return;
  ctx ||= new AudioContext();
  ctx.resume().then(()=>{
    const t=ctx.currentTime;
    const presets={soft:[[660,0],[880,.13]],digital:[[880,0],[1320,.1]],bell:[[784,0],[1047,.17],[1568,.34]]};
    for(const [freq,offset] of (presets[msg.sound]||presets.soft)){
      const osc=ctx.createOscillator(), gain=ctx.createGain();
      osc.type=msg.sound==='digital'?'triangle':'sine';
      osc.frequency.value=freq;
      const start=t+offset;
      gain.gain.setValueAtTime(.0001,start);
      gain.gain.exponentialRampToValueAtTime(Math.max(.0001,(msg.volume/100)*.13),start+.015);
      gain.gain.exponentialRampToValueAtTime(.0001,start+.22);
      osc.connect(gain).connect(ctx.destination);osc.start(start);osc.stop(start+.23);
    }
  });
});
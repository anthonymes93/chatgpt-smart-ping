(() => {
  if (window.__smartPingInstalled) return;
  window.__smartPingInstalled = true;
  let generating = false, started = 0, awayDuring = false, finishedTimer = null;
  const isAway = () => document.hidden || !document.hasFocus();
  const stopButton = () => document.querySelector('[data-testid="stop-button"], button[aria-label="Stop streaming"], button[aria-label="Stop generating"], button[aria-label="Stop response"]');
  const check = () => {
    const active = !!stopButton();
    if (active && !generating) {
      generating = true; started = Date.now(); awayDuring = isAway();
      clearTimeout(finishedTimer);
    } else if (active && generating) {
      if (isAway()) awayDuring = true;
      clearTimeout(finishedTimer);
    } else if (!active && generating && !finishedTimer) {
      finishedTimer = setTimeout(() => {
        finishedTimer = null;
        if (stopButton()) return;
        generating = false;
        chrome.runtime.sendMessage({type:'RESPONSE_FINISHED',duration:Date.now()-started,away:awayDuring||isAway()}).catch(()=>{});
      }, 450);
    }
  };
  document.addEventListener('visibilitychange', () => {if (generating && isAway()) awayDuring = true;});
  window.addEventListener('blur', () => {if(generating) awayDuring = true;});
  new MutationObserver(check).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['aria-label','data-testid']});
  check();
})();
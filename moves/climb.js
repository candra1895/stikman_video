(() => {
  const M=window.StickmanMoves;
  const reach={pelvis:0,chest:0,head:-2,shoulderFront:-65,elbowFront:20,shoulderBack:-30,elbowBack:35,hipFront:-12,kneeFront:38,ankleFront:-8,hipBack:16,kneeBack:18,ankleBack:6,bodyY:0};
  const pull={pelvis:2,chest:8,head:-3,shoulderFront:-35,elbowFront:55,shoulderBack:-62,elbowBack:18,hipFront:20,kneeFront:22,ankleFront:5,hipBack:-14,kneeBack:36,ankleBack:-6,bodyY:-8};
  const reachOther=M._mirrorPose(reach);
  const pullOther=M._mirrorPose(pull);
  const poses=[reach,pull,reachOther,pullOther];

  M.climb=(s,cycles=1,opts={})=>{
    const tl=M._timeline(),cycle=opts.cycleDuration||1.0,step=cycle/poses.length;
    const rise=opts.rise==null?95*cycles:opts.rise;
    tl.to(s.root,{y:"-="+rise,duration:cycle*cycles,ease:"none"},0);
    for(let c=0;c<cycles;c++) M._addPoseSeries(s,tl,poses,c*cycle,step,"sine.inOut");
    return tl;
  };
})();
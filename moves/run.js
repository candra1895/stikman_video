(() => {
  const M=window.StickmanMoves;
  const contact={pelvis:-3,chest:5,head:-2,shoulderFront:27,elbowFront:-12,shoulderBack:-27,elbowBack:13,hipFront:-32,kneeFront:10,ankleFront:12,hipBack:25,kneeBack:20,ankleBack:-8,bodyY:-1};
  const compression={pelvis:-1,chest:4,head:-1,shoulderFront:15,elbowFront:4,shoulderBack:-15,elbowBack:-3,hipFront:-12,kneeFront:28,ankleFront:3,hipBack:10,kneeBack:12,ankleBack:-6,bodyY:5};
  const flight={pelvis:2,chest:1,head:0,shoulderFront:-10,elbowFront:12,shoulderBack:10,elbowBack:-10,hipFront:18,kneeFront:38,ankleFront:-10,hipBack:-22,kneeBack:32,ankleBack:12,bodyY:-9};
  const half=[contact,compression,flight];
  const full=[...half,...half.map(M._mirrorPose)];

  M.run=(s,cycles=1,opts={})=>{
    const tl=M._timeline(),cycle=opts.cycleDuration||.58,step=cycle/full.length;
    const distance=opts.distance==null?250*cycles:opts.distance;
    tl.to(s.root,{x:"+="+distance,duration:cycle*cycles,ease:"none"},0);
    if(s.shadow) tl.to(s.shadow,{x:"+="+distance,duration:cycle*cycles,ease:"none"},0);
    for(let c=0;c<cycles;c++){
      M._addPoseSeries(s,tl,full,c*cycle,step,"power1.inOut");
      if(s.shadow) full.forEach((p,i)=>tl.to(s.shadow,{scaleX:p.bodyY<0?.72:.92,opacity:p.bodyY<0?.14:.23,duration:step,ease:"sine.inOut"},c*cycle+i*step));
    }
    return tl;
  };
})();
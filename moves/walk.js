(() => {
  const M=window.StickmanMoves;
  const contact={pelvis:-2,chest:2,head:-1,shoulderFront:20,elbowFront:-5,shoulderBack:-20,elbowBack:7,hipFront:-23,kneeFront:6,ankleFront:10,hipBack:20,kneeBack:12,ankleBack:-5,bodyY:0};
  const down={pelvis:-1,chest:1,head:0,shoulderFront:13,elbowFront:2,shoulderBack:-13,elbowBack:4,hipFront:-13,kneeFront:18,ankleFront:3,hipBack:12,kneeBack:5,ankleBack:-8,bodyY:4};
  const passing={pelvis:1,chest:-1,head:1,shoulderFront:0,elbowFront:8,shoulderBack:0,elbowBack:-6,hipFront:8,kneeFront:30,ankleFront:-5,hipBack:-9,kneeBack:3,ankleBack:8,bodyY:-1};
  const up={pelvis:2,chest:-2,head:1,shoulderFront:-13,elbowFront:8,shoulderBack:13,elbowBack:-5,hipFront:17,kneeFront:20,ankleFront:-10,hipBack:-17,kneeBack:8,ankleBack:10,bodyY:-4};
  const half=[contact,down,passing,up];
  const full=[...half,...half.map(M._mirrorPose)];

  M.walk=(s,cycles=1,opts={})=>{
    const tl=M._timeline();
    const cycle=opts.cycleDuration||.92;
    const step=cycle/full.length;
    const distance=opts.distance==null?190*cycles:opts.distance;
    tl.to(s.root,{x:"+="+distance,duration:cycle*cycles,ease:"none"},0);
    if(s.shadow) tl.to(s.shadow,{x:"+="+distance,duration:cycle*cycles,ease:"none"},0);
    for(let c=0;c<cycles;c++){
      M._addPoseSeries(s,tl,full,c*cycle,step,"sine.inOut");
      if(s.shadow){
        full.forEach((p,i)=>{
          const airborne=p.bodyY<0;
          tl.to(s.shadow,{scaleX:airborne?.82:.94,scaleY:airborne?.96:.84,duration:step,ease:"sine.inOut"},c*cycle+i*step);
        });
      }
    }
    return tl;
  };

  M.idle=(s,opts={})=>{
    const tl=M._timeline();
    const d=opts.duration||1.4;
    s.pose(tl,{bodyY:-2,chest:-1,head:1},0,d/2,"sine.inOut");
    s.pose(tl,{bodyY:0,chest:0,head:0},d/2,d/2,"sine.inOut");
    return tl;
  };
})();
(() => {
  const M=window.StickmanMoves;
  const ant={pelvis:0,chest:-4,head:3,shoulderFront:18,elbowFront:10,shoulderBack:-18,elbowBack:-8,hipFront:14,kneeFront:42,ankleFront:8,hipBack:-12,kneeBack:40,ankleBack:-6,bodyY:7};
  const takeoff={pelvis:2,chest:4,head:-2,shoulderFront:-35,elbowFront:8,shoulderBack:35,elbowBack:-8,hipFront:-8,kneeFront:8,ankleFront:-6,hipBack:8,kneeBack:8,ankleBack:6,bodyY:-5};
  const air={pelvis:1,chest:2,head:-1,shoulderFront:-50,elbowFront:14,shoulderBack:50,elbowBack:-14,hipFront:-18,kneeFront:34,ankleFront:-8,hipBack:18,kneeBack:34,ankleBack:8,bodyY:-8};
  const land={pelvis:-1,chest:-5,head:3,shoulderFront:18,elbowFront:10,shoulderBack:-18,elbowBack:-10,hipFront:13,kneeFront:44,ankleFront:8,hipBack:-12,kneeBack:43,ankleBack:-8,bodyY:8};

  M.jump=(s,opts={})=>{
    const tl=M._timeline(),h=opts.height||110,distance=opts.distance||0;
    s.pose(tl,ant,0,.22,"power2.out");
    s.pose(tl,takeoff,.22,.16,"power3.in");
    tl.to(s.root,{y:-h,x:"+="+distance*.5,duration:.32,ease:"power2.out"},.38);
    s.pose(tl,air,.38,.28,"sine.inOut");
    tl.to(s.root,{y:0,x:"+="+distance*.5,duration:.32,ease:"power2.in"},.70);
    if(s.shadow) tl.to(s.shadow,{scaleX:.58,opacity:.10,duration:.32,ease:"power2.out"},.38).to(s.shadow,{scaleX:.94,opacity:.22,duration:.32,ease:"power2.in"},.70);
    s.pose(tl,land,.78,.18,"power3.in");
    s.pose(tl,{},.96,.28,"back.out(1.25)");
    return tl;
  };
})();
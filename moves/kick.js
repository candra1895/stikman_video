(() => {
  const M=window.StickmanMoves;
  const prep={pelvis:-4,chest:-7,head:3,shoulderFront:-24,elbowFront:18,shoulderBack:25,elbowBack:-14,hipFront:18,kneeFront:42,ankleFront:12,hipBack:-6,kneeBack:9,ankleBack:-5,bodyY:3};
  const chamber={pelvis:1,chest:3,head:-1,shoulderFront:15,elbowFront:-7,shoulderBack:-15,elbowBack:8,hipFront:-38,kneeFront:55,ankleFront:-5,hipBack:4,kneeBack:7,ankleBack:0,bodyY:-2};
  const impact={pelvis:5,chest:9,head:-3,shoulderFront:24,elbowFront:-9,shoulderBack:-24,elbowBack:10,hipFront:-76,kneeFront:8,ankleFront:-8,hipBack:5,kneeBack:5,bodyY:-2};
  const retract={pelvis:2,chest:3,head:-1,shoulderFront:10,elbowFront:0,shoulderBack:-10,elbowBack:0,hipFront:-35,kneeFront:46,ankleFront:4,hipBack:2,kneeBack:5};

  M.kick=(s,opts={})=>{
    const tl=M._timeline();
    s.pose(tl,prep,0,.24,"power2.out");
    s.pose(tl,chamber,.24,.16,"power3.inOut");
    s.pose(tl,impact,.40,.15,"power4.in");
    if(opts.target) tl.to(opts.target,{x:"+=230",y:"-=18",rotation:20,scale:1.04,duration:.45,ease:"power3.out"},.55);
    if(opts.impact) tl.fromTo(opts.impact,{opacity:0,scale:0},{opacity:1,scale:1,duration:.10,ease:"back.out(2.4)"},.55).to(opts.impact,{opacity:0,scale:1.35,duration:.25},.68);
    s.pose(tl,retract,.62,.16,"power2.out");
    s.pose(tl,{},.78,.28,"back.out(1.3)");
    return tl;
  };
})();
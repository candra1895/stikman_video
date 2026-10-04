(() => {
  const M=window.StickmanMoves;
  const prep={pelvis:-3,chest:-7,head:3,shoulderFront:-18,elbowFront:38,shoulderBack:12,elbowBack:-18,hipFront:-4,kneeFront:8,hipBack:8,kneeBack:8};
  const hit={pelvis:5,chest:12,head:-4,shoulderFront:-72,elbowFront:0,shoulderBack:28,elbowBack:-25,hipFront:-8,kneeFront:6,hipBack:10,kneeBack:10};
  const recoil={pelvis:1,chest:4,head:-1,shoulderFront:-35,elbowFront:18,shoulderBack:17,elbowBack:-12};

  M.punch=(s,opts={})=>{
    const tl=M._timeline();
    s.pose(tl,prep,0,.20,"power2.out");
    s.pose(tl,hit,.20,.12,"power4.in");
    if(opts.target) tl.to(opts.target,{x:"+=55",rotation:8,duration:.20,ease:"power3.out"},.32);
    s.pose(tl,recoil,.32,.14,"power2.out");
    s.pose(tl,{},.46,.24,"power2.out");
    return tl;
  };
})();
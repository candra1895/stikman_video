(() => {
  const M=window.StickmanMoves;
  const pose={pelvis:0,chest:-2,head:-3,shoulderFront:-55,elbowFront:12,shoulderBack:55,elbowBack:-12,hipFront:-7,kneeFront:7,hipBack:7,kneeBack:7,bodyY:-2};
  M.victory=(s,opts={})=>{
    const tl=M._timeline();
    s.pose(tl,pose,0,.28,"back.out(1.4)");
    tl.to(s.root,{y:-10,duration:.16,ease:"power2.out"}).to(s.root,{y:0,duration:.22,ease:"bounce.out"},.16);
    return tl;
  };
})();
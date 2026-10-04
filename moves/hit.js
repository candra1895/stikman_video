(() => {
  const M=window.StickmanMoves;
  const recoil={pelvis:-9,chest:-16,head:12,shoulderFront:25,elbowFront:18,shoulderBack:-28,elbowBack:-15,hipFront:12,kneeFront:22,hipBack:-8,kneeBack:20,bodyY:3};
  M.hit=(s,opts={})=>{
    const tl=M._timeline();
    s.pose(tl,recoil,0,.12,"power3.out");
    tl.to(s.root,{x:"-="+(opts.knockback||26),rotation:-7,duration:.18,ease:"power3.out"},0);
    tl.to(s.root,{x:"+=4",duration:.04,repeat:3,yoyo:true,ease:"none"},.18);
    s.pose(tl,{},.30,.34,"back.out(1.2)");
    tl.to(s.root,{rotation:0,y:0,duration:.34,ease:"back.out(1.2)"},.30);
    return tl;
  };
})();
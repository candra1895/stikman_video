(() => {
  const S = window.StickmanSet;
  if (!S) throw new Error("StickmanSet rig must load before emotion animations");
  const P = o => S.makePose(o);
  S.animations = S.animations || {};

  S.animations.wave = ({id="hero"})=>{
    const t=S.makeChildTimeline();
    const up=P({elbowFront:[171,139],wristFront:[177,93]});
    const left=P({elbowFront:[171,139],wristFront:[157,87]});
    const right=P({elbowFront:[171,139],wristFront:[195,96]});
    S.addPose(t,id,up,0,.22,"power2.out");
    S.addPose(t,id,left,.22,.16,"sine.inOut");
    S.addPose(t,id,right,.38,.16,"sine.inOut");
    S.addPose(t,id,left,.54,.16,"sine.inOut");
    S.addPose(t,id,S.poses.stand,.70,.25,"power2.out");
    return t;
  };

  S.animations.nod = ({id="hero"})=>{
    const t=S.makeChildTimeline();
    const down=P({head:[132,74]});
    S.addPose(t,id,down,0,.18,"sine.inOut");
    S.addPose(t,id,S.poses.stand,.18,.18,"sine.inOut");
    S.addPose(t,id,down,.36,.18,"sine.inOut");
    S.addPose(t,id,S.poses.stand,.54,.18,"sine.inOut");
    return t;
  };

  S.animations.shakeHead = ({id="hero"})=>{
    const t=S.makeChildTimeline();
    const l=P({head:[124,66]});
    const r=P({head:[140,66]});
    S.addPose(t,id,l,0,.14,"sine.inOut");
    S.addPose(t,id,r,.14,.14,"sine.inOut");
    S.addPose(t,id,l,.28,.14,"sine.inOut");
    S.addPose(t,id,S.poses.stand,.42,.18,"sine.inOut");
    return t;
  };

  S.animations.happy = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    const joy=P({head:[132,60],elbowFront:[176,151],wristFront:[199,109],elbowBack:[86,151],wristBack:[62,109],kneeFront:[160,288],ankleFront:[170,345],kneeBack:[102,289],ankleBack:[93,345]});
    S.addPose(t,id,joy,0,.20,"back.out(1.4)");
    if(root)t.to(root,{y:-16,duration:.18,ease:"power2.out"},0).to(root,{y:0,duration:.22,ease:"bounce.out"},.18);
    S.addPose(t,id,S.poses.stand,.40,.28,"power2.out");
    return t;
  };

  S.animations.sad = ({id="hero"})=>{
    const t=S.makeChildTimeline();
    const p=P({head:[127,76],neck:[128,119],chest:[127,171],pelvis:[130,231],elbowFront:[151,218],wristFront:[158,274],elbowBack:[108,218],wristBack:[101,274]});
    S.addPose(t,id,p,0,.40,"power2.out");
    return t;
  };

  S.animations.angry = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    const p=P({head:[138,67],chest:[138,165],pelvis:[134,227],elbowFront:[165,197],wristFront:[173,245],elbowBack:[104,197],wristBack:[95,245]});
    S.addPose(t,id,p,0,.22,"power3.out");
    if(root)t.to(root,{x:"+=4",duration:.06,repeat:3,yoyo:true,ease:"none"},.22);
    return t;
  };

  S.animations.clap = ({id="hero"})=>{
    const t=S.makeChildTimeline();
    const open=P({elbowFront:[168,186],wristFront:[190,205],elbowBack:[92,186],wristBack:[70,205]});
    const close=P({elbowFront:[154,183],wristFront:[136,190],elbowBack:[106,183],wristBack:[124,190]});
    S.addPose(t,id,open,0,.18,"power2.out");
    for(let i=0;i<3;i++){
      S.addPose(t,id,close,.18+i*.28,.12,"power3.in");
      S.addPose(t,id,open,.30+i*.28,.16,"power2.out");
    }
    return t;
  };
})();
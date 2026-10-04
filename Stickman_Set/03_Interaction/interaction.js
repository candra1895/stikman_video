(() => {
  const S = window.StickmanSet;
  if (!S) throw new Error("StickmanSet rig must load before interaction animations");
  const P = o => S.makePose(o);
  S.animations = S.animations || {};

  S.animations.point = ({id="hero",side="front"})=>{
    const t=S.makeChildTimeline();
    const p = side==="front"
      ? P({elbowFront:[177,166],wristFront:[228,160],elbowBack:[106,207],wristBack:[96,264]})
      : P({elbowBack:[83,166],wristBack:[32,160],elbowFront:[154,207],wristFront:[164,264]});
    S.addPose(t,id,p,0,.28,"power2.out");
    return t;
  };

  S.animations.think = ({id="hero"})=>{
    const t=S.makeChildTimeline();
    const p=P({head:[128,69],elbowFront:[157,195],wristFront:[147,112],elbowBack:[107,210],wristBack:[98,266]});
    S.addPose(t,id,p,0,.30,"power2.out");
    S.addPose(t,id,S.poses.stand,.90,.30,"power2.out");
    return t;
  };

  S.animations.push = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    const prep=P({head:[136,68],chest:[136,169],pelvis:[132,229],elbowFront:[168,184],wristFront:[196,183],elbowBack:[151,190],wristBack:[180,189],kneeFront:[158,299],ankleFront:[170,356],kneeBack:[109,297],ankleBack:[99,356]});
    const drive=P({head:[143,66],chest:[141,163],pelvis:[137,226],elbowFront:[192,166],wristFront:[237,166],elbowBack:[181,171],wristBack:[224,171],kneeFront:[167,292],ankleFront:[191,348],kneeBack:[113,304],ankleBack:[101,359]});
    S.addPose(t,id,prep,0,.22,"power2.out");
    S.addPose(t,id,drive,.22,.26,"power3.inOut");
    if(root)t.to(root,{x:"+=18",duration:.26,ease:"power3.inOut"},.22);
    return t;
  };

  S.animations.pull = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    const reach=P({elbowFront:[182,171],wristFront:[229,168],elbowBack:[171,177],wristBack:[215,176]});
    const pull=P({head:[122,70],chest:[122,169],pelvis:[125,230],elbowFront:[155,194],wristFront:[171,186],elbowBack:[145,198],wristBack:[163,190]});
    S.addPose(t,id,reach,0,.20,"power2.out");
    S.addPose(t,id,pull,.20,.30,"power3.inOut");
    if(root)t.to(root,{x:"-=18",duration:.30,ease:"power3.inOut"},.20);
    return t;
  };

  S.animations.type = ({id="hero"})=>{
    const t=S.makeChildTimeline();
    const base=P({elbowFront:[159,197],wristFront:[181,211],elbowBack:[102,199],wristBack:[123,213]});
    const a=P({elbowFront:[159,197],wristFront:[181,207],elbowBack:[102,199],wristBack:[123,216]});
    const b=P({elbowFront:[159,197],wristFront:[181,216],elbowBack:[102,199],wristBack:[123,207]});
    S.addPose(t,id,base,0,.15,"power2.out");
    for(let i=0;i<4;i++){
      S.addPose(t,id,i%2===0?a:b,.15+i*.14,.14,"sine.inOut");
    }
    return t;
  };
})();
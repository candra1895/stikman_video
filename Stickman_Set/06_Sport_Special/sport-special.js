(() => {
  const S = window.StickmanSet;
  if (!S) throw new Error("StickmanSet rig must load before sport animations");
  const P = o => S.makePose(o);
  S.animations = S.animations || {};

  S.animations.squat = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    const down=P({head:[132,88],neck:[130,130],chest:[130,177],pelvis:[130,241],kneeFront:[174,282],ankleFront:[165,344],kneeBack:[101,282],ankleBack:[106,344],elbowFront:[160,206],wristFront:[185,209],elbowBack:[100,206],wristBack:[75,209]});
    S.addPose(t,id,down,0,.32,"power2.inOut");
    if(root)t.to(root,{y:8,duration:.32,ease:"power2.inOut"},0);
    S.addPose(t,id,S.poses.stand,.32,.34,"power2.inOut");
    if(root)t.to(root,{y:0,duration:.34,ease:"power2.inOut"},.32);
    return t;
  };

  S.animations.stretch = ({id="hero"})=>{
    const t=S.makeChildTimeline();
    const up=P({head:[132,60],elbowFront:[152,124],wristFront:[161,78],elbowBack:[108,124],wristBack:[99,78],chest:[130,158],pelvis:[130,225]});
    S.addPose(t,id,up,0,.34,"power2.out");
    S.addPose(t,id,S.poses.stand,.70,.30,"power2.out");
    return t;
  };

  S.animations.danceBounce = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    const l=P({head:[126,63],chest:[126,160],pelvis:[125,224],elbowFront:[173,176],wristFront:[197,144],elbowBack:[90,184],wristBack:[74,223],kneeFront:[155,292],ankleFront:[167,350],kneeBack:[100,293],ankleBack:[92,349]});
    const r=P({head:[138,63],chest:[136,160],pelvis:[137,224],elbowFront:[169,184],wristFront:[185,223],elbowBack:[87,176],wristBack:[63,144],kneeFront:[160,293],ankleFront:[168,349],kneeBack:[105,292],ankleBack:[93,350]});
    for(let i=0;i<4;i++){
      S.addPose(t,id,i%2===0?l:r,i*.22,.22,"sine.inOut");
      if(root)t.to(root,{y:-5,duration:.11,ease:"sine.out"},i*.22).to(root,{y:0,duration:.11,ease:"sine.in"},i*.22+.11);
    }
    return t;
  };

  S.animations.kickBall = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    const chamber=P({kneeFront:[170,253],ankleFront:[198,288],toeFront:[224,292],elbowFront:[151,195],wristFront:[166,242],elbowBack:[108,194],wristBack:[93,242]});
    const hit=P({kneeFront:[178,228],ankleFront:[231,231],toeFront:[258,232],elbowFront:[143,204],wristFront:[132,252],elbowBack:[116,204],wristBack:[128,252]});
    S.addPose(t,id,chamber,0,.22,"power2.out");
    S.addPose(t,id,hit,.22,.16,"power4.in");
    S.addPose(t,id,S.poses.stand,.38,.28,"back.out(1.3)");
    if(root)t.to(root,{x:"+=18",duration:.16,ease:"power4.in"},.22).to(root,{x:"-=8",duration:.28,ease:"power2.out"},.38);
    return t;
  };
})();
(() => {
  const S = window.StickmanSet;
  if (!S) throw new Error("StickmanSet rig must load before vertical animations");
  const P = o => S.makePose(o);
  S.animations = S.animations || {};

  const crouch = P({
    head:[132,86], neck:[130,128], chest:[130,176], pelvis:[130,238],
    elbowFront:[151,217], wristFront:[157,270], elbowBack:[109,217], wristBack:[104,270],
    kneeFront:[174,276], ankleFront:[168,338], toeFront:[199,343],
    kneeBack:[100,278], ankleBack:[101,338], toeBack:[130,343]
  });

  const jumpAnt = P({
    head:[131,78], neck:[130,122], chest:[130,173], pelvis:[130,237],
    elbowFront:[151,206], wristFront:[171,249], elbowBack:[108,206], wristBack:[89,249],
    kneeFront:[168,281], ankleFront:[158,342], toeFront:[188,346],
    kneeBack:[103,282], ankleBack:[108,342], toeBack:[137,346]
  });

  const jumpAir = P({
    head:[134,60], neck:[132,106], chest:[133,155], pelvis:[134,216],
    elbowFront:[176,176], wristFront:[202,142], elbowBack:[91,178], wristBack:[64,145],
    kneeFront:[169,268], ankleFront:[186,308], toeFront:[211,313],
    kneeBack:[104,270], ankleBack:[87,308], toeBack:[112,314]
  });

  const land = P({
    head:[131,82], neck:[130,125], chest:[130,178], pelvis:[130,240],
    elbowFront:[149,214], wristFront:[165,263], elbowBack:[111,214], wristBack:[95,263],
    kneeFront:[173,282], ankleFront:[164,342], toeFront:[194,346],
    kneeBack:[101,282], ankleBack:[106,342], toeBack:[136,346]
  });

  S.animations.crouch = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    S.addPose(t,id,crouch,0,.34,"power2.out");
    if(root)t.to(root,{y:8,duration:.34,ease:"power2.out"},0);
    return t;
  };

  S.animations.standUp = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    S.addPose(t,id,S.poses.stand,0,.36,"back.out(1.2)");
    if(root)t.to(root,{y:0,duration:.36,ease:"back.out(1.2)"},0);
    return t;
  };

  S.animations.jump = ({id="hero",root,shadow,height=90})=>{
    const t=S.makeChildTimeline();
    S.addPose(t,id,jumpAnt,0,.22,"power2.out");
    S.addPose(t,id,jumpAir,.22,.22,"power3.in");
    if(root)t.to(root,{y:-height,duration:.34,ease:"power2.out"},.22)
      .to(root,{y:0,duration:.34,ease:"power2.in"},.56);
    if(shadow)t.to(shadow,{scaleX:.62,opacity:.11,duration:.34,ease:"power2.out"},.22)
      .to(shadow,{scaleX:.90,opacity:.22,duration:.34,ease:"power2.in"},.56);
    S.addPose(t,id,land,.56,.18,"power3.in");
    S.addPose(t,id,S.poses.stand,.74,.28,"back.out(1.35)");
    return t;
  };

  S.animations.jumpHigh = opts => S.animations.jump({...opts,height:145});

  S.animations.fall = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    const falling=P({head:[143,63],chest:[139,164],pelvis:[132,226],elbowFront:[174,198],wristFront:[198,242],elbowBack:[102,190],wristBack:[76,229],kneeFront:[165,282],ankleFront:[187,323],kneeBack:[105,283],ankleBack:[87,325]});
    S.addPose(t,id,falling,0,.22,"power2.in");
    if(root)t.to(root,{y:58,rotation:58,duration:.46,ease:"power3.in"},0);
    return t;
  };

  S.animations.getUp = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    if(root)t.to(root,{rotation:18,y:28,duration:.22,ease:"power2.out"},0)
      .to(root,{rotation:0,y:0,duration:.40,ease:"back.out(1.25)"},.22);
    S.addPose(t,id,crouch,0,.22,"power2.out");
    S.addPose(t,id,S.poses.stand,.22,.40,"back.out(1.25)");
    return t;
  };
})();
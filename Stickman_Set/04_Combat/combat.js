(() => {
  const S = window.StickmanSet;
  if (!S) throw new Error("StickmanSet rig must load before combat");
  const P = o => S.makePose(o);
  S.animations = S.animations || {};

  const kickPrep = P({
    head:[128,69], chest:[126,168], pelvis:[126,230],
    elbowFront:[103,194], wristFront:[88,238],
    elbowBack:[151,192], wristBack:[166,236],
    kneeFront:[157,283], ankleFront:[139,323], toeFront:[162,335],
    kneeBack:[112,302], ankleBack:[105,358], toeBack:[136,360]
  });
  const kickChamber = P({
    head:[132,66], chest:[132,163], pelvis:[132,226],
    elbowFront:[151,191], wristFront:[169,232],
    elbowBack:[108,190], wristBack:[91,231],
    kneeFront:[171,249], ankleFront:[199,278], toeFront:[225,279],
    kneeBack:[118,300], ankleBack:[110,358], toeBack:[140,360]
  });
  const kickImpact = P({
    head:[136,65], chest:[137,162], pelvis:[136,226],
    elbowFront:[149,202], wristFront:[137,250],
    elbowBack:[111,202], wristBack:[123,251],
    kneeFront:[182,226], ankleFront:[236,225], toeFront:[258,225],
    kneeBack:[118,302], ankleBack:[108,358], toeBack:[139,360]
  });
  const kickRetract = P({
    head:[133,66], chest:[133,164], pelvis:[133,226],
    elbowFront:[147,204], wristFront:[153,258],
    elbowBack:[113,204], wristBack:[108,258],
    kneeFront:[171,257], ankleFront:[194,292], toeFront:[217,296],
    kneeBack:[117,300], ankleBack:[109,358], toeBack:[139,360]
  });

  S.poses.kickFront = {prep:kickPrep,chamber:kickChamber,impact:kickImpact,retract:kickRetract};

  S.animations.kickFront = ({id="hero", root, shadow, target, impact, camera, stepX=55}) => {
    const t=S.makeChildTimeline();
    if(root)t.to(root,{x:"+="+stepX,y:3,rotation:-3,duration:.30,ease:"power2.out"},0);
    if(shadow)t.to(shadow,{x:"+="+stepX,scaleX:1.02,duration:.30,ease:"power2.out"},0);
    S.addPose(t,id,kickPrep,0,.30,"power2.out");
    S.addPose(t,id,kickChamber,.30,.18,"power3.inOut");
    if(root)t.to(root,{x:"+=35",y:-2,rotation:3,duration:.16,ease:"power4.in"},.48);
    if(shadow)t.to(shadow,{x:"+=35",scaleX:.78,duration:.16,ease:"power4.in"},.48);
    S.addPose(t,id,kickImpact,.48,.16,"power4.in");

    if(target){
      t.to(target,{x:230,y:-18,rotation:20,scale:1.045,duration:.46,ease:"power3.out"},.64)
       .to(target,{x:420,y:250,rotation:125,opacity:0,duration:.58,ease:"power2.in"},1.10);
    }
    if(impact){
      t.fromTo(impact,{opacity:0,scale:0,rotation:-10},{opacity:1,scale:1,duration:.10,ease:"back.out(2.6)"},.64)
       .to(impact,{opacity:0,scale:1.38,duration:.28,ease:"power2.out"},.78);
    }
    if(camera){
      t.to(camera,{x:-10,y:2,duration:.05,ease:"none"},.64)
       .to(camera,{x:9,y:-2,duration:.05,ease:"none"},.69)
       .to(camera,{x:-5,y:1,duration:.05,ease:"none"},.74)
       .to(camera,{x:3,y:0,duration:.05,ease:"none"},.79)
       .to(camera,{x:0,y:0,duration:.08,ease:"power2.out"},.84);
    }

    S.addPose(t,id,kickRetract,.82,.18,"power2.out");
    S.addPose(t,id,S.poses.stand,1.00,.28,"back.out(1.35)");
    if(root)t.to(root,{y:0,rotation:0,duration:.30,ease:"power2.out"},.95);
    if(shadow)t.to(shadow,{scaleX:.88,duration:.30,ease:"power2.out"},.95);
    return t;
  };

  const jabBack = P({elbowFront:[154,188],wristFront:[182,177],elbowBack:[110,200],wristBack:[104,252],chest:[127,164],head:[129,66]});
  const jabHit = P({elbowFront:[184,163],wristFront:[238,163],elbowBack:[108,200],wristBack:[101,251],chest:[134,163],head:[136,65]});
  S.animations.jab = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    S.addPose(t,id,jabBack,0,.14,"power2.out");
    S.addPose(t,id,jabHit,.14,.12,"power4.in");
    S.addPose(t,id,S.poses.stand,.26,.22,"power2.out");
    if(root)t.to(root,{x:"+=10",duration:.12,ease:"power3.in"},.14).to(root,{x:"-=10",duration:.22,ease:"power2.out"},.26);
    return t;
  };

  S.animations.hitReact = ({id="hero",root})=>{
    const t=S.makeChildTimeline();
    const hit=P({head:[119,72],chest:[121,171],pelvis:[126,230],elbowFront:[147,218],wristFront:[161,273],elbowBack:[104,215],wristBack:[91,268],kneeFront:[151,302],ankleFront:[156,358],kneeBack:[109,300],ankleBack:[105,357]});
    S.addPose(t,id,hit,0,.16,"power3.out");
    S.addPose(t,id,S.poses.stand,.16,.34,"back.out(1.25)");
    if(root)t.to(root,{x:"-=22",rotation:-6,duration:.16,ease:"power3.out"},0).to(root,{x:"+=22",rotation:0,duration:.34,ease:"power2.out"},.16);
    return t;
  };
})();
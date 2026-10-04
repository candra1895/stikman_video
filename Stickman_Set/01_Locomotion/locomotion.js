(() => {
  const S = window.StickmanSet;
  if (!S) throw new Error("StickmanSet rig must load before locomotion");

  const P = o => S.makePose(o);

  const WALK = [
    P({
      head:[132,66], chest:[131,164], pelvis:[130,226],
      elbowFront:[151,204], wristFront:[143,262],
      elbowBack:[110,204], wristBack:[119,264],
      kneeFront:[166,296], ankleFront:[198,355], toeFront:[229,357],
      kneeBack:[106,299], ankleBack:[87,355], toeBack:[114,359]
    }),
    P({
      head:[133,64], chest:[132,162], pelvis:[131,223],
      elbowFront:[146,207], wristFront:[137,267],
      elbowBack:[113,201], wristBack:[126,258],
      kneeFront:[158,300], ankleFront:[182,356], toeFront:[214,358],
      kneeBack:[108,291], ankleBack:[98,349], toeBack:[126,355]
    }),
    P({
      head:[133,62], chest:[132,160], pelvis:[132,221],
      elbowFront:[139,210], wristFront:[131,269],
      elbowBack:[119,199], wristBack:[136,254],
      kneeFront:[148,302], ankleFront:[157,357], toeFront:[188,359],
      kneeBack:[116,285], ankleBack:[113,340], toeBack:[141,349]
    }),
    P({
      head:[132,64], chest:[131,162], pelvis:[131,223],
      elbowFront:[131,209], wristFront:[126,266],
      elbowBack:[128,199], wristBack:[147,256],
      kneeFront:[137,298], ankleFront:[137,354], toeFront:[167,359],
      kneeBack:[128,289], ankleBack:[140,345], toeBack:[168,351]
    }),
    P({
      head:[131,66], chest:[130,164], pelvis:[130,226],
      elbowFront:[111,204], wristFront:[120,264],
      elbowBack:[150,204], wristBack:[143,262],
      kneeFront:[105,299], ankleFront:[87,355], toeFront:[114,359],
      kneeBack:[165,296], ankleBack:[198,355], toeBack:[229,357]
    }),
    P({
      head:[130,64], chest:[129,162], pelvis:[129,223],
      elbowFront:[113,201], wristFront:[126,258],
      elbowBack:[146,207], wristBack:[137,267],
      kneeFront:[108,291], ankleFront:[98,349], toeFront:[126,355],
      kneeBack:[158,300], ankleBack:[182,356], toeBack:[214,358]
    }),
    P({
      head:[130,62], chest:[128,160], pelvis:[128,221],
      elbowFront:[119,199], wristFront:[136,254],
      elbowBack:[139,210], wristBack:[131,269],
      kneeFront:[116,285], ankleFront:[113,340], toeFront:[141,349],
      kneeBack:[148,302], ankleBack:[157,357], toeBack:[188,359]
    }),
    P({
      head:[131,64], chest:[129,162], pelvis:[129,223],
      elbowFront:[128,199], wristFront:[147,256],
      elbowBack:[131,209], wristBack:[126,266],
      kneeFront:[128,289], ankleFront:[140,345], toeFront:[168,351],
      kneeBack:[137,298], ankleBack:[137,354], toeBack:[167,359]
    })
  ];

  const RUN = [
    P({head:[137,62], chest:[136,158], pelvis:[133,220], elbowFront:[151,188],wristFront:[140,234],elbowBack:[106,190],wristBack:[119,236],kneeFront:[174,278],ankleFront:[211,330],toeFront:[238,332],kneeBack:[101,278],ankleBack:[117,326],toeBack:[145,333]}),
    P({head:[138,59], chest:[137,155], pelvis:[135,216], elbowFront:[143,193],wristFront:[132,239],elbowBack:[112,185],wristBack:[128,228],kneeFront:[156,285],ankleFront:[179,336],toeFront:[207,338],kneeBack:[112,267],ankleBack:[143,306],toeBack:[168,313]}),
    P({head:[138,61], chest:[137,157], pelvis:[134,219], elbowFront:[132,194],wristFront:[125,240],elbowBack:[125,184],wristBack:[145,226],kneeFront:[132,280],ankleFront:[142,327],toeFront:[169,331],kneeBack:[137,269],ankleBack:[170,310],toeBack:[197,315]}),
    P({head:[136,64], chest:[135,160], pelvis:[132,222], elbowFront:[109,190],wristFront:[121,236],elbowBack:[149,188],wristBack:[139,234],kneeFront:[101,278],ankleFront:[117,326],toeFront:[145,333],kneeBack:[174,278],ankleBack:[211,330],toeBack:[238,332]}),
    P({head:[135,60], chest:[134,156], pelvis:[131,217], elbowFront:[112,185],wristFront:[128,228],elbowBack:[143,193],wristBack:[132,239],kneeFront:[112,267],ankleFront:[143,306],toeFront:[168,313],kneeBack:[156,285],ankleBack:[179,336],toeBack:[207,338]}),
    P({head:[136,61], chest:[135,157], pelvis:[132,219], elbowFront:[125,184],wristFront:[145,226],elbowBack:[132,194],wristBack:[125,240],kneeFront:[137,269],ankleFront:[170,310],toeFront:[197,315],kneeBack:[132,280],ankleBack:[142,327],toeBack:[169,331]})
  ];

  S.poses.walk = WALK;
  S.poses.run = RUN;
  S.animations = S.animations || {};

  S.animations.idle = ({id="hero", root, duration=1.8}) => {
    const t = S.makeChildTimeline();
    const a = S.makePose({head:[132,66],chest:[130,164],pelvis:[130,226]});
    const b = S.makePose({head:[132,64],chest:[130,162],pelvis:[130,224]});
    S.addPose(t,id,b,0,duration/2,"sine.inOut");
    S.addPose(t,id,a,duration/2,duration/2,"sine.inOut");
    if (root) t.to(root,{y:-2,duration:duration/2,ease:"sine.inOut"},0).to(root,{y:0,duration:duration/2,ease:"sine.inOut"},duration/2);
    return t;
  };

  S.animations.walk = ({id="hero", root, shadow, fromX=-300, toX=250, cycles=3, cycleDuration=.90, direction=1}) => {
    const t = S.makeChildTimeline();
    const total = cycles * cycleDuration;
    const frames = direction === 1 ? WALK : [...WALK].reverse();
    const fd = cycleDuration / frames.length;

    if (root) t.fromTo(root,{x:fromX,y:0},{x:toX,y:0,duration:total,ease:"power1.inOut"},0);
    if (shadow) {
      t.fromTo(shadow,{x:fromX,opacity:.16,scaleX:.88,scaleY:.88},{x:toX,opacity:.24,duration:total,ease:"power1.inOut"},0);
    }
    for (let c=0;c<cycles;c++) {
      frames.forEach((pose,i)=>{
        const at = c*cycleDuration + i*fd;
        S.addPose(t,id,pose,at,fd,"sine.inOut");
        if (shadow) {
          const lift = (i===2 || i===6);
          t.to(shadow,{scaleX:lift?.80:.92,scaleY:lift?.98:.84,duration:fd,ease:"sine.inOut"},at);
        }
      });
    }
    return t;
  };

  S.animations.walkSlow = opts => S.animations.walk({...opts,cycleDuration:1.20});
  S.animations.walkFast = opts => S.animations.walk({...opts,cycleDuration:.68});
  S.animations.walkBackward = opts => S.animations.walk({...opts,direction:-1});

  S.animations.run = ({id="hero", root, shadow, fromX=-300, toX=260, cycles=4, cycleDuration=.56}) => {
    const t = S.makeChildTimeline();
    const total = cycles*cycleDuration, fd=cycleDuration/RUN.length;
    if (root) t.fromTo(root,{x:fromX,y:0},{x:toX,y:0,duration:total,ease:"power1.inOut"},0);
    if (shadow) t.fromTo(shadow,{x:fromX,opacity:.14},{x:toX,opacity:.23,duration:total,ease:"power1.inOut"},0);
    for(let c=0;c<cycles;c++) RUN.forEach((pose,i)=>{
      const at=c*cycleDuration+i*fd;
      S.addPose(t,id,pose,at,fd,"power1.inOut");
      if(root) t.to(root,{y:(i===1||i===4)?-8:-2,duration:fd,ease:"sine.inOut"},at);
      if(shadow) t.to(shadow,{scaleX:(i===1||i===4)?.74:.90,duration:fd,ease:"sine.inOut"},at);
    });
    return t;
  };

  S.animations.sprint = opts => S.animations.run({...opts,cycleDuration:.42});
  S.animations.stop = ({id="hero", root, duration=.35}) => {
    const t=S.makeChildTimeline();
    S.addPose(t,id,S.poses.stand,0,duration,"power2.out");
    if(root)t.to(root,{y:0,rotation:0,duration,ease:"power2.out"},0);
    return t;
  };
})();
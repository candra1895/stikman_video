(() => {
  const M = window.StickmanMoves = window.StickmanMoves || {};

  M._timeline = () => gsap.timeline();

  M._mirrorPose = pose => ({
    pelvis:-(pose.pelvis||0),
    chest:-(pose.chest||0),
    neck:-(pose.neck||0),
    head:-(pose.head||0),
    shoulderFront:pose.shoulderBack||0,
    elbowFront:pose.elbowBack||0,
    shoulderBack:pose.shoulderFront||0,
    elbowBack:pose.elbowFront||0,
    hipFront:pose.hipBack||0,
    kneeFront:pose.kneeBack||0,
    ankleFront:pose.ankleBack||0,
    hipBack:pose.hipFront||0,
    kneeBack:pose.kneeFront||0,
    ankleBack:pose.ankleFront||0,
    bodyY:pose.bodyY||0
  });

  M._addPoseSeries = (stickman, tl, poses, start, step, ease="sine.inOut") => {
    poses.forEach((pose,i)=>stickman.pose(tl,pose,start+i*step,step,ease));
    return tl;
  };
})();
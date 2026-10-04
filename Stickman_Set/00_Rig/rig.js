(() => {
  const S = window.StickmanSet = window.StickmanSet || {};
  S.version = "2.0.1";

  const BASE = {
    head:[132,66], neck:[130,112], chest:[130,164], pelvis:[130,226],
    shoulderFront:[139,145], elbowFront:[157,205], wristFront:[166,264],
    shoulderBack:[121,147], elbowBack:[103,207], wristBack:[95,266],
    hipFront:[138,226], kneeFront:[149,295], ankleFront:[153,356], toeFront:[184,359],
    hipBack:[122,226], kneeBack:[111,295], ankleBack:[107,356], toeBack:[136,359]
  };

  const clonePoint = p => [p[0], p[1]];
  S.clonePose = pose => Object.fromEntries(
    Object.entries(pose).map(([k,v]) => [k, clonePoint(v)])
  );

  S.makePose = (overrides = {}) => {
    const p = S.clonePose(BASE);
    for (const [key, value] of Object.entries(overrides)) {
      p[key] = clonePoint(value);
    }
    return p;
  };

  S.poses = S.poses || {};
  S.poses.stand = S.makePose();

  const idSel = (id, part) => "#" + id + "-" + part;
  S.part = idSel;

  S.mount = (container, id = "stick") => {
    const el = typeof container === "string"
      ? document.querySelector(container)
      : container;

    if (!el) throw new Error("StickmanSet.mount: container not found");

    el.innerHTML =
      '<svg class="sm-rig" viewBox="0 0 260 400" aria-label="Articulated stickman">' +
        '<g class="sm-character">' +
          '<path id="' + id + '-arm-back" class="sm-limb sm-limb-back"></path>' +
          '<circle id="' + id + '-elbow-back" class="sm-joint sm-back-joint" r="10"></circle>' +
          '<circle id="' + id + '-wrist-back" class="sm-hand sm-back-joint" r="9"></circle>' +

          '<path id="' + id + '-leg-back" class="sm-leg sm-limb-back"></path>' +
          '<path id="' + id + '-foot-back" class="sm-foot sm-limb-back"></path>' +
          '<circle id="' + id + '-knee-back" class="sm-joint sm-back-joint" r="10"></circle>' +

          '<path id="' + id + '-torso" class="sm-torso"></path>' +
          '<path id="' + id + '-shoulders" class="sm-bridge"></path>' +
          '<path id="' + id + '-hips" class="sm-bridge sm-hip-bridge"></path>' +
          '<circle id="' + id + '-chest" class="sm-core" r="13"></circle>' +
          '<circle id="' + id + '-pelvis" class="sm-core" r="13"></circle>' +

          '<path id="' + id + '-leg-front" class="sm-leg"></path>' +
          '<path id="' + id + '-foot-front" class="sm-foot"></path>' +
          '<circle id="' + id + '-knee-front" class="sm-joint" r="10"></circle>' +

          '<path id="' + id + '-arm-front" class="sm-limb"></path>' +
          '<circle id="' + id + '-elbow-front" class="sm-joint" r="10"></circle>' +
          '<circle id="' + id + '-wrist-front" class="sm-hand" r="9"></circle>' +

          '<circle id="' + id + '-head" class="sm-head" r="38"></circle>' +
          '<circle id="' + id + '-eye" class="sm-eye" r="4.5"></circle>' +
        '</g>' +
      '</svg>';

    S.setPose(id, S.poses.stand);
    return el;
  };

  const line = (a,b) =>
    "M " + a[0] + " " + a[1] + " L " + b[0] + " " + b[1];

  const chain = (a,b,c) =>
    "M " + a[0] + " " + a[1] +
    " L " + b[0] + " " + b[1] +
    " L " + c[0] + " " + c[1];

  S.attrsForPose = p => ({
    torso: {d: chain(p.neck, p.chest, p.pelvis)},
    shoulders: {d: line(p.shoulderBack, p.shoulderFront)},
    hips: {d: line(p.hipBack, p.hipFront)},
    armFront: {d: chain(p.shoulderFront, p.elbowFront, p.wristFront)},
    armBack: {d: chain(p.shoulderBack, p.elbowBack, p.wristBack)},
    legFront: {d: chain(p.hipFront, p.kneeFront, p.ankleFront)},
    legBack: {d: chain(p.hipBack, p.kneeBack, p.ankleBack)},
    footFront: {d: line(p.ankleFront, p.toeFront)},
    footBack: {d: line(p.ankleBack, p.toeBack)}
  });

  S.setPose = (id, pose) => {
    const a = S.attrsForPose(pose);

    gsap.set(idSel(id,"torso"), {attr:a.torso});
    gsap.set(idSel(id,"shoulders"), {attr:a.shoulders});
    gsap.set(idSel(id,"hips"), {attr:a.hips});
    gsap.set(idSel(id,"arm-front"), {attr:a.armFront});
    gsap.set(idSel(id,"arm-back"), {attr:a.armBack});
    gsap.set(idSel(id,"leg-front"), {attr:a.legFront});
    gsap.set(idSel(id,"leg-back"), {attr:a.legBack});
    gsap.set(idSel(id,"foot-front"), {attr:a.footFront});
    gsap.set(idSel(id,"foot-back"), {attr:a.footBack});

    gsap.set(idSel(id,"head"), {
      attr:{cx:pose.head[0], cy:pose.head[1]}
    });
    gsap.set(idSel(id,"eye"), {
      attr:{cx:pose.head[0]+13, cy:pose.head[1]-4}
    });
    gsap.set(idSel(id,"chest"), {
      attr:{cx:pose.chest[0], cy:pose.chest[1]}
    });
    gsap.set(idSel(id,"pelvis"), {
      attr:{cx:pose.pelvis[0], cy:pose.pelvis[1]}
    });
    gsap.set(idSel(id,"elbow-front"), {
      attr:{cx:pose.elbowFront[0], cy:pose.elbowFront[1]}
    });
    gsap.set(idSel(id,"elbow-back"), {
      attr:{cx:pose.elbowBack[0], cy:pose.elbowBack[1]}
    });
    gsap.set(idSel(id,"wrist-front"), {
      attr:{cx:pose.wristFront[0], cy:pose.wristFront[1]}
    });
    gsap.set(idSel(id,"wrist-back"), {
      attr:{cx:pose.wristBack[0], cy:pose.wristBack[1]}
    });
    gsap.set(idSel(id,"knee-front"), {
      attr:{cx:pose.kneeFront[0], cy:pose.kneeFront[1]}
    });
    gsap.set(idSel(id,"knee-back"), {
      attr:{cx:pose.kneeBack[0], cy:pose.kneeBack[1]}
    });
  };

  S.addPose = (
    tl,
    id,
    pose,
    at,
    duration = .12,
    ease = "sine.inOut"
  ) => {
    const a = S.attrsForPose(pose);
    const vars = {duration, ease};

    tl.to(idSel(id,"torso"), {...vars, attr:a.torso}, at);
    tl.to(idSel(id,"shoulders"), {...vars, attr:a.shoulders}, at);
    tl.to(idSel(id,"hips"), {...vars, attr:a.hips}, at);
    tl.to(idSel(id,"arm-front"), {...vars, attr:a.armFront}, at);
    tl.to(idSel(id,"arm-back"), {...vars, attr:a.armBack}, at);
    tl.to(idSel(id,"leg-front"), {...vars, attr:a.legFront}, at);
    tl.to(idSel(id,"leg-back"), {...vars, attr:a.legBack}, at);
    tl.to(idSel(id,"foot-front"), {...vars, attr:a.footFront}, at);
    tl.to(idSel(id,"foot-back"), {...vars, attr:a.footBack}, at);

    tl.to(idSel(id,"head"), {
      ...vars,
      attr:{cx:pose.head[0],cy:pose.head[1]}
    }, at);

    tl.to(idSel(id,"eye"), {
      ...vars,
      attr:{cx:pose.head[0]+13,cy:pose.head[1]-4}
    }, at);

    tl.to(idSel(id,"chest"), {
      ...vars,
      attr:{cx:pose.chest[0],cy:pose.chest[1]}
    }, at);

    tl.to(idSel(id,"pelvis"), {
      ...vars,
      attr:{cx:pose.pelvis[0],cy:pose.pelvis[1]}
    }, at);

    tl.to(idSel(id,"elbow-front"), {
      ...vars,
      attr:{cx:pose.elbowFront[0],cy:pose.elbowFront[1]}
    }, at);

    tl.to(idSel(id,"elbow-back"), {
      ...vars,
      attr:{cx:pose.elbowBack[0],cy:pose.elbowBack[1]}
    }, at);

    tl.to(idSel(id,"wrist-front"), {
      ...vars,
      attr:{cx:pose.wristFront[0],cy:pose.wristFront[1]}
    }, at);

    tl.to(idSel(id,"wrist-back"), {
      ...vars,
      attr:{cx:pose.wristBack[0],cy:pose.wristBack[1]}
    }, at);

    tl.to(idSel(id,"knee-front"), {
      ...vars,
      attr:{cx:pose.kneeFront[0],cy:pose.kneeFront[1]}
    }, at);

    tl.to(idSel(id,"knee-back"), {
      ...vars,
      attr:{cx:pose.kneeBack[0],cy:pose.kneeBack[1]}
    }, at);

    return tl;
  };

  S.makeChildTimeline = () => gsap.timeline();
})();
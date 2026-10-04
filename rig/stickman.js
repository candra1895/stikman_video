(() => {
  const RIG_MARKUP = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 260 400\" aria-label=\"Hierarchical stickman rig\">\n  <g id=\"pelvis-root\" data-part=\"pelvis\">\n    <circle cx=\"130\" cy=\"224\" r=\"15\" class=\"sm-core\"/>\n    <path d=\"M118 224 L142 224\" class=\"sm-hip\"/>\n\n    <g id=\"torso-chain\" data-part=\"chest\">\n      <path d=\"M130 224 L130 158\" class=\"sm-torso\"/>\n      <circle cx=\"130\" cy=\"158\" r=\"14\" class=\"sm-core\"/>\n\n      <g id=\"neck-chain\" data-part=\"neck\">\n        <path d=\"M130 158 L130 112\" class=\"sm-neck\"/>\n        <g id=\"head-chain\" data-part=\"head\">\n          <circle cx=\"130\" cy=\"70\" r=\"38\" class=\"sm-head\"/>\n          <circle cx=\"143\" cy=\"64\" r=\"4.5\" class=\"sm-eye\"/>\n        </g>\n      </g>\n\n      <g id=\"arm-back-upper\" data-part=\"shoulderBack\">\n        <path d=\"M121 150 L98 202\" class=\"sm-limb sm-back\"/>\n        <circle cx=\"98\" cy=\"202\" r=\"9\" class=\"sm-joint sm-back-fill\"/>\n        <g id=\"arm-back-lower\" data-part=\"elbowBack\">\n          <path d=\"M98 202 L91 263\" class=\"sm-forearm sm-back\"/>\n          <circle cx=\"91\" cy=\"263\" r=\"9\" class=\"sm-hand sm-back-fill\"/>\n        </g>\n      </g>\n\n      <g id=\"arm-front-upper\" data-part=\"shoulderFront\">\n        <path d=\"M139 148 L165 201\" class=\"sm-limb\"/>\n        <circle cx=\"165\" cy=\"201\" r=\"9\" class=\"sm-joint\"/>\n        <g id=\"arm-front-lower\" data-part=\"elbowFront\">\n          <path d=\"M165 201 L174 262\" class=\"sm-forearm\"/>\n          <circle cx=\"174\" cy=\"262\" r=\"9\" class=\"sm-hand\"/>\n        </g>\n      </g>\n    </g>\n\n    <g id=\"leg-back-upper\" data-part=\"hipBack\">\n      <path d=\"M122 224 L111 296\" class=\"sm-leg sm-back\"/>\n      <circle cx=\"111\" cy=\"296\" r=\"10\" class=\"sm-joint sm-back-fill\"/>\n      <g id=\"leg-back-lower\" data-part=\"kneeBack\">\n        <path d=\"M111 296 L106 355\" class=\"sm-shin sm-back\"/>\n        <g id=\"foot-back\" data-part=\"ankleBack\">\n          <path d=\"M106 355 L137 361\" class=\"sm-foot sm-back\"/>\n        </g>\n      </g>\n    </g>\n\n    <g id=\"leg-front-upper\" data-part=\"hipFront\">\n      <path d=\"M138 224 L149 296\" class=\"sm-leg\"/>\n      <circle cx=\"149\" cy=\"296\" r=\"10\" class=\"sm-joint\"/>\n      <g id=\"leg-front-lower\" data-part=\"kneeFront\">\n        <path d=\"M149 296 L154 355\" class=\"sm-shin\"/>\n        <g id=\"foot-front\" data-part=\"ankleFront\">\n          <path d=\"M154 355 L188 361\" class=\"sm-foot\"/>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>";

  const PIVOTS = {
    pelvis:[130,224],
    chest:[130,224],
    neck:[130,158],
    head:[130,112],
    shoulderBack:[121,150],
    elbowBack:[98,202],
    shoulderFront:[139,148],
    elbowFront:[165,201],
    hipBack:[122,224],
    kneeBack:[111,296],
    ankleBack:[106,355],
    hipFront:[138,224],
    kneeFront:[149,296],
    ankleFront:[154,355]
  };

  const DEFAULT_POSE = {
    pelvis:0,chest:0,neck:0,head:0,
    shoulderBack:0,elbowBack:0,
    shoulderFront:0,elbowFront:0,
    hipBack:0,kneeBack:0,ankleBack:0,
    hipFront:0,kneeFront:0,ankleFront:0,
    bodyY:0
  };

  class Stickman {
    constructor(container, options = {}) {
      this.container = typeof container === "string" ? document.querySelector(container) : container;
      if (!this.container) throw new Error("Stickman: container not found");
      this.container.innerHTML = RIG_MARKUP;
      this.svg = this.container.querySelector("svg");
      this.svg.classList.add("sm-rig");
      this.parts = {};
      for (const key of Object.keys(PIVOTS)) {
        this.parts[key] = this.container.querySelector('[data-part="' + key + '"]');
      }
      this.root = options.root || this.container;
      this.shadow = options.shadow || null;
      this.facing = options.facing || 1;
      this.reset();
    }

    part(name){ return this.parts[name]; }
    pivot(name){ return PIVOTS[name]; }

    reset(){
      const tl = gsap.timeline();
      this.pose(tl, DEFAULT_POSE, 0, 0);
      gsap.set(this.root,{y:0,rotation:0,scaleX:this.facing});
      return this;
    }

    pose(tl, pose, at=0, duration=.14, ease="sine.inOut"){
      const merged = {...DEFAULT_POSE,...pose};
      for (const [name, angle] of Object.entries(merged)) {
        if (name === "bodyY") continue;
        const el = this.part(name);
        if (!el) continue;
        const p = this.pivot(name);
        tl.to(el,{rotation:angle,svgOrigin:p[0]+" "+p[1],duration,ease},at);
      }
      tl.to(this.root,{y:merged.bodyY,duration,ease},at);
      return tl;
    }

    move(name, ...args){
      const fn = window.StickmanMoves && window.StickmanMoves[name];
      if (!fn) throw new Error("Unknown stickman move: " + name);
      return fn(this, ...args);
    }

    walk(cycles=1, opts={}){ return this.move("walk", cycles, opts); }
    run(cycles=1, opts={}){ return this.move("run", cycles, opts); }
    jump(opts={}){ return this.move("jump", opts); }
    punch(opts={}){ return this.move("punch", opts); }
    kick(opts={}){ return this.move("kick", opts); }
    hit(opts={}){ return this.move("hit", opts); }
    climb(cycles=1, opts={}){ return this.move("climb", cycles, opts); }
    victory(opts={}){ return this.move("victory", opts); }
    idle(opts={}){ return this.move("idle", opts); }
  }

  window.StickmanRig = {Stickman,PIVOTS,DEFAULT_POSE};
  window.StickmanMoves = window.StickmanMoves || {};
})();
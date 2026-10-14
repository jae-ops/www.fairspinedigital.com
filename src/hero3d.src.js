// Fairspine hero: a real-time 3D windmill built from the brand mark.
// Source file. Bundled into /assets/hero3d.js with esbuild (see README "3D hero").
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, Fog, MathUtils,
  CylinderGeometry, ConeGeometry, BoxGeometry, TorusGeometry, SphereGeometry, RingGeometry,
  MeshStandardMaterial, MeshBasicMaterial,
  HemisphereLight, DirectionalLight,
  BufferGeometry, Float32BufferAttribute, Points, PointsMaterial,
  AdditiveBlending, ACESFilmicToneMapping, DoubleSide
} from 'three';

const TEAL = 0x1eb882;
const MINT = 0x7cf2c8;

export function initHero3D(container, opts = {}) {
  const reduceMotion = !!opts.reduceMotion;
  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    return null;
  }
  if (!renderer.getContext()) return null;

  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;';
  container.appendChild(canvas);

  const scene = new Scene();
  scene.fog = new Fog(0x0a1626, 13, 26);

  const camera = new PerspectiveCamera(30, 1, 0.1, 80);
  camera.position.set(0, 3.4, 15.8);
  camera.lookAt(0, 3.0, 0);

  // ---- lights -------------------------------------------------------------
  scene.add(new HemisphereLight(0x8fe9cf, 0x0a1626, 0.7));
  const key = new DirectionalLight(0xffffff, 3.0); key.position.set(4.5, 7, 6); scene.add(key);
  const rim = new DirectionalLight(TEAL, 3.4);     rim.position.set(-6, 3.5, -5); scene.add(rim);
  const fill = new DirectionalLight(0x4aa8ff, 0.7); fill.position.set(-4, 1, 6); scene.add(fill);

  // ---- materials ----------------------------------------------------------
  const towerMat = new MeshStandardMaterial({ color: 0x1b4468, roughness: 0.45, metalness: 0.25, emissive: 0x0a2e45, emissiveIntensity: 0.8 });
  const capMat   = new MeshStandardMaterial({ color: 0x2a6a96, roughness: 0.38, metalness: 0.3 });
  const sailMat  = new MeshStandardMaterial({ color: 0xeafff8, roughness: 0.35, metalness: 0.1, emissive: TEAL, emissiveIntensity: 0.1 });
  const sparMat  = new MeshStandardMaterial({ color: 0xcfeee3, roughness: 0.4, metalness: 0.2 });
  const tealGlow = new MeshBasicMaterial({ color: TEAL });
  const wireMat  = new MeshBasicMaterial({ color: TEAL, wireframe: true, transparent: true, opacity: 0.16 });

  const windmill = new Group();
  scene.add(windmill);

  // ---- tower --------------------------------------------------------------
  const H = 3.4, R0 = 1.0, R1 = 0.62;
  const tower = new Mesh(new CylinderGeometry(R1, R0, H, 56, 1), towerMat);
  tower.position.y = H / 2;
  windmill.add(tower);
  const blueprint = new Mesh(new CylinderGeometry(R1 + 0.006, R0 + 0.006, H, 20, 7, true), wireMat);
  blueprint.position.y = H / 2;
  windmill.add(blueprint);
  [0.18, 0.5, 0.82].forEach((t) => {
    const r = R0 + (R1 - R0) * t;
    const band = new Mesh(new TorusGeometry(r + 0.012, 0.014, 8, 80), tealGlow);
    band.rotation.x = Math.PI / 2;
    band.position.y = H * t;
    windmill.add(band);
  });
  const door = new Mesh(new BoxGeometry(0.34, 0.62, 0.08), new MeshStandardMaterial({ color: 0x07131f, roughness: 0.8 }));
  door.position.set(0, 0.31, R0 - 0.08);
  windmill.add(door);
  const base = new Mesh(new CylinderGeometry(1.25, 1.35, 0.14, 56), new MeshStandardMaterial({ color: 0x0f2740, roughness: 0.6, metalness: 0.3 }));
  base.position.y = 0.07;
  windmill.add(base);

  // ---- cap + hub ----------------------------------------------------------
  const cap = new Mesh(new ConeGeometry(0.82, 0.95, 56), capMat);
  cap.position.y = H + 0.47;
  windmill.add(cap);
  const collar = new Mesh(new CylinderGeometry(0.7, 0.66, 0.1, 56), capMat);
  collar.position.y = H + 0.04;
  windmill.add(collar);

  // The sails turn in a flat plane. The tower widens to radius R0 at the ground, so the
  // plane must sit in front of that radius (plus the sail pitch and the glow bands), or
  // the lowest sail cuts into the tower. HUB_Z keeps >= 0.1 clear of the widest point.
  const SAIL_PITCH_SWING = 0.22, CLEARANCE = 0.1;
  const HUB_Y = H + 0.3, HUB_Z = R0 + 0.026 + SAIL_PITCH_SWING + CLEARANCE;
  const SHAFT_BACK = 0.25;                                   // where the shaft enters the cap
  const shaft = new Mesh(new CylinderGeometry(0.06, 0.06, HUB_Z - SHAFT_BACK + 0.05, 16), sparMat);
  shaft.rotation.x = Math.PI / 2;
  shaft.position.set(0, HUB_Y, (HUB_Z + SHAFT_BACK) / 2);
  windmill.add(shaft);

  // ---- rotor: four lattice sails like the logo ----------------------------
  const rotor = new Group();
  rotor.position.set(0, HUB_Y, HUB_Z);
  windmill.add(rotor);

  const hub = new Mesh(new SphereGeometry(0.17, 32, 16), new MeshStandardMaterial({ color: 0xffffff, roughness: 0.25, metalness: 0.3 }));
  rotor.add(hub);
  const hubCore = new Mesh(new SphereGeometry(0.09, 24, 12), tealGlow);
  hubCore.position.z = 0.1;
  rotor.add(hubCore);

  const SAIL_START = 0.5, SAIL_LEN = 2.55, SAIL_W = 0.64, SLATS = 9;
  for (let i = 0; i < 4; i++) {
    const arm = new Group();
    arm.rotation.z = Math.PI / 4 + (i * Math.PI) / 2;       // X shape, as in the logo

    const spar = new Mesh(new BoxGeometry(0.07, SAIL_START + SAIL_LEN + 0.15, 0.07), sparMat);
    spar.position.y = (SAIL_START + SAIL_LEN + 0.15) / 2;
    arm.add(spar);

    const sail = new Group();
    sail.rotation.y = 0.32;                                   // pitch of the sail
    const offsetX = SAIL_W / 2 + 0.04;
    [0, SAIL_W].forEach((x) => {
      const rail = new Mesh(new BoxGeometry(0.04, SAIL_LEN, 0.04), sailMat);
      rail.position.set(offsetX - SAIL_W / 2 + x - 0.0, SAIL_START + SAIL_LEN / 2, 0);
      sail.add(rail);
    });
    for (let s = 0; s <= SLATS; s++) {
      const slat = new Mesh(new BoxGeometry(SAIL_W + 0.04, 0.035, 0.03), sailMat);
      slat.position.set(offsetX, SAIL_START + (SAIL_LEN * s) / SLATS, 0);
      sail.add(slat);
    }
    arm.add(sail);
    rotor.add(arm);
  }

  // ---- orbit rings echo the logo's faint circles --------------------------
  const rings = new Group();
  rings.position.copy(rotor.position);
  windmill.add(rings);
  [[3.5, 0.34], [3.95, 0.16]].forEach(([r, o]) => {
    const t = new Mesh(new TorusGeometry(r, 0.007, 8, 200), new MeshBasicMaterial({ color: MINT, transparent: true, opacity: o }));
    rings.add(t);
  });
  const dotGeo = new BufferGeometry();
  const dots = [];
  for (let i = 0; i < 120; i++) {
    const a = (i / 120) * Math.PI * 2;
    dots.push(Math.cos(a) * 4.45, Math.sin(a) * 4.45, 0);
  }
  dotGeo.setAttribute('position', new Float32BufferAttribute(dots, 3));
  rings.add(new Points(dotGeo, new PointsMaterial({ color: MINT, size: 0.05, transparent: true, opacity: 0.55 })));

  // ---- ground ripples -----------------------------------------------------
  const ripples = [];
  for (let i = 0; i < 5; i++) {
    const r = 1.7 + i * 0.72;
    const m = new Mesh(new RingGeometry(r, r + 0.012, 128), new MeshBasicMaterial({ color: TEAL, transparent: true, opacity: 0.34 - i * 0.06, side: DoubleSide }));
    m.rotation.x = -Math.PI / 2;
    m.position.y = 0.01;
    scene.add(m);
    ripples.push(m);
  }

  // ---- drifting particles -------------------------------------------------
  const N = 520;
  const pos = new Float32Array(N * 3);
  const spd = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const a = Math.random() * Math.PI * 2, rad = 2.5 + Math.random() * 8;
    pos[i * 3] = Math.cos(a) * rad;
    pos[i * 3 + 1] = Math.random() * 9 - 0.5;
    pos[i * 3 + 2] = Math.sin(a) * rad - 2;
    spd[i] = 0.12 + Math.random() * 0.35;
  }
  const pGeo = new BufferGeometry();
  pGeo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  const pts = new Points(pGeo, new PointsMaterial({ color: MINT, size: 0.045, transparent: true, opacity: 0.7, blending: AdditiveBlending, depthWrite: false }));
  scene.add(pts);

  // ---- state --------------------------------------------------------------
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  let speed = 0.5, lastScroll = window.scrollY, visible = true, running = false, raf = 0;
  let t0 = performance.now(), introDone = reduceMotion;

  function resize() {
    const w = container.clientWidth || 1, h = container.clientHeight || 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the whole windmill in frame on narrow stages
    camera.position.z = camera.aspect < 0.95 ? 15.8 / Math.max(camera.aspect, 0.6) * 0.98 : 15.8;
    camera.updateProjectionMatrix();
  }

  function onPointer(e) {
    const r = container.getBoundingClientRect();
    mouse.tx = MathUtils.clamp(((e.clientX - r.left) / r.width - 0.5) * 2, -1.4, 1.4);
    mouse.ty = MathUtils.clamp(((e.clientY - r.top) / r.height - 0.5) * 2, -1.4, 1.4);
  }

  function frame(now) {
    raf = 0;
    const dt = Math.min((now - t0) / 1000, 0.05);
    t0 = now;

    const sy = window.scrollY, vel = Math.abs(sy - lastScroll);
    lastScroll = sy;
    speed += ((0.5 + Math.min(vel * 0.16, 5)) - speed) * Math.min(dt * 3, 1);
    rotor.rotation.z -= speed * dt;

    mouse.x += (mouse.tx - mouse.x) * Math.min(dt * 3.2, 1);
    mouse.y += (mouse.ty - mouse.y) * Math.min(dt * 3.2, 1);

    const intro = introDone ? 1 : Math.min((now - startTime) / 1900, 1);
    if (intro >= 1) introDone = true;
    const ease = 1 - Math.pow(1 - intro, 3);

    windmill.rotation.y = -0.62 + (1 - ease) * -2.4 + mouse.x * 0.42;
    windmill.rotation.x = mouse.y * 0.06;
    windmill.scale.setScalar(0.82 + 0.18 * ease);
    windmill.position.y = -0.6 + (1 - ease) * -0.5;
    rings.rotation.z += dt * 0.05;
    rings.rotation.y = 0.35 + mouse.x * 0.12;

    ripples.forEach((m, i) => {
      const s = 1 + Math.sin(now / 1400 + i * 0.7) * 0.02;
      m.scale.set(s, s, 1);
    });

    const arr = pGeo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      arr[i * 3 + 1] += spd[i] * dt;
      if (arr[i * 3 + 1] > 8.5) arr[i * 3 + 1] = -0.5;
    }
    pGeo.attributes.position.needsUpdate = true;
    pts.rotation.y += dt * 0.02;

    renderer.render(scene, camera);
    if (running && visible && !document.hidden) raf = requestAnimationFrame(frame);
  }

  const startTime = performance.now();
  function start() {
    if (running) return;
    running = true;
    t0 = performance.now();
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function stop() { running = false; if (raf) { cancelAnimationFrame(raf); raf = 0; } }

  resize();
  rotor.rotation.z = 0.35;

  if (reduceMotion) {
    windmill.rotation.y = -0.62;
    windmill.position.y = -0.6;
    renderer.render(scene, camera);
  } else {
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : visible && start()));
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        visible ? start() : stop();
      }, { threshold: 0.02 }).observe(container);
    } else { start(); }
    start();
  }

  if ('ResizeObserver' in window) new ResizeObserver(() => { resize(); if (!running) renderer.render(scene, camera); }).observe(container);
  else window.addEventListener('resize', resize);

  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); stop(); container.dispatchEvent(new CustomEvent('hero3d:lost')); });

  return {
    mouse,
    dispose() { stop(); window.removeEventListener('pointermove', onPointer); renderer.dispose(); canvas.remove(); }
  };
}

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "file:///C:/Users/nikhi/.claude/skills/anatomy/kit/iso-kit.mjs";
import * as G from "file:///C:/Users/nikhi/.claude/skills/anatomy/kit/lathe.mjs";
import { kitScript } from "file:///C:/Users/nikhi/.claude/skills/anatomy/scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--light") ? "light" : "dark";

const WIDTH = 700;
const HEIGHT = 440;

// ---------------------------------------------------------------- the model
// Every number comes from the SEC EDGAR lakehouse on the portfolio: the Apple
// run carried about 25,000 fact rows under 503 us-gaap tags; the gold catalogue
// maps 21 metrics, and the dashboard serves 15+ KPIs. A deck's height is the
// log of what is still on it, so one decade of rows is one fixed step down.
const DECKS = [
  { x0: -126, x1: -62, count: 25000, label: "fact rows", mesh: [5, 3, 3.0] },
  { x0: -70, x1: -6, count: 503, label: "us-gaap tags", mesh: [7, 4, 2.1] },
  { x0: -14, x1: 50, count: 21, label: "mapped metrics", mesh: [9, 5, 1.5] },
  // Gold to serve is a short drop, so this deck abuts the last one and takes
  // its feed over the weir rather than down a chute.
  { x0: 50, x1: 114, count: 15, label: "served KPIs", mesh: [11, 6, 1.1] },
];
const DECADE = 21;
const FLOOR = 8;
const FRAME_H = 7;
const zOf = (count) => FLOOR + (Math.log10(count) - 1.1) * DECADE;
DECKS.forEach((deck) => {
  deck.z = zOf(deck.count);
  deck.top = deck.z + FRAME_H;
  deck.at = (deck.x0 + deck.x1) / 2;
});

const PLATE = { x: -152, y: -62, w: 304, d: 124, r: 9 };
const PLATE_H = 12;
const FOOT_H = 5;

const HOP_X = -114;
const HOP_Y = 26;
const HOP_R = 16;
const SPOUT = 86;
const HOP_PROFILE = [
  [0, 5],
  [5, 5],
  [7.5, 7.5, 1],
  [19, HOP_R],
  [22, HOP_R],
];
const HOP_TOP = SPOUT + 22;
const HOP_POST = { x: HOP_X, y: HOP_Y + HOP_R + 6 };

const POST_L = -148;
const POST_R = 142;
const POST_TOP = 106;
const HEAD_Z = POST_TOP; // the cross heads that carry the beam
const BEAM_Z = 110;
const BEAM_H = 9;
const BEAM_TOP = BEAM_Z + BEAM_H;
const RAIL_F = { x: -152, y: -11, w: 294, d: 6, r: 1.5 };
const RAIL_N = { x: -152, y: 5, w: 294, d: 6, r: 1.5 };

const CAR_Z = BEAM_TOP;
const CAR_H = 8;
const CAR = { x: -15, y: -18, w: 30, d: 36, r: 3 };
const DIAL_Z = CAR_Z + CAR_H;
const DIAL_R = 15.5;
const DIAL_H = 10;
const DIAL_TOP = DIAL_Z + DIAL_H;
const HEAD_H = 8;

const REST_TOP = DECKS[0].top;
const STROKE = REST_TOP - DECKS[3].top;
const REACH = [-116, 114];
const STOPS = DECKS.map((deck) => Math.min(REACH[1], Math.max(REACH[0], deck.at)));

const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
    [HOP_X - HOP_R, HOP_Y, HOP_TOP],
    [HOP_X + HOP_R, HOP_Y + HOP_R, HOP_TOP],
    [REACH[0] - DIAL_R, -DIAL_R, DIAL_TOP],
    [REACH[0] + DIAL_R, DIAL_R, DIAL_TOP],
    [REACH[1] - DIAL_R, -DIAL_R, DIAL_TOP],
    [REACH[1] + DIAL_R, DIAL_R, DIAL_TOP],
  ],
  WIDTH,
  HEIGHT,
  { pad: 24, azimuth: 42 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const wobble = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

// ------------------------------------------------------------------ the bench
function bench() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 24))) {
    out.push(S(k.cylinder(x, y, 8, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 6.2, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 9, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 6), 0, P, 9), { tone: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 13), 0, P, 9), { tone: "faint" }));
  const screws = k.corners(PLATE, 12);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.4, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));

  // ruler strip along the near edge: one tick per 5 units, a major every fifth
  const strip = { x: -98, y: 52, w: 222, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 5, strip.x + strip.w - 5, 5, 5, strip.y + 0.9, 0.6, [2, 3.8], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 2.5, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2.5, strip.y + 3.5, 0.6])], { size: 0.45 }));

  // label plate on the near apron
  const label = { x: -92, y: 37, w: 46, d: 11, r: 1.5 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 3), { tone: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.8), 0.8, P, 3), { tone: "faint" }));
  [3.2, 5.6, 8].forEach((dy, index) => {
    const span = [36, 27, 31][index];
    out.push(L(k.lineOnTop([label.x + 4, label.y + dy], [label.x + 4 + span, label.y + dy], 0.8, P), { tone: "lo", free: true }));
  });
  out.push(D([at([label.x + 2.2, label.y + 2.2, 0.8]), at([label.x + label.w - 2.2, label.y + label.d - 2.2, 0.8])], { size: 0.4, tone: "lo" }));
  return out.join("");
}

function pillar(x, y, top, radius) {
  const out = [];
  out.push(S(k.cylinder(x, y, radius + 3.4, 0, 2.4, P, 32), { tone: "lo" }));
  out.push(L(k.ring(x, y, radius + 1, 2.4, P, 24), { tone: "faint" }));
  out.push(D([[-(radius + 0.8), 0], [0, -(radius + 0.8)], [0, radius + 0.8]].map(([dx, dy]) => at([x + dx, y + dy, 2.4])), { size: 0.45 }));
  out.push(S(k.cylinder(x, y, radius, 2.4, top - 2.4, P, 28), { tone: "mid", crease: "none" }));
  out.push(L([0.24, 0.5, 0.76].map((share) => k.sideArc(x, y, radius, top * share, P, 16)).join(""), { tone: "faint" }));
  return out.join("");
}

function post(x) {
  const out = [pillar(x, 0, POST_TOP, 4.6)];
  const cross = { x: x - 7, y: -14, w: 14, d: 28, r: 2 };
  out.push(S(k.slabOf(cross, HEAD_Z, BEAM_Z - HEAD_Z + 1, P, 3, 0.5), { tone: "mid" }));
  out.push(D([at([x, -10, BEAM_Z + 1]), at([x, 10, BEAM_Z + 1])], { size: 0.45 }));
  return out.join("");
}

function hopper() {
  // The cone is farthest, then the bracket, then the pillar that stands in front of both.
  const out = [];
  const F = G.frameOf([HOP_X, HOP_Y, SPOUT], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
  out.push(S(G.solidOf(HOP_PROFILE, F, P, { bevel: 0 }), { tone: "mid", crease: "lo" }));
  out.push(L(G.arcOf(F, 19, HOP_R, P, { steps: 48 }), { tone: "faint" }));
  out.push(L(G.arcOf(F, 5.4, 5.2, P, { steps: 20 }), { tone: "faint" }));
  out.push(D(G.dotsOf(F, 20.4, HOP_R, 16, P, { fade: [0.05, 0.4] }), { size: 0.45, tone: "lo" }));
  // the cone's near surface at the bracket's height, so the bracket lands flush
  const bracket = { x: HOP_X - 5, y: HOP_Y + 12.6, w: 10, d: HOP_POST.y - HOP_Y - 12.6 + 4, r: 2 };
  out.push(S(k.slabOf(bracket, 96, 5, P, 3, 0.4), { tone: "mid" }));
  out.push(D([at([HOP_X, bracket.y + 3, 101]), at([HOP_X, bracket.y + bracket.d - 3, 101])], { size: 0.45 }));
  out.push(pillar(HOP_POST.x, HOP_POST.y, 102, 4));
  return out.join("");
}

function railOf(plan) {
  return S(k.slabOf(plan, BEAM_Z, BEAM_H, P, 3, 0.5), {
    tone: "mid",
    inner: k.lineSvg(k.sideSeam(plan, BEAM_Z + 5.6, P, 3), { tone: "faint" }),
  });
}

function railDots(plan) {
  const dots = [];
  for (let x = plan.x + 14; x < plan.x + plan.w - 10; x += 28) dots.push(at([x, plan.y + plan.d / 2, BEAM_TOP]));
  return D(dots, { size: 0.45, tone: "lo" });
}

// ------------------------------------------------------------------- decks
function meshOf(deck) {
  const [cols, rows, r] = deck.mesh;
  const z = deck.z + 3.6;
  const x0 = deck.x0 + 11;
  const x1 = deck.x1 - 11;
  const holes = [];
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      holes.push(k.ring(x0 + ((col + 0.5) / cols) * (x1 - x0), -23 + ((row + 0.5) / rows) * 46, r, z, P, 12));
    }
  }
  return holes.join("");
}

function grains(deck, index) {
  const z = deck.z + 3.6;
  const points = [];
  for (let n = 0; n < [7, 5, 4, 3][index]; n++) {
    points.push(at([
      deck.x0 + 13 + wobble(n + index * 7) * (deck.x1 - deck.x0 - 26),
      -19 + wobble(n + index * 7 + 0.5) * 38,
      z,
    ]));
  }
  return D(points, { size: 0.65, tone: "hi" });
}

function stream(x, y, from, to, seed) {
  const dots = [];
  const steps = Math.max(3, Math.round((from - to) / 5));
  for (let n = 0; n <= steps; n++) {
    const t = n / steps;
    dots.push(at([x + (wobble(n + seed) - 0.5) * 3.4, y + (wobble(n + seed + 0.3) - 0.5) * 14, from - t * (from - to)]));
  }
  return D(dots, { size: 0.6, tone: "mid" });
}

function deckOf(deck, index) {
  const z = deck.z;
  const w = deck.x1 - deck.x0;
  const out = [];
  const plan = { x: deck.x0, y: -34, w, d: 68, r: 3 };
  for (const [x, y] of byDepth(k.corners(plan, 7))) {
    out.push(S(k.cylinder(x, y, 5.2, 0, 2, P, 24), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 3.2, 2, z - 5, P, 24), { tone: "mid", crease: "none" }));
    out.push(S(k.cylinder(x, y, 4.4, z - 5, 5, P, 24), { tone: "mid" }));
  }
  const rail = (plan2) => S(k.slabOf(plan2, z, FRAME_H, P, 3, 0.5), {
    tone: "mid",
    inner: k.lineSvg(k.sideSeam(plan2, z + 4.4, P, 3), { tone: "faint" }),
  });
  out.push(rail({ x: deck.x0, y: -34, w, d: 7, r: 2 }));
  out.push(rail({ x: deck.x0, y: -27, w: 7, d: 54, r: 2 }));
  out.push(
    `<g data-screen="${index}">${S(k.slabOf({ x: deck.x0 + 6, y: -28, w: w - 12, d: 56, r: 1.5 }, z + 2, 1.6, P, 3, 0.4), {
      tone: "hi",
      crease: "lo",
    })}${L(meshOf(deck), { tone: "lo" })}</g>`,
  );
  out.push(grains(deck, index));
  if (index > 0) out.push(stream(deck.x0 + 4, 0, DECKS[index - 1].z + 3.6, z + 3.6, index * 2.7));
  out.push(rail({ x: deck.x1 - 7, y: -27, w: 7, d: 54, r: 2 }));
  out.push(rail({ x: deck.x0, y: 27, w, d: 7, r: 2 }));
  const heads = [
    [deck.x0 + 4, -30.5],
    [deck.x1 - 4, -30.5],
    [deck.x0 + 4, 30.5],
    [deck.x1 - 4, 30.5],
  ];
  out.push(L(heads.map(([x, y]) => k.ring(x, y, 1.9, z + FRAME_H, P, 14)).join(""), { tone: "lo" }));
  out.push(D(heads.map(([x, y]) => at([x, y, z + FRAME_H])), { size: 0.45 }));
  const thumb = [deck.x1 - 3.5, 12];
  out.push(S(k.cylinder(thumb[0], thumb[1], 2.6, z + FRAME_H, 5, P, 20), { tone: "mid" }));
  out.push(L(k.knurl(thumb[0], thumb[1], 2.6, z + FRAME_H, z + FRAME_H + 5, 18, P), { tone: "lo" }));
  return out.join("");
}

// --------------------------------------------------------------- the carriage
const ROD = G.rodOut(G.frameAlong([0, 0, CAR_Z], [0, 0, -1]), 0, CAR_Z - (REST_TOP + HEAD_H), 3, P, { stroke: STROKE });

function carriage() {
  const out = [];
  // guide plates that grip the two rails from outside
  for (const y of [-14.6, 11]) {
    out.push(S(k.slabOf({ x: -9, y, w: 18, d: 3.6, r: 1 }, BEAM_Z + 1.4, CAR_Z - BEAM_Z - 1.4, P, 2, 0.3), { tone: "mid" }));
    out.push(D([at([-5, y + 1.8, BEAM_Z + 4]), at([5, y + 1.8, BEAM_Z + 4])], { size: 0.45 }));
  }
  out.push(S(k.slabOf(CAR, CAR_Z, CAR_H, P, 3, 0.6), {
    tone: "mid",
    inner: k.lineSvg(k.sideSeam(CAR, CAR_Z + 4.8, P, 3), { tone: "faint" }),
  }));
  out.push(L(k.planOutline(k.insetPlan(CAR, 3.5), CAR_Z + CAR_H, P, 3), { tone: "faint" }));
  out.push(D(k.corners(CAR, 5).map(([x, y]) => at([x, y, CAR_Z + CAR_H])), { size: 0.5 }));
  out.push(L(k.corners(CAR, 5).map(([x, y]) => k.ring(x, y, 1.8, CAR_Z + CAR_H, P, 14)).join(""), { tone: "lo" }));
  // thumb screw that locks the carriage on the beam
  out.push(S(k.slabOf({ x: 12, y: -1.4, w: 4, d: 2.8, r: 0.8 }, CAR_Z + 1.4, 4, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(17.4, 0, 2.6, CAR_Z, 6, P, 20), { tone: "mid" }));
  out.push(L(k.knurl(17.4, 0, 2.6, CAR_Z, CAR_Z + 6, 18, P), { tone: "lo" }));
  return out.join("");
}

function probe() {
  const z = REST_TOP;
  const plan = { x: -9, y: -9, w: 18, d: 18, r: 2.5 };
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(plan, 2), z, 0.1, P)}" style="filter:blur(5px)"/>`];
  out.push(S(k.cylinder(0, 0, 6.6, z, 1.4, P, 28), { tone: "hi", lit: true }));
  out.push(S(k.slabOf(plan, z + 1.4, HEAD_H - 1.4, P, 4, 0.6), { tone: "hi", lit: true }));
  out.push(L(k.planOutline(k.insetPlan(plan, 3), z + HEAD_H, P, 4), { tone: "faint" }));
  out.push(D([[-6, -6], [6, -6], [-6, 6], [6, 6]].map(([x, y]) => at([x, y, z + HEAD_H])), { size: 0.45 }));
  return out.join("");
}

function dial() {
  const out = [];
  out.push(S(k.cylinder(0, 0, 7, DIAL_Z - 1.4, 1.4, P, 28), { tone: "mid" }));
  out.push(S(k.cylinder(0, 0, DIAL_R, DIAL_Z, DIAL_H, P, 64, 0.8), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(0, 0, DIAL_R, DIAL_TOP - 3.4, DIAL_TOP, 76, P, 0.3), { tone: "lo" }));
  out.push(L(k.sideArc(0, 0, DIAL_R, DIAL_TOP - 3.4, P, 40), { tone: "faint" }));
  out.push(L(k.ring(0, 0, DIAL_R - 2.2, DIAL_TOP, P, 64), { tone: "lo" }));
  const ticks = k.radialTicks(0, 0, DIAL_R - 3.2, 40, 10, DIAL_TOP, [1.3, 3], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(S(k.slabOf({ x: DIAL_R - 1, y: -2.6, w: 5, d: 5.2, r: 1.2 }, DIAL_Z + 2, 5, P, 3), { tone: "mid" }));
  out.push(S(k.slabOf({ x: DIAL_R + 3.6, y: -3.4, w: 2.8, d: 6.8, r: 1.2 }, DIAL_Z + 1.2, 6.8, P, 3), { tone: "mid" }));
  out.push(L(k.ring(0, 0, 1.7, DIAL_TOP, P, 16), { tone: "mid" }));
  out.push(k.faceTextSvg(k.topMatrix([0, 8.6], DIAL_TOP, P, "x"), "rows", { size: 2.4, tone: "lo", anchor: "middle" }));
  return out.join("");
}

const needleAt = (turn) => {
  const angle = turn * Math.PI * 2;
  return k.lineOnTop(
    [-Math.sin(angle) * 3.4, Math.cos(angle) * 3.4],
    [Math.sin(angle) * (DIAL_R - 4.4), -Math.cos(angle) * (DIAL_R - 4.4)],
    DIAL_TOP + 0.2,
    P,
  );
};

const turnOf = (top) => ((top - FRAME_H - FLOOR) / DECADE + 1.1 - 1) / 4;

// ------------------------------------------------------------------ assemble
const sorted = [
  { at: [POST_L, 0, 50], svg: post(POST_L) },
  ...DECKS.map((deck, index) => ({ at: [deck.at, 0, deck.z], svg: deckOf(deck, index) })),
  { at: [POST_R, 0, 50], svg: post(POST_R) },
].sort((a, b) => k.depthOf(a.at, P) - k.depthOf(b.at, P));

// The hopper stands above every deck, so nothing on the bench can cover it.
const feed = hopper() + stream(HOP_X, HOP_Y, SPOUT, DECKS[0].z + 3.6, 3.1);

const moving = [
  carriage(),
  `<g data-part="rod" transform="${k.translateAlong(P, [0, 0, 0])}"><clipPath id="rod-clip"><path data-hold d="${ROD.clip}"/></clipPath><g clip-path="url(#rod-clip)">${S(ROD.paths, { tone: "hi", crease: "none" })}</g></g>`,
  `<g data-part="probe" transform="${k.translateAlong(P, [0, 0, 0])}">${probe()}</g>`,
  dial(),
  `<path data-part="needle" class="iso-line" data-tone="lit" data-free="start" d="${needleAt(turnOf(REST_TOP))}" style="stroke-width:1.1"/>`,
].join("");

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A cascade grading tower on a bench. A hopper feeds the first of four screen decks, each one lower and finer than the last, and an overhead twin-rail beam carries a travelling gauge whose rod rests on whichever deck is beneath it; the dial reads how many rows are still on that deck.",
  body: [
    bench(),
    sorted.map((item) => item.svg).join(""),
    feed,
    railOf(RAIL_F),
    railDots(RAIL_F),
    `<g data-part="carriage" transform="${k.translateAlong(P, [STOPS[0], 0, 0])}">${moving}</g>`,
    railOf(RAIL_N),
    railDots(RAIL_N),
  ],
});

const live = `
const P = ${JSON.stringify(P)};
const DECKS = ${JSON.stringify(DECKS.map((deck) => ({ x0: deck.x0, x1: deck.x1, top: deck.top, label: deck.label })))};
const STOPS = ${JSON.stringify(STOPS)};
const REACH = ${JSON.stringify(REACH)};
const REST_TOP = ${REST_TOP}, FRAME_H = ${FRAME_H}, FLOOR = ${FLOOR}, DECADE = ${DECADE};
const DIAL_R = ${DIAL_R}, DIAL_TOP = ${DIAL_TOP};
const REST_PAD = ${DECKS[3].top};
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const carriage = svg.querySelector('[data-part="carriage"]');
const rod = svg.querySelector('[data-part="rod"]');
const probe = svg.querySelector('[data-part="probe"]');
const needle = svg.querySelector('[data-part="needle"]');
const screens = [...svg.querySelectorAll("[data-screen]")];
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");
const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
const needleAt = ${needleAt.toString().replace(/k\./g, "")};
const turnOf = ${turnOf.toString()};
const deckUnder = (x) => {
  let found = -1;
  DECKS.forEach((deck, index) => {
    if (x >= deck.x0 && x <= deck.x1 && (found < 0 || deck.top > DECKS[found].top)) found = index;
  });
  return found;
};
const topUnder = (x) => { const index = deckUnder(x); return index < 0 ? REST_PAD : DECKS[index].top; };
const rowsAt = (top) => Math.pow(10, (top - FRAME_H - FLOOR) / DECADE + 1.1);
const say = (value) => (value >= 1000 ? Math.round(value / 100) * 100 : Math.round(value)).toLocaleString("en-US");
let x = STOPS[0], target = x, head = { at: REST_TOP, rate: 0 }, lit = -2;
let frame = 0, last = 0, clock = 0, touring = true, visible = false, idleTimer = 0;
const tourAt = (t) => STOPS[Math.floor(t / 2.6) % STOPS.length];
function draw() {
  const drop = REST_TOP - head.at;
  carriage.setAttribute("transform", translateAlong(P, [x, 0, 0]));
  const shift = translateAlong(P, [0, 0, -drop]);
  rod.setAttribute("transform", shift);
  probe.setAttribute("transform", shift);
  holdStill(rod, axisVector(P, [0, 0, -drop]));
  needle.setAttribute("d", needleAt(turnOf(head.at)));
  const index = deckUnder(x);
  if (index !== lit) {
    screens.forEach((group, seat) => {
      const solid = group.firstElementChild;
      const mesh = group.lastElementChild;
      if (seat === index) { solid.setAttribute("data-lit", ""); mesh.setAttribute("data-tone", "hi"); }
      else { solid.removeAttribute("data-lit"); mesh.setAttribute("data-tone", "lo"); }
    });
    lit = index;
  }
  const text = index < 0 ? "between decks" : DECKS[index].label + " · " + say(rowsAt(head.at)) + " on the deck";
  if (readout.textContent !== text) readout.textContent = text;
  stage.setAttribute("aria-valuenow", String(index < 0 ? 0 : index + 1));
  stage.setAttribute("aria-valuetext", text);
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  const calm = still.matches;
  if (touring) { clock += dt; target = tourAt(clock); }
  x = calm ? target : x + (target - x) * (1 - Math.exp(-dt / 0.34));
  if (Math.abs(target - x) < 0.01) x = target;
  const want = topUnder(x);
  const stiff = 300, drag = calm ? 2 * Math.sqrt(300) : 24;
  for (let i = 0; i < 4; i++) {
    head.rate += ((want - head.at) * stiff - head.rate * drag) * dt / 4;
    head.at += head.rate * dt / 4;
  }
  if (Math.abs(want - head.at) < 0.005 && Math.abs(head.rate) < 0.005) { head.at = want; head.rate = 0; }
  draw();
  const settled = !touring && x === target && head.rate === 0 && head.at === want;
  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (next) => {
  touring = false;
  target = clamp(next, REACH[0], REACH[1]);
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 4200);
  run();
};
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
if (still.matches) touring = false;
stage.addEventListener("pointermove", (event) => {
  const box = svg.getBoundingClientRect();
  const share = clamp(((event.clientX - box.left) / box.width - 0.1) / 0.8, 0, 1);
  steer(REACH[0] + share * (REACH[1] - REACH[0]));
});
stage.addEventListener("pointerleave", () => steer(target));
stage.addEventListener("keydown", (event) => {
  const here = STOPS.reduce((best, stop, index) => (Math.abs(stop - target) < Math.abs(STOPS[best] - target) ? index : best), 0);
  let to = null;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") to = Math.min(STOPS.length - 1, here + 1);
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") to = Math.max(0, here - 1);
  if (event.key === "Home") to = 0;
  if (event.key === "End") to = STOPS.length - 1;
  if (to === null) return;
  event.preventDefault();
  steer(STOPS[to]);
});
draw();
`;

const body = k.plateHtml({
  fig: "Fig 1",
  title: "Nikhil Kudupudi · the shape of the work",
  hint: "Hover to run the gauge along the decks",
  readout: "fact rows · 25,000 on the deck",
  keys: [
    { mark: "lit", label: "The gauge head and the deck it is reading" },
    { mark: "raised", label: "Four screen decks, each lower and finer than the one that feeds it" },
  ],
  caption:
    "Raw filings fall from the hopper onto the first screen and work their way down. Each deck sits as far below the one above as the data it loses: about 25,000 fact rows, 503 us-gaap tags, 21 mapped metrics, 15 served KPIs, one decade of rows per step. The travelling gauge rests on the deck beneath it and reads that number off a log scale — the hard narrowing happens early, and the last step is a short drop.",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Cascade grading tower: arrow keys run the gauge from deck to deck" aria-valuemin="1" aria-valuemax="4" aria-valuenow="1">${svg}</div>`,
});

const file = theme === "light" ? "cascade-light.html" : "cascade.html";
writeFileSync(join(HERE, file), k.pageHtml({ title: "The shape of the work", theme, body, script: kitScript() + live, width: 760 }));
console.log("wrote", file);

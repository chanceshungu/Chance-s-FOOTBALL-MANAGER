// ═══════════════════════════════════════════════════════════
// DEEP MATCH ENGINE V2
// Breaks squad into unit ratings, simulates attack vs defense
// matchups, names scorers/assisters, formation counters
// ═══════════════════════════════════════════════════════════

import { FORM_BONUS, FORM_COUNTERS } from '../data/formations.js';

const ATK_POS = ["ST", "LW", "RW", "CAM"];
const MID_POS = ["CM", "CDM", "CAM"];
const DEF_POS = ["CB", "LB", "RB"];

/**
 * Break a squad into tactical units and calculate unit strengths
 */
export function analyzeSquad(squad, formation) {
  const fit = squad.filter(p => !p.injured);
  const xi = fit.sort((a, b) => b.ovr - a.ovr).slice(0, 11);

  if (xi.length < 7) {
    return {
      atk: 40, mid: 40, def: 40, gk: 40,
      xi, attackers: [], midfielders: [], defenders: [], keeper: null,
    };
  }

  const fb = FORM_BONUS[formation] || { atk: 0, mid: 0, def: 0 };
  const attackers = xi.filter(p => ATK_POS.includes(p.pos));
  const midfielders = xi.filter(p => MID_POS.includes(p.pos) && !ATK_POS.includes(p.pos));
  const defenders = xi.filter(p => DEF_POS.includes(p.pos));
  const keeper = xi.find(p => p.pos === "GK");

  const unitStr = (players) => {
    if (!players.length) return 55;
    return players.reduce((s, p) => s + p.ovr * (0.7 + p.form * 0.002 + p.fitness * 0.001), 0) / players.length;
  };

  return {
    atk: unitStr(attackers) + fb.atk,
    mid: unitStr(midfielders) + fb.mid,
    def: unitStr(defenders) + fb.def,
    gk: keeper ? (keeper.ovr * (0.7 + keeper.form * 0.002)) : 50,
    xi, attackers, midfielders, defenders, keeper,
  };
}

// Pick a scorer weighted by OVR — attackers most likely
function pickScorer(team) {
  const pool = [
    ...team.attackers.map(p => ({ p, w: p.ovr * 3 })),
    ...team.midfielders.map(p => ({ p, w: p.ovr })),
    ...team.defenders.map(p => ({ p, w: p.ovr * 0.3 })),
  ];
  const total = pool.reduce((s, x) => s + x.w, 0);
  let roll = Math.random() * total;
  for (const x of pool) {
    roll -= x.w;
    if (roll <= 0) return x.p;
  }
  return pool[0]?.p;
}

function pickAssister(team, scorer) {
  const pool = [...team.attackers, ...team.midfielders, ...team.defenders]
    .filter(p => p.id !== scorer?.id);
  if (!pool.length) return null;
  const total = pool.reduce((s, p) => s + p.ovr, 0);
  let roll = Math.random() * total;
  for (const p of pool) {
    roll -= p.ovr;
    if (roll <= 0) return p;
  }
  return pool[0];
}

function pickFouler(team) {
  const pool = [...team.midfielders, ...team.defenders, ...team.attackers];
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Full minute-by-minute match simulation with named events
 */
export function simMatchV2(homeSquad, awaySquad, homeForm, awayForm) {
  const h = analyzeSquad(homeSquad, homeForm || "4-3-3");
  const a = analyzeSquad(awaySquad, awayForm || "4-3-3");

  const hCounter = (FORM_COUNTERS[homeForm] || {})[awayForm] || 0;
  const aCounter = (FORM_COUNTERS[awayForm] || {})[homeForm] || 0;

  const HOME_BOOST = 4;
  const hChanceRating = (h.atk + h.mid * 0.6 + HOME_BOOST + hCounter) - (a.def + a.mid * 0.4 + aCounter);
  const aChanceRating = (a.atk + a.mid * 0.6 + aCounter) - (h.def + h.mid * 0.4 + HOME_BOOST + hCounter);

  const hChanceProb = Math.max(0.5, Math.min(6, (hChanceRating + 30) * 0.1)) / 100;
  const aChanceProb = Math.max(0.5, Math.min(6, (aChanceRating + 30) * 0.1)) / 100;

  const hConvert = Math.max(0.15, Math.min(0.55, (h.atk - a.gk + 20) * 0.012));
  const aConvert = Math.max(0.15, Math.min(0.55, (a.atk - h.gk + 20) * 0.012));

  let hg = 0, ag = 0;
  const events = [];
  const injuryTime = [Math.floor(Math.random() * 4) + 1, Math.floor(Math.random() * 6) + 1];
  let hReds = 0, aReds = 0;

  const simHalf = (start, end, extra) => {
    const hMult = hReds > 0 ? 0.8 : 1;
    const aMult = aReds > 0 ? 0.8 : 1;

    for (let m = start; m <= end + extra; m++) {
      const fatigue = m > 70 ? 0.92 : m > 60 ? 0.96 : 1;
      const r = Math.random();

      // HOME CHANCE
      if (r < hChanceProb * hMult) {
        if (Math.random() < hConvert * fatigue) {
          hg++;
          const scorer = pickScorer(h);
          const assister = Math.random() < 0.65 ? pickAssister(h, scorer) : null;
          const txt = assister
            ? `⚽ ${m}' GOAL! ${scorer?.name || "Unknown"} (assist: ${assister.name}) [${hg}-${ag}]`
            : `⚽ ${m}' GOAL! ${scorer?.name || "Unknown"} [${hg}-${ag}]`;
          events.push({ m, type: "goal", team: "home", text: txt, scorer: scorer?.name, assister: assister?.name });
        } else {
          const shotTaker = pickScorer(h);
          if (Math.random() < 0.4) {
            events.push({ m, type: "save", team: "home", text: `🧤 ${m}' ${a.keeper?.name || "Keeper"} saves from ${shotTaker?.name || "striker"}` });
          } else if (Math.random() < 0.5) {
            events.push({ m, type: "miss", team: "home", text: `😤 ${m}' ${shotTaker?.name || "Striker"} fires wide` });
          } else {
            events.push({ m, type: "chance", team: "home", text: `🔥 ${m}' ${shotTaker?.name || "Attacker"} with a chance` });
          }
        }
      }
      // AWAY CHANCE
      else if (r < hChanceProb * hMult + aChanceProb * aMult) {
        if (Math.random() < aConvert * fatigue) {
          ag++;
          const scorer = pickScorer(a);
          const assister = Math.random() < 0.65 ? pickAssister(a, scorer) : null;
          const txt = assister
            ? `⚽ ${m}' GOAL! ${scorer?.name || "Unknown"} (assist: ${assister.name}) [${hg}-${ag}]`
            : `⚽ ${m}' GOAL! ${scorer?.name || "Unknown"} [${hg}-${ag}]`;
          events.push({ m, type: "goal", team: "away", text: txt, scorer: scorer?.name, assister: assister?.name });
        } else {
          const shotTaker = pickScorer(a);
          if (Math.random() < 0.4) {
            events.push({ m, type: "save", team: "away", text: `🧤 ${m}' ${h.keeper?.name || "Keeper"} denies ${shotTaker?.name || "striker"}` });
          } else if (Math.random() < 0.5) {
            events.push({ m, type: "miss", team: "away", text: `😤 ${m}' ${shotTaker?.name || "Striker"} misses` });
          } else {
            events.push({ m, type: "chance", team: "away", text: `🔥 ${m}' ${shotTaker?.name || "Attacker"} threatens` });
          }
        }
      }
      // FOULS / CARDS
      else if (r < hChanceProb * hMult + aChanceProb * aMult + 0.04) {
        const isH = Math.random() < 0.5;
        const fouler = pickFouler(isH ? h : a);
        if (Math.random() < 0.35) {
          events.push({ m, type: "yellow", team: isH ? "home" : "away", text: `🟨 ${m}' Yellow card — ${fouler?.name || "Player"}` });
        } else {
          events.push({ m, type: "foul", team: isH ? "home" : "away", text: `⚡ ${m}' Foul by ${fouler?.name || "Player"}` });
        }
      }
      else if (r < hChanceProb * hMult + aChanceProb * aMult + 0.043) {
        const isH = Math.random() < 0.5;
        const fouler = pickFouler(isH ? h : a);
        events.push({ m, type: "red", team: isH ? "home" : "away", text: `🟥 ${m}' RED CARD! ${fouler?.name || "Player"} sent off!` });
        if (isH) hReds++; else aReds++;
      }
      else if (r < hChanceProb * hMult + aChanceProb * aMult + 0.05) {
        const isH = Math.random() < 0.5;
        const p = pickFouler(isH ? h : a);
        events.push({ m, type: "injury", team: isH ? "home" : "away", text: `🏥 ${m}' ${p?.name || "Player"} goes down injured` });
      }
      else if (r < hChanceProb * hMult + aChanceProb * aMult + 0.055) {
        events.push({ m, type: "var", team: Math.random() < 0.5 ? "home" : "away", text: `📺 ${m}' VAR reviewing...` });
      }
      else if (r < hChanceProb * hMult + aChanceProb * aMult + 0.065) {
        events.push({ m, type: "corner", team: Math.random() < (h.atk / (h.atk + a.atk)) ? "home" : "away", text: `🚩 ${m}' Corner kick` });
      }
    }
  };

  simHalf(1, 45, injuryTime[0]);
  events.push({ m: 45 + injuryTime[0], type: "half", team: "none", text: `🕐 HALF TIME: ${hg}-${ag}` });
  simHalf(46, 90, injuryTime[1]);
  events.push({ m: 90 + injuryTime[1], type: "full", team: "none", text: `🏁 FULL TIME: ${hg}-${ag}` });

  return { homeGoals: hg, awayGoals: ag, events, homeAnalysis: h, awayAnalysis: a };
}

/**
 * Quick sim for AI matches — same logic, no events generated
 */
export function quickSim(hSquad, aSquad) {
  const h = analyzeSquad(hSquad, "4-3-3");
  const a = analyzeSquad(aSquad, "4-3-3");
  const hRate = (h.atk + h.mid * 0.6 + 4 - a.def - a.mid * 0.4 + 30) * 0.001 * 0.35;
  const aRate = (a.atk + a.mid * 0.6 - h.def - h.mid * 0.4 - 4 + 30) * 0.001 * 0.35;
  let hg = 0, ag = 0;
  for (let m = 0; m < 95; m++) {
    if (Math.random() < Math.max(0.005, hRate)) hg++;
    if (Math.random() < Math.max(0.005, aRate)) ag++;
  }
  return { hg, ag };
}


// Formation definitions, pitch layouts, tactical bonuses, and counter relationships

export const FORMATIONS = {
  "4-3-3":  { slots: ["GK","LB","CB","CB","RB","CM","CM","CAM","LW","RW","ST"] },
  "4-4-2":  { slots: ["GK","LB","CB","CB","RB","LW","CM","CM","RW","ST","ST"] },
  "3-5-2":  { slots: ["GK","CB","CB","CB","LB","CM","CDM","CM","RB","ST","ST"] },
  "4-2-3-1":{ slots: ["GK","LB","CB","CB","RB","CDM","CDM","LW","CAM","RW","ST"] },
  "5-3-2":  { slots: ["GK","LB","CB","CB","CB","RB","CM","CM","CM","ST","ST"] },
  "3-4-3":  { slots: ["GK","CB","CB","CB","LB","CM","CM","RB","LW","RW","ST"] },
  "4-1-4-1":{ slots: ["GK","LB","CB","CB","RB","CDM","LW","CM","CM","RW","ST"] },
  "4-3-2-1":{ slots: ["GK","LB","CB","CB","RB","CM","CM","CM","CAM","CAM","ST"] },
};

// Position compatibility for auto-selecting players into formation slots
export const POS_COMPAT = {
  GK:  ["GK"],
  CB:  ["CB"],
  LB:  ["LB","RB"],
  RB:  ["RB","LB"],
  CDM: ["CDM","CM"],
  CM:  ["CM","CDM","CAM"],
  CAM: ["CAM","CM"],
  LW:  ["LW","RW"],
  RW:  ["RW","LW"],
  ST:  ["ST","CAM"],
};

// Pitch layout coordinates for each formation (r = top%, c = left%)
// Index matches the slots array order
export const PITCH_LAYOUTS = {
  "4-3-3": [
    {r:92,c:50},                                  // GK
    {r:76,c:12},{r:79,c:40},{r:79,c:60},{r:76,c:88}, // LB CB CB RB
    {r:55,c:38},{r:55,c:62},{r:40,c:50},          // CM CM CAM
    {r:24,c:14},{r:24,c:86},                      // LW RW
    {r:14,c:50},                                  // ST
  ],
  "4-4-2": [
    {r:92,c:50},
    {r:76,c:12},{r:79,c:40},{r:79,c:60},{r:76,c:88},
    {r:52,c:12},{r:52,c:40},{r:52,c:60},{r:52,c:88},
    {r:20,c:42},{r:20,c:58},
  ],
  "3-5-2": [
    {r:92,c:50},
    {r:79,c:34},{r:81,c:50},{r:79,c:66},
    {r:60,c:10},{r:52,c:40},{r:58,c:50},{r:52,c:60},{r:60,c:90},
    {r:20,c:42},{r:20,c:58},
  ],
  "4-2-3-1": [
    {r:92,c:50},
    {r:76,c:12},{r:79,c:40},{r:79,c:60},{r:76,c:88},
    {r:60,c:42},{r:60,c:58},
    {r:36,c:14},{r:38,c:50},{r:36,c:86},
    {r:14,c:50},
  ],
  "5-3-2": [
    {r:92,c:50},
    {r:78,c:8},{r:81,c:30},{r:82,c:50},{r:81,c:70},{r:78,c:92},
    {r:54,c:38},{r:57,c:50},{r:54,c:62},
    {r:20,c:42},{r:20,c:58},
  ],
  "3-4-3": [
    {r:92,c:50},
    {r:79,c:34},{r:81,c:50},{r:79,c:66},
    {r:60,c:10},{r:54,c:42},{r:54,c:58},{r:60,c:90},
    {r:24,c:14},{r:24,c:86},
    {r:14,c:50},
  ],
  "4-1-4-1": [
    {r:92,c:50},
    {r:76,c:12},{r:79,c:40},{r:79,c:60},{r:76,c:88},
    {r:60,c:50},
    {r:44,c:12},{r:48,c:40},{r:48,c:60},{r:44,c:88},
    {r:14,c:50},
  ],
  "4-3-2-1": [
    {r:92,c:50},
    {r:76,c:12},{r:79,c:40},{r:79,c:60},{r:76,c:88},
    {r:54,c:36},{r:56,c:50},{r:54,c:64},
    {r:38,c:42},{r:38,c:58},
    {r:14,c:50},
  ],
};

// Tactical bonuses per formation
export const FORM_BONUS = {
  "4-3-3":   { atk: 3, mid: 0, def: 0 },
  "4-4-2":   { atk: 1, mid: 2, def: 0 },
  "3-5-2":   { atk: 0, mid: 4, def:-1 },
  "4-2-3-1": { atk: 1, mid: 3, def: 1 },
  "5-3-2":   { atk:-2, mid: 1, def: 4 },
  "3-4-3":   { atk: 4, mid: 1, def:-2 },
  "4-1-4-1": { atk:-1, mid: 3, def: 2 },
  "4-3-2-1": { atk: 2, mid: 2, def: 0 },
};

// Formation counter advantages (value = bonus points when facing that opponent formation)
export const FORM_COUNTERS = {
  "4-3-3":   { "4-4-2": 2, "5-3-2": 3 },
  "4-4-2":   { "3-5-2": 3, "4-2-3-1": 2 },
  "3-5-2":   { "4-3-3": 2 },
  "4-2-3-1": { "4-3-3": 2, "4-4-2": 1, "3-4-3": 2 },
  "5-3-2":   { "4-4-2": 2, "4-2-3-1": 3 },
  "3-4-3":   { "5-3-2": 3, "4-4-2": 2 },
  "4-1-4-1": { "3-4-3": 3, "4-3-3": 1 },
  "4-3-2-1": { "4-1-4-1": 2, "3-5-2": 2 },
};

// Injury types with min/max weeks out
export const INJURIES = [
  { name: "Hamstring strain",   min: 2,  max: 6  },
  { name: "Ankle sprain",       min: 1,  max: 4  },
  { name: "Knee ligament",      min: 4,  max: 20 },
  { name: "Muscle fatigue",     min: 1,  max: 2  },
  { name: "Groin strain",       min: 2,  max: 5  },
  { name: "ACL tear",           min: 20, max: 38 },
  { name: "Calf injury",        min: 2,  max: 4  },
  { name: "Broken metatarsal",  min: 8,  max: 14 },
  { name: "Concussion",         min: 1,  max: 3  },
  { name: "Back spasm",         min: 1,  max: 3  },
];

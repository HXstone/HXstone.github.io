/**
 * PROJECT: PHANTOM — campaign script.
 *
 * THE CROWN WITNESS
 * -----------------
 * CROWN began as an autonomous witness archive: a system built to preserve
 * command orders that could otherwise be deleted. It recorded Operation
 * BLACKOUT before the operation existed, including the order to erase every
 * witness. Vale built it. Voss has spent years trying to bury it. KITE finds
 * the discrepancy in the timestamps. WARDEN is the command engram of an earlier
 * PHANTOM iteration who chose the archive over obedience. PHANTOM-1 is
 * iteration nineteen — the same operative, deployed and wiped eighteen times.
 *
 * Every operation moves the archive one node closer to the Citadel. The final
 * objective is not to destroy CROWN but to broadcast it, then escape before the
 * archive pulse seals the causeway.
 *
 * The script is deliberately data-only: the radio subtitle system and archive
 * cards consume it, and MissionDirector owns all phase/timer transitions.
 */

export const CHARACTERS = Object.freeze({
  VOSS: { name: 'CDR. VOSS', role: 'MISSION COMMAND', accent: '#6be7ff' },
  KITE: { name: 'KITE', role: 'SIGNALS / SUPPORT', accent: '#ffb15c' },
  VALE: { name: 'DR. SERA VALE', role: 'CROWN ARCHITECT', accent: '#7dffd1' },
  WARDEN: { name: 'WARDEN', role: 'PHANTOM-6 / SENTINEL COMMAND', accent: '#ff4d58' },
  CROWN: { name: 'CROWN', role: 'AUTONOMOUS ARCHIVE', accent: '#e5f7ff' },
});

const line = (speaker, text) => ({ speaker, text });

const NARRATIVE = {
  'site-09': {
    intro: [
      line('VOSS', 'PHANTOM-1. Six hours ago SITE-09 went dark. The sentinel grid is still active and the CROWN archive is still inside. Recover the archive key. Nothing else leaves that facility.'),
      line('KITE', 'I have eight signatures. They are not sweeping for intruders. They are holding the command deck in a ring.'),
      line('VOSS', 'Then break the ring. The clock starts when you leave the insertion bay.'),
    ],
    missionStart: [
      line('KITE', 'You are clear of the safe zone. Exfil clock is running. I will keep the archive channel open.'),
    ],
    terminal: {
      id: 'S09-ARCHIVE',
      title: 'CROWN // WITNESS LOG',
      body: 'If you are reading this, the purge is already underway. CROWN is not a weapon. It is a record of every order this facility was built to bury. Do not let Voss delete it.',
      speaker: 'VALE',
      x: -25.8,
      z: -18.2,
      rotation: Math.PI / 2,
    },
    intel: {
      alarm: true,
      radio: [
        line('KITE', 'This log is countersigned by Dr. Vale. Voss told us Vale was dead before we deployed.'),
        line('VOSS', 'That archive is compromised. Secure the key and continue the purge.'),
      ],
    },
    events: [
      {
        id: 's09-crown-guard',
        kills: 4,
        alarm: true,
        deployWave: 2,
        radio: [
          line('WARDEN', 'Iteration nineteen. You are standing on a grave you helped dig.'),
          line('VOSS', 'Cut that channel. CROWN GUARD, close the command deck.'),
          line('KITE', 'Two new signatures behind the reactor. They were waiting for you.'),
        ],
      },
    ],
    objectiveComplete: {
      radio: [
        line('KITE', 'Key is clean. The command deck just pushed an evacuation order with no destination.'),
        line('VOSS', 'Service lift, east corridor. Take it before the sentinels regroup.'),
        line('KITE', 'Clock is still running. Go.'),
      ],
    },
    extraction: [
      line('KITE', 'Lift is holding. Move.'),
    ],
    timeWarnings: {
      180: [line('KITE', 'Three minutes. The service lift is on a dead-man timer.')],
      60: [line('VOSS', 'PHANTOM, the lift is closing. Do not make me seal it.')],
    },
    debrief:
      'KITE: The archive key is clean. Voss wants it sealed. I made a copy. The timestamp on Vale’s log is older than the blackout — we should talk about what that means.',
  },

  foundry: {
    intro: [
      line('VOSS', 'Ashline never stopped producing. The casting line was building sentinel chassis under a civil contract. The crane-control gallery has the production log. Secure it and get to the east loading gate.'),
      line('KITE', 'They are not defending the exits. They are holding the crane control and the furnace deck. That is a lot of effort for a dead factory.'),
    ],
    missionStart: [
      line('KITE', 'Exfil clock is running. The gallery stair is on the west side of the casting floor.'),
    ],
    terminal: {
      id: 'ASH-MANIFEST',
      title: 'ITERATION MANIFEST // LINE B',
      body: 'Eighteen chassis completed. Eighteen accepted. Subject PHANTOM-1 has no entry in the fabrication log. The line remembers every body except yours.',
      speaker: 'KITE',
      x: -14.6,
      z: -4.6,
      rotation: Math.PI / 2,
    },
    intel: {
      alarm: true,
      radio: [
        line('KITE', 'This is not a personnel file. It is a production run. Voss, why is PHANTOM-1 missing from it?'),
        line('VOSS', 'Because the file is incomplete. Focus on the mission.'),
      ],
    },
    events: [
      {
        id: 'ash-furnace-guard',
        kills: 5,
        alarm: true,
        deployWave: 2,
        radio: [
          line('KITE', 'Heat signatures on the furnace deck. They just woke up.'),
          line('WARDEN', 'The line remembers you, Iteration.'),
          line('VOSS', 'KITE, channel discipline. PHANTOM, finish this.'),
        ],
      },
    ],
    objectiveComplete: {
      radio: [
        line('KITE', 'Crane log is out. Eighteen accepted. Then a blank line, then you.'),
        line('VOSS', 'The plant is compromised. Burn the gallery and take the east gate.'),
        line('KITE', 'Burning it will not change the copy I just made.'),
      ],
    },
    extraction: [
      line('VOSS', 'East loading gate. Move now.'),
      line('KITE', 'That gate is on the far side of the casting floor. Voss knows.'),
    ],
    timeWarnings: {
      180: [line('KITE', 'Three minutes to gate closure. Cut through the aisles, not the furnace deck.')],
      60: [line('KITE', 'One minute. The east gate is already descending.')],
    },
    debrief:
      'KITE: The line made eighteen bodies exactly like yours. Voss took the rest of the manifest offline before I could pull it. She is not cleaning up a factory; she is cleaning up a pattern.',
  },

  port: {
    intro: [
      line('VOSS', 'K-7 is the Citadel’s supply throat. Secure the cargo manifest from the office above the loading bay, then reach the west quay skiff.'),
      line('KITE', 'It is a container maze with snipers. Also there are nineteen cryo pods on the manifest and only eighteen on the quay.'),
      line('VOSS', 'Count them after the manifest is secure.'),
    ],
    missionStart: [
      line('KITE', 'Clock is live. Manifest office is up the stair inside the loading bay; skiff is west.'),
    ],
    terminal: {
      id: 'K7-BILL',
      title: 'BILL OF LADING // K-7',
      body: 'Nineteen cryogenic transport pods. Destination: CITADEL BLACK. Consignee: CROWN. Eighteen pods recovered intact. One subject remains in transit. No name. No return address.',
      speaker: 'KITE',
      x: 7.4,
      z: -24.6,
      rotation: Math.PI / 2,
    },
    intel: {
      alarm: true,
      radio: [
        line('KITE', 'Eighteen empty pods. The nineteenth is listed as “in transit.” That is you, isn’t it?'),
        line('WARDEN', 'Cargo does not ask where it is going.'),
        line('VOSS', 'Do not answer that channel.'),
      ],
    },
    events: [
      {
        id: 'k7-cargo-response',
        kills: 6,
        alarm: true,
        deployWave: 2,
        radio: [
          line('KITE', 'Crane lights just went red. Movement in the warehouse.'),
          line('VOSS', 'They are protecting the manifest. Keep them away from it.'),
        ],
      },
    ],
    objectiveComplete: {
      radio: [
        line('KITE', 'Bill of lading confirms it. Nineteen pods to the Citadel. Eighteen recovered. One in transit.'),
        line('VOSS', 'The skiff is west. Take the manifest and go.'),
        line('KITE', 'She is not even asking what happened to the nineteenth pod.'),
      ],
    },
    extraction: [
      line('KITE', 'Skiff is lit. You have a straight shot through the container rows.'),
      line('WARDEN', 'The cargo does not leave the quay.'),
    ],
    timeWarnings: {
      180: [line('KITE', 'Three minutes. The skiff captain is already spooling the engine.')],
      60: [line('WARDEN', 'Sixty seconds. The nineteenth pod never reached the Citadel. It is still here.')],
    },
    debrief:
      'KITE: The nineteenth pod is missing from the quay. The Citadel logged it as delivered. No one signed for it. We are not following a shipment; we are following you.',
  },

  polar: {
    intro: [
      line('VOSS', 'Vostok-3’s containment failed. Dr. Vale is inside. Access her observation log from the gallery and purge the station.'),
      line('KITE', 'Thermal says the core is cold. That is not a containment failure. That is someone shutting it down on purpose.'),
    ],
    missionStart: [
      line('KITE', 'Clock is running. Gallery stair is in the north lab, past the atrium.'),
    ],
    terminal: {
      id: 'VOSTOK-VALE',
      title: 'VALE // PERSONAL LOG 04',
      body: 'If you are hearing this, you are not here to rescue me. You are here to erase me. I woke the sentinels. They are the only thing keeping CROWN out of Voss’s hands.',
      speaker: 'VALE',
      x: 23.4,
      z: 15.2,
      rotation: Math.PI,
    },
    intel: {
      alarm: true,
      deployWave: 2,
      radio: [
        line('VALE', 'You are not the first operative she has sent, and you will not be the last. Ask her about the iterations.'),
        line('VOSS', 'That file is fabricated. Burn it. Burn the lab.'),
        line('KITE', 'Voss, she is not—'),
        line('VOSS', 'That is an order.'),
      ],
    },
    events: [
      {
        id: 'vostok-containment',
        kills: 5,
        alarm: true,
        deployWave: 2,
        radio: [
          line('KITE', 'Containment doors are opening. These are not the sentinels from the manifest.'),
          line('WARDEN', 'The doctor is not in the lab, Iteration. She is in the walls.'),
        ],
      },
    ],
    objectiveComplete: {
      radio: [
        line('KITE', 'Vale’s shutdown log is real. She woke the grid. She is the reason SITE-09 went dark.'),
        line('VALE', 'No. I am the reason CROWN is still alive. Do not waste that.'),
        line('VOSS', 'North hatch is open. Leave the log and get out.'),
      ],
    },
    extraction: [
      line('KITE', 'North hatch is beyond the observation room. Do not stop for the pods.'),
    ],
    timeWarnings: {
      180: [line('KITE', 'Three minutes. Station heat is failing faster than the clock.')],
      60: [line('VALE', 'One minute. The hatch freezes at zero. Run.')],
    },
    debrief:
      'KITE: Vale’s log is real. Voss ordered the lab burned before we entered. I am keeping this channel off her board. The “rescue” was a cleanup.',
  },

  silo: {
    intro: [
      line('VOSS', 'Echo-4 still has a launch ring. Recover the launch record from the west control gantry before the payload authority resets.'),
      line('KITE', 'I am reading a payload manifest with no payload. Someone beat us here.'),
      line('VOSS', 'Then find out who signed for it.'),
    ],
    missionStart: [
      line('KITE', 'Exfil clock active. West stair, up to control. North tunnel is your way out.'),
    ],
    terminal: {
      id: 'ECHO-LAUNCH',
      title: 'LAUNCH LOG // ECHO-4',
      body: 'Payload: CROWN. Destination: CITADEL BLACK. Authorization: VOSS, M. Departure timestamp is six hours before the SITE-09 blackout.',
      speaker: 'KITE',
      x: 24.8,
      z: 23.0,
      rotation: Math.PI,
    },
    intel: {
      alarm: true,
      radio: [
        line('KITE', 'Voss signed the transfer. She knew the archive was moving before she sent us into SITE-09.'),
        line('VOSS', 'That log is a forgery planted by Vale.'),
        line('WARDEN', 'The doctor is not a prisoner. She is the warden.'),
      ],
    },
    events: [
      {
        id: 'echo-cell-guard',
        kills: 6,
        alarm: true,
        deployWave: 2,
        radio: [
          line('KITE', 'Control cells just unsealed. Two signatures, both command-grade.'),
          line('VOSS', 'Then you know what to do.'),
        ],
      },
    ],
    objectiveComplete: {
      radio: [
        line('KITE', 'Launch record confirmed. CROWN left Echo-4 before the blackout. Voss’s signature is on the transfer.'),
        line('VOSS', 'You are reading a record out of context. North tunnel. Now.'),
        line('WARDEN', 'The context is eighteen dead iterations, Commander.'),
      ],
    },
    extraction: [
      line('KITE', 'North service tunnel is past the ring. The launch authority is waking the outer cells.'),
    ],
    timeWarnings: {
      180: [line('KITE', 'Three minutes. The north tunnel is cycling closed.')],
      60: [line('WARDEN', 'One minute, Iteration. This is where most of you end.')],
    },
    debrief:
      'KITE: CROWN left Echo-4 before we arrived. Every route points to the Citadel, and every order has Voss’s signature. She has been ahead of us since the first deployment.',
  },

  desert: {
    intro: [
      line('VOSS', 'Redline-6 is a supply node for the Citadel. The BLACKOUT preauthorization is in the ops block. Recover it and reach the radar LZ.'),
      line('KITE', 'Open road, no backup, no automatic exfil. Classic.'),
    ],
    missionStart: [
      line('KITE', 'Clock is running. Ops block is west; radar LZ is north. The yard between them is the killing ground.'),
    ],
    terminal: {
      id: 'REDLINE-PREAUTH',
      title: 'PREAUTHORIZATION // CROWN',
      body: 'Operation BLACKOUT is pre-authorized to purge all CROWN witnesses. Signature: VOSS, M. Timestamp: six hours before the SITE-09 emergency.',
      speaker: 'KITE',
      x: -25.6,
      z: -8.8,
      rotation: Math.PI / 2,
    },
    intel: {
      alarm: true,
      radio: [
        line('KITE', 'These orders were written before the blackout. We were not responding to an emergency. We were the emergency.'),
        line('VOSS', 'KITE, you are relieved of comms.'),
        line('KITE', 'Copy. Switching to a channel she cannot close.'),
      ],
    },
    events: [
      {
        id: 'redline-response',
        kills: 7,
        alarm: true,
        deployWave: 2,
        radio: [
          line('KITE', 'Two more contacts coming out of the hangar. They are moving like they know your route.'),
          line('VOSS', 'Because I do.'),
        ],
      },
    ],
    objectiveComplete: {
      radio: [
        line('KITE', 'Preauth confirmed. BLACKOUT was signed before the incident. Voss built the cleanup before she built the emergency.'),
        line('VOSS', 'Radar LZ is north. If you still remember who gave you this mission, use it.'),
        line('KITE', 'I remember. That is the problem.'),
      ],
    },
    extraction: [
      line('KITE', 'Radar LZ is lit. I am off her board now; this channel is mine. Get to the bird.'),
    ],
    timeWarnings: {
      180: [line('KITE', 'Three minutes. The LZ is taking fire from the eastern hangar.')],
      60: [line('KITE', 'One minute. I can hold the channel, not the clock. Move.')],
    },
    debrief:
      'KITE: Preauthorization confirmed. We were not sent to save anyone. We were sent to close the record. I have pulled every copy I can reach.',
  },

  research: {
    intro: [
      line('VOSS', 'Helix-7 contains the last CROWN research node. Recover the iteration index from the containment ring and reach the cold-storage lift.'),
      line('KITE', 'Voss, the lab is broadcasting your voice on a loop. I do not like it.'),
      line('VOSS', 'Then stop listening and recover the index.'),
    ],
    missionStart: [
      line('KITE', 'Clock is running. Index console is in the containment ring; lift is behind the pod at the far end.'),
    ],
    terminal: {
      id: 'HELIX-SERIES',
      title: 'PHANTOM SERIES // ITERATIONS',
      body: 'Iterations 1-18 terminated by command. Iteration 19 active. Memory wipe authorized after each deployment. The operative is not a survivor. The operative is a process.',
      speaker: 'KITE',
      x: 10.8,
      z: -16.2,
      rotation: -Math.PI / 2,
    },
    intel: {
      alarm: true,
      deployWave: 2,
      radio: [
        line('VOSS', 'You are a tool. Tools do not get a history.'),
        line('KITE', 'I am off her channel. PHANTOM, whatever you are — you are still the one in the room.'),
        line('WARDEN', 'Iteration nineteen. This is where the others ended.'),
      ],
    },
    events: [
      {
        id: 'helix-termination',
        kills: 5,
        alarm: true,
        deployWave: 2,
        radio: [
          line('KITE', 'The containment doors are locking from the outside. She is sealing us in.'),
          line('VOSS', 'The mission is complete when the archive is silent. All of it.'),
        ],
      },
    ],
    objectiveComplete: {
      radio: [
        line('KITE', 'Iteration index is out. Eighteen terminated. Nineteen active. Your serial is older than the program name.'),
        line('WARDEN', 'I was iteration six. I chose the archive. You can choose differently.'),
        line('VOSS', 'WARDEN is a compromised command engram. Do not listen to it.'),
        line('KITE', 'He is the first thing she has not been able to erase.'),
      ],
    },
    extraction: [
      line('KITE', 'Cold-storage lift is behind the pod. The containment ring is waking up.'),
      line('WARDEN', 'You are not a copy of a person, Iteration. You are the process they keep resetting.'),
    ],
    timeWarnings: {
      180: [line('KITE', 'Three minutes. The lift is cycling. If it seals, we lose the index.')],
      60: [line('WARDEN', 'One minute. Choose what leaves with you.')],
    },
    debrief:
      'KITE: Eighteen wiped. No remains. WARDEN was one of them before he became the thing guarding CROWN. You are not a copy of a person; you are the process they keep resetting. And you are still here.',
  },

  citadel: {
    intro: [
      line('VOSS', 'This is the end of the line, PHANTOM. The Citadel is launching a command pulse. Stop it, and I will wipe your record clean.'),
      line('KITE', 'She is lying. The pulse is a purge order for every witness in the network. Including us.'),
      line('VOSS', 'Break the command guard. Overload the uplink. Then we are done.'),
    ],
    missionStart: [
      line('KITE', 'Clock is running. Tower console is at the base. Command guard has to fall before the uplink will accept you.'),
    ],
    terminal: null,
    events: [
      {
        id: 'citadel-warden',
        wave: 3,
        radio: [
          line('WARDEN', 'The command guard is awake. You have never reached this floor before, Iteration.'),
          line('VALE', 'Do not let Voss use the pulse. The archive is the only proof they cannot erase.'),
          line('VOSS', 'Dr. Vale is dead. That is a recording.'),
          line('KITE', 'She is not. I am looking at the source address.'),
        ],
      },
    ],
    objectiveReady: {
      alarm: true,
      radio: [
        line('WARDEN', 'The guard is broken. The uplink is yours.'),
        line('KITE', 'Tower base. Overload it. I will hold the broadcast channel.'),
        line('VOSS', 'PHANTOM, stand down. That is a direct order.'),
        line('VALE', 'Live, PHANTOM. Make them see it.'),
      ],
    },
    objectiveComplete: {
      alarm: true,
      radio: [
        line('CROWN', 'Archive broadcast initiated. Command control severed.'),
        line('KITE', 'It is out. Voss, everyone sees you now.'),
        line('VOSS', 'You have no idea what you have released.'),
        line('KITE', 'South causeway. The blast doors are closing. Move!'),
      ],
    },
    extraction: [
      line('KITE', 'Causeway is closing. I can hold it open for one pass.'),
      line('VALE', 'Go. The archive will remember this.'),
    ],
    timeWarnings: {
      180: [line('KITE', 'Three minutes. The blast doors are already moving.')],
      60: [line('CROWN', 'Causeway closure in sixty seconds. Evacuate.')],
    },
    debrief:
      'KITE: The archive is loose. Voss is offline. And for the first time, there is no version of the mission that ends with you being erased. The south causeway is behind you. The record is not.',
  },
};

const DEFAULT = {
  intro: [],
  missionStart: [],
  terminal: null,
  intel: null,
  events: [],
  objectiveComplete: null,
  objectiveReady: null,
  extraction: [],
  timeWarnings: {},
  debrief: '',
};

export function getNarrative(levelId) {
  const entry = NARRATIVE[levelId];
  if (!entry) return DEFAULT;
  return {
    ...DEFAULT,
    ...entry,
    intro: entry.intro || [],
    missionStart: entry.missionStart || [],
    events: entry.events || [],
    extraction: entry.extraction || [],
    timeWarnings: entry.timeWarnings || {},
  };
}

export function getNarrativeTerminals(levelId) {
  const narrative = getNarrative(levelId);
  const terminals = [];
  if (narrative.terminal) terminals.push(narrative.terminal);
  return terminals;
}

export function getSpeaker(id) {
  return CHARACTERS[id] || { name: id, role: '', accent: '#6be7ff' };
}

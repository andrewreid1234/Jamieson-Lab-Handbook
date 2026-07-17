# Interview Question Bank

## How to use this document

Every chapter starts with an interview, not an assumption (see `laboratory-handbook-project-prompt.md`
and `handbook-maintenance-guide.md`). This bank exists so that interview isn't reinvented — and isn't
generic — every time.

A few ground rules:

- **These are starting points, not a script.** Read the questions relevant to the chapter type, ask
  them in whatever order fits the conversation, and follow up on anything interesting. The best material
  usually comes from a follow-up ("why?", "what happens if you don't?", "has that ever gone wrong?"), not
  from the scripted question itself.
- **Don't ask everything.** Skip questions that obviously don't apply to the topic at hand.
- **Never fill a gap with a guess.** If the interviewee doesn't know, isn't sure, or a question goes
  unanswered, leave it flagged in the resulting chapter with a `callout-todo` block rather than inventing
  a plausible-sounding answer. A confidently wrong setting or step is worse than a visible gap.
- **Push for specifics.** "Tell me about the procedure" invites a generic answer. "What's the first thing
  you check when you walk up to this machine?" invites a real one. Prefer the second style throughout.
- **Ask what "correct" looks like.** New users often don't know what a normal/good result looks like
  versus a subtly wrong one — that distinction is some of the most valuable content in the handbook.

Match the question set to the chapter category below. If a chapter doesn't cleanly fit one category
(e.g. an equipment chapter with almost no procedure, or a procedure with real safety hazards), mix in
questions from the adjacent category rather than forcing it.

---

## 1. Equipment chapters

For instrument/machine chapters — e.g. Rotary Evaporator, Chiller, Isolera, Microwave Synthesiser,
Analytical HPLC, Alstra, Kaiser Tests, Desiccator, LCMS, Prep HPLC, Semi-Prep HPLC, NanoDrop, Freeze
Drying. Structure mirrors `chapters/equipment-syro.html`: Purpose, When to Use / When Not to Use, Safety,
Preparation, Required Materials, Procedure, Cleaning, Shutdown, Maintenance, Common Mistakes,
Troubleshooting, FAQs.

### Purpose

- In one sentence, what does this instrument actually do for the group's work?
- What would someone use instead if this machine were broken or booked — is there a fallback, or does
  work just stop?

### When to use / when not to use

- What's the actual decision point — when do you reach for this machine instead of an alternative?
- Is there a scale, throughput, or sample-type cutoff where this stops being the right tool (e.g. "use
  the Alstra instead of the Syro above X scale")?
- Is there a compound class, solvent, or sample type this machine should never be used for?
- Does anyone need to book it or check availability before starting, or is it first-come-first-served?

### Safety

- Is there anything about this machine beyond standard lab PPE and normal handling precautions — heat,
  pressure, vacuum, moving parts, lasers, UV, sharps, specific fume hood requirements?
- Are there specific reagents used with this machine that need extra care (beyond what's already assumed
  lab knowledge)?
- Is there a known failure mode that's actually dangerous, not just inconvenient (e.g. something that can
  shatter, spray, overheat, or trap someone)?
- Is there a lockout/isolation step needed before opening, cleaning, or servicing it?

### Preparation

- Walk me through exactly what you do from walking up to the machine to being ready to press "start" —
  don't skip the steps that feel too obvious to mention.
- What has to be logged in to, switched on, or warmed up first, and in what order?
- Is there a startup sequence where getting the order wrong causes a problem?
- What software is involved, and is there a known quirk in how it launches or behaves (like the Syro's
  Repair-until-it-works dialog)?
- Is there a calibration, blank run, or check that must happen before first use each day/session?

### Required materials

- What consumables, reagents, or accessories does someone need to have ready before starting, and in
  roughly what quantities?
- Where are those items normally stored, and is there anything about them that needs special handling
  (light-sensitive, needs to be fresh, needs to be a specific concentration)?
- Is there anything people commonly forget to bring/prepare that causes a restart or delay?

### Procedure

- Talk me through the procedure step by step, as if I'm standing next to you doing it for the first time.
- Which steps have a specific number, setting, timing, or threshold that has to be right (temperatures,
  volumes, flow rates, pressures, wavelengths, run times)? What are they?
- Is there a step where the software/interface behaves unexpectedly or non-obviously that a newcomer
  should be warned about in advance?
- Are there sub-procedures or variants (e.g. different sample types, different modes) that need separate
  instructions, or is there one path that covers most real use?
- Is there a point mid-procedure where you check something is working correctly before continuing? What
  are you actually looking at?
- What does the machine's output look like when everything has gone right — and what does an early
  warning sign of something going wrong look like?

### Cleaning

- What has to be cleaned after every single use, without exception?
- What's the actual cleaning method — rinse with what, how many times, wipe with what?
- Is there a "leave it worse than you found it and someone will complain" item — a step people skip that
  causes problems for the next user?
- Is there a difference between routine end-of-run cleaning and a deeper periodic clean?

### Shutdown

- Does the machine get switched off after every use, or left on/in standby? Why?
- Is there a specific shutdown sequence, or is it just "switch off at the wall"?
- Does anything need to be logged (usage log, booking system, fault log) at the end of a session?

### Maintenance

- Who is responsible for routine maintenance — is it a lab member, a service contract, or nobody
  formally?
- Is there anything scheduled (weekly/monthly/annual servicing, filter changes, column changes, gas
  bottle swaps)?
- Has anything broken before in a way that was preventable with regular maintenance?
- If you don't know this yet, say so — this is one of the more common areas to leave flagged for later.

### Common mistakes

- What's the single most common way someone gets this wrong the first time they use it unsupervised?
- What mistake have you personally made (or watched someone else make) on this machine that you'd
  want a new user to avoid?
- Is there a mistake that isn't obvious until much later — you don't find out you did it wrong until
  results come back bad?

### Troubleshooting

- What's the most common fault or error you actually see in practice — not hypothetically, what actually
  comes up?
- For each one: what's the symptom, what's the likely cause, and what do you actually do about it?
- Is there a fault that looks minor but actually means "stop and get help" rather than "just try again"?
- Who do you go to (or what do you do) when something goes wrong that you can't fix yourself?

### FAQs

- What's a question a new student has actually asked you about this machine?
- Is there a misconception people commonly have about how this works or when to use it?

---

## 2. Procedure chapters

For lighter, procedure-focused chapters — Machine Solvents, Chemical Waste, Making Solutions, Dry
Solvents, Balloons, TLC. These don't need the full equipment-chapter depth; focus on when it's done,
what's needed, common errors, and what "done correctly" looks like.

### Purpose and timing

- In one sentence, what is this procedure for?
- When does this actually come up in someone's day-to-day work — after which step, or on what
  trigger/schedule?
- Is this done routinely (e.g. daily, weekly) or only situationally? What triggers it?
- Roughly how long does it take once someone knows what they're doing?

### Materials and setup

- What do you need to have on hand before starting — reagents, containers, labels, PPE?
- Is there anything that needs to be prepared in advance (e.g. something needs to dry, chill, or be
  ordered ahead of time)?
- Where do the materials normally live, and where does the finished result get stored/logged?

### The procedure itself

- Walk me through it step by step, as if teaching someone doing it for the first time.
- Is there a step with a specific quantity, ratio, concentration, or timing that has to be right?
- Is there a step that looks optional but actually isn't, or a step people are tempted to skip?
- Are there different variants depending on context (e.g. solvent type, waste type, plate type) that need
  separate instructions?

### What "done correctly" looks like

- How do you know when you've done this right — is there a visible/physical check?
- What does it look like when it's gone wrong, and would a newcomer even notice?

### Common mistakes and safety

- What's the most common error a new person makes doing this?
- Is there a safety consideration specific to this procedure (disposal rules, incompatible mixing,
  labelling requirements) beyond standard lab practice?
- Is there a rule here that's really a University/COSHH/waste-disposal requirement rather than a lab
  preference — where does that documentation live, if it exists?

### Troubleshooting / edge cases

- What do you do if something about this procedure doesn't go as expected (e.g. a solvent won't dry down,
  a plate won't develop, waste categorisation is ambiguous)?
- Is there an edge case that comes up often enough to be worth documenting (unusual sample, unusual
  waste stream, unusual solvent)?

---

## 3. Laboratory chapters

For general/orientation content — Introduction, Rules, Safety, and similar chapters that aren't tied to
a single machine or procedure. Lighter than the above: who/where/how, not step-by-step detail.

### Orientation

- Where physically is the group/lab, and how would a brand-new starter find it on day one?
- Who's who — PI, postdocs, PhD students, technicians — and who does a new person go to for what kind of
  question?
- Is there a specific person responsible for a particular piece of equipment, area, or type of question,
  or is it genuinely "ask whoever's around"?

### Norms and rules

- What's a rule that's written down somewhere official (University/School policy) versus one that's just
  "how this lab does things"?
- What's something a new starter always gets wrong or has to be told about in their first week?
- Is there a rule that exists because of something that went wrong in the past?

### Safety and induction

- What induction/training has to happen before someone can work unsupervised, and who arranges it?
- Where is the safety information that's specific to this lab (COSHH forms, risk assessments, fire
  procedures, first aid) actually kept?
- Who are the fire wardens / first aiders, and how would a new person know that?
- Is there lab-specific safety guidance that goes beyond standard University safety training?

### Logistics

- How does the group actually communicate day to day (email, chat app, in person)?
- Where do lab books, data, and records get kept, and are there rules about that?
- Is there a booking system for shared equipment or space, and how does someone get access to it?
- What's the process for getting keys/swipe access, an account, or other basic access as a new starter?

### Culture / working style

- Is there anything about how this group works that wouldn't be obvious from a generic "how to be a PhD
  student" guide — expectations around hours, write-ups, meetings, authorship?
- What do people wish someone had told them in their first week?

---

## After the interview

- Anything the interviewee was unsure about, disagreed on, or simply didn't know goes into the chapter as
  a `callout-todo` ("❓ NOT YET DOCUMENTED"), not as a best guess.
- If two people give different answers for the same step, flag the discrepancy rather than picking one
  silently — it's often a sign the procedure genuinely varies by user and that's worth stating explicitly.
- Log open questions in the chapter's Revision History so they're easy to find and close out later, as
  done in `chapters/equipment-syro.html`.

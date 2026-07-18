/* ===========================================================
   Chapter manifest — Jamieson Group Laboratory Handbook (Vol 0)

   SINGLE SOURCE OF TRUTH. Everything the UI shows about a
   chapter is derived from this list:
     · sidebar navigation (contents + chapter pages)
     · landing quick-browse cards + stat strip + "recently updated"
     · home/contents dashboard tiles + chapter cards
     · prev / next links on chapter pages

   To publish a new chapter with Claude Code:
     1. Copy chapters/chapter-template.html → chapters/<file>.html
     2. Fill in the content.
     3. Add / update its entry below and set:
          status:  "live" | "draft" | "planned"
          version: e.g. "0.2"        (omit or "" while planned)
          updated: "YYYY-MM-DD"       (drives "recently updated")
     That's it — nav, cards, stats and prev/next update themselves.
   =========================================================== */

const HANDBOOK_META = {
  volume: "Volume 0",
  title: "Laboratory Operations Handbook",
  group: "Jamieson Group",
  school: "School of Chemistry · University of Glasgow"
};

const HANDBOOK_CHAPTERS = [
  {
    category: "Laboratory",
    blurb: "Orientation, rules and safety for the group.",
    items: [
      { title: "Introduction",       file: "chapters/laboratory-introduction.html", status: "draft", version: "0.2", updated: "2026-07-17" },
      { title: "Laboratory Rules",   file: "chapters/laboratory-rules.html",         status: "draft", version: "0.2", updated: "2026-07-17" },
      { title: "Safety",             file: "chapters/laboratory-safety.html",        status: "draft", version: "0.2", updated: "2026-07-17" }
    ]
  },
  {
    category: "Equipment",
    blurb: "Instrument guides — synthesisers, HPLC, purification and more.",
    items: [
      { title: "Rotary Evaporator",           file: "chapters/equipment-rotary-evaporator.html", status: "planned", version: "", updated: "" },
      { title: "Chiller",                     file: "chapters/equipment-chiller.html",           status: "planned", version: "", updated: "" },
      { title: "Rotavap Cleaning",            file: "chapters/equipment-rotavap-cleaning.html",  status: "planned", version: "", updated: "" },
      { title: "Isolera",                     file: "chapters/equipment-isolera.html",           status: "planned", version: "", updated: "" },
      { title: "Microwave Synthesiser",       file: "chapters/equipment-microwave.html",         status: "planned", version: "", updated: "" },
      { title: "Analytical HPLC",             file: "chapters/equipment-analytical-hplc.html",   status: "draft",   version: "0.3", updated: "2026-07-18" },
      { title: "Syro II Peptide Synthesiser", file: "chapters/equipment-syro.html",              status: "live",    version: "0.2", updated: "2026-07-17" },
      { title: "Alstra Peptide Synthesiser",  file: "chapters/equipment-alstra.html",            status: "planned", version: "", updated: "" },
      { title: "Kaiser Tests",                file: "chapters/equipment-kaiser-tests.html",      status: "planned", version: "", updated: "" },
      { title: "Desiccator",                  file: "chapters/equipment-desiccator.html",        status: "planned", version: "", updated: "" },
      { title: "LCMS",                        file: "chapters/equipment-lcms.html",              status: "draft",   version: "0.3", updated: "2026-07-18" },
      { title: "Preparative HPLC",            file: "chapters/equipment-prep-hplc.html",         status: "planned", version: "", updated: "" },
      { title: "Semi-Preparative HPLC",       file: "chapters/equipment-semi-prep-hplc.html",    status: "planned", version: "", updated: "" },
      { title: "NanoDrop",                    file: "chapters/equipment-nanodrop.html",          status: "planned", version: "", updated: "" },
      { title: "Freeze Drying",               file: "chapters/equipment-freeze-drying.html",     status: "planned", version: "", updated: "" }
    ]
  },
  {
    category: "Procedures",
    blurb: "Waste, solvents, solutions, TLC and other bench routines.",
    items: [
      { title: "Machine Solvents",   file: "chapters/procedure-machine-solvents.html", status: "planned", version: "", updated: "" },
      { title: "Chemical Waste",     file: "chapters/procedure-chemical-waste.html",   status: "planned", version: "", updated: "" },
      { title: "Making Solutions",   file: "chapters/procedure-making-solutions.html", status: "planned", version: "", updated: "" },
      { title: "Dry Solvents",       file: "chapters/procedure-dry-solvents.html",     status: "planned", version: "", updated: "" },
      { title: "Balloons",           file: "chapters/procedure-balloons.html",         status: "planned", version: "", updated: "" },
      { title: "TLC",                file: "chapters/procedure-tlc.html",              status: "planned", version: "", updated: "" }
    ]
  }
];

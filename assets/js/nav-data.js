/* Chapter manifest for the Jamieson Group Laboratory Handbook (Volume 0).
   Single source of truth for sidebar navigation and the home page
   category grid. Add a chapter here the moment its HTML file is
   written, and flip status to "live" — this is what turns its
   sidebar/home entry from a greyed placeholder into a real link. */

const HANDBOOK_CHAPTERS = [
  {
    category: "Laboratory",
    items: [
      { title: "Introduction",   file: "chapters/laboratory-introduction.html", status: "planned" },
      { title: "Laboratory Rules", file: "chapters/laboratory-rules.html",       status: "planned" },
      { title: "Safety",         file: "chapters/laboratory-safety.html",       status: "planned" }
    ]
  },
  {
    category: "Equipment",
    items: [
      { title: "Rotary Evaporator",       file: "chapters/equipment-rotary-evaporator.html", status: "planned" },
      { title: "Chiller",                 file: "chapters/equipment-chiller.html",           status: "planned" },
      { title: "Rotavap Cleaning",        file: "chapters/equipment-rotavap-cleaning.html",  status: "planned" },
      { title: "Isolera",                 file: "chapters/equipment-isolera.html",           status: "planned" },
      { title: "Microwave Synthesiser",   file: "chapters/equipment-microwave.html",         status: "planned" },
      { title: "Analytical HPLC",         file: "chapters/equipment-analytical-hplc.html",   status: "planned" },
      { title: "Syro II Peptide Synthesiser", file: "chapters/equipment-syro.html",          status: "live" },
      { title: "Alstra Peptide Synthesiser",  file: "chapters/equipment-alstra.html",        status: "planned" },
      { title: "Kaiser Tests",            file: "chapters/equipment-kaiser-tests.html",      status: "planned" },
      { title: "Desiccator",              file: "chapters/equipment-desiccator.html",        status: "planned" },
      { title: "LCMS",                    file: "chapters/equipment-lcms.html",              status: "planned" },
      { title: "Preparative HPLC",        file: "chapters/equipment-prep-hplc.html",         status: "planned" },
      { title: "Semi-Preparative HPLC",   file: "chapters/equipment-semi-prep-hplc.html",    status: "planned" },
      { title: "NanoDrop",                file: "chapters/equipment-nanodrop.html",          status: "planned" },
      { title: "Freeze Drying",           file: "chapters/equipment-freeze-drying.html",     status: "planned" }
    ]
  },
  {
    category: "Procedures",
    items: [
      { title: "Machine Solvents",   file: "chapters/procedure-machine-solvents.html", status: "planned" },
      { title: "Chemical Waste",     file: "chapters/procedure-chemical-waste.html",   status: "planned" },
      { title: "Making Solutions",   file: "chapters/procedure-making-solutions.html", status: "planned" },
      { title: "Dry Solvents",       file: "chapters/procedure-dry-solvents.html",     status: "planned" },
      { title: "Balloons",           file: "chapters/procedure-balloons.html",         status: "planned" },
      { title: "TLC",                file: "chapters/procedure-tlc.html",              status: "planned" }
    ]
  }
];

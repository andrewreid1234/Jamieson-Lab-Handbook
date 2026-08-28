/* ===========================================================
   Per-chapter motifs — Jamieson Group Laboratory Handbook (Vol 0)
   Abstract instrument/procedure marks built from primitives only
   (circles, bars, lines, squares, dot grids) — no image assets.
   moHTML(kind) -> inner HTML for a .mo box; MOTIF maps chapter
   title -> kind. Depends on the .mo rules in assets/css/style.css.
   =========================================================== */
(function(){
  function dots(cols,rows,cls,onIdx){
    var h='',x0=100/(cols+1),y0=100/(rows+1),k=0;
    for(var r=1;r<=rows;r++)for(var c=1;c<=cols;c++){
      var on=onIdx&&onIdx.indexOf(k)>-1?' on':'';
      h+='<span class="'+(cls||'dot')+on+'" style="left:'+(x0*c-3.2).toFixed(1)+'%;top:'+(y0*r-3.2).toFixed(1)+'%"></span>';k++;
    }
    return h;
  }
  function ringSet(sizes){
    return sizes.map(function(s,i){return '<span class="ring" style="width:'+s+'%;height:'+s+'%;opacity:'+(1-i*.22).toFixed(2)+'"></span>'}).join('');
  }
  var B={
    // packed column with bed bands — Isolera
    packed:function(){return '<span class="col" style="top:12%;bottom:12%;width:30%;opacity:.5"></span>'+
      [24,38,52,66].map(function(t){return '<span class="band" style="left:36%;right:36%;top:'+t+'%;height:5%;opacity:.85"></span>'}).join('')},
    // narrow column with two collection dots — semi-prep HPLC
    narrowcol:function(){return '<span class="col" style="top:10%;bottom:30%;width:14%"></span><span class="c" style="left:36%;bottom:12%;width:9%;height:9%"></span><span class="c" style="left:55%;bottom:12%;width:9%;height:9%;opacity:.55"></span>'},
    // drop into graduated vessel — making solutions
    beaker:function(){return '<span class="c" style="left:45%;top:10%;width:10%;height:10%"></span>'+
      '<span class="rect" style="left:26%;right:26%;top:34%;bottom:14%"></span>'+
      '<span class="ln hi" style="left:30%;width:40%;top:56%"></span><span class="ln" style="left:30%;width:26%;top:68%"></span>'},
    // supply line feeding drops — machine solvents
    supply:function(){return '<span class="ln" style="left:14%;width:44%;top:20%"></span><span class="stem" style="left:56%;top:20%;height:26%"></span>'+
      '<span class="c" style="left:52%;top:50%;width:11%;height:11%"></span><span class="c" style="left:53.5%;top:68%;width:8%;height:8%;opacity:.55"></span>'},
    // concentric rings — rotary evaporator, rotavap cleaning
    rings:function(){return ringSet([80,54,28])},
    // chromatogram peaks — HPLC, LCMS
    peaks:function(){
      var hs=[16,42,24,58,20,34],h='<span class="base" style="bottom:24%"></span>';
      hs.forEach(function(v,i){h+='<span class="bar" style="left:'+(17+i*11.5)+'%;bottom:24%;height:'+v+'%"></span>'});
      return h;
    },
    // packed column — Isolera, prep / semi-prep HPLC
    column:function(){return '<span class="col" style="top:14%;bottom:14%;width:24%"></span><span class="c" style="left:46%;top:8%;width:8%;height:8%"></span><span class="c" style="left:46%;bottom:6%;width:8%;height:8%;opacity:.5"></span>'},
    // TLC plate with spots and baseline
    plate:function(){return '<span class="rect" style="left:22%;right:22%;top:12%;bottom:12%"></span><span class="base" style="left:26%;right:26%;bottom:30%"></span>'+
      '<span class="c" style="left:32%;top:44%;width:9%;height:9%"></span><span class="c" style="left:46%;top:36%;width:9%;height:9%;opacity:.75"></span><span class="c" style="left:60%;top:50%;width:9%;height:9%;opacity:.55"></span>'},
    // balloon — sphere on a stem
    sphere:function(){return '<span class="ring" style="width:46%;height:46%;top:36%"></span><span class="stem" style="top:58%;bottom:16%"></span>'},
    // falling drops — solvents, solutions
    drops:function(){return '<span class="c" style="left:41%;top:14%;width:18%;height:18%"></span><span class="c" style="left:44%;top:42%;width:12%;height:12%;opacity:.7"></span><span class="c" style="left:46%;top:64%;width:8%;height:8%;opacity:.45"></span>'},
    // stacked layers — chemical waste
    layers:function(){return '<span class="band" style="top:26%"></span><span class="band" style="top:46%;opacity:.65"></span><span class="band" style="top:66%;opacity:.35"></span>'},
    // reaction well plate — peptide synthesisers
    wells:function(){return dots(6,4,'dot',[0,7,14,21])},
    // radial dot burst — freeze drying, chiller
    flake:function(){
      var h='<span class="c" style="left:46%;top:46%;width:8%;height:8%"></span>';
      for(var i=0;i<6;i++){var a=i*Math.PI/3;h+='<span class="c" style="left:'+(46+Math.cos(a)*30).toFixed(1)+'%;top:'+(46+Math.sin(a)*30).toFixed(1)+'%;width:7%;height:7%;opacity:.55"></span>'}
      return h;
    },
    // dial — NanoDrop
    gauge:function(){return '<span class="gauge"></span><span class="gauge-in"></span>'},
    // sealed box with desiccant — desiccator
    box:function(){return '<span class="sq" style="left:20%;right:20%;top:20%;bottom:20%"></span>'+dots(3,3)},
    // concentric squares — microwave synthesiser
    waves:function(){return '<span class="sq" style="left:14%;right:14%;top:14%;bottom:14%"></span><span class="sq" style="left:28%;right:28%;top:28%;bottom:28%;opacity:.7"></span><span class="sq" style="left:42%;right:42%;top:42%;bottom:42%;opacity:.45"></span>'},
    // three colour readings — Kaiser tests
    triad:function(){return '<span class="c" style="left:44%;top:16%;width:15%;height:15%"></span><span class="c" style="left:24%;top:56%;width:15%;height:15%;background:var(--live)"></span><span class="c" style="left:62%;top:56%;width:15%;height:15%;background:var(--muted-2)"></span>'},
    // ruled page — text chapters
    rules:function(){return '<span class="ln" style="left:20%;width:52%;top:28%"></span><span class="ln hi" style="left:20%;width:38%;top:44%"></span><span class="ln" style="left:20%;width:60%;top:60%"></span><span class="ln" style="left:20%;width:44%;top:74%"></span>'},
    // warning diamond — safety
    diamond:function(){return '<span class="sq" style="left:29%;right:29%;top:29%;bottom:29%;transform:rotate(45deg);border-radius:3px"></span><span class="c" style="left:46.5%;top:44%;width:7%;height:7%"></span>'},
    // dot lattice with binding pocket — computation
    lattice:function(){return dots(5,5)+'<span class="pocket-d"></span>'},
    // terminal prompt lines — Using Woody
    shell:function(){return '<span class="c" style="left:18%;top:26%;width:7%;height:7%"></span><span class="ln" style="left:30%;width:48%;top:28%"></span>'+
      '<span class="c" style="left:18%;top:46%;width:7%;height:7%;opacity:.6"></span><span class="ln hi" style="left:30%;width:32%;top:48%"></span>'+
      '<span class="c" style="left:18%;top:66%;width:7%;height:7%;opacity:.4"></span><span class="ln" style="left:30%;width:40%;top:68%"></span>'}
  };

  var MOTIF={
    // Laboratory
    "Introduction":["rules",0],"Laboratory Rules":["rules",1],"Safety":["diamond",0],
    // Equipment
    "Rotary Evaporator":["rings",0],"Rotavap Cleaning":["rings",1],"Chiller":["flake",1],"Freeze Drying":["flake",0],
    "Isolera":["packed",1],"Preparative HPLC":["column",0],"Semi-Preparative HPLC":["narrowcol",1],
    "Analytical HPLC":["peaks",0],"LCMS":["peaks",1],
    "Syro II Peptide Synthesiser":["wells",0],"Alstra Peptide Synthesiser":["wells",1],
    "Microwave Synthesiser":["waves",0],"Kaiser Tests":["triad",0],"Desiccator":["box",1],"NanoDrop":["gauge",0],
    // Procedures
    "Machine Solvents":["supply",0],"Dry Solvents":["drops",1],"Making Solutions":["beaker",0],
    "Chemical Waste":["layers",0],"Balloons":["sphere",0],"TLC":["plate",0],
    // Computation
    "Using Woody":["shell",0],"Software":["layers",1],"AlphaFold3 — full guide":["lattice",0]
  };

  window.moHTML=function(kind){return (B[kind]||B.rules)()};
  window.moBox=function(title,extraClass,style){
    var m=MOTIF[title]||["rules",0];
    return '<div class="mo'+(m[1]?' alt':'')+(extraClass?' '+extraClass:'')+'"'+(style?' style="'+style+'"':'')+' title="'+title+'">'+window.moHTML(m[0])+'</div>';
  };
  window.MOTIF=MOTIF;
})();

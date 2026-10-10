'use strict';
(() => {
const el=id=>document.getElementById(id);
// Durations are integer sixteenth-note units, avoiding floating-point rhythm errors.
const pitches=[60,62,64,65,67,69,71,72], pitchNames=['Do4','Re4','Mi4','Fa4','Sol4','La4','Si4','Do5'];
// Music glyph outlines from Bravura (Steinberg), SIL OFL; see LICENSE-musica.txt.
const musicPaths={"clef":"M376 415C374 427 376 428 382 434C490 535 572 662 572 815C572 902 548 988 507 1048C492 1070 466 1098 455 1098C441 1098 410 1072 390 1050C316 968 292 843 292 739C292 681 299 616 306 575C308 563 309 561 297 551C153 432 0 289 0 87C0 -87 119 -252 364 -252C387 -252 413 -250 433 -246C444 -244 446 -243 448 -255C460 -322 475 -409 475 -456C475 -604 375 -622 316 -622C262 -622 236 -606 236 -593C236 -586 245 -583 268 -576C299 -567 335 -540 335 -482C335 -427 300 -380 239 -380C172 -380 132 -433 132 -495C132 -560 171 -658 322 -658C389 -658 519 -628 519 -458C519 -401 501 -306 490 -244C488 -232 489 -233 503 -227C604 -187 671 -102 671 11C671 139 577 252 430 252C404 252 404 252 401 270ZM470 943C503 943 530 916 530 861C530 750 435 660 356 591C349 585 345 586 343 599C339 625 337 659 337 691C337 847 409 943 470 943ZM361 262C364 243 364 244 346 238C258 208 201 129 201 44C201 -46 248 -110 316 -133C324 -136 336 -139 343 -139C351 -139 355 -134 355 -128C355 -121 347 -118 340 -115C298 -97 268 -54 268 -8C268 49 307 92 368 109C384 113 386 112 388 101L438 -197C440 -208 439 -208 424 -211C408 -214 388 -216 368 -216C193 -216 80 -119 80 20C80 79 90 158 173 252C233 319 279 356 326 394C336 402 338 401 340 390ZM430 103C428 115 429 118 441 117C522 110 589 42 589 -46C589 -109 551 -160 495 -188C483 -194 481 -194 479 -182Z","r16":"M282 -109V-17C282 -2 270 9 256 9H26C11 9 0 -2 0 -17V-109C0 -123 11 -135 26 -135H256C270 -135 282 -123 282 -109Z","r8":"M282 24V116C282 131 270 142 256 142H26C11 142 0 131 0 116V24C0 10 11 -2 26 -2H256C270 -2 282 10 282 24Z","r4":"M78 -38C94 -58 108 -77 121 -98C123 -102 127 -110 127 -112C127 -113 127 -115 126 -116C124 -120 120 -121 115 -121C111 -121 103 -119 99 -118C98 -118 96 -118 95 -118L87 -115C35 -115 1 -162 1 -211C1 -261 44 -310 117 -366C125 -372 135 -375 143 -375C150 -375 157 -373 158 -369C159 -366 160 -364 160 -362C160 -353 152 -345 144 -338C131 -338 120 -311 118 -302C115 -294 114 -285 114 -276C114 -235 135 -203 177 -203C206 -203 239 -214 256 -220L257 -221C261 -222 263 -222 265 -222C268 -222 270 -221 270 -218C270 -206 244 -173 233 -161C195 -115 164 -78 164 -22C164 -21 164 -20 164 -19L165 -12C165 -11 165 -10 165 -9C169 49 205 97 231 138C234 143 235 148 235 153C235 163 231 172 231 172C231 172 83 348 66 365C61 370 54 373 48 373C38 373 28 366 28 352C28 347 29 342 32 336C36 325 93 274 93 202C93 165 78 122 33 75C23 65 19 54 19 46C19 32 29 22 29 22Z","r2":"M134 107C134 144 104 174 67 174C30 174 0 144 0 107C0 86 12 68 27 56C43 45 62 39 81 39C95 39 109 42 120 46C134 50 143 54 156 61C158 62 160 62 161 62C165 62 166 58 166 53C166 50 166 46 165 42C162 27 90 -172 72 -238C72 -250 95 -251 101 -251C112 -251 126 -249 136 -241C139 -239 237 112 237 112C241 130 246 146 247 151C247 161 237 166 235 167C233 167 230 167 224 163C217 157 167 97 134 97Z","r1":"M208 111C208 149 178 179 140 179C103 179 72 149 72 111C72 70 114 43 152 43C179 43 207 52 230 65C233 66 235 67 237 67C240 67 242 65 242 60C242 44 191 -105 184 -120C176 -139 149 -151 135 -151C136 -147 136 -144 136 -141C136 -103 105 -73 68 -73C30 -73 0 -103 0 -141C0 -182 42 -209 80 -209C106 -209 132 -200 155 -188C157 -188 159 -190 159 -194L158 -195C158 -196 158 -196 158 -196L63 -479C63 -479 63 -480 63 -480L62 -481C62 -490 71 -500 93 -500C122 -500 127 -488 131 -477L247 -96C273 -11 292 56 292 56C292 56 317 144 319 157C319 159 320 160 320 161C320 167 312 171 310 172C305 172 302 170 299 168C292 162 242 102 208 101Z"};
const durations={16:'Redonda',8:'Blanca',4:'Negra',2:'Corchea',1:'Semicorchea',6:'Negra con puntillo',12:'Blanca con puntillo',3:'Corchea con puntillo'};
const levels=[
 {name:'1 · Do, Mi, Sol',notes:[60,64,67],durations:[16,8,4],meters:['4/4'],rests:false,description:'Do4, Mi4 y Sol4 · negras, blancas y redondas · 4/4.'},
 {name:'2 · Primeros compases',notes:[60,64,67],durations:[16,8,4],meters:['4/4','2/4','3/4'],rests:false,description:'Do4, Mi4 y Sol4 · cambia entre 4/4, 2/4 y 3/4.'},
 {name:'3 · Corcheas y silencios',notes:[60,64,67],durations:[16,8,4,2],meters:['4/4','2/4','3/4'],rests:true,description:'Do, Mi y Sol · añade corcheas y silencios de las figuras disponibles.'},
 {name:'4 · Semicorcheas',notes:[60,64,67],durations:[16,8,4,2,1],meters:['4/4','2/4','3/4'],rests:true,description:'Do, Mi y Sol · añade semicorcheas y sus silencios. Cuenta cada subdivisión.'},
 {name:'5 · Escala de Do mayor',notes:pitches,durations:[16,8,4],meters:['4/4','2/4','3/4'],rests:true,description:'Do4–Do5 · toda la escala de Do mayor · negras, blancas, redondas y silencios.'},
 {name:'6 · Dictado completo',notes:pitches,durations:[16,8,4,2,1],meters:['4/4','2/4','3/4'],rests:true,description:'Do4–Do5 · todas las figuras básicas y silencios · compases simples.'},
 {name:'7 · Pulso compuesto · 6/8',notes:pitches,durations:[12,8,6,4,3,2,1],meters:['6/8'],rests:true,description:'Do4–Do5 · 6/8 en dos grupos de tres corcheas · añade figuras con puntillo. El tempo cuenta negras con puntillo.'}
];
let levelIndex=0,meter='4/4',target=[],answer=[],history=[],selected=null,tool=4,exercise=1,correct=0,resolved=false,revealed=false,checked=false,nextId=1;
let activeGame='home',ac=null,nodes=new Set(),playTimer=null,playGeneration=0,drag=null;
const preview=document.createElement('div');preview.className='drag-preview';preview.hidden=true;document.body.append(preview);
const staff=el('dictStaff');staff.setAttribute('tabindex','0');
const cap=()=>meter==='6/8'?12:Number(meter.split('/')[0])*4;
const grid=()=>Math.min(...levels[levelIndex].durations);
const legalDurations=()=>levels[levelIndex].durations.filter(d=>d<=cap());
const pulse=()=>meter==='6/8'?6:4;
const sorted=list=>[...list].sort((a,b)=>a.bar-b.bar||a.tick-b.tick);
const pitchIndex=midi=>pitches.indexOf(midi);
const durationName=(d,rest=false)=>rest?'Silencio · '+durations[d].toLowerCase():durations[d];
function feedback(message,good=false){el('dictFeedback').textContent=message;el('dictFeedback').classList.toggle('success',good)}
function saveUndo(){history.push(answer.map(e=>({...e})));if(history.length>50)history.shift()}
function invalidate(){checked=false;render()}
function generateExercise(index,timeSignature,rng=Math.random){
 const config=levels[index],capacity=timeSignature==='6/8'?12:Number(timeSignature.split('/')[0])*4;
 const result=[];let previous=config.notes[0];
 for(let bar=0;bar<2;bar++){
  let tick=0;
  while(tick<capacity){
   // Short values stay within a pulse; long values begin at compatible boundaries.
   const beat=timeSignature==='6/8'?6:4;
   const available=config.durations.filter(d=>d<=capacity-tick && (d<=beat?Math.floor(tick/beat)===Math.floor((tick+d-1)/beat):tick%beat===0));
   let weighted=available.flatMap(d=>Array(d===4||d===2?4:d===1?2:1).fill(d));
   const length=weighted[Math.min(weighted.length-1,Math.floor(rng()*weighted.length))];
   const rest=config.rests&&result.length>0&&rng()<.18;
   const candidates=config.notes.filter(n=>Math.abs(n-previous)<=7);
   const midi=rest?null:(result.length===0?config.notes[0]:candidates[Math.min(candidates.length-1,Math.floor(rng()*candidates.length))]);
   result.push({bar,tick,duration:length,midi});if(midi!==null)previous=midi;tick+=length;
  }
 }
 // Exercise the new subdivision/rest in its introductory level, without crossing beats.
 const newest=index===2?2:index===3?1:null;
 if(newest&&!result.some(e=>e.duration===newest)){
  const at=result.findIndex(e=>e.duration>=4);
  if(at>=0){const e=result[at],split=[];for(let t=0;t<e.duration;t+=newest)split.push({...e,tick:e.tick+t,duration:newest,midi:t===newest?null:e.midi});result.splice(at,1,...split)}
 }
 if(config.rests&&!result.some(e=>e.midi===null)&&result.length>1)result[result.length-1].midi=null;
 return result;
}
function configure(reset=true){
 const cfg=levels[levelIndex];el('dictMeter').innerHTML=cfg.meters.map(m=>`<option value="${m}">${m}</option>`).join('');
 if(!cfg.meters.includes(meter))meter=cfg.meters[0];el('dictMeter').value=meter;
 el('levelDescription').textContent=cfg.description;el('restTool').disabled=!cfg.rests;if(!cfg.rests)el('restTool').checked=false;
 if(!legalDurations().includes(tool))tool=4;
 renderPalette();if(reset)resetSession();
}
function resetSession(){exercise=1;correct=0;newExercise()}
function newExercise(){stopAudio();drag=null;preview.hidden=true;target=generateExercise(levelIndex,meter);answer=[];history=[];selected=null;resolved=false;revealed=false;checked=false;el('solutionArea').hidden=true;el('nextDictExercise').hidden=true;el('advanceDictLevel').hidden=true;el('checkDict').disabled=false;render();feedback('Escucha la melodía. Hay una cuenta previa de un compás y luego dos compases de dictado.')}
function layout(){const step=grid()===1?42:grid()===2?48:24;return {start:120,width:cap()*step+42,step}}
function pointFor(e){const l=layout();return {x:l.start+e.bar*l.width+18+e.tick*l.step,y:e.midi===null?108:168-pitchIndex(e.midi)*9}}
function positionAt(event){const pt=staff.createSVGPoint();pt.x=event.clientX;pt.y=event.clientY;const p=pt.matrixTransform(staff.getScreenCTM().inverse());const l=layout();const bar=Math.floor((p.x-l.start)/l.width);if(bar<0||bar>1||p.y<30||p.y>195)return null;const tick=Math.round((p.x-l.start-bar*l.width-18)/l.step/grid())*grid();if(tick<0||tick>=cap())return null;const index=Math.max(0,Math.min(7,Math.round((168-p.y)/9)));return {bar,tick,midi:pitches[index]}}
function canPlace(event,id=null){return event.bar>=0&&event.bar<2&&event.tick>=0&&event.tick+event.duration<=cap()&&event.tick%grid()===0&&legalDurations().includes(event.duration)&&(event.midi===null?levels[levelIndex].rests:levels[levelIndex].notes.includes(event.midi))&&!answer.some(e=>e.id!==id&&e.bar===event.bar&&event.tick<e.tick+e.duration&&e.tick<event.tick+event.duration)}
function place(event,id=null){
 if(resolved){feedback('Este ejercicio ya está corregido. Avanza al siguiente para escribir de nuevo.');return false}
 if(event.midi!==null&&!levels[levelIndex].notes.includes(event.midi)){feedback('En este nivel usa solo '+levels[levelIndex].notes.map(n=>pitchNames[pitchIndex(n)]).join(', ')+'.');return false}
 if(!canPlace(event,id)){feedback('La figura se superpone con otra o no cabe en el compás. Cambia su posición o duración.');return false}
 saveUndo();if(id!==null){answer=answer.map(e=>e.id===id?{...event,id}:e);selected=id}else{const id=nextId++;answer.push({...event,id});selected=id}invalidate();feedback('Figura colocada. Escucha lo escrito y compáralo con la melodía.');return true;
}
function remove(id){if(resolved)return;saveUndo();answer=answer.filter(e=>e.id!==id);selected=null;invalidate()}
// Exact SVG notation avoids dependence on music-symbol fonts.
function glyph(duration,rest,x,y,color='#20343b'){
 const dot=[3,6,12].includes(duration),base=dot?duration/1.5:duration;
 let s='';
 if(rest){
  // Bravura's em is 1000 units, with 250 units per staff space.
  s=`<path d="${musicPaths['r'+base]}" transform="translate(${x} 114) scale(.072 -.072)" fill="${color}"/>`;
  if(dot)s+=`<circle cx="${x+18}" cy="105" r="2.7" fill="${color}"/>`;
 }else{
  const hollow=base>=8;const down=y<=114;const stemX=x+(down?-8:8),tip=y+(down?36:-36);
  s=(y>159?`<line x1="${x-14}" y1="168" x2="${x+14}" y2="168" stroke="${color}" stroke-width="1.5"/>`:'')+`<ellipse cx="${x}" cy="${y}" rx="${base===16?10:8}" ry="5.6" transform="rotate(-18 ${x} ${y})" fill="${hollow?'#fffaf1':color}" stroke="${color}" stroke-width="${hollow?2.2:1}"/>`;
  if(base!==16)s+=`<line x1="${stemX}" y1="${y}" x2="${stemX}" y2="${tip}" stroke="${color}" stroke-width="1.8"/>`;
  if(base<=2){const count=base===1?2:1;for(let i=0;i<count;i++){const yy=tip+(down?-i*8:i*8);s+=`<path d="M ${stemX} ${yy} q ${down?-14:14} ${down?-6:6} ${down?-8:8} ${down?-22:22} q ${down?8:-8} ${down?12:-12} ${down?8:-8} ${down?14:-14}" fill="${color}"/>`}}
  if(dot)s+=`<circle cx="${x+16}" cy="${y%18===6?y-5:y}" r="2.7" fill="${color}"/>`;
 }
 return s;
}
function drawStaff(svg,events,solution=false){
 const l=layout(),width=l.start+2*l.width+20;svg.setAttribute('viewBox',`0 0 ${width} 256`);svg.style.width=width+'px';
 let s=`<rect width="${width}" height="256" fill="#fffaf1"/>`;
 // Treble clef: vector spiral wraps the G4 line at y=132.
 s+=`<path d="${musicPaths.clef}" transform="translate(32 132) scale(.072 -.072)" fill="#20343b"/>`;
 const [top,bottom]=meter.split('/');s+=`<text x="93" y="110" font-size="27" font-family="Georgia,serif" font-weight="bold" text-anchor="middle" fill="#20343b">${top}</text><text x="93" y="139" font-size="27" font-family="Georgia,serif" font-weight="bold" text-anchor="middle" fill="#20343b">${bottom}</text>`;
 for(let i=0;i<5;i++)s+=`<line x1="22" y1="${78+i*18}" x2="${width-20}" y2="${78+i*18}" stroke="#5a6262" stroke-width="1"/>`;
 for(let bar=0;bar<2;bar++){
  const x=l.start+bar*l.width;s+=`<text x="${x+18}" y="37" font-size="12" font-family="system-ui" fill="#64716f">COMPÁS ${bar+1}</text><line x1="${x}" y1="78" x2="${x}" y2="150" stroke="#43504e"/>`;
  for(let t=0;t<cap();t+=grid()){
   const xx=x+18+t*l.step;let label='';if(meter==='6/8'){if(t%2===0)label=String(t/2+1)}else if(t%4===0)label=String(t/4+1);else if(t%2===0)label='y';else label=t%4===1?'e':'a';
   const strong=t%pulse()===0;s+=`<line x1="${xx}" y1="${strong?65:78}" x2="${xx}" y2="187" stroke="${strong?'#98b7ae':'#dbe3dc'}" stroke-dasharray="2 5"/><text x="${xx}" y="213" text-anchor="middle" font-size="11" fill="#667c74" font-family="system-ui">${label}</text>`;
  }
 }
 const end=l.start+2*l.width;s+=`<line x1="${end-6}" y1="78" x2="${end-6}" y2="150" stroke="#43504e"/><line x1="${end}" y1="78" x2="${end}" y2="150" stroke="#43504e" stroke-width="3"/>`;
 if(meter==='6/8')for(let bar=0;bar<2;bar++)for(let i=0;i<2;i++){const x=l.start+bar*l.width+18+i*6*l.step;s+=`<path d="M ${x} 225 v 6 h ${5*l.step} v -6" stroke="#98aaa0" fill="none"/><text x="${x+2.5*l.step}" y="247" text-anchor="middle" font-size="10" fill="#64766c" font-family="system-ui">Pulso ${i+1} · 3 corcheas</text>`}
 for(const e of sorted(events)){
  const {x,y}=pointFor(e);const exact=target.some(t=>t.bar===e.bar&&t.tick===e.tick&&t.duration===e.duration&&t.midi===e.midi);const color=solution?'#244a39':checked?(exact?'#287951':'#b54832'):'#20343b';
  s+=`<g ${solution?'':`data-id="${e.id}"`} style="cursor:${solution?'default':'grab'}"><rect x="${x-16}" y="${y-42}" width="34" height="85" fill="transparent"/>`;
  if(!solution&&e.id===selected)s+=`<rect x="${x-17}" y="${y-43}" width="36" height="86" rx="7" fill="#77caa333" stroke="#568f74" stroke-dasharray="3 3"/>`;
  s+=glyph(e.duration,e.midi===null,x,y,color)+`<title>${e.midi===null?'Silencio':pitchNames[pitchIndex(e.midi)]}, ${durations[e.duration]}, compás ${e.bar+1}</title></g>`;
 }
 svg.innerHTML=s;
}
function renderPalette(){
 el('figurePalette').innerHTML=legalDurations().map(d=>`<button class="figure ${d===tool?'active':''}" data-duration="${d}" aria-pressed="${d===tool}"><svg viewBox="0 0 36 55" aria-hidden="true"><g transform="translate(0,-93)">${glyph(d,false,14,132,'currentColor')}</g></svg><span>${durations[d]}</span></button>`).join('');
 el('toolHint').textContent=`Elegida: ${durationName(tool,el('restTool').checked)}. Toca el pentagrama o arrastra la figura. Puedes desplazarlo horizontalmente.`;
}
function render(){
 drawStaff(staff,answer);el('dictProgress').textContent=`Ejercicio ${exercise} de 5 · ${correct} aciertos`;
 el('barFill').textContent=[0,1].map(bar=>`Compás ${bar+1}: ${answer.filter(e=>e.bar===bar).reduce((s,e)=>s+e.duration,0)/4} / ${cap()/4} negras`).join(' · ');
 el('undoDict').disabled=!history.length||resolved;el('clearDict').disabled=!answer.length||resolved;
 el('entryList').innerHTML=sorted(answer).map(e=>{
  const exact=target.some(t=>t.bar===e.bar&&t.tick===e.tick&&t.duration===e.duration&&t.midi===e.midi);
  const options=[...levels[levelIndex].notes,...(levels[levelIndex].rests?[null]:[])];
  return `<div class="entry-chip ${e.id===selected?'selected':''} ${checked?(exact?'good':'bad'):''}" data-entry="${e.id}"><span>C${e.bar+1} · ${e.tick/4+1}</span><select aria-label="Nota de la figura ${e.id}" data-pitch="${e.id}" ${resolved?'disabled':''}>${options.map(n=>`<option value="${n===null?'rest':n}" ${n===e.midi?'selected':''}>${n===null?'Silencio':pitchNames[pitchIndex(n)]}</option>`).join('')}</select><select aria-label="Duración de la figura ${e.id}" data-length="${e.id}" ${resolved?'disabled':''}>${legalDurations().map(d=>`<option value="${d}" ${d===e.duration?'selected':''}>${durations[d]}</option>`).join('')}</select><button data-delete="${e.id}" aria-label="Borrar figura ${e.id}" ${resolved?'disabled':''}>×</button></div>`;
 }).join('');
}
function evaluate(expected,actual){
 let pitchErrors=0,rhythmErrors=0,missing=0,extra=0;
 for(const t of expected){const a=actual.find(a=>a.bar===t.bar&&a.tick===t.tick);if(!a){missing++;continue}if(a.midi!==t.midi)pitchErrors++;if(a.duration!==t.duration)rhythmErrors++}
 for(const a of actual)if(!expected.some(t=>t.bar===a.bar&&t.tick===a.tick))extra++;
 return {pitchErrors,rhythmErrors,missing,extra,ok:!pitchErrors&&!rhythmErrors&&!missing&&!extra};
}
function check(){if(resolved)return;checked=true;const result=evaluate(target,answer);render();
 if(result.ok){resolved=true;if(!revealed)correct++;render();el('checkDict').disabled=true;el('nextDictExercise').hidden=false;el('nextDictExercise').textContent=exercise<5?'Siguiente ejercicio →':'Nueva sesión →';if(exercise===5&&levelIndex<levels.length-1)el('advanceDictLevel').hidden=false;feedback(`¡La transcripción coincide! ${revealed?'Este ejercicio fue con ayuda y no suma acierto.':''} ${exercise===5?`Sesión completada: ${correct} de 5 aciertos.`:'Puedes avanzar al siguiente ejercicio.'}`,true)}
 else feedback(`Revisa tu escritura: ${result.pitchErrors} diferencias de nota o silencio, ${result.rhythmErrors} de duración, ${result.missing} figuras faltantes o en otra posición y ${result.extra} figuras adicionales. Verde: coincide. Naranja: revisa. Puedes corregir y comprobar otra vez.`);
}
function reveal(){stopAudio();revealed=true;drawStaff(el('solutionStaff'),target,true);el('solutionArea').hidden=false;if(!resolved){resolved=true;el('checkDict').disabled=true;el('nextDictExercise').hidden=false;el('nextDictExercise').textContent=exercise<5?'Siguiente ejercicio →':'Nueva sesión →';if(exercise===5&&levelIndex<levels.length-1)el('advanceDictLevel').hidden=false;render()}feedback('Solución visible. Compara nota, duración y posición. Este ejercicio no suma un acierto si la solución se mostró antes de resolverlo.')}
async function ensureDictAudio(){const C=window.AudioContext||window.webkitAudioContext;if(!C)throw Error('Audio no disponible');if(!ac||ac.state==='closed')ac=new C();await ac.resume()}
function stopAudio(){playGeneration++;clearTimeout(playTimer);for(const n of nodes){try{n.osc.stop()}catch{}n.osc.disconnect();n.gain.disconnect()}nodes.clear();el('stopDictAudio').disabled=true;el('hearMelody').textContent='▶ Escuchar melodía'}
function scheduleTone(midi,start,length,click=false,strong=false){const osc=ac.createOscillator(),gain=ac.createGain();osc.type=click?'sine':'triangle';osc.frequency.value=click?(strong?1250:850):440*2**((midi-69)/12);const end=start+length;gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(click?.12:.13,start+.008);gain.gain.setValueAtTime(click?.08:.11,Math.max(start+.01,end-.025));gain.gain.linearRampToValueAtTime(0,end);osc.connect(gain);gain.connect(ac.destination);const node={osc,gain};nodes.add(node);osc.onended=()=>{osc.disconnect();gain.disconnect();nodes.delete(node)};osc.start(start);osc.stop(end+.01)}
async function play(list,withCount=true,doOnly=false){stopAudio();const generation=playGeneration;try{await ensureDictAudio();if(generation!==playGeneration||activeGame!=='dict')return;
 const unit=60/Number(el('dictTempo').value)/pulse(),now=ac.currentTime+.08;
 if(doOnly){scheduleTone(60,now,.8);el('stopDictAudio').disabled=false;playTimer=setTimeout(()=>{el('stopDictAudio').disabled=true},1000);return}
 const lead=withCount?cap():0;
 if(withCount)for(let t=0;t<cap();t+=pulse())scheduleTone(0,now+t*unit,.045,true,t===0);
 if(el('dictClicks').checked)for(let t=0;t<2*cap();t+=pulse())scheduleTone(0,now+(lead+t)*unit,.035,true,t%cap()===0);
 for(const e of list)if(e.midi!==null)scheduleTone(e.midi,now+(lead+e.bar*cap()+e.tick)*unit,e.duration*unit*.92);
 el('stopDictAudio').disabled=false;el('hearMelody').textContent='↻ Escuchar de nuevo';feedback(withCount?'Cuenta previa de un compás → melodía de dos compases. Escucha la altura y la duración de cada sonido.':'Escuchando tu escritura; los espacios sin figuras quedan en silencio.');
 playTimer=setTimeout(()=>{if(generation===playGeneration){el('stopDictAudio').disabled=true;el('hearMelody').textContent='▶ Escuchar melodía'}},(lead+2*cap())*unit*1000+200);
 }catch{feedback('No se pudo reproducir el audio. Revisa el sonido del navegador y vuelve a pulsar Escuchar.')}
}
function switchGame(game){
 if(game===activeGame)return;
 // Leaving a mode resets its session and releases microphone/audio resources.
 stopMic();stopAudio();if(activeGame==='bird'){score=0;lives=3;$('score').textContent='0 / 14';$('target').textContent=noteName(baseMidi());birdY=pitchY(baseMidi());setOverlay('Tu voz le da alas','Activa el micrófono, escucha la referencia y canta una nota sostenida. Completa 14 obstáculos a tu ritmo.')}
 if(activeGame==='dict'||game==='dict')resetSession();activeGame=game;
 for(const key of ['home','bird','dict']){el(key+'Panel').hidden=key!==game;el('tab'+key[0].toUpperCase()+key.slice(1)).setAttribute('aria-selected',String(key===game))}
}
for(const [id,game] of [['tabHome','home'],['tabBird','bird'],['tabDict','dict'],['openBird','bird'],['openDict','dict']])el(id).addEventListener('click',()=>switchGame(game));
el('dictLevel').innerHTML=levels.map((l,i)=>`<option value="${i}">${l.name}</option>`).join('');
el('dictLevel').addEventListener('change',()=>{levelIndex=Number(el('dictLevel').value);configure()});
el('dictMeter').addEventListener('change',()=>{meter=el('dictMeter').value;configure()});
el('dictTempo').addEventListener('change',stopAudio);el('dictClicks').addEventListener('change',stopAudio);
el('restTool').addEventListener('change',renderPalette);
el('hearMelody').addEventListener('click',()=>play(target));el('hearDo').addEventListener('click',()=>play([],false,true));el('hearAnswer').addEventListener('click',()=>{if(!answer.length){feedback('Primero coloca al menos una figura.');return}play(answer)});el('stopDictAudio').addEventListener('click',stopAudio);
el('checkDict').addEventListener('click',check);el('showDictSolution').addEventListener('click',reveal);el('newDictExercise').addEventListener('click',newExercise);
el('nextDictExercise').addEventListener('click',()=>{if(exercise<5){exercise++;newExercise()}else resetSession()});
el('advanceDictLevel').addEventListener('click',()=>{if(levelIndex<levels.length-1){levelIndex++;el('dictLevel').value=levelIndex;configure()}});
el('undoDict').addEventListener('click',()=>{if(history.length&&!resolved){answer=history.pop();selected=null;invalidate()}});
el('clearDict').addEventListener('click',()=>{if(answer.length&&!resolved){saveUndo();answer=[];selected=null;invalidate()}});
el('entryList').addEventListener('click',e=>{const b=e.target.closest('[data-delete]');if(b)remove(Number(b.dataset.delete))});
el('entryList').addEventListener('change',e=>{const id=Number(e.target.dataset.pitch||e.target.dataset.length),event=answer.find(a=>a.id===id);if(!event)return;const replacement={...event};if(e.target.dataset.pitch)replacement.midi=e.target.value==='rest'?null:Number(e.target.value);else replacement.duration=Number(e.target.value);place(replacement,id);render()});
function beginDrag(e,duration,id=null){if(resolved||e.button!==0)return;drag={duration,id,startX:e.clientX,startY:e.clientY,moved:false,rest:id!==null?answer.find(a=>a.id===id).midi===null:el('restTool').checked};e.currentTarget.setPointerCapture(e.pointerId);e.preventDefault()}
el('figurePalette').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-duration]');if(!b||resolved)return;tool=Number(b.dataset.duration);beginDrag(e,tool);renderPalette()});
staff.addEventListener('pointerdown',e=>{const g=e.target.closest('[data-id]');if(g){const id=Number(g.dataset.id);selected=id;const a=answer.find(a=>a.id===id);beginDrag(e,a.duration,id);render()}else{if(resolved)return;beginDrag(e,tool)}});
document.addEventListener('pointermove',e=>{if(!drag)return;if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>6)drag.moved=true;if(drag.moved){preview.hidden=false;preview.style.left=(e.clientX+12)+'px';preview.style.top=(e.clientY+12)+'px';const p=positionAt(e);preview.textContent=durationName(drag.duration,drag.rest)+(p?` · ${drag.rest?'silencio':pitchNames[pitchIndex(p.midi)]} · C${p.bar+1}`:'');const r=el('staffScroll').getBoundingClientRect();if(e.clientY>r.top&&e.clientY<r.bottom){if(e.clientX>r.right-45)el('staffScroll').scrollLeft+=15;if(e.clientX<r.left+45)el('staffScroll').scrollLeft-=15}}});
document.addEventListener('pointerup',e=>{if(!drag)return;const d=drag;drag=null;preview.hidden=true;const p=positionAt(e);if(p&&(d.moved||d.id===null&&e.target.closest('#dictStaff'))){place({...p,duration:d.duration,midi:d.rest?null:p.midi},d.id)}staff.focus({preventScroll:true})});
document.addEventListener('pointercancel',()=>{drag=null;preview.hidden=true});
staff.addEventListener('keydown',e=>{const a=answer.find(a=>a.id===selected);if(!a||resolved)return;const replacement={...a};if(['Delete','Backspace'].includes(e.key)){e.preventDefault();remove(a.id);return}if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')replacement.tick-=grid();if(e.key==='ArrowRight')replacement.tick+=grid();if(e.key==='ArrowUp'||e.key==='ArrowDown'){if(a.midi===null)return;const allowed=levels[levelIndex].notes;const i=allowed.indexOf(a.midi)+(e.key==='ArrowUp'?1:-1);if(i<0||i>=allowed.length)return;replacement.midi=allowed[i]}place(replacement,a.id)});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAudio()});window.addEventListener('pagehide',()=>{stopAudio();resetSession();if(ac)ac.close().catch(()=>{})});
configure();
// Read-only access for repeatable generator and browser checks; no student persistence.
window.DictadoCore=Object.freeze({levels,generateExercise,evaluate});
})();

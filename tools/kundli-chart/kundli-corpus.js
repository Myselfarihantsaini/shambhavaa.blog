/* kundli-corpus.js — source-library cross-reference for the Kundli model.
   Ships alongside corpus-index.json + corpus-books.json. It contains NO book
   text: each indexed passage is described only by the astrological factors it
   discusses (planet/sign/house/nakshatra/yoga/dasha/topic codes) plus its book
   and page span. Given the chart factors the model fired on (and, optionally,
   the words of the rendered reading), it surfaces WHERE in the library each
   conclusion is discussed — book title + page numbers — as sourced reading.
   (c) Shambhavaa. */
(function(){
'use strict';

var SIGNIDX={Aries:0,Taurus:1,Gemini:2,Cancer:3,Leo:4,Virgo:5,Libra:6,Scorpio:7,
  Sagittarius:8,Capricorn:9,Aquarius:10,Pisces:11};
var SIGN_NAME=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio',
  'Sagittarius','Capricorn','Aquarius','Pisces'];
var PCODE={Sun:'SU',Moon:'MO',Mars:'MA',Mercury:'ME',Jupiter:'JU',Venus:'VE',Saturn:'SA',Rahu:'RA',Ketu:'KE'};
var PNAME={SU:'Sun',MO:'Moon',MA:'Mars',ME:'Mercury',JU:'Jupiter',VE:'Venus',SA:'Saturn',RA:'Rahu',KE:'Ketu'};
var EXALT={SU:0,MO:1,MA:9,ME:5,JU:3,VE:11,SA:6};
var NAK=['ashwini','bharani','krittika','rohini','mrigashira','ardra','punarvasu','pushya','ashlesha',
 'magha','purva phalguni','uttara phalguni','hasta','chitra','swati','vishakha','anuradha','jyeshtha',
 'mula','purva ashadha','uttara ashadha','shravana','dhanishta','shatabhisha','purva bhadrapada',
 'uttara bhadrapada','revati'];
var NAKIDX={}; NAK.forEach(function(n,i){NAKIDX[n]=i;});
var TOPIC_LABEL={T_marriage:'marriage',T_career:'career',T_children:'children',T_education:'education',
 T_health:'health',T_wealth:'wealth',T_property:'property',T_foreign:'foreign/travel'};
var CON_LABEL={EXALT:'exaltation',DEBIL:'debilitation',RETRO:'retrograde',COMBUST:'combustion',
 KENDRA:'kendra',TRIKONA:'trikona',DUSTHANA:'dusthana',G_RAJA:'Raja yoga',G_GAJA:'Gaja-kesari',
 G_NBR:'Neecha-bhanga',G_KEM:'Kemadruma',G_SADE:'Sade Sati',D_VIM:'Vimshottari',D_MAHA:'Mahadasha',D_ANTAR:'Antardasha'};

function labelFor(c){
  if(PNAME[c])return PNAME[c];
  if(c[0]==='Z')return SIGN_NAME[(+c.slice(1))-1];
  if(c[0]==='H')return (+c.slice(1))+ordSuffix(+c.slice(1))+' house';
  if(c[0]==='N')return NAK[(+c.slice(1))-1].replace(/\b\w/g,function(m){return m.toUpperCase();});
  if(TOPIC_LABEL[c])return TOPIC_LABEL[c];
  if(CON_LABEL[c])return CON_LABEL[c];
  return c;
}
function ordSuffix(n){var s=['th','st','nd','rd'],v=n%100;return s[(v-20)%10]||s[v]||s[0];}

/* compact scanners to detect which factors the rendered reading text mentions */
var SCAN=[
 ['SU',/\bsun\b/],['MO',/\bmoon\b/],['MA',/\bmars\b/],['ME',/\bmercury\b/],['JU',/\bjupiter\b/],
 ['VE',/\bvenus\b/],['SA',/\bsaturn\b/],['RA',/\brahu\b/],['KE',/\bketu\b/]
];
var ORD=['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth'];
var ORDN=['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th'];
for(var i=0;i<12;i++){SCAN.push(['H'+(i+1),new RegExp('\\b('+ORD[i]+'|'+ORDN[i]+')\\s+house')]);
  SCAN.push(['Z'+(i+1),new RegExp('\\b'+SIGN_NAME[i].toLowerCase()+'\\b')]);}

var Corpus={
  loaded:false, index:null, books:null, _loading:null,
  load:function(base){
    if(this.loaded)return Promise.resolve();
    if(this._loading)return this._loading;
    base=base||'';
    var self=this;
    this._loading=Promise.all([
      fetch(base+'corpus-index.json').then(function(r){if(!r.ok)throw new Error('corpus-index');return r.json();}),
      fetch(base+'corpus-books.json').then(function(r){if(!r.ok)throw new Error('corpus-books');return r.json();})
    ]).then(function(a){self.index=a[0];self.books=a[1];self.loaded=true;});
    return this._loading;
  },

  findReferences:function(chart, topic, readingText, extra){
    if(!this.loaded||!chart||!chart.birth_chart)return [];
    var bc=chart.birth_chart, q={}, combos=[];
    function add(c,w){ if((q[c]||0)<w) q[c]=w; }
    var planets=bc.planets||{};
    Object.keys(planets).forEach(function(name){
      var pl=planets[name], pc=PCODE[name]; if(!pc)return;
      add(pc,2);
      var zi=SIGNIDX[pl.sign], zc=null, hc=null;
      if(zi!=null){zc='Z'+(zi+1); add(zc,1);}
      if(pl.house){hc='H'+pl.house; add(hc,1.5);}
      if(pl.nakshatra){var ni=NAKIDX[(''+pl.nakshatra).toLowerCase()]; if(ni!=null)add('N'+(ni+1),1);}
      if(pl.retrograde)add('RETRO',0.8);
      if(pl.combust)add('COMBUST',0.8);
      if(zi!=null&&EXALT[pc]!=null){ if(zi===EXALT[pc])add('EXALT',1); else if(zi===(EXALT[pc]+6)%12)add('DEBIL',1); }
      combos.push({p:pc,h:hc,z:zc});
    });
    var li=SIGNIDX[bc.lagna]; if(li!=null)add('Z'+(li+1),0.6); add('H1',0.6);
    var cd=bc.current_dasha||{};
    if(cd.mahadasha&&PCODE[cd.mahadasha]){add(PCODE[cd.mahadasha],2.5);add('D_MAHA',1);}
    if(cd.antardasha&&PCODE[cd.antardasha]){add(PCODE[cd.antardasha],1.5);add('D_ANTAR',1);}
    add('D_VIM',0.4);
    if(topic&&topic!=='general')add('T_'+topic,3);
    if(extra&&extra.sadeSati)add('G_SADE',2);
    if(readingText){ var low=(''+readingText).toLowerCase();
      for(var s=0;s<SCAN.length;s++){ if(SCAN[s][1].test(low)) add(SCAN[s][0],(q[SCAN[s][0]]||0)+0.7); } }

    var scored=[];
    for(var r=0;r<this.index.length;r++){
      var rec=this.index[r], t=rec.t, sc=0, matched=[], j;
      for(j=0;j<t.length;j++){ if(q[t[j]]!=null){ sc+=q[t[j]]; matched.push(t[j]); } }
      if(rec.k){ for(j=0;j<rec.k.length;j++){ if(q[rec.k[j]]!=null){ sc+=q[rec.k[j]]; matched.push(rec.k[j]); } } }
      if(sc<=0)continue;
      for(j=0;j<combos.length;j++){ var cm=combos[j], hasP=t.indexOf(cm.p)>=0;
        if(hasP&&cm.h&&t.indexOf(cm.h)>=0)sc+=3;
        if(hasP&&cm.z&&t.indexOf(cm.z)>=0)sc+=1.5; }
      sc=sc/(1+0.04*t.length);
      scored.push({rec:rec,s:sc,matched:matched});
    }
    scored.sort(function(a,b){return b.s-a.s;});

    // greedy: up to 2 per book, 6 total, dedup near pages
    var perBook={}, out=[], MAXB=2, MAXN=6;
    for(var k=0;k<scored.length&&out.length<MAXN;k++){
      var it=scored[k], b=it.rec.b;
      if((perBook[b]||0)>=MAXB)continue;
      var dup=false;
      for(var o=0;o<out.length;o++){ if(out[o].b===b && Math.abs(out[o].ps-it.rec.ps)<=2){dup=true;break;} }
      if(dup)continue;
      perBook[b]=(perBook[b]||0)+1;
      out.push({b:b,title:(this.books[b]&&this.books[b].title)||'Source',
        ps:it.rec.ps,pe:it.rec.pe,score:it.s,
        labels:this._labels(it.matched,q)});
    }
    return out;
  },

  _labels:function(matched,q){
    // de-dup, weight by query weight, prioritise planets/houses/signs/topics
    var seen={}, arr=[];
    matched.forEach(function(c){ if(seen[c])return; seen[c]=1; arr.push(c); });
    var rank=function(c){ var p=0;
      if(c[0]==='T')p=6; else if(c[0]==='H')p=5; else if(c[0]==='Z')p=4;
      else if(PNAME[c])p=3; else if(c[0]==='N')p=2; else p=1;
      return p + (q[c]||0)*0.05; };
    arr.sort(function(a,b){return rank(b)-rank(a);});
    return arr.slice(0,5).map(labelFor);
  },

  renderHTML:function(refs, topic){
    if(!refs||!refs.length)
      return '<div class="cx-note">No close matches in the source library for this combination.</div>';
    var head='<div class="cx-head">From the source library'+
      (topic&&topic!=='general'?' &middot; '+topic:'')+'</div>'+
      '<div class="cx-sub">Where the factors in this chart are discussed across the classical texts. '+
      'Citations point to the books — open them to read the passages.</div>';
    var items=refs.map(function(r){
      var pp='p.'+r.ps+((r.pe&&r.pe!==r.ps)?'\u2013'+r.pe:'');
      return '<li class="cx-item"><div class="cx-bk">'+esc(r.title)+'</div>'+
        '<div class="cx-meta"><span class="cx-pp">'+pp+'</span>'+
        '<span class="cx-fac">'+r.labels.map(esc).join(' &middot; ')+'</span></div></li>';
    }).join('');
    return head+'<ul class="cx-list">'+items+'</ul>';
  }
};
function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

window.KundliCorpus=Corpus;
})();

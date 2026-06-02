/* Shambhavaa Perfume Oracle v2 data bridge.
   This keeps the richer scent library separate from the calculator logic. */
(function(){
'use strict';

var nakRows=[
 ['Ashwini','Ketu','neroli','basil','light sandalwood','fresh, fast, healing, youthful','sharp camphor, too much mint',['ginger','neroli','basil','sandalwood']],
 ['Bharani','Venus','rose absolute','saffron','labdanum','sensual, intense, transformative','heavy musk, animalic oud',['rose pepper','saffron','plum','labdanum']],
 ['Krittika','Sun','clove bud','orange blossom','cedarwood','sharp, fiery, purifying','cinnamon overload, smoky leather',['clove','orange blossom','cedar leaf','frankincense']],
 ['Rohini','Moon','rose','fig','creamy sandalwood','fertile, luxurious, romantic','sugary vanilla, heavy gourmand',['rose','fig','vanilla orchid','sandalwood']],
 ['Mrigashira','Mars','jasmine sambac','green tea','vetiver','curious, roaming, delicate','too much pepper, dry woods',['green tea','jasmine sambac','vetiver','mint']],
 ['Ardra','Rahu','ozone accord','black pepper','patchouli','stormy, electric, cathartic','heavy smoke, metallic notes',['black pepper','ozone accord','patchouli','incense']],
 ['Punarvasu','Jupiter','lotus','honey','benzoin','renewing, hopeful, sheltering','excess sweetness, dense amber',['lotus','honey','benzoin','chamomile']],
 ['Pushya','Saturn','milk accord','chamomile','sandalwood','nourishing, devotional, protective','sour lactonic notes, heavy incense',['milk accord','tulsi','sandalwood','chamomile']],
 ['Ashlesha','Mercury','tuberose','cardamom','musk','magnetic, secretive, intuitive','too much indolic jasmine, heavy musk',['cardamom','tuberose','musk','vetiver']],
 ['Magha','Ketu','frankincense','marigold','oud','royal, ancestral, commanding','heavy leather, smoky tar',['marigold','frankincense','oud','cedarwood']],
 ['Purva Phalguni','Venus','ylang-ylang','peach','vanilla','romantic, pleasurable, radiant','overly sweet fruits, dense musk',['ylang-ylang','peach','rose','vanilla']],
 ['Uttara Phalguni','Sun','iris','bergamot','cedarwood','loyal, dignified, graceful','harsh citrus, dry aldehydes',['iris','bergamot','cedarwood','amber']],
 ['Hasta','Moon','lavender','camphor','white musk','skilled, soft, precise','too much camphor, medicinal sharpness',['lavender','camphor','white musk','jasmine tea']],
 ['Chitra','Mars','iris','saffron','amber','glamorous, artistic, jewel-like','excess metallic notes, powder overload',['saffron','iris','amber','pink pepper']],
 ['Swati','Rahu','green tea','lime','vetiver','airy, independent, elegant','too much ozonic sharpness',['lime','green tea','vetiver','white musk']],
 ['Vishakha','Jupiter','saffron','blackcurrant','amberwood','focused, victorious, ambitious','burnt sugar, heavy spice',['blackcurrant','saffron','amberwood','rosewood']],
 ['Anuradha','Saturn','rose','plum','sandalwood','loyal, devotional, soft-magnetic','dark patchouli, heavy smoke',['rose','plum','sandalwood','benzoin']],
 ['Jyeshtha','Mercury','geranium','nutmeg','cedarwood','senior, protective, penetrating','metallic aldehydes, bitter herbs',['geranium','nutmeg','cedarwood','patchouli']],
 ['Mula','Ketu','vetiver','turmeric','oud','root-deep, raw, truth-seeking','heavy smoke, tar, cumin',['turmeric','vetiver','oud','frankincense']],
 ['Purva Ashadha','Venus','lotus','coconut water','sandalwood','confident, cleansing, charismatic','aquatic synthetics, sugary coconut',['coconut water','lotus','jasmine','sandalwood']],
 ['Uttara Ashadha','Sun','frankincense','cedar leaf','oakmoss','ethical, enduring, reputable','harsh woods, excessive dryness',['cedar leaf','frankincense','oakmoss','amber']],
 ['Shravana','Moon','jasmine tea','tulsi','sandalwood','sacred, listening, refined','loud florals, sugary notes',['tulsi','jasmine tea','sandalwood','orris']],
 ['Dhanishta','Mars','saffron','cardamom','amber','rhythmic, prosperous, bold','loud spice, metallic notes',['saffron','cardamom','amber','cedarwood']],
 ['Shatabhisha','Rahu','blue lotus','mint','vetiver','mysterious, clean, distant','medicinal camphor, cold aldehydes',['mint','blue lotus','vetiver','incense']],
 ['Purva Bhadrapada','Jupiter','myrrh','black tea','oud','intense, mystical, severe','burnt resin, animalic musk',['black tea','myrrh','oud','frankincense']],
 ['Uttara Bhadrapada','Saturn','lotus','orris','ambergris accord','deep, still, compassionate','heavy aquatic, swampy notes',['lotus','orris','ambergris accord','sandalwood']],
 ['Revati','Mercury','neroli','pear','white sandalwood','gentle, safe, graceful, guiding','sugary fruit, sharp citrus',['pear','neroli','white sandalwood','vanilla musk']]
];

var planetProfiles={
 Sun:{top:['bergamot','bitter orange','saffron'],heart:['marigold','frankincense','orange blossom'],base:['cedarwood','amber','benzoin'],aura:'authority, vitality and dignity',bestUse:'leadership aura and public presence',risk:'too sharp, egoic, dry or overheated'},
 Moon:{top:['pear','coconut water','cucumber'],heart:['lotus','jasmine tea','white rose'],base:['sandalwood','white musk','soft vanilla'],aura:'emotional comfort, receptivity and calm',bestUse:'soothing blends and intimate softness',risk:'too watery, sentimental or unstable'},
 Mars:{top:['ginger','pink pepper','grapefruit'],heart:['saffron','clove','geranium'],base:['vetiver','cedarwood','leather accord'],aura:'courage, action, heat and protection',bestUse:'drive, athletic aura and decisive action',risk:'aggressive, spicy, burning or harsh'},
 Mercury:{top:['lime','mint','basil'],heart:['lavender','neroli','cardamom'],base:['white musk','vetiver','light cedar'],aura:'intelligence, speech, trade and adaptability',bestUse:'communication, study and clean clarity',risk:'nervous, too sharp or scattered'},
 Jupiter:{top:['mandarin','honey','tulsi'],heart:['lotus','champaca','frankincense'],base:['benzoin','sandalwood','amber'],aura:'wisdom, expansion, blessing and guidance',bestUse:'teaching, wealth support and guru-like warmth',risk:'over-sweet, heavy or moralizing'},
 Venus:{top:['bergamot','peach','lychee'],heart:['rose','ylang-ylang','jasmine sambac'],base:['vanilla','sandalwood','musk'],aura:'beauty, attraction, luxury and refinement',bestUse:'relationship aura and premium scent',risk:'over-seductive, sugary or indulgent'},
 Saturn:{top:['cypress','black tea','vetiver leaf'],heart:['orris','violet leaf','myrrh'],base:['patchouli','oakmoss','dark cedar'],aura:'discipline, endurance and maturity',bestUse:'grounding, authority and long wear',risk:'too dry, cold or depressive'},
 Rahu:{top:['ozone accord','black pepper','absinthe accord'],heart:['tuberose','blue lotus','smoky tea'],base:['amberwood','musk','patchouli'],aura:'magnetism, foreign style and innovation',bestUse:'unconventional public image and magnetic aura',risk:'synthetic, obsessive or smoky'},
 Ketu:{top:['camphor','eucalyptus','ginger'],heart:['frankincense','turmeric','marigold'],base:['oud','vetiver','sandalwood'],aura:'detachment, intuition and moksha',bestUse:'spiritual aura and release',risk:'too austere, medicinal or isolating'}
};

var rashiProfiles={
 Aries:{familyBias:'spicy citrus woods',top:['grapefruit','ginger','pink pepper'],heart:['saffron','clove'],base:['cedarwood','vetiver'],avoid:'hot cinnamon, harsh smoke'},
 Taurus:{familyBias:'floral gourmand woods',top:['pear','bergamot','fig leaf'],heart:['rose','iris','ylang-ylang'],base:['sandalwood','vanilla'],avoid:'heavy sugar, dense patchouli'},
 Gemini:{familyBias:'herbal citrus aromatic',top:['lime','mint','basil'],heart:['lavender','neroli'],base:['white musk','vetiver'],avoid:'too many notes, sharp aldehydes'},
 Cancer:{familyBias:'soft lunar floral',top:['coconut water','cucumber','pear'],heart:['lotus','jasmine tea','white rose'],base:['sandalwood','musk'],avoid:'aquatic synthetics, sour lactones'},
 Leo:{familyBias:'solar amber floral',top:['bitter orange','saffron'],heart:['marigold','orange blossom'],base:['amber','cedarwood'],avoid:'excess amber, burnt spice'},
 Virgo:{familyBias:'clean herbal powder',top:['bergamot','basil','green tea'],heart:['lavender','iris'],base:['vetiver','white musk'],avoid:'sterile soap, too much camphor'},
 Libra:{familyBias:'elegant floral musk',top:['bergamot','peach','neroli'],heart:['rose','jasmine','orris'],base:['musk','sandalwood'],avoid:'sugary florals, loud fruit'},
 Scorpio:{familyBias:'dark resinous floral',top:['black pepper','plum'],heart:['tuberose','saffron'],base:['oud','patchouli','labdanum'],avoid:'animalic musk, heavy smoke'},
 Sagittarius:{familyBias:'resinous sacred citrus',top:['mandarin','tulsi','saffron'],heart:['frankincense','lotus'],base:['benzoin','sandalwood'],avoid:'too much incense, syrupy amber'},
 Capricorn:{familyBias:'dry woody mineral',top:['cypress','black tea'],heart:['orris','myrrh'],base:['oakmoss','cedarwood'],avoid:'damp earth, bitter leather'},
 Aquarius:{familyBias:'cool aromatic mineral',top:['mint','ozone accord','lime'],heart:['blue lotus','violet leaf'],base:['vetiver','amberwood'],avoid:'metallic aldehydes, cold synthetics'},
 Pisces:{familyBias:'spiritual aquatic floral',top:['pear','neroli','coconut water'],heart:['lotus','jasmine','champaca'],base:['sandalwood','benzoin','musk'],avoid:'watery sweetness, vague powder'}
};

var modifiers={
 exalted:{effect:'refined, premium and central expression',weightMultiplier:1.40,intensityDelta:1},
 own_sign:{effect:'balanced, natural and recognisable expression',weightMultiplier:1.25,intensityDelta:1},
 mooltrikona:{effect:'purposeful and stable expression',weightMultiplier:1.20,intensityDelta:1},
 friendly:{effect:'smoothly blended with the sign family',weightMultiplier:1.10,intensityDelta:0},
 enemy:{effect:'reduced sharpness with support from the dispositor',weightMultiplier:0.85,intensityDelta:-1},
 debilitated:{effect:'gentle replacement instead of full signature',weightMultiplier:0.60,intensityDelta:-2},
 combust:{effect:'compressed by solar heat; volatile notes softened',weightMultiplier:0.70,intensityDelta:-1},
 retrograde:{effect:'deeper, inward and more resinous',weightMultiplier:1.05,intensityDelta:1},
 vargottama:{effect:'central, elegant and stable across D1 and D9',weightMultiplier:1.35,intensityDelta:1},
 shadbala_strong:{effect:'direct full-bodied planet accord',weightMultiplier:1.30,intensityDelta:1},
 shadbala_weak:{effect:'supportive trace rather than full dose',weightMultiplier:0.65,intensityDelta:-1},
 benefic_aspect:{effect:'smoother and more refined finish',weightMultiplier:1.10,intensityDelta:0},
 malefic_aspect:{effect:'drier, tenser and more controlled',weightMultiplier:0.90,intensityDelta:0},
 rahu_conjunct:{effect:'modern, unusual and higher projection',weightMultiplier:1.15,intensityDelta:1},
 ketu_conjunct:{effect:'spiritualized, dry and less sensual',weightMultiplier:0.90,intensityDelta:-1},
 dusthana_stress:{effect:'cleaner and safer, with reduced heaviness',weightMultiplier:0.70,intensityDelta:-1}
};

var sensitivityProfiles={
 headache_prone:{avoidFamilies:['white_florals','resins','smoke_tobacco'],avoidNotes:['tuberose','indolic jasmine','strong aldehydes'],replacements:['neroli','lotus','green tea','white musk']},
 pitta_sensitive:{avoidFamilies:['spice','smoke_tobacco'],avoidNotes:['cinnamon','clove','black pepper'],replacements:['cardamom','tulsi','rose','sandalwood']},
 kapha_heavy:{avoidFamilies:['gourmand','musks_ambers'],avoidNotes:['vanilla','caramel','dense musk'],replacements:['lime','ginger','mint','vetiver']},
 vata_sensitive:{avoidFamilies:['citrus','aquatic_mineral'],avoidNotes:['grapefruit','ozone accord','eucalyptus'],replacements:['sandalwood','benzoin','chamomile','iris']},
 floral_sensitive:{avoidFamilies:['white_florals','rose_florals'],avoidNotes:['rose absolute','ylang-ylang','tuberose'],replacements:['tea','basil','saffron','soft woods']},
 resin_sensitive:{avoidFamilies:['resins','smoke_tobacco'],avoidNotes:['oud','myrrh','labdanum','smoky frankincense'],replacements:['cedarwood','vetiver','white sandalwood']},
 musk_sensitive:{avoidFamilies:['musks_ambers'],avoidNotes:['heavy musk','ambergris accord'],replacements:['white musk','sandalwood','orris']},
 aquatic_sensitive:{avoidFamilies:['aquatic_mineral'],avoidNotes:['calone','cold ozonic notes'],replacements:['lotus','cucumber','pear','green tea']},
 spice_sensitive:{avoidFamilies:['spice'],avoidNotes:['clove','cinnamon','cumin','pepper'],replacements:['cardamom','saffron','ginger']},
 sweetness_sensitive:{avoidFamilies:['gourmand'],avoidNotes:['vanilla','honey','caramel','peach syrup'],replacements:['iris','green tea','bergamot','cedarwood']},
 smoke_sensitive:{avoidFamilies:['smoke_tobacco'],avoidNotes:['birch tar','smoky oud','burnt resin'],replacements:['frankincense','cedarwood','vetiver']},
 projection_sensitive:{avoidFamilies:['musks_ambers'],avoidNotes:['amberwood','sharp musks'],replacements:['natural citrus trace','tea','sandalwood']}
};

var expressionModes={
 auto:{label:'Auto from chart',top:[],heart:[],base:[],intensity:0},
 soft_feminine:{label:'Soft feminine',top:['pear','neroli'],heart:['rose','lotus','iris'],base:['vanilla','sandalwood'],intensity:-1},
 regal_feminine:{label:'Regal feminine',top:['bergamot'],heart:['rose','saffron'],base:['amber','sandalwood'],intensity:1},
 fresh_unisex:{label:'Fresh unisex',top:['lime','neroli'],heart:['green tea'],base:['vetiver','white musk'],intensity:-1},
 dark_unisex:{label:'Dark unisex',top:['black tea'],heart:['myrrh'],base:['oud','patchouli','incense'],intensity:1},
 clean_professional:{label:'Clean professional',top:['bergamot'],heart:['lavender'],base:['cedarwood','white musk'],intensity:-1},
 masculine_woody:{label:'Masculine woody',top:['grapefruit'],heart:['frankincense'],base:['vetiver','cedarwood','leather accord'],intensity:1},
 spiritual_minimal:{label:'Spiritual minimal',top:['tulsi'],heart:['lotus','frankincense'],base:['sandalwood'],intensity:-1}
};

var strengthModes={
 skin:{label:'Skin scent',topDelta:-4,heartDelta:4,baseDelta:0,intensity:-2,notes:['white musk','sandalwood']},
 daily:{label:'Daily wear',topDelta:2,heartDelta:0,baseDelta:-2,intensity:-1,notes:['bergamot','green tea','white musk']},
 ritual:{label:'Ritual wear',topDelta:-5,heartDelta:2,baseDelta:3,intensity:1,notes:['frankincense','sandalwood','lotus']},
 attraction:{label:'Attraction wear',topDelta:0,heartDelta:5,baseDelta:-5,intensity:1,notes:['rose','jasmine sambac','musk']},
 authority:{label:'Authority wear',topDelta:-2,heartDelta:0,baseDelta:2,intensity:1,notes:['saffron','cedarwood','frankincense']},
 luxury:{label:'Luxury wear',topDelta:-2,heartDelta:4,baseDelta:-2,intensity:1,notes:['rose','sandalwood','benzoin']},
 spiritual:{label:'Spiritual minimal',topDelta:-3,heartDelta:2,baseDelta:1,intensity:-1,notes:['tulsi','lotus','sandalwood']}
};

var noteTaxonomy={
 'rose absolute':{p:'heart',i:8,l:7},'clove bud':{p:'heart',i:8,l:6},'light sandalwood':{p:'base',i:5,l:8},
 'creamy sandalwood':{p:'base',i:6,l:8},'fig':{p:'top-heart',i:5,l:4},'fig leaf':{p:'top-heart',i:4,l:4},
 'ozone accord':{p:'top',i:7,l:4},'plum':{p:'top-heart',i:6,l:5},'chamomile':{p:'heart',i:4,l:4},
 'musk':{p:'base',i:6,l:8},'marigold':{p:'heart',i:6,l:5},'peach':{p:'top-heart',i:5,l:4},
 'vanilla orchid':{p:'heart-base',i:6,l:6},'geranium':{p:'heart',i:6,l:5},'nutmeg':{p:'heart',i:7,l:5},
 'turmeric':{p:'heart',i:6,l:5},'coconut water':{p:'top',i:4,l:3},'cedar leaf':{p:'top-heart',i:5,l:5},
 'jasmine tea':{p:'heart',i:4,l:4},'tulsi':{p:'heart',i:5,l:5},'vetiver leaf':{p:'top-heart',i:5,l:4},
 'blue lotus':{p:'heart',i:5,l:5},'amberwood':{p:'base',i:8,l:9},'rosewood':{p:'base',i:6,l:7},
 'ambergris accord':{p:'base',i:7,l:9},'white sandalwood':{p:'base',i:5,l:8},'vanilla musk':{p:'base',i:6,l:8},
 'bitter orange':{p:'top',i:5,l:3},'cucumber':{p:'top',i:3,l:3},'soft vanilla':{p:'base',i:5,l:7},
 'leather accord':{p:'base',i:7,l:8},'light cedar':{p:'base',i:5,l:7},'champaca':{p:'heart',i:7,l:6},
 'cypress':{p:'top-heart',i:6,l:6},'dark cedar':{p:'base',i:8,l:9},'absinthe accord':{p:'top-heart',i:7,l:5},
 'smoky tea':{p:'heart-base',i:7,l:7},'eucalyptus':{p:'top',i:7,l:3},'rose pepper':{p:'top-heart',i:6,l:4},
 'incense':{p:'base',i:7,l:8},'soft woods':{p:'base',i:5,l:7},'tea':{p:'heart',i:4,l:4},
 'natural citrus trace':{p:'top',i:3,l:2},'indolic jasmine':{p:'heart',i:9,l:6},'strong aldehydes':{p:'top',i:9,l:4},
 'smoky frankincense':{p:'base',i:8,l:8},'heavy musk':{p:'base',i:9,l:9},'dense musk':{p:'base',i:9,l:9},
 'caramel':{p:'base',i:8,l:7},'peach syrup':{p:'top-heart',i:7,l:4},'birch tar':{p:'base',i:10,l:10},
 'smoky oud':{p:'base',i:10,l:10},'burnt resin':{p:'base',i:9,l:9},'sharp musks':{p:'base',i:8,l:8},
 'calone':{p:'top-heart',i:7,l:5},'cold ozonic notes':{p:'top',i:7,l:4},'aldehydes':{p:'top',i:7,l:4},
 'cumin':{p:'heart',i:8,l:5},'pepper':{p:'top-heart',i:7,l:4}
};

var replacementRules={
 'rose absolute':'iris','clove bud':'cardamom','ozone accord':'green tea','amberwood':'vetiver','ambergris accord':'ambroxan',
 'heavy musk':'sandalwood','dense musk':'sandalwood','animalic oud':'cedarwood','indolic jasmine':'iris','strong aldehydes':'neroli',
 'smoky frankincense':'frankincense','calone':'lotus','cold ozonic notes':'green tea','cinnamon':'cardamom','clove':'cardamom',
 'black pepper':'juniper','pepper':'cardamom','cumin':'ginger','eucalyptus':'tulsi','camphor':'lavender','peach syrup':'iris',
 'caramel':'benzoin','birch tar':'vetiver','smoky oud':'cedarwood','burnt resin':'frankincense','amberwood overdose':'vetiver'
};

function mergeObject(target,patch){
  Object.keys(patch||{}).forEach(function(k){
    if(patch[k]&&typeof patch[k]==='object'&&!Array.isArray(patch[k])){
      if(!target[k]||typeof target[k]!=='object'||Array.isArray(target[k]))target[k]={};
      mergeObject(target[k],patch[k]);
    }else target[k]=patch[k];
  });
}
function addTaxonomy(DATA,name,props){
  if(!name)return;
  DATA.noteTaxonomy[name]=props||DATA.noteTaxonomy[name]||{p:'heart',i:5,l:5};
  var layer=(DATA.noteTaxonomy[name].p||'heart').split('-')[0];
  if(!DATA.notePhase[layer])DATA.notePhase[layer]=[];
  if(DATA.notePhase[layer].indexOf(name)<0)DATA.notePhase[layer].push(name);
}

window.applyPerfumeV2Patch=function(DATA){
  if(!DATA||DATA.perfumeV2Applied)return;
  DATA.perfumeV2Applied=true;
  DATA.padaNotes={};
  DATA.nakshatraProfiles={};
  nakRows.forEach(function(r,i){
    DATA.padaNotes[r[0]]=r[7];
    DATA.nakshatraProfiles[r[0]]={lord:r[1],heart:r[2],secondary:r[3],base:r[4],tags:r[5],avoid:r[6]};
    if(DATA.nakshatras[i]){
      DATA.nakshatras[i].lord=r[1];
      DATA.nakshatras[i].heart=r[2];
      DATA.nakshatras[i].secondary=r[3];
      DATA.nakshatras[i].base=r[4];
      DATA.nakshatras[i].character=r[5];
      DATA.nakshatras[i].avoid=r[6];
    }
    r.slice(2,5).concat(r[7]).forEach(function(n){addTaxonomy(DATA,n,noteTaxonomy[n]);});
  });
  Object.keys(planetProfiles).forEach(function(p){
    mergeObject(DATA.planets[p],planetProfiles[p]);
    DATA.planets[p].notes=[].concat(planetProfiles[p].top,planetProfiles[p].heart,planetProfiles[p].base);
    DATA.planets[p].notes.forEach(function(n){addTaxonomy(DATA,n,noteTaxonomy[n]);});
  });
  Object.keys(rashiProfiles).forEach(function(r){
    mergeObject(DATA.rashis[r],rashiProfiles[r]);
    DATA.rashis[r].rashiNotes=[].concat(rashiProfiles[r].top,rashiProfiles[r].heart,rashiProfiles[r].base);
    DATA.rashis[r].avoid=rashiProfiles[r].avoid;
    DATA.rashis[r].rashiNotes.forEach(function(n){addTaxonomy(DATA,n,noteTaxonomy[n]);});
  });
  mergeObject(DATA.modifiers,modifiers);
  DATA.blendWeights={lagna_element_family:0.15,lagna_lord_signature:0.10,moon_nakshatra_heart:0.25,moon_pada_note:0.10,navamsha_lord_aura:0.10,mahadasha_lord_current:0.10,antardasha_lord_accent:0.05,dominant_house_theme:0.03,atmakaraka_soul:0.10,strongest_planet:0.05};
  mergeObject(DATA.noteTaxonomy,noteTaxonomy);
  Object.keys(DATA.noteTaxonomy).forEach(function(n){addTaxonomy(DATA,n,DATA.noteTaxonomy[n]);});
  mergeObject(DATA.allergy.replacementRules,replacementRules);
  mergeObject(DATA.allergy.sensitivityProfiles,sensitivityProfiles);
  DATA.expressionModes=expressionModes;
  DATA.strengthModes=strengthModes;
  DATA.accuracyProfiles={
    exact:{label:'Exact birth time',lagnaWeight:1,d9Weight:1,houseWeight:1,confidence:'High'},
    five:{label:'Approx within 5 minutes',lagnaWeight:.9,d9Weight:.9,houseWeight:.9,confidence:'Good'},
    fifteen:{label:'Approx within 15 minutes',lagnaWeight:.65,d9Weight:.55,houseWeight:.65,confidence:'Medium'},
    unknown:{label:'Unknown birth time',lagnaWeight:.15,d9Weight:.1,houseWeight:.1,confidence:'Low'}
  };
  DATA.degreeRules={sandhiMinutes:30,exactExaltOrb:3,exactDebilOrb:3,strongConjunctionOrb:7,severeCombustOrb:3,mildCombustOrb:10};
};
})();

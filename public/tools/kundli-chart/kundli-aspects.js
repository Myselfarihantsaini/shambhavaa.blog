/* D1 whole-sign, full graha drishti. PVR Narasimha Rao, chapter 10.2.
   Node aspects are deliberately excluded; this is not degree-based Drik Bala. */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const RULES = {Sun:[7], Moon:[7], Mars:[4,7,8], Mercury:[7], Jupiter:[5,7,9], Venus:[7], Saturn:[3,7,10], Rahu:[], Ketu:[]};
  const AREAS = {
    1:'150,1 225,75 150,150 75,75', 2:'1,1 150,1 75,75',
    3:'1,1 75,75 1,150', 4:'1,150 75,75 150,150 75,225',
    5:'1,150 75,225 1,299', 6:'1,299 75,225 150,299',
    7:'75,225 150,150 225,225 150,299', 8:'150,299 225,225 299,299',
    9:'225,225 299,150 299,299', 10:'150,150 225,75 299,150 225,225',
    11:'225,75 299,1 299,150', 12:'150,1 299,1 225,75'
  };
  const CENTRES = {1:[150,75],2:[75,25],3:[25,75],4:[75,150],5:[25,225],6:[75,275],7:[150,225],8:[225,275],9:[275,225],10:[225,150],11:[275,75],12:[225,25]};
  let chart, positions, select, status, animation, panel;

  function svg(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs || {}).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  }

  function render() {
    if (!chart || !positions) return;
    chart.querySelectorAll('.aspect-layer').forEach(el => el.remove());
    const planet = select.value;
    chart.querySelectorAll('[data-aspect-planet]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.aspectPlanet === planet)));
    if (!planet) { status.textContent = 'D1 \u00b7 Full graha drishti \u00b7 Whole-sign houses'; return; }
    const source = positions[planet];
    const targets = RULES[planet].map(offset => ({house:((source + offset - 2) % 12) + 1, offset}));
    const layer = svg('g', {'class':'aspect-layer', 'aria-hidden':'true', 'pointer-events':'none'});
    const defs = svg('defs');
    const marker = svg('marker', {id:'d1-aspect-arrow', viewBox:'0 0 10 10', refX:9, refY:5, markerWidth:5, markerHeight:5, orient:'auto'});
    marker.appendChild(svg('path', {d:'M 0 0 L 10 5 L 0 10 z', fill:'#65d6ca'}));
    defs.appendChild(marker); layer.appendChild(defs);
    layer.appendChild(svg('polygon', {points:AREAS[source], 'class':'aspect-source', 'data-house':source}));
    targets.forEach(({house}) => layer.appendChild(svg('polygon', {points:AREAS[house], 'class':'aspect-target', 'data-house':house})));
    targets.forEach(({house, offset}) => {
      const a = CENTRES[source], b = CENTRES[house];
      const dx = b[0]-a[0], dy = b[1]-a[1], length = Math.hypot(dx,dy);
      const start = [a[0]+dx/length*18, a[1]+dy/length*18];
      const end = [b[0]-dx/length*18, b[1]-dy/length*18];
      const bend = offset === 7 ? 12 : 22;
      const control = [(a[0]+b[0])/2-dy/length*bend, (a[1]+b[1])/2+dx/length*bend];
      layer.appendChild(svg('path', {
        d:`M ${start} Q ${control} ${end}`, 'class':'aspect-ray'+(animation.checked?' is-animated':''),
        'marker-end':'url(#d1-aspect-arrow)', 'data-target-house':house, 'data-offset':offset
      }));
    });
    chart.insertBefore(layer, chart.firstChild);
    status.textContent = targets.length
      ? `${planet} \u00b7 House ${source} \u2192 ${targets.map(t => 'House '+t.house+' ('+t.offset+(t.offset===3?'rd':'th')+' aspect)').join(', ')}`
      : `${planet} \u00b7 House ${source} \u00b7 Node aspects excluded; traditions differ.`;
  }

  function setup() {
    panel = document.createElement('div'); panel.className = 'aspect-controls';
    const label = document.createElement('label'); label.htmlFor = 'aspect-planet'; label.textContent = 'Planet aspect';
    select = document.createElement('select'); select.id = 'aspect-planet';
    [['','None'], ...Object.keys(RULES).map(p => [p,p])].forEach(([value,text]) => {
      const option = document.createElement('option'); option.value = value; option.textContent = text; select.appendChild(option);
    });
    const motionLabel = document.createElement('label'); motionLabel.className = 'aspect-motion';
    animation = document.createElement('input'); animation.type = 'checkbox'; animation.checked = true;
    motionLabel.append(animation, document.createTextNode('Animate'));
    status = document.createElement('p'); status.className = 'aspect-status'; status.setAttribute('role','status'); status.setAttribute('aria-live','polite');
    panel.append(label,select,motionLabel,status);
    chart.parentElement.appendChild(panel);
    select.addEventListener('change',render); animation.addEventListener('change',render);
    chart.addEventListener('click', event => {
      const target = event.target.closest('[data-aspect-planet]');
      if (target) { select.value = select.value === target.dataset.aspectPlanet ? '' : target.dataset.aspectPlanet; render(); }
    });
    chart.addEventListener('keydown', event => {
      if (event.key === 'Escape') { select.value=''; render(); }
      if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-aspect-planet]')) {
        event.preventDefault(); event.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));
      }
    });
  }

  const original = window.drawNorthChart;
  if (typeof original !== 'function') return;
  window.drawNorthChart = function (element, lagna, signs) {
    original.apply(this, arguments);
    if (!element || element.id !== 'chart') return;
    chart = element;
    if (!panel) setup();
    positions = {};
    Object.keys(RULES).forEach(p => { positions[p] = ((signs[p]-lagna+12)%12)+1; });
    const names = Object.fromEntries(Object.entries(PL_ABBR).map(([name,abbr]) => [abbr,name]));
    chart.querySelectorAll('text.planet, text.lagna').forEach(text => {
      const tokens = text.textContent.trim().split(/\s+/); text.textContent = '';
      tokens.forEach((token,index) => {
        if (index) text.appendChild(document.createTextNode('  '));
        const name = names[token];
        const span = svg('tspan', name ? {'data-aspect-planet':name, tabindex:0, role:'button', 'aria-label':`${name}, house ${positions[name]}, show aspects`, 'aria-pressed':'false'} : {});
        span.textContent = token; text.appendChild(span);
      });
    });
    render();
  };
})();

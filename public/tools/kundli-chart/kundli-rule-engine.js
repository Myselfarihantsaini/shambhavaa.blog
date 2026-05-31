(function () {
  function matchRule(rules, category) {
    var node = rules && rules.rules && rules.rules[category];
    for (var i = 2; i < arguments.length; i++) {
      node = node && typeof node === "object" ? node[String(arguments[i])] : null;
      if (!node) return null;
    }
    return node;
  }

  function chartFacts(chart) {
    var bc = (chart && chart.birth_chart) || {};
    var facts = [];
    if (bc.lagna) facts.push("Lagna is " + bc.lagna + ".");
    if (bc.moon_sign) facts.push("Moon sign is " + bc.moon_sign + ".");
    if (bc.moon_nakshatra) facts.push("Moon Nakshatra is " + bc.moon_nakshatra + ".");
    Object.keys(bc.planets || {}).forEach(function (planet) {
      var data = bc.planets[planet] || {};
      var pieces = [];
      if (data.sign) pieces.push("in " + data.sign);
      if (data.house) pieces.push("in house " + data.house);
      if (data.nakshatra) pieces.push("in " + data.nakshatra + " Nakshatra");
      if (pieces.length) facts.push(planet + " is " + pieces.join(", ") + ".");
    });
    var dasha = bc.current_dasha || {};
    if (dasha.mahadasha) facts.push("Current Mahadasha is " + dasha.mahadasha + ".");
    if (dasha.antardasha) facts.push("Current Antardasha is " + dasha.antardasha + ".");
    return facts;
  }

  function runEngine(chart, topic, data) {
    var rules = data.rules || {};
    var topicMatrix = data.topicMatrix || data.topic_matrix || {};
    var config = data.config || data.model_config || {};
    var bc = (chart && chart.birth_chart) || {};
    var matches = [];
    var score = 0;

    Object.keys(bc.planets || {}).forEach(function (planet) {
      var p = bc.planets[planet] || {};
      [
        ["planet_in_sign", p.sign, "sign"],
        ["planet_in_house", p.house, "house"],
        ["planet_in_nakshatra", p.nakshatra, "nakshatra"]
      ].forEach(function (item) {
        var r = matchRule(rules, item[0], planet, item[1]);
        if (r) {
          var m = { type: item[0], planet: planet, rule: r };
          m[item[2]] = item[1];
          matches.push(m);
          score += r.confidence_weight || 0;
        }
      });

      ["combust", "retrograde"].forEach(function (modifier) {
        if (p[modifier] === true) {
          var mod = rules.rules && rules.rules.modifiers && rules.rules.modifiers[modifier];
          if (mod) {
            matches.push({ type: "modifier", planet: planet, modifier: modifier, rule: mod });
            score += mod.confidence_weight || 0;
          }
        }
      });
    });

    var dasha = bc.current_dasha || {};
    [["mahadasha", dasha.mahadasha], ["antardasha", dasha.antardasha]].forEach(function (item) {
      var r = item[1] && matchRule(rules, "dasha_lord", item[1], "general");
      if (r) {
        matches.push({ type: item[0], planet: item[1], rule: r });
        score += r.confidence_weight || 0;
      }
    });

    var topicGuidance = topic ? topicMatrix[topic] : null;
    var confidence = "preliminary";
    if (score >= 80) confidence = "conditional-moderate";
    if (score >= 120 && topicGuidance) confidence = "moderate-after-confirmation";

    return {
      chart_setup: chart.chart_system || {},
      topic: topic,
      facts: chartFacts(chart),
      matched_rule_count: matches.length,
      score: score,
      confidence: confidence,
      topic_guidance: topicGuidance,
      matches: matches,
      safety_rules: config.safety_rules || [],
      final_instruction: "Use matches as a deterministic research layer. Do not issue final predictions unless natal promise, dasha and transit are all checked."
    };
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function uniq(items, limit) {
    var out = [];
    (items || []).forEach(function (item) {
      if (item && out.indexOf(item) === -1) out.push(item);
    });
    return out.slice(0, limit || 8);
  }

  function ruleContext(match) {
    if (match.type === "planet_in_sign") return "sign";
    if (match.type === "planet_in_house") return "house";
    if (match.type === "planet_in_nakshatra") return "nakshatra";
    if (match.type === "mahadasha" || match.type === "antardasha") return "dasha";
    return match.modifier || match.type;
  }

  function renderList(items, fallback) {
    items = uniq(items, 7);
    if (!items.length && fallback) items = [fallback];
    return "<ul class=\"rd-list\">" + items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
  }

  function renderReadingHTML(result, topic) {
    var positives = [];
    var challenges = [];
    var confirmations = [];
    var planetBlocks = [];
    var byPlanet = {};
    var selected = result.matches.slice(0, 18);

    selected.forEach(function (match) {
      var rule = match.rule || {};
      (rule.positive_results || []).slice(0, 1).forEach(function (x) { positives.push(x); });
      (rule.challenging_results || []).slice(0, 1).forEach(function (x) { challenges.push(x); });
      (rule.required_confirmations || []).slice(0, 2).forEach(function (x) { confirmations.push(x); });
      if (!byPlanet[match.planet]) byPlanet[match.planet] = [];
      byPlanet[match.planet].push(match);
    });

    Object.keys(byPlanet).slice(0, 9).forEach(function (planet) {
      var lines = byPlanet[planet].slice(0, 3).map(function (match) {
        var rule = match.rule || {};
        return "<div class=\"rd-planet\"><span class=\"rd-kind\">" + esc(ruleContext(match)) + "</span>" +
          esc(rule.fact || rule.core_meaning || "") +
          (rule.core_meaning ? "<div class=\"rd-sub\">" + esc(rule.core_meaning) + "</div>" : "") +
          "</div>";
      }).join("");
      planetBlocks.push("<div class=\"rd-pname\">" + esc(planet) + "</div>" + lines);
    });

    var guidance = result.topic_guidance || {};
    var checks = []
      .concat(guidance.do_not_predict_without || [])
      .concat(confirmations)
      .concat(result.safety_rules || []);

    var tag = topic && topic !== "general" ? topic : "general";
    var html = "";
    html += "<div class=\"rd-head\">Deterministic Chart Reading <span class=\"rd-tag\">" + esc(tag) + "</span></div>";
    html += "<p class=\"rd-note\">This is a rule-based Shambhavaa research layer: facts, tendencies and checks. It is not a final prediction without dasha, transit and divisional confirmation.</p>";
    html += "<div class=\"rd-meta\"><span>Matched rules: <b>" + result.matched_rule_count + "</b></span><span>Score: <b>" + result.score + "</b></span><span>Confidence: <b>" + esc(result.confidence) + "</b></span></div>";
    html += "<div class=\"rd-h\">Core facts</div>" + renderList(result.facts.slice(0, 10));
    html += "<div class=\"rd-h\">Supportive indications</div>" + renderList(positives, "No strong supportive rule was found yet; use the chart facts as the starting layer.");
    html += "<div class=\"rd-h\">Pressure points</div>" + renderList(challenges, "No major pressure rule was found in the first pass.");
    html += "<div class=\"rd-h\">Planet-wise rule matches</div>" + (planetBlocks.join("") || "<p class=\"rd-note\">No planet rules matched.</p>");
    if (guidance.primary_houses || guidance.karakas || guidance.vargas) {
      html += "<div class=\"rd-h\">Topic gatekeeping</div>";
      html += "<ul class=\"rd-list\">";
      if (guidance.primary_houses) html += "<li>Primary houses to judge: " + esc(guidance.primary_houses.join(", ")) + "</li>";
      if (guidance.karakas) html += "<li>Karakas to check: " + esc(guidance.karakas.join(", ")) + "</li>";
      if (guidance.vargas) html += "<li>Divisional confirmation: " + esc(guidance.vargas.join(", ")) + "</li>";
      if (guidance.timing) html += "<li>Timing layer: " + esc(guidance.timing.join(", ")) + "</li>";
      html += "</ul>";
    }
    html += "<div class=\"rd-h\">Before final prediction</div><ul class=\"rd-list rd-safe\">" + uniq(checks, 10).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
    return html;
  }

  window.KundliRuleEngine = {
    runEngine: runEngine,
    renderReadingHTML: renderReadingHTML
  };
})();

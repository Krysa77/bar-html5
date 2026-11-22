// Kvíz: validace formuláře, vyhodnocení a zobrazení správných odpovědí
(function () {
  'use strict';

  const form = document.getElementById('quiz-form');
  const result = document.getElementById('result');
  const showBtn = document.getElementById('show-answers');
  const answers = document.querySelectorAll('.answer');
  if (!form) return;

  // Funkce, které pro každou otázku rozhodnou, zda je odpověď správně
  const checks = {
    1: function (v) { return v.trim().toLowerCase().indexOf('spring') !== -1; },
    2: function (v) { return Number(v) === 2018; },
    3: function (v) { return v === 'komando'; },
    4: function (v) { return v === 'Ne'; }
  };

  function getValue(n) {
    if (n === 1 || n === 2) {
      return form.elements['otazka' + n].value;
    }
    const checked = form.querySelector('input[name="otazka' + n + '"]:checked');
    return checked ? checked.value : '';
  }

  function clearMarks() {
    document.querySelectorAll('.question').forEach(function (q) {
      q.classList.remove('msg-success', 'msg-danger');
      q.classList.add('msg-info');
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Zkontroluje povinná pole (required) a zobrazí chybovou hlášku prohlížeče
    if (!form.reportValidity()) return;

    clearMarks();
    let score = 0;

    document.querySelectorAll('.question').forEach(function (q) {
      const n = Number(q.dataset.q);
      const ok = checks[n](getValue(n));
      if (ok) score++;
      q.classList.remove('msg-info');
      q.classList.add(ok ? 'msg-success' : 'msg-danger');
    });

    result.className = 'msg ' + (score === 4 ? 'msg-success' : 'msg-warning');
    result.textContent = 'Máš správně ' + score + ' z 4 otázek.' +
      (score === 4 ? ' Výborně!' : ' Zkus to znovu, nebo si zobraz správné odpovědi.');
    result.hidden = false;
  });

  form.addEventListener('reset', function () {
    clearMarks();
    result.hidden = true;
  });

  showBtn.addEventListener('click', function () {
    const show = answers[0].hidden;
    answers.forEach(function (a) { a.hidden = !show; });
    showBtn.textContent = show ? 'Skrýt správné odpovědi' : 'Zobrazit správné odpovědi';
  });
})();

// Web Speech API - Leitura por seção (TTS)
// - Botões: play / pause / stop
// - Volume por seção
// - Um áudio por vez (cancela o anterior)

document.addEventListener('DOMContentLoaded', () => {
  const synth = window.speechSynthesis;
  if (!synth || typeof window.SpeechSynthesisUtterance === 'undefined') {
    console.warn('Web Speech API não suportada neste navegador.');
    return;
  }

  let currentSection = null;
  let currentUtterance = null;

  function getText(sectionId) {
    const el = document.querySelector('.tts-text[data-section="' + sectionId + '"]');
    if (!el) return '';
    return (el.innerText || '').replace(/\s+/g, ' ').trim();
  }

  function setStatus(sectionId, msg) {
    const el = document.getElementById('tts-status-' + sectionId);
    if (el) el.textContent = msg;
  }

  function setButtons(sectionId, isPlaying) {
    const playBtn = document.querySelector('.btn-play[data-section="' + sectionId + '"]');
    const pauseBtn = document.querySelector('.btn-pause[data-section="' + sectionId + '"]');

    if (playBtn) {
      playBtn.classList.toggle('active', isPlaying);
      playBtn.style.display = isPlaying ? 'none' : 'inline-flex';
    }
    if (pauseBtn) pauseBtn.style.display = isPlaying ? 'inline-flex' : 'none';
  }

  function getVolume(sectionId) {
    const slider = document.querySelector('.volume-slider[data-section="' + sectionId + '"]');
    const v = slider ? Number(slider.value) : 100;
    const normalized = Math.max(0, Math.min(100, isNaN(v) ? 100 : v)) / 100;
    return normalized;
  }

  function stopAll() {
    if (synth.speaking || synth.pending) synth.cancel();
    if (currentSection) {
      setButtons(currentSection, false);
      setStatus(currentSection, 'Leitura parada.');
    }
    currentSection = null;
    currentUtterance = null;
  }

  function play(sectionId) {
    const text = getText(sectionId);
    if (!text) return;

    stopAll();
    currentSection = sectionId;

    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'pt-BR';
    u.rate = 1.0;
    u.pitch = 1.0;
    u.volume = getVolume(sectionId);

    u.onstart = () => {
      setButtons(sectionId, true);
      setStatus(sectionId, 'Reproduzindo leitura.');
    };

    u.onend = () => {
      setButtons(sectionId, false);
      setStatus(sectionId, 'Leitura finalizada.');
      currentSection = null;
      currentUtterance = null;
    };

    u.onerror = () => {
      setButtons(sectionId, false);
      setStatus(sectionId, 'Erro ao reproduzir.');
      currentSection = null;
      currentUtterance = null;
    };

    currentUtterance = u;
    synth.speak(u);
  }

  function togglePause(sectionId) {
    if (currentSection !== sectionId) return;

    if (synth.speaking && !synth.paused) {
      synth.pause();
      setStatus(sectionId, 'Pausado.');
      return;
    }
    if (synth.paused) {
      synth.resume();
      setStatus(sectionId, 'Reproduzindo leitura.');
    }
  }

  // Bind UI
  document.querySelectorAll('.btn-play').forEach(btn => {
    btn.addEventListener('click', () => play(btn.dataset.section));
  });

  document.querySelectorAll('.btn-pause').forEach(btn => {
    btn.addEventListener('click', () => togglePause(btn.dataset.section));
  });

  document.querySelectorAll('.btn-stop').forEach(btn => {
    btn.addEventListener('click', stopAll);
  });

  document.querySelectorAll('.volume-slider').forEach(slider => {
    slider.addEventListener('input', () => {
      const sectionId = slider.dataset.section;
      if (currentSection === sectionId && currentUtterance) {
        currentUtterance.volume = getVolume(sectionId);
      }
    });
  });

  window.addEventListener('beforeunload', stopAll);
});

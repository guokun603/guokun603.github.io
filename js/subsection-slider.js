document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.subsection-list').forEach(function(container) {
    const scroller = container.querySelector('.article-list--tile');

    if (!scroller) return;

    // remove any arrow buttons if present
    container.querySelectorAll('.subsection-btn').forEach(function(b){ b.remove(); });

    // create progress bar
    let progress = container.querySelector('.subsection-progress');
    if (!progress) {
      progress = document.createElement('div');
      progress.className = 'subsection-progress';
      const bar = document.createElement('div');
      bar.className = 'bar';
      progress.appendChild(bar);
      container.appendChild(progress);
    }

    const updateProgress = function() {
      const bar = progress.querySelector('.bar');
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const pct = maxScroll > 0 ? Math.min(100, Math.round((scroller.scrollLeft / maxScroll) * 100)) : 0;
      bar.style.width = pct + '%';

      // when at ends, fade edges slightly
      container.classList.toggle('at-start', scroller.scrollLeft <= 2);
      container.classList.toggle('at-end', scroller.scrollLeft >= maxScroll - 2);
    };

    // keyboard support
    container.addEventListener('keydown', function(e) {
      const step = Math.round(container.clientWidth * 0.5);
      if (e.key === 'ArrowRight') scroller.scrollBy({ left: step, behavior: 'smooth' });
      if (e.key === 'ArrowLeft') scroller.scrollBy({ left: -step, behavior: 'smooth' });
    });

    scroller.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    // initialize
    updateProgress();
  });
});
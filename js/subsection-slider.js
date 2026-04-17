document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.subsection-list').forEach(function(container) {
    const scroller = container.querySelector('.article-list--tile');
    const prev = container.querySelector('.subsection-btn.prev');
    const next = container.querySelector('.subsection-btn.next');

    if (!scroller) return;

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

    const scrollAmount = function() {
      return Math.round(container.clientWidth * 0.8);
    };

    const updateButtons = function() {
      const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);

      if (prev) {
        prev.style.display = scroller.scrollLeft > 2 ? 'flex' : 'none';
      }

      if (next) {
        next.style.display = (maxScroll - scroller.scrollLeft) > 2 ? 'flex' : 'none';
      }
    };

    const updateProgress = function() {
      const bar = progress.querySelector('.bar');
      const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      const pct = maxScroll > 0 ? Math.min(100, Math.round((scroller.scrollLeft / maxScroll) * 100)) : 0;
      bar.style.width = pct + '%';

      // when at ends, fade edges slightly
      container.classList.toggle('at-start', scroller.scrollLeft <= 2);
      container.classList.toggle('at-end', scroller.scrollLeft >= maxScroll - 2);

      updateButtons();
    };

    if (prev) {
      prev.addEventListener('click', function() {
        scroller.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      });
    }

    if (next) {
      next.addEventListener('click', function() {
        scroller.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      });
    }

    // keyboard support
    container.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') scroller.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      if (e.key === 'ArrowLeft') scroller.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    scroller.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    // initialize
    updateProgress();
  });
});
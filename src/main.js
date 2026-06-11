import './style.css';

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section').forEach((section) => {
    observer.observe(section);
  });
});

let isTicking = false;
document.addEventListener('mousemove', (e) => {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      const glow = document.getElementById('mouse-glow');
      if (glow) {
        glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      isTicking = false;
    });
    isTicking = true;
  }
});

const dashboards = document.querySelectorAll('.dashboard-interactive-glow');
dashboards.forEach(dashboard => {
  let rect = dashboard.getBoundingClientRect();

  dashboard.addEventListener('mouseenter', () => {
    rect = dashboard.getBoundingClientRect();
  });
  window.addEventListener('resize', () => {
    rect = dashboard.getBoundingClientRect();
  });
  window.addEventListener('scroll', () => {
    rect = dashboard.getBoundingClientRect();
  }, { passive: true });

  let dashTicking = false;
  dashboard.addEventListener('mousemove', (e) => {
    if (!dashTicking) {
      window.requestAnimationFrame(() => {
        dashboard.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
        dashboard.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
        dashTicking = false;
      });
      dashTicking = true;
    }
  });
});

/* --- Optimized Canvas Charts Logic --- */

class CanvasChart {
  constructor(canvasId, type, data, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.type = type;
    this.data = data;
    this.options = options;
    this.progress = 0;
    this.animationFrame = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
    this.draw();
  }

  startAnimation() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.progress = 0;
    const animate = () => {
      this.progress += 0.025; // Control animation speed
      if (this.progress > 1) this.progress = 1;
      this.draw();
      if (this.progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      }
    };
    this.animationFrame = requestAnimationFrame(animate);
  }

  draw() {
    if (!this.canvas || this.width === 0 || this.height === 0) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    ctx.clearRect(0, 0, w, h);

    if (this.type === 'line') {
      const points = this.data.points;
      if (!points || points.length < 2) return;

      const getX = (pct) => (pct / 100) * w;
      const getY = (pct) => (pct / 100) * h;

      // Draw line
      ctx.beginPath();
      const startPt = points[0];
      ctx.moveTo(getX(startPt.x), getY(startPt.y));

      const totalPoints = points.length;
      const limitIndex = (totalPoints - 1) * this.progress;

      for (let i = 0; i < totalPoints - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cp = this.data.controlPoints ? this.data.controlPoints[i] : { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };

        const segmentProgress = Math.min(1, Math.max(0, limitIndex - i));
        if (segmentProgress <= 0) break;

        // Plot quadratic curve path up to segmentProgress
        for (let t = 0; t <= segmentProgress; t += 0.05) {
          const mt = 1 - t;
          const x = mt * mt * p0.x + 2 * mt * t * cp.x + t * t * p1.x;
          const y = mt * mt * p0.y + 2 * mt * t * cp.y + t * t * p1.y;
          ctx.lineTo(getX(x), getY(y));
        }
      }

      // Style line
      ctx.lineWidth = this.options.lineWidth || 2;
      ctx.strokeStyle = this.options.strokeColor || '#0FB478';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Add subtle glow shadow path
      if (this.options.glow) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.options.strokeColor || '#0FB478';
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.stroke();

      // Reset shadow before fill to prevent performance drop
      ctx.shadowBlur = 0;

      // Fill under path
      ctx.lineTo(getX(100 * this.progress), h);
      ctx.lineTo(0, h);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, this.options.fillColorStart || 'rgba(15, 180, 120, 0.4)');
      gradient.addColorStop(1, 'rgba(15, 180, 120, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

    } else if (this.type === 'bar') {
      const bars = this.data.bars;
      const gap = this.options.gap || 8;
      const totalBars = bars.length;
      const barWidth = (w - (totalBars - 1) * gap) / totalBars;

      bars.forEach((targetHeight, idx) => {
        const currentHeight = targetHeight * h * this.progress;
        const x = idx * (barWidth + gap);
        const y = h - currentHeight;
        const radius = 2; // rounded corner radius

        ctx.fillStyle = this.options.colors[idx] || '#0FB478';
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.lineTo(x + barWidth - radius, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
        ctx.lineTo(x + barWidth, h);
        ctx.closePath();
        ctx.fill();
      });
    }
  }
}

// Lazy Load Charts on Intersection
const dashboardWrapper = document.querySelector('.dashboard-interactive-glow');
if (dashboardWrapper) {
  const chartObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initializeAndPlayCharts();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  chartObserver.observe(dashboardWrapper);
}

function initializeAndPlayCharts() {
  // 1. Revenue Chart
  const revenueChart = new CanvasChart('revenue-chart', 'line', {
    points: [
      { x: 0, y: 87.5 }, // maps to viewBox 0 0 100 40 (35/40 = 87.5%)
      { x: 40, y: 62.5 }, // maps to end of segment 1 (25/40 = 62.5%)
      { x: 80, y: 37.5 }, // maps to end of segment 2 (15/40 = 37.5%)
      { x: 100, y: 12.5 } // maps to end of segment 3 (5/40 = 12.5%)
    ],
    controlPoints: [
      { x: 20, y: 25 }, // (10/40 = 25%)
      { x: 60, y: 100 }, // (40/40 = 100%)
      { x: 100, y: -25 } // (-10/40 = -25%)
    ]
  }, {
    strokeColor: '#0FB478',
    fillColorStart: 'rgba(15, 180, 120, 0.4)',
    lineWidth: 2,
    glow: true
  });

  // 2. Profit Chart
  const profitChart = new CanvasChart('profit-chart', 'line', {
    points: [
      { x: 0, y: 75 }, // (30/40 = 75%)
      { x: 50, y: 70 }, // (28/40 = 70%)
      { x: 100, y: 30 } // (12/40 = 30%)
    ],
    controlPoints: [
      { x: 25, y: 25 }, // (10/40 = 25%)
      { x: 75, y: 115 } // (46/40 = 115%)
    ]
  }, {
    strokeColor: '#0FB478',
    fillColorStart: 'rgba(15, 180, 120, 0.4)',
    lineWidth: 2,
    glow: true
  });

  // 3. Cash Flow Chart
  const cashflowChart = new CanvasChart('cashflow-chart', 'line', {
    points: [
      { x: 0, y: 80 },
      { x: 50, y: 50 },
      { x: 100, y: 30 }
    ],
    controlPoints: [
      { x: 25, y: 20 },
      { x: 75, y: 80 }
    ]
  }, {
    strokeColor: '#0FB478',
    fillColorStart: 'rgba(15, 180, 120, 0.3)',
    lineWidth: 3,
    glow: true
  });

  // 4. Expenses Bar Chart
  const expensesChart = new CanvasChart('expenses-chart', 'bar', {
    bars: [0.4, 0.6, 0.85, 0.5, 0.7, 0.3, 0.9]
  }, {
    gap: 6,
    colors: [
      'rgba(15, 180, 120, 0.4)',
      'rgba(15, 180, 120, 0.5)',
      'rgba(15, 180, 120, 0.4)',
      'rgba(15, 180, 120, 0.6)',
      'rgba(15, 180, 120, 0.5)',
      'rgba(15, 180, 120, 0.4)',
      '#0FB478'
    ]
  });

  // Run animations
  revenueChart.startAnimation();
  profitChart.startAnimation();
  cashflowChart.startAnimation();
  expensesChart.startAnimation();
}

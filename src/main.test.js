import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Frontend Logic', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="mouse-glow"></div>
      <div class="fade-in-section"></div>
    `;
    
    const IntersectionObserverMock = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
    
    // Mock requestAnimationFrame for jsdom
    vi.stubGlobal('requestAnimationFrame', (cb) => setTimeout(cb, 0));
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should update mouse-glow position on mousemove', async () => {
    await import('./main.js');

    const glow = document.getElementById('mouse-glow');
    
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: 150,
      clientY: 250,
    });
    document.dispatchEvent(mouseEvent);

    // Wait for the simulated requestAnimationFrame
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(glow.style.left).toBe('150px');
    expect(glow.style.top).toBe('250px');
  });
});

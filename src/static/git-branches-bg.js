// 动画 Git 分支线背景
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('git-branches-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // 分支线参数
  const branchCount = 5;
  const colors = ['#32cd32', '#d0ff14', '#bfff00', '#aaff00', '#ccff66'];
  const speed = 0.2;
  const lines = Array.from({ length: branchCount }, (_, i) => ({
    x: 100 + i * (window.innerWidth - 200) / (branchCount - 1),
    y: Math.random() * window.innerHeight,
    phase: Math.random() * Math.PI * 2,
    color: colors[i % colors.length],
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach((line, idx) => {
      ctx.save();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2 + Math.sin(line.phase) * 1.5;
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.moveTo(line.x, 0);
      for (let y = 0; y < canvas.height; y += 10) {
        const offset = Math.sin(line.phase + y * 0.01 + idx) * 30;
        ctx.lineTo(line.x + offset, y);
      }
      ctx.stroke();
      ctx.restore();
      // 动画推进
      line.phase += speed * 0.01 * (idx + 1);
    });
    requestAnimationFrame(draw);
  }
  draw();
});

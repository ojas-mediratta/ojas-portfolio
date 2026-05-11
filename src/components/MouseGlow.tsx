import React, { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "@/data/theme";

export default function MouseGlow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const lastGridRefreshRef = useRef(0);
  const gridRef = useRef<string[]>([]);
  const gridSizeRef = useRef({ cols: 0, rows: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const glowColor = theme === 'dark' ? DARK_THEME.mouseGlow : LIGHT_THEME.mouseGlow;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ALNUM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const SPECIAL_CHARS = "#$%&*+?@/\\~^";
    const CELL_SIZE = 20;
    const FONT_SIZE = 18;
    const RADIUS = 650;
    const TARGET_FPS = 20;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    const GRID_REFRESH_MS = 30;
    const GRID_REFRESH_RATIO = 0.1;

    const parseRgba = (color: string) => {
      const rgbaMatch = color.match(/rgba?\(([^)]+)\)/i);
      if (rgbaMatch) {
        const parts = rgbaMatch[1].split(",").map((part) => part.trim());
        const [r, g, b] = parts.slice(0, 3).map((value) => Number.parseFloat(value));
        const a = parts.length > 3 ? Number.parseFloat(parts[3]) : 1;
        return { r, g, b, a: Number.isNaN(a) ? 1 : a };
      }

      if (color.startsWith("#")) {
        const hex = color.replace("#", "");
        const normalized = hex.length === 3
          ? hex.split("").map((ch) => ch + ch).join("")
          : hex;
        const r = Number.parseInt(normalized.slice(0, 2), 16);
        const g = Number.parseInt(normalized.slice(2, 4), 16);
        const b = Number.parseInt(normalized.slice(4, 6), 16);
        return { r, g, b, a: 1 };
      }

      return { r: 255, g: 255, b: 255, a: 1 };
    };

    const baseColor = parseRgba(glowColor);

    const randomChar = () => {
      const useSpecial = Math.random() < 0.6;
      const source = useSpecial ? SPECIAL_CHARS : ALNUM_CHARS;
      return source[Math.floor(Math.random() * source.length)];
    };

    const buildGrid = () => {
      const cols = Math.ceil(window.innerWidth / CELL_SIZE) + 1;
      const rows = Math.ceil(window.innerHeight / CELL_SIZE) + 1;
      gridSizeRef.current = { cols, rows };
      gridRef.current = Array.from({ length: cols * rows }, () => randomChar());
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE}px Menlo, monospace`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      buildGrid();
    };

    const draw = (timestamp: number) => {
      if (timestamp - lastFrameRef.current < FRAME_INTERVAL) {
        rafRef.current = window.requestAnimationFrame(draw);
        return;
      }
      lastFrameRef.current = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (timestamp - lastGridRefreshRef.current >= GRID_REFRESH_MS) {
        lastGridRefreshRef.current = timestamp;
        const grid = gridRef.current;
        const refreshCount = Math.max(1, Math.floor(grid.length * GRID_REFRESH_RATIO));
        for (let i = 0; i < refreshCount; i += 1) {
          const index = Math.floor(Math.random() * grid.length);
          grid[index] = randomChar();
        }
      }

      const { x, y } = posRef.current;
      const startX = Math.max(0, x - RADIUS);
      const endX = Math.min(window.innerWidth, x + RADIUS);
      const startY = Math.max(0, y - RADIUS);
      const endY = Math.min(window.innerHeight, y + RADIUS);
      const { cols, rows } = gridSizeRef.current;
      const startCol = Math.max(0, Math.floor(startX / CELL_SIZE));
      const endCol = Math.min(cols - 1, Math.ceil(endX / CELL_SIZE));
      const startRow = Math.max(0, Math.floor(startY / CELL_SIZE));
      const endRow = Math.min(rows - 1, Math.ceil(endY / CELL_SIZE));

      for (let row = startRow; row <= endRow; row += 1) {
        const py = row * CELL_SIZE;
        for (let col = startCol; col <= endCol; col += 1) {
          const px = col * CELL_SIZE;
          const dx = px - x;
          const dy = py - y;
          const dist = Math.hypot(dx, dy);
          if (dist > RADIUS) continue;

          const falloff = Math.pow(1 - dist / RADIUS, 1.6);
          const alpha = baseColor.a * falloff * 0.7;
          if (alpha <= 0.02) continue;

          const index = row * cols + col;
          const char = gridRef.current[index] ?? "";
          ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${alpha})`;
          ctx.fillText(char, px, py);
        }
      }

      rafRef.current = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [glowColor]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
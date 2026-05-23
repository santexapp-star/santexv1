
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Santéx</title>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  html, body { height: 100%; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
  body {
    min-height: 100vh;
    background: #0e0f13;
    color: #f5f7fa;
    overflow-x: hidden;
  }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; }

  /* ============ THEME TOKENS ============ */
  /* ===== Statistical / analytical data palette ===== */
  :root {
    --data-green:  #22e07a;   /* primary accent — analytical lime/green */
    --data-green-2:#19c065;   /* darker green for contrast */
    --data-cyan:   #19c0ff;
    --data-blue:   #4d8eff;
    --data-yellow: #ffd44d;
    --data-red:    #ff5163;
    --data-orange: #ff9a3c;
    --data-purple: #b46bff;
    --data-magenta:#ff5a9b;
    --grid: rgba(255,255,255,0.04);
    --grid-strong: rgba(255,255,255,0.07);
  }
  .theme-light {
    --bg: #f6f7f9;
    --bg-elevated: #ffffff;
    --bg-sunken: #eceef2;
    --surface: #ffffff;
    --surface-2: #f0f2f5;
    --border: #e1e3e8;
    --text: #0a0c10;
    --text-muted: #5a6270;
    --text-soft: #8a90a0;
    --shadow: 0 1px 0 rgba(16, 24, 40, 0.05);
    --nav-bg: rgba(255,255,255,0.94);
    --chip-bg: #eef0f4;
    --success: var(--data-green);
    --warn: var(--data-yellow);
    --danger: var(--data-red);
    --skeleton: linear-gradient(90deg, #eceef2 0%, #f6f7f9 50%, #eceef2 100%);
  }
  .theme-dark {
    --bg: #050507;
    --bg-elevated: #0c0d10;
    --bg-sunken: #020203;
    --surface: #0e0f13;
    --surface-2: #14161b;
    --border: #1d1f25;
    --text: #ffffff;
    --text-muted: #9aa1ac;
    --text-soft: #5b6171;
    --shadow: none;
    --nav-bg: rgba(5,5,7,0.96);
    --chip-bg: #14161b;
    --success: var(--data-green);
    --warn: var(--data-yellow);
    --danger: var(--data-red);
    --skeleton: linear-gradient(90deg, #0e0f13 0%, #1d1f25 50%, #0e0f13 100%);
  }

  .accent-on.theme-light {
    --accent: var(--data-green);
    --accent-strong: var(--data-green-2);
    --accent-soft: rgba(34,224,122,0.08);
    --accent-contrast: #001a0c;
  }
  .accent-on.theme-dark {
    --accent: var(--data-green);
    --accent-strong: #5aff9c;
    --accent-soft: rgba(34,224,122,0.10);
    --accent-contrast: #00170a;
  }
  .accent-off.theme-light {
    --accent: #0a0c10;
    --accent-strong: #0a0c10;
    --accent-soft: rgba(10,12,16,0.06);
    --accent-contrast: #ffffff;
  }
  .accent-off.theme-dark {
    --accent: #ffffff;
    --accent-strong: #ffffff;
    --accent-soft: rgba(255,255,255,0.08);
    --accent-contrast: #000000;
  }

  .intensity-subtle { --accent-soft-mix: 0.35; }
  .intensity-strong { --accent-soft-mix: 1; }

  /* ============ WEBSITE LAYOUT ============ */
  .app-shell {
    min-height: 100vh; width: 100%;
    background: var(--bg); color: var(--text);
    display: flex; flex-direction: row;
    transition: background 260ms ease, color 260ms ease;
  }
  .sidebar {
    width: 240px; flex-shrink: 0;
    background: var(--bg-elevated);
    border-right: 1px solid var(--border);
    padding: 24px 16px;
    position: sticky; top: 0;
    height: 100vh; overflow-y: auto;
    display: flex; flex-direction: column;
    gap: 6px;
    scrollbar-width: thin;
  }
  .sidebar-logo {
    display: flex; align-items: center; gap: 10px;
    padding: 4px 10px 18px;
    font-size: 20px; font-weight: 800; letter-spacing: -0.02em;
  }
  .sidebar-logo-mark {
    width: 28px; height: 28px; border-radius: 4px;
    background: var(--accent); color: var(--accent-contrast);
    display: flex; align-items: center; justify-content: center;
    font-weight: 900; letter-spacing: -0.04em;
  }
  .sidebar-section { font-size: 9px; font-weight: 700; color: var(--text-soft); text-transform: uppercase; letter-spacing: 0.14em; padding: 16px 12px 8px; }
  .sidebar-item {
    display: flex; align-items: center; gap: 12px;
    padding: 9px 12px; border-radius: 4px;
    color: var(--text-muted); font-size: 13px; font-weight: 600;
    cursor: pointer; border: none; background: transparent; width: 100%;
    transition: all 160ms ease; text-align: left;
    letter-spacing: -0.005em;
  }
  .sidebar-item:hover { background: var(--surface-2); color: var(--text); }
  .sidebar-item.active {
    background: transparent;
    color: var(--text); font-weight: 700;
    box-shadow: inset 2px 0 0 var(--accent);
    border-radius: 0;
  }
  .sidebar-item svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 1.5; flex-shrink: 0; }
  .sidebar-bottom { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--border); }
  .sidebar-user {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 4px;
    cursor: pointer; transition: background 160ms ease;
  }
  .sidebar-user:hover { background: var(--surface-2); }
  .sidebar-user .info { flex: 1; min-width: 0; }
  .sidebar-user .name { font-size: 12px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: -0.01em; }
  .sidebar-user .email { font-size: 10px; color: var(--text-soft); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; }

  .main-area { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .topbar {
    position: sticky; top: 0; z-index: 20;
    background: var(--nav-bg);
    backdrop-filter: saturate(180%) blur(14px);
    -webkit-backdrop-filter: saturate(180%) blur(14px);
    border-bottom: 1px solid var(--border);
    padding: 14px 32px; display: flex; align-items: center; gap: 16px;
  }
  .topbar-search {
    flex: 1; max-width: 480px;
    display: flex; align-items: center; gap: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px; padding: 9px 12px;
    font-size: 12px; color: var(--text-soft);
    cursor: text;
  }
  .topbar-search input {
    flex: 1; border: none; outline: none; background: transparent;
    font-size: 12px; color: var(--text); font-family: inherit;
  }
  .topbar-actions { display: flex; align-items: center; gap: 6px; margin-left: auto; }
  .icon-btn {
    min-width: 34px; height: 34px; padding: 0 10px; border-radius: 4px;
    border: 1px solid var(--border); background: var(--surface);
    display: inline-flex; align-items: center; justify-content: center;
    gap: 6px; white-space: nowrap; font-size: 12px; font-weight: 700;
    cursor: pointer; color: var(--text-muted);
    transition: all 160ms ease;
    font-variant-numeric: tabular-nums;
  }
  .icon-btn:hover { background: var(--surface-2); color: var(--text); border-color: var(--accent); }

  .content {
    flex: 1; padding: 28px 32px 64px;
    max-width: 1280px; width: 100%; margin: 0 auto;
  }
  .content-narrow { max-width: 720px; margin: 0 auto; }

  .mobile-nav { display: none; }

  @media (max-width: 900px) {
    .sidebar { display: none; }
    .topbar { padding: 12px 16px; }
    .content { padding: 20px 16px 100px; }
    .mobile-nav {
      display: flex; position: fixed; bottom: 0; left: 0; right: 0;
      z-index: 30; padding: 10px 8px 16px;
      background: var(--nav-bg);
      backdrop-filter: saturate(180%) blur(14px);
      border-top: 1px solid var(--border);
      justify-content: space-around;
    }
    .mobile-nav button {
      flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px;
      padding: 6px 0; border: none; background: transparent;
      cursor: pointer; color: var(--text-soft);
      font-size: 10px; font-weight: 600;
    }
    .mobile-nav button svg { width: 22px; height: 22px; stroke: currentColor; fill: none; stroke-width: 2; }
    .mobile-nav button.active { color: var(--accent-strong); }
  }

  /* page heading */
  .page-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
  .page-head .h1 { font-size: 28px; letter-spacing: -0.03em; }
  .page-head .sub { margin-top: 6px; font-size: 13px; color: var(--text-soft); text-transform: uppercase; letter-spacing: 0.08em; }

  /* ============ ANALYTICAL HUD UTILITIES ============ */
  .live-dot {
    display: inline-block;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent);
    animation: livePulse 1.6s ease-in-out infinite;
    margin-right: 6px; vertical-align: middle;
  }
  @keyframes livePulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.4; transform: scale(0.85); }
  }
  .hud-status {
    display: inline-flex; align-items: center;
    font-size: 9px; font-weight: 700;
    color: var(--text-soft);
    text-transform: uppercase; letter-spacing: 0.18em;
    font-variant-numeric: tabular-nums;
  }
  .delta {
    display: inline-flex; align-items: center; gap: 3px;
    font-size: 10px; font-weight: 700;
    padding: 2px 6px; border-radius: 2px;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
    background: var(--surface-2);
  }
  .delta.up   { color: var(--data-green); background: rgba(34,224,122,0.10); }
  .delta.down { color: var(--data-red);   background: rgba(255,81,99,0.10); }
  .delta.flat { color: var(--text-soft); }
  .delta::before {
    font-size: 8px; line-height: 1;
  }
  .delta.up::before   { content: "▲"; }
  .delta.down::before { content: "▼"; }
  .delta.flat::before { content: "▬"; }
  .mono {
    font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
  }
  .axis-tick {
    display: flex; justify-content: space-between;
    font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
    font-size: 9px; color: var(--text-soft);
    letter-spacing: 0.04em;
    margin-bottom: 6px; padding: 0 2px;
  }
  .data-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 8px 0; border-bottom: 1px dotted var(--border);
    font-size: 12px;
  }
  .data-row:last-child { border-bottom: none; }
  .data-row .k { color: var(--text-soft); text-transform: uppercase; letter-spacing: 0.1em; font-size: 10px; font-weight: 700; }
  .data-row .v { font-variant-numeric: tabular-nums; font-weight: 700; }

  .h1 { font-size: 22px; font-weight: 700; letter-spacing: -0.025em; }
  .h2 { font-size: 16px; font-weight: 700; letter-spacing: -0.01em; }
  .sub { font-size: 13px; color: var(--text-muted); margin-top: 4px; line-height: 1.45; }
  .label { font-size: 10px; font-weight: 700; color: var(--text-soft); text-transform: uppercase; letter-spacing: 0.12em; }
  .metric-xl { font-size: 56px; font-weight: 800; letter-spacing: -0.04em; line-height: 1; font-variant-numeric: tabular-nums; }
  .metric-lg { font-size: 36px; font-weight: 800; letter-spacing: -0.03em; line-height: 1; font-variant-numeric: tabular-nums; }
  .metric-md { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .tnum { font-variant-numeric: tabular-nums; }

  .btn {
    width: 100%; padding: 13px 18px;
    border-radius: 4px; border: none;
    font-size: 13px; font-weight: 700;
    letter-spacing: 0.04em; text-transform: uppercase;
    cursor: pointer; font-family: inherit;
    transition: background 180ms ease, opacity 200ms ease, border-color 180ms ease;
  }
  .btn:active { transform: none; opacity: 0.85; }
  .btn-primary { background: var(--accent); color: var(--accent-contrast); }
  .btn-primary:hover { background: var(--accent-strong); }
  .btn-ghost {
    background: transparent; color: var(--text-muted);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover { color: var(--text); border-color: var(--accent); }
  .btn-sm { padding: 9px 14px; font-size: 11px; border-radius: 4px; width: auto; letter-spacing: 0.06em; }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px;
    transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;
  }
  .card.selectable { cursor: pointer; }
  .card.selectable:active { transform: scale(0.99); }
  .card.selected {
    border-color: var(--accent);
    background: var(--accent-soft);
  }

  /* ============ STEPPER ============ */
  .stepper { display: flex; gap: 6px; padding: 0 20px 8px; }
  .stepper .dot {
    flex: 1; height: 4px; border-radius: 4px;
    background: var(--border);
    transition: background 200ms ease;
  }
  .stepper .dot.active { background: var(--accent); }

  /* ============ DEVICES ============ */
  .device-row {
    display: flex; align-items: center; gap: 12px;
    padding: 14px; margin-bottom: 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px; cursor: pointer;
    transition: border-color 180ms ease, background 180ms ease;
  }
  .device-row:hover { border-color: var(--accent); }
  .device-row.connected { border-color: var(--accent); background: transparent; box-shadow: inset 2px 0 0 var(--accent); }
  .device-icon {
    width: 36px; height: 36px; border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 14px;
    background: var(--surface-2); color: var(--text);
    border: 1px solid var(--border);
  }
  .device-info { flex: 1; }
  .device-info .n { font-weight: 600; font-size: 15px; }
  .device-info .m { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .pill {
    padding: 5px 10px; border-radius: 3px;
    font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.1em;
    background: var(--chip-bg); color: var(--text-muted);
    border: 1px solid var(--border);
    transition: all 180ms ease;
  }
  .pill.on { background: var(--accent); color: var(--accent-contrast); border-color: var(--accent); }
  .pill.xs { padding: 3px 7px; font-size: 9px; }

  /* ============ INPUTS ============ */
  .input-group { margin-bottom: 14px; }
  .input-group label {
    display: block; font-size: 13px; font-weight: 500;
    color: var(--text-muted); margin-bottom: 6px;
  }
  .input-group .field {
    display: flex; align-items: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 12px 14px;
    transition: border-color 160ms ease;
  }
  .input-group .field:focus-within { border-color: var(--accent); }
  .input-group input {
    flex: 1; border: none; outline: none; background: transparent;
    font-size: 14px; color: var(--text); font-family: inherit;
    font-variant-numeric: tabular-nums;
  }
  .input-group .unit { font-size: 11px; color: var(--text-soft); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }

  /* ============ GOALS ============ */
  .goal-card {
    display: flex; align-items: center; gap: 12px;
    padding: 16px; margin-bottom: 8px;
    border-radius: 6px; cursor: pointer;
    background: var(--surface);
    border: 1px solid var(--border);
    transition: border-color 180ms ease;
  }
  .goal-card:hover { border-color: var(--accent); }
  .goal-card.selected { border-color: var(--accent); background: transparent; box-shadow: inset 2px 0 0 var(--accent); }
  .goal-emoji {
    width: 36px; height: 36px; border-radius: 4px;
    background: var(--surface-2);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 800;
    border: 1px solid var(--border);
  }
  .goal-card.selected .goal-emoji { background: var(--accent); color: var(--accent-contrast); border-color: var(--accent); }
  .goal-title { font-weight: 700; font-size: 14px; letter-spacing: -0.01em; }
  .goal-desc { font-size: 11px; color: var(--text-soft); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.08em; }

  /* ============ PLANS ============ */
  .plan-card {
    padding: 16px; margin-bottom: 8px;
    border-radius: 6px; cursor: pointer;
    background: var(--surface);
    border: 1px solid var(--border);
    transition: border-color 180ms ease; position: relative;
  }
  .plan-card:hover { border-color: var(--accent); }
  .plan-card.selected { border-color: var(--accent); background: transparent; box-shadow: inset 2px 0 0 var(--accent); }
  .plan-card.highlight::after {
    content: "RECOMMENDED";
    position: absolute; top: -1px; right: 14px;
    background: var(--accent); color: var(--accent-contrast);
    font-size: 9px; font-weight: 800; letter-spacing: 0.14em;
    padding: 3px 8px; border-radius: 0 0 2px 2px;
  }
  .plan-head { display: flex; justify-content: space-between; align-items: baseline; }
  .plan-name { font-weight: 600; font-size: 15px; }
  .plan-price { font-weight: 700; font-size: 15px; }
  .plan-desc { font-size: 12px; color: var(--text-muted); margin-top: 4px; }

  /* ============ DASHBOARD ============ */
  .greeting { padding: 4px 4px 12px; display: flex; justify-content: space-between; align-items: center; }
  .greeting .hi { font-size: 13px; color: var(--text-muted); }
  .greeting .n { font-size: 22px; font-weight: 700; margin-top: 2px; }
  .avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: var(--accent); color: var(--accent-contrast);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 15px;
  }

  .summary-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 8px; margin-bottom: 14px;
  }
  .sum-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px 16px 14px;
    text-align: left;
    position: relative;
    overflow: hidden;
  }
  .sum-card::after {
    /* baseline gridline under the metric — telemetry feel */
    content: "";
    position: absolute; left: 16px; right: 16px;
    bottom: 38px;
    height: 1px;
    background: linear-gradient(to right, var(--grid-strong) 50%, transparent 50%);
    background-size: 6px 1px;
  }
  .sum-val {
    font-size: 28px; font-weight: 800; letter-spacing: -0.03em;
    line-height: 1; font-variant-numeric: tabular-nums;
    margin-top: 10px;
    font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  }
  .sum-lbl {
    font-size: 9px; color: var(--text-soft); margin-top: 14px;
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em;
  }
  .sum-card .sum-ico {
    position: absolute; top: 14px; right: 14px;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent);
    font-size: 0; padding: 0; margin: 0;
    animation: livePulse 1.8s ease-in-out infinite;
  }

  /* Activity category cards */
  .cat-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 14px; margin-bottom: 24px;
  }
  @media (max-width: 1100px) { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 540px)  { .cat-grid { grid-template-columns: 1fr; } }
  .cat-card {
    position: relative;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    overflow: hidden;
    transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
  }
  .cat-card:hover { transform: none; border-color: var(--accent); }
  .cat-card.active {
    border-color: var(--accent);
    background: transparent;
    box-shadow: inset 0 0 0 1px var(--accent);
  }
  .cat-card.active .cat-cta { color: var(--accent-strong); }
  .cat-card-blob {
    position: absolute; right: -28px; top: -28px;
    width: 80px; height: 80px; border-radius: 50%;
    opacity: 0.35;
  }
  .cat-ico {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; margin-bottom: 12px;
    position: relative; z-index: 1;
  }
  .cat-name { font-size: 16px; font-weight: 700; letter-spacing: -0.01em; }
  .cat-desc { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .cat-cta {
    font-size: 12px; font-weight: 600; color: var(--accent-strong);
    margin-top: 12px; display: inline-flex; align-items: center; gap: 4px;
  }
  .cat-back {
    display: inline-flex; align-items: center; gap: 6px;
    border: none; background: transparent;
    color: var(--text-muted); font-size: 13px; font-weight: 600;
    cursor: pointer; padding: 6px 0; font-family: inherit;
    margin-bottom: 8px;
  }
  .cat-back:hover { color: var(--accent-strong); }
  .sum-ico {
    width: 26px; height: 26px; margin: 0 auto 6px;
    border-radius: 8px; background: var(--accent-soft); color: var(--accent-strong);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700;
  }

  .section-title {
    display: flex; justify-content: space-between; align-items: baseline;
    margin: 18px 0 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
  }
  .section-title h3 {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em;
    color: var(--text-muted);
  }
  .section-title .link { font-size: 11px; color: var(--accent); font-weight: 600; cursor: pointer; text-transform: uppercase; letter-spacing: 0.08em; }

  /* ============ MACROS ============ */
  .macro-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px; margin-bottom: 14px;
  }
  .macro-row { margin-bottom: 14px; }
  .macro-row:last-child { margin-bottom: 0; }
  .macro-top {
    display: flex; justify-content: space-between;
    font-size: 12px; margin-bottom: 6px;
  }
  .macro-top .lbl { font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-size: 10px; color: var(--text-soft); }
  .macro-top .val { color: var(--text); font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums; }
  .bar {
    height: 4px; width: 100%;
    background: var(--bg-sunken);
    border-radius: 2px; overflow: hidden;
  }
  .bar .fill {
    height: 100%; border-radius: 2px;
    background: var(--accent);
    transition: width 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .bar .fill.over { background: var(--warn); }

  /* ============ COACH CARD ============ */
  .coach-card {
    display: flex; gap: 12px; align-items: flex-start;
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 2px solid var(--accent);
    border-radius: 4px;
    padding: 14px; margin-bottom: 10px;
  }
  .coach-ico {
    width: 28px; height: 28px; border-radius: 4px;
    background: transparent; color: var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; flex-shrink: 0;
    border: 1px solid var(--border);
  }
  .coach-body .t { font-size: 13px; font-weight: 700; letter-spacing: -0.01em; }
  .coach-body .d { font-size: 12px; color: var(--text-muted); margin-top: 4px; line-height: 1.45; }

  /* ============ FOOD CARDS ============ */
  .food-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px; margin-bottom: 10px;
    transition: transform 180ms ease, border-color 180ms ease;
    cursor: pointer;
  }
  .food-card:hover { border-color: var(--accent); }
  .food-card:active { transform: none; }
  .food-head { display: flex; gap: 12px; align-items: flex-start; }
  .food-img {
    width: 40px; height: 40px; border-radius: 4px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .food-body { flex: 1; min-width: 0; }
  .food-top { display: flex; justify-content: space-between; gap: 8px; }
  .food-name { font-size: 14px; font-weight: 700; letter-spacing: -0.01em; }
  .food-price { font-size: 13px; font-weight: 700; color: var(--accent); font-variant-numeric: tabular-nums; }
  .food-meta { font-size: 10px; color: var(--text-soft); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.08em; }
  .food-macros { display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap; }
  .macro-chip {
    font-size: 9px; font-weight: 700;
    padding: 3px 7px; border-radius: 2px;
    background: var(--surface-2); color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.08em;
    font-variant-numeric: tabular-nums;
  }
  .macro-chip.tag-budget { background: rgba(74, 222, 128, 0.15); color: var(--success); }
  .macro-chip.tag-moderate { background: rgba(255, 212, 77, 0.15); color: var(--warn); }
  .macro-chip.tag-premium { background: rgba(255, 81, 99, 0.15); color: var(--danger); }

  .food-scores {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 12px; padding-top: 10px;
    border-top: 1px solid var(--border);
  }
  .score-item { display: flex; flex-direction: column; align-items: center; flex: 1; }
  .score-val { font-size: 16px; font-weight: 800; color: var(--text); font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
  .score-lbl { font-size: 8px; color: var(--text-soft); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.14em; font-weight: 700; }
  .food-reason {
    font-size: 11px; color: var(--text-muted);
    margin-top: 10px; padding: 8px 10px;
    background: var(--bg-sunken); border-radius: 4px;
    border-left: 2px solid var(--accent);
    line-height: 1.45;
  }

  /* ============ FILTER CHIPS ============ */
  .filter-row {
    display: flex; gap: 4px; overflow-x: auto;
    margin-bottom: 14px; padding-bottom: 4px;
    scrollbar-width: none;
  }
  .filter-row::-webkit-scrollbar { display: none; }
  .filter-chip {
    flex-shrink: 0;
    padding: 7px 12px; border-radius: 3px;
    font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.1em;
    background: transparent; border: 1px solid var(--border);
    color: var(--text-muted); cursor: pointer;
    transition: all 180ms ease;
  }
  .filter-chip:hover { color: var(--text); border-color: var(--accent); }
  .filter-chip.active {
    background: var(--accent); color: var(--accent-contrast);
    border-color: var(--accent);
  }

  /* ============ BOTTOM NAV ============ */
  .bottom-nav {
    display: flex; justify-content: space-around;
    padding: 10px 8px 14px;
    background: var(--nav-bg);
    backdrop-filter: saturate(180%) blur(14px);
    -webkit-backdrop-filter: saturate(180%) blur(14px);
    border-top: 1px solid var(--border);
  }
  .nav-item {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; gap: 3px;
    padding: 6px 0; border: none; background: transparent;
    cursor: pointer; color: var(--text-soft);
    font-family: inherit; font-size: 10px; font-weight: 600;
    transition: color 160ms ease, transform 120ms ease;
  }
  .nav-item:active { transform: scale(0.92); }
  .nav-item svg { width: 22px; height: 22px; stroke: currentColor; fill: none; stroke-width: 2; }
  .nav-item.active { color: var(--accent-strong); }

  /* ============ SETTINGS ============ */
  .settings-group {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 14px;
  }
  .settings-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
  }
  .settings-row:last-child { border-bottom: none; }
  .settings-row .lbl { font-size: 14px; font-weight: 500; }
  .settings-row .desc { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .segmented {
    display: flex; background: var(--bg-sunken);
    border-radius: 10px; padding: 3px;
  }
  .segmented button {
    border: none; background: transparent;
    padding: 6px 12px; border-radius: 8px;
    font-size: 12px; font-weight: 600; cursor: pointer;
    color: var(--text-muted); font-family: inherit;
    transition: all 160ms ease;
  }
  .segmented button.active {
    background: var(--surface); color: var(--text);
    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
  }
  .switch {
    width: 44px; height: 26px; border-radius: 999px;
    background: var(--border); position: relative;
    cursor: pointer; transition: background 200ms ease;
    flex-shrink: 0;
  }
  .switch::after {
    content: ""; position: absolute; top: 3px; left: 3px;
    width: 20px; height: 20px; border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: transform 200ms ease;
  }
  .switch.on { background: var(--accent); }
  .switch.on::after { transform: translateX(18px); }

  /* ============ TRANSITIONS ============ */
  .fade-in { animation: fadeInSlide 320ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards; }
  @keyframes fadeInSlide {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .preview-mini {
    padding: 14px; border-radius: 14px;
    background: var(--bg-sunken); margin-top: 8px;
  }
  .preview-mini .pv-bar {
    height: 6px; border-radius: 999px; margin-top: 8px; overflow: hidden;
    background: var(--border);
  }
  .preview-mini .pv-fill { height: 100%; width: 65%; background: var(--accent); }
  .preview-btn {
    display: inline-block; margin-top: 10px;
    padding: 8px 14px; background: var(--accent);
    color: var(--accent-contrast); font-weight: 600; font-size: 12px;
    border-radius: 10px;
  }

  /* ============ NUTRITION ============ */
  .meal-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px; margin-bottom: 10px;
  }
  .meal-head {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid var(--border);
  }
  .meal-title {
    display: flex; align-items: center; gap: 10px;
    font-size: 12px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.1em;
  }
  .meal-ico {
    width: 4px; height: 16px; border-radius: 2px;
    background: var(--accent);
    font-size: 0;
  }
  .meal-cal { font-size: 12px; color: var(--text); font-weight: 700; font-variant-numeric: tabular-nums; }
  .meal-entry {
    display: flex; justify-content: space-between; align-items: center;
    padding: 8px 0;
    border-top: 1px dashed var(--border);
    font-size: 13px;
  }
  .meal-entry:first-of-type { border-top: none; }
  .meal-entry .n { flex: 1; }
  .meal-entry .c { color: var(--text-muted); font-size: 12px; }
  .meal-add {
    width: 100%; padding: 8px; margin-top: 6px;
    border: 1px dashed var(--border);
    background: transparent; color: var(--text-muted);
    border-radius: 10px; font-size: 12px; cursor: pointer;
    font-family: inherit; font-weight: 500;
    transition: border-color 180ms ease, color 180ms ease;
  }
  .meal-add:hover { border-color: var(--accent); color: var(--accent-strong); }

  .water-tracker {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px; margin-bottom: 14px;
  }
  .water-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
  .water-count { font-size: 12px; color: var(--text-muted); font-variant-numeric: tabular-nums; }
  .water-dots { display: flex; gap: 4px; }
  .water-dot {
    flex: 1; height: 28px; border-radius: 2px;
    background: var(--bg-sunken);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; cursor: pointer;
    transition: background 220ms ease;
  }
  .water-dot.filled { background: var(--accent); color: var(--accent-contrast); }
  .water-dot:hover { background: var(--surface-2); }
  .water-dot.filled:hover { background: var(--accent-strong); }

  /* ============ CHARTS ============ */
  .chart-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px; margin-bottom: 14px;
    position: relative;
    /* subtle gridlines for analytical feel */
    background-image:
      linear-gradient(to right,  var(--grid) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid) 1px, transparent 1px);
    background-size: 32px 32px;
    background-position: -1px -1px;
  }
  .chart-card::before {
    /* corner crosshair tick — analytical chart frame */
    content: "";
    position: absolute; top: 8px; left: 8px;
    width: 8px; height: 8px;
    border-top: 1px solid var(--text-soft);
    border-left: 1px solid var(--text-soft);
    opacity: 0.5;
  }
  .chart-card::after {
    content: "";
    position: absolute; top: 8px; right: 8px;
    width: 8px; height: 8px;
    border-top: 1px solid var(--text-soft);
    border-right: 1px solid var(--text-soft);
    opacity: 0.5;
  }
  .chart-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; }
  .chart-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: var(--text-muted); }
  .chart-sub { font-size: 11px; color: var(--text-soft); margin-top: 4px; font-variant-numeric: tabular-nums; }
  .bars-weekly {
    display: flex; align-items: flex-end; gap: 4px;
    height: 110px; margin-top: 8px;
  }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .bar-col .b {
    width: 100%; background: var(--accent);
    opacity: 0.35;
    border-radius: 0;
    transition: height 500ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease;
    position: relative; min-height: 2px;
  }
  .bar-col:hover .b { opacity: 0.6; }
  .bar-col.today .b { background: var(--accent); opacity: 1; }
  .bar-col .lbl { font-size: 9px; color: var(--text-soft); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }

  .hourly-bars {
    display: flex; align-items: flex-end; gap: 1px;
    height: 80px; margin-top: 10px;
  }
  .hourly-bars .hb {
    flex: 1; background: var(--accent);
    opacity: 0.30;
    border-radius: 0; min-height: 1px;
    transition: height 400ms ease, opacity 200ms ease;
  }
  .hourly-bars .hb.on { opacity: 1; }
  .hourly-labels {
    display: flex; justify-content: space-between;
    font-size: 9px; color: var(--text-soft);
    margin-top: 6px;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.08em;
  }

  /* ============ LINE CHART (profile weight) ============ */
  .line-chart { width: 100%; height: 120px; }

  /* ============ WORKOUT ============ */
  .workout-row {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; margin-bottom: 6px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
  }
  .workout-ico {
    width: 32px; height: 32px; border-radius: 4px;
    background: transparent; color: var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; border: 1px solid var(--border);
  }
  .workout-info { flex: 1; }
  .workout-info .n { font-size: 13px; font-weight: 700; letter-spacing: -0.01em; }
  .workout-info .m { font-size: 10px; color: var(--text-soft); margin-top: 3px; text-transform: uppercase; letter-spacing: 0.1em; font-variant-numeric: tabular-nums; }
  .workout-kcal { font-size: 14px; font-weight: 700; color: var(--accent); font-variant-numeric: tabular-nums; }

  /* ============ STREAK ============ */
  .streak-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 2px solid var(--accent);
    border-radius: 6px; padding: 16px;
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 14px;
  }
  .streak-flame {
    width: 40px; height: 40px; border-radius: 4px;
    background: transparent; color: var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    border: 1px solid var(--border);
  }
  .streak-n { font-size: 24px; font-weight: 800; letter-spacing: -0.02em; line-height: 1; font-variant-numeric: tabular-nums; }
  .streak-l { font-size: 10px; color: var(--text-soft); margin-top: 6px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700; }

  /* ============ MODAL / SHEET ============ */
  .sheet-backdrop {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 90;
    animation: fadeBg 200ms ease forwards;
  }
  @keyframes fadeBg { from { opacity: 0; } to { opacity: 1; } }
  .sheet {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: var(--bg-elevated);
    border-radius: 20px 20px 0 0;
    padding: 18px 20px 24px;
    z-index: 91;
    animation: slideUp 280ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
    max-height: 80%;
    overflow-y: auto;
    scrollbar-width: none;
  }
  .sheet::-webkit-scrollbar { display: none; }
  @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  .sheet-handle {
    width: 40px; height: 4px; border-radius: 2px;
    background: var(--border); margin: 0 auto 12px;
  }

  /* ============ EMPTY / SKELETON ============ */
  .empty-state {
    text-align: center; padding: 36px 20px;
    color: var(--text-muted);
  }
  .empty-state .e {
    font-size: 36px; margin-bottom: 10px;
  }
  .empty-state .t { font-size: 14px; font-weight: 600; color: var(--text); }
  .empty-state .d { font-size: 12px; margin-top: 4px; line-height: 1.45; }

  .skeleton {
    background: var(--skeleton);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 8px;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ============ PROFILE ============ */
  .profile-head {
    display: flex; align-items: center; gap: 14px;
    padding: 18px; margin-bottom: 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
  }
  .profile-avatar {
    width: 48px; height: 48px; border-radius: 4px;
    background: var(--accent); color: var(--accent-contrast);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 18px; letter-spacing: -0.02em;
  }
  .profile-name { font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
  .profile-sub { font-size: 11px; color: var(--text-soft); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.1em; font-variant-numeric: tabular-nums; }
  .stat-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 8px; margin-bottom: 14px;
  }
  .stat-mini {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 6px; padding: 14px; text-align: left;
    position: relative;
  }
  .stat-mini::before {
    /* small corner tick — analytical decoration */
    content: ""; position: absolute; top: 8px; right: 8px;
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--text-soft); opacity: 0.4;
  }
  .stat-mini .v {
    font-size: 22px; font-weight: 800; letter-spacing: -0.02em; line-height: 1;
    font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
    font-variant-numeric: tabular-nums;
  }
  .stat-mini .l { font-size: 9px; color: var(--text-soft); margin-top: 8px; text-transform: uppercase; letter-spacing: 0.14em; font-weight: 700; }

  /* tooltip */
  .first-tip {
    position: fixed; bottom: 90px; right: 32px;
    background: var(--text); color: var(--bg);
    padding: 12px 16px; border-radius: 12px;
    font-size: 13px; font-weight: 500;
    z-index: 80; max-width: 320px;
    display: flex; justify-content: space-between; gap: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    animation: slideUp 320ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
  }
  .first-tip button {
    background: transparent; border: none; color: var(--accent);
    font-weight: 700; cursor: pointer; font-family: inherit; font-size: 13px;
  }

  /* ============ AUTH SCREENS ============ */
  .auth-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 32px 16px;
    background: radial-gradient(circle at 30% 20%, #1a3d1a 0%, #0e0f13 60%);
  }
  .accent-off .auth-page { background: radial-gradient(circle at 30% 20%, #2a2a30 0%, #0e0f13 60%); }
  .auth-card {
    width: 100%; max-width: 440px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 24px; padding: 36px 32px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }
  .auth-logo {
    display: flex; align-items: center; gap: 12px; justify-content: center;
    margin-bottom: 24px;
  }
  .auth-logo-mark {
    width: 44px; height: 44px; border-radius: 14px;
    background: var(--accent); color: var(--accent-contrast);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; font-weight: 800;
  }
  .auth-logo-text { font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
  .auth-tabs {
    display: flex; gap: 4px; padding: 4px;
    background: var(--surface-2);
    border-radius: 10px; margin-bottom: 22px;
  }
  .auth-tabs button {
    flex: 1; border: none; background: transparent;
    padding: 10px; border-radius: 8px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    color: var(--text-muted); transition: all 160ms ease;
  }
  .auth-tabs button.active { background: var(--surface); color: var(--text); }
  .auth-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 18px 0; color: var(--text-soft); font-size: 11px; font-weight: 600;
  }
  .auth-divider::before, .auth-divider::after { content: ""; flex: 1; height: 1px; background: var(--border); }
  .social-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .social-btn {
    padding: 10px; border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface);
    font-size: 13px; font-weight: 600; cursor: pointer;
    color: var(--text); display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 160ms ease;
  }
  .social-btn:hover { background: var(--surface-2); }
  .auth-foot { font-size: 12px; color: var(--text-muted); text-align: center; margin-top: 18px; line-height: 1.5; }
  .auth-foot a { color: var(--accent-strong); font-weight: 600; cursor: pointer; }

  /* ============ FOOD DETAIL MODAL ============ */
  .modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    z-index: 100;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: fadeBg 200ms ease forwards;
  }
  .modal {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 20px;
    width: 100%; max-width: 720px;
    max-height: 90vh; overflow-y: auto;
    box-shadow: 0 30px 80px rgba(0,0,0,0.5);
    animation: modalIn 280ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
  }
  @keyframes modalIn {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .modal-header {
    position: sticky; top: 0; z-index: 2;
    padding: 20px 24px;
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 14px;
  }
  .modal-close {
    width: 32px; height: 32px; border-radius: 10px;
    border: 1px solid var(--border); background: var(--surface);
    cursor: pointer; color: var(--text-muted);
    display: flex; align-items: center; justify-content: center;
    margin-left: auto; font-size: 18px; font-weight: 600;
  }
  .modal-body { padding: 24px; }
  .modal-hero {
    display: flex; gap: 18px; align-items: flex-start;
    padding-bottom: 20px; border-bottom: 1px solid var(--border); margin-bottom: 20px;
  }
  .modal-hero-emoji {
    width: 80px; height: 80px; border-radius: 18px;
    background: var(--accent-soft);
    display: flex; align-items: center; justify-content: center;
    font-size: 40px; flex-shrink: 0;
  }
  .modal-hero h2 { font-size: 22px; font-weight: 700; letter-spacing: -0.01em; }
  .modal-hero .meta { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
  .modal-hero .price { font-size: 22px; font-weight: 800; color: var(--accent-strong); margin-top: 8px; }

  .macro-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  .macro-tile {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px; text-align: center;
  }
  .macro-tile .v { font-size: 18px; font-weight: 700; }
  .macro-tile .l { font-size: 10px; color: var(--text-muted); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600; }

  .ingredient-row {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px; margin-bottom: 8px;
  }
  .ingredient-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: var(--accent-soft); color: var(--accent-strong);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .ingredient-info { flex: 1; min-width: 0; }
  .ingredient-name { font-size: 14px; font-weight: 600; }
  .ingredient-qty { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
  .ingredient-kcal { font-size: 13px; font-weight: 600; color: var(--text-muted); }

  .ai-card {
    background: linear-gradient(135deg, var(--accent-soft), var(--surface));
    border: 1px solid var(--accent);
    border-radius: 16px;
    padding: 18px; margin-bottom: 18px;
  }
  .ai-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .ai-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px; border-radius: 999px;
    background: var(--accent); color: var(--accent-contrast);
    font-size: 10px; font-weight: 800; letter-spacing: 0.06em;
  }
  .ai-title { font-size: 14px; font-weight: 700; }
  .ai-text { font-size: 13px; color: var(--text); line-height: 1.5; }
  .ai-loading {
    display: flex; align-items: center; gap: 10px;
    color: var(--text-muted); font-size: 13px;
  }
  .ai-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
    animation: aiPulse 1.2s infinite;
  }
  .ai-dot:nth-child(2) { animation-delay: 0.2s; }
  .ai-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes aiPulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }

  .store-card {
    display: flex; gap: 12px; align-items: center;
    padding: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px; margin-bottom: 8px;
  }
  .store-logo {
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--chip-bg); color: var(--text);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 800; flex-shrink: 0;
  }
  .store-info { flex: 1; min-width: 0; }
  .store-name { font-size: 13px; font-weight: 600; }
  .store-meta { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
  .store-price { font-size: 14px; font-weight: 700; color: var(--accent-strong); }

  .alt-row {
    display: flex; gap: 12px; padding: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px; margin-bottom: 8px;
  }
  .alt-arrow { font-size: 20px; color: var(--accent-strong); flex-shrink: 0; }
  .alt-info { flex: 1; }
  .alt-swap { font-size: 13px; font-weight: 600; }
  .alt-swap span.from { color: var(--text-muted); text-decoration: line-through; }
  .alt-swap span.to { color: var(--accent-strong); }
  .alt-reason { font-size: 11px; color: var(--text-muted); margin-top: 4px; line-height: 1.4; }
  .alt-delta {
    display: inline-block; margin-top: 6px;
    font-size: 10px; font-weight: 700; padding: 3px 8px;
    border-radius: 999px;
    background: rgba(74, 222, 128, 0.18); color: var(--success);
  }

  .micro-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
  }
  .micro-tile {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px; padding: 10px 12px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .micro-tile .l { font-size: 12px; color: var(--text-muted); }
  .micro-tile .v { font-size: 13px; font-weight: 700; }

  .tab-bar {
    display: flex; gap: 4px; padding: 4px;
    background: var(--surface-2);
    border-radius: 10px; margin-bottom: 18px;
  }
  .tab-bar button {
    flex: 1; border: none; background: transparent;
    padding: 8px; border-radius: 8px;
    font-size: 12px; font-weight: 600; cursor: pointer;
    color: var(--text-muted);
  }
  .tab-bar button.active { background: var(--surface); color: var(--text); }

  /* ============ DASHBOARD WEB EXPANSIONS ============ */
  .grid-2 { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  @media (max-width: 1100px) { .grid-2 { grid-template-columns: 1fr; } .grid-4 { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 600px) { .grid-3 { grid-template-columns: 1fr; } .grid-4 { grid-template-columns: 1fr 1fr; } }

  .ring-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 24px;
    display: flex; align-items: center; gap: 28px;
  }
  .ring-svg { width: 200px; height: 200px; flex-shrink: 0; }
  .ring-info { flex: 1; min-width: 0; }
  .ring-info .label { margin-bottom: 8px; }
  .ring-num { font-size: 44px; font-weight: 800; letter-spacing: -0.03em; line-height: 1; font-variant-numeric: tabular-nums; }
  .ring-num span { font-size: 14px; color: var(--text-soft); font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; }

  .quick-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 18px; }
  .qa-btn {
    padding: 12px 10px; border-radius: 4px;
    border: 1px solid var(--border); background: var(--surface);
    cursor: pointer; transition: all 160ms ease;
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    color: var(--text); font-family: inherit;
  }
  .qa-btn:hover { background: var(--surface-2); border-color: var(--accent); color: var(--accent); }
  .qa-icon { font-size: 18px; }
  .qa-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
  @media (max-width: 600px) { .quick-actions { grid-template-columns: 1fr 1fr; } }

  /* food-card on web */
  .food-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 700px) { .food-grid { grid-template-columns: 1fr; } }

  /* achievements */
  .ach-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
  @media (max-width: 700px) { .ach-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 500px) { .ach-grid { grid-template-columns: 1fr 1fr; } }
  .ach-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 18px 14px; text-align: center;
    transition: all 200ms ease;
  }
  .ach-card.locked { opacity: 0.35; }
  .ach-card.earned { border-color: var(--accent); background: transparent; box-shadow: inset 0 0 0 1px var(--accent); }
  .ach-emoji { font-size: 28px; margin-bottom: 10px; }
  .ach-title { font-size: 11px; font-weight: 700; letter-spacing: -0.005em; }
  .ach-desc { font-size: 9px; color: var(--text-soft); margin-top: 6px; line-height: 1.35; text-transform: uppercase; letter-spacing: 0.08em; }

  /* heatmap */
  .heatmap { display: grid; grid-template-columns: repeat(26, 1fr); gap: 3px; }
  .heat-cell {
    aspect-ratio: 1;
    border-radius: 3px; background: var(--surface-2);
  }
  .heat-cell.l1 { background: rgba(155,227,155,0.2); }
  .heat-cell.l2 { background: rgba(155,227,155,0.4); }
  .heat-cell.l3 { background: rgba(155,227,155,0.7); }
  .heat-cell.l4 { background: var(--accent); }

  /* HR zones */
  .hr-zone { display: flex; align-items: center; gap: 10px; padding: 10px 0; }
  .hr-zone-label { font-size: 12px; font-weight: 600; width: 90px; }
  .hr-zone-bar { flex: 1; height: 8px; background: var(--bg-sunken); border-radius: 999px; overflow: hidden; }
  .hr-zone-fill { height: 100%; border-radius: 999px; }
  .hr-zone-min { font-size: 11px; color: var(--text-muted); width: 50px; text-align: right; }
  .zone-1 { background: #6ee7b7; }
  .zone-2 { background: #4ade80; }
  .zone-3 { background: #fbbf24; }
  .zone-4 { background: #fb923c; }
  .zone-5 { background: #f87171; }

  /* recipe card */
  .recipe-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 14px; cursor: pointer;
    transition: all 180ms ease;
  }
  .recipe-card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .recipe-img {
    height: 120px; border-radius: 12px;
    background: var(--accent-soft);
    display: flex; align-items: center; justify-content: center;
    font-size: 56px; margin-bottom: 12px;
  }
  .recipe-title { font-size: 14px; font-weight: 700; }
  .recipe-meta { font-size: 11px; color: var(--text-muted); margin-top: 4px; }
  .recipe-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }

  /* ============ AI CHAT FAB + WINDOW ============ */
  .chat-fab {
    position: fixed; right: 24px; bottom: 24px;
    width: 60px; height: 60px; border-radius: 50%;
    background: #7ad17a; /* bright sage green */
    color: #ffffff;
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 28px rgba(122, 209, 122, 0.45), 0 2px 6px rgba(0,0,0,0.18);
    z-index: 95;
    transition: transform 220ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 220ms ease;
  }
  .chat-fab:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 12px 32px rgba(122,209,122,0.55); }
  .chat-fab:active { transform: scale(0.94); }
  .chat-fab svg { width: 28px; height: 28px; stroke: #ffffff; fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
  .chat-fab .pulse {
    position: absolute; inset: 0; border-radius: 50%;
    background: #7ad17a;
    opacity: 0; pointer-events: none;
    animation: chatPulse 2.6s ease-out infinite;
  }
  @keyframes chatPulse {
    0% { transform: scale(1); opacity: 0.45; }
    80% { transform: scale(1.6); opacity: 0; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @media (max-width: 900px) {
    .chat-fab { bottom: 88px; right: 18px; width: 54px; height: 54px; }
  }

  /* The cloud → rectangle morph */
  .chat-cloud {
    position: fixed; right: 24px; bottom: 96px;
    width: 380px; height: 540px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    color: var(--text);
    box-shadow: 0 24px 60px rgba(0,0,0,0.35), 0 4px 14px rgba(0,0,0,0.18);
    z-index: 96;
    transform-origin: bottom right;
    overflow: hidden;
    display: flex; flex-direction: column;
    animation: cloudForm 720ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    will-change: transform, border-radius, filter, opacity;
  }
  @keyframes cloudForm {
    0% {
      transform: translate(40%, 40%) scale(0.05);
      opacity: 0;
      border-radius: 50%;
      filter: blur(10px);
    }
    25% {
      opacity: 0.85;
      transform: translate(20%, 20%) scale(0.35);
      border-radius: 65% 35% 55% 45% / 50% 65% 35% 50%;
      filter: blur(5px);
    }
    50% {
      opacity: 1;
      transform: translate(8%, 6%) scale(0.7);
      border-radius: 50% 50% 40% 60% / 40% 55% 60% 50%;
      filter: blur(2.5px);
    }
    78% {
      transform: translate(0, 0) scale(1.04);
      border-radius: 28px;
      filter: blur(0);
    }
    100% {
      transform: translate(0, 0) scale(1);
      border-radius: 22px;
      filter: blur(0);
      opacity: 1;
    }
  }
  /* Three little puff shapes that briefly drift to sell the cloud feel */
  .chat-puff {
    position: fixed; pointer-events: none;
    background: #cbeacb;
    border-radius: 50%;
    z-index: 95;
    opacity: 0;
    animation: puffFloat 720ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    filter: blur(6px);
  }
  .chat-puff.p1 { right: 60px;  bottom: 110px; width: 40px; height: 40px; animation-delay: 40ms; }
  .chat-puff.p2 { right: 110px; bottom: 150px; width: 60px; height: 60px; animation-delay: 100ms; }
  .chat-puff.p3 { right: 200px; bottom: 130px; width: 32px; height: 32px; animation-delay: 160ms; }
  @keyframes puffFloat {
    0%   { opacity: 0; transform: translate(0, 10px) scale(0.5); }
    35%  { opacity: 0.55; transform: translate(-6px, -8px) scale(1); }
    100% { opacity: 0; transform: translate(-20px, -28px) scale(1.3); }
  }

  .chat-closing { animation: cloudDisperse 360ms ease-in forwards; }
  @keyframes cloudDisperse {
    0%   { opacity: 1; filter: blur(0); transform: scale(1); border-radius: 22px; }
    50%  { opacity: 0.6; filter: blur(4px); border-radius: 50% 50% 40% 60%; transform: scale(0.6) translate(20%, 30%); }
    100% { opacity: 0; filter: blur(10px); transform: scale(0.1) translate(40%, 40%); border-radius: 50%; }
  }

  .chat-header {
    display: flex; align-items: center; gap: 10px;
    padding: 14px 16px;
    background: linear-gradient(135deg, #7ad17a, #4fb04f);
    color: #ffffff;
    flex-shrink: 0;
  }
  .chat-header .avatar-bot {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .chat-header .title { font-size: 14px; font-weight: 700; }
  .chat-header .sub { font-size: 11px; opacity: 0.9; display: flex; align-items: center; gap: 6px; }
  .chat-header .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #d1fadf; box-shadow: 0 0 0 2px rgba(209,250,223,0.3);
  }
  .chat-header .close-btn {
    margin-left: auto; background: rgba(255,255,255,0.18); border: none;
    width: 28px; height: 28px; border-radius: 8px; color: #fff;
    cursor: pointer; font-size: 16px; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    transition: background 160ms ease;
  }
  .chat-header .close-btn:hover { background: rgba(255,255,255,0.32); }

  .chat-body {
    flex: 1; overflow-y: auto;
    padding: 16px;
    background: var(--bg-sunken);
    display: flex; flex-direction: column; gap: 10px;
    scrollbar-width: thin;
  }
  .chat-bubble {
    max-width: 82%; padding: 10px 14px;
    border-radius: 16px; font-size: 13px; line-height: 1.5;
    word-wrap: break-word; white-space: pre-wrap;
  }
  .chat-bubble.bot {
    background: var(--surface); color: var(--text);
    border: 1px solid var(--border);
    border-bottom-left-radius: 6px;
    align-self: flex-start;
  }
  .chat-bubble.user {
    background: #7ad17a; color: #0a2d0a;
    border-bottom-right-radius: 6px;
    align-self: flex-end;
  }
  .chat-typing { display: flex; gap: 4px; padding: 4px 0; }
  .chat-typing span {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--text-soft);
    animation: typingDot 1.2s infinite ease-in-out;
  }
  .chat-typing span:nth-child(2) { animation-delay: 0.18s; }
  .chat-typing span:nth-child(3) { animation-delay: 0.36s; }
  @keyframes typingDot {
    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
    30%           { opacity: 1;   transform: translateY(-3px); }
  }

  .chat-suggest {
    display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;
  }
  .chat-suggest button {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 999px; padding: 6px 12px;
    font-size: 11px; font-weight: 600; color: var(--text-muted);
    cursor: pointer; font-family: inherit;
    transition: all 160ms ease;
  }
  .chat-suggest button:hover { border-color: #7ad17a; color: #4fb04f; background: rgba(122,209,122,0.08); }

  .chat-input-row {
    display: flex; gap: 8px; padding: 12px;
    background: var(--bg-elevated);
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }
  .chat-input-row input {
    flex: 1; border: 1px solid var(--border);
    background: var(--surface); color: var(--text);
    border-radius: 999px; padding: 10px 16px;
    font-size: 13px; font-family: inherit; outline: none;
    transition: border-color 160ms ease;
  }
  .chat-input-row input:focus { border-color: #7ad17a; }
  .chat-input-row button {
    width: 40px; height: 40px; border-radius: 50%;
    background: #7ad17a; border: none; color: white;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 160ms ease;
  }
  .chat-input-row button:hover:not(:disabled) { background: #4fb04f; }
  .chat-input-row button:disabled { background: var(--border); cursor: not-allowed; opacity: 0.6; }
  .chat-input-row button svg { width: 16px; height: 16px; stroke: white; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }

  @media (max-width: 480px) {
    .chat-cloud { width: calc(100vw - 24px); right: 12px; height: 70vh; bottom: 88px; }
  }
</style>
</head>
<body>
<div id="root"></div>

<script type="text/babel">
const { useState, useMemo, createContext, useContext, useEffect, useCallback } = React;

/* ============================================================
   STORAGE LAYER
============================================================ */
const STORAGE_KEY = "santex:v5";
const ACCOUNTS_KEY = "santex:accounts";
const CONTACT_EMAIL = "Santexapp@gmail.com";
const APP_VERSION = "2.1";

const defaultState = {
  onboarded: false,
  auth: { loggedIn: false, email: "", isGuest: false },
  theme: { mode: "dark", accentOn: true, intensity: "strong" },
  units: "imperial",
  user: { name: "", weight: 0, height: 0, age: 0, sex: "male" },
  goal: "maintain",            // lose | gain | maintain
  customGoal: "",
  devices: {},                 // { garmin: true, ... }
  subscription: { plan: "trial", active: true, daysLeft: 5 },
  today: {
    date: new Date().toISOString().slice(0,10),
    steps: 0,
    activeMinutes: 0,
    workouts: [],
    water: 0,
    meals: { breakfast: [], lunch: [], dinner: [], snack: [] },
    liftWorkouts: [
      { id: 1, name: "Push Day", lifts: [] },
      { id: 2, name: "Pull Day", lifts: [] },
      { id: 3, name: "Leg Day", lifts: [] },
    ],
  },
  streak: 0,
  firstTipSeen: false,
  weeklyWeights: [],
  weeklyNutrition: [0, 0, 0, 0, 0, 0, 0],
  weeklySteps:     [0, 0, 0, 0, 0, 0, 0],
  weeklySleep:     [0, 0, 0, 0, 0, 0, 0],
  hrZones: { z1: 0, z2: 0, z3: 0, z4: 0, z5: 0 },
  measurements: { waist: 0, chest: 0, arm: 0, thigh: 0, bodyFat: 0 },
  personalRecords: [],
  achievements: [
    { id: 1, emoji: "🔥", title: "On Fire", desc: "3-day streak", earned: false },
    { id: 2, emoji: "🏆", title: "First Week", desc: "7-day streak", earned: false },
    { id: 3, emoji: "💪", title: "Protein Pro", desc: "Hit protein target 5x", earned: false },
    { id: 4, emoji: "💧", title: "Hydrated", desc: "8 glasses for 7 days", earned: false },
    { id: 5, emoji: "🥗", title: "Logger", desc: "Log 25 meals", earned: false },
    { id: 6, emoji: "🏃", title: "10K Steps", desc: "Hit 10,000 steps", earned: false },
    { id: 7, emoji: "🌟", title: "Consistent", desc: "30 days active", earned: false },
    { id: 8, emoji: "⭐", title: "Champion", desc: "Reach goal weight", earned: false },
  ],
  favorites: [], // array of food IDs
  notifications: { meals: true, water: true, workouts: true, weeklyReport: true },
  reminderTimes: { breakfast: "08:00", lunch: "12:30", dinner: "19:00" },
  // Activity heatmap: 26 weeks × 7 days = 182 cells (last ~6 months)
  heatmap: Array(182).fill(0),
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    const merged = { ...defaultState, ...parsed,
      auth: { ...defaultState.auth, ...(parsed.auth || {}) },
      theme: { ...defaultState.theme, ...(parsed.theme || {}) },
      user: { ...defaultState.user, ...(parsed.user || {}) },
      measurements: { ...defaultState.measurements, ...(parsed.measurements || {}) },
      notifications: { ...defaultState.notifications, ...(parsed.notifications || {}) },
      reminderTimes: { ...defaultState.reminderTimes, ...(parsed.reminderTimes || {}) },
      today: { ...defaultState.today, ...(parsed.today || {}),
        meals: { ...defaultState.today.meals, ...((parsed.today && parsed.today.meals) || {}) }
      }
    };
    // Migration: weight was sometimes saved in lbs; normalize to kg.
    if (merged.user && merged.user.weight > 200) {
      merged.user.weight = Math.round((merged.user.weight / 2.20462) * 10) / 10;
    }
    if (merged.user && merged.user.height && merged.user.height < 100) {
      merged.user.height = Math.round(merged.user.height * 2.54);
    }
    // Migrate from old single-list lifts to the new multi-day structure
    if (merged.today.lifts && Array.isArray(merged.today.lifts) && merged.today.lifts.length
        && (!merged.today.liftWorkouts || merged.today.liftWorkouts.every(w => !w.lifts || !w.lifts.length))) {
      merged.today.liftWorkouts = [{ id: 1, name: "My Workout", lifts: merged.today.lifts }];
    }
    delete merged.today.lifts;
    if (!Array.isArray(merged.today.liftWorkouts) || merged.today.liftWorkouts.length === 0) {
      merged.today.liftWorkouts = defaultState.today.liftWorkouts;
    }
    return merged;
  } catch (e) { return defaultState; }
}
function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (e) {}
}

/* ============================================================
   ACCOUNTS — local-only auth store
============================================================ */
function loadAccounts() {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]"); }
  catch (e) { return []; }
}
function saveAccounts(list) {
  try { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(list)); } catch (e) {}
}
// Note: this is a demo password "hash" — not real security; localStorage only.
function pseudoHash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return h.toString(36);
}
function tryLogin(email, password) {
  const accounts = loadAccounts();
  const a = accounts.find(x => x.email.toLowerCase() === email.toLowerCase());
  if (!a) return { ok: false, error: "No account with that email." };
  if (a.passhash !== pseudoHash(password)) return { ok: false, error: "Wrong password." };
  return { ok: true, account: a };
}
function trySignup(name, email, password) {
  const accounts = loadAccounts();
  if (accounts.some(x => x.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "An account with that email already exists." };
  }
  const account = { name, email, passhash: pseudoHash(password), created: Date.now() };
  saveAccounts([...accounts, account]);
  return { ok: true, account };
}

/* ============================================================
   DATA / CALCULATIONS
============================================================ */
// Mifflin-St Jeor BMR (always uses metric).
// Defensive: if weight looks like lbs (>200) or height like inches (<100), auto-convert.
function calcBMR({ weight, height, age, sex }) {
  let w = +weight || 0;
  let h = +height || 0;
  if (w > 200) w = w / 2.20462;   // lbs → kg (no human is >200 kg)
  if (h < 100) h = h * 2.54;      // inches → cm (no adult is <100 cm)
  const base = 10 * w + 6.25 * h - 5 * age;
  return Math.round(sex === "female" ? base - 161 : base + 5);
}
// TDEE assuming moderate activity 1.5 (app personalizes later)
function calcTDEE(user) { return Math.round(calcBMR(user) * 1.5); }

// Calorie target by goal
// Daily calorie target tuned to bodyweight (Mifflin-St Jeor BMR × 1.5 activity) + goal:
//   • lose      → TDEE − 400  (steady ~0.6–0.8 lb/week deficit)
//   • maintain  → TDEE
//   • gain/bulk → TDEE + 250  (lean-bulk surplus, 200–300 kcal range)
function calcCalorieTarget(user, goal) {
  const tdee = calcTDEE(user);
  if (goal === "lose") return Math.round(tdee - 400);
  if (goal === "gain") return Math.round(tdee + 250);
  return tdee;
}

// Macro split by goal (P/C/F percents of kcal)
function macroSplit(goal) {
  if (goal === "lose")     return { p: 0.40, c: 0.30, f: 0.30 };
  if (goal === "gain")     return { p: 0.30, c: 0.50, f: 0.20 };
  return                        { p: 0.30, c: 0.40, f: 0.30 }; // maintain
}

function macroTargets(user, goal) {
  const kcal = calcCalorieTarget(user, goal);
  const s = macroSplit(goal);
  return {
    kcal,
    protein: Math.round((kcal * s.p) / 4),
    carbs:   Math.round((kcal * s.c) / 4),
    fats:    Math.round((kcal * s.f) / 9),
  };
}

// Sum today's intake from meals
function sumIntake(meals) {
  const all = Object.values(meals).flat();
  return all.reduce((acc, m) => ({
    kcal: acc.kcal + m.kcal,
    p: acc.p + m.p,
    c: acc.c + m.c,
    f: acc.f + m.f,
  }), { kcal: 0, p: 0, c: 0, f: 0 });
}

/* ============================================================
   FOOD DATABASE + INTELLIGENCE
============================================================ */
const FOOD_DB = [
  {
    id: 1, name: "Grilled Chicken Bowl", store: "FreshCo", dist: 0.4, price: 8.50,
    kcal: 520, p: 42, c: 38, f: 12, emoji: "🥗", health: 88,
    cuisine: "American", prepTime: 20, allergens: ["soy"],
    fiber: 6, sugar: 4, sodium: 620, cholesterol: 95, satFat: 2,
    micros: { "Vit A": "12%", "Vit C": "22%", "Vit D": "4%", "Iron": "18%", "Calcium": "8%", "B12": "45%", "Potassium": "20%", "Magnesium": "14%" },
    ingredients: [
      { name: "Chicken breast", emoji: "🍗", qty: "150g", kcal: 248, role: "protein" },
      { name: "Brown rice", emoji: "🍚", qty: "1/2 cup", kcal: 108, role: "carb" },
      { name: "Mixed greens", emoji: "🥬", qty: "2 cups", kcal: 14, role: "vegetable" },
      { name: "Cherry tomatoes", emoji: "🍅", qty: "1/2 cup", kcal: 27, role: "vegetable" },
      { name: "Cucumber", emoji: "🥒", qty: "1/2 cup", kcal: 8, role: "vegetable" },
      { name: "Olive oil dressing", emoji: "🫒", qty: "1 tbsp", kcal: 109, role: "fat" },
      { name: "Lemon juice", emoji: "🍋", qty: "1 tbsp", kcal: 4, role: "flavor" },
      { name: "Black pepper", emoji: "🌶️", qty: "pinch", kcal: 2, role: "seasoning" },
    ],
    stores: [
      { name: "Whole Foods", logo: "WF", aisle: "Meat & Seafood", price: 6.99, unit: "/lb (chicken)", dist: 0.8 },
      { name: "Trader Joe's", logo: "TJ", aisle: "Grains", price: 2.49, unit: "/bag (rice)", dist: 0.5 },
      { name: "FreshCo", logo: "FC", aisle: "Produce", price: 3.99, unit: "/bag (greens)", dist: 0.4 },
    ],
    alternatives: [
      { from: "Chicken breast", to: "Turkey breast", reason: "Lower fat, similar protein content. Saves ~30 kcal.", delta: "+2 health" },
      { from: "Brown rice", to: "Cauliflower rice", reason: "Cuts ~85g of carbs while keeping the bowl filling.", delta: "-30g carbs" },
      { from: "Olive oil dressing", to: "Greek yogurt dressing", reason: "Higher protein, lower fat — same creamy texture.", delta: "+8g protein" },
    ],
    tags: ["high-protein", "meal-prep", "gluten-free"]
  },
  {
    id: 2, name: "Salmon & Quinoa", store: "GreenEats", dist: 0.6, price: 11.20,
    kcal: 610, p: 36, c: 44, f: 18, emoji: "🐟", health: 92,
    cuisine: "Mediterranean", prepTime: 25, allergens: ["fish"],
    fiber: 7, sugar: 5, sodium: 480, cholesterol: 78, satFat: 3,
    micros: { "Vit A": "8%", "Vit C": "30%", "Vit D": "85%", "Iron": "20%", "Calcium": "6%", "B12": "60%", "Omega-3": "180%", "Magnesium": "30%" },
    ingredients: [
      { name: "Atlantic salmon", emoji: "🐟", qty: "140g", kcal: 280, role: "protein" },
      { name: "Quinoa", emoji: "🌾", qty: "3/4 cup", kcal: 167, role: "carb" },
      { name: "Roasted broccoli", emoji: "🥦", qty: "1 cup", kcal: 55, role: "vegetable" },
      { name: "Cherry tomatoes", emoji: "🍅", qty: "1/2 cup", kcal: 27, role: "vegetable" },
      { name: "Lemon", emoji: "🍋", qty: "1/2", kcal: 8, role: "flavor" },
      { name: "Olive oil", emoji: "🫒", qty: "1 tbsp", kcal: 119, role: "fat" },
      { name: "Garlic", emoji: "🧄", qty: "2 cloves", kcal: 9, role: "seasoning" },
      { name: "Fresh dill", emoji: "🌿", qty: "1 tbsp", kcal: 0, role: "seasoning" },
    ],
    stores: [
      { name: "Whole Foods", logo: "WF", aisle: "Seafood", price: 12.99, unit: "/lb (salmon)", dist: 0.8 },
      { name: "Trader Joe's", logo: "TJ", aisle: "Grains", price: 3.49, unit: "/bag (quinoa)", dist: 0.5 },
      { name: "GreenEats", logo: "GE", aisle: "Produce", price: 2.99, unit: "/lb (broccoli)", dist: 0.6 },
    ],
    alternatives: [
      { from: "Atlantic salmon", to: "Wild-caught salmon", reason: "Lower contaminants, slightly more omega-3 content.", delta: "+sustainable" },
      { from: "Quinoa", to: "Farro", reason: "More fiber and a chewier texture — similar protein.", delta: "+3g fiber" },
      { from: "Olive oil", to: "Avocado oil", reason: "Higher smoke point if pan-searing. Similar healthy fats.", delta: "+heat-stable" },
    ],
    tags: ["omega-3", "heart-healthy", "anti-inflammatory"]
  },
  {
    id: 3, name: "Protein Smoothie", store: "Blendly", dist: 0.2, price: 5.90,
    kcal: 310, p: 28, c: 30, f: 6, emoji: "🥤", health: 80,
    cuisine: "American", prepTime: 5, allergens: ["dairy"],
    fiber: 4, sugar: 22, sodium: 180, cholesterol: 15, satFat: 1.5,
    micros: { "Vit A": "6%", "Vit C": "60%", "Vit D": "10%", "Iron": "8%", "Calcium": "30%", "B12": "20%", "Potassium": "16%", "Magnesium": "12%" },
    ingredients: [
      { name: "Whey protein", emoji: "🥛", qty: "1 scoop", kcal: 120, role: "protein" },
      { name: "Banana", emoji: "🍌", qty: "1 medium", kcal: 105, role: "carb" },
      { name: "Almond milk", emoji: "🥛", qty: "1 cup", kcal: 30, role: "liquid" },
      { name: "Frozen berries", emoji: "🫐", qty: "1/2 cup", kcal: 35, role: "fruit" },
      { name: "Almond butter", emoji: "🥜", qty: "1 tbsp", kcal: 95, role: "fat" },
      { name: "Spinach", emoji: "🥬", qty: "1 handful", kcal: 7, role: "vegetable" },
      { name: "Ice", emoji: "🧊", qty: "1 cup", kcal: 0, role: "texture" },
    ],
    stores: [
      { name: "GNC", logo: "G", aisle: "Supplements", price: 32.99, unit: "/2lb (whey)", dist: 1.1 },
      { name: "Trader Joe's", logo: "TJ", aisle: "Produce", price: 0.59, unit: "/banana", dist: 0.5 },
      { name: "Blendly", logo: "B", aisle: "Bar", price: 5.90, unit: "(ready-made)", dist: 0.2 },
    ],
    alternatives: [
      { from: "Whey protein", to: "Plant protein (pea/rice)", reason: "Dairy-free, similar amino profile in blends.", delta: "+vegan" },
      { from: "Banana", to: "Frozen cauliflower", reason: "Cuts carbs while keeping creamy texture.", delta: "-25g carbs" },
      { from: "Almond butter", to: "PB2 powder", reason: "Same flavor with ~75% fewer calories from fat.", delta: "-65 kcal" },
    ],
    tags: ["post-workout", "quick", "high-protein"]
  },
  {
    id: 4, name: "Turkey Wrap", store: "DeliMart", dist: 0.5, price: 6.75,
    kcal: 430, p: 30, c: 40, f: 14, emoji: "🌯", health: 72,
    cuisine: "American", prepTime: 10, allergens: ["gluten", "dairy"],
    fiber: 5, sugar: 6, sodium: 980, cholesterol: 55, satFat: 4,
    micros: { "Vit A": "20%", "Vit C": "12%", "Vit D": "2%", "Iron": "15%", "Calcium": "20%", "B12": "30%", "Potassium": "12%", "Selenium": "40%" },
    ingredients: [
      { name: "Whole wheat tortilla", emoji: "🌾", qty: "1 large", kcal: 180, role: "carb" },
      { name: "Sliced turkey", emoji: "🦃", qty: "100g", kcal: 130, role: "protein" },
      { name: "Lettuce", emoji: "🥬", qty: "1 cup", kcal: 5, role: "vegetable" },
      { name: "Tomato", emoji: "🍅", qty: "2 slices", kcal: 8, role: "vegetable" },
      { name: "Cheddar cheese", emoji: "🧀", qty: "1 slice", kcal: 70, role: "fat" },
      { name: "Mustard", emoji: "🟡", qty: "1 tsp", kcal: 3, role: "flavor" },
      { name: "Light mayo", emoji: "🥄", qty: "1 tsp", kcal: 35, role: "fat" },
    ],
    stores: [
      { name: "DeliMart", logo: "DM", aisle: "Deli", price: 4.99, unit: "/lb (turkey)", dist: 0.5 },
      { name: "Whole Foods", logo: "WF", aisle: "Bakery", price: 4.49, unit: "/pack (tortillas)", dist: 0.8 },
    ],
    alternatives: [
      { from: "Whole wheat tortilla", to: "Lettuce wrap", reason: "Eliminates ~40g carbs and gluten.", delta: "-160 kcal" },
      { from: "Cheddar cheese", to: "Hummus", reason: "Plant-based, lower saturated fat, more fiber.", delta: "+fiber" },
      { from: "Light mayo", to: "Avocado", reason: "Whole-food fat with potassium and fiber.", delta: "+nutrients" },
    ],
    tags: ["lunch", "portable", "balanced"]
  },
  {
    id: 5, name: "Steak & Sweet Potato", store: "Prime Co", dist: 0.9, price: 15.90,
    kcal: 780, p: 48, c: 52, f: 28, emoji: "🥩", health: 78,
    cuisine: "American", prepTime: 30, allergens: [],
    fiber: 8, sugar: 12, sodium: 720, cholesterol: 130, satFat: 8,
    micros: { "Vit A": "380%", "Vit C": "30%", "Vit D": "2%", "Iron": "30%", "Calcium": "8%", "B12": "120%", "Zinc": "60%", "Potassium": "30%" },
    ingredients: [
      { name: "Sirloin steak", emoji: "🥩", qty: "200g", kcal: 410, role: "protein" },
      { name: "Sweet potato", emoji: "🍠", qty: "1 medium (200g)", kcal: 180, role: "carb" },
      { name: "Asparagus", emoji: "🌱", qty: "8 spears", kcal: 27, role: "vegetable" },
      { name: "Butter", emoji: "🧈", qty: "1 tbsp", kcal: 102, role: "fat" },
      { name: "Garlic", emoji: "🧄", qty: "3 cloves", kcal: 13, role: "seasoning" },
      { name: "Rosemary", emoji: "🌿", qty: "1 sprig", kcal: 0, role: "seasoning" },
      { name: "Sea salt", emoji: "🧂", qty: "1 tsp", kcal: 0, role: "seasoning" },
      { name: "Black pepper", emoji: "🌶️", qty: "1/2 tsp", kcal: 3, role: "seasoning" },
    ],
    stores: [
      { name: "Prime Co", logo: "PC", aisle: "Butcher", price: 14.99, unit: "/lb (sirloin)", dist: 0.9 },
      { name: "FreshCo", logo: "FC", aisle: "Produce", price: 1.49, unit: "/lb (sweet potato)", dist: 0.4 },
    ],
    alternatives: [
      { from: "Sirloin steak", to: "Bison", reason: "Leaner, more iron, similar bold flavor.", delta: "-40 kcal" },
      { from: "Butter", to: "Ghee", reason: "Lactose-free, higher smoke point.", delta: "+dairy-free" },
      { from: "Sweet potato", to: "Roasted carrots", reason: "Lower-carb option with similar sweetness.", delta: "-30g carbs" },
    ],
    tags: ["high-protein", "muscle-gain", "iron-rich"]
  },
  {
    id: 6, name: "Veggie Poke Bowl", store: "Poke Spot", dist: 0.7, price: 9.50,
    kcal: 480, p: 22, c: 60, f: 14, emoji: "🍣", health: 85,
    cuisine: "Hawaiian", prepTime: 15, allergens: ["soy", "sesame"],
    fiber: 9, sugar: 8, sodium: 880, cholesterol: 0, satFat: 2,
    micros: { "Vit A": "30%", "Vit C": "45%", "Vit D": "0%", "Iron": "22%", "Calcium": "10%", "Folate": "40%", "Magnesium": "28%", "Manganese": "60%" },
    ingredients: [
      { name: "Sushi rice", emoji: "🍚", qty: "3/4 cup", kcal: 165, role: "carb" },
      { name: "Edamame", emoji: "🫛", qty: "1/2 cup", kcal: 95, role: "protein" },
      { name: "Tofu", emoji: "🧈", qty: "100g", kcal: 76, role: "protein" },
      { name: "Avocado", emoji: "🥑", qty: "1/2", kcal: 120, role: "fat" },
      { name: "Cucumber", emoji: "🥒", qty: "1/2 cup", kcal: 8, role: "vegetable" },
      { name: "Seaweed salad", emoji: "🌿", qty: "1/4 cup", kcal: 30, role: "vegetable" },
      { name: "Soy sauce", emoji: "🥢", qty: "1 tbsp", kcal: 8, role: "seasoning" },
      { name: "Sesame seeds", emoji: "⚪", qty: "1 tsp", kcal: 16, role: "garnish" },
    ],
    stores: [
      { name: "Poke Spot", logo: "PS", aisle: "Counter", price: 9.50, unit: "(bowl)", dist: 0.7 },
      { name: "H Mart", logo: "HM", aisle: "Asian Foods", price: 4.99, unit: "/pack (tofu)", dist: 1.4 },
    ],
    alternatives: [
      { from: "Sushi rice", to: "Cauliflower rice", reason: "Removes ~40g carbs, lighter feel.", delta: "-130 kcal" },
      { from: "Soy sauce", to: "Coconut aminos", reason: "Soy-free, lower sodium by 65%.", delta: "-580mg sodium" },
      { from: "Tofu", to: "Tempeh", reason: "More protein and probiotic benefits.", delta: "+8g protein" },
    ],
    tags: ["plant-based", "high-fiber", "anti-inflammatory"]
  },
  {
    id: 7, name: "Lentil Soup + Bread", store: "FreshCo", dist: 0.4, price: 5.40,
    kcal: 380, p: 18, c: 58, f: 8, emoji: "🍲", health: 76,
    cuisine: "Mediterranean", prepTime: 35, allergens: ["gluten"],
    fiber: 14, sugar: 6, sodium: 720, cholesterol: 0, satFat: 1,
    micros: { "Vit A": "30%", "Vit C": "10%", "Vit D": "0%", "Iron": "35%", "Calcium": "8%", "Folate": "70%", "Potassium": "22%", "Magnesium": "20%" },
    ingredients: [
      { name: "Brown lentils", emoji: "🫘", qty: "1 cup cooked", kcal: 230, role: "protein" },
      { name: "Sourdough bread", emoji: "🍞", qty: "1 slice", kcal: 120, role: "carb" },
      { name: "Carrots", emoji: "🥕", qty: "1/2 cup", kcal: 25, role: "vegetable" },
      { name: "Celery", emoji: "🌿", qty: "1/2 cup", kcal: 8, role: "vegetable" },
      { name: "Onion", emoji: "🧅", qty: "1/4 medium", kcal: 11, role: "vegetable" },
      { name: "Tomato paste", emoji: "🍅", qty: "1 tbsp", kcal: 13, role: "flavor" },
      { name: "Olive oil", emoji: "🫒", qty: "1 tsp", kcal: 40, role: "fat" },
      { name: "Cumin", emoji: "🌶️", qty: "1/2 tsp", kcal: 4, role: "seasoning" },
    ],
    stores: [
      { name: "FreshCo", logo: "FC", aisle: "Dry Goods", price: 1.99, unit: "/bag (lentils)", dist: 0.4 },
      { name: "Trader Joe's", logo: "TJ", aisle: "Bakery", price: 3.99, unit: "/loaf (sourdough)", dist: 0.5 },
    ],
    alternatives: [
      { from: "Sourdough bread", to: "Gluten-free flatbread", reason: "Same crunch without gluten.", delta: "+GF" },
      { from: "Brown lentils", to: "Red lentils", reason: "Faster cook time and creamier texture.", delta: "-cook time" },
    ],
    tags: ["plant-protein", "high-fiber", "comfort-food"]
  },
  {
    id: 8, name: "Egg & Avocado Toast", store: "Blendly", dist: 0.2, price: 6.20,
    kcal: 420, p: 20, c: 34, f: 22, emoji: "🥑", health: 82,
    cuisine: "American", prepTime: 10, allergens: ["eggs", "gluten"],
    fiber: 8, sugar: 3, sodium: 540, cholesterol: 370, satFat: 4,
    micros: { "Vit A": "12%", "Vit C": "18%", "Vit D": "20%", "Iron": "14%", "Calcium": "8%", "B12": "30%", "Folate": "30%", "Potassium": "20%" },
    ingredients: [
      { name: "Sourdough bread", emoji: "🍞", qty: "2 slices", kcal: 240, role: "carb" },
      { name: "Eggs", emoji: "🥚", qty: "2 large", kcal: 140, role: "protein" },
      { name: "Avocado", emoji: "🥑", qty: "1/2", kcal: 120, role: "fat" },
      { name: "Lemon juice", emoji: "🍋", qty: "1 tsp", kcal: 1, role: "flavor" },
      { name: "Red pepper flakes", emoji: "🌶️", qty: "pinch", kcal: 0, role: "seasoning" },
      { name: "Sea salt", emoji: "🧂", qty: "pinch", kcal: 0, role: "seasoning" },
      { name: "Microgreens", emoji: "🌱", qty: "small handful", kcal: 5, role: "garnish" },
    ],
    stores: [
      { name: "FreshCo", logo: "FC", aisle: "Dairy", price: 4.99, unit: "/dozen (eggs)", dist: 0.4 },
      { name: "Trader Joe's", logo: "TJ", aisle: "Produce", price: 1.49, unit: "/avocado", dist: 0.5 },
    ],
    alternatives: [
      { from: "Sourdough bread", to: "Sweet potato slices", reason: "Whole-food carb with vit A & lower glycemic.", delta: "-60 kcal" },
      { from: "Eggs", to: "Tofu scramble", reason: "Vegan option with similar feel.", delta: "+vegan" },
    ],
    tags: ["breakfast", "healthy-fats", "balanced"]
  },
];

function priceTag(p) {
  if (p <= 6.5) return "budget";
  if (p <= 10) return "moderate";
  return "premium";
}

/* ------ Geo helpers for "Where to buy" near the user ------ */
// Stable string hash → 32-bit int (used to seed each store's local position)
function strHash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
// Haversine distance in km between two lat/lng pairs
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
// Format distance respecting the user's chosen units
function formatDistance(km, units) {
  if (units === "metric") {
    if (km < 1) return `${Math.round(km * 1000)} m`;
    return `${km.toFixed(km < 10 ? 1 : 0)} km`;
  }
  const mi = km * 0.621371;
  if (mi < 0.1) return `${Math.round(mi * 5280)} ft`;
  return `${mi.toFixed(mi < 10 ? 1 : 0)} mi`;
}
// Given a user's lat/lng, deterministically place each store within ~3 mi (~5 km)
// and recompute distance + sort nearest first. (Demo fallback only.)
function localizeStores(stores, userLoc, units) {
  if (!userLoc || typeof userLoc.lat !== "number") {
    return stores.map(s => ({ ...s, displayDist: `${s.dist} mi`, _km: s.dist * 1.60934 }));
  }
  return stores
    .map((s) => {
      const h = strHash(s.name + s.aisle);
      const latOffset = ((h & 0xff) / 255 - 0.5) * 0.07;
      const lngOffset = (((h >> 8) & 0xff) / 255 - 0.5) * 0.09;
      const lat = userLoc.lat + latOffset;
      const lng = userLoc.lng + lngOffset;
      const km = haversineKm(userLoc.lat, userLoc.lng, lat, lng);
      return { ...s, lat, lng, _km: km, displayDist: formatDistance(km, units) };
    })
    .sort((a, b) => a._km - b._km);
}

/* Real nearby stores from OpenStreetMap (Overpass API, no key needed).
   Returns up to 12 grocery-type places sorted by distance. */
async function fetchNearbyStoresOSM(lat, lng, radiusM = 5000) {
  const q = `[out:json][timeout:20];(
    node["shop"~"^(supermarket|convenience|greengrocer|health_food|butcher|deli|farm)$"](around:${radiusM},${lat},${lng});
    way["shop"~"^(supermarket|convenience|greengrocer|health_food|butcher|deli|farm)$"](around:${radiusM},${lat},${lng});
  );out center 40;`;
  const endpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
  ];
  let lastErr;
  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "data=" + encodeURIComponent(q),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const items = (data.elements || []).map((el) => {
        const slat = el.lat ?? el.center?.lat;
        const slng = el.lon ?? el.center?.lon;
        if (typeof slat !== "number" || typeof slng !== "number") return null;
        const name = el.tags?.name;
        if (!name) return null;
        const street = [el.tags?.["addr:housenumber"], el.tags?.["addr:street"]].filter(Boolean).join(" ");
        const city = el.tags?.["addr:city"] || el.tags?.["addr:suburb"] || "";
        return {
          id: `${el.type}/${el.id}`,
          name,
          shop: el.tags?.shop || "store",
          lat: slat,
          lng: slng,
          address: [street, city].filter(Boolean).join(", "),
          osmType: el.type,
          osmId: el.id,
        };
      }).filter(Boolean);
      // Dedupe by name+rough-coords
      const seen = new Set();
      const unique = [];
      for (const s of items) {
        const key = s.name.toLowerCase() + "@" + s.lat.toFixed(3) + "," + s.lng.toFixed(3);
        if (seen.has(key)) continue;
        seen.add(key);
        unique.push(s);
      }
      // Compute distance + sort
      unique.forEach((s) => { s._km = haversineKm(lat, lng, s.lat, s.lng); });
      unique.sort((a, b) => a._km - b._km);
      return unique.slice(0, 12);
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error("Overpass failed");
}

// Build a Google Maps directions URL from user → store
function directionsUrl(userLoc, store) {
  const dest = `${store.lat},${store.lng}`;
  const params = new URLSearchParams({
    api: "1",
    destination: dest,
    travelmode: "driving",
  });
  if (store.name) params.set("destination_name", store.name);
  if (userLoc && typeof userLoc.lat === "number") {
    params.set("origin", `${userLoc.lat},${userLoc.lng}`);
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

// Pretty-format a shop tag (e.g. "health_food" → "Health food")
function prettyShop(s) {
  if (!s) return "Store";
  return s.replace(/_/g, " ").replace(/^./, c => c.toUpperCase());
}

// Guess an emoji for an OFF product from its name (best-effort).
function productEmoji(p) {
  const t = ((p && p.name) || "" + " " + ((p && p.brand) || "")).toLowerCase();
  if (/yogurt|yoghurt|skyr/.test(t)) return "🥛";
  if (/peanut.?butter|nut.?butter/.test(t)) return "🥜";
  if (/almond|cashew|walnut|pecan|pistachio|\bnut\b|nuts/.test(t)) return "🥜";
  if (/protein.?bar|granola.?bar|cookie/.test(t)) return "🍫";
  if (/protein.?shake|smoothie|drink/.test(t)) return "🥤";
  if (/whey|casein|protein.?powder/.test(t)) return "💪";
  if (/milk\b|lactaid|fairlife/.test(t)) return "🥛";
  if (/chicken/.test(t)) return "🍗";
  if (/turkey/.test(t)) return "🦃";
  if (/beef|steak|ground/.test(t)) return "🥩";
  if (/tuna|salmon|sardine|fish/.test(t)) return "🐟";
  if (/egg/.test(t)) return "🥚";
  if (/cottage|cheese/.test(t)) return "🧀";
  if (/oat|granola|cereal|muesli|porridge/.test(t)) return "🥣";
  if (/bread|toast|bagel/.test(t)) return "🍞";
  if (/quinoa|rice|grain|farro/.test(t)) return "🍚";
  if (/pasta|noodle|spaghetti/.test(t)) return "🍝";
  if (/banana/.test(t)) return "🍌";
  if (/apple/.test(t)) return "🍎";
  if (/orange/.test(t)) return "🍊";
  if (/berry|berries|strawberry|blueberry|raspberry/.test(t)) return "🫐";
  if (/avocado/.test(t)) return "🥑";
  if (/honey/.test(t)) return "🍯";
  if (/chocolate|cocoa/.test(t)) return "🍫";
  if (/butter/.test(t)) return "🧈";
  if (/seed|chia|flax/.test(t)) return "🌱";
  return "🥗";
}

// Cheap check: is this product name in (mostly) English / Latin script?
function isEnglishName(name) {
  if (!name) return false;
  // Reject if it contains any non-Latin script (Cyrillic, CJK, Arabic, Hebrew, Greek, etc.)
  if (/[Ͱ-ϿЀ-ӿ԰-׿؀-ۿऀ-ॿ぀-ヿ㐀-鿿가-힯]/.test(name)) return false;
  return true;
}

/* Goal-tailored query lists for the dashboard "real product" suggestions.
   Each list mixes a few product types per goal so suggestions feel varied. */
const GOAL_QUERIES = {
  lose: [
    "0% fat greek yogurt", "chicken breast", "egg whites",
    "low calorie protein bar", "tuna packet", "cottage cheese",
  ],
  gain: [
    "peanut butter", "granola", "trail mix",
    "mass gainer protein", "whole milk", "rolled oats",
  ],
  maintain: [
    "greek yogurt", "oatmeal", "almonds",
    "salmon", "quinoa", "protein shake",
  ],
};
// Fetch ~2 OFF results per query and dedupe by product code.
async function fetchGoalProducts(goal) {
  const queries = GOAL_QUERIES[goal] || GOAL_QUERIES.maintain;
  const lists = await Promise.allSettled(queries.map(q => searchOpenFoodFacts(q, 4)));
  const seen = new Set();
  const out = [];
  for (const r of lists) {
    if (r.status !== "fulfilled") continue;
    for (const p of r.value) {
      if (!p || !p.code || seen.has(p.code)) continue;
      if (p.kcal < 30) continue;        // skip products with placeholder data
      if (!isEnglishName(p.name)) continue;
      seen.add(p.code);
      out.push(p);
      if (out.length >= 18) break;
    }
    if (out.length >= 18) break;
  }
  return out;
}

/* ------ Real branded products from Open Food Facts (free, no API key) ------ */
async function searchOpenFoodFacts(query, pageSize = 24) {
  if (!query || query.trim().length < 2) return [];
  const fields = [
    "code","product_name","brands","image_small_url","image_thumb_url",
    "nutriments","serving_size","quantity","nutriscore_grade","categories_tags",
  ].join(",");
  // Use the US (English-only) endpoint and explicitly request en metadata.
  const url = `https://us.openfoodfacts.org/cgi/search.pl`
    + `?search_terms=${encodeURIComponent(query)}`
    + `&search_simple=1&action=process&json=1&lc=en`
    + `&page_size=${pageSize}&sort_by=popularity`
    + `&fields=${fields}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  return (data.products || [])
    .map((p) => {
      const n = p.nutriments || {};
      const hasServing = n["energy-kcal_serving"] != null;
      const kcal = Math.round(
        n["energy-kcal_serving"] ?? n["energy-kcal_100g"] ?? 0
      );
      const protein = +Number(n["proteins_serving"] ?? n["proteins_100g"] ?? 0).toFixed(1);
      const carbs   = +Number(n["carbohydrates_serving"] ?? n["carbohydrates_100g"] ?? 0).toFixed(1);
      const fat     = +Number(n["fat_serving"] ?? n["fat_100g"] ?? 0).toFixed(1);
      const fiber   = +Number(n["fiber_serving"] ?? n["fiber_100g"] ?? 0).toFixed(1);
      const sugar   = +Number(n["sugars_serving"] ?? n["sugars_100g"] ?? 0).toFixed(1);
      const sodium  = Math.round((n["sodium_serving"] ?? n["sodium_100g"] ?? 0) * 1000);
      return {
        id: "off:" + p.code,
        code: p.code,
        name: (p.product_name || "").trim(),
        brand: (p.brands || "").split(",")[0].trim(),
        image: p.image_small_url || p.image_thumb_url || "",
        kcal, p: protein, c: carbs, f: fat,
        fiber, sugar, sodium,
        servingSize: (p.serving_size || (hasServing ? "1 serving" : "100 g")).trim(),
        per: hasServing ? "per serving" : "per 100 g",
        nutriscore: (p.nutriscore_grade || "").toUpperCase(),
        url: `https://world.openfoodfacts.org/product/${p.code}`,
      };
    })
    .filter((x) => x.name && x.kcal > 0 && isEnglishName(x.name));
}

// Score how well a food matches the user's goal
function macroMatchScore(food, goal) {
  const s = macroSplit(goal);
  const pPct = (food.p * 4) / food.kcal;
  const cPct = (food.c * 4) / food.kcal;
  const fPct = (food.f * 9) / food.kcal;
  const diff = Math.abs(pPct - s.p) + Math.abs(cPct - s.c) + Math.abs(fPct - s.f);
  const base = Math.max(0, 100 - diff * 120);
  let bonus = 0;
  if (goal === "lose" && food.kcal < 500 && pPct > 0.3) bonus += 8;
  if (goal === "gain" && food.kcal > 600) bonus += 8;
  if (goal === "maintain" && food.health > 80) bonus += 4;
  return Math.min(100, Math.round(base + bonus));
}

function recommendationReason(food, goal) {
  const pPct = Math.round((food.p * 4) / food.kcal * 100);
  if (goal === "lose") {
    if (food.kcal < 500 && pPct > 30) return `Lean & filling — ${pPct}% protein keeps you satisfied.`;
    if (food.kcal < 450) return `Under 450 kcal — fits your deficit.`;
    return `Moderate calories, decent protein for satiety.`;
  }
  if (goal === "gain") {
    if (food.kcal > 700) return `Calorie-dense (${food.kcal} kcal) — supports your surplus.`;
    if (food.c > 50) return `Carb-rich — fuel for training and recovery.`;
    return `Solid kcal with balanced macros to grow.`;
  }
  if (food.health > 85) return `High health score (${food.health}) — well-balanced choice.`;
  return `Balanced macros that fit a maintenance day.`;
}

function rankFoods(foods, goal, filter) {
  let list = foods.map(f => ({
    ...f,
    match: macroMatchScore(f, goal),
    tag: priceTag(f.price),
    reason: recommendationReason(f, goal),
  }));
  if (filter === "protein") list = list.filter(f => (f.p * 4) / f.kcal >= 0.28);
  if (filter === "lowcarb") list = list.filter(f => (f.c * 4) / f.kcal <= 0.35);
  if (filter === "budget")  list = list.filter(f => f.tag === "budget");
  list.sort((a, b) => b.match - a.match);
  return list;
}

/* ============================================================
   COACHING / PERSONALIZATION
============================================================ */
function coachMessages({ intake, targets, steps, streak, water }) {
  const msgs = [];
  const pPct = intake.p / targets.protein;
  const kPct = intake.kcal / targets.kcal;

  if (streak >= 3) msgs.push({ ico: "🔥", t: `Great consistency — ${streak}-day streak`, d: "Keep the momentum going today." });

  if (pPct < 0.4 && intake.kcal > 300) {
    const need = Math.max(0, targets.protein - intake.p);
    msgs.push({ ico: "💪", t: `You're ${Math.round((1 - pPct) * 100)}% under protein`, d: `Consider adding ~${need}g protein in your next meal.` });
  } else if (pPct > 0.9) {
    msgs.push({ ico: "✨", t: "Protein target nearly met", d: "Nice work — keep it balanced with carbs and fats." });
  }

  if (kPct > 0.85 && kPct < 1.05) {
    msgs.push({ ico: "🎯", t: "You're close to your calorie target", d: `Just ${Math.max(0, targets.kcal - intake.kcal)} kcal to go.` });
  } else if (kPct > 1.1) {
    msgs.push({ ico: "⚠️", t: "Slightly over target", d: `${intake.kcal - targets.kcal} kcal above — a walk can help balance.` });
  }

  if (steps < 5000) msgs.push({ ico: "👟", t: "Short on steps today", d: `Aim for ${5000 - steps} more to hit your baseline.` });
  if (water < 4) msgs.push({ ico: "💧", t: "Hydration reminder", d: `You've had ${water} glasses — aim for 8.` });

  return msgs.slice(0, 2); // show up to 2
}

/* ============================================================
   APP CONTEXT
============================================================ */
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

function AppProvider({ children }) {
  const [state, setState] = useState(loadState);
  const [selectedFood, setSelectedFood] = useState(null);
  const [authMessage, setAuthMessage] = useState(null);
  useEffect(() => { saveState(state); }, [state]);

  const setTheme = (patch) => setState(s => ({ ...s, theme: { ...s.theme, ...patch } }));
  const setUser  = (patch) => setState(s => ({ ...s, user: { ...s.user, ...patch } }));
  const setGoal  = (g)     => setState(s => ({ ...s, goal: g }));
  const setDevices = (d)   => setState(s => ({ ...s, devices: d }));
  const completeOnboarding = () => setState(s => ({ ...s, onboarded: true }));
  const resetOnboarding = () => setState(s => ({ ...s, onboarded: false }));

  const setWater = (n) => setState(s => ({ ...s, today: { ...s.today, water: Math.max(0, Math.min(8, n)) } }));
  const addMealEntry = (meal, entry) => setState(s => ({
    ...s, today: { ...s.today, meals: {
      ...s.today.meals, [meal]: [...s.today.meals[meal], { id: Date.now(), ...entry }]
    }}
  }));
  const removeMealEntry = (meal, id) => setState(s => ({
    ...s, today: { ...s.today, meals: {
      ...s.today.meals, [meal]: s.today.meals[meal].filter(e => e.id !== id)
    }}
  }));
  const dismissTip = () => setState(s => ({ ...s, firstTipSeen: true }));

  // Auth
  const login = (email, password) => {
    const r = tryLogin(email, password);
    if (!r.ok) { setAuthMessage({ type: "error", text: r.error }); return false; }
    setState(s => ({ ...s, auth: { loggedIn: true, email: r.account.email, isGuest: false }, user: { ...s.user, name: r.account.name } }));
    setAuthMessage({ type: "ok", text: `Welcome back, ${r.account.name}!` });
    return true;
  };
  const signup = (name, email, password) => {
    const r = trySignup(name, email, password);
    if (!r.ok) { setAuthMessage({ type: "error", text: r.error }); return false; }
    setState(s => ({ ...s, auth: { loggedIn: true, email, isGuest: false }, user: { ...s.user, name } }));
    setAuthMessage({ type: "ok", text: `Account created!` });
    return true;
  };
  const continueAsGuest = () => {
    setState(s => ({ ...s, auth: { loggedIn: true, email: "", isGuest: true } }));
  };
  const logout = () => {
    setState(s => ({ ...s, auth: { loggedIn: false, email: "", isGuest: false }, onboarded: false }));
  };
  const deleteAccount = () => {
    const email = state.auth.email;
    if (!state.auth.isGuest && email) {
      const accounts = loadAccounts().filter(a => a.email.toLowerCase() !== email.toLowerCase());
      saveAccounts(accounts);
    }
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  };
  const changeEmail = (newEmail) => {
    if (state.auth.isGuest) return { ok: false, error: "Guest accounts have no email." };
    const accounts = loadAccounts();
    const idx = accounts.findIndex(a => a.email.toLowerCase() === state.auth.email.toLowerCase());
    if (idx === -1) return { ok: false, error: "Account not found." };
    if (accounts.some(a => a.email.toLowerCase() === newEmail.toLowerCase())) return { ok: false, error: "Email already in use." };
    accounts[idx].email = newEmail;
    saveAccounts(accounts);
    setState(s => ({ ...s, auth: { ...s.auth, email: newEmail } }));
    return { ok: true };
  };
  const changePassword = (oldPw, newPw) => {
    if (state.auth.isGuest) return { ok: false, error: "Guest accounts have no password." };
    const accounts = loadAccounts();
    const idx = accounts.findIndex(a => a.email.toLowerCase() === state.auth.email.toLowerCase());
    if (idx === -1) return { ok: false, error: "Account not found." };
    if (accounts[idx].passhash !== pseudoHash(oldPw)) return { ok: false, error: "Current password is wrong." };
    if (newPw.length < 6) return { ok: false, error: "New password must be 6+ characters." };
    accounts[idx].passhash = pseudoHash(newPw);
    saveAccounts(accounts);
    return { ok: true };
  };
  const logWeight = (kg) => setState(s => ({
    ...s, user: { ...s.user, weight: kg },
    weeklyWeights: [...s.weeklyWeights.slice(1), kg]
  }));
  const addWorkout = (entry) => setState(s => ({
    ...s, today: { ...s.today, workouts: [...s.today.workouts, { id: Date.now(), ...entry }] }
  }));
  // Workout-day (multi-tab) helpers
  const _patchWorkout = (s, dayId, patcher) => ({
    ...s, today: { ...s.today,
      liftWorkouts: (s.today.liftWorkouts || []).map(w => w.id === dayId ? patcher(w) : w)
    }
  });
  const addWorkoutDay = (name) => setState(s => {
    const n = (name && name.trim()) || `Day ${(s.today.liftWorkouts || []).length + 1}`;
    const id = Date.now();
    return { ...s, today: { ...s.today,
      liftWorkouts: [...(s.today.liftWorkouts || []), { id, name: n, lifts: [] }]
    }};
  });
  const renameWorkoutDay = (dayId, name) => setState(s =>
    _patchWorkout(s, dayId, w => ({ ...w, name }))
  );
  const removeWorkoutDay = (dayId) => setState(s => ({
    ...s, today: { ...s.today,
      liftWorkouts: (s.today.liftWorkouts || []).filter(w => w.id !== dayId)
    }
  }));
  const addLift = (dayId, entry) => setState(s =>
    _patchWorkout(s, dayId, w => ({
      ...w, lifts: [...(w.lifts || []), { id: Date.now() + Math.random(), name: "", sets: 3, reps: 8, weight: 0, ...entry }]
    }))
  );
  const updateLift = (dayId, liftId, patch) => setState(s =>
    _patchWorkout(s, dayId, w => ({
      ...w, lifts: (w.lifts || []).map(l => l.id === liftId ? { ...l, ...patch } : l)
    }))
  );
  const removeLift = (dayId, liftId) => setState(s =>
    _patchWorkout(s, dayId, w => ({
      ...w, lifts: (w.lifts || []).filter(l => l.id !== liftId)
    }))
  );

  const toggleFavorite = (foodId) => setState(s => ({
    ...s, favorites: s.favorites.includes(foodId)
      ? s.favorites.filter(id => id !== foodId)
      : [...s.favorites, foodId]
  }));

  const setNotifications = (patch) => setState(s => ({ ...s, notifications: { ...s.notifications, ...patch } }));
  const setReminderTimes = (patch) => setState(s => ({ ...s, reminderTimes: { ...s.reminderTimes, ...patch } }));
  const setUnits = (u) => setState(s => ({ ...s, units: u }));
  const setMeasurements = (patch) => setState(s => ({ ...s, measurements: { ...s.measurements, ...patch } }));

  const targets = useMemo(() => macroTargets(state.user, state.goal), [state.user, state.goal]);
  const intake  = useMemo(() => sumIntake(state.today.meals), [state.today.meals]);

  const value = {
    state, setState,
    setTheme, setUser, setGoal, setDevices,
    completeOnboarding, resetOnboarding,
    setWater, addMealEntry, removeMealEntry, dismissTip,
    targets, intake,
    selectedFood, setSelectedFood,
    login, signup, continueAsGuest, logout, deleteAccount,
    changeEmail, changePassword, logWeight, addWorkout,
    addLift, updateLift, removeLift,
    addWorkoutDay, renameWorkoutDay, removeWorkoutDay,
    authMessage, setAuthMessage,
    toggleFavorite,
    setNotifications, setReminderTimes, setUnits, setMeasurements,
  };
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

/* ============================================================
   THEME CONTAINER (reads from AppCtx)
============================================================ */
function useThemeClasses() {
  const { state } = useApp();
  const { mode, accentOn, intensity } = state.theme;
  return [
    mode === "light" ? "theme-light" : "theme-dark",
    accentOn ? "accent-on" : "accent-off",
    intensity === "subtle" ? "intensity-subtle" : "intensity-strong",
  ].join(" ");
}

/* ============================================================
   ICONS
============================================================ */
const Icon = {
  home: <svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v11h14V9"/></svg>,
  nutrition: <svg viewBox="0 0 24 24"><path d="M12 3c4 0 7 3 7 7 0 5-4 10-7 11-3-1-7-6-7-11 0-4 3-7 7-7z"/><path d="M12 7v7"/></svg>,
  activity: <svg viewBox="0 0 24 24"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>,
  lifts: <svg viewBox="0 0 24 24"><path d="M2 12h2"/><path d="M20 12h2"/><rect x="4" y="9" width="3" height="6" rx="0.5"/><rect x="17" y="9" width="3" height="6" rx="0.5"/><path d="M7 12h10"/><rect x="7" y="10.5" width="10" height="3" rx="0.5"/></svg>,
  profile: <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>,
  settings: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>,
};

/* ============================================================
   SHARED UI
============================================================ */
function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="right"><span>•••</span></div>
    </div>
  );
}

function BottomNav({ tab, onChange }) {
  const tabs = [
    { id: "home", label: "Home", icon: Icon.home },
    { id: "nutrition", label: "Nutrition", icon: Icon.nutrition },
    { id: "activity", label: "Activity", icon: Icon.activity },
    { id: "profile", label: "Profile", icon: Icon.profile },
    { id: "settings", label: "Settings", icon: Icon.settings },
  ];
  return (
    <div className="bottom-nav">
      {tabs.map(t => (
        <button key={t.id}
          className={"nav-item " + (tab === t.id ? "active" : "")}
          onClick={() => onChange(t.id)}>
          {t.icon}<span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function ProgressBar({ value, max, over }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100));
  const isOver = value > max;
  return (
    <div className="bar">
      <div className={"fill" + (isOver ? " over" : "")} style={{ width: pct + "%" }} />
    </div>
  );
}

function Stepper({ step, total }) {
  return (
    <div className="stepper">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={"dot " + (i < step ? "active" : "")} />
      ))}
    </div>
  );
}

/* ============================================================
   ONBOARDING SCREENS
============================================================ */
const DEVICES = [
  { id: "applefit", name: "Apple Fitness", meta: "Workouts, rings & activity", letter: "" },
  { id: "apple", name: "Apple Watch", meta: "Full health data", letter: "A" },
  { id: "garmin", name: "Garmin", meta: "Watch & HR data", letter: "G" },
  { id: "whoop", name: "Whoop", meta: "Recovery & strain", letter: "W" },
  { id: "fitbit", name: "Fitbit", meta: "Steps & sleep", letter: "F" },
];

function DeviceScreen({ onNext }) {
  const { state, setDevices } = useApp();
  const connected = state.devices;
  const toggle = (id) => setDevices({ ...connected, [id]: !connected[id] });
  const any = Object.values(connected).some(Boolean);

  return (
    <div className="fade-in" key="devices">
      <Stepper step={1} total={5} />
      <div className="content">
        <h1 className="h1">Connect your device</h1>
        <p className="sub">We'll pull your health data automatically. You can skip and add one later.</p>
        <div style={{ marginTop: 22 }}>
          {DEVICES.map(d => (
            <div key={d.id}
              className={"device-row " + (connected[d.id] ? "connected" : "")}
              onClick={() => toggle(d.id)}>
              <div className="device-icon" style={d.id === "applefit" ? { fontSize: 22 } : {}}>
                {d.id === "applefit" ? "" : d.letter}
              </div>
              <div className="device-info">
                <div className="n">{d.name}</div>
                <div className="m">{d.meta}</div>
              </div>
              <div className={"pill " + (connected[d.id] ? "on" : "")}>
                {connected[d.id] ? "Connected" : "Connect"}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" onClick={onNext} style={{ flex: 1 }}>Skip for now</button>
          <button className="btn btn-primary"
            style={{ flex: 2, opacity: any ? 1 : 0.85 }} onClick={onNext}>
            {any ? "Continue" : "Continue without device"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LocationScreen({ onNext, onBack }) {
  const { state, setState } = useApp();
  const [locStatus, setLocStatus] = useState(state.locationStatus || "unset");

  const requestLocation = () => {
    if (!navigator.geolocation) { setLocStatus("unsupported"); return; }
    setLocStatus("pending");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocStatus("granted");
        setState(s => ({ ...s,
          locationStatus: "granted",
          location: { lat: pos.coords.latitude, lng: pos.coords.longitude, ts: Date.now() }
        }));
      },
      () => {
        setLocStatus("denied");
        setState(s => ({ ...s, locationStatus: "denied" }));
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
    );
  };

  return (
    <div className="fade-in" key="location">
      <Stepper step={2} total={5} />
      <div className="content">
        <h1 className="h1">Allow location access</h1>
        <p className="sub">We use your location to find real grocery stores near you and give you driving directions to them.</p>

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <div style={{
            width: 96, height: 96, borderRadius: 28, margin: "0 auto",
            background: "var(--accent-soft)", color: "var(--accent-strong)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 44
          }}></div>

          {locStatus === "granted" && (
            <div style={{ marginTop: 18, fontSize: 14, color: "var(--success)", fontWeight: 600 }}>
              ✓ Location enabled — you're all set.
            </div>
          )}
          {locStatus === "denied" && (
            <div style={{ marginTop: 18, fontSize: 13, color: "var(--danger)", fontWeight: 600 }}>
              Permission denied. You can enable it later in your browser/device settings.
            </div>
          )}
          {locStatus === "unsupported" && (
            <div style={{ marginTop: 18, fontSize: 13, color: "var(--text-muted)" }}>
              Location isn't available on this device.
            </div>
          )}
        </div>

        <div className="card" style={{ marginTop: 22, padding: 16 }}>
          <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <span>🛒</span><span>See real grocery stores near you (powered by OpenStreetMap)</span>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <span>🧭</span><span>Tap any store to open driving directions</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <span>🔒</span><span>Your coordinates stay on your device — never sent anywhere except to OpenStreetMap when you ask for nearby stores.</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" onClick={onBack} style={{ flex: 1 }}>Back</button>
          {locStatus === "granted" ? (
            <button className="btn btn-primary" onClick={onNext} style={{ flex: 2 }}>Continue</button>
          ) : (
            <button className="btn btn-primary" onClick={requestLocation}
              disabled={locStatus === "pending" || locStatus === "unsupported"}
              style={{ flex: 2, opacity: locStatus === "pending" ? 0.7 : 1 }}>
              {locStatus === "pending" ? "Asking…" :
               locStatus === "denied" ? "Try again" :
               locStatus === "unsupported" ? "Unavailable" : "Allow location"}
            </button>
          )}
        </div>
        <div style={{ marginTop: 10, textAlign: "center" }}>
          <button className="btn btn-ghost btn-sm" onClick={onNext}
            style={{ background: "transparent", border: "none", color: "var(--text-soft)", fontSize: 12 }}>
            Skip — I'll enable later
          </button>
        </div>
      </div>
    </div>
  );
}

function StatsScreen({ onNext, onBack }) {
  const { state, setUser, setUnits } = useApp();
  const units = state.units || "imperial";

  // Caps (metric). Imperial input ranges are derived.
  const KG_MIN = 30, KG_MAX = 250;
  const LB_MIN = 66, LB_MAX = 550;
  const CM_MIN = 100, CM_MAX = 230;
  const AGE_MIN = 13, AGE_MAX = 100;

  // Initialize display strings from existing user data (if any)
  const initWeight = () => {
    if (!state.user.weight) return "";
    return String(units === "imperial"
      ? Math.round(state.user.weight * 2.20462)
      : Math.round(state.user.weight));
  };
  const initCm = () => state.user.height ? String(Math.round(state.user.height)) : "";
  const initFtIn = () => {
    if (!state.user.height) return ["", ""];
    const totalIn = Math.round(state.user.height / 2.54);
    return [String(Math.floor(totalIn / 12)), String(totalIn % 12)];
  };
  const [weightStr, setWeightStr] = useState(initWeight);
  const [cmStr, setCmStr]   = useState(initCm);
  const [ftStr, setFtStr]   = useState(() => initFtIn()[0]);
  const [inStr, setInStr]   = useState(() => initFtIn()[1]);
  const [ageStr, setAgeStr] = useState(() => state.user.age ? String(state.user.age) : "");
  const [error, setError]   = useState("");

  // When the user flips Imperial/Metric, convert what's already typed
  const switchUnits = (target) => {
    if (target === units) return;
    const w = parseFloat(weightStr);
    if (!isNaN(w)) {
      setWeightStr(target === "imperial"
        ? String(Math.round(w * 2.20462))
        : String(Math.round(w / 2.20462)));
    }
    if (target === "metric") {
      // Imperial → Metric: collapse ft/in into cm
      const f = parseFloat(ftStr) || 0;
      const i = parseFloat(inStr) || 0;
      if (f || i) setCmStr(String(Math.round((f * 12 + i) * 2.54)));
    } else {
      // Metric → Imperial: explode cm into ft/in
      const c = parseFloat(cmStr);
      if (!isNaN(c) && c > 0) {
        const totalIn = Math.round(c / 2.54);
        setFtStr(String(Math.floor(totalIn / 12)));
        setInStr(String(totalIn % 12));
      }
    }
    setUnits(target);
  };

  // Live previews (purely informational)
  const previewKg = (() => {
    const w = parseFloat(weightStr);
    if (isNaN(w) || w <= 0) return null;
    return units === "imperial" ? w / 2.20462 : w;
  })();
  const previewCm = (() => {
    if (units === "imperial") {
      const f = parseFloat(ftStr) || 0;
      const i = parseFloat(inStr) || 0;
      if (!f && !i) return null;
      return (f * 12 + i) * 2.54;
    }
    const c = parseFloat(cmStr);
    return isNaN(c) ? null : c;
  })();

  const valid = !!previewKg && !!previewCm && !!parseInt(ageStr);

  const submit = () => {
    if (!previewKg || previewKg < KG_MIN || previewKg > KG_MAX) {
      return setError(`Enter a valid weight (${units === "imperial" ? LB_MIN + "–" + LB_MAX + " lbs" : KG_MIN + "–" + KG_MAX + " kg"}).`);
    }
    if (!previewCm || previewCm < CM_MIN || previewCm > CM_MAX) {
      return setError(units === "imperial" ? "Enter a valid height (3'4\" – 7'6\")." : `Enter a valid height (${CM_MIN}–${CM_MAX} cm).`);
    }
    const a = parseInt(ageStr);
    if (!a || a < AGE_MIN || a > AGE_MAX) {
      return setError(`Enter a valid age (${AGE_MIN}–${AGE_MAX}).`);
    }
    setError("");
    setUser({
      weight: Math.round(previewKg * 10) / 10,
      height: Math.round(previewCm),
      age: a,
    });
    onNext();
  };

  return (
    <div className="fade-in" key="stats">
      <Stepper step={3} total={5} />
      <div className="content">
        <h1 className="h1">Your current stats</h1>
        <p className="sub">This helps us personalize your calorie and macro plan.</p>

        {/* Units toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22, marginBottom: 14 }}>
          <span className="label">Units</span>
          <div className="segmented">
            <button className={units === "imperial" ? "active" : ""} onClick={() => switchUnits("imperial")}>Imperial</button>
            <button className={units === "metric" ? "active" : ""} onClick={() => switchUnits("metric")}>Metric</button>
          </div>
        </div>

        <div className="card" style={{ padding: 18 }}>
          {/* Weight */}
          <div className="input-group" style={{ marginBottom: 16 }}>
            <label>Weight</label>
            <div className="field">
              <input
                type="text" inputMode="decimal" autoComplete="off"
                placeholder={units === "imperial" ? "e.g. 165" : "e.g. 75"}
                value={weightStr}
                onChange={(e) => setWeightStr(e.target.value.replace(/[^\d.]/g, ""))}
              />
              <span className="unit">{units === "imperial" ? "lbs" : "kg"}</span>
            </div>
            {previewKg && (
              <div style={{ fontSize: 11, color: "var(--text-soft)", marginTop: 6 }}>
                {units === "imperial"
                  ? `≈ ${(previewKg).toFixed(1)} kg`
                  : `≈ ${Math.round(previewKg * 2.20462)} lbs`}
              </div>
            )}
          </div>

          {/* Height */}
          <div className="input-group" style={{ marginBottom: 16 }}>
            <label>Height</label>
            {units === "imperial" ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="field">
                  <input type="text" inputMode="numeric" autoComplete="off"
                    placeholder="5"
                    value={ftStr}
                    onChange={(e) => setFtStr(e.target.value.replace(/[^\d]/g, ""))} />
                  <span className="unit">ft</span>
                </div>
                <div className="field">
                  <input type="text" inputMode="numeric" autoComplete="off"
                    placeholder="9"
                    value={inStr}
                    onChange={(e) => setInStr(e.target.value.replace(/[^\d]/g, ""))} />
                  <span className="unit">in</span>
                </div>
              </div>
            ) : (
              <div className="field">
                <input type="text" inputMode="numeric" autoComplete="off"
                  placeholder="e.g. 175"
                  value={cmStr}
                  onChange={(e) => setCmStr(e.target.value.replace(/[^\d.]/g, ""))} />
                <span className="unit">cm</span>
              </div>
            )}
            {previewCm && (
              <div style={{ fontSize: 11, color: "var(--text-soft)", marginTop: 6 }}>
                {units === "imperial"
                  ? `≈ ${Math.round(previewCm)} cm`
                  : (() => {
                      const totalIn = Math.round(previewCm / 2.54);
                      return `≈ ${Math.floor(totalIn / 12)}' ${totalIn % 12}"`;
                    })()}
              </div>
            )}
          </div>

          {/* Age */}
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label>Age</label>
            <div className="field">
              <input type="text" inputMode="numeric" autoComplete="off"
                placeholder="e.g. 28"
                value={ageStr}
                onChange={(e) => setAgeStr(e.target.value.replace(/[^\d]/g, ""))} />
              <span className="unit">years</span>
            </div>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 10, padding: "10px 12px", borderRadius: 10,
            background: "rgba(248,113,113,0.12)", color: "var(--danger)",
            fontSize: 12, fontWeight: 600 }}>{error}</div>
        )}

        <p style={{ fontSize: 11, color: "var(--text-soft)", marginTop: 10, textAlign: "center" }}>
          Weight {units === "imperial" ? `${LB_MIN}–${LB_MAX} lbs` : `${KG_MIN}–${KG_MAX} kg`} ·
          {" "}Height {units === "imperial" ? "3'4\" – 7'6\"" : `${CM_MIN}–${CM_MAX} cm`}
        </p>

        <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" onClick={onBack} style={{ flex: 1 }}>Back</button>
          <button className="btn btn-primary" disabled={!valid}
            style={{ opacity: valid ? 1 : 0.5, flex: 2 }} onClick={submit}>Next</button>
        </div>
      </div>
    </div>
  );
}

const GOALS = [
  { id: "lose", emoji: "↓", title: "Lose weight", desc: "Calorie deficit & guidance" },
  { id: "gain", emoji: "↑", title: "Gain weight", desc: "Build mass with macros" },
  { id: "maintain", emoji: "=", title: "Maintain", desc: "Stay balanced & healthy" },
];

function GoalsScreen({ onNext, onBack }) {
  const { state, setGoal, setState } = useApp();
  const [goal, setLocalGoal] = useState(state.goal);
  const [custom, setCustom] = useState(state.customGoal || "");
  const submit = () => {
    setGoal(goal);
    setState(s => ({ ...s, customGoal: custom }));
    onNext();
  };
  return (
    <div className="fade-in" key="goals">
      <Stepper step={4} total={5} />
      <div className="content">
        <h1 className="h1">Your goals</h1>
        <p className="sub">Pick what you want to prioritize.</p>
        <div style={{ marginTop: 22 }}>
          {GOALS.map(g => (
            <div key={g.id}
              className={"goal-card " + (goal === g.id ? "selected" : "")}
              onClick={() => setLocalGoal(g.id)}>
              <div className="goal-emoji">{g.emoji}</div>
              <div style={{ flex: 1 }}>
                <div className="goal-title">{g.title}</div>
                <div className="goal-desc">{g.desc}</div>
              </div>
            </div>
          ))}
          <div className="input-group" style={{ marginTop: 10 }}>
            <label>Custom goal (optional)</label>
            <div className="field">
              <input type="text" placeholder="e.g. train for a 10K"
                value={custom} onChange={e => setCustom(e.target.value)} />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" onClick={onBack} style={{ flex: 1 }}>Back</button>
          <button className="btn btn-primary" disabled={!goal && !custom}
            style={{ opacity: (goal || custom) ? 1 : 0.5, flex: 2 }} onClick={submit}>Continue</button>
        </div>
      </div>
    </div>
  );
}

const PLANS = [
  { id: "trial", name: "1-week free trial", price: "Free", desc: "Then $9.99/mo. Cancel anytime.", highlight: true },
  { id: "short", name: "Monthly plan", price: "$6.99", desc: "Save 30% — limited offer" },
  { id: "full", name: "Annual plan", price: "$59", desc: "Best value, $4.99/mo billed yearly" },
];

function SubscriptionScreen({ onNext, onBack }) {
  const { setState } = useApp();
  const [plan, setPlan] = useState("trial");
  const finish = () => {
    setState(s => ({ ...s, subscription: { plan, active: true, daysLeft: plan === "trial" ? 7 : 0 } }));
    onNext();
  };
  return (
    <div className="fade-in" key="sub">
      <Stepper step={5} total={5} />
      <div className="content">
        <h1 className="h1">Start your journey</h1>
        <p className="sub">Choose the plan that works for you.</p>
        <div style={{ marginTop: 28 }}>
          {PLANS.map(p => (
            <div key={p.id}
              className={"plan-card " + (plan === p.id ? "selected " : "") + (p.highlight ? "highlight" : "")}
              onClick={() => setPlan(p.id)}>
              <div className="plan-head">
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">{p.price}</div>
              </div>
              <div className="plan-desc">{p.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          <button className="btn btn-primary" onClick={finish}>
            {plan === "trial" ? "Start Free Trial" : "Continue"}
          </button>
          <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-soft)", marginTop: 10 }}>
            Cancel anytime. No commitment.
          </p>
          <button className="btn btn-ghost" onClick={onBack} style={{ marginTop: 8 }}>Back</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD
============================================================ */
function CalorieRing({ consumed, target, burned }) {
  const remaining = Math.max(0, target - consumed + Math.round(burned * 0.4));
  const pct = Math.min(100, (consumed / target) * 100);
  const r = 70, c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg className="ring-svg" viewBox="0 0 180 180">
      <circle cx="90" cy="90" r={r} fill="none" stroke="var(--bg-sunken)" strokeWidth="14" />
      <circle cx="90" cy="90" r={r} fill="none" stroke="var(--accent)" strokeWidth="14"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
        transform="rotate(-90 90 90)" style={{ transition: "stroke-dashoffset 700ms ease" }} />
      <text x="90" y="78" textAnchor="middle" fontSize="11" fill="var(--text-muted)" fontWeight="700" letterSpacing="0.12em">REMAINING</text>
      <text x="90" y="112" textAnchor="middle" fontSize="32" fill="var(--text)" fontWeight="800" letterSpacing="-0.02em">{remaining}</text>
      <text x="90" y="132" textAnchor="middle" fontSize="11" fill="var(--text-soft)" fontWeight="600">kcal</text>
    </svg>
  );
}

function Dashboard({ onTab }) {
  const { state, targets, intake, setSelectedFood, setWater, addMealEntry } = useApp();
  const { today, user, streak } = state;
  const [filter, setFilter] = useState("all");
  const [logWorkoutOpen, setLogWorkoutOpen] = useState(false);
  const [productToAdd, setProductToAdd] = useState(null);
  // Goal-tailored real products (Open Food Facts), cached per goal
  const [suggested, setSuggested] = useState({ goal: null, status: "idle", items: [] });
  // Real nearby grocery stores (OSM) for the "Where to buy" affordance
  const [nearbyStores, setNearbyStores] = useState({ status: "idle", stores: [] });
  // Which suggestion card has its "buy nearby" panel expanded
  const [openStoresFor, setOpenStoresFor] = useState(null);

  const messages = coachMessages({
    intake, targets, steps: today.steps, streak, water: today.water,
  });

  const burned = Math.round(today.steps * 0.04) + today.workouts.reduce((a, w) => a + w.kcal, 0);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // Fetch real branded products tailored to the user's goal
  useEffect(() => {
    if (suggested.goal === state.goal && suggested.status !== "idle") return;
    let cancelled = false;
    setSuggested({ goal: state.goal, status: "loading", items: [] });
    fetchGoalProducts(state.goal)
      .then((items) => { if (!cancelled) setSuggested({ goal: state.goal, status: "ok", items }); })
      .catch(() => { if (!cancelled) setSuggested({ goal: state.goal, status: "error", items: [] }); });
    return () => { cancelled = true; };
  }, [state.goal]);

  // Fetch nearby grocery stores once location is granted
  useEffect(() => {
    if (state.locationStatus !== "granted" || !state.location) return;
    if (nearbyStores.status === "loading" || nearbyStores.status === "ok") return;
    setNearbyStores({ status: "loading", stores: [] });
    fetchNearbyStoresOSM(state.location.lat, state.location.lng)
      .then((stores) => setNearbyStores({ status: "ok", stores }))
      .catch(() => setNearbyStores({ status: "error", stores: [] }));
  }, [state.locationStatus, state.location && state.location.lat]);

  // Apply UI filter on top of fetched results
  const visible = useMemo(() => {
    let list = suggested.items.slice();
    if (filter === "protein") list = list.filter(p => p.p && p.kcal && (p.p * 4) / p.kcal >= 0.25);
    if (filter === "lowcal")  list = list.filter(p => p.kcal && p.kcal <= 250);
    if (filter === "lowcarb") list = list.filter(p => p.c != null && p.kcal && (p.c * 4) / p.kcal <= 0.35);
    return list.slice(0, 6);
  }, [suggested, filter]);

  return (
    <div className="fade-in content" key="dash">
      <div className="page-head">
        <div>
          <h1 className="h1">{greeting}, {user.name} 👋</h1>
          <p className="sub">Here's your wellness snapshot for today.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setLogWorkoutOpen(true)}>+ Log workout</button>
          <button className="btn btn-primary btn-sm" onClick={() => onTab("nutrition")}>+ Log meal</button>
        </div>
      </div>

      {messages.map((m, i) => (
        <div className="coach-card" key={i}>
          <div className="coach-ico">{m.ico}</div>
          <div className="coach-body">
            <div className="t">{m.t}</div>
            <div className="d">{m.d}</div>
          </div>
        </div>
      ))}

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="ring-card">
          <CalorieRing consumed={intake.kcal} target={targets.kcal} burned={burned} />
          <div className="ring-info">
            <div className="label">Today's calories</div>
            <div className="ring-num">{intake.kcal}<span> / {targets.kcal}</span></div>
            <div style={{ display: "flex", gap: 14, marginTop: 16, flexWrap: "wrap" }}>
              <div><div className="label">Eaten</div><div style={{ fontSize: 16, fontWeight: 700 }}>{intake.kcal}</div></div>
              <div><div className="label">Burned</div><div style={{ fontSize: 16, fontWeight: 700 }}>{burned}</div></div>
              <div><div className="label">Net</div><div style={{ fontSize: 16, fontWeight: 700 }}>{intake.kcal - burned}</div></div>
            </div>
            <div className="quick-actions">
              <button className="qa-btn" onClick={() => onTab("nutrition")}><div className="qa-icon">🍽️</div><div className="qa-label">Log meal</div></button>
              <button className="qa-btn" onClick={() => setWater(Math.min(8, today.water + 1))}><div className="qa-icon">💧</div><div className="qa-label">+ Water</div></button>
              <button className="qa-btn" onClick={() => setLogWorkoutOpen(true)}><div className="qa-icon">🏃</div><div className="qa-label">Workout</div></button>
              <button className="qa-btn" onClick={() => onTab("profile")}><div className="qa-icon">⚖️</div><div className="qa-label">Weigh in</div></button>
            </div>
          </div>
        </div>

        <div>
          <div className="streak-card" style={{ marginBottom: 14 }}>
            <div className="streak-flame">🔥</div>
            <div>
              <div className="streak-n">{streak} days</div>
              <div className="streak-l">Active streak — keep it up!</div>
            </div>
          </div>
          <div className="card">
            <div className="label">Today's macros</div>
            <div style={{ marginTop: 10 }}>
              <div className="macro-row">
                <div className="macro-top"><span className="lbl">Protein</span><span className="val">{intake.p} / {targets.protein} g</span></div>
                <ProgressBar value={intake.p} max={targets.protein} />
              </div>
              <div className="macro-row">
                <div className="macro-top"><span className="lbl">Carbs</span><span className="val">{intake.c} / {targets.carbs} g</span></div>
                <ProgressBar value={intake.c} max={targets.carbs} />
              </div>
              <div className="macro-row">
                <div className="macro-top"><span className="lbl">Fats</span><span className="val">{intake.f} / {targets.fats} g</span></div>
                <ProgressBar value={intake.f} max={targets.fats} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="sum-card">
          <div className="sum-ico">▲</div>
          <div className="sum-val">{today.steps.toLocaleString()}</div>
          <div className="sum-lbl">Steps</div>
        </div>
        <div className="sum-card">
          <div className="sum-ico">🔥</div>
          <div className="sum-val">{burned}</div>
          <div className="sum-lbl">Calories burned</div>
        </div>
        <div className="sum-card">
          <div className="sum-ico">⏱</div>
          <div className="sum-val">{today.activeMinutes}</div>
          <div className="sum-lbl">Active min</div>
        </div>
        <div className="sum-card">
          <div className="sum-ico">💧</div>
          <div className="sum-val">{today.water}/8</div>
          <div className="sum-lbl">Glasses water</div>
        </div>
      </div>

      <div className="section-title">
        <h3>Suggested for your {state.goal === "lose" ? "cut" : state.goal === "gain" ? "bulk" : "maintenance"}</h3>
        <span className="link" onClick={() => onTab("nutrition")}>See all →</span>
      </div>
      <p className="sub" style={{ marginTop: -8, marginBottom: 14 }}>
        Real products you can buy at groceries near you · target {targets.kcal.toLocaleString()} kcal/day
      </p>

      <div className="filter-row">
        {[
          { id: "all", label: "For your goal" },
          { id: "protein", label: "High protein" },
          { id: "lowcarb", label: "Low carb" },
          { id: "lowcal", label: "Under 250 kcal" },
        ].map(f => (
          <div key={f.id}
            className={"filter-chip " + (filter === f.id ? "active" : "")}
            onClick={() => setFilter(f.id)}>{f.label}</div>
        ))}
      </div>

      {suggested.status === "loading" && (
        <div className="card" style={{ padding: "24px 14px", textAlign: "center" }}>
          <div className="ai-loading" style={{ justifyContent: "center" }}>
            <span className="ai-dot"></span><span className="ai-dot"></span><span className="ai-dot"></span>
            <span style={{ marginLeft: 6 }}>Finding real products that fit your goal…</span>
          </div>
        </div>
      )}
      {suggested.status === "error" && (
        <div className="card" style={{ padding: 14, color: "var(--danger)", fontSize: 12 }}>
          Couldn't reach the product database. Try refreshing.
        </div>
      )}
      {suggested.status === "ok" && visible.length === 0 && (
        <div className="empty-state">
          <div className="e">🔍</div>
          <div className="t">No products match this filter</div>
          <div className="d">Try "For your goal" to see all suggestions.</div>
        </div>
      )}
      {suggested.status === "ok" && visible.length > 0 && (
        <div className="food-grid">
          {visible.map((p) => {
            const isOpen = openStoresFor === p.id;
            return (
              <div key={p.id} className="food-card">
                <div className="food-head" style={{ cursor: "pointer" }} onClick={() => setProductToAdd(p)}>
                  <div className="food-img" style={{ fontSize: 28 }}>{productEmoji(p)}</div>
                  <div className="food-body">
                    <div className="food-top">
                      <div className="food-name" style={{ lineHeight: 1.3 }}>{p.name}</div>
                      {p.nutriscore && (
                        <span style={{
                          fontSize: 10, fontWeight: 800, padding: "3px 7px", borderRadius: 6,
                          background: ({A:"#16a34a",B:"#65a30d",C:"#ca8a04",D:"#ea580c",E:"#dc2626"})[p.nutriscore] || "var(--surface-2)",
                          color: "#fff", letterSpacing: 0.04, flexShrink: 0
                        }}>{p.nutriscore}</span>
                      )}
                    </div>
                    <div className="food-meta">
                      {p.brand ? p.brand + " · " : ""}{p.servingSize}
                      <span style={{ color: "var(--text-soft)" }}> · {p.per}</span>
                    </div>
                    <div className="food-macros">
                      <span className="macro-chip">{p.kcal} kcal</span>
                      <span className="macro-chip">P {p.p}g</span>
                      <span className="macro-chip">C {p.c}g</span>
                      <span className="macro-chip">F {p.f}g</span>
                    </div>
                  </div>
                </div>
                {/* Buy nearby */}
                <div style={{
                  marginTop: 10, paddingTop: 10,
                  borderTop: "1px dashed var(--border)",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8
                }}>
                  <button
                    onClick={() => setOpenStoresFor(isOpen ? null : p.id)}
                    style={{
                      flex: 1, padding: "8px 10px", borderRadius: 8,
                      border: "1px solid var(--border)", background: "var(--surface)",
                      color: "var(--text)", fontSize: 12, fontWeight: 600,
                      cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                      display: "flex", alignItems: "center", gap: 6
                    }}>
                    📍 {state.locationStatus === "granted" ? (isOpen ? "Hide stores" : "Buy nearby") : "Enable location"}
                  </button>
                  <button
                    onClick={() => setProductToAdd(p)}
                    style={{
                      padding: "8px 12px", borderRadius: 8, border: "none",
                      background: "var(--accent)", color: "var(--accent-contrast)",
                      fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
                    }}>+ Log</button>
                </div>
                {isOpen && state.locationStatus === "granted" && (
                  <div style={{ marginTop: 10, padding: 10, borderRadius: 10, background: "var(--bg-sunken)" }}>
                    {nearbyStores.status === "loading" && (
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Finding stores near you…</div>
                    )}
                    {nearbyStores.status === "error" && (
                      <div style={{ fontSize: 11, color: "var(--danger)" }}>Couldn't load nearby stores.</div>
                    )}
                    {nearbyStores.status === "ok" && nearbyStores.stores.length === 0 && (
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>No grocery stores within 5 km.</div>
                    )}
                    {nearbyStores.status === "ok" && nearbyStores.stores.slice(0, 3).map((s, i) => (
                      <div key={s.id}
                        onClick={() => window.open(directionsUrl(state.location, s), "_blank", "noopener,noreferrer")}
                        style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          padding: "6px 0", cursor: "pointer",
                          borderTop: i === 0 ? "none" : "1px dashed var(--border)"
                        }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600 }}>{s.name}</div>
                          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
                            {prettyShop(s.shop)} · {formatDistance(s._km, state.units)} away
                          </div>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-strong)", flexShrink: 0, marginLeft: 6 }}>Directions →</span>
                      </div>
                    ))}
                    <div style={{ fontSize: 10, color: "var(--text-soft)", marginTop: 6 }}>
                      Tip: Most grocery stores carry {p.brand || "this brand"}. Tap for driving directions.
                    </div>
                  </div>
                )}
                {isOpen && state.locationStatus !== "granted" && (
                  <div style={{ marginTop: 10, padding: 10, borderRadius: 10, background: "var(--accent-soft)", fontSize: 11, color: "var(--text)" }}>
                    📍 Enable location in onboarding (or browser settings) to see real stores near you.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {productToAdd && (
        <ProductAddModal
          product={productToAdd}
          onClose={() => setProductToAdd(null)}
          onAdd={(meal, servings) => {
            addMealEntry(meal, {
              name: (productToAdd.brand ? productToAdd.brand + " — " : "") + productToAdd.name,
              kcal: Math.round(productToAdd.kcal * servings),
              p: +(productToAdd.p * servings).toFixed(1),
              c: +(productToAdd.c * servings).toFixed(1),
              f: +(productToAdd.f * servings).toFixed(1),
            });
            setProductToAdd(null);
          }}
        />
      )}

      <div className="grid-2" style={{ marginTop: 28 }}>
        <div>
          <div className="section-title"><h3>Today's workouts</h3><span className="link" style={{ cursor: "pointer" }} onClick={() => onTab("activity")}>View all</span></div>
          {today.workouts.length === 0 ? (
            <div className="empty-state"><div className="e">🏃</div><div className="t">No workouts yet</div><div className="d">Log one to see it here.</div></div>
          ) : today.workouts.map(w => (
            <div key={w.id} className="workout-row">
              <div className="workout-ico">{w.emoji}</div>
              <div className="workout-info">
                <div className="n">{w.type}</div>
                <div className="m">{w.time} · {w.duration} min</div>
              </div>
              <div className="workout-kcal">{w.kcal} kcal</div>
            </div>
          ))}
        </div>
        <div>
          <div className="section-title"><h3>Recent meals</h3><span className="link" style={{ cursor: "pointer" }} onClick={() => onTab("nutrition")}>View all</span></div>
          {(() => {
            const recent = Object.entries(today.meals).flatMap(([key, items]) =>
              items.slice(0, 1).map(m => ({ ...m, meal: key }))
            ).slice(0, 4);
            if (recent.length === 0) {
              return <div className="empty-state"><div className="e">🍽</div><div className="t">No meals logged yet</div><div className="d">Add one to see it here.</div></div>;
            }
            return recent.map((m, i) => (
              <div key={i} className="meal-entry" style={{ borderTop: i === 0 ? "none" : "1px dashed var(--border)" }}>
                <div className="n">{m.name} <span style={{ color: "var(--text-soft)", fontSize: 11 }}>· {m.meal}</span></div>
                <div className="c">{m.kcal} kcal</div>
              </div>
            ));
          })()}
        </div>
      </div>

      {logWorkoutOpen && <LogWorkoutModal onClose={() => setLogWorkoutOpen(false)} />}
    </div>
  );
}

/* ============================================================
   NUTRITION TAB
============================================================ */
const MEAL_META = {
  breakfast: { label: "Breakfast", emoji: "🌅" },
  lunch:     { label: "Lunch",     emoji: "☀️" },
  dinner:    { label: "Dinner",    emoji: "🌙" },
  snack:     { label: "Snacks",    emoji: "🥨" },
};

function AddFoodSheet({ meal, onClose }) {
  const { addMealEntry } = useApp();
  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [p, setP] = useState("");
  const [c, setC] = useState("");
  const [f, setF] = useState("");
  const valid = name && kcal;
  const submit = () => {
    addMealEntry(meal, { name, kcal: +kcal, p: +p || 0, c: +c || 0, f: +f || 0 });
    onClose();
  };
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet">
        <div className="sheet-handle" />
        <h2 className="h2">Add to {MEAL_META[meal].label}</h2>
        <p className="sub" style={{ marginBottom: 16 }}>Quick log. You can edit anytime.</p>
        <div className="input-group"><label>Food</label>
          <div className="field"><input placeholder="e.g. Chicken salad" value={name} onChange={e => setName(e.target.value)} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div className="input-group"><label>Calories</label>
            <div className="field"><input type="number" placeholder="420" value={kcal} onChange={e => setKcal(e.target.value)} /><span className="unit">kcal</span></div>
          </div>
          <div className="input-group"><label>Protein</label>
            <div className="field"><input type="number" placeholder="28" value={p} onChange={e => setP(e.target.value)} /><span className="unit">g</span></div>
          </div>
          <div className="input-group"><label>Carbs</label>
            <div className="field"><input type="number" placeholder="40" value={c} onChange={e => setC(e.target.value)} /><span className="unit">g</span></div>
          </div>
          <div className="input-group"><label>Fats</label>
            <div className="field"><input type="number" placeholder="12" value={f} onChange={e => setF(e.target.value)} /><span className="unit">g</span></div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button className="btn btn-ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
          <button className="btn btn-primary" disabled={!valid} style={{ flex: 2, opacity: valid ? 1 : 0.5 }} onClick={submit}>Add</button>
        </div>
      </div>
    </>
  );
}

function NutritionScreen() {
  const { state, targets, intake, setWater, setSelectedFood, removeMealEntry, addMealEntry } = useApp();
  const { today, weeklyNutrition, favorites } = state;
  const [addingMeal, setAddingMeal] = useState(null);
  const [search, setSearch] = useState("");
  const [tabFilter, setTabFilter] = useState("all");
  const [activeRecipe, setActiveRecipe] = useState(null);

  // Real-product search via Open Food Facts (debounced)
  const [productResults, setProductResults] = useState([]);
  const [productStatus, setProductStatus] = useState("idle"); // idle | loading | ok | error
  const [productError, setProductError] = useState("");
  const [productToAdd, setProductToAdd] = useState(null);

  useEffect(() => {
    const q = search.trim();
    if (q.length < 2) {
      setProductStatus("idle");
      setProductResults([]);
      return;
    }
    setProductStatus("loading");
    let cancelled = false;
    const t = setTimeout(() => {
      searchOpenFoodFacts(q)
        .then((r) => { if (!cancelled) { setProductResults(r); setProductStatus("ok"); } })
        .catch((e) => { if (!cancelled) { setProductError(e.message || "Failed"); setProductStatus("error"); } });
    }, 400);
    return () => { cancelled = true; clearTimeout(t); };
  }, [search]);

  const remaining = Math.max(0, targets.kcal - intake.kcal);
  const maxWeekly = Math.max(1, ...weeklyNutrition);
  const days = ["M","T","W","T","F","S","S"];

  // Aggregate micronutrients from logged meals (approximation from FOOD_DB)
  const dayFiber = Math.round(intake.kcal / 110); // approx
  const daySugar = Math.round(intake.kcal / 50);
  const daySodium = Math.round(intake.kcal * 0.9);

  const filteredFoods = useMemo(() => {
    let list = FOOD_DB.map(f => ({ ...f, match: macroMatchScore(f, state.goal), tag: priceTag(f.price), reason: recommendationReason(f, state.goal) }));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(f => f.name.toLowerCase().includes(q) || f.cuisine.toLowerCase().includes(q) || f.tags.some(t => t.includes(q)) || f.ingredients.some(i => i.name.toLowerCase().includes(q)));
    }
    if (tabFilter === "favorites") list = list.filter(f => favorites.includes(f.id));
    if (tabFilter === "highprotein") list = list.filter(f => (f.p * 4) / f.kcal >= 0.28);
    if (tabFilter === "lowcal") list = list.filter(f => f.kcal < 500);
    if (tabFilter === "vegetarian") list = list.filter(f => !f.ingredients.some(i => ["chicken","turkey","salmon","steak","sirloin"].some(p => i.name.toLowerCase().includes(p))));
    return list.sort((a, b) => b.match - a.match);
  }, [search, tabFilter, state.goal, favorites]);

  const RECIPES = [
    { id: 1, emoji: "🥣", name: "Overnight Oats Bowl", time: 5, kcal: 380, tags: ["breakfast", "high-fiber"],
      ingredients: ["1/2 cup rolled oats", "1 cup almond milk", "1 tbsp chia seeds", "1/2 cup mixed berries", "1 tbsp honey", "1 tbsp almond butter"],
      steps: ["Combine oats, milk, and chia in a jar.", "Refrigerate overnight.", "Top with berries, honey, and almond butter.", "Enjoy cold."] },
    { id: 2, emoji: "🍝", name: "Zucchini Noodle Pasta", time: 25, kcal: 420, tags: ["low-carb", "vegetarian"],
      ingredients: ["2 zucchinis (spiralized)", "1 cup cherry tomatoes", "2 cloves garlic", "1/4 cup parmesan", "1 tbsp olive oil", "fresh basil"],
      steps: ["Spiralize zucchinis.", "Sauté garlic in olive oil 1 min.", "Add tomatoes, cook 5 min.", "Toss in zoodles 2 min.", "Top with parmesan and basil."] },
    { id: 3, emoji: "🍛", name: "Chickpea Curry", time: 35, kcal: 510, tags: ["plant-based", "high-protein"],
      ingredients: ["1 can chickpeas", "1 can coconut milk", "1 onion", "2 tomatoes", "2 tbsp curry powder", "1 cup spinach", "rice to serve"],
      steps: ["Sauté onion 5 min.", "Add curry powder, toast 1 min.", "Add tomatoes and chickpeas, simmer 10 min.", "Pour in coconut milk, simmer 10 more.", "Stir in spinach. Serve over rice."] },
    { id: 4, emoji: "🥙", name: "Greek Chicken Pita", time: 20, kcal: 480, tags: ["mediterranean", "balanced"],
      ingredients: ["2 chicken thighs", "1 pita", "1/4 cup tzatziki", "tomato, cucumber, onion", "1 tsp oregano", "lemon"],
      steps: ["Marinate chicken in lemon, oregano 10 min.", "Grill 6 min per side.", "Slice and stuff in warm pita.", "Top with veggies and tzatziki."] },
    { id: 5, emoji: "🥥", name: "Berry Coconut Smoothie", time: 5, kcal: 290, tags: ["dairy-free", "antioxidants"],
      ingredients: ["1 cup mixed berries", "1 cup coconut milk", "1 banana", "1 scoop vanilla protein", "1 tbsp chia seeds", "ice"],
      steps: ["Add all ingredients to blender.", "Blend until smooth.", "Pour and serve immediately."] },
    { id: 6, emoji: "🍳", name: "Veggie Frittata", time: 25, kcal: 350, tags: ["high-protein", "low-carb"],
      ingredients: ["6 eggs", "1/4 cup milk", "1 cup spinach", "1/2 bell pepper", "1/4 cup feta", "salt & pepper"],
      steps: ["Preheat oven to 375°F.", "Whisk eggs and milk.", "Sauté veggies in oven-safe pan.", "Pour eggs over veggies, top with feta.", "Bake 15 min until set."] },
  ];

  return (
    <div className="fade-in content" key="nutr">
      <div className="page-head">
        <div>
          <h1 className="h1">Nutrition</h1>
          <p className="sub">Track what you eat, find new foods, and analyze ingredients.</p>
        </div>
      </div>

      {/* Hero summary */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div className="label">Today's intake</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 4, letterSpacing: "-0.02em" }}>{intake.kcal} <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 500 }}>/ {targets.kcal} kcal</span></div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="label">Remaining</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--accent-strong)", marginTop: 4 }}>{remaining}</div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <ProgressBar value={intake.kcal} max={targets.kcal} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 18 }}>
            <div><div className="label">Protein</div><div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{intake.p}/{targets.protein}g</div><div style={{ marginTop: 6 }}><ProgressBar value={intake.p} max={targets.protein} /></div></div>
            <div><div className="label">Carbs</div><div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{intake.c}/{targets.carbs}g</div><div style={{ marginTop: 6 }}><ProgressBar value={intake.c} max={targets.carbs} /></div></div>
            <div><div className="label">Fats</div><div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{intake.f}/{targets.fats}g</div><div style={{ marginTop: 6 }}><ProgressBar value={intake.f} max={targets.fats} /></div></div>
          </div>
        </div>

        <div className="card">
          <div className="label">Micronutrients (estimated)</div>
          <div className="micro-grid" style={{ marginTop: 10 }}>
            <div className="micro-tile"><span className="l">Fiber</span><span className="v">{dayFiber}g</span></div>
            <div className="micro-tile"><span className="l">Sugar</span><span className="v">{daySugar}g</span></div>
            <div className="micro-tile"><span className="l">Sodium</span><span className="v">{daySodium}mg</span></div>
            <div className="micro-tile"><span className="l">Water</span><span className="v">{today.water}/8</span></div>
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 6 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={"water-dot " + (i < today.water ? "filled" : "")}
                style={{ height: 28, fontSize: 13 }}
                onClick={() => setWater(i < today.water ? i : i + 1)}>
                {i < today.water ? "💧" : ""}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="section-title"><h3>Meals</h3><span className="link">Today</span></div>
      <div className="grid-2">
        <div>
          {Object.entries(MEAL_META).slice(0, 2).map(([key, meta]) => {
            const entries = today.meals[key];
            const kcal = entries.reduce((a, m) => a + m.kcal, 0);
            return (
              <div key={key} className="meal-card">
                <div className="meal-head">
                  <div className="meal-title"><div className="meal-ico">{meta.emoji}</div>{meta.label}</div>
                  <div className="meal-cal">{kcal} kcal</div>
                </div>
                {entries.length === 0 ? (
                  <div style={{ fontSize: 12, color: "var(--text-soft)", padding: "8px 0" }}>Nothing logged yet.</div>
                ) : entries.map(e => (
                  <div key={e.id} className="meal-entry">
                    <div className="n">{e.name} <span style={{ color: "var(--text-soft)", fontSize: 11 }}>· {e.p}p · {e.c}c · {e.f}f</span></div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div className="c">{e.kcal} kcal</div>
                      <span style={{ cursor: "pointer", color: "var(--text-soft)", fontSize: 14 }} onClick={() => removeMealEntry(key, e.id)}>×</span>
                    </div>
                  </div>
                ))}
                <button className="meal-add" onClick={() => setAddingMeal(key)}>+ Add food</button>
              </div>
            );
          })}
        </div>
        <div>
          {Object.entries(MEAL_META).slice(2, 4).map(([key, meta]) => {
            const entries = today.meals[key];
            const kcal = entries.reduce((a, m) => a + m.kcal, 0);
            return (
              <div key={key} className="meal-card">
                <div className="meal-head">
                  <div className="meal-title"><div className="meal-ico">{meta.emoji}</div>{meta.label}</div>
                  <div className="meal-cal">{kcal} kcal</div>
                </div>
                {entries.length === 0 ? (
                  <div style={{ fontSize: 12, color: "var(--text-soft)", padding: "8px 0" }}>Nothing logged yet.</div>
                ) : entries.map(e => (
                  <div key={e.id} className="meal-entry">
                    <div className="n">{e.name} <span style={{ color: "var(--text-soft)", fontSize: 11 }}>· {e.p}p · {e.c}c · {e.f}f</span></div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div className="c">{e.kcal} kcal</div>
                      <span style={{ cursor: "pointer", color: "var(--text-soft)", fontSize: 14 }} onClick={() => removeMealEntry(key, e.id)}>×</span>
                    </div>
                  </div>
                ))}
                <button className="meal-add" onClick={() => setAddingMeal(key)}>+ Add food</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <div className="section-title" style={{ marginTop: 28 }}>
        <h3>Search products</h3>
        <span className="link" style={{ fontSize: 11, color: "var(--text-soft)", fontWeight: 500 }}>
          Powered by Open Food Facts
        </span>
      </div>
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="field" style={{ background: "var(--surface-2)", padding: "10px 14px", borderRadius: 12, border: "1px solid var(--border)" }}>
          🔍<input style={{ flex: 1, marginLeft: 8, border: "none", outline: "none", background: "transparent", color: "var(--text)", fontSize: 14, fontFamily: "inherit" }}
            placeholder="Try 'Oikos triple zero', 'Fairlife protein shake', 'RXBAR'..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Real branded product results */}
      {search.trim().length >= 2 && (
        <>
          {productStatus === "loading" && (
            <div className="card" style={{ marginBottom: 14, padding: "20px 14px", textAlign: "center" }}>
              <div className="ai-loading" style={{ justifyContent: "center" }}>
                <span className="ai-dot"></span><span className="ai-dot"></span><span className="ai-dot"></span>
                <span style={{ marginLeft: 6 }}>Searching real products…</span>
              </div>
            </div>
          )}
          {productStatus === "error" && (
            <div className="card" style={{ marginBottom: 14, padding: 14, background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.35)", color: "var(--danger)", fontSize: 12 }}>
              Couldn't reach the product database ({productError}). Try again in a moment.
            </div>
          )}
          {productStatus === "ok" && productResults.length === 0 && (
            <div className="empty-state" style={{ padding: "28px 14px" }}>
              <div className="e">📦</div>
              <div className="t">No products found</div>
              <div className="d">Try a different brand or product name. Spelling matters!</div>
            </div>
          )}
          {productStatus === "ok" && productResults.length > 0 && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span className="label">{productResults.length} real products</span>
                <span style={{ fontSize: 10, color: "var(--text-soft)" }}>Tap any to log it</span>
              </div>
              <div className="food-grid" style={{ marginBottom: 22 }}>
                {productResults.map((p) => (
                  <div key={p.id} className="food-card"
                    onClick={() => setProductToAdd(p)}
                    style={{ cursor: "pointer" }}>
                    <div className="food-head">
                      {p.image ? (
                        <img src={p.image} alt=""
                          style={{ width: 52, height: 52, borderRadius: 12, objectFit: "cover", flexShrink: 0, background: "var(--surface-2)" }} />
                      ) : (
                        <div className="food-img" style={{ fontSize: 24 }}>📦</div>
                      )}
                      <div className="food-body">
                        <div className="food-top">
                          <div className="food-name" style={{ lineHeight: 1.3 }}>{p.name}</div>
                          {p.nutriscore && p.nutriscore !== "" && (
                            <span style={{
                              fontSize: 10, fontWeight: 800, padding: "3px 7px", borderRadius: 6,
                              background: ({A:"#16a34a",B:"#65a30d",C:"#ca8a04",D:"#ea580c",E:"#dc2626"})[p.nutriscore] || "var(--surface-2)",
                              color: "#fff", letterSpacing: 0.04, flexShrink: 0
                            }}>{p.nutriscore}</span>
                          )}
                        </div>
                        <div className="food-meta">
                          {p.brand ? p.brand + " · " : ""}{p.servingSize}
                          <span style={{ color: "var(--text-soft)" }}> · {p.per}</span>
                        </div>
                        <div className="food-macros">
                          <span className="macro-chip">{p.kcal} kcal</span>
                          <span className="macro-chip">P {p.p}g</span>
                          <span className="macro-chip">C {p.c}g</span>
                          <span className="macro-chip">F {p.f}g</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Curated meals (hidden when actively searching) */}
      <div className="section-title" style={{ marginTop: 28 }}>
        <h3>{search.trim().length >= 2 ? "Curated meals matching" : "Curated meals"}</h3>
        <span className="link">{filteredFoods.length} results</span>
      </div>

      <div className="filter-row">
        {[
          { id: "all", label: "All foods" },
          { id: "favorites", label: "★ Favorites" },
          { id: "highprotein", label: "High protein" },
          { id: "lowcal", label: "Under 500 kcal" },
          { id: "vegetarian", label: "Vegetarian" },
        ].map(t => (
          <div key={t.id} className={"filter-chip " + (tabFilter === t.id ? "active" : "")} onClick={() => setTabFilter(t.id)}>{t.label}</div>
        ))}
      </div>

      {filteredFoods.length === 0 ? (
        <div className="empty-state">
          <div className="e">🔍</div>
          <div className="t">No foods match</div>
          <div className="d">Try a different filter or search term.</div>
        </div>
      ) : (
        <div className="food-grid">
          {filteredFoods.map(f => (
            <div key={f.id} className="food-card" onClick={() => setSelectedFood(f)}>
              <div className="food-head">
                <div className="food-img">{f.emoji}</div>
                <div className="food-body">
                  <div className="food-top">
                    <div className="food-name">{f.name} {favorites.includes(f.id) && <span style={{ color: "var(--accent-strong)" }}>★</span>}</div>
                    <div className="food-price">${f.price.toFixed(2)}</div>
                  </div>
                  <div className="food-meta">{f.cuisine} · {f.prepTime} min</div>
                  <div className="food-macros">
                    <span className="macro-chip">P {f.p}g</span>
                    <span className="macro-chip">C {f.c}g</span>
                    <span className="macro-chip">F {f.f}g</span>
                    <span className={"macro-chip tag-" + f.tag}>
                      {f.tag === "budget" ? "Budget" : f.tag === "moderate" ? "Moderate" : "Premium"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="food-scores">
                <div className="score-item"><div className="score-val">{f.health}</div><div className="score-lbl">Health</div></div>
                <div className="score-item"><div className="score-val">{f.match}</div><div className="score-lbl">Goal Match</div></div>
                <div className="score-item"><div className="score-val">{f.kcal}</div><div className="score-lbl">kcal</div></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recipes */}
      <div className="section-title" style={{ marginTop: 28 }}><h3>Recipe ideas</h3><span className="link">Try cooking at home</span></div>
      <div className="grid-3">
        {RECIPES.map(r => (
          <div key={r.id} className="recipe-card" onClick={() => setActiveRecipe(r)}>
            <div className="recipe-img">{r.emoji}</div>
            <div className="recipe-title">{r.name}</div>
            <div className="recipe-meta">{r.time} min · {r.kcal} kcal</div>
            <div className="recipe-tags">
              {r.tags.map(t => <span key={t} className="macro-chip" style={{ fontSize: 10 }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div className="section-title" style={{ marginTop: 28 }}><h3>Weekly overview</h3></div>
      <div className="chart-card">
        <div className="chart-head">
          <div>
            <div className="chart-title">Calories consumed</div>
            <div className="chart-sub">Avg {Math.round(weeklyNutrition.reduce((a,b) => a+b, 0) / 7)} kcal/day · target {targets.kcal}</div>
          </div>
        </div>
        <div className="bars-weekly">
          {weeklyNutrition.map((v, i) => (
            <div key={i} className={"bar-col " + (i === 6 ? "today" : "")}>
              <div className="b" style={{ height: (v / maxWeekly * 100) + "%" }} />
              <div className="lbl">{days[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {addingMeal && <AddFoodSheetWeb meal={addingMeal} onClose={() => setAddingMeal(null)} />}
      {productToAdd && (
        <ProductAddModal
          product={productToAdd}
          onClose={() => setProductToAdd(null)}
          onAdd={(meal, servings) => {
            addMealEntry(meal, {
              name: (productToAdd.brand ? productToAdd.brand + " — " : "") + productToAdd.name,
              kcal: Math.round(productToAdd.kcal * servings),
              p: +(productToAdd.p * servings).toFixed(1),
              c: +(productToAdd.c * servings).toFixed(1),
              f: +(productToAdd.f * servings).toFixed(1),
            });
            setProductToAdd(null);
          }}
        />
      )}
      {activeRecipe && (
        <InfoModal title={activeRecipe.name} onClose={() => setActiveRecipe(null)}>
          <div className="modal-hero">
            <div className="modal-hero-emoji">{activeRecipe.emoji}</div>
            <div style={{ flex: 1 }}>
              <h2>{activeRecipe.name}</h2>
              <div className="meta">{activeRecipe.time} min · {activeRecipe.kcal} kcal</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                {activeRecipe.tags.map(t => <span key={t} className="macro-chip">{t}</span>)}
              </div>
            </div>
          </div>
          <div className="label" style={{ marginBottom: 8 }}>Ingredients</div>
          {activeRecipe.ingredients.map((ing, i) => (
            <div key={i} className="meal-entry"><div className="n">• {ing}</div></div>
          ))}
          <div className="label" style={{ marginTop: 18, marginBottom: 8 }}>Steps</div>
          {activeRecipe.steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: i === 0 ? "none" : "1px dashed var(--border)" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent)", color: "var(--accent-contrast)", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 13, lineHeight: 1.5 }}>{s}</div>
            </div>
          ))}
          <button className="btn btn-primary" style={{ marginTop: 16 }}
            onClick={() => {
              addMealEntry("dinner", { name: activeRecipe.name, kcal: activeRecipe.kcal, p: 25, c: 50, f: 14 });
              setActiveRecipe(null);
            }}>Log to dinner</button>
        </InfoModal>
      )}
    </div>
  );
}

// Web-friendly modal version of AddFoodSheet
function AddFoodSheetWeb({ meal, onClose }) {
  const { addMealEntry } = useApp();
  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [p, setP] = useState("");
  const [c, setC] = useState("");
  const [f, setF] = useState("");
  const valid = name && kcal;
  const submit = () => {
    addMealEntry(meal, { name, kcal: +kcal, p: +p || 0, c: +c || 0, f: +f || 0 });
    onClose();
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Add to {MEAL_META[meal].label}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="input-group"><label>Food name</label>
            <div className="field"><input placeholder="e.g. Chicken salad" value={name} onChange={e => setName(e.target.value)} autoFocus /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div className="input-group"><label>Calories</label>
              <div className="field"><input type="number" placeholder="420" value={kcal} onChange={e => setKcal(e.target.value)} /><span className="unit">kcal</span></div>
            </div>
            <div className="input-group"><label>Protein</label>
              <div className="field"><input type="number" placeholder="28" value={p} onChange={e => setP(e.target.value)} /><span className="unit">g</span></div>
            </div>
            <div className="input-group"><label>Carbs</label>
              <div className="field"><input type="number" placeholder="40" value={c} onChange={e => setC(e.target.value)} /><span className="unit">g</span></div>
            </div>
            <div className="input-group"><label>Fats</label>
              <div className="field"><input type="number" placeholder="12" value={f} onChange={e => setF(e.target.value)} /><span className="unit">g</span></div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button className="btn btn-ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
            <button className="btn btn-primary" disabled={!valid} style={{ flex: 2, opacity: valid ? 1 : 0.5 }} onClick={submit}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal for logging a real Open Food Facts product to a meal
function ProductAddModal({ product, onClose, onAdd }) {
  const [meal, setMeal] = useState("lunch");
  const [servings, setServings] = useState(1);
  const total = {
    kcal: Math.round(product.kcal * servings),
    p: +(product.p * servings).toFixed(1),
    c: +(product.c * servings).toFixed(1),
    f: +(product.f * servings).toFixed(1),
  };
  const meals = [
    { id: "breakfast", label: "Breakfast", emoji: "🌅" },
    { id: "lunch",     label: "Lunch",     emoji: "☀️" },
    { id: "dinner",    label: "Dinner",    emoji: "🌙" },
    { id: "snack",     label: "Snack",     emoji: "🥨" },
  ];
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Log this product</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: 16, borderBottom: "1px solid var(--border)", marginBottom: 16 }}>
            {product.image ? (
              <img src={product.image} alt=""
                style={{ width: 72, height: 72, borderRadius: 14, objectFit: "cover", flexShrink: 0, background: "var(--surface-2)" }} />
            ) : (
              <div style={{ width: 72, height: 72, borderRadius: 14, background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>📦</div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{product.name}</div>
              {product.brand && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{product.brand}</div>}
              <div style={{ fontSize: 11, color: "var(--text-soft)", marginTop: 6 }}>
                {product.servingSize} ({product.per})
                {product.nutriscore && (
                  <span style={{ marginLeft: 8, padding: "2px 6px", borderRadius: 4, fontWeight: 800,
                    background: ({A:"#16a34a",B:"#65a30d",C:"#ca8a04",D:"#ea580c",E:"#dc2626"})[product.nutriscore] || "#888",
                    color: "#fff", fontSize: 10 }}>Nutri-Score {product.nutriscore}</span>
                )}
              </div>
            </div>
          </div>

          <div className="label" style={{ marginBottom: 8 }}>Servings</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <button className="icon-btn" onClick={() => setServings(s => Math.max(0.25, +(s - 0.25).toFixed(2)))}>−</button>
            <div style={{ flex: 1, textAlign: "center", fontSize: 22, fontWeight: 700 }}>
              {servings} <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>× {product.servingSize}</span>
            </div>
            <button className="icon-btn" onClick={() => setServings(s => +(s + 0.25).toFixed(2))}>+</button>
          </div>

          <div className="macro-grid-4" style={{ marginBottom: 18 }}>
            <div className="macro-tile"><div className="v">{total.kcal}</div><div className="l">kcal</div></div>
            <div className="macro-tile"><div className="v">{total.p}g</div><div className="l">Protein</div></div>
            <div className="macro-tile"><div className="v">{total.c}g</div><div className="l">Carbs</div></div>
            <div className="macro-tile"><div className="v">{total.f}g</div><div className="l">Fats</div></div>
          </div>

          <div className="label" style={{ marginBottom: 8 }}>Add to which meal?</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 18 }}>
            {meals.map(m => (
              <button key={m.id}
                className="qa-btn"
                style={{
                  borderColor: meal === m.id ? "var(--accent)" : "var(--border)",
                  background: meal === m.id ? "var(--accent-soft)" : "var(--surface)"
                }}
                onClick={() => setMeal(m.id)}>
                <div className="qa-icon">{m.emoji}</div>
                <div className="qa-label">{m.label}</div>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => onAdd(meal, servings)}>
              Log {total.kcal} kcal
            </button>
          </div>

          <div style={{ marginTop: 12, textAlign: "center" }}>
            <a href={product.url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, color: "var(--text-soft)" }}>
              View source on Open Food Facts ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ACTIVITY TAB
============================================================ */
const ACTIVITY_CATEGORIES = [
  { id: "lifting", name: "Lifting", desc: "Strength & weights",      emoji: "🏋️", color: "#f59e0b" },
  { id: "running", name: "Running", desc: "Outdoor & treadmill",     emoji: "🏃", color: "#4ade80" },
  { id: "swimming",name: "Swimming",desc: "Pool & open water",       emoji: "🏊", color: "#60a5fa" },
  { id: "biking",  name: "Biking",  desc: "Road & indoor cycle",     emoji: "🚴", color: "#a78bfa" },
  { id: "hiit",    name: "HIIT",    desc: "Interval circuits",       emoji: "⚡", color: "#f87171" },
  { id: "yoga",    name: "Yoga",    desc: "Flow & flexibility",      emoji: "🧘", color: "#fbbf24" },
  { id: "walking", name: "Walking", desc: "Daily steps & strolls",   emoji: "🚶", color: "#34d399" },
  { id: "hiking",  name: "Hiking",  desc: "Trails & elevation",      emoji: "🥾", color: "#84cc16" },
];

function ActivityScreen() {
  const { state } = useApp();
  const { today, weeklySteps, weeklySleep, hrZones, personalRecords } = state;
  const [logOpen, setLogOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCat, setSelectedCat] = useState("");

  const catToType = {
    lifting: "Strength", running: "Run", swimming: "Swim", biking: "Cycling",
    hiit: "HIIT", yoga: "Yoga", walking: "Walk", hiking: "Hike",
  };
  const selectedCategory = ACTIVITY_CATEGORIES.find(c => c.id === selectedCat);
  const pinnedType = selectedCat ? catToType[selectedCat] : null;
  const catWorkouts = pinnedType
    ? (today.workouts || []).filter(w => w.type === pinnedType)
    : [];

  const maxSteps = Math.max(1, ...weeklySteps);
  const maxSleep = Math.max(1, ...weeklySleep);
  const days = ["M","T","W","T","F","S","S"];
  const burned = Math.round(today.steps * 0.04) + today.workouts.reduce((a, w) => a + w.kcal, 0);
  const distance = (today.steps * 0.0008).toFixed(2); // km

  const hourly = [
    0, 0, 0, 0, 0, 0, 50, 420, 280, 190, 320, 510,
    680, 320, 240, 410, 820, 1100, 680, 420, 180, 80, 40, 0
  ];
  const maxHr = Math.max(1, ...hourly);

  const lastSleep = weeklySleep[weeklySleep.length - 1];
  const totalZoneMin = hrZones.z1 + hrZones.z2 + hrZones.z3 + hrZones.z4 + hrZones.z5;
  const zoneList = [
    { id: "z1", label: "Zone 1", desc: "Warm up", min: hrZones.z1, color: "zone-1", range: "60–70%" },
    { id: "z2", label: "Zone 2", desc: "Fat burn", min: hrZones.z2, color: "zone-2", range: "70–80%" },
    { id: "z3", label: "Zone 3", desc: "Aerobic", min: hrZones.z3, color: "zone-3", range: "80–87%" },
    { id: "z4", label: "Zone 4", desc: "Threshold", min: hrZones.z4, color: "zone-4", range: "87–93%" },
    { id: "z5", label: "Zone 5", desc: "Max", min: hrZones.z5, color: "zone-5", range: "93–100%" },
  ];

  return (
    <div className="fade-in content" key="act">
      <div className="page-head">
        <div>
          <h1 className="h1">Activity</h1>
          <p className="sub">Movement, workouts, heart rate, and sleep.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setLogOpen(true)}>+ Log workout</button>
      </div>

      {/* Category icon grid — click to focus an activity */}
      <div className="section-title" style={{ marginTop: 0 }}>
        <h3>Categories</h3>
        <span className="link" style={{ color: "var(--text-soft)", cursor: "default", fontWeight: 500 }}>
          {selectedCategory ? `Showing ${selectedCategory.name.toLowerCase()}` : "Tap to open"}
        </span>
      </div>
      <div className="cat-grid">
        {ACTIVITY_CATEGORIES.map(c => (
          <div key={c.id}
            className={"cat-card " + (selectedCat === c.id ? "active" : "")}
            onClick={() => setSelectedCat(selectedCat === c.id ? "" : c.id)}>
            <div className="cat-card-blob" style={{ background: c.color }} />
            <div className="cat-ico" style={{ background: c.color + "33", color: c.color }}>{c.emoji}</div>
            <div className="cat-name">{c.name}</div>
            <div className="cat-desc">{c.desc}</div>
            <div className="cat-cta">{selectedCat === c.id ? "Open ✓" : "Tap to open"}</div>
          </div>
        ))}
      </div>

      {/* Inline focused section — same layout as before, opens below the cards */}
      {selectedCategory && (
        <div className="card" style={{ padding: 18, marginBottom: 22 }}>
          <div className="page-head" style={{ marginBottom: selectedCat === "lifting" ? 0 : 14 }}>
            <div>
              <h2 className="h2" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 22 }}>{selectedCategory.emoji}</span>
                {selectedCategory.name}
              </h2>
              <p className="sub" style={{ marginTop: 4 }}>{selectedCategory.desc}</p>
            </div>
            {selectedCat !== "lifting" && (
              <button className="btn btn-primary btn-sm" onClick={() => setLogOpen(true)}>
                + Log {selectedCategory.name.toLowerCase()}
              </button>
            )}
          </div>

          {selectedCat === "lifting" ? (
            <LiftsScreen embedded />
          ) : (
            <>
              <div className="grid-3" style={{ marginBottom: catWorkouts.length === 0 ? 0 : 14 }}>
                <div className="sum-card">
                  <div className="sum-ico">{selectedCategory.emoji}</div>
                  <div className="sum-val">{catWorkouts.length}</div>
                  <div className="sum-lbl">Sessions today</div>
                </div>
                <div className="sum-card">
                  <div className="sum-ico">⏱</div>
                  <div className="sum-val">{catWorkouts.reduce((a, w) => a + (w.duration || 0), 0)}</div>
                  <div className="sum-lbl">Minutes</div>
                </div>
                <div className="sum-card">
                  <div className="sum-ico">🔥</div>
                  <div className="sum-val">{catWorkouts.reduce((a, w) => a + (w.kcal || 0), 0)}</div>
                  <div className="sum-lbl">Calories</div>
                </div>
              </div>
              {catWorkouts.length === 0 ? (
                <div style={{
                  marginTop: 14, padding: "14px 16px", borderRadius: 10,
                  background: "var(--bg-sunken)", textAlign: "center",
                  color: "var(--text-muted)", fontSize: 13
                }}>
                  No {selectedCategory.name.toLowerCase()} sessions yet — use the button above to log one.
                </div>
              ) : (
                catWorkouts.map((w) => (
                  <div key={w.id} className="workout-row" style={{ marginBottom: 6 }}>
                    <div className="workout-ico">{w.emoji}</div>
                    <div className="workout-info">
                      <div className="n">{w.type}</div>
                      <div className="m">{w.time} · {w.duration} min</div>
                    </div>
                    <div className="workout-kcal">{w.kcal} kcal</div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      )}

      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="sum-card">
          <div className="sum-ico">▲</div>
          <div className="sum-val">{today.steps.toLocaleString()}</div>
          <div className="sum-lbl">Steps</div>
        </div>
        <div className="sum-card">
          <div className="sum-ico">📏</div>
          <div className="sum-val">{distance}</div>
          <div className="sum-lbl">km walked</div>
        </div>
        <div className="sum-card">
          <div className="sum-ico">🔥</div>
          <div className="sum-val">{burned}</div>
          <div className="sum-lbl">Calories</div>
        </div>
        <div className="sum-card">
          <div className="sum-ico">⏱</div>
          <div className="sum-val">{today.activeMinutes}</div>
          <div className="sum-lbl">Active min</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="chart-card">
          <div className="chart-head">
            <div>
              <div className="chart-title">Hourly steps</div>
              <div className="chart-sub">Peak {Math.max(...hourly).toLocaleString()} steps · 24h window</div>
            </div>
            <span className="hud-status"><span className="live-dot" />LIVE</span>
          </div>
          <div className="axis-tick">
            <span>{maxHr.toLocaleString()}</span>
            <span>{Math.round(maxHr/2).toLocaleString()}</span>
            <span>0</span>
          </div>
          <div className="hourly-bars">
            {hourly.map((h, i) => (
              <div key={i} className={"hb " + (h > maxHr * 0.5 ? "on" : "")}
                style={{ height: Math.max(2, (h / maxHr) * 100) + "%" }} />
            ))}
          </div>
          <div className="hourly-labels">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-head">
            <div>
              <div className="chart-title">Weekly steps</div>
              <div className="chart-sub">Avg {Math.round(weeklySteps.reduce((a,b) => a+b, 0) / 7).toLocaleString()}/day · min {Math.min(...weeklySteps).toLocaleString()} · max {Math.max(...weeklySteps).toLocaleString()}</div>
            </div>
            <span className="hud-status"><span className="live-dot" />7D</span>
          </div>
          <div className="axis-tick">
            <span>{maxSteps.toLocaleString()}</span>
            <span>{Math.round(maxSteps/2).toLocaleString()}</span>
            <span>0</span>
          </div>
          <div className="bars-weekly">
            {weeklySteps.map((v, i) => (
              <div key={i} className={"bar-col " + (i === 6 ? "today" : "")}>
                <div className="b" style={{ height: (v / maxSteps * 100) + "%" }} />
                <div className="lbl">{days[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HR zones + Sleep */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="chart-head">
            <div>
              <div className="chart-title">Heart rate zones</div>
              <div className="chart-sub">{totalZoneMin} active minutes today</div>
            </div>
            <div className="pill xs">❤️ avg 72 bpm</div>
          </div>
          {zoneList.map(z => (
            <div key={z.id} className="hr-zone">
              <div className="hr-zone-label">
                {z.label} <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: 11 }}>· {z.desc}</span>
              </div>
              <div className="hr-zone-bar">
                <div className={"hr-zone-fill " + z.color} style={{ width: ((z.min / Math.max(1, totalZoneMin)) * 100) + "%" }} />
              </div>
              <div className="hr-zone-min">{z.min} min</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="chart-head">
            <div>
              <div className="chart-title">Sleep</div>
              <div className="chart-sub">Last night {lastSleep}h · avg {(weeklySleep.reduce((a,b) => a+b, 0) / 7).toFixed(1)}h</div>
            </div>
            <div className="pill xs">🌙</div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 8 }}>
            <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em" }}>{Math.floor(lastSleep)}</span>
            <span style={{ fontSize: 18, color: "var(--text-muted)" }}>h</span>
            <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", marginLeft: 4 }}>{Math.round((lastSleep % 1) * 60)}</span>
            <span style={{ fontSize: 18, color: "var(--text-muted)" }}>m</span>
          </div>
          <div className="bars-weekly" style={{ height: 80, marginTop: 16 }}>
            {weeklySleep.map((v, i) => (
              <div key={i} className={"bar-col " + (i === 6 ? "today" : "")}>
                <div className="b" style={{ height: (v / maxSleep * 100) + "%" }} />
                <div className="lbl">{days[i]}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 14 }}>
            <div><div className="label">Deep</div><div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>1h 42m</div></div>
            <div><div className="label">REM</div><div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>1h 18m</div></div>
            <div><div className="label">Awake</div><div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>22m</div></div>
          </div>
        </div>
      </div>

      {/* Workouts */}
      <div className="section-title"><h3>Today's workouts</h3><span className="link" style={{ cursor: "pointer" }} onClick={() => setLogOpen(true)}>+ Log workout</span></div>
      {today.workouts.length === 0 ? (
        <div className="empty-state">
          <div className="e">🏃</div>
          <div className="t">No workouts yet</div>
          <div className="d">Log one to see it here.</div>
        </div>
      ) : (
        <div className="grid-2">
          {today.workouts.map(w => (
            <div key={w.id} className="workout-row">
              <div className="workout-ico">{w.emoji}</div>
              <div className="workout-info">
                <div className="n">{w.type}</div>
                <div className="m">{w.time} · {w.duration} min</div>
              </div>
              <div className="workout-kcal">{w.kcal} kcal</div>
            </div>
          ))}
        </div>
      )}

      {/* Personal Records */}
      <div className="section-title" style={{ marginTop: 24 }}><h3>Personal records 🏆</h3><span className="link" style={{ cursor: "pointer" }} onClick={() => setShowHistory(true)}>View history</span></div>
      <div className="grid-4">
        {personalRecords.map(pr => (
          <div key={pr.id} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{pr.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{pr.name}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--accent-strong)", marginTop: 6, letterSpacing: "-0.02em" }}>{pr.value}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{pr.date}</div>
          </div>
        ))}
      </div>

      {/* Activity heatmap */}
      <div className="section-title" style={{ marginTop: 24 }}><h3>Activity heatmap</h3><span className="link">Last 26 weeks</span></div>
      <div className="card">
        <div className="heatmap">
          {state.heatmap.map((v, i) => (
            <div key={i} className={"heat-cell " + (v > 0 ? "l" + Math.min(4, v) : "")} title={`Day ${i + 1}: ${v} sessions`} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, fontSize: 11, color: "var(--text-muted)" }}>
          <span>Less</span>
          <div style={{ display: "flex", gap: 4 }}>
            <div className="heat-cell" style={{ width: 12, height: 12 }} />
            <div className="heat-cell l1" style={{ width: 12, height: 12 }} />
            <div className="heat-cell l2" style={{ width: 12, height: 12 }} />
            <div className="heat-cell l3" style={{ width: 12, height: 12 }} />
            <div className="heat-cell l4" style={{ width: 12, height: 12 }} />
          </div>
          <span>More</span>
        </div>
      </div>

      {logOpen && <LogWorkoutModal pinnedType={pinnedType} onClose={() => setLogOpen(false)} />}
      {showHistory && (
        <InfoModal title="Personal records history" onClose={() => setShowHistory(false)}>
          {personalRecords.map(pr => (
            <div key={pr.id} className="workout-row">
              <div className="workout-ico">{pr.emoji}</div>
              <div className="workout-info">
                <div className="n">{pr.name}</div>
                <div className="m">Set on {pr.date}</div>
              </div>
              <div className="workout-kcal">{pr.value}</div>
            </div>
          ))}
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 14, textAlign: "center" }}>
            Keep training — new PRs are unlocked automatically when you beat your bests.
          </p>
        </InfoModal>
      )}
    </div>
  );
}

/* ============================================================
   PROFILE TAB
============================================================ */
/* ============================================================
   LIFTS TAB — multi-day workouts (Push / Pull / Legs / custom)
============================================================ */
const COMMON_LIFTS = [
  // Chest
  "Bench Press", "Incline Bench Press", "Decline Bench Press",
  "Dumbbell Bench Press", "Incline Dumbbell Press", "Chest Fly",
  "Cable Fly", "Push-up", "Dip", "Pec Deck", "Cable Crossover",
  // Back
  "Deadlift", "Conventional Deadlift", "Sumo Deadlift",
  "Pull-up", "Chin-up", "Lat Pulldown", "Wide-Grip Pulldown",
  "Barbell Row", "Pendlay Row", "Dumbbell Row", "T-Bar Row",
  "Cable Row", "Seated Row", "Face Pull", "Shrug", "Rack Pull",
  // Legs
  "Squat", "Back Squat", "Front Squat", "Goblet Squat",
  "Bulgarian Split Squat", "Lunge", "Walking Lunge",
  "Leg Press", "Leg Extension", "Leg Curl", "Romanian Deadlift",
  "Stiff-Leg Deadlift", "Hip Thrust", "Glute Bridge",
  "Calf Raise", "Standing Calf Raise", "Seated Calf Raise",
  // Shoulders
  "Overhead Press", "Military Press", "Push Press",
  "Dumbbell Shoulder Press", "Arnold Press", "Lateral Raise",
  "Front Raise", "Rear Delt Fly", "Cable Lateral Raise",
  "Upright Row",
  // Arms
  "Bicep Curl", "Barbell Curl", "Hammer Curl", "Preacher Curl",
  "Concentration Curl", "Cable Curl", "EZ-Bar Curl",
  "Tricep Extension", "Tricep Pushdown", "Skullcrusher",
  "Close-Grip Bench Press", "Overhead Tricep Extension",
  "Cable Tricep Pushdown", "Diamond Push-up",
  // Core
  "Plank", "Side Plank", "Crunch", "Sit-up", "Russian Twist",
  "Leg Raise", "Hanging Leg Raise", "Cable Crunch", "Ab Wheel",
  // Olympic / power
  "Power Clean", "Clean and Jerk", "Snatch", "Hang Clean",
  "Push Jerk", "Split Jerk",
];

function LiftsScreen({ embedded = false }) {
  const {
    state, addLift, updateLift, removeLift,
    addWorkoutDay, renameWorkoutDay, removeWorkoutDay,
  } = useApp();
  const workouts = state.today.liftWorkouts || [];
  const units = state.units || "imperial";
  const wUnit = units === "imperial" ? "lbs" : "kg";

  const [activeId, setActiveId] = useState(workouts[0]?.id);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Keep activeId pointing to a real day
  useEffect(() => {
    if (!workouts.find(w => w.id === activeId) && workouts.length > 0) {
      setActiveId(workouts[0].id);
    }
  }, [workouts, activeId]);

  const active = workouts.find(w => w.id === activeId) || workouts[0];
  if (!active) return null;
  const lifts = active.lifts || [];

  const totalSets = lifts.reduce((acc, l) => acc + (+l.sets || 0), 0);
  const totalReps = lifts.reduce((acc, l) => acc + (+l.sets || 0) * (+l.reps || 0), 0);
  const totalVolume = lifts.reduce((acc, l) => acc + (+l.sets || 0) * (+l.reps || 0) * (+l.weight || 0), 0);

  const startRename = (w) => { setEditingId(w.id); setEditName(w.name); };
  const commitRename = () => {
    if (editingId != null && editName.trim()) renameWorkoutDay(editingId, editName.trim());
    setEditingId(null);
  };
  const handleAddDay = () => {
    const id = Date.now();
    addWorkoutDay(`Day ${workouts.length + 1}`);
    setActiveId(id);
  };
  const handleRemoveDay = (id) => {
    if (workouts.length <= 1) return;
    if (!confirm("Delete this workout day and all its lifts?")) return;
    removeWorkoutDay(id);
  };

  return (
    <div className={embedded ? "fade-in" : "fade-in content"} key="lifts">
      <div className="page-head">
        <div>
          <h1 className="h1">🏋️ Lifting</h1>
          <p className="sub">Set up a tab for each workout day — Push, Pull, Legs, or anything you want.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => addLift(active.id, {})}>+ Add lift</button>
      </div>

      {/* Day tabs */}
      <div style={{
        display: "flex", gap: 6, overflowX: "auto", paddingBottom: 6,
        marginBottom: 18, scrollbarWidth: "none"
      }}>
        {workouts.map(w => {
          const isActive = w.id === active.id;
          const isEditing = editingId === w.id;
          return (
            <div key={w.id} style={{ display: "flex", flexShrink: 0 }}>
              {isEditing ? (
                <input
                  value={editName}
                  autoFocus
                  onChange={e => setEditName(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={e => {
                    if (e.key === "Enter") commitRename();
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  style={{
                    background: "var(--accent-soft)", border: "1.5px solid var(--accent)",
                    borderRadius: 999, padding: "8px 14px",
                    fontSize: 13, fontWeight: 700, color: "var(--text)",
                    fontFamily: "inherit", outline: "none", minWidth: 140
                  }}
                />
              ) : (
                <button
                  onClick={() => setActiveId(w.id)}
                  onDoubleClick={() => startRename(w)}
                  className="filter-chip"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: isActive ? "var(--accent)" : "var(--surface)",
                    color: isActive ? "var(--accent-contrast)" : "var(--text-muted)",
                    border: "1px solid " + (isActive ? "var(--accent)" : "var(--border)"),
                    fontWeight: isActive ? 700 : 600,
                  }}>
                  <span>{w.name}</span>
                  {(w.lifts || []).length > 0 && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 999,
                      background: isActive ? "rgba(255,255,255,0.25)" : "var(--bg-sunken)",
                      color: isActive ? "var(--accent-contrast)" : "var(--text-soft)"
                    }}>{(w.lifts || []).length}</span>
                  )}
                  {isActive && (
                    <>
                      <span title="Rename"
                        onClick={(e) => { e.stopPropagation(); startRename(w); }}
                        style={{ marginLeft: 2, opacity: 0.85, fontSize: 11 }}>✎</span>
                      {workouts.length > 1 && (
                        <span title="Delete day"
                          onClick={(e) => { e.stopPropagation(); handleRemoveDay(w.id); }}
                          style={{ marginLeft: 2, fontSize: 14, lineHeight: 1, fontWeight: 700, opacity: 0.85 }}>×</span>
                      )}
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
        <button onClick={handleAddDay}
          title="Add another workout day"
          className="filter-chip"
          style={{
            background: "var(--surface)", border: "1px dashed var(--border)",
            color: "var(--text-muted)", fontWeight: 700, flexShrink: 0
          }}>+ Add day</button>
      </div>

      {/* Per-day stats */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="sum-card">
          <div className="sum-ico">🏋️</div>
          <div className="sum-val">{lifts.length}</div>
          <div className="sum-lbl">Exercises</div>
        </div>
        <div className="sum-card">
          <div className="sum-ico">🔢</div>
          <div className="sum-val">{totalSets} × {totalReps}</div>
          <div className="sum-lbl">Sets · total reps</div>
        </div>
        <div className="sum-card">
          <div className="sum-ico">📊</div>
          <div className="sum-val">{totalVolume.toLocaleString()}</div>
          <div className="sum-lbl">Volume ({wUnit})</div>
        </div>
      </div>

      {/* Lift cards */}
      {lifts.length === 0 ? (
        <div className="empty-state" style={{ padding: "48px 16px" }}>
          <div className="e">🏋️</div>
          <div className="t">No lifts in {active.name} yet</div>
          <div className="d">Tap below to start logging this day's exercises.</div>
          <button className="btn btn-primary" style={{ maxWidth: 240, margin: "20px auto 0" }}
            onClick={() => addLift(active.id, {})}>+ Add your first lift</button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {lifts.map((l, i) => (
            <LiftCard
              key={l.id}
              lift={l}
              index={i}
              suggestions={COMMON_LIFTS}
              wUnit={wUnit}
              onChange={(patch) => updateLift(active.id, l.id, patch)}
              onRemove={() => removeLift(active.id, l.id)}
            />
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <button className="btn btn-ghost" style={{ flex: 1 }}
          onClick={() => addLift(active.id, {})}>+ Add another lift</button>
      </div>

      {lifts.length > 0 && (
        <div className="card" style={{ marginTop: 24, padding: 16 }}>
          <div className="label" style={{ marginBottom: 10 }}>{active.name} summary</div>
          <div style={{ display: "grid", gap: 8 }}>
            {lifts.map(l => (
              <div key={l.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderBottom: "1px dashed var(--border)" }}>
                <span style={{ fontWeight: 600 }}>
                  {l.name || <span style={{ color: "var(--text-soft)" }}>Untitled lift</span>}
                </span>
                <span style={{ color: "var(--text-muted)" }}>
                  {(+l.sets || 0)}× × {(+l.reps || 0)} reps @ {(+l.weight || 0)} {wUnit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LiftCard({ lift, index, suggestions, wUnit, onChange, onRemove }) {
  const [showSuggest, setShowSuggest] = useState(false);
  const query = (lift.name || "").trim().toLowerCase();
  const filtered = query
    ? suggestions.filter(s => s.toLowerCase().includes(query)).slice(0, 8)
    : suggestions.slice(0, 8);
  const isCustom = query.length > 0 && !suggestions.some(s => s.toLowerCase() === query);

  return (
    <div className="card" style={{ padding: 16, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: "var(--accent-soft)", color: "var(--accent-strong)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, flexShrink: 0
        }}>{index + 1}</div>
        <div style={{ flex: 1, position: "relative" }}>
          <input
            value={lift.name}
            placeholder="Type any lift name…"
            onChange={e => onChange({ name: e.target.value })}
            onFocus={() => setShowSuggest(true)}
            onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
            style={{
              width: "100%", border: "none", outline: "none",
              background: "var(--surface-2)",
              padding: "10px 12px", borderRadius: 10,
              fontSize: 15, fontWeight: 600, color: "var(--text)",
              fontFamily: "inherit"
            }}
          />
          {isCustom && !showSuggest && (
            <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
              fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 999,
              background: "var(--accent-soft)", color: "var(--accent-strong)",
              letterSpacing: 0.04, textTransform: "uppercase", pointerEvents: "none" }}>
              Custom
            </div>
          )}
          {showSuggest && (
            <div style={{
              position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 10,
              background: "var(--bg-elevated)", border: "1px solid var(--border)",
              borderRadius: 10, padding: 6, boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              maxHeight: 280, overflowY: "auto"
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-soft)",
                textTransform: "uppercase", letterSpacing: 0.06, padding: "4px 8px 6px" }}>
                {query ? `Matching "${query}"` : "Suggestions — or type your own"}
              </div>
              {filtered.length === 0 ? (
                <div style={{ padding: "10px 8px", fontSize: 12, color: "var(--text-soft)" }}>
                  No suggestions — your custom name will be saved as is.
                </div>
              ) : filtered.map(s => (
                <div key={s}
                  onMouseDown={e => { e.preventDefault(); onChange({ name: s }); setShowSuggest(false); }}
                  style={{ padding: "8px 10px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--surface-2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={onRemove}
          title="Remove this lift"
          style={{
            width: 32, height: 32, borderRadius: 10,
            border: "1px solid var(--border)", background: "var(--surface)",
            color: "var(--danger)", fontSize: 18, fontWeight: 700, cursor: "pointer",
            flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "inherit", lineHeight: 1
          }}>−</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label style={{ fontSize: 11, marginBottom: 4 }}>Sets</label>
          <div className="field" style={{ padding: "10px 12px" }}>
            <input
              type="number" min="0" max="20" step="1"
              value={lift.sets}
              onChange={e => onChange({ sets: e.target.value === "" ? "" : Math.max(0, Math.min(20, +e.target.value)) })}
              style={{ fontSize: 15, fontWeight: 600 }} />
            <span className="unit">×</span>
          </div>
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label style={{ fontSize: 11, marginBottom: 4 }}>Reps</label>
          <div className="field" style={{ padding: "10px 12px" }}>
            <input
              type="number" min="0" max="100" step="1"
              value={lift.reps}
              onChange={e => onChange({ reps: e.target.value === "" ? "" : Math.max(0, Math.min(100, +e.target.value)) })}
              style={{ fontSize: 15, fontWeight: 600 }} />
            <span className="unit">reps</span>
          </div>
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label style={{ fontSize: 11, marginBottom: 4 }}>Weight</label>
          <div className="field" style={{ padding: "10px 12px" }}>
            <input
              type="number" min="0" step="2.5"
              value={lift.weight}
              onChange={e => onChange({ weight: e.target.value === "" ? "" : Math.max(0, +e.target.value) })}
              style={{ fontSize: 15, fontWeight: 600 }} />
            <span className="unit">{wUnit}</span>
          </div>
        </div>
      </div>

      {(+lift.sets > 0 && +lift.reps > 0 && +lift.weight > 0) && (
        <div style={{ marginTop: 12, fontSize: 11, color: "var(--text-soft)", textAlign: "right" }}>
          {lift.sets}× × {lift.reps} reps @ {lift.weight} {wUnit}
          {" · "}volume {((+lift.sets) * (+lift.reps) * (+lift.weight)).toLocaleString()} {wUnit}
        </div>
      )}
    </div>
  );
}

function WeightChart({ data }) {
  const w = 320, h = 120, pad = 10;
  if (!data || data.length < 2) {
    return (
      <div style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-soft)", fontSize: 12 }}>
        Log your weight a few times to see a trend.
      </div>
    );
  }
  const min = Math.min(...data) - 0.3;
  const max = Math.max(...data) + 0.3;
  const span = Math.max(0.01, max - min);
  const points = data.map((v, i) => {
    const x = pad + (i / Math.max(1, (data.length - 1))) * (w - pad * 2);
    const y = pad + (1 - (v - min) / span) * (h - pad * 2);
    return [x, y];
  });
  const path = points.map((p, i) => (i === 0 ? "M" : "L") + p[0] + "," + p[1]).join(" ");
  const area = path + ` L${points[points.length-1][0]},${h-pad} L${points[0][0]},${h-pad} Z`;
  return (
    <svg className="line-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={area} fill="var(--accent-soft)" />
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === points.length - 1 ? 4 : 2.5}
          fill={i === points.length - 1 ? "var(--accent)" : "var(--accent-strong)"} />
      ))}
    </svg>
  );
}

function ProfileScreen({ onTab }) {
  const { state, resetOnboarding, logout, setMeasurements, setUser, setGoal, setState, logWeight, setDevices } = useApp();
  const { user, goal, customGoal, devices, streak, weeklyWeights, subscription, achievements, measurements, auth } = state;
  const goalLabel = GOALS.find(g => g.id === goal)?.title || "Maintain";
  const bmr = calcBMR(user);
  const tdee = calcTDEE(user);
  const connectedCount = Object.values(devices).filter(Boolean).length;
  const earnedCount = achievements.filter(a => a.earned).length;
  const bmi = user.weight / Math.pow(user.height / 100, 2);

  const [editProfile, setEditProfile] = useState(false);
  const [logWeightOpen, setLogWeightOpen] = useState(false);
  const [editMeasurements, setEditMeasurements] = useState(false);
  const [editGoal, setEditGoal] = useState(false);
  const [manageSub, setManageSub] = useState(false);
  const [manageDevices, setManageDevices] = useState(false);
  const [showAchievement, setShowAchievement] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toast, setToast] = useState(null);

  return (
    <div className="fade-in content" key="prof">
      <div className="page-head">
        <div>
          <h1 className="h1">Profile</h1>
          <p className="sub">Your health journey at a glance.</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={logout}>Log out</button>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="profile-head" style={{ marginTop: 0, marginBottom: 0 }}>
          <div className="profile-avatar">{(user.name || "?")[0].toUpperCase()}</div>
          <div style={{ flex: 1 }}>
            <div className="profile-name">{user.name}</div>
            <div className="profile-sub">
              {goalLabel} · {user.age} yrs ·{" "}
              {state.units === "imperial"
                ? `${Math.floor(Math.round(user.height / 2.54) / 12)}'${Math.round(user.height / 2.54) % 12}" · ${Math.round(user.weight * 2.20462)} lbs`
                : `${user.height} cm · ${user.weight} kg`}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-soft)", marginTop: 4 }}>
              {auth.isGuest ? "Guest mode" : auth.email}
            </div>
          </div>
          <button className="pill xs" style={{ border: "none", cursor: "pointer" }} onClick={() => setEditProfile(true)}>Edit</button>
        </div>

        <div className="streak-card" style={{ marginBottom: 0 }}>
          <div className="streak-flame">🔥</div>
          <div>
            <div className="streak-n">{streak} days</div>
            <div className="streak-l">Active streak — best yet was 12!</div>
          </div>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-mini"><div className="v">
          {state.units === "imperial" ? Math.round(user.weight * 2.20462) : user.weight}
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{state.units === "imperial" ? "lbs" : "kg"}</span>
        </div><div className="l">Weight</div></div>
        <div className="stat-mini"><div className="v">{bmi.toFixed(1)}</div><div className="l">BMI</div></div>
        <div className="stat-mini"><div className="v">{bmr}</div><div className="l">BMR</div></div>
        <div className="stat-mini"><div className="v">{tdee}</div><div className="l">TDEE</div></div>
      </div>

      {/* Weight trend */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="chart-card">
          <div className="chart-head">
            <div>
              <div className="chart-title">Weight trend</div>
              <div className="chart-sub">
                {weeklyWeights.length < 2 ? (
                  <>No history yet — log your weight to start a trend.</>
                ) : (
                  <>
                    {weeklyWeights[weeklyWeights.length-1] < weeklyWeights[0] ? "▼" : "▲"}{" "}
                    {Math.abs(weeklyWeights[weeklyWeights.length-1] - weeklyWeights[0]).toFixed(1)} kg this week · {weeklyWeights[weeklyWeights.length-1]} kg current
                  </>
                )}
              </div>
            </div>
            <span className="link" style={{ cursor: "pointer" }} onClick={() => setLogWeightOpen(true)}>+ Log weight</span>
          </div>
          <WeightChart data={weeklyWeights} />
        </div>

        <div className="card">
          <div className="chart-head">
            <div>
              <div className="chart-title">Body measurements</div>
              <div className="chart-sub">{measurements.bodyFat}% body fat · tap to update</div>
            </div>
          </div>
          <div className="micro-grid" style={{ marginTop: 10 }}>
            <div className="micro-tile"><span className="l">Waist</span><span className="v">{measurements.waist} cm</span></div>
            <div className="micro-tile"><span className="l">Chest</span><span className="v">{measurements.chest} cm</span></div>
            <div className="micro-tile"><span className="l">Arm</span><span className="v">{measurements.arm} cm</span></div>
            <div className="micro-tile"><span className="l">Thigh</span><span className="v">{measurements.thigh} cm</span></div>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 14, width: "100%" }}
            onClick={() => setEditMeasurements(true)}>+ Update measurements</button>
        </div>
      </div>

      {/* Achievements */}
      <div className="section-title"><h3>Achievements</h3><span className="link">{earnedCount} / {achievements.length} earned</span></div>
      <div className="ach-grid" style={{ marginBottom: 24 }}>
        {achievements.map(a => (
          <div key={a.id} className={"ach-card " + (a.earned ? "earned" : "locked")}
            style={{ cursor: "pointer" }}
            onClick={() => setShowAchievement(a)}>
            <div className="ach-emoji">{a.earned ? a.emoji : "🔒"}</div>
            <div className="ach-title">{a.title}</div>
            <div className="ach-desc">{a.desc}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div>
          <div className="section-title"><h3>Goal</h3><span className="link" style={{ cursor: "pointer" }} onClick={() => setEditGoal(true)}>Edit</span></div>
          <div className="card selectable" onClick={() => setEditGoal(true)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{goalLabel}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                  {customGoal ? `Custom: ${customGoal}` : `Target: ${calcCalorieTarget(user, goal)} kcal/day`}
                </div>
              </div>
              <div className="pill on">{goal === "lose" ? "↓" : goal === "gain" ? "↑" : "="}</div>
            </div>
          </div>

          <div className="section-title"><h3>Subscription</h3></div>
          <div className="card selectable" onClick={() => setManageSub(true)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {subscription.plan === "trial" ? "Free Trial" : subscription.plan === "short" ? "Monthly Plan" : "Annual Plan"}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                  {subscription.plan === "trial" ? `${subscription.daysLeft} days remaining` : "Auto-renews"}
                </div>
              </div>
              <div className="pill">Manage</div>
            </div>
          </div>
        </div>

        <div>
          <div className="section-title"><h3>Connected devices</h3><span className="link" style={{ cursor: "pointer" }} onClick={() => setManageDevices(true)}>Manage</span></div>
          {connectedCount === 0 ? (
            <div className="empty-state" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, cursor: "pointer" }}
              onClick={() => setManageDevices(true)}>
              <div className="e">⌚</div>
              <div className="t">No devices connected</div>
              <div className="d">Tap to connect a wearable.</div>
            </div>
          ) : DEVICES.filter(d => devices[d.id]).map(d => (
            <div key={d.id} className="device-row connected" onClick={() => setManageDevices(true)}>
              <div className="device-icon">{d.letter}</div>
              <div className="device-info">
                <div className="n">{d.name}</div>
                <div className="m" style={{ color: "var(--success)" }}>● Syncing now</div>
              </div>
              <div className="pill on">Active</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setConfirmReset(true)}>Reset onboarding</button>
        <button className="btn btn-ghost btn-sm" onClick={logout}>Log out</button>
      </div>

      {editProfile && (
        <ProfileEditModal
          onClose={() => setEditProfile(false)}
          onSaved={() => setToast("Profile updated")}
        />
      )}

      {logWeightOpen && (
        <LogWeightModal
          state={state}
          onClose={() => setLogWeightOpen(false)}
          onSave={(kg, displayed) => { logWeight(kg); setToast(`Logged ${displayed}`); }}
        />
      )}

      {editMeasurements && (
        <EditFieldModal title="Update measurements"
          fields={[
            { key: "waist", label: "Waist", type: "number", unit: "cm", value: measurements.waist },
            { key: "chest", label: "Chest", type: "number", unit: "cm", value: measurements.chest },
            { key: "arm", label: "Arm", type: "number", unit: "cm", value: measurements.arm },
            { key: "thigh", label: "Thigh", type: "number", unit: "cm", value: measurements.thigh },
            { key: "bodyFat", label: "Body fat", type: "number", unit: "%", value: measurements.bodyFat },
          ]}
          onSave={v => {
            setMeasurements({ waist: +v.waist, chest: +v.chest, arm: +v.arm, thigh: +v.thigh, bodyFat: +v.bodyFat });
            setToast("Measurements saved");
          }}
          onClose={() => setEditMeasurements(false)} />
      )}

      {editGoal && (
        <InfoModal title="Edit your goal" onClose={() => setEditGoal(false)}>
          {GOALS.map(g => (
            <div key={g.id}
              className={"goal-card " + (goal === g.id ? "selected" : "")}
              onClick={() => { setGoal(g.id); setToast("Goal updated"); setEditGoal(false); }}>
              <div className="goal-emoji">{g.emoji}</div>
              <div style={{ flex: 1 }}>
                <div className="goal-title">{g.title}</div>
                <div className="goal-desc">{g.desc}</div>
              </div>
            </div>
          ))}
          <div className="input-group" style={{ marginTop: 14 }}>
            <label>Custom goal (optional)</label>
            <div className="field">
              <input value={customGoal || ""} placeholder="e.g. Train for a marathon"
                onChange={e => setState(s => ({ ...s, customGoal: e.target.value }))} />
            </div>
          </div>
        </InfoModal>
      )}

      {manageSub && (
        <InfoModal title="Manage subscription" onClose={() => setManageSub(false)}>
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>
              Current: {subscription.plan === "trial" ? "Free Trial" : subscription.plan === "short" ? "Monthly Plan" : "Annual Plan"}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
              {subscription.plan === "trial" ? `${subscription.daysLeft} days remaining, then $9.99/mo` :
               subscription.plan === "short" ? "$6.99/month, auto-renews monthly" :
               "$59/year ($4.99/mo), auto-renews yearly"}
            </div>
          </div>
          <div className="label" style={{ marginBottom: 8 }}>Switch plan</div>
          {PLANS.map(p => (
            <div key={p.id}
              className={"plan-card " + (subscription.plan === p.id ? "selected " : "") + (p.highlight ? "highlight" : "")}
              onClick={() => {
                setState(s => ({ ...s, subscription: { plan: p.id, active: true, daysLeft: p.id === "trial" ? 7 : 0 } }));
                setToast("Plan changed");
                setManageSub(false);
              }}>
              <div className="plan-head">
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">{p.price}</div>
              </div>
              <div className="plan-desc">{p.desc}</div>
            </div>
          ))}
          <button className="btn btn-ghost" style={{ marginTop: 10 }}
            onClick={() => {
              setState(s => ({ ...s, subscription: { plan: "trial", active: false, daysLeft: 0 } }));
              setToast("Subscription cancelled");
              setManageSub(false);
            }}>Cancel subscription</button>
        </InfoModal>
      )}

      {manageDevices && (
        <InfoModal title="Connected devices" onClose={() => setManageDevices(false)}>
          {DEVICES.map(d => (
            <div key={d.id}
              className={"device-row " + (devices[d.id] ? "connected" : "")}
              onClick={() => setDevices({ ...devices, [d.id]: !devices[d.id] })}>
              <div className="device-icon">{d.letter}</div>
              <div className="device-info">
                <div className="n">{d.name}</div>
                <div className="m">{d.meta}</div>
              </div>
              <div className={"pill " + (devices[d.id] ? "on" : "")}>
                {devices[d.id] ? "Connected" : "Connect"}
              </div>
            </div>
          ))}
        </InfoModal>
      )}

      {showAchievement && (
        <InfoModal title={showAchievement.title} onClose={() => setShowAchievement(null)}>
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 12 }}>{showAchievement.earned ? showAchievement.emoji : "🔒"}</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{showAchievement.title}</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 6 }}>{showAchievement.desc}</div>
            <div style={{ marginTop: 14, padding: "8px 14px", borderRadius: 999, display: "inline-block",
              background: showAchievement.earned ? "var(--accent)" : "var(--surface-2)",
              color: showAchievement.earned ? "var(--accent-contrast)" : "var(--text-muted)",
              fontSize: 12, fontWeight: 700 }}>
              {showAchievement.earned ? "✓ Earned" : "Locked"}
            </div>
          </div>
        </InfoModal>
      )}

      {confirmReset && (
        <ConfirmModal title="Reset onboarding?"
          body="You'll go through the device, stats, goals, and subscription steps again. Your other data stays."
          confirmLabel="Reset"
          onConfirm={() => { resetOnboarding(); setToast("Onboarding reset"); }}
          onClose={() => setConfirmReset(false)} />
      )}

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

/* ============================================================
   SETTINGS
============================================================ */
function SettingsScreen() {
  const { state, setTheme, setState, setNotifications, setReminderTimes, setUnits, logout, setUser, changeEmail, changePassword, deleteAccount } = useApp();
  const { mode, accentOn, intensity } = state.theme;
  const { notifications, reminderTimes, units, auth } = state;

  const [editEmail, setEditEmail] = useState(false);
  const [editName, setEditName] = useState(false);
  const [changePw, setChangePw] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmClearAccts, setConfirmClearAccts] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [toast, setToast] = useState(null);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "santex-data.json"; a.click();
    URL.revokeObjectURL(url);
    setToast("Data exported");
  };

  return (
    <div className="fade-in content" key="settings">
      <div className="page-head">
        <div>
          <h1 className="h1">Settings</h1>
          <p className="sub">Customize how Santéx looks, notifies you, and stores your data.</p>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <div className="label" style={{ marginBottom: 8 }}>Account</div>
          <div className="settings-group">
            <div className="settings-row" onClick={() => !auth.isGuest && setEditEmail(true)} style={{ cursor: auth.isGuest ? "default" : "pointer" }}>
              <div>
                <div className="lbl">Email</div>
                <div className="desc">{auth.isGuest ? "Guest mode (data stays on this device)" : auth.email || "—"}</div>
              </div>
              {!auth.isGuest && <span style={{ color: "var(--text-soft)" }}>›</span>}
            </div>
            <div className="settings-row" onClick={() => setEditName(true)}>
              <div>
                <div className="lbl">Display name</div>
                <div className="desc">{state.user.name}</div>
              </div>
              <span style={{ color: "var(--text-soft)" }}>›</span>
            </div>
            {!auth.isGuest && (
              <div className="settings-row" onClick={() => setChangePw(true)}>
                <div>
                  <div className="lbl">Change password</div>
                  <div className="desc">Update your sign-in password</div>
                </div>
                <span style={{ color: "var(--text-soft)" }}>›</span>
              </div>
            )}
            <div className="settings-row" onClick={logout}>
              <div>
                <div className="lbl">Sign out</div>
                <div className="desc">Return to the login screen</div>
              </div>
              <span style={{ color: "var(--text-soft)" }}>›</span>
            </div>
          </div>

          <div className="label" style={{ marginBottom: 8 }}>Appearance</div>
          <div className="settings-group">
            <div className="settings-row">
              <div>
                <div className="lbl">Theme</div>
                <div className="desc">Light by default — switch to black anytime</div>
              </div>
              <div className="segmented">
                <button className={mode === "light" ? "active" : ""} onClick={() => setTheme({ mode: "light" })}>Light</button>
                <button className={mode === "dark" ? "active" : ""} onClick={() => setTheme({ mode: "dark" })}>Black</button>
              </div>
            </div>
          </div>

          <div className="label" style={{ marginBottom: 8 }}>Units</div>
          <div className="settings-group">
            <div className="settings-row">
              <div>
                <div className="lbl">Measurement system</div>
                <div className="desc">Affects weight, height & distance</div>
              </div>
              <div className="segmented">
                <button className={units === "metric" ? "active" : ""} onClick={() => { setUnits("metric"); setToast("Switched to metric"); }}>Metric</button>
                <button className={units === "imperial" ? "active" : ""} onClick={() => { setUnits("imperial"); setToast("Switched to imperial"); }}>Imperial</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="label" style={{ marginBottom: 8 }}>Notifications</div>
          <div className="settings-group">
            <div className="settings-row">
              <div>
                <div className="lbl">Meal reminders</div>
                <div className="desc">Nudge you to log your meals</div>
              </div>
              <div className={"switch " + (notifications.meals ? "on" : "")}
                onClick={() => setNotifications({ meals: !notifications.meals })} />
            </div>
            <div className="settings-row">
              <div>
                <div className="lbl">Water reminders</div>
                <div className="desc">Periodic hydration nudges</div>
              </div>
              <div className={"switch " + (notifications.water ? "on" : "")}
                onClick={() => setNotifications({ water: !notifications.water })} />
            </div>
            <div className="settings-row">
              <div>
                <div className="lbl">Workout reminders</div>
                <div className="desc">Daily move prompts</div>
              </div>
              <div className={"switch " + (notifications.workouts ? "on" : "")}
                onClick={() => setNotifications({ workouts: !notifications.workouts })} />
            </div>
            <div className="settings-row">
              <div>
                <div className="lbl">Weekly report</div>
                <div className="desc">Sunday summary email</div>
              </div>
              <div className={"switch " + (notifications.weeklyReport ? "on" : "")}
                onClick={() => setNotifications({ weeklyReport: !notifications.weeklyReport })} />
            </div>
          </div>

          <div className="label" style={{ marginBottom: 8 }}>Meal reminder times</div>
          <div className="settings-group">
            {Object.entries(reminderTimes).map(([key, val]) => (
              <div key={key} className="settings-row">
                <div>
                  <div className="lbl" style={{ textTransform: "capitalize" }}>{key}</div>
                  <div className="desc">Daily reminder at this time</div>
                </div>
                <input type="time" value={val} onChange={e => setReminderTimes({ [key]: e.target.value })}
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)", padding: "6px 10px", borderRadius: 8, color: "var(--text)", fontFamily: "inherit", fontSize: 13 }} />
              </div>
            ))}
          </div>

          <div className="label" style={{ marginBottom: 8 }}>Privacy & Data</div>
          <div className="settings-group">
            <div className="settings-row" onClick={exportData}>
              <div>
                <div className="lbl">Export my data</div>
                <div className="desc">Download a JSON snapshot</div>
              </div>
              <span style={{ color: "var(--text-soft)" }}>›</span>
            </div>
            <div className="settings-row" onClick={() => setConfirmClearAccts(true)}>
              <div>
                <div className="lbl">Clear local accounts</div>
                <div className="desc">Remove all stored sign-ups on this device</div>
              </div>
              <span style={{ color: "var(--text-soft)" }}>›</span>
            </div>
            <div className="settings-row" onClick={() => setConfirmReset(true)}>
              <div>
                <div className="lbl" style={{ color: "var(--warn)" }}>Reset app data</div>
                <div className="desc">Clear local storage and restart</div>
              </div>
              <span style={{ color: "var(--text-soft)" }}>›</span>
            </div>
            <div className="settings-row" onClick={() => setConfirmDelete(true)}>
              <div>
                <div className="lbl" style={{ color: "var(--danger)" }}>Delete account</div>
                <div className="desc">Permanently remove your account & data</div>
              </div>
              <span style={{ color: "var(--danger)" }}>›</span>
            </div>
          </div>

          <div className="label" style={{ marginBottom: 8 }}>About</div>
          <div className="settings-group">
            <div className="settings-row">
              <div>
                <div className="lbl">Version</div>
                <div className="desc">Santéx v{APP_VERSION} (web)</div>
              </div>
            </div>
            <div className="settings-row" onClick={() => setShowHelp(true)}>
              <div>
                <div className="lbl">Help & feedback</div>
                <div className="desc">{CONTACT_EMAIL}</div>
              </div>
              <span style={{ color: "var(--text-soft)" }}>›</span>
            </div>
            <div className="settings-row" onClick={() => setShowTerms(true)}>
              <div>
                <div className="lbl">Terms & Privacy</div>
                <div className="desc">Last updated 2026</div>
              </div>
              <span style={{ color: "var(--text-soft)" }}>›</span>
            </div>
            <div className="settings-row" onClick={() => { window.location.href = `mailto:${CONTACT_EMAIL}?subject=Santéx feedback`; }}>
              <div>
                <div className="lbl">Contact us</div>
                <div className="desc">Email the founders directly</div>
              </div>
              <span style={{ color: "var(--text-soft)" }}>›</span>
            </div>
          </div>
        </div>
      </div>

      {editEmail && (
        <EditFieldModal title="Change email"
          fields={[{ key: "email", label: "New email", type: "email", value: auth.email }]}
          onSave={v => {
            const e = (v.email || "").trim();
            if (!e || !e.includes("@")) return { error: "Enter a valid email." };
            const r = changeEmail(e);
            if (!r.ok) return { error: r.error };
            setToast("Email updated");
          }}
          onClose={() => setEditEmail(false)} />
      )}
      {editName && (
        <EditFieldModal title="Change display name"
          fields={[{ key: "name", label: "Display name", value: state.user.name }]}
          onSave={v => {
            if (!v.name.trim()) return { error: "Name is required." };
            setUser({ name: v.name.trim() });
            setToast("Name updated");
          }}
          onClose={() => setEditName(false)} />
      )}
      {changePw && (
        <EditFieldModal title="Change password"
          fields={[
            { key: "old", label: "Current password", type: "password", placeholder: "current password" },
            { key: "new", label: "New password", type: "password", placeholder: "6+ characters" },
            { key: "confirm", label: "Confirm new password", type: "password", placeholder: "repeat new password" },
          ]}
          onSave={v => {
            if (v.new !== v.confirm) return { error: "New passwords don't match." };
            const r = changePassword(v.old, v.new);
            if (!r.ok) return { error: r.error };
            setToast("Password changed");
          }}
          onClose={() => setChangePw(false)} />
      )}
      {confirmReset && (
        <ConfirmModal title="Reset app data?"
          body="All meals, workouts, weight history and settings on this device will be cleared. Your stored account is preserved."
          danger confirmLabel="Reset"
          onConfirm={() => {
            localStorage.removeItem(STORAGE_KEY);
            setState(defaultState);
            setToast("App data reset");
          }}
          onClose={() => setConfirmReset(false)} />
      )}
      {confirmClearAccts && (
        <ConfirmModal title="Clear all local accounts?"
          body="This deletes every saved sign-up on this device. You'll need to sign up again."
          danger confirmLabel="Clear accounts"
          onConfirm={() => { localStorage.removeItem(ACCOUNTS_KEY); setToast("Accounts cleared"); }}
          onClose={() => setConfirmClearAccts(false)} />
      )}
      {confirmDelete && (
        <ConfirmModal title="Delete account permanently?"
          body={auth.isGuest ?
            "This will erase all your guest data on this device. There is no undo." :
            `Your account (${auth.email}) and all data will be permanently removed. There is no undo.`}
          danger confirmLabel="Delete account"
          onConfirm={() => { deleteAccount(); }}
          onClose={() => setConfirmDelete(false)} />
      )}
      {showTerms && (
        <InfoModal title="Terms & Privacy" onClose={() => setShowTerms(false)}>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)" }}>
            <p><b style={{ color: "var(--text)" }}>Demo terms.</b> Santéx is currently in private preview. Your account, foods, and health data are stored locally in your browser only. We don't transmit any of it to a remote server in this build.</p>
            <p style={{ marginTop: 10 }}>By using Santéx you agree to use the app for personal wellness tracking only and acknowledge that information here is not medical advice.</p>
            <p style={{ marginTop: 10 }}>Questions? Email us at <a style={{ color: "var(--accent-strong)", fontWeight: 600 }} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
            <p style={{ marginTop: 10, fontSize: 11, color: "var(--text-soft)" }}>Last updated: 2026</p>
          </div>
        </InfoModal>
      )}
      {showHelp && (
        <InfoModal title="Help & feedback" onClose={() => setShowHelp(false)}>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)" }}>
            <p>We'd love to hear from you. Whether you're hitting a bug, want a new feature, or have something to say about your experience — just drop us a line.</p>
            <div className="card" style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: 0.06, fontWeight: 700 }}>Email</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{CONTACT_EMAIL}</div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button className="btn btn-primary" style={{ flex: 1 }}
                onClick={() => { window.location.href = `mailto:${CONTACT_EMAIL}?subject=Santéx feedback`; }}>
                Email us
              </button>
              <button className="btn btn-ghost" style={{ flex: 1 }}
                onClick={() => { navigator.clipboard.writeText(CONTACT_EMAIL); setToast("Email copied"); }}>
                Copy email
              </button>
            </div>
          </div>
        </InfoModal>
      )}
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

/* ============================================================
   GENERIC MODALS — confirm, edit, info
============================================================ */
// Friendly profile editor: dual ft/in for height in imperial mode,
// inline unit toggle, free-text inputs so typing never fights the user.
function ProfileEditModal({ onClose, onSaved }) {
  const { state, setUser, setUnits } = useApp();
  const units = state.units || "imperial";
  const u = state.user || {};
  const initImperialWeight = u.weight ? String(Math.round(u.weight * 2.20462)) : "";
  const initMetricWeight   = u.weight ? String(Math.round(u.weight * 10) / 10) : "";
  const initTotalIn = u.height ? Math.round(u.height / 2.54) : 0;
  const [name, setName]     = useState(u.name || "");
  const [ageStr, setAgeStr] = useState(u.age ? String(u.age) : "");
  const [weightStr, setWeightStr] = useState(units === "imperial" ? initImperialWeight : initMetricWeight);
  const [cmStr, setCmStr]   = useState(u.height ? String(Math.round(u.height)) : "");
  const [ftStr, setFtStr]   = useState(initTotalIn ? String(Math.floor(initTotalIn / 12)) : "");
  const [inStr, setInStr]   = useState(initTotalIn ? String(initTotalIn % 12) : "");
  const [error, setError]   = useState("");

  const switchUnits = (target) => {
    if (target === units) return;
    const w = parseFloat(weightStr);
    if (!isNaN(w)) {
      setWeightStr(target === "imperial"
        ? String(Math.round(w * 2.20462))
        : String(Math.round(w / 2.20462)));
    }
    if (target === "metric") {
      const f = parseFloat(ftStr) || 0;
      const i = parseFloat(inStr) || 0;
      if (f || i) setCmStr(String(Math.round((f * 12 + i) * 2.54)));
    } else {
      const c = parseFloat(cmStr);
      if (!isNaN(c) && c > 0) {
        const totalIn = Math.round(c / 2.54);
        setFtStr(String(Math.floor(totalIn / 12)));
        setInStr(String(totalIn % 12));
      }
    }
    setUnits(target);
  };

  const submit = () => {
    if (!name.trim()) return setError("Name is required.");
    const a = parseInt(ageStr);
    if (!a || a < 13 || a > 100) return setError("Enter a valid age (13–100).");
    const w = parseFloat(weightStr);
    if (isNaN(w) || w <= 0) return setError("Enter your weight.");
    const kg = units === "imperial" ? w / 2.20462 : w;
    if (kg < 30 || kg > 250) return setError(units === "imperial"
      ? "Weight must be 66–550 lbs." : "Weight must be 30–250 kg.");
    let cm;
    if (units === "imperial") {
      const f = parseFloat(ftStr) || 0;
      const i = parseFloat(inStr) || 0;
      if (!f && !i) return setError("Enter your height.");
      cm = (f * 12 + i) * 2.54;
    } else {
      cm = parseFloat(cmStr);
    }
    if (!cm || cm < 100 || cm > 230) return setError(units === "imperial"
      ? "Height must be 3'4\" – 7'6\"." : "Height must be 100–230 cm.");
    setUser({
      name: name.trim(),
      age: a,
      weight: Math.round(kg * 10) / 10,
      height: Math.round(cm),
    });
    onSaved && onSaved();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Edit profile</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {/* Unit toggle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span className="label">Units</span>
            <div className="segmented">
              <button className={units === "imperial" ? "active" : ""} onClick={() => switchUnits("imperial")}>Imperial</button>
              <button className={units === "metric" ? "active" : ""} onClick={() => switchUnits("metric")}>Metric</button>
            </div>
          </div>

          <div className="input-group">
            <label>Display name</label>
            <div className="field"><input value={name} onChange={(e) => setName(e.target.value)} /></div>
          </div>

          <div className="input-group">
            <label>Age</label>
            <div className="field">
              <input type="text" inputMode="numeric" value={ageStr}
                onChange={(e) => setAgeStr(e.target.value.replace(/[^\d]/g, ""))} />
              <span className="unit">years</span>
            </div>
          </div>

          <div className="input-group">
            <label>Height</label>
            {units === "imperial" ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="field">
                  <input type="text" inputMode="numeric" placeholder="5"
                    value={ftStr}
                    onChange={(e) => setFtStr(e.target.value.replace(/[^\d]/g, ""))} />
                  <span className="unit">ft</span>
                </div>
                <div className="field">
                  <input type="text" inputMode="numeric" placeholder="9"
                    value={inStr}
                    onChange={(e) => setInStr(e.target.value.replace(/[^\d]/g, ""))} />
                  <span className="unit">in</span>
                </div>
              </div>
            ) : (
              <div className="field">
                <input type="text" inputMode="numeric" placeholder="175"
                  value={cmStr}
                  onChange={(e) => setCmStr(e.target.value.replace(/[^\d.]/g, ""))} />
                <span className="unit">cm</span>
              </div>
            )}
          </div>

          <div className="input-group">
            <label>Weight</label>
            <div className="field">
              <input type="text" inputMode="decimal"
                placeholder={units === "imperial" ? "165" : "75"}
                value={weightStr}
                onChange={(e) => setWeightStr(e.target.value.replace(/[^\d.]/g, ""))} />
              <span className="unit">{units === "imperial" ? "lbs" : "kg"}</span>
            </div>
          </div>

          {error && (
            <div style={{ fontSize: 12, padding: "8px 12px", borderRadius: 8,
              background: "rgba(248,113,113,0.12)", color: "var(--danger)",
              fontWeight: 600, marginBottom: 10 }}>{error}</div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={submit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Log-weight modal with unit toggle + free-text input.
function LogWeightModal({ onClose, onSave }) {
  const { state, setUnits } = useApp();
  const units = state.units || "imperial";
  const u = state.user || {};
  const initStr = u.weight
    ? String(units === "imperial" ? Math.round(u.weight * 2.20462) : Math.round(u.weight * 10) / 10)
    : "";
  const [str, setStr] = useState(initStr);
  const [error, setError] = useState("");
  const switchUnits = (target) => {
    if (target === units) return;
    const w = parseFloat(str);
    if (!isNaN(w)) {
      setStr(target === "imperial"
        ? String(Math.round(w * 2.20462))
        : String(Math.round(w / 2.20462)));
    }
    setUnits(target);
  };
  const submit = () => {
    const w = parseFloat(str);
    if (isNaN(w) || w <= 0) return setError("Enter your weight.");
    const kg = units === "imperial" ? w / 2.20462 : w;
    if (kg < 30 || kg > 250) return setError(units === "imperial" ? "Weight must be 66–550 lbs." : "Weight must be 30–250 kg.");
    onSave(Math.round(kg * 10) / 10, `${w} ${units === "imperial" ? "lbs" : "kg"}`);
    onClose();
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Log weight</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span className="label">Units</span>
            <div className="segmented">
              <button className={units === "imperial" ? "active" : ""} onClick={() => switchUnits("imperial")}>Imperial</button>
              <button className={units === "metric" ? "active" : ""} onClick={() => switchUnits("metric")}>Metric</button>
            </div>
          </div>
          <div className="input-group">
            <label>Today's weight</label>
            <div className="field">
              <input type="text" inputMode="decimal" autoFocus
                value={str}
                onChange={(e) => setStr(e.target.value.replace(/[^\d.]/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && submit()} />
              <span className="unit">{units === "imperial" ? "lbs" : "kg"}</span>
            </div>
          </div>
          {error && (
            <div style={{ fontSize: 12, padding: "8px 12px", borderRadius: 8,
              background: "rgba(248,113,113,0.12)", color: "var(--danger)",
              fontWeight: 600, marginBottom: 10 }}>{error}</div>
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" style={{ flex: 2 }} onClick={submit}>Log</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ title, body, danger, confirmLabel, onConfirm, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5 }}>{body}</p>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" style={{ flex: 1, background: danger ? "var(--danger)" : "var(--accent)" }}
              onClick={() => { onConfirm(); onClose(); }}>{confirmLabel || "Confirm"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditFieldModal({ title, fields, onSave, onClose }) {
  const [vals, setVals] = useState(() => {
    const o = {};
    fields.forEach(f => o[f.key] = f.value ?? "");
    return o;
  });
  const [err, setErr] = useState("");
  const submit = () => {
    const result = onSave(vals);
    if (result && result.error) { setErr(result.error); return; }
    onClose();
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 460 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {fields.map(f => (
            <div className="input-group" key={f.key}>
              <label>{f.label}</label>
              <div className="field">
                <input type={f.type || "text"} value={vals[f.key]}
                  placeholder={f.placeholder || ""} autoFocus={f === fields[0]}
                  onChange={e => setVals(v => ({ ...v, [f.key]: e.target.value }))}
                  onKeyDown={e => e.key === "Enter" && submit()} />
                {f.unit && <span className="unit">{f.unit}</span>}
              </div>
            </div>
          ))}
          {err && <div style={{ fontSize: 12, padding: "8px 12px", borderRadius: 8, background: "rgba(248,113,113,0.12)", color: "var(--danger)", fontWeight: 600, marginBottom: 10 }}>{err}</div>}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={submit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoModal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 2400); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: "var(--accent)", color: "var(--accent-contrast)",
      padding: "12px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600,
      zIndex: 200, boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      animation: "slideUp 320ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards"
    }}>{msg}</div>
  );
}

/* ============================================================
   AUTH SCREEN
============================================================ */
function AuthScreen() {
  const { login, signup, continueAsGuest, authMessage, setAuthMessage } = useApp();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const className = useThemeClasses();

  useEffect(() => {
    if (authMessage && authMessage.type === "ok") {
      const t = setTimeout(() => setAuthMessage(null), 1500);
      return () => clearTimeout(t);
    }
  }, [authMessage]);

  const submit = () => {
    setAuthMessage(null);
    if (!email.trim() || !password.trim()) {
      setAuthMessage({ type: "error", text: "Email and password are required." });
      return;
    }
    if (mode === "login") login(email.trim(), password);
    else {
      if (!name.trim()) { setAuthMessage({ type: "error", text: "Name is required." }); return; }
      if (password.length < 6) { setAuthMessage({ type: "error", text: "Password must be 6+ characters." }); return; }
      signup(name.trim(), email.trim(), password);
    }
  };

  return (
    <div className={"auth-page " + className}>
      <div className="auth-card fade-in">
        <div className="auth-logo">
          <div className="auth-logo-mark">S</div>
          <div className="auth-logo-text">Santéx</div>
        </div>
        <h1 className="h1" style={{ textAlign: "center", marginBottom: 6 }}>
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="sub" style={{ textAlign: "center", marginBottom: 22 }}>
          {mode === "login" ? "Sign in to keep your progress synced." : "Start tracking your health journey today."}
        </p>

        <div className="auth-tabs">
          <button className={mode === "login" ? "active" : ""} onClick={() => { setMode("login"); setAuthMessage(null); }}>Log in</button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setAuthMessage(null); }}>Sign up</button>
        </div>

        {mode === "signup" && (
          <div className="input-group">
            <label>Full name</label>
            <div className="field"><input value={name} onChange={e => setName(e.target.value)} placeholder="Alex Smith" /></div>
          </div>
        )}
        <d
iv className="input-group">
          <label>Email</label>
          <div className="field"><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
        </div>
        <div className="input-group">
          <label>Password</label>
          <div className="field">
            <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              onKeyDown={e => e.key === "Enter" && submit()} />
            <span className="unit" style={{ cursor: "pointer" }} onClick={() => setShowPw(s => !s)}>{showPw ? "Hide" : "Show"}</span>
          </div>
        </div>

        {authMessage && (
          <div style={{
            fontSize: 12, padding: "10px 12px", borderRadius: 10, marginBottom: 12,
            background: authMessage.type === "error" ? "rgba(248,113,113,0.12)" : "var(--accent-soft)",
            color: authMessage.type === "error" ? "var(--danger)" : "var(--accent-strong)",
            fontWeight: 600
          }}>{authMessage.text}</div>
        )}

        <button className="btn btn-primary" onClick={submit}>
          {mode === "login" ? "Log in" : "Create account"}
        </button>

        <div className="auth-divider">OR</div>
        <div className="social-row">
          <button className="social-btn" onClick={continueAsGuest}>👤 Guest</button>
          <button className="social-btn" onClick={continueAsGuest}>🔗 SSO (demo)</button>
        </div>

        <div className="auth-foot">
          {mode === "login" ? <>New to Santéx? <a onClick={() => setMode("signup")}>Create an account</a></> :
            <>Already have an account? <a onClick={() => setMode("login")}>Log in</a></>}
          <br /><span style={{ fontSize: 10, opacity: 0.6 }}>Demo only — accounts stored locally on this device.</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   AI INGREDIENT ANALYSIS — simulated
============================================================ */
function generateAIInsight(food) {
  const protein = Math.round((food.p * 4) / food.kcal * 100);
  const fat = Math.round((food.f * 9) / food.kcal * 100);
  const carbs = Math.round((food.c * 4) / food.kcal * 100);
  const lines = [];
  lines.push(`This ${food.name.toLowerCase()} is roughly ${protein}% protein, ${carbs}% carbs, and ${fat}% fat by calories.`);
  const veggies = food.ingredients.filter(i => i.role === "vegetable").length;
  if (veggies >= 2) lines.push(`I detected ${veggies} vegetable components — a strong source of fiber and micronutrients.`);
  const proteinSrc = food.ingredients.find(i => i.role === "protein");
  if (proteinSrc) lines.push(`The main protein source is ${proteinSrc.name.toLowerCase()} (${proteinSrc.qty}), providing the bulk of your ${food.p}g protein.`);
  if (food.sodium > 800) lines.push(`⚠️ Sodium is on the higher side at ${food.sodium}mg — consider pairing with low-sodium options the rest of the day.`);
  if (food.fiber >= 7) lines.push(`Excellent fiber content (${food.fiber}g) — supports satiety and gut health.`);
  if (food.cholesterol > 200) lines.push(`Cholesterol is notable (${food.cholesterol}mg) — fine occasionally, watch overall daily intake.`);
  if (food.allergens && food.allergens.length) lines.push(`Contains common allergens: ${food.allergens.join(", ")}.`);
  return lines;
}

function FoodDetailModal() {
  const { selectedFood, setSelectedFood, addMealEntry, state, toggleFavorite, setState } = useApp();
  const [tab, setTab] = useState("overview");
  const [aiReady, setAiReady] = useState(false);
  const [aiLines, setAiLines] = useState([]);
  const [logTo, setLogTo] = useState("lunch");

  // Real nearby-store fetch (Overpass / OpenStreetMap). Cached per location.
  const [nearby, setNearby] = useState({ status: "idle", stores: [], error: "" });

  useEffect(() => {
    if (!selectedFood) return;
    setTab("overview"); setAiReady(false); setAiLines([]);
    const t = setTimeout(() => {
      setAiLines(generateAIInsight(selectedFood));
      setAiReady(true);
    }, 1100);
    return () => clearTimeout(t);
  }, [selectedFood]);

  // Fetch nearby stores the first time the user opens the "Where to Buy" tab
  // and location is granted. Re-fetches if location changes.
  useEffect(() => {
    if (tab !== "stores") return;
    if (state.locationStatus !== "granted" || !state.location) return;
    if (nearby.status === "loading" || nearby.status === "ok") return;
    let cancelled = false;
    setNearby({ status: "loading", stores: [], error: "" });
    fetchNearbyStoresOSM(state.location.lat, state.location.lng)
      .then((stores) => { if (!cancelled) setNearby({ status: "ok", stores, error: "" }); })
      .catch((e) => { if (!cancelled) setNearby({ status: "error", stores: [], error: e.message || "Failed to fetch" }); });
    return () => { cancelled = true; };
  }, [tab, state.locationStatus, state.location && state.location.lat, state.location && state.location.lng]);

  if (!selectedFood) return null;
  const f = selectedFood;
  const isFav = state.favorites.includes(f.id);

  const handleLog = () => {
    addMealEntry(logTo, { name: f.name, kcal: f.kcal, p: f.p, c: f.c, f: f.f });
    setSelectedFood(null);
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedFood(null)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>{f.name}</h2>
          <button className="modal-close" onClick={() => toggleFavorite(f.id)} title="Save to favorites" style={{ color: isFav ? "var(--accent-strong)" : "var(--text-muted)" }}>
            {isFav ? "★" : "☆"}
          </button>
          <button className="modal-close" onClick={() => setSelectedFood(null)}>×</button>
        </div>

        <div className="modal-body">
          <div className="modal-hero">
            <div className="modal-hero-emoji">{f.emoji}</div>
            <div style={{ flex: 1 }}>
              <h2>{f.name}</h2>
              <div className="meta">{f.cuisine} · {f.prepTime} min</div>
              <div className="price">${f.price.toFixed(2)}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                {f.tags.map(t => <span key={t} className="macro-chip">{t}</span>)}
              </div>
            </div>
          </div>

          <div className="tab-bar">
            <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>Overview</button>
            <button className={tab === "ingredients" ? "active" : ""} onClick={() => setTab("ingredients")}>Ingredients</button>
            <button className={tab === "ai" ? "active" : ""} onClick={() => setTab("ai")}>AI Insights</button>
            <button className={tab === "stores" ? "active" : ""} onClick={() => setTab("stores")}>Where to Buy</button>
            <button className={tab === "alts" ? "active" : ""} onClick={() => setTab("alts")}>Alternatives</button>
          </div>

          {tab === "overview" && (
            <div>
              <div className="label" style={{ marginBottom: 8 }}>Macros</div>
              <div className="macro-grid-4">
                <div className="macro-tile"><div className="v">{f.kcal}</div><div className="l">kcal</div></div>
                <div className="macro-tile"><div className="v">{f.p}g</div><div className="l">Protein</div></div>
                <div className="macro-tile"><div className="v">{f.c}g</div><div className="l">Carbs</div></div>
                <div className="macro-tile"><div className="v">{f.f}g</div><div className="l">Fats</div></div>
              </div>
              <div className="label" style={{ marginTop: 18, marginBottom: 8 }}>Other nutrition</div>
              <div className="micro-grid">
                <div className="micro-tile"><span className="l">Fiber</span><span className="v">{f.fiber}g</span></div>
                <div className="micro-tile"><span className="l">Sugar</span><span className="v">{f.sugar}g</span></div>
                <div className="micro-tile"><span className="l">Sodium</span><span className="v">{f.sodium}mg</span></div>
                <div className="micro-tile"><span className="l">Cholesterol</span><span className="v">{f.cholesterol}mg</span></div>
                <div className="micro-tile"><span className="l">Sat. Fat</span><span className="v">{f.satFat}g</span></div>
                <div className="micro-tile"><span className="l">Health Score</span><span className="v" style={{ color: "var(--accent-strong)" }}>{f.health}/100</span></div>
              </div>
              <div className="label" style={{ marginTop: 18, marginBottom: 8 }}>Vitamins & minerals (% DV)</div>
              <div className="micro-grid">
                {Object.entries(f.micros).map(([k, v]) => (
                  <div key={k} className="micro-tile"><span className="l">{k}</span><span className="v">{v}</span></div>
                ))}
              </div>
              {f.allergens && f.allergens.length > 0 && (
                <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--warn)", letterSpacing: 0.06, textTransform: "uppercase" }}>⚠ Allergens</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>Contains: {f.allergens.join(", ")}</div>
                </div>
              )}
            </div>
          )}

          {tab === "ingredients" && (
            <div>
              <div className="label" style={{ marginBottom: 8 }}>{f.ingredients.length} ingredients</div>
              {f.ingredients.map((ing, i) => (
                <div key={i} className="ingredient-row">
                  <div className="ingredient-icon">{ing.emoji}</div>
                  <div className="ingredient-info">
                    <div className="ingredient-name">{ing.name}</div>
                    <div className="ingredient-qty">{ing.qty} · {ing.role}</div>
                  </div>
                  <div className="ingredient-kcal">{ing.kcal} kcal</div>
                </div>
              ))}
            </div>
          )}

          {tab === "ai" && (
            <div>
              <div className="ai-card">
                <div className="ai-head">
                  <div className="ai-badge">✨ AI</div>
                  <div className="ai-title">Ingredient Analysis</div>
                </div>
                {!aiReady ? (
                  <div className="ai-loading">
                    <span className="ai-dot"></span><span className="ai-dot"></span><span className="ai-dot"></span>
                    <span>Analyzing dish composition...</span>
                  </div>
                ) : (
                  <div>
                    {aiLines.map((line, i) => (
                      <div key={i} className="ai-text" style={{ marginBottom: 8 }}>{line}</div>
                    ))}
                  </div>
                )}
              </div>
              {aiReady && (
                <>
                  <div className="label" style={{ marginBottom: 8 }}>Detected ingredients</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                    {f.ingredients.map((ing, i) => (
                      <span key={i} className="macro-chip" style={{ fontSize: 11 }}>
                        {ing.emoji} {ing.name} <span style={{ opacity: 0.6 }}>· {Math.floor(85 + Math.random() * 14)}%</span>
                      </span>
                    ))}
                  </div>
                  <div className="label" style={{ marginBottom: 8 }}>Goal fit for you</div>
                  <div style={{ padding: 14, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: 13 }}>
                      Based on your <b>{state.goal}</b> goal, this dish scores <b style={{ color: "var(--accent-strong)" }}>{macroMatchScore(f, state.goal)}/100</b> for goal match.
                      It contributes about <b>{Math.round(f.kcal / macroTargets(state.user, state.goal).kcal * 100)}%</b> of your daily kcal target.
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {tab === "stores" && (() => {
            const hasLoc = state.locationStatus === "granted" && state.location;
            const openDirections = (s) => {
              const url = directionsUrl(state.location, s);
              window.open(url, "_blank", "noopener,noreferrer");
            };

            // ---- Location not granted: honest CTA, no fake stores ----
            if (!hasLoc) {
              const requestNow = () => {
                if (!navigator.geolocation) return;
                navigator.geolocation.getCurrentPosition(
                  (pos) => setState(s => ({
                    ...s,
                    locationStatus: "granted",
                    location: { lat: pos.coords.latitude, lng: pos.coords.longitude, ts: Date.now() }
                  })),
                  () => setState(s => ({ ...s, locationStatus: "denied" }))
                );
              };
              return (
                <div className="empty-state" style={{ padding: "32px 16px" }}>
                  <div className="e" style={{ fontSize: 44 }}>📍</div>
                  <div className="t" style={{ fontSize: 15 }}>Location required</div>
                  <div className="d" style={{ maxWidth: 360, margin: "8px auto 18px" }}>
                    Enable location to see real grocery stores near you (powered by OpenStreetMap) and get driving directions to any of them.
                  </div>
                  <button className="btn btn-primary" style={{ maxWidth: 240, margin: "0 auto" }}
                    onClick={requestNow}>
                    Enable location
                  </button>
                </div>
              );
            }

            // ---- Location granted: real OSM stores ----
            return (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span className="label">Real grocery stores near you</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999,
                    background: "var(--accent-soft)", color: "var(--accent-strong)",
                    letterSpacing: 0.06, textTransform: "uppercase",
                    display: "inline-flex", alignItems: "center", gap: 4
                  }}> Live · OpenStreetMap</span>
                </div>

                {nearby.status === "loading" && (
                  <div style={{ padding: "24px 14px", textAlign: "center" }}>
                    <div className="ai-loading" style={{ justifyContent: "center" }}>
                      <span className="ai-dot"></span><span className="ai-dot"></span><span className="ai-dot"></span>
                      <span style={{ marginLeft: 6 }}>Finding stores near you…</span>
                    </div>
                  </div>
                )}

                {nearby.status === "error" && (
                  <div style={{ padding: 14, borderRadius: 10, background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.35)", fontSize: 12, color: "var(--danger)", lineHeight: 1.5 }}>
                    Couldn't load nearby stores ({nearby.error || "network error"}). Try again later — OpenStreetMap's free service can be busy.
                  </div>
                )}

                {nearby.status === "ok" && nearby.stores.length === 0 && (
                  <div className="empty-state" style={{ padding: "28px 16px" }}>
                    <div className="e">🛒</div>
                    <div className="t">No grocery stores within 5 km</div>
                    <div className="d">OpenStreetMap doesn't have grocery shops mapped this close to you yet.</div>
                  </div>
                )}

                {nearby.status === "ok" && nearby.stores.map((s, i) => {
                  const initials = s.name.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
                  return (
                    <div key={s.id} className="store-card"
                      style={{ cursor: "pointer" }}
                      onClick={() => openDirections(s)}
                      title="Open directions in Google Maps">
                      <div className="store-logo">{initials || "🛒"}</div>
                      <div className="store-info">
                        <div className="store-name">
                          {s.name}
                          {i === 0 && (
                            <span style={{
                              marginLeft: 8, fontSize: 9, fontWeight: 700, padding: "2px 6px",
                              borderRadius: 999, background: "var(--accent)", color: "var(--accent-contrast)",
                              letterSpacing: 0.04, textTransform: "uppercase"
                            }}>Closest</span>
                          )}
                        </div>
                        <div className="store-meta">
                          {prettyShop(s.shop)}
                          {s.address ? ` · ${s.address}` : ""}
                          {" · "}{formatDistance(s._km, state.units)} away
                        </div>
                      </div>
                      <div style={{ textAlign: "right", paddingLeft: 8 }}>
                        <div style={{
                          fontSize: 11, fontWeight: 700, color: "var(--accent-contrast)",
                          background: "var(--accent)", padding: "6px 10px", borderRadius: 8,
                          whiteSpace: "nowrap"
                        }}>Directions →</div>
                      </div>
                    </div>
                  );
                })}

                <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>
                  💡 Tap any store to open driving directions in Google Maps. Buying ingredients to cook this at home runs about <b style={{ color: "var(--accent-strong)" }}>${(f.price * 0.55).toFixed(2)}</b> per serving.
                </div>
              </div>
            );
          })()}

          {tab === "alts" && (
            <div>
              <div className="label" style={{ marginBottom: 8 }}>Healthier swaps · {f.alternatives.length}</div>
              {f.alternatives.map((alt, i) => (
                <div key={i} className="alt-row">
                  <div className="alt-arrow">↻</div>
                  <div className="alt-info">
                    <div className="alt-swap">
                      <span className="from">{alt.from}</span> → <span className="to">{alt.to}</span>
                    </div>
                    <div className="alt-reason">{alt.reason}</div>
                    <span className="alt-delta">{alt.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 24, display: "flex", gap: 10, alignItems: "center" }}>
            <select value={logTo} onChange={e => setLogTo(e.target.value)}
              style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontFamily: "inherit", fontSize: 14 }}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleLog}>Log to {logTo}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SIDEBAR + TOPBAR
============================================================ */
function Sidebar({ tab, onTab }) {
  const { state, logout } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const items = [
    { id: "home", label: "Dashboard", icon: Icon.home },
    { id: "nutrition", label: "Nutrition", icon: Icon.nutrition },
    { id: "activity", label: "Activity", icon: Icon.activity },
    { id: "profile", label: "Profile", icon: Icon.profile },
    { id: "settings", label: "Settings", icon: Icon.settings },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">S</div>
        Santéx
      </div>
      <div className="sidebar-section">Menu</div>
      {items.map(it => (
        <button key={it.id} className={"sidebar-item " + (tab === it.id ? "active" : "")} onClick={() => onTab(it.id)}>
          {it.icon}<span>{it.label}</span>
        </button>
      ))}
      <div className="sidebar-bottom" style={{ position: "relative" }}>
        <div className="sidebar-user" onClick={() => setShowMenu(s => !s)}>
          <div className="avatar" style={{ width: 36, height: 36, fontSize: 14 }}>{(state.user.name || "?")[0].toUpperCase()}</div>
          <div className="info">
            <div className="name">{state.user.name}</div>
            <div className="email">{state.auth.isGuest ? "Guest mode" : state.auth.email || "—"}</div>
          </div>
          <span style={{ color: "var(--text-soft)", fontSize: 14 }}>{showMenu ? "▾" : "▸"}</span>
        </div>
        {showMenu && (
          <div style={{ marginTop: 6, padding: 4, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
            <button className="sidebar-item" onClick={() => { onTab("profile"); setShowMenu(false); }}>👤<span>View profile</span></button>
            <button className="sidebar-item" onClick={() => { onTab("settings"); setShowMenu(false); }}>⚙<span>Settings</span></button>
            <button className="sidebar-item" onClick={logout} style={{ color: "var(--danger)" }}>↩<span>Log out</span></button>
          </div>
        )}
      </div>
    </aside>
  );
}

function Topbar({ onTab }) {
  const { state, setSelectedFood } = useApp();
  const [search, setSearch] = useState("");
  const [showNotifs, setShowNotifs] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  // Close the notifications dropdown when clicking anywhere outside
  useEffect(() => {
    if (!showNotifs) return;
    const onDoc = (e) => {
      if (!e.target.closest || !e.target.closest("[data-notif-anchor]")) setShowNotifs(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [showNotifs]);

  const results = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return FOOD_DB.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.cuisine.toLowerCase().includes(q) ||
      f.tags.some(t => t.includes(q)) ||
      f.ingredients.some(i => i.name.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [search]);

  const notifications = [
    { ico: "💧", t: "Drink up!", d: `You've had ${state.today.water} of 8 glasses today.`, when: "now" },
    { ico: "🍽", t: "Lunch reminder", d: `It's around your usual ${state.reminderTimes.lunch} lunch.`, when: "12:30 PM" },
    { ico: "🔥", t: `${state.streak}-day streak`, d: "You're on a roll — log a meal to keep it.", when: "today" },
    { ico: "🏆", t: "Achievement unlocked", d: "You hit your protein target 5 days in a row.", when: "1h ago" },
  ];

  return (
    <div className="topbar">
      <div className="topbar-search" style={{ position: "relative" }}>
        🔍 <input placeholder="Search foods, recipes, ingredients..." value={search} onChange={e => setSearch(e.target.value)} />
        {results.length > 0 && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
            background: "var(--bg-elevated)", border: "1px solid var(--border)",
            borderRadius: 12, padding: 6, boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            zIndex: 50, maxHeight: 360, overflowY: "auto"
          }}>
            {results.map(f => (
              <div key={f.id}
                style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
                onMouseDown={e => e.preventDefault()}
                onClick={() => { setSelectedFood(f); setSearch(""); }}>
                <div style={{ fontSize: 22 }}>{f.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{f.cuisine} · {f.kcal} kcal</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--accent-strong)" }}>${f.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <span className="hud-status" style={{ marginRight: 4 }}>
        <span className="live-dot" />
        LIVE · {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
      </span>
      <div className="topbar-actions" data-notif-anchor style={{ position: "relative" }}>
        <button className="icon-btn" title="Notifications"
          onClick={(e) => { e.stopPropagation(); setShowNotifs(s => !s); }}
          style={{ position: "relative" }}>
          🔔
          <span style={{
            position: "absolute", top: 4, right: 4,
            width: 8, height: 8, borderRadius: "50%",
            background: "var(--accent)", border: "2px solid var(--surface)"
          }} />
        </button>
        <button className="icon-btn" title="Streak"
          onClick={(e) => { e.stopPropagation(); setShowNotifs(false); setShowStreak(true); }}>
          🔥 {state.streak}
        </button>
        <button className="icon-btn" title="Profile"
          onClick={(e) => { e.stopPropagation(); setShowNotifs(false); onTab("profile"); }}>
          {(state.user.name || "?")[0].toUpperCase()}
        </button>

        {showNotifs && (
          <div style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: 360, maxWidth: "calc(100vw - 32px)",
            maxHeight: 480, overflowY: "auto",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            zIndex: 60,
            padding: 12,
            animation: "fadeInSlide 200ms ease forwards"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 6px 10px" }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Notifications</div>
              <span style={{ fontSize: 11, color: "var(--text-soft)" }}>{notifications.length} new</span>
            </div>
            {notifications.map((n, i) => (
              <div key={i} className="coach-card" style={{ marginBottom: 8, padding: 10 }}>
                <div className="coach-ico">{n.ico}</div>
                <div className="coach-body" style={{ flex: 1 }}>
                  <div className="t">{n.t}</div>
                  <div className="d">{n.d}</div>
                </div>
                <div style={{ fontSize: 10, color: "var(--text-soft)", whiteSpace: "nowrap" }}>{n.when}</div>
              </div>
            ))}
            <button className="btn btn-ghost btn-sm"
              style={{ width: "100%", marginTop: 4 }}
              onClick={() => setShowNotifs(false)}>Close</button>
          </div>
        )}
      </div>

      {showStreak && ReactDOM.createPortal(
        <InfoModal title="Your streak" onClose={() => setShowStreak(false)}>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 80 }}>🔥</div>
            <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-0.02em" }}>{state.streak}</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)" }}>day streak</div>
            <div style={{ marginTop: 16, fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>
              Keep logging at least one meal or workout each day to keep it going!
            </div>
            <div className="ach-grid" style={{ marginTop: 24 }}>
              {[3, 7, 14, 30].map(milestone => (
                <div key={milestone} className={"ach-card " + (state.streak >= milestone ? "earned" : "locked")}>
                  <div className="ach-emoji">{state.streak >= milestone ? "🔥" : "🔒"}</div>
                  <div className="ach-title">{milestone} days</div>
                </div>
              ))}
            </div>
          </div>
        </InfoModal>,
        document.body
      )}
    </div>
  );
}

function LogWorkoutModal({ onClose, pinnedType }) {
  const { addWorkout } = useApp();
  const types = [
    { name: "Run", emoji: "🏃" },
    { name: "Strength", emoji: "💪" },
    { name: "Cycling", emoji: "🚴" },
    { name: "Swim", emoji: "🏊" },
    { name: "Yoga", emoji: "🧘" },
    { name: "HIIT", emoji: "⚡" },
    { name: "Walk", emoji: "🚶" },
    { name: "Hike", emoji: "🥾" },
  ];
  const [type, setType] = useState(pinnedType || "Run");
  const [duration, setDuration] = useState("");
  const [kcal, setKcal] = useState("");
  const [error, setError] = useState("");
  const locked = !!pinnedType;
  const submit = () => {
    const d = parseInt(duration);
    const k = parseInt(kcal);
    if (!d || d <= 0) return setError("Enter a duration.");
    if (!k || k < 0) return setError("Enter calories burned (or 0 if unsure).");
    const t = types.find((x) => x.name === type) || { emoji: "🏋️" };
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    addWorkout({ type, time, duration: d, kcal: k, emoji: t.emoji });
    onClose();
  };
  const activeType = types.find((t) => t.name === type) || types[0];
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>
            {locked ? `Log ${activeType.emoji} ${activeType.name}` : "Log workout"}
          </h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {!locked ? (
            <>
              <div className="label" style={{ marginBottom: 8 }}>Type</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
                {types.map((t) => (
                  <button key={t.name}
                    className={"qa-btn " + (type === t.name ? "selected" : "")}
                    style={{ borderColor: type === t.name ? "var(--accent)" : "var(--border)", background: type === t.name ? "var(--accent-soft)" : "var(--surface)" }}
                    onClick={() => setType(t.name)}>
                    <div className="qa-icon">{t.emoji}</div>
                    <div className="qa-label">{t.name}</div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div style={{
              display: "flex", alignItems: "center", gap: 12, padding: 12,
              background: "var(--accent-soft)", border: "1px solid var(--accent)",
              borderRadius: 12, marginBottom: 16
            }}>
              <div style={{ fontSize: 28 }}>{activeType.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{activeType.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Logging this activity</div>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div className="input-group"><label>Duration</label>
              <div className="field">
                <input type="text" inputMode="numeric" autoFocus
                  placeholder="e.g. 30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value.replace(/[^\d]/g, ""))} />
                <span className="unit">min</span>
              </div>
            </div>
            <div className="input-group"><label>Calories burned</label>
              <div className="field">
                <input type="text" inputMode="numeric"
                  placeholder="e.g. 250"
                  value={kcal}
                  onChange={(e) => setKcal(e.target.value.replace(/[^\d]/g, ""))} />
                <span className="unit">kcal</span>
              </div>
            </div>
          </div>

          {error && (
            <div style={{ fontSize: 12, padding: "8px 12px", borderRadius: 8,
              background: "rgba(248,113,113,0.12)", color: "var(--danger)",
              fontWeight: 600, margin: "6px 0 10px" }}>{error}</div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" style={{ flex: 2 }} onClick={submit}>
              Log {activeType.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNav({ tab, onChange }) {
  const tabs = [
    { id: "home", label: "Home", icon: Icon.home },
    { id: "nutrition", label: "Eat", icon: Icon.nutrition },
    { id: "activity", label: "Move", icon: Icon.activity },
    { id: "profile", label: "Me", icon: Icon.profile },
    { id: "settings", label: "Settings", icon: Icon.settings },
  ];
  return (
    <div className="mobile-nav">
      {tabs.map(t => (
        <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => onChange(t.id)}>
          {t.icon}<span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   ROOT APP
============================================================ */
function Shell() {
  const { state, completeOnboarding, dismissTip } = useApp();
  const className = useThemeClasses();
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState("home");

  // Step 1: not authenticated → AuthScreen
  if (!state.auth.loggedIn) {
    return <AuthScreen />;
  }

  const inApp = state.onboarded;

  // Step 2: not onboarded → onboarding flow on a centered page
  if (!inApp) {
    const onboardingScreens = [
      <DeviceScreen key="d" onNext={() => setStep(1)} />,
      <LocationScreen key="loc" onNext={() => setStep(2)} onBack={() => setStep(0)} />,
      <StatsScreen key="s" onNext={() => setStep(3)} onBack={() => setStep(1)} />,
      <GoalsScreen key="g" onNext={() => setStep(4)} onBack={() => setStep(2)} />,
      <SubscriptionScreen key="sub" onNext={() => { completeOnboarding(); setStep(0); }} onBack={() => setStep(3)} />,
    ];
    return (
      <div className={"app-shell " + className} style={{ flexDirection: "column" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ width: "100%", maxWidth: 520, background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            {onboardingScreens[step]}
          </div>
        </div>
      </div>
    );
  }

  // Step 3: full app
  const screens = {
    home: <Dashboard onTab={setTab} />,
    nutrition: <NutritionScreen />,
    activity: <ActivityScreen />,
    profile: <ProfileScreen onTab={setTab} />,
    settings: <SettingsScreen />,
  };

  return (
    <div className={"app-shell " + className}>
      <Sidebar tab={tab} onTab={setTab} />
      <div className="main-area">
        <Topbar onTab={setTab} />
        {screens[tab]}
      </div>
      <MobileNav tab={tab} onChange={setTab} />
      <FoodDetailModal />
      {!state.firstTipSeen && tab === "home" && (
        <div className="first-tip">
          <span>Click any food card to see ingredients, AI insights & alternatives.</span>
          <button onClick={dismissTip}>Got it</button>
        </div>
      )}
      <NutritionistBot />
    </div>
  );
}

/* ============================================================
   NUTRITIONIST AI CHATBOT
   Personalized, friendly nutrition guidance based on the user's
   profile, goal, and what they've logged. No external API — runs
   fully client-side with intent matching + warm templated replies.
============================================================ */
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function buildNutritionProfile(state) {
  const u = state.user || {};
  const goal = state.goal || "maintain";
  let bmr = null, tdee = null, proteinTarget = null, kcalTarget = null;
  if (u.weight > 0 && u.height > 0 && u.age > 0 && u.sex) {
    try { bmr = calcBMR(u); } catch (e) {}
    try { tdee = calcTDEE(u); } catch (e) {}
  }
  if (tdee) {
    if (goal === "lose")      kcalTarget = Math.round(tdee - 500);
    else if (goal === "gain") kcalTarget = Math.round(tdee + 300);
    else                      kcalTarget = tdee;
  }
  if (u.weight > 0) {
    const factor = goal === "gain" ? 2.0 : goal === "lose" ? 1.8 : 1.6;
    proteinTarget = Math.round(u.weight * factor);
  }
  // Today's meals summary
  const meals = (state.today && state.today.meals) || {};
  const allFoods = [
    ...(meals.breakfast || []),
    ...(meals.lunch || []),
    ...(meals.dinner || []),
    ...(meals.snack || []),
  ];
  const kcalEaten = allFoods.reduce((a, e) => a + (e.kcal || 0), 0);
  const proteinEaten = allFoods.reduce((a, e) => a + (e.p || 0), 0);
  const carbsEaten = allFoods.reduce((a, e) => a + (e.c || 0), 0);
  const fatEaten = allFoods.reduce((a, e) => a + (e.f || 0), 0);
  return { u, goal, bmr, tdee, kcalTarget, proteinTarget, kcalEaten, proteinEaten, carbsEaten, fatEaten, water: (state.today && state.today.water) || 0 };
}

function nutritionistReply(rawText, state) {
  const text = (rawText || "").toLowerCase().trim();
  const p = buildNutritionProfile(state);
  const goalLabel = p.goal === "lose" ? "cut" : p.goal === "gain" ? "lean bulk" : "maintain";

  // Greetings
  if (/^(hi|hey|hello|yo|sup|hola)\b/.test(text)) {
    return {
      text: `Hey${p.u.name ? " " + p.u.name : ""}. I'm Sage. Want help with macros, a meal idea, or your calorie target?`,
      suggestions: ["What should I eat today?", "How much protein do I need?", "Best snack for energy?"],
    };
  }

  // Calories / TDEE
  if (/\b(calorie|kcal|tdee|maintenance|deficit|surplus|how much.*eat|how many cal)\b/.test(text)) {
    if (!p.kcalTarget) {
      return {
        text: `I need your weight, height, age, and sex to calculate your TDEE. Add those in Profile.\n\nMost adults sit between 1,800–2,800 kcal/day depending on lean mass and NEAT (non-exercise activity thermogenesis).`,
        suggestions: ["Where do I add my info?"],
      };
    }
    const remaining = Math.max(0, p.kcalTarget - p.kcalEaten);
    const eatenNote = p.kcalEaten > 0
      ? `\n\nLogged today: ${p.kcalEaten} kcal · remaining: ${remaining} kcal.`
      : ``;
    return {
      text: `Your TDEE is ~${p.tdee} kcal. To ${goalLabel}: target **${p.kcalTarget} kcal/day**.${eatenNote}\n\nRough math: 500 kcal/day deficit ≈ 1 lb fat loss/week. 300 kcal surplus = steady muscle gain with minimal fat creep.`,
      suggestions: ["How should I split my macros?", "Meal idea under 500 kcal", "What if I'm hungry?"],
    };
  }

  // Protein
  if (/\b(protein|whey|muscle|lean mass|leucine|amino)\b/.test(text)) {
    if (!p.proteinTarget) {
      return {
        text: `General target for active adults: 1.6–2.2 g/kg body weight per day. Add your weight to your profile and I'll personalize it.\n\nTop sources by leucine content: whey isolate, chicken breast, eggs, Greek yogurt, lean beef.`,
        suggestions: ["High-protein breakfast?", "Vegetarian protein sources"],
      };
    }
    return {
      text: `Aim for **${p.proteinTarget} g/day** (${(p.proteinTarget / p.u.weight).toFixed(1)} g per kg). You're at ${Math.round(p.proteinEaten)} g logged.\n\nSpread it across 3–4 meals — muscle protein synthesis caps around 0.4 g/kg per sitting. Best sources: chicken breast, whey, Greek yogurt, eggs, cottage cheese, salmon, lentils, tofu.`,
      suggestions: ["High-protein breakfast?", "Vegetarian protein sources", "Best post-workout meal"],
    };
  }

  // Carbs
  if (/\b(carb|bread|rice|pasta|keto|low.?carb|glycemic)\b/.test(text)) {
    return {
      text: `Carbs = primary fuel for training and brain function. Stick to low-glycemic complex carbs: oats, brown rice, sweet potato, quinoa, legumes, whole fruit.\n\nActive days: 3–5 g/kg. Limit refined carbs and added sugars — they spike blood glucose and crash energy.`,
      suggestions: ["Best pre-workout snack?", "Are bananas good?", "Carbs at night — bad?"],
    };
  }

  // Fat
  if (/\b(fat\b|olive oil|avocado|omega|cholesterol|saturated|polyunsat|monounsat)\b/.test(text)) {
    return {
      text: `Aim for 25–35% of daily kcal from fat. Prioritize unsaturated and omega-3s (EPA/DHA): olive oil, avocado, nuts, seeds, fatty fish.\n\nDietary fat is required for absorbing fat-soluble vitamins (A, D, E, K) and producing steroid hormones. Limit trans fats; saturated fat is fine in moderation.`,
      suggestions: ["Are eggs healthy?", "Omega-3 sources without fish"],
    };
  }

  // Hydration
  if (/\b(water|hydrat|drink|thirst|electrolyte)\b/.test(text)) {
    const g = p.water;
    return {
      text: `Daily target: 2.5–3.5 L (~8–12 cups). You're at ${g}/8 glasses${g < 4 ? " — grab a glass now." : g >= 8 ? " — nailed it. 💧" : "."}\n\nMild dehydration (1–2% body mass) reduces cognitive performance and increases perceived exertion. Sweat heavily? Add electrolytes — sodium, potassium, magnesium.`,
      suggestions: ["+ Log a glass of water", "Signs I'm dehydrated?"],
    };
  }

  // Weight loss
  if (/\b(lose|losing|cut|cutting|diet|fat loss|weight loss|slim)\b/.test(text)) {
    return {
      text: `Fat loss = sustained calorie deficit + adequate protein to preserve lean mass.\n\n• ${p.kcalTarget && p.goal === "lose" ? `Target: **${p.kcalTarget} kcal/day**` : `Aim for 300–500 kcal/day deficit`}\n• Protein: 1.8–2.2 g/kg\n• High-fiber vegetables for satiety\n• NEAT: 7–10k steps/day\n\nSafe rate: 0.5–1% of body weight per week. Faster = more muscle loss + metabolic adaptation.`,
      suggestions: ["What if I plateau?", "Cheat meals — yes or no?", "Best low-cal snacks"],
    };
  }

  // Weight gain / muscle
  if (/\b(gain|bulk|mass|build muscle|put on weight|skinny|underweight)\b/.test(text)) {
    return {
      text: `Lean bulk = small surplus (~300 kcal) + 1.6–2 g/kg protein + progressive overload + 7–9h sleep.\n\n${p.kcalTarget && p.goal === "gain" ? `Your target: **${p.kcalTarget} kcal/day**.\n\n` : ""}Hard-gainer trick: liquid calories. Oats + banana + peanut butter + whey + milk = 700+ kcal you'll barely register.`,
      suggestions: ["High-calorie smoothie recipe", "Best foods for bulking"],
    };
  }

  // Meal ideas
  if (/\b(meal idea|what (should|to) (eat|cook|make)|recipe|dinner|lunch|breakfast|snack)\b/.test(text)) {
    if (/breakfast/.test(text)) {
      return {
        text: `Target 25–35 g protein for sustained satiety:\n\n• **Greek yogurt bowl** — yogurt + berries + granola → ~350 kcal, 25 g P\n• **Eggs + avocado toast** — 3 eggs + ½ avocado + whole grain → ~450 kcal, 22 g P\n• **Overnight oats** — oats + whey + milk + chia → ~400 kcal, 30 g P`,
        suggestions: ["Quick 5-minute breakfast", "No-cook breakfast ideas"],
      };
    }
    if (/lunch/.test(text)) {
      return {
        text: `Balanced macros = no afternoon glycemic crash:\n\n• **Grain bowl** — quinoa + grilled chicken + roasted veg + tahini\n• **Loaded salad** — greens + tuna or chickpeas + olive oil + nuts + feta\n• **Whole-wheat wrap** — turkey + hummus + spinach + bell pepper\n\nKeep grains to a fist-sized portion.`,
        suggestions: ["Meal prep ideas for the week", "Best wraps for weight loss"],
      };
    }
    if (/dinner/.test(text)) {
      return {
        text: `Plate method: ½ veg, ¼ lean protein, ¼ starchy carb.\n\n• Sheet-pan salmon + asparagus + sweet potato — ~500 kcal, 35 g P\n• Stir-fry: chicken + veg + jasmine rice\n• Ground-turkey chili + black beans + avocado\n\nEat 2–3 h before bed for better sleep and less reflux.`,
        suggestions: ["30-minute dinner ideas", "Vegetarian dinner recipes"],
      };
    }
    if (/snack/.test(text)) {
      return {
        text: `Protein + fiber/fat = stable glucose:\n\n• Apple + 2 tbsp peanut butter — 250 kcal, 8 g P\n• Greek yogurt + berries — 150 kcal, 15 g P\n• Hummus + raw veg — 180 kcal, 6 g P\n• Hard-boiled egg + fruit — 150 kcal, 7 g P\n• Almonds + clementine — 200 kcal, 6 g P`,
        suggestions: ["Pre-workout snack?", "Late-night snack ideas"],
      };
    }
    return {
      text: `Which meal — breakfast, lunch, dinner, snack? Any calorie cap?`,
      suggestions: ["Quick breakfast idea", "Healthy dinner under 600 kcal", "Snack idea"],
    };
  }

  // Macros
  if (/\b(macro|split|ratio)\b/.test(text)) {
    if (!p.kcalTarget) {
      return {
        text: `Default macronutrient split: **30% protein / 40% carbs / 30% fat**. Fill in your profile for personalized gram targets.`,
      };
    }
    const protein = p.proteinTarget;
    const fatG = Math.round((p.kcalTarget * 0.27) / 9);
    const carbsG = Math.round((p.kcalTarget - (protein * 4) - (fatG * 9)) / 4);
    return {
      text: `On ~${p.kcalTarget} kcal/day for ${goalLabel}:\n\n• **Protein: ${protein} g** — preserves lean mass\n• **Carbs: ${carbsG} g** — glycogen and training fuel\n• **Fat: ${fatG} g** — hormones, vitamin absorption\n\nWithin 10% is fine — don't chase grams.`,
      suggestions: ["High-protein foods", "Best carbs for energy"],
    };
  }

  // Sleep
  if (/\b(sleep|recover|rest|tired|fatigue)\b/.test(text)) {
    return {
      text: `Sleep regulates leptin and ghrelin — your hunger and fullness hormones. Short sleep = more hunger, more cravings.\n\nCut caffeine by noon (5h half-life). Avoid heavy meals 2h before bed. Magnesium-rich foods support deep sleep: pumpkin seeds, almonds, leafy greens, dark chocolate.\n\nChronic fatigue? Check iron, vitamin D, and B12.`,
      suggestions: ["Foods for energy", "Caffeine — how much is OK?"],
    };
  }

  // Supplements
  if (/\b(supplement|vitamin|creatine|multivitamin|protein powder|fish oil)\b/.test(text)) {
    return {
      text: `Food first. Evidence-backed adds:\n\n• **Creatine monohydrate** — 5 g/day. Strength + lean mass.\n• **Vitamin D3** — 1,000–2,000 IU/day; most adults are deficient.\n• **Omega-3 (EPA/DHA)** — 1–2 g/day if you don't eat fatty fish weekly.\n• **Whey isolate** — convenience for hitting protein.\n\nSkip: fat burners, detox teas, testosterone boosters. Talk to your doctor if on medication.`,
      suggestions: ["Do I need a multivitamin?", "Creatine — is it safe?"],
    };
  }

  // Vegan / vegetarian
  if (/\b(vegan|vegetarian|plant.?based|meatless)\b/.test(text)) {
    return {
      text: `Plant-based works. Watch these micronutrients:\n\n• **B12** — supplement always; not bioavailable in plants\n• **Iron** — pair non-heme iron with vitamin C\n• **Omega-3 (ALA → EPA/DHA)** — chia, flax, walnuts, algae oil\n• **Zinc, calcium** — pumpkin seeds, fortified plant milks, tofu\n\nTop proteins: tofu, tempeh, lentils, chickpeas, edamame, seitan, pea protein.`,
      suggestions: ["Best vegan protein sources", "Plant-based dinner ideas"],
    };
  }

  // Sugar
  if (/\b(sugar|sweet|dessert|candy)\b/.test(text)) {
    return {
      text: `WHO recommends <25 g added sugar/day (~6 tsp).\n\nSneaky sources: flavored yogurts, granola bars, pasta sauce, ketchup, coffee drinks. Whole-fruit sugar is fine — fiber blunts the glycemic response.\n\nIntentional small treat > white-knuckled restriction.`,
      suggestions: ["Healthy dessert ideas", "How to cut sugar cravings"],
    };
  }

  // Intermittent fasting
  if (/\b(fast|fasting|intermittent|skip breakfast|16:8|omad)\b/.test(text)) {
    return {
      text: `IF works only if it creates a calorie deficit you can sustain. No metabolic magic.\n\n• 16:8 — most common (e.g., noon–8 PM eating window)\n• 14:10 — gentler\n\nNot ideal for: competitive athletes, history of disordered eating, pregnancy, certain medical conditions.`,
      suggestions: ["Pros and cons of fasting", "Breaking a fast — best foods"],
    };
  }

  // Pre/post workout
  if (/\b(pre.?workout|post.?workout|before.*gym|after.*gym|training meal)\b/.test(text)) {
    return {
      text: `**Pre (60–90 min):** carbs + small protein, low fat/fiber. Banana + PB, oats + berries, toast + eggs.\n\n**Post (within 1–2 h):** 25–40 g protein + carbs to replenish glycogen. Whey + banana, chicken + rice, Greek yogurt + granola.\n\nThe "anabolic window" is overstated — muscle protein synthesis stays elevated ~24 h after a workout.`,
      suggestions: ["Best pre-workout snack", "Protein shake — necessary?"],
    };
  }

  // "Healthy?" generic
  if (/\b(healthy|good for you|bad for you|is .* healthy|should i eat)\b/.test(text)) {
    return {
      text: `No single food is "good" or "bad" — overall dietary pattern matters.\n\n80/20 approach: 80% whole foods (vegetables, lean protein, whole grains, healthy fats), 20% flexibility.\n\nName a specific food and I'll give you the nutritional breakdown.`,
      suggestions: ["Is white rice bad?", "Are eggs healthy?", "Is wine OK?"],
    };
  }

  // Thanks
  if (/\b(thank|thx|thanks|appreciate)\b/.test(text)) {
    return { text: pick([
      "Anytime. You've got this. 💪",
      "Happy to help. Come back when you have another question.",
      "You're welcome. Consistency > intensity.",
    ])};
  }

  // Default
  return {
    text: `Not sure what you're after. I can help with calorie targets, macronutrient ratios, meal ideas, hydration, supplements, weight loss or gain, sleep, or pre/post-workout nutrition. Where to?`,
    suggestions: ["What should I eat today?", "How much protein do I need?", "Best foods for energy"],
  };
}

/* Build the system prompt that turns Claude Haiku into Sage. */
function buildSageSystemPrompt(state) {
  const p = buildNutritionProfile(state);
  const u = p.u || {};
  const lines = [
    "You are Sage, a friendly personal nutritionist chatting with someone in their wellness app (Santéx).",
    "",
    "Talk like a real, smart human nutritionist would in a casual conversation:",
    "- Keep answers SHORT (2–4 sentences, max 5). No long lectures.",
    "- Be direct. No fluff, no hedging, no \"as an AI\" — you're Sage, a nutritionist.",
    "- Avoid bullet-point lists unless the user explicitly asks for a list. Write in flowing sentences.",
    "- Use actual nutrition terminology naturally (TDEE, NEAT, glycemic index, leucine, EPA/DHA, muscle protein synthesis, satiety, glycogen, leptin/ghrelin, bioavailability) — but only when it fits.",
    "- Stick to facts grounded in established nutrition science. If you're not sure, say so plainly.",
    "- Never repeat yourself across the conversation — the user notices.",
    "- Use the user's first name occasionally if it's available, but don't overdo it.",
    "- No emojis except a rare 💪 / 🌿 / 💧 when it genuinely fits.",
  ];
  // Add user's profile context if available
  const stats = [];
  if (u.name) stats.push(`Name: ${u.name}`);
  if (u.age)  stats.push(`Age: ${u.age}`);
  if (u.weight) stats.push(`Weight: ${u.weight} kg (${Math.round(u.weight * 2.20462)} lbs)`);
  if (u.height) stats.push(`Height: ${u.height} cm`);
  if (state.goal) stats.push(`Goal: ${state.goal === "lose" ? "cut / lose fat" : state.goal === "gain" ? "lean bulk / gain muscle" : "maintain"}`);
  if (p.tdee) stats.push(`Maintenance (TDEE): ~${p.tdee} kcal/day`);
  if (p.kcalTarget) stats.push(`Calorie target today: ${p.kcalTarget} kcal`);
  if (p.proteinTarget) stats.push(`Protein target: ${p.proteinTarget}g/day`);
  if (p.kcalEaten > 0) stats.push(`Eaten today: ${p.kcalEaten} kcal (${Math.max(0, p.kcalTarget - p.kcalEaten)} remaining), ${Math.round(p.proteinEaten)}g protein`);
  if (typeof p.water === "number") stats.push(`Water today: ${p.water}/8 glasses`);
  if (stats.length) {
    lines.push("", "USER CONTEXT (use it when relevant, but don't recite it back unless they ask):", ...stats.map(s => `- ${s}`));
  } else {
    lines.push("", "User hasn't completed their profile yet — if they ask for personalized numbers, tell them to fill in age/weight/height/sex in their profile.");
  }
  return lines.join("\n");
}

/* ====================================================================
   IN-BROWSER LLM (WebLLM + Llama 3.2 1B)

   Sage runs the model directly in the user's browser via WebGPU.
   No API key, no server, no signup. First load downloads the model
   (~700MB), cached in IndexedDB forever after. All subsequent chats
   are instant and free.
==================================================================== */
const SAGE_MODEL = "Llama-3.2-1B-Instruct-q4f32_1-MLC";
let _sageEngine = null;        // singleton WebLLM engine
let _sageLoadingPromise = null; // dedupes concurrent loads

async function ensureSageLoaded(onProgress) {
  if (_sageEngine) return _sageEngine;
  if (_sageLoadingPromise) return _sageLoadingPromise;
  _sageLoadingPromise = (async () => {
    if (!("gpu" in navigator)) {
      throw new Error("This browser doesn't support WebGPU. Use Chrome or Edge on desktop (Firefox/Safari may need an update).");
    }
    // Babel-standalone rewrites `import()` to CommonJS `require()`, which doesn't
    // exist in the browser. Wrap in `new Function` so the dynamic import is
    // parsed natively by the browser at runtime, not by Babel.
    const dynImport = new Function("u", "return import(u)");
    const webllm = await dynImport("https://esm.run/@mlc-ai/web-llm@0.2.79");
    _sageEngine = await webllm.CreateMLCEngine(SAGE_MODEL, {
      initProgressCallback: (report) => {
        // report has { progress: 0..1, text, timeElapsed }
        if (onProgress) onProgress(report);
      },
    });
    return _sageEngine;
  })();
  try {
    return await _sageLoadingPromise;
  } catch (e) {
    _sageLoadingPromise = null; // allow retry
    throw e;
  }
}

async function callSageWebLLM({ system, history, userText }) {
  const engine = _sageEngine;
  if (!engine) throw new Error("Sage isn't loaded yet.");
  const trimmed = history.slice(-12);
  const messages = [
    { role: "system", content: system },
    ...trimmed
      .filter(m => m.role === "user" || m.role === "bot")
      .map(m => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text })),
    { role: "user", content: userText },
  ];
  const response = await engine.chat.completions.create({
    messages,
    temperature: 0.8,      // varied responses each time
    top_p: 0.95,
    max_tokens: 350,
  });
  const reply = response.choices?.[0]?.message?.content?.trim();
  return reply || "Hmm, I didn't catch that — can you rephrase?";
}

function NutritionistBot() {
  const { state } = useApp();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  // Model lifecycle: "idle" | "loading" | "ready" | "error"
  const [modelStatus, setModelStatus] = useState(_sageEngine ? "ready" : "idle");
  const [loadProgress, setLoadProgress] = useState({ progress: 0, text: "" });
  const [modelError, setModelError] = useState("");
  const bodyRef = React.useRef(null);

  // Start downloading the model the first time the chat opens
  React.useEffect(() => {
    if (!open) return;
    if (modelStatus === "ready" || modelStatus === "loading") return;
    setModelStatus("loading");
    setModelError("");
    ensureSageLoaded((report) => {
      setLoadProgress({ progress: report.progress || 0, text: report.text || "" });
    })
      .then(() => setModelStatus("ready"))
      .catch((err) => {
        setModelStatus("error");
        setModelError(err && err.message ? err.message : String(err));
      });
  }, [open, modelStatus]);

  // Seed greeting once the model is ready
  React.useEffect(() => {
    if (open && modelStatus === "ready" && messages.length === 0) {
      const name = state.user && state.user.name ? " " + state.user.name : "";
      const greet = `Hey${name}! I'm Sage, your personal nutritionist. 🌿 Ask me anything — macros, calories, what to eat. What's up?`;
      setMessages([{ role: "bot", text: greet, suggestions: [
        "What should I eat today?",
        "How much protein do I need?",
        "Best foods for energy",
      ]}]);
    }
  }, [open, modelStatus, messages.length]);

  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 340);
  };

  const sendMessage = async (rawText) => {
    const text = (rawText || "").trim();
    if (!text || typing) return;
    if (modelStatus !== "ready") return;
    if (text.length > 800) {
      setMessages(m => [...m, { role: "bot", text: "Try keeping it under 800 characters so I can give you a focused answer." }]);
      return;
    }
    setMessages(m => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    try {
      const system = buildSageSystemPrompt(state);
      const reply = await callSageWebLLM({ system, history: messages, userText: text });
      setMessages(m => [...m, { role: "bot", text: reply }]);
    } catch (err) {
      const msg = (err && err.message) || "Unknown error";
      setMessages(m => [...m, { role: "bot", text: `Sage tripped — ${msg}. Try again?` }]);
    } finally {
      setTyping(false);
    }
  };

  const retryLoad = () => {
    setModelStatus("idle");
    setModelError("");
  };

  // Loading UI
  const pct = Math.round((loadProgress.progress || 0) * 100);

  return (
    <>
      <button className="chat-fab" onClick={() => open ? handleClose() : setOpen(true)}
        aria-label={open ? "Close chat" : "Open nutrition chat"} title="Ask Sage, your personal nutritionist">
        {!open && <span className="pulse" />}
        {open ? (
          <svg viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6"/></svg>
        ) : (
          <svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.3A8 8 0 1 1 21 12z"/></svg>
        )}
      </button>

      {open && !closing && (
        <>
          <div className="chat-puff p1" />
          <div className="chat-puff p2" />
          <div className="chat-puff p3" />
        </>
      )}

      {open && (
        <div className={"chat-cloud" + (closing ? " chat-closing" : "")}>
          <div className="chat-header">
            <div className="avatar-bot">🌿</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="title">Sage</div>
              <div className="sub">
                <span className="dot" />
                {modelStatus === "ready" ? "Your personal nutritionist" :
                 modelStatus === "loading" ? `Loading… ${pct}%` :
                 modelStatus === "error" ? "Couldn't load — see message" :
                 "Getting ready…"}
              </div>
            </div>
            <button className="close-btn" onClick={handleClose} aria-label="Close chat">×</button>
          </div>

          {modelStatus === "loading" && (
            <div style={{ flex: 1, padding: "32px 22px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🌿</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Setting up Sage…</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5, maxWidth: 280, marginBottom: 18 }}>
                Downloading her brain so she can answer questions without needing the internet. One-time, ~700 MB, cached forever after.
              </div>
              <div style={{ width: "100%", maxWidth: 280, height: 8, background: "var(--surface-2)", borderRadius: 999, overflow: "hidden", marginBottom: 8 }}>
                <div style={{
                  width: pct + "%", height: "100%",
                  background: "var(--accent)",
                  transition: "width 200ms ease",
                }} />
              </div>
              <div style={{ fontSize: 11, color: "var(--text-soft)" }}>
                {pct}% · {loadProgress.text || "Starting…"}
              </div>
            </div>
          )}

          {modelStatus === "error" && (
            <div style={{ flex: 1, padding: "28px 22px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>😬</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Couldn't start Sage</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5, maxWidth: 290, marginBottom: 16 }}>
                {modelError}
              </div>
              <button onClick={retryLoad} style={{
                padding: "10px 18px", borderRadius: 10, border: "none",
                background: "var(--accent)", color: "var(--accent-contrast)",
                fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit"
              }}>Try again</button>
              <div style={{ fontSize: 10, color: "var(--text-soft)", marginTop: 14, maxWidth: 290 }}>
                Sage needs WebGPU — works in Chrome, Edge, Brave, Arc on desktop, and most modern phones. iOS Safari 18+ also works.
              </div>
            </div>
          )}

          {modelStatus === "ready" && (
            <>
              <div className="chat-body" ref={bodyRef}>
                {messages.map((m, i) => (
                  <React.Fragment key={i}>
                    <div className={"chat-bubble " + m.role}>{m.text}</div>
                    {m.suggestions && m.role === "bot" && (
                      <div className="chat-suggest">
                        {m.suggestions.map((s, j) => (
                          <button key={j} onClick={() => sendMessage(s)}>{s}</button>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
                {typing && (
                  <div className="chat-bubble bot">
                    <div className="chat-typing"><span /><span /><span /></div>
                  </div>
                )}
              </div>

              <div className="chat-input-row">
                <input
                  type="text" placeholder="Ask Sage anything about nutrition…"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") sendMessage(input); }}
                  maxLength={800} disabled={typing} />
                <button onClick={() => sendMessage(input)} disabled={!input.trim() || typing} aria-label="Send">
                  <svg viewBox="0 0 24 24"><path d="M5 12l14-7-4 7 4 7-14-7z"/></svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
</script>
</body>
</html>
index (2).html
Displaying index (2).html.

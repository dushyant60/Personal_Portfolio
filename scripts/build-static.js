#!/usr/bin/env node

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const buildDir = join(process.cwd(), 'build', 'client');
const indexPath = join(buildDir, 'index.html');

// Ensure build directory exists
if (!existsSync(buildDir)) {
  mkdirSync(buildDir, { recursive: true });
}

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#111" />
    <meta name="color-scheme" content="dark light" />
    <title>Dushyant Singh - Portfolio</title>
    <link rel="manifest" href="/manifest.json" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="shortcut_icon" href="/shortcut.png" type="image/png" sizes="64x64" />
    <link rel="apple-touch-icon" href="/icon-256.png" sizes="256x256" />
    <link rel="author" href="/humans.txt" type="text/plain" />
    <link rel="stylesheet" href="/assets/root-C_HFQy6x.css" />
    <link rel="stylesheet" href="/assets/index-Ben_IK3z.css" />
    <style>
      /* Theme styles */
      :root {
        --color-text: oklch(0.9 0.005 106);
        --color-background: oklch(0.1 0.005 106);
        --color-primary: oklch(0.7 0.15 106);
        --color-secondary: oklch(0.6 0.1 106);
      }
      
      [data-theme="light"] {
        --color-text: oklch(0.2 0.005 106);
        --color-background: oklch(0.95 0.005 106);
        --color-primary: oklch(0.4 0.15 106);
        --color-secondary: oklch(0.5 0.1 106);
      }
      
      * {
        box-sizing: border-box;
      }
      
      body {
        margin: 0;
        padding: 0;
        font-family: 'Gotham', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: var(--color-background);
        color: var(--color-text);
        overflow-x: hidden;
      }
      
      #root {
        min-height: 100vh;
      }
      
      /* Loading styles */
      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        font-size: 1.2rem;
      }
    </style>
  </head>
  <body data-theme="dark">
    <div id="root">
      <div class="loading">Loading Portfolio...</div>
    </div>
    <script type="module" src="/assets/entry.client-Dsqyoi5j.js"></script>
  </body>
</html>`;

writeFileSync(indexPath, indexHtml);
console.log('✅ Generated index.html for static deployment');

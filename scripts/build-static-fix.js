#!/usr/bin/env node

import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

const buildDir = join(process.cwd(), 'build', 'client');
const indexPath = join(buildDir, 'index.html');

// Ensure build directory exists
if (!existsSync(buildDir)) {
  mkdirSync(buildDir, { recursive: true });
}

// Read the manifest to get the correct asset paths
const manifestPath = join(buildDir, '.vite', 'manifest.json');
let manifest = {};
if (existsSync(manifestPath)) {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
}

// Get the correct asset paths from manifest
const getAssetPath = (key) => {
  if (manifest[key] && manifest[key].file) {
    return manifest[key].file;
  }
  return key;
};

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
    <style>
      /* Basic styles to prevent white screen */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      html, body {
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: #111;
        color: #fff;
      }
      
      #root {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .loading {
        text-align: center;
        font-size: 1.2rem;
      }
      
      .loading::after {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid #333;
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        margin-left: 10px;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading">Loading Portfolio</div>
    </div>
    <script>
      // Simple error handling
      window.addEventListener('error', function(e) {
        console.error('Error loading portfolio:', e.error);
        document.getElementById('root').innerHTML = '<div style="text-align: center; padding: 2rem;"><h1>Portfolio Loading Error</h1><p>Please refresh the page or try again later.</p></div>';
      });
      
      // Load the main JavaScript
      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/assets/entry.client-Dsqyoi5j.js';
      script.onerror = function() {
        document.getElementById('root').innerHTML = '<div style="text-align: center; padding: 2rem;"><h1>Failed to Load Portfolio</h1><p>Please check your internet connection and try again.</p></div>';
      };
      document.head.appendChild(script);
    </script>
  </body>
</html>`;

writeFileSync(indexPath, indexHtml);
console.log('✅ Generated fixed index.html for static deployment');

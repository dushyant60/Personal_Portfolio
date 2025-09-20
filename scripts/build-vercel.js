#!/usr/bin/env node

import { writeFileSync, existsSync, mkdirSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const buildDir = join(process.cwd(), 'build', 'client');
const indexPath = join(buildDir, 'index.html');

// Ensure build directory exists
if (!existsSync(buildDir)) {
  mkdirSync(buildDir, { recursive: true });
}

// Get all CSS files from the assets directory
const assetsDir = join(buildDir, 'assets');
let cssLinks = '';
if (existsSync(assetsDir)) {
  const files = readdirSync(assetsDir);
  const cssFiles = files.filter(file => file.endsWith('.css'));
  cssLinks = cssFiles.map(file => `    <link rel="stylesheet" href="/assets/${file}" />`).join('\n');
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
    <link rel="apple-touch-icon" href="/icon-256.png" sizes="256x256" />
    
    <!-- Load all CSS files -->
${cssLinks}
    
    <style>
      /* Critical CSS to prevent white screen */
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
        overflow-x: hidden;
      }
      
      #root {
        min-height: 100vh;
        width: 100%;
      }
      
      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        font-size: 1.2rem;
        text-align: center;
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
      
      /* Ensure content is visible */
      .content {
        opacity: 1;
        transition: opacity 0.3s ease;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading">Loading Portfolio</div>
    </div>
    
    <script>
      // Enhanced error handling and loading
      let loadTimeout;
      
      function showError(message) {
        document.getElementById('root').innerHTML = \`
          <div style="text-align: center; padding: 2rem; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #ff6b6b; margin-bottom: 1rem;">Portfolio Loading Error</h1>
            <p style="margin-bottom: 1rem;">\${message}</p>
            <button onclick="window.location.reload()" style="
              background: #4ecdc4; 
              color: #111; 
              border: none; 
              padding: 12px 24px; 
              border-radius: 6px; 
              cursor: pointer;
              font-size: 16px;
            ">Retry</button>
          </div>
        \`;
      }
      
      // Set a timeout for loading
      loadTimeout = setTimeout(() => {
        showError('The portfolio is taking longer than expected to load. Please check your connection and try again.');
      }, 10000);
      
      // Error handling
      window.addEventListener('error', function(e) {
        clearTimeout(loadTimeout);
        console.error('Error loading portfolio:', e.error);
        showError('There was an error loading the portfolio. Please refresh the page.');
      });
      
      // Success handler
      window.addEventListener('load', function() {
        clearTimeout(loadTimeout);
        // Hide loading after a short delay to ensure content is ready
        setTimeout(() => {
          const loading = document.querySelector('.loading');
          if (loading) {
            loading.style.display = 'none';
          }
        }, 500);
      });
      
      // Load the main JavaScript
      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/assets/entry.client-Dsqyoi5j.js';
      script.onerror = function() {
        clearTimeout(loadTimeout);
        showError('Failed to load the portfolio application. Please check your internet connection.');
      };
      script.onload = function() {
        console.log('Portfolio script loaded successfully');
      };
      document.head.appendChild(script);
    </script>
  </body>
</html>`;

writeFileSync(indexPath, indexHtml);
console.log('✅ Generated Vercel-optimized index.html');
console.log(`✅ Included ${cssLinks.split('\n').filter(line => line.trim()).length} CSS files`);

const fs = require('fs');
const path = require('path');

const src = 'node_modules/three/examples/jsm/libs/draco/gltf';
const output = 'public/draco';

// Ensure output directory exists
if (!fs.existsSync(output)) {
  fs.mkdirSync(output, { recursive: true });
}

// Copy draco decoder from three.js into the public directory
try {
  fs.copyFileSync(path.join(src, 'draco_decoder.wasm'), path.join(output, 'draco_decoder.wasm'));
  fs.copyFileSync(path.join(src, 'draco_wasm_wrapper.js'), path.join(output, 'draco_wasm_wrapper.js'));
  console.log('✅ Draco decoder files copied successfully');
} catch (err) {
  console.error('Error copying Draco files:', err);
}

const fs = require('fs-extra');
const path = require('path');

const srcDir = path.join(__dirname, 'src/generated');
const destDir = path.join(__dirname, 'dist/generated');

if (!fs.existsSync(srcDir)) {
  console.error("❌ ERROR: 'src/generated' does not exist. Ensure you run the code generation step before building.");
  process.exit(1);
}

fs.copySync(srcDir, destDir);
console.log("✅ Successfully copied 'src/generated' to 'dist/generated'");

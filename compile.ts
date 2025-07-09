import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Simple TypeScript compilation script
const compileServer = () => {
  try {
    console.log('🔨 Compiling TypeScript server files...');
    
    // Create output directory
    const outputDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Compile TypeScript files
    execSync('npx tsc server/server.ts --outDir dist --target es2020 --module commonjs --lib es2020 --moduleResolution node --esModuleInterop --allowSyntheticDefaultImports --strict --skipLibCheck', {
      stdio: 'inherit',
      cwd: __dirname
    });

    console.log('✅ Server compiled successfully!');
    console.log('📁 Output: dist/server.js');
  } catch (error) {
    console.error('❌ Compilation failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  compileServer();
}

const { exec } = require('child_process');

// Run the TypeScript compiler to check for errors
exec('node_modules\\.bin\\tsc --noEmit', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

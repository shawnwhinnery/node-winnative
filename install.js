const os = require('os')
const isWin = (os.platform() === 'win32')
const exec = require('child_process').exec

if(isWin) {
    exec('node-gyp configure build', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
} else {
    console.log('Platform is not windows.')
}

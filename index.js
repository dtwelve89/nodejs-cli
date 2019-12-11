const fs = require('fs');
const path = require('path');

const arg1 = process.argv[2];
const arg2 = process.argv[3];

const initializeApp = () => {
  // Exit if no arguments passed
  if (process.argv.length <= 2) {
    process.exit(-1);
  }

  if (arg1 === 'ls' && !arg2) {
    list();
  } else if (arg1 === 'ls' && arg2 === '-R') {
    listWithSub();
  } else {
    console.log(`zsh: command not found: ${arg1}`);
  }
};

// Show files/folders in your current directory
const list = (dir = './') => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    // Filter out hidden files with Regex
    files = files.filter(item => !/(^|\/)\.[^\/\.]/g.test(item));
    files.forEach(file => {
      console.log(file);
    });
  });
};

// Show all files/folders in directory and subdirectories
const listWithSub = (dir = './') => {
  let files = fs.readdirSync(dir);
  files = files.filter(item => !/(^|\/)\.[^\/\.]/g.test(item));

  // Print all files
  files.forEach(file => {
    console.log(file);
  });

  // Recursive function to print all files in subdirectory
  files.forEach(file => {
    let dirPath = path.join(dir, file);
    if (fs.statSync(dirPath).isDirectory()) {
      console.log(`\n./${dirPath}:`);
      listWithSub(dirPath);
    }
  });
};

initializeApp();

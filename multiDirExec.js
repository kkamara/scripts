const { exec } = require("child_process");
const fs = require("fs");

const filename = __filename.slice(__filename.lastIndexOf("/") + 1);
const usage = `Usage: node ${filename} [dirPath] [cmd]\n`;
const args = process.argv.slice(2);
let argErr = false;

if (args.length !== 2) {
  argErr = true;
}

if (argErr) {
  console.log(usage);
  process.exit(1);
}

const encoding = { encoding: "utf-8" };
const path = args[0];
const cmd = args.pop();

let contents;

const run = async () => {
  console.log(`running command: ${cmd}\n`);

  try {
    contents = fs.readdirSync(path, encoding);
  } catch (e) {
    console.log(`Error reading path: ${path}`);
    process.exit(1);
  }

  contents.forEach(async file => {
    const fullPath = `${path}/${file}`;
    console.log(`executing on: ${fullPath}`);
    process.chdir(fullPath);
    exec(`${cmd}`, function(error, stdout, stderr) {
      if (error !== null) {
        console.log("exec error: " + error);
      }
      if (stderr.length) console.log(stderr);
      if (stdout.length) console.log(stdout);
    });
  });
};

run();

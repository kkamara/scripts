const { exec } = require("child_process");
const fs = require("fs");

const {
  jsonFileExists,
  parseJSONContents,
  validateJSONContents
} = require("./validations");

const filename = __filename.slice(__filename.lastIndexOf("/") + 1);
const usage = `Usage: node ${filename} [jsonPath]\n
jsonPath must be a valid path to a JSON object containing the following keys:
\tprojectsPath: \tstring 
\t\t\tPath to project containing elements to change.
\tentities: \tmap { [key: string]: string }
\t\t\tKey being path to folder or file from root project e.g. src/services or ./src/functions/admin.
\t\t\tString value being the new name for the entity (key).
`;
const args = process.argv.slice(2);
let argErr = false;

if (args[0] !== undefined && ["-h", "--help"].includes(args[0])) {
  console.log(usage);
  process.exit(1);
}

if (args.length !== 1) {
  argErr = true;
}

if (argErr) {
  console.log(usage);
  process.exit(1);
}

const encoding = { encoding: "utf-8" };
const jsonPath = args[0];
let jsonContents;

const runValidations = () => {
  const jsonFile = jsonFileExists(jsonPath, encoding);
  jsonContents = parseJSONContents(jsonFile);
  validateJSONContents(jsonContents, { encoding });
  console.log(jsonContents);
};

const run = async () => {
  runValidations();
};

run();

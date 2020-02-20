const fs = require("fs");

const seeHelp = "See -h or --help for usage";

const quit = () => process.exit(1);

const jsonFileExists = (jsonPath, encoding) => {
  try {
    return fs.readFileSync(jsonPath, encoding);
  } catch (err) {
    console.log(seeHelp, "\nInvalid jsonPath", jsonPath, err.message);
    quit();
  }
};

const parseJSONContents = jsonFile => {
  try {
    return JSON.parse(jsonFile);
  } catch (err) {
    console.log(seeHelp, "\nInvalid JSON in jsonPath", err.message);
    quit();
  }
};

const validateJSONContents = ({ projectsPath, entities }, data) => {
  if (!projectsPath) {
    console.log(`${seeHelp} \njson file does not contain projectsPath key`);
    quit();
  } else if (typeof projectsPath !== "string") {
    console.log(
      `${seeHelp} \njson file does not contain projectsPath key`,
      projectsPath
    );
    quit();
  } else {
    const exists = fs.existsSync(projectsPath, data.encoding);

    if (!exists) {
      console.log(seeHelp, "\nInvalid projectsPath", projectsPath);
      quit();
    }
  }

  if (!entities && entities !== false) {
    console.log(`${seeHelp} \njson file does not contain entities key`);
    quit();
  } else if (
    false === (typeof entities === "object" && typeof entities !== null)
  ) {
    console.log(
      `${seeHelp} \nentities key must be a valid object map`,
      entities
    );
    quit();
  } else {
    for (const key in entities) {
      if (typeof key !== "string") {
        console.log(`${seeHelp} \nentities key must be a string`, key);
        quit();
      } else {
        let path = projectsPath;

        if (key.match(/^\.\//g)) {
          path = `${path}/${key.slice(2)}`;
        } else if (key.match(/^\//g)) {
          path = `${path}/${key.slice(1)}`;
        } else {
          path += key;
        }
        console.log(path);
      }

      if (typeof entities[key] !== "string") {
        console.log(
          `${seeHelp} \nentities key value must be a string`,
          entities[key]
        );
        quit();
      } else if (!entities[key].length) {
        console.log(
          `${seeHelp} \nentities key value must not be an empty string`,
          entities[key]
        );
        quit();
      } else if (entities[key].match(/\//g)) {
        console.log(
          `${seeHelp} \nentities key value must not contain / character`,
          entities[key]
        );
        quit();
      }
    }
  }
};

module.exports = {
  validateJSONContents,
  parseJSONContents,
  jsonFileExists
};

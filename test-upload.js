const { ScreepsAPI } = require("screeps-api");
const fs = require("fs");

const config = {
  token: "d1fb9679-d595-4d98-b81a-98f393bb4e29",
  protocol: "https",
  hostname: "screeps.com",
  port: 443,
  path: "/"
};

async function main() {
  const api = new ScreepsAPI(config);
  const code = {
    main: fs.readFileSync("./dist/main.js", "utf8")
  };

  try {
    const result = await api.code.set("main", code);
    console.log("UPLOAD SUCCESS!");
    console.log(result);
  } catch (err) {
    console.log("UPLOAD FAILED!");
    console.log(err);
  }
}

main();

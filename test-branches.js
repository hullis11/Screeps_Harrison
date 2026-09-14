const { ScreepsAPI } = require("screeps-api");

const config = {
  token: "d1fb9679-d595-4d98-b81a-98f393bb4e29",
  protocol: "https",
  hostname: "screeps.com",
  port: 443,
  path: "/"
};

async function main() {
  const api = new ScreepsAPI(config);
  try {
    const result = await api.raw.user.branches();
    console.log("SUCCESS!");
    console.log(result);
  } catch (err) {
    console.log("FAILED!");
    console.log(err);
  }
}

main();

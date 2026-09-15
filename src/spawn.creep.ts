const spawnCreeps = {
    spawn(spawn:StructureSpawn): void {


// 1) Define variables before spawning
const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === "harvester");
const builders = _.filter(Game.creeps, (creep) => creep.memory.role === "builder");
const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === "upgrader");
const haulers = _.filter(Game.creeps, (creep) => creep.memory.role === "hauler");
const constructionSites = spawn.room.find(FIND_CONSTRUCTION_SITES);

// Define variable ratios
const totalCreeps = Object.keys(Game.creeps).length;
const harvRatio = harvesters.length/totalCreeps;
const buildRatio = builders.length/totalCreeps;
const upgradeRatio = upgraders.length/totalCreeps;
const numContainer = spawn.room.find(FIND_STRUCTURES, {filter: (structure) =>
                  structure.structureType == STRUCTURE_CONTAINER}).length;


//Bundled if/elseif statements for spawning hierarchy
if (spawn && !spawn.spawning){
    if(harvRatio <= 0.3){
        const newName = "Harvester" + Game.time;

  // spawn creep with the three body parts work carry move
        spawn.spawnCreep([WORK, CARRY, MOVE], newName,{


    // setting memory for when creep is born
           memory: {
      role: "harvester",
      room: spawn.room.name, // store the room
      working: true,
      building: false
    }
  });
  console.log("Spawning:" + newName); // will print spawning and name in console, end spawn fxn
}


// Else-if statement so builders get next priority
      else if(constructionSites.length > 0 && buildRatio <= 0.3) {  // changed to .5 to up builder amount,
                                                                    // will need to change back later
  const builderName = "Builder" + Game.time;

  spawn.spawnCreep([WORK, CARRY, MOVE], builderName,{
    // setting memory for when creep is born
    memory: {
      role: "builder",
      room: spawn.room.name, // store the room
      working: true,
      building: true
    }
  });

 console.log("Spawning:" + builderName); // will print spawning and name in console, end spawn fxn
}

  //Else-if statement for upgraders to get next priority
    else if(upgradeRatio < 0.3){
  const upgraderName = "Upgrader" + Game.time;

  spawn.spawnCreep([WORK, CARRY, MOVE], upgraderName, {
    memory: {
      role: "upgrader",
      room: spawn.room.name,
      working: true,
      building: false
        }
  });
  console.log("Spawning:" + upgraderName);
}


  // else-if statement so haulers get next priority
  // setup to have same number of haulers as containers to avoid congestion
  else if(haulers.length < 5){        // if(haulers.length < numContainer)
const haulerName = "Hauler" + Game.time;

spawn.spawnCreep([WORK, CARRY, MOVE], haulerName, {
memory: {
  role: "hauler",
  room: spawn.room.name,
  working: true,
  building: false
    }}

  )
};

};

    }}; // FINAL CLOSE, KEEP AT BOTTOM

export default spawnCreeps;


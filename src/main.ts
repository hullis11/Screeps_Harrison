import { ErrorMapper } from "utils/ErrorMapper";
import roleHarvester from './role.harvester';
import roleBuilder from './role.builder';
import roleUpgrader from './role.upgrader';


declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definition alone.
          You must also give them an implementation if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
    building: boolean;
  }

}
// Syntax for adding properties to `global` (ex "global.log")
declare const global: {
  log: any;
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

const spawn = Game.spawns["Spawn1"];  // create variable for spawning





////////////////        1) Spawn harvesters       ////////////////






// create harvesters variable, filter the collection of game.creeps, test function for each creep
// see if the memory.role property strictly equals harvester
const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === "harvester")

// create an if statement to spawn new creeps

//if theres less than 2 harvesters, and spawn var exists, and the spawning attribute isnt active
if(harvesters.length <= 2 && spawn && !spawn.spawning){
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

// add else-if statements so harvesters will have first priority
      else if(builders.length<1){

}

      else if(upgraders.length < 5){

}
  console.log("Spawning:" + newName); // will print spawning and name in console, end spawn fxn
}





///////////////////    2) Spawn builders     ////////////////////////////






// setup builders variable
const builders = _.filter(Game.creeps, (creep) => creep.memory.role === "builder")

// setup construction sites variable for use later
const constructionSites = spawn.room.find(FIND_CONSTRUCTION_SITES)

// setup if statement for spawning builders if const sites are present
// include other criteria besides length, make sure spawn is there and isnt busy and there aren't already a
// ton of builders
if(constructionSites.length > 0 && builders.length <2 && spawn && !spawn.spawning) {
  const builderName = "Builder" + Game.time;

  // spawn creep with the three body parts work carry move
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


//////////////// 3. SPAWN UPGRADERS ///////////////

// setup upgrader variable
const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === "upgrader")

// spawn an upgrader, will give better criteria later
if(upgraders.length < 1 && spawn && !spawn.spawning){
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

/////////////             Construct Tower          ////////////////
    // this ID is returning specifically a structure tower
    const tower = Game.getObjectById('TOWER_ID' as Id<HasId>) as StructureTower;
    if(tower) {
        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }







//////////////////// FINAL STEP: tell everyone to do as theyre supposed to /////////////////
for (const name in Game.creeps) {
  const creep = Game.creeps[name];

  if (creep.memory.role === "harvester") {
    roleHarvester.run(creep);
  }

  if (creep.memory.role === "builder") {
    roleBuilder.run(creep);
  }

  if(creep.memory.role === "upgrader"){
    roleUpgrader.run(creep);
  }
}

}); // THESE CLOSE THE EXPORT LOOP, KEEP AT BOTTOM





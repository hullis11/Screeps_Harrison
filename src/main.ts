import { ErrorMapper } from "utils/ErrorMapper";
import roleHarvester from './role.harvester';
import roleBuilder from './role.builder';
import roleUpgrader from './role.upgrader';
import roleHauler from './role.hauler';


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
    sourceId?: string;
    container?: string;
    destination?: string;
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
      else if(constructionSites.length > 0 && buildRatio <= 0.5) {  // changed to .5 to up builder amount,
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
    else if(upgradeRatio <= 0.4){
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
  else if(haulers.length < numContainer){
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
  };

  if(creep.memory.role === "hauler"){
    roleHauler.run(creep)
  }
}

// Log the number of each role in console
console.log((_.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length), 'Harvesters');
console.log((_.filter(Game.creeps, (creep) => creep.memory.role === 'builder').length), 'Builders');
console.log((_.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length), 'Upgraders');

}); // THESE CLOSE THE EXPORT LOOP, KEEP AT BOTTOM









/////////////             Construct Tower          ////////////////
    // this ID is returning specifically a structure tower
 //   const tower = Game.getObjectById('TOWER_ID' as Id<HasId>) as StructureTower;
  //  if(tower) {
   //     const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //        filter: (structure) => structure.hits < structure.hitsMax
   //     });
    //    if(closestDamagedStructure) {
     //       tower.repair(closestDamagedStructure);
      //  }

 //       const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
 //       if(closestHostile) {
 //           tower.attack(closestHostile);
 //       }
 //   }



  ////////////       ASSIGNING SPECIFIC SOURCES TO EACH CREEP AT SPAWN       /////////
  // const sources = spawn.room.find(FIND_SOURCES);

  // for the source within this specific map
  // const sourceCounts = sources.map((source) => {
  // return where the creeps assigned source ID is the same as the ID of the source currently
  // being evaluated in this iteration
  // return _.filter(Game.creeps, (creep) => creep.memory.sourceId === source.id).length
 // });

  // within the list of sources
 // const leastCrowdedSourceId = sources[
  // find the index(exact position) of the minimum of the string of sourceCounts
  //  sourceCounts.indexOf(Math.min(...sourceCounts))
  //].id


      // construct sources list
 // const sources = spawn.room.find(FIND_SOURCES);
//
  // for the source within this specific map
//  const sourceCounts = sources.map((source) => {
  // return where the creeps assigned source ID is the same as the ID of the source currently
  // being evaluated in this iteration
 //  return _.filter(Game.creeps, (creep) => creep.memory.sourceId === source.id).length
 // });

  // within the list of sources
////  const leastCrowdedSourceId = sources[
  // find the index(exact position) of the minimum of the string of sourceCounts
//    sourceCounts.indexOf(Math.min(...sourceCounts))
//  ].id

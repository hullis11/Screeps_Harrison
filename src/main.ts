import { ErrorMapper } from "utils/ErrorMapper";
import roleHarvester from './role.harvester';
import roleBuilder from './role.builder';
import roleUpgrader from './role.upgrader';
import roleHauler from './role.hauler';
import spawnCreeps from './spawn.creep';
import structureTowers from './structure.tower'


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

spawnCreeps.spawn(spawn);


// constructing a list of the towers that exist in this current loop
//const towers: StructureTower[] = _.filter(Game.structures, (structure) =>
 // {
//      return structure.structureType === STRUCTURE_TOWER;
//}) as StructureTower[];


// structureTower.run(towers);


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
  };
};

// Log the number of each role in console
console.log("Energy:", spawn.room.energyAvailable);
console.log("Construction sites:", spawn.room.find(FIND_CONSTRUCTION_SITES).length);
console.log((_.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length), 'Harvesters');
console.log((_.filter(Game.creeps, (creep) => creep.memory.role === 'builder').length), 'Builders');
console.log((_.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length), 'Upgraders');
console.log((_.filter(Game.creeps, (creep) => creep.memory.role === 'hauler').length), 'Haulers');

}); // THESE CLOSE THE EXPORT LOOP, KEEP AT BOTTOM












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

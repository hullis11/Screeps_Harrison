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



 // constructing an array of structures
 const structureKeys:string[] = Object.keys(Game.structures);
 const structures: Structure<StructureConstant>[] = structureKeys.map((key:string) => Game.structures[key])

 // constructing a variable that will make a list of all spawns/towers
 const spawns: StructureSpawn[] = [];
 const towers: StructureTower[] = [];

 // for every structure in structures, if its a spawn push it to the spawn var and same for tower
 for (const struct of structures) {
  if (struct.structureType === STRUCTURE_SPAWN) {
    spawns.push(struct as StructureSpawn)
  };

  if(struct.structureType === STRUCTURE_TOWER){
    towers.push(struct as StructureTower)
  };
 };

spawns.forEach((spawn: StructureSpawn) => {
  spawnCreeps.spawn(spawn)
});


structureTowers.run(towers);


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








// Commands for uploading to github
    // git add .
    // git commit -m "Note here"
    // git push origin main
    //git remote -v



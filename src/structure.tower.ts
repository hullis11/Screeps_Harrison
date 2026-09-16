    // An object called structureTowers will have a function named run,
    // which takes 1 input(towers) of type StructureTower[array/list]
const structureTowers: {
    run(towers: StructureTower[]): void {

  const tower = Game.getObjectById(towerId) as StructureTower;

    // if tower exists
    if(tower) {

        // construct closest damaged structure variable
        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {

            // filter to any structure with less than full health
            filter: (structure) => structure.hits < structure.hitsMax
        });

        // if closest damaged structure variable exists, repair it
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        // construct closest hostile variable and attack it
        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }



    }
   };


   export default structureTowers;



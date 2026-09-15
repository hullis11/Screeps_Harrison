const roleBuilder = {

    run(creep: Creep): void {
        // if resource energy is zero, harvest
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        // if free capacity is zero, then full of energy and build
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }
        // if creep currently in building mode, go find construction sites
        if(creep.memory.building) {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            // if target isnt in range, move to target
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        // if not in building mode currently, find sources and harvest
        else {
            const closestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES,{

                // filter structure for type container and capacity for energy is greater than zero
                filter: (structure) =>
                    structure.structureType == STRUCTURE_CONTAINER &&
                    (structure as StructureContainer).store[RESOURCE_ENERGY] > 0
            });
            if(closestContainer && (closestContainer as StructureContainer).store[RESOURCE_ENERGY]>50){
                if(creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                 creep.moveTo(closestContainer)
                };
            }
            else{
        const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
            }
        }
    }
};

export default roleBuilder;

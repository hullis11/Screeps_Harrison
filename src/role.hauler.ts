const roleHauler = {
    run(creep: Creep): void {

        // Create container variables
const closestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: (structure) =>
        structure.structureType == STRUCTURE_CONTAINER &&
        structure.store[RESOURCE_ENERGY] > 50
});

// Draw energy from nearest container
if (creep.store[RESOURCE_ENERGY] === 0) {

    if (closestContainer) {

        if (creep.withdraw(closestContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closestContainer, {
                visualizePathStyle: {stroke: '#ffaa00'}
            });
        }

    }

} else {

    // construct target for hauler to bring energy to
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_SPAWN;
        }
    });

    if (creep.store.getFreeCapacity() === 0) {

        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {
                visualizePathStyle: {stroke: '#ffaa00'}
            });
        }

    }
    }
}
};



export default roleHauler;








/// Code for later when im able to create more containers

        // Define container and destination variables
//        const container = creep.memory.container
//       const destination = creep.memory.destination

//        if(creep.store[RESOURCE_ENERGY] === 0) {
//            if(creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
//                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
//            }
//        }
//        else{
//            if(creep.store.getFreeCapacity === 0){
//                if(creep.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                creep.moveTo(destination, {visualizePathStyle: { stroke: '#ffffff' }});
//            }
//        }
//    }

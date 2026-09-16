const roleHauler = {
    run(creep: Creep): void {

        // Create container variables, and a source variable so the container can be near source
const source = creep.room.find(FIND_SOURCES)[0];

const closestContainer = source.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: (structure) =>
        structure.structureType == STRUCTURE_CONTAINER &&
        structure.store[RESOURCE_ENERGY] > 49
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

    const containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
    }) as StructureContainer[];

    const controller = creep.room.controller;

    const spawnTarget = creep.room.find(FIND_MY_SPAWNS)[0];

    const controllerContainer = controller?.pos.findClosestByRange(containers);
    // 1st priority: containers near controller
    if (controllerContainer &&
        controllerContainer.store[RESOURCE_ENERGY] < 1000) {

        if (creep.transfer(controllerContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(controllerContainer, {
                visualizePathStyle: { stroke: '#ffaa00' }
            });
        }

    // 2nd priority: spawn
    } else if (spawnTarget &&
               spawnTarget.store[RESOURCE_ENERGY] < 200) {

        if (creep.transfer(spawnTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(spawnTarget, {
                visualizePathStyle: { stroke: '#ffaa00' }
            });
        }

    // 3rd priority: other containers
    } else {

        const storageContainer = creep.pos.findClosestByPath(containers, {
            filter: (container) =>
                container.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });

        if (storageContainer) {

            if (creep.transfer(storageContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(storageContainer, {
                    visualizePathStyle: { stroke: '#ffaa00' }
                });
            }
        }
    }
};
}
}

export default roleHauler;

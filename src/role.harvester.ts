const roleHarvester = {
    run(creep: Creep): void {

        if(creep.store[RESOURCE_ENERGY] < 50) {

            const sources = creep.room.find(FIND_SOURCES);


            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }}

// add else fxn for containers BEFORE going to spawn/extension/tower
        else if(creep.store[RESOURCE_ENERGY] === 50){       // NOTE: will need to change once capacity increases

            // construct container variable
            const closestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter: (structure) =>
                    structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });

            // if closest container exists, transfer to closest container
            if(closestContainer){
                if(creep.transfer(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestContainer, {visualizePathStyle: { stroke: '#ffffff' }});
                }}

        else {

            const targets = creep.room.find(FIND_STRUCTURES, {

// filter for either extensions, spawns or towers AND capacity for energy is greater than zero
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            })

            // if theres targets, then transfer energy to targets. Or move to targets if theyre not in range
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    };

    // Construct number of harvesters variable for dynamic spawning
    function numHarvesters(room:Room): number {
        const sources = room.find(FIND_SOURCES);
        return sources.length*3;
    }
}
};


export default roleHarvester;

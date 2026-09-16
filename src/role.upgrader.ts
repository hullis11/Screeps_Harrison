const roleUpgrader = {
    run(creep: Creep): void {

        if(creep.store[RESOURCE_ENERGY] === 0) {

            const closestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES,{

                // filter structure for type container and capacity for energy is greater than zero
                filter: (structure) =>
                    structure.structureType == STRUCTURE_CONTAINER &&
                    (structure as StructureContainer).store[RESOURCE_ENERGY] > 0
            });
            if(closestContainer && (closestContainer as StructureContainer).store[RESOURCE_ENERGY]>49){
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

        else{
            if(creep.room.controller){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }}
        }
    };

export default roleUpgrader;

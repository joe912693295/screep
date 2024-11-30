const role_remote_miner = {
    run: function(creep) {
        
        if (creep.memory.bornplace !== "W15N59"){
            creep.memory.bornplace = "W15N59"
        }
        
        // If no target flag, assign the miner to a resource flag
        if (!creep.memory.targetFlag) {
            // Find an unassigned resource flag
            const availableFlags = _.filter(Game.flags, flag => 
                flag.color === COLOR_GREEN && (!flag.memory.assignedMiner || !Game.creeps[flag.memory.assignedMiner])
            );

            if (availableFlags.length > 0) {
                const targetFlag = availableFlags[0];
                creep.memory.targetFlag = targetFlag.name;
                targetFlag.memory.assignedMiner = creep.name;  // Assign this miner to the flag
                console.log(`${creep.name} assigned to flag: ${targetFlag.name}`);
            } else {
                console.log(`No available flags for ${creep.name}`);
                return;
            }
        }

        const targetFlag = Game.flags[creep.memory.targetFlag];

        // If the target flag doesn't exist or the resource is gone, reset the assignment
        if (!targetFlag) {
            console.log(`${creep.name}: No target flag found.`);
            delete creep.memory.targetFlag;
            return;
        }

        // Mining logic
        if (creep.room.name === targetFlag.pos.roomName) {
            const deposit = Game.getObjectById(targetFlag.name);
            if (deposit) {
                if (creep.harvest(deposit) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(deposit);
                }
            } else {
                console.log(`${creep.name}: Resource not found, removing flag assignment.`);
                delete creep.memory.targetFlag;
                delete targetFlag.memory.assignedMiner;
            }
        } else {
            creep.moveTo(targetFlag.pos);
        }

        // If miner's carry is full or about to die, return to base
        if (creep.store.getFreeCapacity() < creep.getActiveBodyparts(WORK).length || creep.ticksToLive < 200) {
            const factory = Game.getObjectById('66814048136e72ae2310ccb7')
                if (factory) {
                    creep.memory.moving_target = factory
                    creep.transfer(factory,RESOURCE_SILICON);
                }
        }

        // If miner is empty and at home, recycle the creep
        if (creep.ticksToLive < 200 && creep.store.getUsedCapacity() === 0 && creep.room.name === creep.memory.bornplace) {
            const spawn = creep.room.find(FIND_MY_SPAWNS)[0];
            if (spawn) {
                if (creep.pos.isNearTo(spawn)) {
                    spawn.recycleCreep(creep);
                    // Clear the flag assignment when the miner is recycled
                    if (targetFlag && targetFlag.memory.assignedMiner === creep.name) {
                        delete targetFlag.memory.assignedMiner;
                    }
                } else {
                    creep.moveTo(spawn);
                }
            }
        }
    }
};

module.exports = role_remote_miner;

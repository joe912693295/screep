const role_local_builder = {
    run: function(creep) {

        if (creep.room.lab[0] && 
        creep.room.lab[0].store["LH"] >= 30 &&
        creep.memory.labsreached !== true && 
        creep.ticksToLive > 1000 ){
            creep.memory.moving_target = creep.room.lab[0]
            if (creep.room.lab[0].pos.isNearTo(creep) && creep.body[0].boost == undefined ){
                creep.room.lab[0].boostCreep(creep);
            } else if (creep.body[0].boost !== undefined){
                creep.memory.labsreached = true
            }
        } else {
            const room_myconstructionsites = creep.room.find(FIND_CONSTRUCTION_SITES);
            const room_ramparts_NF = creep.room.rampart.filter((i) =>  i.hits < i.hitsMax);
            const room_walls_NF = creep.room.constructedWall.filter((i) =>  i.hits < i.hitsMax);
            
            if ( creep.store[RESOURCE_ENERGY] == 0 ){
                
                if ( creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 10000) {
                    creep.memory.moving_target = creep.room.storage
                    creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                // } else if ( creep.room.link.length > 0 && creep.room.link[0].store[RESOURCE_ENERGY] > 0){
                //     creep.memory.moving_target = creep.room.link[0]; 
                //     creep.withdraw(creep.room.link[0], RESOURCE_ENERGY);
                } else if ( !creep.room.storage ){
                    
                    const room_energy_droppeds_gt_amount = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (i) => i.resourceType == RESOURCE_ENERGY && i.amount > creep.store.getCapacity()/2 });
                    if (room_energy_droppeds_gt_amount.length > 1){
                        room_energy_droppeds_gt_amount.sort((a, b) => a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep));
                    }
                    const room_energyminer_containers = creep.room.container.filter((i) => !i.pos.isNearTo(creep.room.mineral));
                    if (room_energyminer_containers.length > 1 ){
                        if (room_energyminer_containers[0].store[RESOURCE_ENERGY] < creep.store.getCapacity() ){
                            room_energyminer_containers.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
                        } else {
                            room_energyminer_containers.sort((a, b) => a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep));
                        }
                    }
                    if ( room_energy_droppeds_gt_amount.length > 0 ){
                        creep.memory.moving_target = room_energy_droppeds_gt_amount[0]; 
                        creep.pickup(room_energy_droppeds_gt_amount[0]);
                    } else if (room_energyminer_containers.length > 0 ){
                        creep.memory.moving_target = room_energyminer_containers[0];
                        creep.withdraw(room_energyminer_containers[0],RESOURCE_ENERGY);
                    }
                }
            } else {
                
                    // repair walls/ramparts under attack
                if ( room_myconstructionsites.length > 0 ){
                    if ( creep.pos.getRangeTo(room_myconstructionsites[0]) > 3 ){
                        creep.memory.moving_target = room_myconstructionsites[0];
                    } else if ( creep.pos.getRangeTo(room_myconstructionsites[0]) <= 3 ){
                        creep.memory.moving_target = undefined
                        creep.build(room_myconstructionsites[0]);
                    }
                } else if ( room_walls_NF.length > 0 && creep.room.storage ){
                    // room_walls_NF.sort((a, b) => a.hits - (b.hits + creep.store.getCapacity()*100) );
                    if ( creep.pos.getRangeTo(room_walls_NF[0]) > 3 ){
                        creep.memory.moving_target = room_walls_NF[0];
                    } else if ( creep.pos.getRangeTo(room_walls_NF[0]) <= 3 ){
                        creep.memory.moving_target = undefined
                        creep.repair(room_walls_NF[0]);
                    }
                } else if ( room_ramparts_NF.length > 0 && creep.room.storage ){
                    // room_ramparts_NF.sort((a, b) => a.hits - (b.hits + creep.store.getCapacity()*100) );
                    if ( creep.pos.getRangeTo(room_ramparts_NF[0]) > 3 ){
                        creep.memory.moving_target = room_ramparts_NF[0];
                    } else if ( creep.pos.getRangeTo(room_ramparts_NF[0]) <= 3 ){
                        creep.memory.moving_target = undefined
                        creep.repair(room_ramparts_NF[0]);
                    }
                } else {
                    if ( creep.pos.getRangeTo(creep.room.controller) > 3 ){
                        creep.memory.moving_target = creep.room.controller;
                    } else {
                        creep.memory.moving_target = undefined
                        creep.upgradeController(creep.room.controller);
                    }
                }
            }
        }
        
        
    }
};
module.exports = role_local_builder;
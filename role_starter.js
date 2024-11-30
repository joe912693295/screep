const role_starter = {
    run: function(creep) {
        
        // if ( creep.memory.bornplace == 'W7N53' ){
        //     creep.memory.borntime = 2
        // }
    
        if ( creep.memory.harvest == null ){
            creep.memory.harvest = true
        } else if ( creep.memory.harvest == false ){
            
            const room_spawns_NF = creep.room.spawn.filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 0 );
            const room_extensions_NF = creep.room.extension.filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 0 );
            const room_myconstructionsites = creep.room.constructionSite;
            const room_name = creep.memory.bornplace
            const creepsArray = Object.values(Game.creeps);
            const room_local_builders = creepsArray.filter((i) => i.memory.bornplace == room_name && i.memory.role == 'role_local_builder');
            if (room_local_builders.length > 1){
                room_local_builders.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY] );
            }
            const room_local_upgraders = creepsArray.filter((i) => i.memory.bornplace == room_name && i.memory.role == 'role_local_upgrader');
            if (room_local_upgraders.length > 1){
                room_local_upgraders.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY] );
            }
            
            
            if (room_spawns_NF.length > 0 ){
                creep.memory.moving_target = room_spawns_NF[0]; 
                creep.transfer(room_spawns_NF[0], RESOURCE_ENERGY);
            } else if(room_extensions_NF.length > 0 ) {
                creep.memory.moving_target = room_extensions_NF[0]; 
                creep.transfer(room_extensions_NF[0], RESOURCE_ENERGY);
                if (room_extensions_NF[0].store.getFreeCapacity(RESOURCE_ENERGY) === 0){
                    room_extensions_NF.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                }
            } else if (room_myconstructionsites.length > 0){
                if ( room_local_builders.length > 0 && room_local_builders[0].store[RESOURCE_ENERGY] == 0 ){
                    creep.memory.moving_target = room_local_builders[0]; 
                    creep.transfer(room_local_builders[0],RESOURCE_ENERGY);
                } else {
                    if ( creep.pos.getRangeTo(room_myconstructionsites[0]) > 3 ){
                        creep.memory.moving_target = room_myconstructionsites[0];
                    } else {
                        creep.memory.moving_target = undefined
                        creep.build(room_myconstructionsites[0]);
                    }
                }
            } else {
                if ( room_local_upgraders.length > 0 && room_local_upgraders[0].store[RESOURCE_ENERGY] == 0 ){
                    creep.memory.moving_target = room_local_upgraders[0]; 
                    creep.transfer(room_local_upgraders[0],RESOURCE_ENERGY);
                } else {
                    if ( creep.pos.getRangeTo(creep.room.controller) > 3 ){
                        creep.memory.moving_target = creep.room.controller;
                    } else {
                        creep.memory.moving_target = undefined
                        creep.upgradeController(creep.room.controller);
                    }
                }
            }
            
            if (creep.store.getUsedCapacity() == 0){
                creep.memory.harvest = true
            } else {
                creep.memory.harvest = false
            }
            
        } else if ( creep.memory.harvest == true ){
            
            const room_energy_droppeds_gt_amount = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (i) => i.resourceType == RESOURCE_ENERGY && i.amount > creep.store.getCapacity()/2 });
            const room_energyminer_containers = creep.room.container.filter((i) => !i.pos.isNearTo(creep.room.mineral));
            
            if ( room_energy_droppeds_gt_amount.length > 0 ){
                if (room_energy_droppeds_gt_amount[0].amount < (3 * creep.store.getCapacity()) ){
                    room_energy_droppeds_gt_amount.sort((a, b) => b.amount - a.amount);
                }
                // room_energy_droppeds_gt_amount.sort((a, b) => b.amount - a.amount);
                creep.memory.moving_target = room_energy_droppeds_gt_amount[0]; 
                creep.pickup(room_energy_droppeds_gt_amount[0]);
            } else if (room_energyminer_containers.length > 0 ){
                if ( room_energyminer_containers[0].store[RESOURCE_ENERGY] < creep.store.getFreeCapacity(RESOURCE_ENERGY) ){
                    room_energyminer_containers.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY] );
                }
                creep.memory.moving_target = room_energyminer_containers[0];
                creep.withdraw(room_energyminer_containers[0],RESOURCE_ENERGY);
            } else if ( creep.room.link.length >= 2 && creep.room.link[0].store[RESOURCE_ENERGY] > 0){
                creep.memory.moving_target = creep.room.link[0]; 
                creep.withdraw(creep.room.link[0],RESOURCE_ENERGY);
            } else if ( creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] > terminal_energy_amount_max ){
                creep.memory.moving_target = creep.room.terminal; 
                creep.withdraw(creep.room.terminal,RESOURCE_ENERGY);
            } else if ( creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 0 ){
                creep.memory.moving_target = creep.room.storage; 
                creep.withdraw(creep.room.storage,RESOURCE_ENERGY);
            }
            
            if ( creep.memory.borntime % 2 === 0 ){
                var source_num = 0
            } else {
                var source_num = 1
            }
            
            if (creep.store.getFreeCapacity() == 0 
                || creep.room.source[source_num].energy == 0
                || room_energy_droppeds_gt_amount.length == 0
            ){
                creep.memory.harvest = false
            } else {
                creep.memory.harvest = true
            }
            
            creep.memory.moving_target = creep.room.source[source_num]
            creep.harvest(creep.room.source[source_num])
            
        }
        
        
        
    }
};
module.exports = role_starter;
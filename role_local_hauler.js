const {
    go_get,
    go_put
} = require('functions');

const role_local_hauler = {
    run: function(creep) {
        
        const defense_amount_start = 301;
        const defense_amount_min = 10000;
        // const defense_amount_max = 1000000;
        const storage_energy_amount_min = 10000;
        const storage_energy_amount_max = 15000;
        
        const terminal_energy_amount_min = 10000;
        const terminal_energy_amount_max = 15000;
        const factory_energy_amount_min = 500;
        const factory_energy_amount_max = 1500;
        
        const creepsArray = Object.values(Game.creeps);
        const room_name = creep.memory.bornplace;
        const room_local_builders = creepsArray.filter((i) => i.memory.bornplace == room_name && i.memory.role == 'role_local_builder');
        const role_local_haulers = creepsArray.filter((i) => i.memory.bornplace == room_name && i.memory.role == 'role_local_hauler');
        const room_local_upgraders = creepsArray.filter((i) => i.memory.bornplace == room_name && i.memory.role == 'role_local_upgrader');
        
        if ( creep.store.getUsedCapacity() == 0 ){
            
            const room_mineral_containers = creep.room.container.filter((i) => i.pos.isNearTo(creep.room.mineral));
            
            if (!creep.room.storage){
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
                }
            // } else if ( creep.room.factory && creep.room.factory.store[RESOURCE_ENERGY] > factory_energy_amount_max ){
            //     creep.memory.moving_target = room_factorys[0]; 
            //     creep.withdraw(creep.room.factory,RESOURCE_ENERGY);
            } else if ( room_mineral_containers.length > 0 
                && (room_mineral_containers[0].store.getUsedCapacity() > creep.store.getCapacity() || (room_mineral_containers[0].store.getUsedCapacity() > 0 && creep.room.mineral.mineralAmount == 0 ))
                && creep.room.energyAvailable > creep.room.energyCapacityAvailable/2 
                && role_local_haulers[0].name == creep.name
                ){
                creep.memory.moving_target = room_mineral_containers[0]
                let stored_resources = _.filter(Object.keys(room_mineral_containers[0].store), resource => room_mineral_containers[0].store[resource] > 0);
                creep.withdraw(room_mineral_containers[0], stored_resources[0] );
            } else if ( creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] > terminal_energy_amount_max ){
                creep.memory.moving_target = creep.room.terminal; 
                creep.withdraw(creep.room.terminal,RESOURCE_ENERGY);
                
            } else {
                const dropped_resources = creep.room.find(FIND_DROPPED_RESOURCES)
                const tomb_NE = creep.room.find(FIND_TOMBSTONES, { filter: (i) => Object.keys(i.store).length > 0 });
                if (dropped_resources.length > 0){
                    creep.memory.moving_target = dropped_resources[0]; 
                    creep.pickup(dropped_resources[0]);
                } else if (tomb_NE.length > 0){
                    let stored_resources = _.filter(Object.keys(tomb_NE[0].store), resource => tomb_NE[0].store[resource] > 0) ;
                    creep.memory.moving_target = tomb_NE[0]; 
                    creep.withdraw(tomb_NE[0],stored_resources[0]);
                } else if ( creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 0 ){
                    creep.memory.moving_target = creep.room.storage; 
                    creep.withdraw(creep.room.storage,RESOURCE_ENERGY);
                } else if ( creep.room.link.length > 0 && creep.room.link[0].store[RESOURCE_ENERGY] > 0){
                    creep.memory.moving_target = creep.room.link[0]; 
                    creep.withdraw(creep.room.link[0],RESOURCE_ENERGY);
                }
            }
            
        } else {
            
            // const room_spawns_NF = creep.room.spawn.filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 0 );
            const room_extensions_NF = creep.room.extension.filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 0 );
            const room_towers_NF = creep.room.tower.filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 100 );
            const room_labs_energy_NF = creep.room.lab.filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 0 );
            // const room_walls_NF = creep.room.constructedWall.filter((i) =>  i.hits < i.hitsMax);
            
            
            if (room_local_builders.length > 1){
                room_local_builders.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY] );
            }
            if (room_local_upgraders.length > 1){
                room_local_upgraders.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY] );
            }
            // const room_local_managers = creepsArray.filter((i) => i.memory.bornplace == room_name && i.memory.role == 'role_local_manager');
            
            
            if ( !creep.room.terminal && creep.room.storage && creep.store.getUsedCapacity() !== 0 && creep.store[RESOURCE_ENERGY] < creep.store.getUsedCapacity() ) {
                let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0) ;
                creep.memory.moving_target = creep.room.storage; 
                creep.transfer(creep.room.storage, stored_resources[0]);
            } else if ( creep.room.terminal && creep.store.getUsedCapacity() > 0 && creep.store[RESOURCE_ENERGY] < creep.store.getUsedCapacity() ) {
                let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0) ;
                creep.memory.moving_target = creep.room.terminal; 
                creep.transfer(creep.room.terminal, stored_resources[0]);
            } else if( room_extensions_NF.length > 0 ) {
                if ( Game.time % 5 === 0){
                    room_extensions_NF.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                }
                creep.memory.moving_target = room_extensions_NF[0]; 
                creep.transfer(room_extensions_NF[0], RESOURCE_ENERGY);
                // if (room_extensions_NF[0].store.getFreeCapacity(RESOURCE_ENERGY) === 0){
                //     room_extensions_NF.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                // }
            // } else if ( !creep.room.storage ){
            //     if ( creep.room.spawn[0].store[RESOURCE_ENERGY] > 0 ) {
            //         creep.memory.moving_target = creep.room.spawn[0]; 
            //         creep.transfer(creep.room.spawn[0], RESOURCE_ENERGY);
            //     } else if ( room_towers_NF.length > 0 ){
            //         creep.memory.moving_target = room_towers_NF[0]; 
            //         creep.transfer(room_towers_NF[0], RESOURCE_ENERGY);
            //     } else if ( room_local_upgraders.length > 0 ) { 
            //         creep.memory.moving_target = room_local_upgraders[0]; 
            //         creep.transfer(room_local_upgraders[0],RESOURCE_ENERGY);
            //     }
            } else if ( room_labs_energy_NF.length > 0 ) {
                creep.memory.moving_target = room_labs_energy_NF[0]; 
                creep.transfer(room_labs_energy_NF[0], RESOURCE_ENERGY);
            } else if ( creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] < terminal_energy_amount_min ){
                creep.memory.moving_target = creep.room.terminal; 
                creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
            } else if ( creep.room.link.length >= 3 && room_local_builders.length > 0 ) {
                creep.memory.moving_target = room_local_builders[0]; 
                creep.transfer(room_local_builders[0], RESOURCE_ENERGY);
            } else if ( creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 ){
                creep.memory.moving_target = creep.room.storage; 
                creep.transfer(creep.room.storage, RESOURCE_ENERGY);
            }
        }
            
    }
};
module.exports = role_local_hauler;
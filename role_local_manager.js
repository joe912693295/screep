const role_local_manager = {
    run: function(creep) {
        
        const terminal_energy_amount_min = 10000;
        const terminal_energy_amount_max = 15000;
        const factory_energy_amount_min = 500;
        // const factory_energy_amount_max = 1500;
        
        const room_spawns = creep.room.spawn;
        const room_links = creep.room.link;
        const room_labs = creep.room.lab;
        const room_factory = creep.room.factory
        const room_towers_NF = creep.room.tower.filter((i) => i.store.getFreeCapacity(RESOURCE_ENERGY) > 100 );
        creep.memory.moving_target = undefined; // reset
        // lab must be build one by one and from room_labs[0] to room_labs[9], one by one, that's a 100K energy paid lession
        
        
        
        if ( creep.store.getUsedCapacity() == 0 ){
            // room_links[0]
            if ( room_links[0].store[RESOURCE_ENERGY] > 0 ){
                creep.memory.moving_target = room_links[0] ; 
                creep.withdraw(room_links[0],RESOURCE_ENERGY);
                
            // // LH from terminal to lab0
            // } else if ( creep.room.terminal.store["LH"] > 0 && room_labs[0].store["LH"] < 3000 ){
            //     creep.memory.moving_target = creep.room.terminal ; 
            //     creep.withdraw(creep.room.terminal,"LH");
            
            // factory need to fill
            } else if (room_factory){
                if (room_factory.store.getFreeCapacity() > 1000 && creep.room.terminal.store[RESOURCE_SILICON] > 0){
                    creep.memory.moving_target = creep.room.terminal; 
                    creep.withdraw(creep.room.terminal, RESOURCE_SILICON);
                } else if (room_factory.store.getFreeCapacity() > 1000 && creep.room.terminal.store[RESOURCE_UTRIUM_BAR] > 0){
                    creep.memory.moving_target = creep.room.terminal; 
                    creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM_BAR);
                } else if (creep.room.terminal.store.getFreeCapacity() > 1000 && room_factory.store[RESOURCE_WIRE] > 0){
                    creep.memory.moving_target = room_factory; 
                    creep.withdraw(room_factory, RESOURCE_WIRE);
                } else if (room_factory.store.getFreeCapacity() > 1000 && creep.room.terminal.store[RESOURCE_UTRIUM] > 0) {
                    creep.memory.moving_target = creep.room.terminal; 
                    creep.withdraw(creep.room.terminal,RESOURCE_UTRIUM);
                }
                if (room_factory.cooldown == 0){
                    room_factory.produce(RESOURCE_WIRE)
                }
            // need energy to fill structures
            } else if ( room_spawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        || room_towers_NF.length > 0
                        || creep.room.terminal.store[RESOURCE_ENERGY] < terminal_energy_amount_min
                        || creep.room.terminal.store[RESOURCE_ENERGY] > terminal_energy_amount_max
                        || (room_factory && room_factory.store[RESOURCE_ENERGY] < factory_energy_amount_min)
                        ){
                // terminal
                if ( creep.room.terminal.store[RESOURCE_ENERGY] > terminal_energy_amount_max ){
                    creep.memory.moving_target = creep.room.terminal; 
                    creep.withdraw(creep.room.terminal,RESOURCE_ENERGY);
                // storage
                } else if ( creep.room.storage.store[RESOURCE_ENERGY] > 0 ){
                    creep.memory.moving_target = creep.room.storage; 
                    creep.withdraw(creep.room.storage,RESOURCE_ENERGY);
                }
            } else {
                creep.memory.moving_target = room_spawns[0];
            }
        } else if ( creep.store.getUsedCapacity() > 0 ) {
            if (creep.store[RESOURCE_ENERGY] > 0){
                if ( room_spawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0 ) {
                    creep.memory.moving_target = room_spawns[0]; 
                    creep.transfer(room_spawns[0], RESOURCE_ENERGY);
                } else if (room_towers_NF.length > 0){
                    room_towers_NF.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY] );
                    creep.memory.moving_target = room_towers_NF[0]; 
                    creep.transfer(room_towers_NF[0], RESOURCE_ENERGY);
                } else if (creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] < terminal_energy_amount_min ){
                    creep.memory.moving_target = creep.room.terminal; 
                    creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                } else if (room_factory && room_factory.store.getUsedCapacity(RESOURCE_ENERGY) < factory_energy_amount_min){
                    creep.memory.moving_target = room_factory; 
                    creep.transfer(room_factory, RESOURCE_ENERGY);
                } else if ( creep.room.controller.ticksToDowngrade <= 199900 || creep.room.controller.level < 8 ){
                    creep.memory.moving_target = creep.room.controller
                    creep.upgradeController(creep.room.controller);
                } else if (creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 ){
                    creep.memory.moving_target = creep.room.storage; 
                    creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                }
                
            // } else if (creep.store["LH"] > 0 && room_labs[0].store["LH"] < 3000) {
            //     creep.memory.moving_target = room_labs[0]; 
            //     creep.transfer(room_labs[0],"LH");
            
            } else if (room_factory){
                if (room_factory.store.getFreeCapacity() > 1000 && creep.store[RESOURCE_SILICON] > 0) {
                    creep.memory.moving_target = room_factory; 
                    creep.transfer(room_factory,RESOURCE_SILICON);
                } else if (room_factory.store.getFreeCapacity() > 1000 && creep.store[RESOURCE_UTRIUM_BAR] > 0) {
                    creep.memory.moving_target = room_factory; 
                    creep.transfer(room_factory,RESOURCE_UTRIUM_BAR);
                } else if (room_factory.store.getFreeCapacity() > 1000 && creep.store[RESOURCE_UTRIUM] > 0) {
                    creep.memory.moving_target = room_factory; 
                    creep.transfer(room_factory,RESOURCE_UTRIUM);
                } else if (creep.room.terminal.store.getFreeCapacity() > 1000 && creep.store[RESOURCE_WIRE] > 0){
                    creep.memory.moving_target = creep.room.terminal; 
                    creep.transfer(creep.room.terminal, RESOURCE_WIRE);
                }
            } else if (creep.room.terminal && creep.room.terminal.store.getFreeCapacity() > 0 ) {
                let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0);
                creep.memory.moving_target = creep.room.terminal; 
                creep.transfer(creep.room.terminal,stored_resources[0]);
            } else if (creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 ) {
                let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0);
                creep.memory.moving_target = creep.room.storage; 
                creep.transfer(creep.room.storage,stored_resources[0]);
            }
        } else {
            creep.memory.moving_target = room_spawns[0];
        }
        
        
    }
};
module.exports = role_local_manager;
require('极致建筑缓存');
require('超级移动优化');

const {
    get_bodypart,
    calculate_creep_cost,
    spawn_mycreep,
    create_market_order,
    manageTerminals,
    find_resource,
    go_get,
    go_put,
    get_creep_attributes
} = require('functions');


var role_starter = require('role_starter');
var role_local_miner0 = require('role_local_miner0');
var role_local_miner1 = require('role_local_miner1');
var role_local_hauler = require('role_local_hauler');
var role_local_upgrader = require('role_local_upgrader');
var role_local_builder = require('role_local_builder');
var role_local_manager = require('role_local_manager');
var role_local_mineral_miner = require('role_local_mineral_miner');
var role_remote_miner = require('role_remote_miner');



var role_claimer = require('role_claimer');
// Game.rooms['W14N53'].spawn[2].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,HEAL], "role_claimer", { memory: { role: "role_claimer", bornplace: "W14N53" }})
// Game.rooms['W7N53'].spawn[0].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], "role_claimer", { memory: { role: "role_starter", bornplace: "W7N53", borntime: 2 }})


const profiler = require('screeps-profiler');
// profiler.enable();

module.exports.loop = function () {
    // profiler.wrap(function() {
        
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
                continue;
            }
        }
        const W15N59 = Game.rooms['W15N59'];
        const W15N58 = Game.rooms['W15N58'];
        const W15N53 = Game.rooms['W15N53'];
        const W14N53 = Game.rooms['W14N53'];
        const W7N53 = Game.rooms['W7N53'];
        const W15N59_availableSpawn = W15N59.spawn.filter((i) => !i.spawning );
        const W15N58_availableSpawn = W15N58.spawn.filter((i) => !i.spawning );
        const W15N53_availableSpawn = W15N53.spawn.filter((i) => !i.spawning );
        const W14N53_availableSpawn = W14N53.spawn.filter((i) => !i.spawning );
        const W7N53_availableSpawn = W7N53.spawn.filter((i) => !i.spawning );
        // const W15N53_observer = Game.getObjectById('66efab0dafac5ade396c528a')
        // W15N53_observer.observeRoom('W12N55');
        
        
        // Update last spawn time for actual spawning creeps
        const all_myspawns = [...W15N59.spawn, ...W15N58.spawn, ...W15N53.spawn, ...W14N53.spawn, ...W7N53.spawn];
        for (const spawn of all_myspawns){
            if (spawn.spawning) {
                const spawningRole = Game.creeps[spawn.spawning.name].memory.role;
                const room_name = Game.creeps[spawn.spawning.name].memory.bornplace;
                Memory.lastSpawnTime[room_name][spawningRole] = Game.time + spawn.spawning.remainingTime;
            }
        }
        
        if ( W15N59_availableSpawn.length > 0 ){
            spawn_mycreep('W15N59',W15N59_availableSpawn[0],'role_local_miner0',1);
            spawn_mycreep('W15N59',W15N59_availableSpawn[0],'role_local_miner1',1);
            spawn_mycreep('W15N59',W15N59_availableSpawn[0],'role_local_hauler',1);
            // spawn_mycreep('W15N59',W15N59_availableSpawn[0],'role_local_builder',2);
            // spawn_mycreep('W15N59',W15N59_availableSpawn[0],'role_local_upgrader',1);
            spawn_mycreep('W15N59',W15N59_availableSpawn[0],'role_local_manager',1);
            if (W15N59.mineral.mineralAmount !== 0){
                spawn_mycreep('W15N59',W15N59_availableSpawn[0],'role_local_mineral_miner',1);
            }
            const deposits = _.filter(Game.flags, flag => flag.color === COLOR_GREEN)
            spawn_mycreep('W15N59',W15N59_availableSpawn[0],'role_remote_miner',deposits.length);
        }
        // create a arrary of constructedWall of the boarder, sort by hits, if lowest is below a num, active safe mode.
        
        if ( W15N58_availableSpawn.length > 0 ){
            spawn_mycreep('W15N58',W15N58_availableSpawn[0],'role_local_miner0',1);
            spawn_mycreep('W15N58',W15N58_availableSpawn[0],'role_local_miner1',1);
            spawn_mycreep('W15N58',W15N58_availableSpawn[0],'role_local_hauler',1);
            // spawn_mycreep('W15N58',W15N58_availableSpawn[0],'role_local_builder',2);
            // spawn_mycreep('W15N58',W15N58_availableSpawn[0],'role_local_upgrader',1);
            spawn_mycreep('W15N58',W15N58_availableSpawn[0],'role_local_manager',1);
            if (W15N58.mineral.mineralAmount !== 0){
                spawn_mycreep('W15N58',W15N58_availableSpawn[0],'role_local_mineral_miner',1);
            }
        }
        // create a arrary of constructedWall of the boarder, sort by hits, if lowest is below a num, active safe mode.
        if ( W15N53_availableSpawn.length > 0 ){
            spawn_mycreep('W15N53',W15N53_availableSpawn[0],'role_local_miner0',1);
            spawn_mycreep('W15N53',W15N53_availableSpawn[0],'role_local_miner1',1);
            spawn_mycreep('W15N53',W15N53_availableSpawn[0],'role_local_hauler',1);
            // spawn_mycreep('W15N53',W15N53_availableSpawn[0],'role_local_builder',2);
            // spawn_mycreep('W15N53',W15N53_availableSpawn[0],'role_local_upgrader',1);
            spawn_mycreep('W15N53',W15N53_availableSpawn[0],'role_local_manager',1);
            if (W15N53.mineral.mineralAmount !== 0){
                spawn_mycreep('W15N53',W15N53_availableSpawn[0],'role_local_mineral_miner',1);
            }
        }
        // create a arrary of constructedWall of the boarder, sort by hits, if lowest is below a num, active safe mode.
        if ( W14N53_availableSpawn.length > 0 ){
            spawn_mycreep('W14N53',W14N53_availableSpawn[0],'role_local_miner0',1);
            spawn_mycreep('W14N53',W14N53_availableSpawn[0],'role_local_miner1',1);
            spawn_mycreep('W14N53',W14N53_availableSpawn[0],'role_local_hauler',1);
            // spawn_mycreep('W14N53',W14N53_availableSpawn[0],'role_local_builder',2);
            // spawn_mycreep('W14N53',W14N53_availableSpawn[0],'role_local_upgrader',1);
            spawn_mycreep('W14N53',W14N53_availableSpawn[0],'role_local_manager',1);
            if (W14N53.mineral.mineralAmount !== 0){
                spawn_mycreep('W14N53',W14N53_availableSpawn[0],'role_local_mineral_miner',1);
            }
            
            // spawn_mycreep('W14N53',W14N53_availableSpawn[0],'role_newroom_starter',4);
        }
        // create a arrary of constructedWall of the boarder, sort by hits, if lowest is below a num, active safe mode.
        if ( W7N53_availableSpawn.length > 0 ){
            spawn_mycreep('W7N53',W7N53_availableSpawn[0],'role_local_miner0',1);
            spawn_mycreep('W7N53',W7N53_availableSpawn[0],'role_local_miner1',1);
            spawn_mycreep('W7N53',W7N53_availableSpawn[0],'role_local_hauler',1);
            // spawn_mycreep('W7N53',W7N53_availableSpawn[0],'role_local_builder',2);
            // spawn_mycreep('W7N53',W7N53_availableSpawn[0],'role_local_upgrader',1);
            spawn_mycreep('W7N53',W7N53_availableSpawn[0],'role_local_manager',1);
            if (W7N53.mineral.mineralAmount !== 0){
                spawn_mycreep('W7N53',W7N53_availableSpawn[0],'role_local_mineral_miner',1);
            }
        }
        // create a arrary of constructedWall of the boarder, sort by hits, if lowest is below a num, active safe mode.
        
        
        // Quitted friends : "IceDream","idrusoh","Chequer",
        const white_list = ["joe95","Morpho","BigCatCat","DemonFCG","Oats"];
        const my_roomName_arrary = ["W15N59","W15N58","W15N53","W14N53","W7N53"];
        const resource_roomName_arrary = ["W11N60","W12N60","W13N60","W14N60","W15N60","W16N60","W17N60","W18N60","W19N60"];
        find_resource(resource_roomName_arrary,W15N53.observer)
        // if ( Game.time % 99 === 0 ){
        //     manageTerminals(my_roomName_arrary,RESOURCE_LEMERGIUM_HYDRIDE);
        //     manageTerminals(my_roomName_arrary,RESOURCE_LEMERGIUM);
        //     manageTerminals(my_roomName_arrary,RESOURCE_HYDROGEN);
        // }
        const time_interval = 20;
        
        for (const roomName of my_roomName_arrary){
            const theroom = Game.rooms[roomName];
            // if (theroom.powerSpawn && theroom.powerSpawn.store[RESOURCE_POWER] !== 0 && theroom.powerSpawn.store[RESOURCE_ENERGY] > 50 ){
            //     theroom.powerSpawn.processPower();
            // }
            if ( Game.time % time_interval === 0 ){
                create_market_order(roomName);
            };
            // if ( Game.time % 100 === 0 ){
            //     theroom.update();
            // };
            const theroom_creeps = theroom.find(FIND_CREEPS);
            const theroom_hostile_creeps = theroom_creeps.filter((i) => !white_list.includes(i.owner.username));
            const theroom_friendly_creeps = theroom_creeps.filter((i) => white_list.includes(i.owner.username));
            const theroom_wounded_friendly_creeps = theroom_creeps.filter((i) => i.hits < i.hitsMax && white_list.includes(i.owner.username));
            const theroom_road_hits_NF = theroom.road.filter((i) => i.hits < i.hitsMax );
            const theroom_container_hits_NF = theroom.container.filter((i) => i.hits < i.hitsMax );
            const theroom_ramparts_lt_min = theroom.rampart.filter((i) =>  i.hits < 5000 );
            const theroom_ramparts_nearFull = theroom.rampart.filter((i) =>  i.hits < i.hitsMax && i.hits > (i.hitsMax - 10000) );
            // const theroom_walls_lt_min = theroom.constructedWall.filter((i) =>  i.hits < 5000 );
            
            if (theroom.tower.length > 0){
                theroom.tower.forEach(tower => {
                    if ( tower.store[RESOURCE_ENERGY] > 0 ){
                        if ( theroom_hostile_creeps.length > 0 ){
                            if ( theroom_hostile_creeps.length > 1 ){
                                theroom_hostile_creeps.sort((a, b) => a.pos.getRangeTo(tower) - b.pos.getRangeTo(tower) );
                            }
                            tower.attack(theroom_hostile_creeps[0]);
                        }
                        if ( theroom_wounded_friendly_creeps.length > 0 ) {
                            if ( theroom_wounded_friendly_creeps.length > 1 ){
                                theroom_wounded_friendly_creeps.sort((a, b) => a.pos.getRangeTo(tower) - b.pos.getRangeTo(tower) );
                            }
                            tower.heal(theroom_wounded_friendly_creeps[0]);
                        }
                        if ( theroom_ramparts_lt_min.length > 0 ){
                            tower.repair(theroom_ramparts_lt_min[0]);
                        } else if ( theroom_ramparts_nearFull.length > 0 ){
                            tower.repair(theroom_ramparts_nearFull[0]);
                        // } else if ( theroom_walls_lt_min.length > 0 ){
                        //     tower.repair(theroom_walls_lt_min[0]);
                        } else if ( theroom_road_hits_NF.length > 0 ){
                            tower.repair(theroom_road_hits_NF[0]);
                        } else if (theroom_container_hits_NF.length > 0 ){
                            tower.repair(theroom_container_hits_NF[0]);
                        }
                    }
                });
            }
            
            if ( theroom.link.length == 2 && theroom.link[1].cooldown == 0 && theroom.link[1].store[RESOURCE_ENERGY] > 750 ){
                theroom.link[1].transferEnergy(theroom.link[0]);
            } else if ( theroom.link.length >= 3 ){
                if ( theroom.link[1].cooldown == 0 && theroom.link[1].store[RESOURCE_ENERGY] > 750 ){
                    theroom.link[1].transferEnergy(theroom.link[0]);
                }
                if ( theroom.link[2].cooldown == 0 && theroom.link[2].store[RESOURCE_ENERGY] > 750 ){
                    theroom.link[2].transferEnergy(theroom.link[0]);
                }
            }
            
            if ( Game.time % time_interval === 0 ){
                if ( theroom.terminal && theroom.storage ){
                    console.log( theroom.name +
                        '[Lv' + theroom.controller.level + '|' + (theroom.controller.progress/theroom.controller.progressTotal).toFixed(2) + 
                        ']' +
                        theroom.energyAvailable + '/' + theroom.energyCapacityAvailable + 
                        '[S|' + (theroom.storage.store.getUsedCapacity()/theroom.storage.store.getCapacity()).toFixed(2) + '|' + 
                        theroom.storage.store[RESOURCE_ENERGY] + 
                        ']' +
                        '[T|' + (theroom.terminal.store.getUsedCapacity()/theroom.terminal.store.getCapacity()).toFixed(2) + 
                        '|' + theroom.terminal.store[RESOURCE_ENERGY] + 
                        '|H' + theroom.terminal.store["H"] + 
                        '|L' + theroom.terminal.store["L"] + 
                        // 'XGH2O:' + theroom.terminal.store.getUsedCapacity("XGH2O") + '|' +
                        ']'
                    )
                } else if ( theroom.storage ){
                    console.log( theroom.name +
                        '[Lv' + theroom.controller.level + '|' + (theroom.controller.progress/theroom.controller.progressTotal).toFixed(2) + 
                        ']' +
                        theroom.energyAvailable + '/' + theroom.energyCapacityAvailable + 
                        '[S|' + (theroom.storage.store.getUsedCapacity()/theroom.storage.store.getCapacity()).toFixed(2) + '|' + 
                        theroom.storage.store[RESOURCE_ENERGY] + 
                        ']'
                    )
                } else {
                    console.log( theroom.name +
                        '[Lv' + theroom.controller.level + '|' + (theroom.controller.progress/theroom.controller.progressTotal).toFixed(2) + 
                        ']' +
                        '[' + theroom.energyAvailable + '/' + theroom.energyCapacityAvailable + 
                        ']'
                    )
                }
            }
            
        }  // for (const roomName of my_roomName_arrary){
        if ( Game.time % time_interval === 0 ) {
            console.log('=================================' + Game.cpu.bucket + '======================================')
        }
        
        
        
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            if(creep.memory.role == 'role_starter') { role_starter.run(creep); }
            else if(creep.memory.role == 'role_local_miner0') { role_local_miner0.run(creep,creep.room.source[0]); }
            else if(creep.memory.role == 'role_local_miner1') { role_local_miner1.run(creep,creep.room.source[1]); }
            else if(creep.memory.role == 'role_local_hauler') { role_local_hauler.run(creep); }
            else if(creep.memory.role == 'role_local_upgrader') { role_local_upgrader.run(creep); }
            else if(creep.memory.role == 'role_local_builder') { role_local_builder.run(creep); }
            else if(creep.memory.role == 'role_local_manager') { role_local_manager.run(creep); }
            else if(creep.memory.role == 'role_local_mineral_miner') { role_local_mineral_miner.run(creep); }
            else if(creep.memory.role == 'role_remote_miner') { role_remote_miner.run(creep); }
            
            
            else if(creep.memory.role == 'role_claimer' || creep.memory.role == 'role_newroom_starter') { role_claimer.run(creep); }
            // else if(creep.memory.role == 'role_name') { role_name.run(creep); }
            
            if (creep.memory.moving_target && !creep.spawning /*&& !creep.pos.isNearTo(creep.memory.moving_target)*/) {
                if (creep.memory.moving_target) {
                    const moveResult = creep.moveTo(creep.memory.moving_target);
                }
            }
        }
    
    
        // if ( Game.time % 500 === 0  ){
        //     Game.profiler.profile(450); // Profile for the next * ticks
        // }
        if (Game.cpu.bucket == 10000){
            Game.cpu.generatePixel()
        }
        
    // });  // profiler.wrap(function() {
}
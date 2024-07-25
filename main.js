require("超级移动优化hotfix 0.9.4");
// require('极致建筑缓存');

// donors list:
// qq57032546 bigcatcat: tons of all kinds of T3 and energy
// qq2826874813 wuleiai: 200K XGH2O
// qq1523284180 bigcatcat's JK: 100K power
// qq1290254857 an_w: 50K energy


const fetchObjectsByIds = (ids) => {
    if (ids && ids.length > 0) {
        return ids.map(id => Game.getObjectById(id)).filter(Boolean);
    } else {
        return [];
    }
};

function calculateCreepCost(bodyParts) {
    let totalCost = 0;
    for (let part of bodyParts) {
        totalCost += BODYPART_COST[part];
    }
    return totalCost;
}

function createEnergyBuyOrder(roomName) {
    let energy_buy_orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY});

    let highestBuyPrice = 0;
    for (let id in energy_buy_orders) {
        let order = energy_buy_orders[id];
        highestBuyPrice = Math.max(highestBuyPrice, order.price);
    }

    let newOrderPrice = Math.min(highestBuyPrice + 0.01, 15); // Ensure price does not exceed 20

    // Create new market order if price is valid
    if (newOrderPrice < 15) {
        Game.market.createOrder({
            type: ORDER_BUY,
            resourceType: RESOURCE_ENERGY,
            price: newOrderPrice,
            totalAmount: 20000,
            roomName: roomName
        });
        console.log(roomName + " create energy order" )
    }
    let my_orders = Game.market.orders;
    // Delete orders with remaining amount zero
    for (let id in my_orders) {
        let order = my_orders[id];
        if (order.remainingAmount === 0) {
            Game.market.cancelOrder(id);
            console.log("cancel order:" + id)
        }
    }
}
    
module.exports.loop = function () {
    

    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    const defense_amount_start = 301;
    const defense_amount_min = 10000;
    // const defense_amount_max = 1000000;
    const storage_energy_amount_min = 10000;
    const storage_energy_amount_max = 15000;
    
    const terminal_energy_amount_min = 50000;
    const terminal_energy_amount_max = 55000;
    const factory_energy_amount_min = 500;
    const factory_energy_amount_max = 1500;
    
    // Game.market.createOrder({ type: ORDER_BUY, resourceType: RESOURCE_ENERGY, price: 10, totalAmount: 50000, roomName: "W15N59" });
    // Game.market.createOrder({ type: ORDER_BUY, resourceType: "H", price: 125, totalAmount: 5000, roomName: "W15N59" });
    // Memory.myrooms = _.filter(Game.rooms, (i) => i.controller.my == true );  // use only claimed a new room
    
    
    
    for (const num in Memory.myrooms){
        const theroom = Memory.myrooms[num];
        
        if ( theroom.previous_EC !== Game.rooms[theroom.name].energyCapacityAvailable || Game.time % 100 === 0  ){
            console.log("Memory.refresh")
            Memory.refresh = true
            theroom.previous_EC = Game.rooms[theroom.name].energyCapacityAvailable
            if (Game.rooms[theroom.name].storage.store.getFreeCapacity() > 100000){
                createEnergyBuyOrder(theroom.name)
            }
        }
        
        if ( Memory.refresh === true ) {
            if ( Game.rooms[theroom.name].energyCapacityAvailable < 550 ){   //lv1   300
                theroom.defense_amount_max = 1000
                theroom.local_miners_bodyparts = [WORK,WORK,MOVE,MOVE]  //local_miners 300
                theroom.local_haulers_bodyparts = [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]  //local_haulers 300
                theroom.local_upgraders_bodyparts = [WORK,WORK,CARRY,MOVE] // local_upgraders 300
                theroom.local_builders_bodyparts = [WORK,CARRY,CARRY,MOVE,MOVE] // local_builders 300
                
            } else if ( Game.rooms[theroom.name].energyCapacityAvailable < 800 ){    //lv2   550
                theroom.defense_amount_max = 1000
                theroom.local_miners_bodyparts = [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]  //local_miners 550
                theroom.local_haulers_bodyparts = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]    //local_haulers 500
                theroom.local_upgraders_bodyparts = [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]    // local_upgraders 550
                theroom.local_builders_bodyparts = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]    // local_builders 550
                // lv2 build upgradercontainer, miner container, roads
            } else if ( Game.rooms[theroom.name].energyCapacityAvailable < 1300 ){   //lv3   800
                theroom.defense_amount_max = 10000
                theroom.local_miners_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]   //local_miners 800
                theroom.local_haulers_bodyparts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE] //local_haulers 750
                theroom.local_upgraders_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]  // local_upgraders 800
                theroom.local_builders_bodyparts = [WORK,WORK,WORK,WORK,
                                                    CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE]  // local_builders 800
                // lv3 build tower
            } else if ( Game.rooms[theroom.name].energyCapacityAvailable < 1800 ){   //lv4   1300
                theroom.defense_amount_max = 10000
                theroom.local_miners_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]   //local_miners 800
                // theroom.local_miners_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]   //local_miners 1000
                theroom.local_haulers_bodyparts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE] //local_haulers 750
                theroom.local_upgraders_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]    // local_upgraders 1300
                theroom.local_builders_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,
                                                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]    // local_builders 1300
                // lv4 build storage
            } else if ( Game.rooms[theroom.name].energyCapacityAvailable < 2300 ){   //lv5   1800
                theroom.defense_amount_max = 500000
                theroom.local_miners_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]   //local_miners 800
                // theroom.local_miners_bodyparts = [  WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                //                                     CARRY,CARRY,CARRY,CARRY,CARRY,
                //                                     MOVE,MOVE,MOVE,MOVE,MOVE]   //local_miners 1500
                theroom.local_haulers_bodyparts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE] //local_haulers 750
                theroom.local_upgraders_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    WORK,WORK,WORK,WORK,WORK,
                                                    CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]    // local_upgraders 1800
                theroom.local_builders_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]  // local_builders 1800
                theroom.local_manager_bodyparts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE]  //local_managers 750
                // lv5 build link
            } else if ( Game.rooms[theroom.name].energyCapacityAvailable < 5600 ){  //lv6   2300
                theroom.defense_amount_max = 5000000
                // theroom.local_miners_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]   //local_miners 800
                theroom.local_miners_bodyparts = [  WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE]   //local_miners 1500
                theroom.local_haulers_bodyparts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE] //local_haulers 750
                // theroom.local_haulers_bodyparts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                //                                   CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                //                                   MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] //local_haulers 1500
                theroom.local_upgraders_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]    // local_upgraders 2300
                theroom.local_builders_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]  // local_builders 2000
                theroom.local_mineral_miners_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                        WORK,WORK,WORK,WORK,WORK,WORK,
                                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]   //  local_mineral_miners 2000
                theroom.local_manager_bodyparts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE]  //local_managers 750
                
            } else if ( Game.rooms[theroom.name].energyCapacityAvailable < 8100 ){  //lv7   5600
                theroom.defense_amount_max = 10000000
                // theroom.local_miners_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]   //local_miners 800
                theroom.local_miners_bodyparts = [  WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE]   //local_miners 1500
                // theroom.local_miners_bodyparts = [  WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                //                                     WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                //                                     CARRY,CARRY,CARRY,CARRY,CARRY,
                //                                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]   //local_miners 2750
                theroom.local_haulers_bodyparts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                   CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                   MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] //  local_haulers 1500
                theroom.local_upgraders_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE]    // local_upgraders 4500
                theroom.local_builders_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]  // local_builders 2000
                theroom.local_mineral_miners_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]   //  local_mineral_miners 2500
                theroom.local_manager_bodyparts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                   CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                   MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]  //local_managers 1500
                
                theroom.coastguard_attackers_bodyparts = [  
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                                        MOVE,MOVE,MOVE,MOVE,MOVE,
                                                        MOVE,MOVE,MOVE,MOVE,MOVE]    // coastguard_attackers 3000
                theroom.coastguard_healers_bodyparts = [
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        HEAL,HEAL,HEAL,HEAL,HEAL,
                                                        HEAL,HEAL,HEAL,HEAL,HEAL,
                                                        HEAL,HEAL,HEAL,HEAL,HEAL,
                                                        HEAL,HEAL,HEAL,HEAL,HEAL,
                                                        MOVE,MOVE,MOVE,MOVE,MOVE,
                                                        MOVE,MOVE,MOVE,MOVE,MOVE]    // coastguard_healers 5600
                
            } else if ( Game.rooms[theroom.name].energyCapacityAvailable >= 8100 ){  //lv8   12900
                theroom.defense_amount_max = 15000000
                // theroom.local_miners_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]   //local_miners 800
                theroom.local_miners_bodyparts = [  WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE]   //local_miners 1500
                // theroom.local_miners_bodyparts = [  WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                //                                     WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                //                                     CARRY,CARRY,CARRY,CARRY,CARRY,
                //                                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]   //local_miners 2750
                theroom.local_haulers_bodyparts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                   CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                   MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] //  local_haulers 1500
                theroom.local_upgraders_bodyparts = [WORK,CARRY,MOVE] // local_upgraders 200
                theroom.local_builders_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]  // local_builders 4000
                theroom.local_mineral_miners_bodyparts = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]   //  local_mineral_miners 2500
                theroom.local_manager_bodyparts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                   CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                                   MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]  //local_managers 1500
                
                theroom.coastguard_attackers_bodyparts = [  
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]    // coastguard_attackers 3000
                theroom.coastguard_healers_bodyparts = [
                                                        TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                                        HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                                                        HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                                                        HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]    // coastguard_healers 8100
                
            }
        }  // Memory.refresh === true
        
        theroom.local_starters_count = 0
        theroom.local_miners_count = 0
        theroom.local_haulers_count = 0
        theroom.local_mineral_miners_count = 0
        theroom.local_builders_count = 0
        theroom.local_upgraders_count = 0
        theroom.local_managers_count = 0
        // theroom.remote_scavagers_count  = 0
        // theroom.coastguard_attackers_count = 0
        // theroom.coastguard_healers_count = 0
        theroom.wounded_creeps_count = 0
        
        theroom.local_starters = []; 
        theroom.local_miners = []; 
        theroom.local_haulers = []; 
        theroom.local_mineral_miners = []; 
        theroom.local_builders = []; 
        theroom.local_upgraders = []; 
        theroom.local_managers = []; 
        // theroom.remote_scavagers = []; 
        // theroom.coastguard_attackers = []; 
        // theroom.coastguard_healers = []; 
        theroom.wounded_creeps = []; 
        
        
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.bornplace === theroom.name) {
                switch (creep.memory.role) {
                    case 'role_local_starter':
                        theroom.local_starters_count++; theroom.local_starters.push(creep); break;
                    case 'role_local_miner':
                        theroom.local_miners_count++; theroom.local_miners.push(creep); break;
                    case 'role_local_hauler':
                        theroom.local_haulers_count++; theroom.local_haulers.push(creep); break;
                    case 'role_local_mineral_miner':
                        theroom.local_mineral_miners_count++; theroom.local_mineral_miners.push(creep); break;
                    case 'role_local_builder':
                        theroom.local_builders_count++; theroom.local_builders.push(creep); break;
                    case 'role_local_upgrader':
                        theroom.local_upgraders_count++; theroom.local_upgraders.push(creep); break;
                    case 'role_local_manager':
                        theroom.local_managers_count++; theroom.local_managers.push(creep); break;
                        
                    // case 'role_remote_scavager':
                    //     theroom.remote_scavagers_count++; theroom.remote_scavagers.push(creep); break;
                        
                    // case 'role_coastguard_attacker':
                    //     theroom.coastguard_attackers_count++; theroom.coastguard_attackers.push(creep); break;
                    // case 'role_coastguard_healer':
                    //     theroom.coastguard_healers_count++; theroom.coastguard_healers.push(creep); break;
                        
                }

                if (creep.hits < creep.hitsMax) {
                    theroom.wounded_creeps_count++; theroom.wounded_creeps.push(creep);
                }
            }
        }
        
        
        if ( Memory.refresh === true ) {
            const theroom_sources = Game.rooms[theroom.name].find(FIND_SOURCES);
            theroom.sources_ids = theroom_sources.map(i => i.id).filter(Boolean);
            
            const theroom_minerals = Game.rooms[theroom.name].find(FIND_MINERALS);
            theroom.minerals_ids = theroom_minerals.map(i => i.id).filter(Boolean);
            
            const roomStructures = Game.rooms[theroom.name].find(FIND_STRUCTURES);
            theroom.roomStructures_ids = roomStructures.map(i => i.id).filter(Boolean);
            
            const theroom_spawns = roomStructures.filter((i) => i.structureType === STRUCTURE_SPAWN);
            theroom.spawns_ids = theroom_spawns.map(i => i.id).filter(Boolean);
            
            const theroom_extensions = roomStructures.filter((i) => i.structureType === STRUCTURE_EXTENSION);
            theroom.extensions_ids = theroom_extensions.map(i => i.id).filter(Boolean);
            
            const theroom_powerspawns = roomStructures.filter((i) => i.structureType === STRUCTURE_POWER_SPAWN);
            theroom.powerspawns_ids = theroom_powerspawns.map(i => i.id).filter(Boolean);
            
            // const theroom_roads = roomStructures.filter((i) => i.structureType === STRUCTURE_ROAD);
            // theroom.roads_ids = theroom_roads.map(i => i.id).filter(Boolean);
            
            const theroom_ramparts = roomStructures.filter((i) => i.structureType === STRUCTURE_RAMPART);
            theroom.ramparts_ids = theroom_ramparts.map(i => i.id).filter(Boolean);
            
            const theroom_walls = roomStructures.filter((i) => i.structureType === STRUCTURE_WALL);
            theroom.wall_ids = theroom_walls.map(i => i.id).filter(Boolean);
            
            const theroom_containers = roomStructures.filter((i) => i.structureType === STRUCTURE_CONTAINER);
            theroom.containers_ids = theroom_containers.map(i => i.id).filter(Boolean);
            
            const theroom_mineral_containers = roomStructures.filter((i) => i.structureType === STRUCTURE_CONTAINER && i.pos.isNearTo(theroom_minerals[0]) );
            theroom.mineral_containers_ids = theroom_mineral_containers.map(i => i.id).filter(Boolean);
            
            // const theroom_upgrader_containers = roomStructures.filter((i) => i.structureType === STRUCTURE_CONTAINER && i.pos.getRangeTo(Game.rooms[theroom.name].controller) <= 3);
            // theroom.upgrader_containers_ids = theroom_upgrader_containers.map(i => i.id).filter(Boolean);
            
            // const theroom_energyminer_containers = roomStructures.filter((i) => i.structureType === STRUCTURE_CONTAINER && i.pos.findInRange(FIND_SOURCES,2).length > 0 );
            // theroom.energyminer_containers_ids = theroom_energyminer_containers.map(i => i.id).filter(Boolean);
            
            const theroom_towers = roomStructures.filter((i) => i.structureType === STRUCTURE_TOWER );
            theroom.towers_ids = theroom_towers.map(i => i.id).filter(Boolean);
            
            const theroom_links = roomStructures.filter((i) => i.structureType === STRUCTURE_LINK);
            theroom.links_ids = theroom_links.map(i => i.id).filter(Boolean);
            
            const theroom_labs = roomStructures.filter((i) => i.structureType === STRUCTURE_LAB);
            theroom.labs_ids = theroom_labs.map(i => i.id).filter(Boolean);
            
            const theroom_factorys = roomStructures.filter((i) => i.structureType === STRUCTURE_FACTORY);
            theroom.factorys_ids = theroom_factorys.map(i => i.id).filter(Boolean);
            
            // const theroom_nukers = roomStructures.filter((i) => i.structureType === STRUCTURE_NUKER);
            // theroom.nukers_ids = theroom_nukers.map(i => i.id).filter(Boolean);
            
        } // Memory.refresh === true
        
        theroom.sources = fetchObjectsByIds(theroom.sources_ids);
        theroom.minerals = fetchObjectsByIds(theroom.minerals_ids);
        theroom.spawns = fetchObjectsByIds(theroom.spawns_ids);
        theroom.extensions = fetchObjectsByIds(theroom.extensions_ids);
        theroom.powerspawns = fetchObjectsByIds(theroom.powerspawns_ids);
        theroom.containers = fetchObjectsByIds(theroom.containers_ids);
        theroom.mineral_containers = fetchObjectsByIds(theroom.mineral_containers_ids);
        // theroom.upgrader_containers = fetchObjectsByIds(theroom.upgrader_containers_ids);
        // theroom.energyminer_containers = fetchObjectsByIds(theroom.energyminer_containers_ids);
        theroom.towers = fetchObjectsByIds(theroom.towers_ids);
        theroom.links = fetchObjectsByIds(theroom.links_ids);
        theroom.labs = fetchObjectsByIds(theroom.labs_ids);
        theroom.factorys = fetchObjectsByIds(theroom.factorys_ids);
        // theroom.nukers = fetchObjectsByIds(theroom.nukers_ids);
        theroom.ramparts = fetchObjectsByIds(theroom.ramparts_ids);
        
        // theroom.spawns_NF = fetchObjectsByIds(theroom.spawns_ids).filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        // theroom.extensions_NF = fetchObjectsByIds(theroom.extensions_ids).filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        // theroom.towers_NF = fetchObjectsByIds(theroom.towers_ids).filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 100 );
        // theroom.labs_energy_NF = fetchObjectsByIds(theroom.labs_ids).filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        
        theroom.ramparts_lt_start = fetchObjectsByIds(theroom.ramparts_ids).filter((i) =>  i.hits < defense_amount_start);
        theroom.ramparts_lt_min = fetchObjectsByIds(theroom.ramparts_ids).filter((i) =>  i.hits < defense_amount_min);
        theroom.ramparts_lt_max = fetchObjectsByIds(theroom.ramparts_ids).filter((i) =>  i.hits < theroom.defense_amount_max);
        theroom.ramparts_NF = fetchObjectsByIds(theroom.ramparts_ids).filter((i) =>  i.hits < i.hitsMax);
        theroom.walls_lt_min = fetchObjectsByIds(theroom.wall_ids).filter((i) =>  i.hits < defense_amount_min);
        theroom.walls_lt_max = fetchObjectsByIds(theroom.wall_ids).filter((i) =>  i.hits < theroom.defense_amount_max);
        theroom.walls_NF = fetchObjectsByIds(theroom.wall_ids).filter((i) =>  i.hits < i.hitsMax);
        // theroom.roads_on_plain = fetchObjectsByIds(theroom.roads_ids).filter((i) => i.structureType == STRUCTURE_ROAD && i.hitsMax == 5000 );
        // theroom.roads_on_swamp = fetchObjectsByIds(theroom.roads_ids).filter((i) => i.structureType == STRUCTURE_ROAD && i.hitsMax == 25000 );
        // theroom.roads_on_wall = fetchObjectsByIds(theroom.roads_ids).filter((i) => i.structureType == STRUCTURE_ROAD && i.hitsMax == 750000 );
        
        theroom.myconstructions = Game.rooms[theroom.name].find(FIND_MY_CONSTRUCTION_SITES);
        theroom.structures_hits_NF = fetchObjectsByIds(theroom.roomStructures_ids).filter((i) =>   i.structureType !== STRUCTURE_RAMPART && i.structureType !== STRUCTURE_WALL && i.hits < i.hitsMax);
        
        theroom.notmy_creeps = Game.rooms[theroom.name].find(FIND_HOSTILE_CREEPS).filter((i) => i.owner.username !== 'IceDream'
                                                                                                && i.owner.username !== 'idrusoh'
                                                                                                && i.owner.username !== 'Morpho' 
                                                                                                && i.owner.username !== 'Chequer'
                                                                                                && i.owner.username !== 'BigCatCat' 
                                                                                                && i.owner.username !== 'DemonFCG' );
                                                                                                
        theroom.target_creeps = theroom.notmy_creeps.filter((i) => i.owner.username !== 'Source Keeper' && i.owner.username !== 'Invader' );
        
        // theroom.my_powercreeps = Game.rooms[theroom.name].find(FIND_MY_POWER_CREEPS);
        // theroom.notmy_powercreeps = Game.rooms[theroom.name].find(FIND_HOSTILE_POWER_CREEPS);
        
        // if ( theroom.target_creeps.length > 0 ){
        //     Memory.start_attack = true
        //     Memory.target_creep = theroom.target_creeps[0]
        // } else {
        //     Memory.start_attack = false
        // }
        
        if ( theroom.spawns.length > 0 && theroom.spawns[0].hits < theroom.spawns[0].hitsMax ){
            Game.rooms[theroom.name].controller.activateSafeMode()
        }

        if ( theroom.links.length == 2 && theroom.links[1].cooldown == 0 && theroom.links[1].store.getUsedCapacity(RESOURCE_ENERGY) > 750 ){
            theroom.links[1].transferEnergy(theroom.links[0]);
        } else if ( theroom.links.length >= 3 ){
            if ( theroom.links[1].cooldown == 0 && theroom.links[1].store.getUsedCapacity(RESOURCE_ENERGY) > 750 ){
                theroom.links[1].transferEnergy(theroom.links[0]);
            }
            if ( theroom.links[2].cooldown == 0 && theroom.links[2].store.getUsedCapacity(RESOURCE_ENERGY) > 750 ){
                theroom.links[2].transferEnergy(theroom.links[0]);
            }
        }
        
        // if ( theroom.powerspawns.length > 0 && theroom.powerspawns[0].store.getUsedCapacity(RESOURCE_ENERGY) >= 50 && theroom.powerspawns[0].store.getUsedCapacity(RESOURCE_POWER) > 0 ){
        //     theroom.powerspawns[0].processPower()
        // }  
        
        if ( Game.time % 15 === 0 ){
            theroom.totalcreepcost = 0;
            
            for(const num in Game.creeps) {
                const i = Game.creeps[num] ;
                
                if ( theroom.name == i.memory.bornplace ){
                    if ( i.memory.cost_per_tick ) {
                        theroom.totalcreepcost += i.memory.cost_per_tick;
                    }
                }
            }
            
            // if (theroom.ramparts){
            //     theroom.ramparts_cost = theroom.ramparts.length*(300/100)/100
            //                             //ramparts_amount*(300hits/100ticks)/100repaircost_per_hit
            // }
            // if (theroom.containers){
            //     theroom.containers_cost = theroom.containers.length*(5000/500)/100
            //                             //containers_amount*(5000hits/500tick)/100repaircost_per_hit
            // }
            // if (theroom.roads_on_plain){
            //     theroom.roads_on_plain_cost = theroom.roads_on_plain.length*(100/1000)/100
            //                         //roads_amount*(100hits/1000tick)/100repaircost_per_hit
            // } else {
            //     theroom.roads_on_plain_cost = 0
            // }
            // if (theroom.roads_on_swamp){
            //     theroom.roads_on_swamp_cost = theroom.roads_on_swamp.length*(500/1000)/100
            //                         //roads_amount*(500hits/1000tick)/100repaircost_per_hit
            // } else {
            //     theroom.roads_on_swamp_cost = 0
            // }
            // if (theroom.roads_on_wall){
            //     theroom.roads_on_wall_cost = theroom.roads_on_wall.length*(15000/1000)/100
            //                         //roads_amount*(15000hits/1000tick)/100repaircost_per_hit
            // } else {
            //     theroom.roads_on_wall_cost = 0
            // }
            // if (theroom.roads_on_plain || theroom.roads_on_swamp || theroom.roads_on_wall){
            //     theroom.roads_total_cost = theroom.roads_on_plain_cost + theroom.roads_on_swamp_cost + theroom.roads_on_wall_cost
            // }
            
            if (Game.rooms[theroom.name].terminal && Game.rooms[theroom.name].storage){
                
                console.log( theroom.name +
                    '[Lv' + Game.rooms[theroom.name].controller.level + '|' + (Game.rooms[theroom.name].controller.progress/Game.rooms[theroom.name].controller.progressTotal).toFixed(2) + 
                    ']' +
                    '[' + Game.rooms[theroom.name].energyAvailable + '/' + Game.rooms[theroom.name].energyCapacityAvailable + '|' + Game.rooms[theroom.name].storage.store.getUsedCapacity(RESOURCE_ENERGY) + 
                    ']' +
                    '[LH' + Game.rooms[theroom.name].terminal.store.getUsedCapacity("LH") + '|' +
                    // 'XGH2O:' + Game.rooms[theroom.name].terminal.store.getUsedCapacity("XGH2O") + '|' +
                    'L:' + Game.rooms[theroom.name].terminal.store.getUsedCapacity("L") + '|' +
                    'H:' + Game.rooms[theroom.name].terminal.store.getUsedCapacity("H") +
                    ']' +
                    '[creeps:' + (theroom.totalcreepcost).toFixed(2) + '=' + 
                    theroom.local_miners_count + 'LM ' + 
                    theroom.local_haulers_count + 'LH ' + 
                    theroom.local_builders_count + 'B ' + 
                    theroom.local_upgraders_count + 'U ' + 
                    theroom.local_managers_count + 'LMGR ' + 
                    ']' 
                    // +
                    // '[roads:' + (theroom.roads_total_cost).toFixed(2) + '=' + (theroom.roads_on_plain_cost).toFixed(2) + '+' + (theroom.roads_on_swamp_cost).toFixed(2) + '+' + (theroom.roads_on_wall_cost).toFixed(2) + 
                    // ']' +
                    // '|ramparts:' + (theroom.ramparts_cost).toFixed(2) + 
                    // '|containers:' + (theroom.containers_cost).toFixed(2) + 
                    // '[room_total_cost:' + (theroom.totalcreepcost + theroom.ramparts_cost + theroom.containers_cost + theroom.roads_total_cost).toFixed(2) +
                    // '/tick]'
                    );
                    
            } else {
                console.log( theroom.name +
                    '[Lv' + Game.rooms[theroom.name].controller.level + '|' + (Game.rooms[theroom.name].controller.progress/Game.rooms[theroom.name].controller.progressTotal).toFixed(2) + 
                    ']' +
                    '[' + Game.rooms[theroom.name].energyAvailable + '/' + Game.rooms[theroom.name].energyCapacityAvailable + 
                    ']' +
                    '[creeps:' + (theroom.totalcreepcost).toFixed(2) + '=' + 
                    theroom.local_miners_count + 'LM ' + 
                    theroom.local_haulers_count + 'LH ' + 
                    theroom.local_builders_count + 'B ' + 
                    theroom.local_upgraders_count + 'U ' + 
                    theroom.local_managers_count + 'LMGR ' + 
                    ']' 
                    // +
                    // '[roads:' + (theroom.roads_total_cost).toFixed(2) + '=' + (theroom.roads_on_plain_cost).toFixed(2) + '+' + (theroom.roads_on_swamp_cost).toFixed(2) + '+' + (theroom.roads_on_wall_cost).toFixed(2) + 
                    // ']' +
                    // '|ramparts:' + (theroom.ramparts_cost).toFixed(2) + 
                    // '|containers:' + (theroom.containers_cost).toFixed(2) + 
                    // '[room_total_cost:' + (theroom.totalcreepcost + theroom.ramparts_cost + theroom.containers_cost + theroom.roads_total_cost).toFixed(2) +
                    // '/tick]'
                    );
            }
        }
        
        if ( theroom.towers.length > 0){
            for (const num in theroom.towers ) {
                const tower = theroom.towers[num];
                // theroom.wounded_pcs = [];
                // for(const name in Game.powerCreeps) {
                //     const pc = Game.powerCreeps[name];
                //     if (pc.hits < pc.hitsMax){
                //         theroom.wounded_pcs.push(powerCreeps);
                //     }
                //     theroom.wounded_pcs.sort((a, b) => a.hits - b.hits);
                // }
                
                if ( tower.store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                    if ( theroom.notmy_creeps.length > 0 ){
                        if ( tower.store.getUsedCapacity(RESOURCE_ENERGY) > 100 ){ tower.attack(theroom.notmy_creeps[0]); }
                    } else {
                        // if (theroom.wounded_pcs.length > 0 && theroom.wounded_pcs[0].room.roomName == tower.room.roomName ){ tower.heal(theroom.wounded_pcs[0]);
                        // } else 
                        if ( theroom.wounded_creeps_count > 0 ){ tower.heal( theroom.wounded_creeps[0] );
                        } else if ( theroom.ramparts_lt_start.length > 0 ){ tower.repair(theroom.ramparts_lt_start[0]);
                        } else if ( theroom.ramparts_lt_min.length > 0 ){ tower.repair(theroom.ramparts_lt_min[0]);
                        } else if ( theroom.structures_hits_NF.length > 0 ) { tower.repair(theroom.structures_hits_NF[0]);
                        // } else if ( theroom.ramparts_lt_max.length > 0 && tower.store.getUsedCapacity(RESOURCE_ENERGY) > 500 ){ tower.repair(theroom.ramparts_lt_max[0]);
                        }
                    }
                }
            }
        }
        
        const non_spawning_spawn = theroom.spawns.filter((i) => !i.spawning )
        if ( non_spawning_spawn.length > 0 ){
            const current_energyAvailable = Game.rooms[theroom.name].energyAvailable
            if ( theroom.local_miners_count < 2 ){
                if ( theroom.local_haulers_count == 0 && current_energyAvailable < calculateCreepCost(theroom.local_miners_bodyparts) && theroom.local_starters_count < 2 ){
                    non_spawning_spawn[0].spawnCreep( [WORK,CARRY,CARRY,MOVE,MOVE], 'role_local_starter' + " " + Game.time,
                        {memory: {role: 'role_local_starter', bornplace: theroom.name, cost_per_tick: 300/1500 }} );
                } else {
                    non_spawning_spawn[0].spawnCreep( theroom.local_miners_bodyparts, 'role_local_miner' + " " + Game.time,
                        {memory: {role: 'role_local_miner', bornplace: theroom.name, cost_per_tick: calculateCreepCost(theroom.local_miners_bodyparts)/1500 }} );
                }
            }
            if ( theroom.local_miners_count >= 2 ) {
                if ( theroom.local_haulers_count < 1 ){
                    if ( theroom.local_haulers_count == 0 && current_energyAvailable < calculateCreepCost(theroom.local_haulers_bodyparts) && theroom.local_starters_count < 2){
                        non_spawning_spawn[0].spawnCreep( [WORK,CARRY,CARRY,MOVE,MOVE], 'role_local_starter' + " " + Game.time,
                            {memory: {role: 'role_local_starter', bornplace: theroom.name, cost_per_tick: 300/1500 }} );
                    } else {
                        non_spawning_spawn[0].spawnCreep( theroom.local_haulers_bodyparts, 'role_local_hauler' + " " + Game.time,
                            {memory: {role: 'role_local_hauler', bornplace: theroom.name, cost_per_tick: calculateCreepCost(theroom.local_haulers_bodyparts)/1500 }} );
                    }
                }
                if ( theroom.local_builders_count < 1 ) {
                    non_spawning_spawn[0].spawnCreep( theroom.local_builders_bodyparts, 'role_local_builder' + " " + Game.time,
                        {memory: {role: 'role_local_builder', bornplace: theroom.name, cost_per_tick: calculateCreepCost(theroom.local_builders_bodyparts)/1500}} );
                }
                if ( theroom.local_upgraders_count < 1 ) {
                    non_spawning_spawn[0].spawnCreep( theroom.local_upgraders_bodyparts, 'role_local_upgrader' + " " + Game.time,
                        {memory: {role: 'role_local_upgrader', bornplace: theroom.name, cost_per_tick: calculateCreepCost(theroom.local_upgraders_bodyparts)/1500}} );
                }
                if ( theroom.local_managers_count < 1 && theroom.links.length >= 2 && theroom.local_manager_bodyparts ) {   // paste the manager after terminal builded
                    non_spawning_spawn[0].spawnCreep( theroom.local_manager_bodyparts, 'role_local_manager' + " " + Game.time,
                        {memory: {role: 'role_local_manager', bornplace: theroom.name, cost_per_tick: calculateCreepCost(theroom.local_manager_bodyparts)/1500}} );
                }
                // terminal, mineral_container, extractor
                if ( theroom.local_mineral_miners_count < 1 && theroom.minerals[0].mineralAmount > 0 && theroom.mineral_containers.length > 0 ){
                    non_spawning_spawn[0].spawnCreep( theroom.local_mineral_miners_bodyparts, 'role_local_mineral_miner' + " " + Game.time,
                        {memory: {role: 'role_local_mineral_miner', bornplace: theroom.name, cost_per_tick: calculateCreepCost(theroom.local_mineral_miners_bodyparts)/1500 }} );
                }
            //   if ( theroom.coastguard_attackers.length < 1 && Memory.start_attack == true ){
            //         non_spawning_spawn[1].spawnCreep( theroom.coastguard_attackers_bodyparts, 'role_coastguard_attacker' + " " + Game.time,
            //             {memory: {role: 'role_coastguard_attacker', bornplace: theroom.name, cost_per_tick: calculateCreepCost(theroom.coastguard_attackers_bodyparts)/1500 , avoid_combat: 'no' } }
            //         );
            //     }
            //     if ( theroom.coastguard_healers.length < 1 && Memory.start_attack == true ){
            //         non_spawning_spawn[2].spawnCreep( theroom.coastguard_healers_bodyparts, 'role_coastguard_healer' + " " + Game.time,
            //             {memory: {role: 'role_coastguard_healer', bornplace: theroom.name, cost_per_tick: calculateCreepCost(theroom.coastguard_healers_bodyparts)/1500 , avoid_combat: 'no' } }
            //         );
            //     }
            }
        } // spawn
        
        if ( theroom.name == "W15N59" ){
            if (theroom.labs[2].store.getUsedCapacity("L") > 0 && theroom.labs[7].store.getUsedCapacity("H") > 0 ){
                if (theroom.labs[0].cooldown == 0){
                    theroom.labs[0].runReaction(theroom.labs[2],theroom.labs[7])
                }
                if (theroom.labs[1].cooldown == 0){
                    theroom.labs[1].runReaction(theroom.labs[2],theroom.labs[7])
                }
                if (theroom.labs[3].cooldown == 0){
                    theroom.labs[3].runReaction(theroom.labs[2],theroom.labs[7])
                }
                if (theroom.labs[4].cooldown == 0){
                    theroom.labs[4].runReaction(theroom.labs[2],theroom.labs[7])
                }
                if (theroom.labs[5].cooldown == 0){
                    theroom.labs[5].runReaction(theroom.labs[2],theroom.labs[7])
                }
                if (theroom.labs[6].cooldown == 0){
                    theroom.labs[6].runReaction(theroom.labs[2],theroom.labs[7])
                }
                if (theroom.labs[8].cooldown == 0){
                    theroom.labs[8].runReaction(theroom.labs[2],theroom.labs[7])
                }
                if (theroom.labs[9].cooldown == 0){
                    theroom.labs[9].runReaction(theroom.labs[2],theroom.labs[7])
                }
            }
        } // W15N59
        
        
    }   // theroom end
    
    // Memory.cpu3 = Game.cpu.getUsed() ;
    
    if (Game.rooms['W14N53'].terminal.store.getUsedCapacity('H') > 1000 && Game.rooms['W14N53'].terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 200){
        Game.rooms['W14N53'].terminal.send('H',1000,'W15N59')
    }
    if (Game.rooms['W15N53'].terminal.store.getUsedCapacity('L') > 1000 && Game.rooms['W15N53'].terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 200){
        Game.rooms['W15N53'].terminal.send('L',1000,'W15N59')
    }
    if (Game.rooms['W15N58'].terminal.store.getUsedCapacity('H') > 1000 && Game.rooms['W15N58'].terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 200){
        Game.rooms['W15N58'].terminal.send('H',1000,'W15N59')
    }
    
    
    if (Game.rooms['W14N53'].storage.store.getFreeCapacity() == 0 && Game.rooms['W14N53'].terminal.cooldown == 0){
        Game.rooms['W14N53'].terminal.send(RESOURCE_ENERGY,40000,'W15N59')
    }
    
    //================================================powercreep================================================
    // Game.powerCreeps['peaceful_ops_generator_01'].spawn(Game.getObjectById('668bcb081b359e7d717640af'))
    // for(const name in Game.powerCreeps) {
    //     if(!Game.powerCreeps[name]) {
    //         delete Memory.powerCreeps[name];
    //         console.log('Clearing non-existing creep memory:', name);
    //     } else {
    //         var pc = Game.powerCreeps[name];
    //         var ps = Game.getObjectById('668bcb081b359e7d717640af')
    //         pc.say("PEACE",public = true);
    //         if ( pc.ticksToLive < 200 || pc.hits < pc.hitsMax ){
    //             pc.memory.moving_target = ps
    //             if (pc.pos.isNearTo(ps)){
    //                 pc.renew(ps)
    //             }
    //         } else {
    //             if (pc.store.getUsedCapacity() < pc.store.getCapacity() ){
    //                 pc.memory.moving_target = Game.flags['ops']
    //                 if (pc.pos.isNearTo(Game.flags['ops'].pos) && Game.time % 50 === 0){
    //                     pc.usePower(PWR_GENERATE_OPS)
    //                 }
    //             } else {
    //                 const target = Game.rooms['W15N59'].terminal
    //                 pc.memory.moving_target = target
    //                 if (pc.pos.isNearTo(target)){
    //                     pc.transfer(target,'ops')
    //                 }
    //             }
    //         }
    //         if (pc.memory.moving_target !== undefined && !pc.pos.isNearTo(pc.memory.moving_target)){
    //             if ( pc.moveTo(pc.memory.moving_target, {noPathFinding: true}) !== ERR_NOT_FOUND ){
    //                 // Execute moves by cached paths at first
    //                 pc.moveTo(pc.memory.moving_target, {noPathFinding: true})
    //             } else {
    //                 // Perform pathfinding only if we have enough CPU
    //                 pc.moveTo(pc.memory.moving_target);
    //             }
    //         }
    //     }
    // } // for pc end
    //================================================powercreep================================================
    
    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        //================================================const/var/let================================================
        // newly added room does not always +1 in the num, maybe older room become +1
        
        for (const num in Memory.myrooms){
            const theroom = Memory.myrooms[num]
            if ( creep.memory.role == 'recycle' && theroom.name == creep.memory.bornplace ){
                creep.memory.moving_target = theroom.spawns[0]
                if (creep.pos.isNearTo(theroom.spawns[0])){ theroom.spawns[0].recycleCreep(creep) }
            }
            if (theroom.name == creep.memory.bornplace ){
                // var defense_amount_max = theroom.defense_amount_max
                
                // var room_local_miners_count = theroom.local_miners_count
                // var room_local_haulers_count = theroom.local_haulers_count
                // var room_local_mineral_miners_count = theroom.local_mineral_miners_count
                // var room_local_builders_count = theroom.local_builders_count
                // var room_local_upgraders_count = theroom.local_upgraders_count
                // var room_local_managers_count = theroom.local_managers_count
                
                // var room_remote_scavagers_count= theroom.remote_scavagers_count 
                
                // var room_coastguard_attackers_count = theroom.coastguard_attackers_count
                // var room_coastguard_healers_count = theroom.coastguard_healers_count
                var room_wounded_creeps_count = theroom.wounded_creeps_count
                
                
                var room_local_miners = theroom.local_miners
                var room_local_haulers = theroom.local_haulers
                // var room_local_mineral_miners = theroom.local_mineral_miners
                var room_local_builders = theroom.local_builders
                var room_local_upgraders = theroom.local_upgraders
                var room_local_managers = theroom.local_managers
                
                // var room_remote_scavagers= theroom.remote_scavagers 
                
                // var room_coastguard_attackers = theroom.coastguard_attackers
                // var room_coastguard_healers = theroom.coastguard_healers
                var room_wounded_creeps = theroom.wounded_creeps

                // -----------nature OR can not be destory
                var room_sources = theroom.sources 
                var room_minerals = theroom.minerals 
                var room_myconstructions = theroom.myconstructions 
                // var room_nukes = theroom.nukes 
                
                // -----------others

                var room_spawns = theroom.spawns
                var room_spawns_NF = fetchObjectsByIds(theroom.spawns_ids).filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                var room_powerspawns = theroom.powerspawns
                
                var room_mineral_containers = theroom.mineral_containers 
                var room_upgrader_containers = theroom.upgrader_containers 
                var room_energyminer_containers = theroom.energyminer_containers
                
                var room_extensions_NF = fetchObjectsByIds(theroom.extensions_ids).filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                
                // var room_towers = theroom.towers
                var room_towers_NF = fetchObjectsByIds(theroom.towers_ids).filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 100 );
                
                var room_links = theroom.links 
                                    
                var room_labs = theroom.labs 
                var room_labs_energy_NF = fetchObjectsByIds(theroom.labs_ids).filter((i) =>  i.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                
                var room_factorys = theroom.factorys 
                // var room_nukers = theroom.nukers
                        
                var room_ramparts_lt_min = fetchObjectsByIds(theroom.ramparts_ids).filter((i) =>  i.hits < defense_amount_min);
                var room_ramparts_lt_max = fetchObjectsByIds(theroom.ramparts_ids).filter((i) =>  i.hits < theroom.defense_amount_max);
                var room_ramparts_NF = fetchObjectsByIds(theroom.ramparts_ids).filter((i) =>  i.hits < i.hitsMax);
                
                var room_walls_lt_min = fetchObjectsByIds(theroom.wall_ids).filter((i) =>  i.hits < defense_amount_min);
                var room_walls_lt_max = fetchObjectsByIds(theroom.wall_ids).filter((i) =>  i.hits < theroom.defense_amount_max);
                var room_walls_NF = fetchObjectsByIds(theroom.wall_ids).filter((i) =>  i.hits < i.hitsMax);
                
                // var room_structures_hits_NF = fetchObjectsByIds(theroom.roomStructures_ids).filter((i) =>   i.structureType !== STRUCTURE_RAMPART && i.structureType !== STRUCTURE_WALL && i.hits < i.hitsMax);

            }
        }
        
        // if (creep.getActiveBodyparts(HEAL) > 0 ){
        //     if ( room_wounded_creeps_count > 0 ){
        //         room_wounded_creeps.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
        //         if (creep.pos.isNearTo(room_wounded_creeps[0]) ){
        //             creep.heal(room_wounded_creeps[0])
        //         } else if ( creep.pos.inRangeTo(room_wounded_creeps[0],3) ){
        //             creep.rangedHeal(room_wounded_creeps[0])
        //         }
        //     } else if (creep.hits < creep.hitsMax ) {
        //         creep.heal(creep)
        //     }
        // }
        //================================================role_local_starter================================================
        if ( creep.hits == creep.hitsMax && creep.memory.role == 'role_local_starter'){
            if ( creep.store.getUsedCapacity() == 0 ){
                const room_energy_droppeds_gt_amount = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (i) => i.resourceType == RESOURCE_ENERGY && i.amount > creep.store.getCapacity()/2 });
                
                if ( room_links.length >= 2 && room_links[0].store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                    creep.memory.moving_target = room_links[0]; 
                    creep.withdraw(room_links[0],RESOURCE_ENERGY);
                } else if ( creep.room.terminal && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_energy_amount_max ){
                    creep.memory.moving_target = creep.room.terminal; 
                    creep.withdraw(creep.room.terminal,RESOURCE_ENERGY);
                } else if ( creep.room.storage && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                    creep.memory.moving_target = creep.room.storage; 
                    creep.withdraw(creep.room.storage,RESOURCE_ENERGY);
                } else if ( room_energy_droppeds_gt_amount.length > 0 ){
                    room_energy_droppeds_gt_amount.sort((a, b) => b.amount - a.amount);
                    creep.memory.moving_target = room_energy_droppeds_gt_amount[0]; 
                    creep.pickup(room_energy_droppeds_gt_amount[0]);
                } else if ( room_local_miners.length == 0 ){
                    creep.memory.role = 'role_local_miner'
                }
            } else {
                if (room_spawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0 && room_local_managers.length == 0) {
                    creep.memory.moving_target = room_spawns[0]; 
                    creep.transfer(room_spawns[0], RESOURCE_ENERGY);
                } else if(room_extensions_NF.length > 0 ) {
                    if (Game.time % 5 === 0){
                        room_extensions_NF.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                    }
                    creep.memory.moving_target = room_extensions_NF[0]; 
                    creep.transfer(room_extensions_NF[0], RESOURCE_ENERGY);
                }
            }
        
        }
        //================================================role_local_starter================================================
        //================================================role_local_miner================================================
        if ( creep.hits == creep.hitsMax && creep.memory.role == 'role_local_miner'){
            
            if (creep.memory.position == undefined) {
                creep.memory.position = 0
            }
            if (creep.memory.inline == undefined) {
                creep.memory.inline = 'no'
            }
            
            if (room_sources[creep.memory.position].energy > 0 && creep.pos.isNearTo(room_sources[creep.memory.position]) ){
                creep.harvest(room_sources[creep.memory.position]);
                creep.memory.moving_target = undefined
                // if (creep.ticksToLive < 1400 ){
                //     if (room_spawns.length == 1){
                //         // nothing
                //     } else if (room_spawns.length == 2 && room_local_haulers.length !== 0){
                //         room_spawns[1].renewCreep(creep);
                //     } else if (room_spawns.length == 3 && room_local_haulers.length !== 0){
                //         room_spawns[creep.memory.position + 1].renewCreep(creep);
                //     }
                // }
            } else {
                const room_local_miners_inthisline = room_local_miners.filter((i) => i.memory.position == creep.memory.position && i.memory.inline == 'yes' );
                if ( room_local_miners_inthisline.length > 1 && creep.memory.inline == 'yes' ) {
                    creep.memory.inline = 'no'
                } else if ( room_local_miners_inthisline.length == 1 && creep.memory.inline == 'no' ) {
                    // and itself is not inline
                    creep.memory.position = (creep.memory.position + 1) % 2;
                } else if ( room_local_miners_inthisline.length < 1 && creep.memory.inline == 'no'){
                    creep.memory.inline = 'yes'; // has to be one equal sign
                }
                creep.memory.moving_target = room_sources[creep.memory.position]
            }
            
            if (creep.store.getUsedCapacity() >= creep.store.getCapacity()/2 ){
                if (room_spawns.length == 3 && room_spawns[creep.memory.position + 1].store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                    creep.transfer(room_spawns[creep.memory.position + 1],RESOURCE_ENERGY)
                } else if (room_links.length == 2){
                    creep.transfer(room_links[1],RESOURCE_ENERGY)
                } else if (room_links.length >= 3){
                    creep.transfer(room_links[creep.memory.position + 1],RESOURCE_ENERGY)
                }
            }
        }
        //================================================role_local_miner================================================
        //================================================role_local_hauler===============================================
        if ( creep.hits == creep.hitsMax && creep.memory.role == 'role_local_hauler' ){
            // creep.memory.moving_target = undefined; // reset
            creep.memory.status = 'not_idle'; // reset
            
            if ( creep.store.getUsedCapacity() == 0 ){
                const room_energy_droppeds_gt_amount = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (i) => i.resourceType == RESOURCE_ENERGY && i.amount > creep.store.getCapacity()/2 });
                
                if(room_energy_droppeds_gt_amount.length > 0 ){
                    // if (room_energy_droppeds_gt_amount[0].amount < creep.store.getFreeCapacity(RESOURCE_ENERGY) ){
                    //     room_energy_droppeds_gt_amount.sort((a, b) => b.amount - a.amount);
                    // }
                    room_energy_droppeds_gt_amount.sort((a, b) => b.amount - a.amount);
                    creep.memory.moving_target = room_energy_droppeds_gt_amount[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.pickup(room_energy_droppeds_gt_amount[0]);
                    }
                } else if (room_energyminer_containers.length > 0 ){
                    if ( room_energyminer_containers[0].store.getUsedCapacity(RESOURCE_ENERGY) < creep.store.getFreeCapacity(RESOURCE_ENERGY) ){
                        room_energyminer_containers.sort((a, b) => b.store.getUsedCapacity(RESOURCE_ENERGY) - a.store.getUsedCapacity(RESOURCE_ENERGY) );
                    }
                    creep.memory.moving_target = room_energyminer_containers[0];
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_energyminer_containers[0],RESOURCE_ENERGY);
                    }
                } else if ( room_factorys.length > 0 && room_factorys[0].store.getUsedCapacity(RESOURCE_ENERGY) > factory_energy_amount_max ){
                    creep.memory.moving_target = room_factorys[0] ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_factorys[0],RESOURCE_ENERGY);
                    }
                } else if ( room_mineral_containers.length > 0 && room_mineral_containers[0].store.getUsedCapacity() > creep.store.getCapacity()/2 && creep.room.energyAvailable > creep.room.energyCapacityAvailable/2){
                    creep.memory.moving_target = room_mineral_containers[0]
                    let stored_resources = _.filter(Object.keys(room_mineral_containers[0].store), resource => room_mineral_containers[0].store[resource] > 0);
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_mineral_containers[0], stored_resources[0] );
                    }
                } else if ( creep.room.terminal && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_energy_amount_max ){
                    creep.memory.moving_target = creep.room.terminal; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.terminal,RESOURCE_ENERGY);
                    }
                } else if ( creep.room.storage && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                    creep.memory.moving_target = creep.room.storage; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.storage,RESOURCE_ENERGY);
                    }
                } else if ( room_links.length > 0 && room_links[0].store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                    creep.memory.moving_target = room_links[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_links[0],RESOURCE_ENERGY);
                    }
                } else {
                    creep.memory.moving_target = room_spawns[0];
                }
            } else {
                if ( !creep.room.terminal && creep.room.storage && creep.store.getUsedCapacity() !== 0 && creep.store.getUsedCapacity(RESOURCE_ENERGY) < creep.store.getUsedCapacity() ) {
                    let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0) ;
                    creep.memory.moving_target = creep.room.storage; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(creep.room.storage, stored_resources[0]);
                    }
                } else if ( creep.room.terminal && creep.store.getUsedCapacity() > 0 && creep.store.getUsedCapacity(RESOURCE_ENERGY) < creep.store.getUsedCapacity() ) {
                    let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0) ;
                    creep.memory.moving_target = creep.room.terminal; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(creep.room.terminal, stored_resources[0]);
                    }
                } else if(room_extensions_NF.length > 0 ) {
                    if (Game.time % 3 === 0){
                        room_extensions_NF.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                    }
                    creep.memory.moving_target = room_extensions_NF[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_extensions_NF[0], RESOURCE_ENERGY);
                    }
                    // if (room_extensions_NF[0].store.getFreeCapacity(RESOURCE_ENERGY) === 0){
                    //     room_extensions_NF.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                    // }
                } else if (room_spawns_NF.length > 0 && room_local_managers.length == 0) {
                    creep.memory.moving_target = room_spawns_NF[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_spawns_NF[0], RESOURCE_ENERGY);
                    }
                } else if ( room_towers_NF.length > 0 && room_local_managers.length == 0){
                    room_towers_NF.sort((a, b) => a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY) );
                    creep.memory.moving_target = room_towers_NF[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_towers_NF[0], RESOURCE_ENERGY);
                    }
                } else if (room_labs_energy_NF.length > 0 ) {
                    creep.memory.moving_target = room_labs_energy_NF[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_labs_energy_NF[0], RESOURCE_ENERGY);
                    }
                } else if (!creep.room.storage && room_upgrader_containers.length == 0 ) { 
                    // room_local_builders.sort((a, b) => a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY));
                    if (room_local_builders.length > 0 && room_local_builders[0].store.getUsedCapacity(RESOURCE_ENERGY) == 0 ){
                        creep.memory.moving_target = room_local_builders[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(room_local_builders[0],RESOURCE_ENERGY);
                        }
                    } else if (room_local_upgraders.length > 0 && room_local_upgraders[0].store.getUsedCapacity(RESOURCE_ENERGY) == 0 ){
                        creep.memory.moving_target = room_local_upgraders[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(room_local_upgraders[0],RESOURCE_ENERGY);
                        }
                    }
                } else if (!creep.room.storage && room_upgrader_containers.length > 0 ){
                    creep.memory.moving_target = room_upgrader_containers[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_upgrader_containers[0],RESOURCE_ENERGY);
                    }
                } else if (creep.room.terminal && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminal_energy_amount_min ){
                    creep.memory.moving_target = creep.room.terminal; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                    }
                } else if (room_local_builders.length > 0 && room_walls_NF.length > 0) {
                    room_local_builders.sort((a, b) => a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY) );
                    creep.memory.moving_target = room_local_builders[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_local_builders[0], RESOURCE_ENERGY);
                    }
                } else if (creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 ){
                    creep.memory.moving_target = creep.room.storage; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                    }
                } else {
                    creep.memory.moving_target = room_spawns[0];
                }
            }
            // if (creep.pos.isNearTo(room_spawns[0])){
            //     room_spawns[0].renewCreep(creep)
            // }
            creep.say('LH' + creep.store.getUsedCapacity());
        }
        //================================================role_local_hauler================================================
        //================================================role_local_builder================================================
        if ( creep.hits == creep.hitsMax && creep.memory.role == 'role_local_builder' ){
            // build structures except rampart
            creep.memory.moving_target = undefined; // reset
            // only containers and roads decay, and if our defense was breach, the rampart on spawn should be fine
            if ( room_labs.length > 0 && creep.memory.labsreached !== true && creep.ticksToLive > 1000 ){
                creep.memory.moving_target = room_labs[0]
                if (room_labs[0].pos.isNearTo(creep) && creep.body[0].boost == undefined ){
                    room_labs[0].boostCreep(creep);
                } else if (creep.body[0].boost !== undefined){
                    creep.memory.labsreached = true
                }
            } else {
                
                if ( creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0 ){
                    if (room_upgrader_containers.length > 0 && room_upgrader_containers[0].store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                        creep.memory.moving_target = room_upgrader_containers[0]
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.withdraw(room_upgrader_containers[0], RESOURCE_ENERGY);
                        }
                    } else if (creep.room.storage && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                        creep.memory.moving_target = creep.room.storage
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                        } 
                    // } else if ( creep.room.terminal && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                    //     creep.memory.moving_target = creep.room.terminal; 
                    //     if ( creep.pos.isNearTo(creep.room.terminal) ){
                    //         creep.withdraw(creep.room.terminal, RESOURCE_ENERGY);
                    //     } 
                    } else if ( room_links.length > 0 && room_links[0].store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                        creep.memory.moving_target = room_links[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.withdraw(room_links[0], RESOURCE_ENERGY);
                        } 
                    }
                } else {
                    if ( room_walls_lt_min.length > 0 ){
                        if (Game.time % 3 === 0){
                            room_walls_lt_min.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                        }
                        if ( creep.pos.getRangeTo(room_walls_lt_min[0]) > 3 ){
                            creep.memory.moving_target = room_walls_lt_min[0];
                        } else if ( creep.pos.getRangeTo(room_walls_lt_min[0]) <= 3 ){
                            creep.repair(room_walls_lt_min[0]);
                        }
                    } else if ( room_ramparts_lt_min.length > 0 ){
                        if (Game.time % 3 === 0){
                            room_ramparts_lt_min.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                        }
                        if ( creep.pos.getRangeTo(room_ramparts_lt_min[0]) > 3 ){
                            creep.memory.moving_target = room_ramparts_lt_min[0];
                        } else if ( creep.pos.getRangeTo(room_ramparts_lt_min[0]) <= 3 ){
                            creep.repair(room_ramparts_lt_min[0]);
                        }
                    } else if ( room_myconstructions.length > 0 ){
                        if (Game.time % 3 === 0){
                            room_myconstructions.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                        }
                        if ( creep.pos.getRangeTo(room_myconstructions[0]) > 3 ){
                            creep.memory.moving_target = room_myconstructions[0];
                        } else if ( creep.pos.getRangeTo(room_myconstructions[0]) <= 3 ){
                            creep.build(room_myconstructions[0]);
                        }
                        // repair walls/ramparts under attack
                    } else if ( room_walls_lt_max.length > 0 && creep.room.storage ){
                        if (Game.time % 3 === 0){
                            room_walls_lt_max.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                        }
                        if ( creep.pos.getRangeTo(room_walls_lt_max[0]) > 3 ){
                            creep.memory.moving_target = room_walls_lt_max[0];
                        } else if ( creep.pos.getRangeTo(room_walls_lt_max[0]) <= 3 ){
                            creep.repair(room_walls_lt_max[0]);
                        }
                    } else if ( room_ramparts_lt_max.length > 0 && creep.room.storage ){
                        if (Game.time % 3 === 0){
                            room_ramparts_lt_max.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                        }
                        if ( creep.pos.getRangeTo(room_ramparts_lt_max[0]) > 3 ){
                            creep.memory.moving_target = room_ramparts_lt_max[0];
                        } else if ( creep.pos.getRangeTo(room_ramparts_lt_max[0]) <= 3 ){
                            creep.repair(room_ramparts_lt_max[0]);
                        }
                    } else if ( room_walls_NF.length > 0 && creep.room.terminal ){
                        if (Game.time % 3 === 0){
                            room_walls_NF.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                        }
                        if ( creep.pos.getRangeTo(room_walls_NF[0]) > 3 ){
                            creep.memory.moving_target = room_walls_NF[0];
                        } else if ( creep.pos.getRangeTo(room_walls_NF[0]) <= 3 ){
                            creep.repair(room_walls_NF[0]);
                        }
                    } else if ( room_ramparts_NF.length > 0 && creep.room.terminal ){
                        if (Game.time % 3 === 0){
                            room_ramparts_NF.sort((a, b) => a.pos.getRangeTo(creep.pos) - b.pos.getRangeTo(creep.pos) );
                        }
                        if ( creep.pos.getRangeTo(room_ramparts_NF[0]) > 3 ){
                            creep.memory.moving_target = room_ramparts_NF[0];
                        } else if ( creep.pos.getRangeTo(room_ramparts_NF[0]) <= 3 ){
                            creep.repair(room_ramparts_NF[0]);
                        }
                    } else {
                        creep.say("done")
                    }
                    // if (creep.pos.getRangeTo(creep.room.controller) <= 3){
                    //     creep.upgradeController(creep.room.controller)
                    // }
                }
            }
        }
        //================================================role_local_builder================================================
        //================================================role_local_upgrader================================================
        if ( creep.hits == creep.hitsMax && (creep.memory.role == 'role_local_upgrader' ) ){
            creep.memory.moving_target = undefined; // reset
            
            if ( creep.room.controller.level !== 8 && room_labs.length >= 0 && creep.memory.labsreached !== true && creep.ticksToLive > 1000 && room_labs[1].store.getUsedCapacity("XGH2O") >= 1200 ){
                creep.memory.moving_target = room_labs[1]
                if (room_labs[1].pos.isNearTo(creep) && creep.body[0].boost == undefined ){
                    room_labs[1].boostCreep(creep) ;
                }
            } else {
                
                if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= creep.store.getCapacity()/2){
                    if ( room_upgrader_containers.length > 0 && room_upgrader_containers[0].store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                        creep.memory.moving_target = room_upgrader_containers[0];
                        creep.withdraw(room_upgrader_containers[0],RESOURCE_ENERGY);
                        if (room_upgrader_containers[0].hits < room_upgrader_containers[0].hitsMax){
                            creep.repair(room_upgrader_containers[0])
                        }
                    } else if ( creep.room.storage && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                        creep.memory.moving_target = creep.room.storage;
                        creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                        // the storage must adjacent to room_spawn[0], that's a spawn*3+link*3 rebuild 15000*3+5000*3 cost lesson
                    }
                } else {
                    if ( creep.pos.getRangeTo(creep.room.controller) > 3 ){
                        creep.memory.moving_target = creep.room.controller;
                    } else {
                        const room_myconstructions_inrange = room_myconstructions.filter((i) => i.pos.getRangeTo(creep) <= 3 );
                        if ( room_myconstructions_inrange.length > 0 ){
                            creep.build(room_myconstructions_inrange[0]);
                        }
                        creep.upgradeController(creep.room.controller);
                        // creep.signController(creep.room.controller ,"💗️MAKE_LOVE_NOT_WAR🕊️[感谢大猫]");
                        // creep.signController(creep.room.controller,"感谢大猫 -joe95(noob瞎玩)")
                    }
                }
                
                if (creep.body[0].boost !== undefined){
                    creep.memory.labsreached = true
                // } else if (creep.ticksToLive < 1400 && room_local_haulers.length !== 0) {
                //     creep.memory.moving_target = room_spawns[0]
                //     room_spawns[0].renewCreep(creep)
                //     creep.memory.labsreached = undefined
                }
            }

        }
        //================================================role_local_upgrader================================================
        //================================================role_local_mineral_miner================================================
        if (creep.hits == creep.hitsMax && creep.memory.role == 'role_local_mineral_miner'){
            // creep.memory.moving_target = undefined; // reset
            // build the room_mineral_containers first
            if ( room_mineral_containers.length > 0 && creep.pos !== room_mineral_containers[0].pos ){
                if ( !creep.pos.isNearTo(room_mineral_containers[0]) ){
                    creep.memory.moving_target = room_mineral_containers[0];
                } else if ( creep.pos.isNearTo(room_mineral_containers[0]) ){
                    const dir = creep.pos.getDirectionTo(room_mineral_containers[0])
                    creep.move(dir);
                }
            } else {
                creep.memory.moving_target = room_minerals[0];
            }
            if ( creep.pos.isNearTo(room_minerals[0]) ){
                creep.harvest(room_minerals[0]);
            }
             if ( room_minerals[0].mineralAmount == 0 ){
                creep.memory.role = 'recycle';
             }
        }
        //================================================role_local_mineral_miner================================================
        //================================================role_local_manager================================================W14N53
        if ( creep.hits == creep.hitsMax && creep.memory.role == 'role_local_manager' && creep.memory.bornplace == 'W14N53' ){
            creep.memory.moving_target = undefined; // reset
            creep.memory.status = 'not_idle'; // reset
            // lab must be build one by one and from room_labs[0] to room_labs[9], one by one, that's a 100K energy paid lession
            
            if ( creep.store.getUsedCapacity() == 0 ){
                // room_links[0]
                if ( room_links[0].store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                    creep.memory.moving_target = room_links[0] ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_links[0],RESOURCE_ENERGY);
                    }
                // LH from terminal to lab0
                } else if ( creep.room.terminal.store.getUsedCapacity("LH") > 0 && room_labs[0].store.getUsedCapacity("LH") < 1000 ){
                    creep.memory.moving_target = creep.room.terminal ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.terminal,"LH");
                    }
                // need energy to fill structures
                } else if ( room_spawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0
                            || room_towers_NF.length > 0
                            || creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminal_energy_amount_min
                            || creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_energy_amount_max
                            ){
                    // terminal
                    if ( creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_energy_amount_max ){
                        creep.memory.moving_target = creep.room.terminal; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.withdraw(creep.room.terminal,RESOURCE_ENERGY);
                        }
                    // storage
                    } else if ( creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                        creep.memory.moving_target = creep.room.storage; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.withdraw(creep.room.storage,RESOURCE_ENERGY);
                        }
                    }
                } else if ( creep.room.terminal.store.getFreeCapacity() > 5000 && creep.room.storage.store.getUsedCapacity('H') > 0 ){
                    creep.memory.moving_target = creep.room.storage;
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.storage,'H');
                    }
                } else {
                    creep.memory.moving_target = room_spawns[0];
                }
            } else if ( creep.store.getUsedCapacity() > 0 ) {
                if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                    if ( room_spawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0 ) {
                        creep.memory.moving_target = room_spawns[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(room_spawns[0], RESOURCE_ENERGY);
                        }
                    } else if (room_towers_NF.length > 0){
                        room_towers_NF.sort((a, b) => a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY) );
                        creep.memory.moving_target = room_towers_NF[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(room_towers_NF[0], RESOURCE_ENERGY);
                        }
                    } else if (creep.room.terminal && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminal_energy_amount_min ){
                        creep.memory.moving_target = creep.room.terminal; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                        }
                    } else if (creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 ){
                        creep.memory.moving_target = creep.room.storage; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                        }
                    }
                    
                // LH to lab0
                } else if (creep.store.getUsedCapacity("LH") > 0 && room_labs[0].store.getUsedCapacity("LH") < 1000 ){
                    creep.memory.moving_target = room_labs[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_labs[0],"LH");
                    }
                } else if (creep.room.terminal && creep.room.terminal.store.getFreeCapacity() > 0 ) {
                    let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0);
                    creep.memory.moving_target = creep.room.terminal; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(creep.room.terminal,stored_resources[0]);
                    }
                } else if (creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 ) {
                    let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0);
                    creep.memory.moving_target = creep.room.storage; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(creep.room.storage,stored_resources[0]);
                    }
                }
            } else {
                creep.memory.moving_target = room_spawns[0];
            }
            // if ( creep.pos.isNearTo(room_spawns[0]) ){
            //     room_spawns[0].renewCreep(creep);
            // }
        }
        //================================================role_local_manager================================================W14N53
        //================================================role_local_manager================================================W15N53
        if ( creep.hits == creep.hitsMax && creep.memory.role == 'role_local_manager' && creep.memory.bornplace == 'W15N53' ){
            creep.memory.moving_target = undefined; // reset
            creep.memory.status = 'not_idle'; // reset
            // lab must be build one by one and from room_labs[0] to room_labs[9], one by one, that's a 100K energy paid lession
            
            if ( creep.store.getUsedCapacity() == 0 ){
                // room_links[0]
                if ( room_links[0].store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                    creep.memory.moving_target = room_links[0] ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_links[0],RESOURCE_ENERGY);
                    }
                    
                // LH from terminal to lab0
                } else if ( creep.room.terminal.store.getUsedCapacity("LH") > 0 && room_labs[0].store.getUsedCapacity("LH") < 1000 ){
                    creep.memory.moving_target = creep.room.terminal ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.terminal,"LH");
                    }
                    
                // need energy to fill structures
                } else if ( room_spawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0
                            || room_towers_NF.length > 0
                            || creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminal_energy_amount_min
                            || creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_energy_amount_max
                            ){
                    // terminal
                    if ( creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_energy_amount_max ){
                        creep.memory.moving_target = creep.room.terminal; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.withdraw(creep.room.terminal,RESOURCE_ENERGY);
                        }
                    // storage
                    } else if ( creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                        creep.memory.moving_target = creep.room.storage; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.withdraw(creep.room.storage,RESOURCE_ENERGY);
                        }
                    }
                } else if ( creep.room.terminal.store.getFreeCapacity() > 5000 && creep.room.storage.store.getUsedCapacity('L') > 0 ){
                    creep.memory.moving_target = creep.room.storage;
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.storage,'L');
                    }
                } else {
                    creep.memory.moving_target = room_spawns[0];
                }
            } else if ( creep.store.getUsedCapacity() > 0 ) {
                if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                    if ( room_spawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0 ) {
                        creep.memory.moving_target = room_spawns[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(room_spawns[0], RESOURCE_ENERGY);
                        }
                    } else if (room_towers_NF.length > 0){
                        room_towers_NF.sort((a, b) => a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY) );
                        creep.memory.moving_target = room_towers_NF[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(room_towers_NF[0], RESOURCE_ENERGY);
                        }
                    } else if (creep.room.terminal && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminal_energy_amount_min ){
                        creep.memory.moving_target = creep.room.terminal; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                        }
                    // } else if (room_factorys.length > 0 && room_factorys[0].store.getUsedCapacity(RESOURCE_ENERGY) < factory_energy_amount_min ) {
                    //     creep.memory.moving_target = room_factorys[0]; 
                    //     creep.transfer(room_factorys[0], RESOURCE_ENERGY);
                    } else if (creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 ){
                        creep.memory.moving_target = creep.room.storage; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                        }
                    }
                    
                // LH to lab0
                } else if ( creep.store.getUsedCapacity("LH") > 0 && room_labs[0].store.getUsedCapacity("LH") < 1000 ){
                    creep.memory.moving_target = room_labs[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_labs[0],"LH");
                    }
                } else if (creep.room.terminal && creep.room.terminal.store.getFreeCapacity() > 0 ) {
                    let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0);
                    creep.memory.moving_target = creep.room.terminal; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(creep.room.terminal,stored_resources[0]);
                    }
                } else if (creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 ) {
                    let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0);
                    creep.memory.moving_target = creep.room.storage; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(creep.room.storage,stored_resources[0]);
                    }
                }
            } else {
                creep.memory.moving_target = room_spawns[0];
            }
            // if ( creep.pos.isNearTo(room_spawns[0]) ){
            //     room_spawns[0].renewCreep(creep);
            // }
            
        }
        //================================================role_local_manager================================================W15N53
        //================================================role_local_manager================================================W15N58
        if ( creep.hits == creep.hitsMax && creep.memory.role == 'role_local_manager' && creep.memory.bornplace == 'W15N58' ){
            creep.memory.moving_target = undefined; // reset
            creep.memory.status = 'not_idle'; // reset
            // lab must be build one by one and from room_labs[0] to room_labs[9], one by one, that's a 100K energy paid lession
                        
            // XZHO2
            // XLHO2   
            // XUH2O
            // XGHO2
                        
            if ( creep.store.getUsedCapacity() == 0 ){
                // room_links[0]
                if ( room_links[0].store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                    creep.memory.moving_target = room_links[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_links[0],RESOURCE_ENERGY);
                    }
                // LH from terminal to lab0
                } else if ( creep.room.terminal.store.getUsedCapacity("LH") > 0 && room_labs[0].store.getUsedCapacity("LH") < 1000 ){
                    creep.memory.moving_target = creep.room.terminal ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.terminal,"LH");
                    }
                // need energy to fill structures
                } else if ( room_spawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0
                            || room_towers_NF.length > 0
                            || creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminal_energy_amount_min
                            || creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_energy_amount_max
                            ){
                    // terminal
                    if ( creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_energy_amount_max ){
                        creep.memory.moving_target = creep.room.terminal; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.withdraw(creep.room.terminal,RESOURCE_ENERGY);
                        }
                    // storage
                    } else if ( creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                        creep.memory.moving_target = creep.room.storage; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.withdraw(creep.room.storage,RESOURCE_ENERGY);
                        }
                    }
                } else if ( creep.room.terminal.store.getFreeCapacity() > 5000 && creep.room.storage.store.getUsedCapacity('H') > 0 ){
                    creep.memory.moving_target = creep.room.storage;
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.storage,'H');
                    }
                } else {
                    creep.memory.moving_target = room_spawns[0];
                }
            } else if ( creep.store.getUsedCapacity() > 0 ) {
                if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                    if ( room_spawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0 ) {
                        creep.memory.moving_target = room_spawns[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(room_spawns[0], RESOURCE_ENERGY);
                        }
                    } else if (room_towers_NF.length > 0){
                        room_towers_NF.sort((a, b) => a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY) );
                        creep.memory.moving_target = room_towers_NF[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(room_towers_NF[0], RESOURCE_ENERGY);
                        }
                    } else if (creep.room.terminal && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminal_energy_amount_min ){
                        creep.memory.moving_target = creep.room.terminal; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                        }
                    // } else if (room_factorys.length > 0 && room_factorys[0].store.getUsedCapacity(RESOURCE_ENERGY) < factory_energy_amount_min ) {
                    //     creep.memory.moving_target = room_factorys[0]; 
                    //     creep.transfer(room_factorys[0], RESOURCE_ENERGY);
                    } else if (creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 ){
                        creep.memory.moving_target = creep.room.storage; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                        }
                    }
                       
                // LH to lab0
                } else if ( creep.store.getUsedCapacity("LH") > 0 && room_labs[0].store.getUsedCapacity("LH") < 1000 ){
                    creep.memory.moving_target = room_labs[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_labs[0],"LH");
                    }
                } else if (creep.room.terminal && creep.room.terminal.store.getFreeCapacity() > 0 ) {
                    let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0);
                    creep.memory.moving_target = creep.room.terminal; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(creep.room.terminal,stored_resources[0]);
                    }
                } else if (creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 ) {
                    let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0);
                    creep.memory.moving_target = creep.room.storage; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(creep.room.storage,stored_resources[0]);
                    }
                }
            } else {
                creep.memory.moving_target = room_spawns[0];
            }
            // if ( creep.pos.isNearTo(room_spawns[0]) ){
            //     room_spawns[0].renewCreep(creep);
            // }
        }
        //================================================role_local_manager================================================W15N58
        //================================================role_local_manager================================================W15N59
        if ( creep.hits == creep.hitsMax && creep.memory.role == 'role_local_manager' && creep.memory.bornplace == 'W15N59' ){
            creep.memory.moving_target = undefined; // reset
            creep.memory.status = 'not_idle'; // reset
            // lab must be build one by one and from room_labs[0] to room_labs[9], one by one, that's a 100K energy paid lession
            
            if ( creep.store.getUsedCapacity() == 0 ){
                // room_links[0]
                if ( room_links[0].store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                    creep.memory.moving_target = room_links[0] ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_links[0],RESOURCE_ENERGY);
                    }
                // LH from terminal to lab0
                } else if ( creep.room.terminal.store.getUsedCapacity("LH") > 0 && room_labs[0].store.getUsedCapacity("LH") < 1000 ){
                    creep.memory.moving_target = creep.room.terminal ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.terminal,"LH");
                    }
                // L from terminal to lab2
                } else if ( creep.room.terminal.store.getUsedCapacity("L") > 0 && room_labs[2].store.getUsedCapacity("L") < 2500 ){
                    creep.memory.moving_target = creep.room.terminal ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.terminal,"L");
                    }
                // H from terminal to lab7
                } else if ( creep.room.terminal.store.getUsedCapacity("H") > 0 && room_labs[7].store.getUsedCapacity("H") < 2500 ){
                    creep.memory.moving_target = creep.room.terminal ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.terminal,"H");
                    }
                    
                // LH from lab0 to terminal
                } else if ( creep.room.terminal.store.getFreeCapacity() > 0 && room_labs[0].store.getUsedCapacity("LH") > 2000 ){
                    creep.memory.moving_target = room_labs[0] ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_labs[0],"LH");
                    }
                // LH from lab1 to terminal
                } else if ( creep.room.terminal.store.getFreeCapacity() > 0 && room_labs[1].store.getUsedCapacity("LH") > 1500 ){
                    creep.memory.moving_target = room_labs[1] ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_labs[1],"LH");
                    }
                // LH from lab3 to terminal
                } else if ( creep.room.terminal.store.getFreeCapacity() > 0 && room_labs[3].store.getUsedCapacity("LH") > 1500 ){
                    creep.memory.moving_target = room_labs[3] ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_labs[3],"LH");
                    }
                // LH from lab4 to terminal
                } else if ( creep.room.terminal.store.getFreeCapacity() > 0 && room_labs[4].store.getUsedCapacity("LH") > 1500 ){
                    creep.memory.moving_target = room_labs[4] ; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_labs[4],"LH");
                    }
                // LH from lab5 to terminal
                } else if ( creep.room.terminal.store.getFreeCapacity() > 0 && room_labs[5].store.getUsedCapacity("LH") > 1500 ){
                    creep.memory.moving_target = room_labs[5];
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_labs[5],"LH");
                    }
                // LH from lab6 to terminal
                } else if ( creep.room.terminal.store.getFreeCapacity() > 0 && room_labs[6].store.getUsedCapacity("LH") > 1500 ){
                    creep.memory.moving_target = room_labs[6];
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_labs[6],"LH");
                    }
                // LH from lab8 to terminal
                } else if ( creep.room.terminal.store.getFreeCapacity() > 0 && room_labs[8].store.getUsedCapacity("LH") > 1500 ){
                    creep.memory.moving_target = room_labs[8];
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_labs[8],"LH");
                    }
                // LH from lab9 to terminal
                } else if ( creep.room.terminal.store.getFreeCapacity() > 0 && room_labs[9].store.getUsedCapacity("LH") > 1500 ){
                    creep.memory.moving_target = room_labs[9];
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(room_labs[9],"LH");
                    }
                // RESOURCE_POWER from terminal to powerspawn
                } else if ( creep.room.terminal.store.getUsedCapacity(RESOURCE_POWER) > 0 && room_powerspawns[0].store.getUsedCapacity(RESOURCE_POWER) == 0 ){
                    creep.memory.moving_target = creep.room.terminal; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.terminal,RESOURCE_POWER,100);
                    }
                // need energy to fill structures
                } else if ( room_spawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0
                            || room_towers_NF.length > 0
                            || creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminal_energy_amount_min
                            || creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_energy_amount_max
                            || room_factorys[0].store.getUsedCapacity(RESOURCE_ENERGY) < factory_energy_amount_min
                            || room_factorys[0].store.getUsedCapacity(RESOURCE_ENERGY) > factory_energy_amount_max
                            || room_powerspawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > creep.store.getCapacity()
                            ){
                    // factory
                    if ( room_factorys[0].store.getUsedCapacity(RESOURCE_ENERGY) > factory_energy_amount_max ){
                        creep.memory.moving_target = room_factorys[0];
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.withdraw(room_factorys[0],RESOURCE_ENERGY);
                        }
                    // terminal
                    } else if ( creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_energy_amount_max ){
                        creep.memory.moving_target = creep.room.terminal; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.withdraw(creep.room.terminal,RESOURCE_ENERGY);
                        }
                    // storage
                    } else if ( creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0 ){
                        creep.memory.moving_target = creep.room.storage;
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.withdraw(creep.room.storage,RESOURCE_ENERGY);
                        }
                    }
                } else if ( creep.room.terminal.store.getFreeCapacity() > 5000 && creep.room.storage.store.getUsedCapacity('L') > 0 ){
                    creep.memory.moving_target = creep.room.storage;
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.storage,'L');
                    }
                } else if ( creep.room.terminal.store.getFreeCapacity() > 5000 && creep.room.storage.store.getUsedCapacity('H') > 0 ){
                    creep.memory.moving_target = creep.room.storage;
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.storage,'H');
                    }
                } else if ( creep.room.terminal.store.getFreeCapacity() > 5000 && creep.room.storage.store.getUsedCapacity('LH') > 0 ){
                    creep.memory.moving_target = creep.room.storage;
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.withdraw(creep.room.storage,'LH');
                    }
                } else {
                    creep.memory.moving_target = room_spawns[0];
                }
            } else if ( creep.store.getUsedCapacity() > 0 ) {
                if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                    if ( room_spawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0 ) {
                        creep.memory.moving_target = room_spawns[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(room_spawns[0], RESOURCE_ENERGY);
                        }
                    } else if (room_towers_NF.length > 0){
                        room_towers_NF.sort((a, b) => a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY) );
                        creep.memory.moving_target = room_towers_NF[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(room_towers_NF[0], RESOURCE_ENERGY);
                        }
                    } else if (room_powerspawns.length > 0 && room_powerspawns[0].store.getFreeCapacity(RESOURCE_ENERGY) > creep.store.getCapacity()){
                        creep.memory.moving_target = room_powerspawns[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(room_powerspawns[0], RESOURCE_ENERGY);
                        }
                    } else if (creep.room.terminal && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminal_energy_amount_min ){
                        creep.memory.moving_target = creep.room.terminal; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                        }
                    } else if (room_factorys.length > 0 && room_factorys[0].store.getUsedCapacity(RESOURCE_ENERGY) < factory_energy_amount_min ) {
                        creep.memory.moving_target = room_factorys[0]; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(room_factorys[0], RESOURCE_ENERGY);
                        }
                    } else if (creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 ){
                        creep.memory.moving_target = creep.room.storage; 
                        if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                            creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                        }
                    }
                    
                // LH to lab0
                } else if ( creep.store.getUsedCapacity("LH") > 0 && room_labs[0].store.getUsedCapacity("LH") < 1000 ){
                    creep.memory.moving_target = room_labs[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_labs[0],"LH");
                    }
                // L from terminal to lab2
                } else if ( creep.store.getUsedCapacity("L") > 0 && room_labs[2].store.getUsedCapacity("L") < 2500 ){
                    creep.memory.moving_target = room_labs[2];
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_labs[2],"L");
                    }
                // H from terminal to lab7
                } else if ( creep.store.getUsedCapacity("H") > 0 && room_labs[7].store.getUsedCapacity("H") < 2500 ){
                    creep.memory.moving_target = room_labs[7]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_labs[7],"H");
                    }
                // RESOURCE_POWER from terminal to powerspawn
                } else if ( creep.store.getUsedCapacity(RESOURCE_POWER) > 0 && room_powerspawns[0].store.getUsedCapacity(RESOURCE_POWER) == 0 ) {
                    creep.memory.moving_target = room_powerspawns[0]; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(room_powerspawns[0],RESOURCE_POWER);
                    }
                } else if (creep.room.terminal && creep.room.terminal.store.getFreeCapacity() > 0 ) {
                    let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0);
                    creep.memory.moving_target = creep.room.terminal; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(creep.room.terminal,stored_resources[0]);
                    }
                } else if (creep.room.storage && creep.room.storage.store.getFreeCapacity() > 0 ) {
                    let stored_resources = _.filter(Object.keys(creep.store), resource => creep.store[resource] > 0);
                    creep.memory.moving_target = creep.room.storage; 
                    if ( creep.pos.isNearTo(creep.memory.moving_target) ){
                        creep.transfer(creep.room.storage,stored_resources[0]);
                    }
                }
            } else {
                creep.memory.moving_target = room_spawns[0];
            }
            // if ( creep.pos.isNearTo(room_spawns[0]) ){
            //     room_spawns[0].renewCreep(creep);
            // }
            
        }
        //================================================role_local_manager================================================W15N59
        //============================================================================================================
        //============================================================================================================
        //================================================role_remote_scavager===============================================
        //================================================role_remote_scavager================================================
        //============================================================================================================
        //============================================================================================================
        //================================================avoid_combat================================================
        if ( creep.memory.avoid_combat !== 'no' ){
            // run backto our tower for repair if got attacked
            if (creep.hits < creep.hitsMax ) {
                creep.say("💔",{public: true});
                creep.memory.moving_target = room_spawns[0];
            }
        }
        // ================================================avoid_combat================================================
        // // ================================================role_coastguard_attacker================================================
        // // ================================================role_coastguard_attacker================================================
        // // ================================================role_coastguard_healer================================================
        // // ================================================role_coastguard_healer================================================
        //============================================================================================================
        //============================================================================================================
        //================================================role_claimer================================================
        //================================================role_claimer================================================
        //================================================role_claimer_miner================================================
        //================================================role_claimer_miner================================================
        //================================================role_claimer_hauler================================================
        //================================================role_claimer_hauler================================================
        //================================================role_claimer_builder================================================
        //================================================role_claimer_builder================================================
        
        
        function target_renew(target) {
            if ( creep.memory.moving_target.id ){
                return Game.getObjectById(creep.memory.moving_target.id);
            } else if ( creep.memory.moving_target.pos ){
                return creep.memory.moving_target;
            } else if (!creep.memory.moving_target) {
                return null;
            }
        }
        if ( creep.memory.moving_target && !creep.pos.isNearTo(creep.memory.moving_target)  ){
            const target = target_renew(creep.memory.moving_target);
            creep.moveTo(target, {noPathFinding: true})
        }
        // if ( creep.memory.moving_target !== undefined && !creep.pos.isNearTo(creep.memory.moving_target)  ){
        //     if (creep.memory.lastPosition ) {
        //         const target = target_renew(creep.memory.moving_target);
        //         if ( creep.pos.x !== creep.memory.lastPosition.x || creep.pos.y !== creep.memory.lastPosition.y ) {
        //         // The position has changed since the last tick
        //             try {
        //                 creep.moveTo( target, {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}} );
        //                 // creep.prototype.moveTo( creep.memory.moving_target, {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}} );
        //             } catch (error) {
        //                 console.log(creep.name + '|' + creep.room.name + '|' + target + ' moving_target error ' + error.message);
        //             }
        //         } else if (creep.pos.x === creep.memory.lastPosition.x && creep.pos.y === creep.memory.lastPosition.y && !creep.pos.isNearTo(target) ) {
        //         // The position NOT changed since the last tick
        //             try {
        //                 creep.moveTo( target, {visualizePathStyle: {stroke: '#ffffff'}} );
        //             } catch (error) {
        //                 console.log(creep.name + '|' + creep.room.name + '|' + target + ' moving_target error ' + error.message);
        //             }
        //         }
        //     }
        //     // Update the lastPosition in memory for the next tick
        //     creep.memory.lastPosition = { x: creep.pos.x, y: creep.pos.y };
        // } 
        
    } // for Game.creeps ends
    
    
    if ( Memory.refresh === true ) {
        // Once the task is done, reset the flag
        Memory.refresh = false;
    }
    if (Game.cpu.bucket == 10000){
        Game.cpu.generatePixel()
    }
    
    // Memory.cpu4 = Game.cpu.getUsed() ;
    // Memory.cpu5 = Game.cpu.getUsed() ;
    
    // console.log('-----------' + Game.cpu.bucket + '|' + Memory.cpu1 + '|' + Memory.cpu2 + '|' + Memory.cpu3 + '|' + Memory.cpu4 + '|' + Memory.cpu5 + '-----------');
    // console.log('-----------' + Game.cpu.bucket + '-----------');
    
//   });
}

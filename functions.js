require('极致建筑缓存');
require('超级移动优化');


const bodyPartConfig = {
    "role_starter": {
        250: [WORK,MOVE,MOVE,CARRY],
    },
    "role_newroom_starter": {
        250: [WORK,MOVE,MOVE,CARRY],
        2500: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
    },
    "role_local_miner0": {
        300: [WORK,WORK,MOVE,MOVE],
        550: [WORK,WORK,WORK,WORK,MOVE,MOVE,CARRY],
        800: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY],
        1500: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY],
    },
    "role_local_miner1": {
        300: [WORK,WORK,MOVE,MOVE],
        550: [WORK,WORK,WORK,WORK,MOVE,MOVE,CARRY],
        800: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY],
        1500: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY],
    },
    "role_local_hauler": {
        300: [MOVE,MOVE,MOVE,CARRY,CARRY,CARRY],
        500: [MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY],
        750: [MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
        1500: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
    },
    "role_local_upgrader": {
        300: [WORK,WORK,MOVE,CARRY],
        550: [WORK,WORK,WORK,WORK,MOVE,MOVE,CARRY],
        800: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY],
        1300: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,CARRY],
        // 1800: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //     WORK,WORK,WORK,WORK,WORK,
        //     MOVE,MOVE,MOVE,MOVE,MOVE,CARRY], // 2 sources(20 energy/tick) can not support 15 WORK upgradecontroller + creep cost
        2300: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,CARRY,CARRY],
        4500: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY],
    },
    "role_local_builder": {
        300: [WORK,MOVE,MOVE,CARRY,CARRY],
        550: [WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY],
        800: [WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY],
        1300: [WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
        1800: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
        2000: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
        3750: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
    },
    "role_local_manager" : {
        750: [MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
        1550: [WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
           CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
    },
    "role_local_mineral_miner": {
        2000: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
        2500: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    },
    "role_local_defender": {
        3120: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK,
            ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK,
            ],
    },
    "role_remote_miner": {
        3450: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
    }
    // Add more roles as needed
};

function get_bodypart(room_name, creep_role) {
    const room = Game.rooms[room_name];
    const energyCapacityAvailable = room.energyCapacityAvailable;
    const roleConfig = bodyPartConfig[creep_role];

    let selectedBodyParts = roleConfig[300]; // default to lowest config

    for (const energyThreshold in roleConfig) {
        if (energyCapacityAvailable >= energyThreshold) {
            selectedBodyParts = roleConfig[energyThreshold];
        }
    }
    if (creep_role == "role_local_upgrader" && room.controller.level == 8){
        selectedBodyParts = [WORK,CARRY,MOVE];
    }
    return selectedBodyParts;
}


function calculate_creep_cost(bodypart) {
    const bodyPartCosts = {
        "move": 50,
        "work": 100,
        "carry": 50,
        "attack": 80,
        "ranged_attack": 150,
        "heal": 250,
        "claim": 600,
        "tough": 10
    };

    let totalCost = 0;

    for (const part of bodypart) {
        if (bodyPartCosts[part]) {
            totalCost += bodyPartCosts[part];
        } else {
            console.log(`Unknown body part: ${part}`);
        }
    }

    return totalCost;
}


// Memory structure to store the last spawn times
if (!Memory.lastSpawnTime) {
    Memory.lastSpawnTime = {};
}

function spawn_mycreep(room_name, availableSpawn, creep_role, produce_num) {
    
    // Ensure lastSpawnTime object for the room exists
    if (!Memory.lastSpawnTime[room_name]) { Memory.lastSpawnTime[room_name] = {}; }
    // Ensure lastSpawnTime for the role in the room exists
    if (!Memory.lastSpawnTime[room_name][creep_role]) { Memory.lastSpawnTime[room_name][creep_role] = 0; }
    
    const room = Game.rooms[room_name];
    const bodyParts = get_bodypart(room_name, creep_role);
    const bodycost = calculate_creep_cost(bodyParts);
    const currentTime = Game.time;
    Memory.currentTime = Game.time;
    
    const timeSinceLastSpawn = currentTime - Memory.lastSpawnTime[room_name][creep_role];
    const spawnInterval = (1500 - ((bodyParts.length * 3) * produce_num) ) / produce_num;
    const creepsArray = Object.values(Game.creeps);
    const role_starters = creepsArray.filter((i) => i.memory.bornplace == room_name && i.memory.role == 'role_starter');
    
    if (timeSinceLastSpawn > spawnInterval && room.energyAvailable >= bodycost) {
        const borntime = Game.time + (bodyParts.length * 3);
        const newName = creep_role + " " + borntime;
        const result = availableSpawn.spawnCreep(bodyParts, newName, {
            memory: { role: creep_role, bornplace: room_name, borntime: borntime, cost: bodycost/1500, dontPullMe: false }
        });
        
        if (result === OK ) {
            if ( availableSpawn.spawning ){
                console.log(`${availableSpawn.name} spawning new ${creep_role}: ${newName} in ${room_name}`);
                // Only update the lastSpawnTime if the spawn is actually in progress
                Memory.lastSpawnTime[room_name][creep_role] = currentTime;
            } // this don't work, as the spawning ocur in the next tick, and multiple call of spawn_mycreep function will return OK
        } else {
            console.log(`${availableSpawn.name} failed to spawn ${creep_role}: ${result}`);
        }
    } else if (timeSinceLastSpawn > (spawnInterval + 200) && room.energyAvailable < bodycost && role_starters.length < 4 ){
        const borntime = Game.time + 12;
        const newName = "role_starter " + borntime;
        const result = availableSpawn.spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {
            memory: { role: "role_starter", bornplace: room_name, borntime: borntime, cost: 200/1500, dontPullMe: false }
        });
        
        if (result === OK ) {
            // if ( availableSpawn.spawning ){
            //     console.log(`${availableSpawn.name} spawning new ${creep_role}: ${newName} in ${room_name}`);
            //     // Only update the lastSpawnTime if the spawn is actually in progress
            //     Memory.lastSpawnTime[room_name][creep_role] = currentTime;
            // } // this don't work, as the spawning ocur in the next tick, and multiple call of spawn_mycreep function will return OK
        } else {
            console.log(`${availableSpawn.name} failed to spawn ${creep_role}: ${result}`);
        }
        
    }
    
}


function create_market_order(roomName) {
    const room = Game.rooms[roomName];
    const energy = RESOURCE_ENERGY;
    const storage = room.storage;
    const terminal = room.terminal;
    const buyAmount = 1000;            // Amount of energy to buy when low
    const sellAmount = 1000;           // Amount of energy to sell when high

    // Ensure we have both storage and terminal in the room
    if (!storage || !terminal) {
        // console.log(`Room ${room.name} is missing storage or terminal.`);
        return;
    }

    const currentEnergy = storage.store[RESOURCE_ENERGY];
    const myOrders = Game.market.orders;
    
    
    const L_sell_orders = Game.market.getAllOrders({ type: ORDER_SELL, resourceType: RESOURCE_LEMERGIUM });
    // const H_sell_orders = Game.market.getAllOrders({ type: ORDER_SELL, resourceType: RESOURCE_HYDROGEN });
    const energy_all_orders = Game.market.getAllOrders({ resourceType: energy });
    const energy_sell_orders = energy_all_orders.filter(order => order.type === ORDER_SELL);
    const energy_buy_orders = energy_all_orders.filter(order => order.type === ORDER_BUY);
    
    const L_sell_orders_lowest_price = _.min(L_sell_orders, 'price').price;
    // const H_sell_orders_lowest_price = _.min(H_sell_orders, 'price').price;
    const energy_sell_orders_lowest_price = _.min(energy_sell_orders, 'price').price;
    const energy_buy_orders_highest_price = _.max(energy_buy_orders, 'price').price;
    
    // Set a low threshold for buying
    if (energy_buy_orders_highest_price < 5){ var energyThresholdLow = 900000; 
    } else if (energy_buy_orders_highest_price < 6){ var energyThresholdLow = 800000;
    } else if (energy_buy_orders_highest_price < 7){ var energyThresholdLow = 700000;
    } else if (energy_buy_orders_highest_price < 8){ var energyThresholdLow = 600000;
    } else if (energy_buy_orders_highest_price < 9){ var energyThresholdLow = 500000;
    } else if (energy_buy_orders_highest_price < 10){ var energyThresholdLow = 400000;
    } else if (energy_buy_orders_highest_price < 11){ var energyThresholdLow = 300000;
    } else if (energy_buy_orders_highest_price < 12){ var energyThresholdLow = 200000;
    } else { var energyThresholdLow = 100000;
    }
    
    // Set a high threshold for selling
    if (energy_sell_orders_lowest_price > 15){ var energyThresholdHigh = 450000;
    } else if (energy_sell_orders_lowest_price > 14){ var energyThresholdHigh = 550000;
    } else if (energy_sell_orders_lowest_price > 13){ var energyThresholdHigh = 650000;
    } else if (energy_sell_orders_lowest_price > 12){ var energyThresholdHigh = 750000;
    } else if (energy_sell_orders_lowest_price > 11){ var energyThresholdHigh = 850000;
    } else if (energy_sell_orders_lowest_price > 10){ var energyThresholdHigh = 950000;
    } else{ var energyThresholdHigh = 990000;
    }
    

    // Selling energy when storage is high
    if (currentEnergy > energyThresholdHigh) {
        
        // Check if there's an existing sell order
        let energy_existingSellOrder = _.find(myOrders, order => 
            order.type === ORDER_SELL &&
            order.resourceType === energy &&
            order.roomName === room.name
        );

        if (energy_existingSellOrder) {
            if (energy_existingSellOrder.price !== energy_sell_orders_lowest_price){
                Game.market.changeOrderPrice(energy_existingSellOrder.id, energy_sell_orders_lowest_price);
            }
            if (energy_existingSellOrder.remainingAmount < sellAmount) {
                Game.market.extendOrder(energy_existingSellOrder.id, sellAmount - energy_existingSellOrder.remainingAmount);
            }
        } else {
            // Create a new sell order
            const result = Game.market.createOrder({
                type: ORDER_SELL,
                resourceType: energy,
                price: energy_sell_orders_lowest_price,
                totalAmount: sellAmount,
                roomName: room.name
            });

            if (result === OK) {
                console.log(`Created sell order in ${room.name} for ${sellAmount} energy at ${energy_sell_orders_lowest_price} credits.`);
            } else {
                console.log(`Failed to create sell order in ${room.name}: ${result}`);
            }
        }
        console.log(`${room.name} selling energy`);
    }

    if (energy_buy_orders_highest_price > 15){
        // console.log(`Energy energy_buy_orders_highest_price too high: ${energy_buy_orders_highest_price}`);
    } else {
        // Buying energy when storage is low
        if (currentEnergy < energyThresholdLow) {
            // Check if there's an existing buy order
            let energy_existingBuyOrder = _.find(myOrders, order => 
                order.type === ORDER_BUY &&
                order.resourceType === energy &&
                order.roomName === room.name
            );
            if (energy_existingBuyOrder) {
                if (energy_existingBuyOrder.price !== energy_buy_orders_highest_price){
                    Game.market.changeOrderPrice(energy_existingBuyOrder.id, energy_buy_orders_highest_price);
                }
                if (energy_existingBuyOrder.remainingAmount < buyAmount) {
                    Game.market.extendOrder(energy_existingBuyOrder.id, buyAmount - energy_existingBuyOrder.remainingAmount);
                }
            } else {
                // Create a new buy order
                const result = Game.market.createOrder({
                    type: ORDER_BUY,
                    resourceType: energy,
                    price: energy_buy_orders_highest_price,
                    totalAmount: buyAmount,
                    roomName: room.name
                });
                if (result === OK) {
                    console.log(`Created buy order in ${room.name} for ${buyAmount} energy at ${energy_buy_orders_highest_price} credits.`);
                } else {
                    console.log(`Failed to create buy order in ${room.name}: ${result}`);
                }
            }
            console.log(`${room.name} buying energy`);
        }
    }
    
    // sell H when H > 1000 
    if (room.terminal.store["H"] >= 1000){
        
        const result = room.terminal.send("H",1000,"W13N59","1000 H from jo95, accumulative: " + Memory.H_sent_to_bigcatcat )
        
        if (result === OK){
            Memory.H_sent_to_bigcatcat += 1000
            console.log(room.name + " sent 1000 H to W13N59, accumulative: " + Memory.H_sent_to_bigcatcat )
        } else {
            console.log(room.name + " failed to send H to W13N59: " + result)
        }
        
        // // Check if there's an existing sell order
        // let H_existingSellOrder = _.find(myOrders, order => 
        //     order.type === ORDER_SELL &&
        //     order.resourceType === RESOURCE_HYDROGEN &&
        //     order.roomName === room.name
        // );

        // if (H_existingSellOrder) {
        //     if (H_existingSellOrder.price !== H_sell_orders_lowest_price){
        //         Game.market.changeOrderPrice(H_existingSellOrder.id, H_sell_orders_lowest_price);
        //     }
        //     if (H_existingSellOrder.remainingAmount < sellAmount) {
        //         Game.market.extendOrder(H_existingSellOrder.id, sellAmount - H_existingSellOrder.remainingAmount);
        //     }
        // } else {
        //     // Create a new sell order
        //     const result = Game.market.createOrder({
        //         type: ORDER_SELL,
        //         resourceType: RESOURCE_HYDROGEN,
        //         price: H_sell_orders_lowest_price,
        //         totalAmount: sellAmount,
        //         roomName: room.name
        //     });

        //     if (result === OK) {
        //         console.log(`Created sell order in ${room.name} for ${sellAmount} H at ${H_sell_orders_lowest_price} credits.`);
        //     } else {
        //         console.log(`Failed to create sell H in ${room.name}: ${result}`);
        //     }
        // }
        // console.log(`${room.name} selling H`);
    }
    
    // sell L when L > 1000 
    if (room.terminal.store["L"] >= 1000){
        
        // Check if there's an existing sell order
        let L_existingSellOrder = _.find(myOrders, order => 
            order.type === ORDER_SELL &&
            order.resourceType === RESOURCE_LEMERGIUM &&
            order.roomName === room.name
        );

        if (L_existingSellOrder) {
            if (L_existingSellOrder.price !== L_sell_orders_lowest_price){
                Game.market.changeOrderPrice(L_existingSellOrder.id, L_sell_orders_lowest_price);
            }
            if (L_existingSellOrder.remainingAmount < room.terminal.store["L"]) {
                Game.market.extendOrder(L_existingSellOrder.id, room.terminal.store["L"] - L_existingSellOrder.remainingAmount);
            }
        } else {
            // Create a new sell order
            const result = Game.market.createOrder({
                type: ORDER_SELL,
                resourceType: RESOURCE_LEMERGIUM,
                price: L_sell_orders_lowest_price,
                totalAmount: room.terminal.store["L"],
                roomName: room.name
            });

            if (result === OK) {
                console.log(`Created sell order in ${room.name} for ${room.terminal.store["L"]} L at ${L_sell_orders_lowest_price} credits.`);
            } else {
                console.log(`Failed to create sell L in ${room.name}: ${result}`);
            }
        }
        console.log(`${room.name} selling L`);
    }
    
}


function manageTerminals(roomName_array, resource_type) {
    let resourceAmounts = [];

    // Step 1: Gather resource amounts for each room with a terminal
    for (const roomName of roomName_array) {
        const room = Game.rooms[roomName];
        if (room && room.terminal) {
            const amount = room.terminal.store[resource_type] || 0;
            resourceAmounts.push({ roomName, amount });
        }
    }

    // If less than 2 rooms, there's no need to balance
    if (resourceAmounts.length < 2) {
        console.log('Not enough rooms with terminals to balance resources.');
        return;
    }

    // Step 2: Sort rooms by the amount of resource_type they have
    resourceAmounts.sort((a, b) => a.amount - b.amount);

    const lowestResourceRoom = resourceAmounts[0];
    const highestResourceRoom = resourceAmounts[resourceAmounts.length - 1];

    // Step 3: Calculate the difference and transfer amount
    const difference = highestResourceRoom.amount - lowestResourceRoom.amount;
    const transferAmount = Math.floor(difference / 2);

    if (transferAmount > 100) {
        const fromRoom = Game.rooms[highestResourceRoom.roomName];
        const toRoom = lowestResourceRoom.roomName;

        // Check if the terminal in the room with the most resources is ready to send
        if (fromRoom.terminal.cooldown === 0) {
            // Check if there is enough energy to make the transfer
            const energyRequired = Game.market.calcTransactionCost(transferAmount, fromRoom.name, toRoom);
            if (fromRoom.terminal.store[RESOURCE_ENERGY] >= energyRequired) {
                const result = fromRoom.terminal.send(resource_type, transferAmount, toRoom);
                if (result === OK) {
                    console.log(`Transferred ${transferAmount} ${resource_type} from ${highestResourceRoom.roomName} to ${toRoom}.`);
                } else {
                    console.log(`Failed to transfer ${resource_type} from ${highestResourceRoom.roomName} to ${toRoom}: ${result}`);
                }
            } else {
                console.log(`${highestResourceRoom.roomName} does not have enough energy for the transfer.`);
            }
        } else {
            console.log(`Terminal in ${highestResourceRoom.roomName} is on cooldown for ${fromRoom.terminal.cooldown} ticks.`);
        }
    } else {
        console.log(`The ${resource_type} is already balanced across the rooms.`);
    }
}

const find_resource = (room_array, observer) => {
    if (!observer) {
        console.log('Observer not found');
        return;
    }

    // Initialize tracking if not already set
    Memory.currentRoomIndex = Memory.currentRoomIndex || 0;

    const roomName = room_array[Memory.currentRoomIndex];
    const currentTick = Game.time;

    // Even tick: Observe room
    if (currentTick % 2 === 0) {
        // console.log(`Observing room: ${roomName}`);
        observer.observeRoom(roomName);
    }
    // Odd tick: Process room
    else {
        const scanRoom = Game.rooms[roomName];
        if (scanRoom) {
            // console.log(`Processing room: ${roomName}`);

            // Process Deposits and Power Banks
            processDeposits(scanRoom, roomName);
            processPowerBanks(scanRoom, roomName);

            // Move to the next room
            Memory.currentRoomIndex = (Memory.currentRoomIndex + 1) % room_array.length;
        } else {
            console.log(`Room ${roomName} is not visible yet.`);
        }
    }
};

// Functions for processing deposits and power banks
const processDeposits = (room, roomName) => {
    const deposits = room.find(FIND_DEPOSITS);
    Memory.deposits = Memory.deposits || {};
    
    // Update room memory with current deposits
    if (deposits.length > 0) {
        Memory.deposits[roomName] = Memory.deposits[roomName] || {};
        
        deposits.forEach(deposit => {
            // If deposit is not already in memory, add it
            if (!Memory.deposits[roomName][deposit.id]) {
                Memory.deposits[roomName][deposit.id] = {
                    id: deposit.id,
                    cooldown: deposit.cooldown,
                    pos: deposit.pos,
                    depositType: deposit.depositType,
                    ticksToDecay: deposit.ticksToDecay
                };
                if (!Game.flags[deposit.id]) {
                    room.createFlag(deposit.pos, deposit.id, COLOR_GREEN);
                    console.log(`Flag created for deposit in ${roomName}: ${deposit.id}`);
                }
            }
        });
    }

    // Cleanup flags and memory for expired deposits
    if (Memory.deposits[roomName]) {
        for (const depositId in Memory.deposits[roomName]) {
            const depositExists = Game.getObjectById(depositId);
            if (!depositExists) {
                if (Game.flags[depositId]) {
                    Game.flags[depositId].remove();
                    console.log(`Flag removed for expired deposit in ${roomName}: ${depositId}`);
                }
                delete Memory.deposits[roomName][depositId];
            }
        }

        // Remove empty room entries if no deposits left
        if (Object.keys(Memory.deposits[roomName]).length === 0) {
            delete Memory.deposits[roomName];
        }
    }
};

const processPowerBanks = (room, roomName) => {
    const powerBanks = room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_POWER_BANK
    });
    Memory.powerBanks = Memory.powerBanks || {};
    
    // Update room memory with current power banks
    if (powerBanks.length > 0) {
        Memory.powerBanks[roomName] = Memory.powerBanks[roomName] || {};
        
        powerBanks.forEach(pb => {
            // If power bank is not already in memory, add it
            if (!Memory.powerBanks[roomName][pb.id]) {
                Memory.powerBanks[roomName][pb.id] = {
                    id: pb.id,
                    hits: pb.hits,
                    pos: pb.pos,
                    power: pb.power,
                    ticksToDecay: pb.ticksToDecay
                };
                if (!Game.flags[pb.id]) {
                    room.createFlag(pb.pos, pb.id, COLOR_RED);
                    console.log(`Flag created for power bank in ${roomName}: ${pb.id}`);
                }
            }
        });
    }

    // Cleanup flags and memory for expired power banks
    if (Memory.powerBanks[roomName]) {
        for (const pbId in Memory.powerBanks[roomName]) {
            const pbExists = Game.getObjectById(pbId);
            if (!pbExists) {
                if (Game.flags[pbId]) {
                    Game.flags[pbId].remove();
                    console.log(`Flag removed for expired power bank in ${roomName}: ${pbId}`);
                }
                delete Memory.powerBanks[roomName][pbId];
            }
        }
    
        // Remove empty room entries
        if (Object.keys(Memory.powerBanks[roomName]).length === 0) {
            delete Memory.powerBanks[roomName];
        }
    }
};


function go_get(creep,moving_target,resource_type) {
    if (!moving_target || !resource_type) {
        return ERR_INVALID_ARGS;
    }
    creep.moveTo(moving_target)
    creep.withdraw(moving_target,resource_type)
}

function go_put(creep,moving_target,resource_type) {
    if (!moving_target || !resource_type) {
        return ERR_INVALID_ARGS;
    }
    creep.moveTo(moving_target)
    creep.transfer(moving_target,resource_type)
}

function get_creep_attributes(creep) {
    const attributes = {
        id: creep.id,
        owner: creep.owner.username,
        ticksToLive: creep.ticksToLive,
        position: creep.pos,
        attackPower: 0,
        rangedAttackPower: 0,
        healPower: 0,
        toughReduction: 0,
        movePower: 0
    };

    // Function to calculate power with boosts
    function calculatePower(type, basePower) {
        return creep.body
            .filter(part => part.type === type)
            .reduce((total, part) => {
                // const boost = part.boost ? BOOSTS[type][part.boost]?.[type] : 1; // Default boost is 1 (unboosted)
                const boost = part.boost && BOOSTS[type][part.boost] && BOOSTS[type][part.boost][type] ? BOOSTS[type][part.boost][type] : 1;
                return total + basePower * (boost || 1); // Ensure a fallback in case the boost is undefined
            }, 0);
    }

    // Calculate powers based on body parts
    attributes.attackPower = calculatePower(ATTACK, 30); // Base ATTACK damage: 30
    attributes.rangedAttackPower = calculatePower(RANGED_ATTACK, 10); // Base RANGED_ATTACK damage: 10
    attributes.healPower = calculatePower(HEAL, 12); // Base HEAL power: 12
    attributes.toughReduction = calculatePower(TOUGH, 1); // TOUGH reduces damage; apply custom logic if needed
    attributes.movePower = calculatePower(MOVE, 1); // MOVE doesn't multiply power, but boosts affect fatigue reduction

    return attributes;
}


module.exports = {
    get_bodypart,
    calculate_creep_cost,
    spawn_mycreep,
    create_market_order,
    manageTerminals,
    find_resource,
    go_get,
    go_put,
    get_creep_attributes
};
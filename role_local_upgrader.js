const role_local_upgrader = {
    run: function(creep) {
        // the storage must adjacent to room_spawn[0], that's a spawn*3+link*3 rebuild 15000*3+5000*3 cost lesson
        // creep.signController(creep.room.controller ,"💗️MAKE_LOVE_NOT_WAR🕊️[感谢大猫]");
        // creep.signController(creep.room.controller,"感谢大猫 -joe95(noob瞎玩)")

        const upgrader_pos = {
            "W15N59": new RoomPosition(42, 27, "W15N59"),
            "W15N58": new RoomPosition(27, 40, "W15N58"),
            "W15N53": new RoomPosition(42, 7, "W15N53"),
            "W14N53": new RoomPosition(33, 41, "W14N53"),
            "W7N53": new RoomPosition(24, 6, "W7N53"),
        };
        
        if ( creep.memory.dontPullMe !== true){
            creep.memory.dontPullMe = true
        }
        
        if ( creep.room.controller.level !== 8 && 
            creep.room.lab[1] && 
            creep.room.lab[1].store["XGH2O"] >= 1200 &&
            creep.memory.labsreached !== true && 
            creep.ticksToLive > 1000 
            ){
            creep.memory.moving_target = creep.room.lab[1]
            if (creep.room.lab[1].pos.isNearTo(creep) && creep.body[0].boost == undefined ){
                creep.room.lab[1].boostCreep(creep);
            } else if (creep.body[0].boost !== undefined){
                creep.memory.labsreached = true
            }
        } else if ( creep.memory.inposition !== true ){
            const target = upgrader_pos[creep.room.name]
            if ( creep.room.storage ){
                if ( creep.pos.isNearTo(target) && creep.pos.isNearTo(creep.room.storage) ){
                    const result = creep.upgradeController(creep.room.controller);
                    if ( result == OK){
                        creep.memory.inposition = true;
                    }
                } else if ( creep.pos.isNearTo(target) && !creep.pos.isNearTo(creep.room.storage) ){
                    creep.memory.moving_target = creep.room.storage;
                } else if ( !creep.pos.isNearTo(target) ){
                    creep.memory.moving_target = target;
                }
            } else if ( !creep.room.storage ){
                if ( !creep.pos.isNearTo(target) ){
                    creep.memory.moving_target = target;
                } else {
                    const result = creep.upgradeController(creep.room.controller);
                    if ( result == OK){
                        creep.memory.inposition = true;
                    }
                }
            }
        }
        
        
        if (creep.room.storage && creep.store[RESOURCE_ENERGY] <= creep.store.getCapacity()/2){
            creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
        }
        
        if ( creep.room.controller.ticksToDowngrade > 199900 ){
            // if ( creep.room.controller.level !== 8 ){
            //     creep.upgradeController(creep.room.controller);
            // }
        } else {
            creep.upgradeController(creep.room.controller);
        }
            
        
    }
};
module.exports = role_local_upgrader;
                
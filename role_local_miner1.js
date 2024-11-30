const role_local_miner1 = {
    run: function(creep,the_source) {
    
        //const the_source = creep.room.source[1]
        const the_spawn = creep.room.spawn[2]
        const the_link = creep.room.link[2]
        // if (creep.room.name == "W7N53" && !creep.memory.the_container_id && creep.room.container.length > 1){
        //     creep.memory.the_container_id = creep.room.container.filter((i) => i.pos.isNearTo(the_source))[0].id
        // }
        // if (creep.memory.the_container_id){
        //     var the_container = Game.getObjectById(creep.memory.the_container_id);
        // }
        
        if (creep.memory.inposition !== true){
            if (the_link){
                if ( creep.pos.isNearTo(the_source) ){
                    if ( creep.pos.isNearTo(the_link) ){
                        creep.memory.moving_target = undefined
                        creep.memory.inposition = true
                    } else {
                        creep.memory.moving_target = the_link
                    }
                } else {
                    creep.memory.moving_target = the_source
                }
            // } else if (the_container){
            //     if ( creep.pos.isNearTo(the_container) && creep.pos !== the_container.pos){
            //         const dir = creep.pos.getDirectionTo(the_container);
            //         creep.move(dir);
            //     } else {
            //         creep.memory.moving_target = the_container
            //     }
            } else {
                if ( creep.pos.isNearTo(the_source) ){
                    creep.memory.moving_target = undefined
                    creep.memory.inposition = true
                } else {
                    creep.memory.moving_target = the_source
                }
            }
        }
        
        if ( the_source && the_source.energy > 0 ){
            creep.harvest(the_source);
        }
        
        if (creep.store.getUsedCapacity() >= creep.store.getCapacity()/2 ){
            if (the_spawn && the_spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                creep.transfer(the_spawn,RESOURCE_ENERGY)
            } else if (the_link){
                creep.transfer(the_link,RESOURCE_ENERGY)
            }
        }
        
        if ( creep.memory.dontPullMe !== true){
            creep.memory.dontPullMe = true
        }
        
    }
};
module.exports = role_local_miner1;
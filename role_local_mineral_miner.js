const role_local_mineral_miner = {
    run: function(creep) {

        if (creep.room.mineral.mineralAmount == 0){
            const the_spawn = Game.rooms[creep.memory.bornplace].spawn[0]
            creep.memory.moving_target = the_spawn
            the_spawn.recycleCreep(creep)
        } else {
            const room_mineral_containers = creep.room.container.filter((i) => i.pos.isNearTo(creep.room.mineral));
        
            if ( room_mineral_containers ){
                if ( !creep.pos.isNearTo(room_mineral_containers[0]) ){
                    creep.memory.moving_target = room_mineral_containers[0];
                } else if ( creep.pos.isNearTo(room_mineral_containers[0]) && creep.pos !== room_mineral_containers[0].pos ){
                    const dir = creep.pos.getDirectionTo(room_mineral_containers[0])
                    creep.move(dir);
                }
            } else {
                creep.memory.moving_target = creep.room.mineral;
            }
            creep.harvest(creep.room.mineral);
        }
            
    }
};
module.exports = role_local_mineral_miner;
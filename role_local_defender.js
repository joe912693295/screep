const role_local_defender = {
    run: function(creep) {

        const room_mineral_containers = creep.room.container.filter((i) => i.pos.isNearTo(creep.room.mineral));
        creep.memory.moving_target = undefined

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
};

module.exports = role_local_defender;
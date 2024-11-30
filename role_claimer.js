const role_claimer = {
    run: function(creep) {

        if ( creep.memory.step1reached !== true ){ creep.memory.moving_target = Game.flags['01']
        } else if ( creep.memory.step2reached !== true ){ creep.memory.moving_target = Game.flags['02']
        } else if ( creep.memory.step3reached !== true ){ creep.memory.moving_target = Game.flags['03']
        } else if ( creep.memory.step4reached !== true ){ creep.memory.moving_target = Game.flags['04']
        } else if ( creep.memory.step5reached !== true ){ creep.memory.moving_target = Game.flags['05']
        } else if ( creep.memory.step6reached !== true ){ creep.memory.moving_target = Game.flags['06']
        } else if ( creep.memory.step6reached == true){
            
            creep.memory.bornplace = creep.room.name;
            
            if ( creep.memory.role == 'role_newroom_starter' ){
                creep.memory.role = 'role_starter';
            }
            
            if( !creep.pos.isNearTo(creep.room.controller) ){
                creep.memory.moving_target = creep.room.controller ;
            } else if ( creep.pos.isNearTo(creep.room.controller) && creep.getActiveBodyparts(CLAIM) !== 0 ){
                if ( creep.room.controller.reservation ){
                    if ( creep.room.controller.reservation.username !== 'joe95'){
                        creep.attackController( creep.room.controller );
                    }
                } else {
                    creep.claimController( creep.room.controller );
                    creep.signController(creep.room.controller,"感谢大猫 -joe95(noob瞎玩)")
                }
            }
        }
        
        if ( creep.pos.isNearTo(Game.flags['01']) ){ creep.memory.step1reached = true
        } else if ( creep.pos.isNearTo(Game.flags['02']) ){ creep.memory.step2reached = true
        } else if ( creep.pos.isNearTo(Game.flags['03']) ){ creep.memory.step3reached = true
        } else if ( creep.pos.isNearTo(Game.flags['04']) ){ creep.memory.step4reached = true
        } else if ( creep.pos.isNearTo(Game.flags['05']) ){ creep.memory.step5reached = true
        } else if ( creep.pos.isNearTo(Game.flags['06']) ){ creep.memory.step6reached = true
        }
        if (creep.getActiveBodyparts(HEAL)){
            creep.heal(creep)
        }
    }
};
module.exports = role_claimer;
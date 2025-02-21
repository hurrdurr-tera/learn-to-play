
'use strict'

const JOB_ARCHER = 5;
const cooldowns = {};
var skillTimeouts = {};
//Archer skills
const S_ARROW = 11200; //cStartInstanceSkill
const S_ARROW_D = 420;

const S_ARROWVOLLEY = 20900; //cStartSkill
const S_ARROWVOLLEY_2 = 20910;
const S_ARROWVOLLEY_D = 1200;

const S_RADIANT = 31100; //cPressSkill
const S_RADIANT_D = 520; //570;
const S_RADIANT_1 = 31110;
const S_RADIANT_2 = 31111;
const S_RADIANT_3 = 31112;
const S_RADIANT_4 = 31113; //cStartInstanceSkill
const S_RADIANT_D2 = 1730;

const S_PENARROW = 41200;
const S_PENARROW_D = 730; //800;
const S_PENARROW_1 = 41210;
const S_PENARROW_2 = 41211;
const S_PENARROW_3 = 41212;
const S_PENARROW_4 = 41213; //cStartInstanceSkill / ArrowVolley Blaze Pen / Stun Trap Blaze Pen
const S_PENARROW_D2 = 1300;
const RAPACANCEL = 300; //Auto Seq Fire cancel timing at base aspd.

const S_ARROWRAIN = 51000; //cStartSkill / Self Speed buff
const S_ARROWRAIN_D = 3150;

const S_BACKSTEP = 60100; //cStartSkill
const S_BACKSTEP_D = 650;

const S_RAPIDFIRE = 80601; //cStartComboInstantSkill
const S_RAPIDFIRE_D = 425;
const S_RAPIDFIRE2 = 80602;
const S_RAPIDFIRE_D2 = 600;
const S_RAPIDFIRE3 = 80603;
const S_RAPIDFIRE_D3 = 700;
const S_RAPIDFIRE4 = 80604;
const S_RAPIDFIRE_D4 = 700;
const S_RAPIDFIRE5 = 80605;
const S_RAPIDFIRE_D5 = 700;
const S_RAPIDFIRE6 = 80606;
const S_RAPIDFIRE_D6 = 700;
const S_RAPIDFIRE7 = 80607;
const S_RAPIDFIRE_D7 = 1235;

const S_RAPIDFIRE_B = 80611;
const S_RAPIDFIRE_B_D = 425;
const S_RAPIDFIRE_B2 = 80612;
const S_RAPIDFIRE_B2_D = 520;
const S_RAPIDFIRE_B3 = 80613;
const S_RAPIDFIRE_B3_D = 520;
const S_RAPIDFIRE_B4 = 80614;
const S_RAPIDFIRE_B4_D = 800;

const S_SLOWTRAP = 90700; //cStartSkill
const S_SLOWTRAP_D = 1130;

const S_STUNTRAP = 100400; //cStartSkill / ArrowVolley Blaze Trap
const S_STUNTRAP_D = 1145;

const S_VELIK = 120300; //cStartInstanceSkill
const S_VELIK_D = 200; //995;

const S_INCINTRAP = 150700; //cStartSkill
const S_INCINTRAP_D = 1130;

const S_BREAKAWAY = 160600; //cStartSkill
const S_BREAKAWAY_D = 1310;

const S_WEB = 170300; //cStartInstanceSkill
const S_WEB_D = 515;

const S_KICK = 180400; //cStartSkill
const S_KICK_D = 215; //295;
const S_KICK_2 = 180401;
const S_KICK_D2 = 865; //1180;

const S_POISON = 190800; //cStartInstanceSkill
const S_POISON_D = 1110;

const S_RESTRAIN = 200200; //cStartInstanceSkill
const S_RESTRAIN_D = 510;

const S_SEQFIRE = 221100; //cStartInstanceSkill
const S_SEQFIRE_D = 420;

const S_STUNRTRAP = 230200; //cStartSkill
const S_STUNRTRAP_D = 1410;

const S_SNARE_T = 240201;
const S_SNARE_T_D = 1470;

const S_INCINRTRAP = 251000;
const S_INCINRTRAP_D = 1160;

const S_THUNDER = 290900; //cStartSkill / speed glyph
const S_THUNDER_D = 3740;

const S_FINDWEAK = 320300; //cStartSkill
const S_FINDWEAK_D = 200; //1300;

const SKILL_CHARGING = 330100;
const SKILL_CHARGING_DISTANCE = 494;
const SKILL_CHARGING_DURATION = 990;

const S_TENA = 310100;
const S_TENA_D1 = 500;
const S_TENA_D2 = 700;

const S_RETAL = 141000;
const S_RETAL_D = 1570;

const FOCUS_BUFF = 601450;
const SEQFIREID = 600200;
const ARROWRAINLOCK = 1100; //120 aspd value
const ARROWRAINLOCK2 = 4150; //120 aspd value
const S_SNIPEREYE = 210200;

const S_DEATH = 70300;

const Breeze_Steriod = 350100;
const Breeze_Steriod_D = 200;

const TEMPEST_TRASH_ARROW = 360100;
const TEMPEST_TRASH_ARROW_D = 2275;
const TEMPEST_TRASH_ARROW_R = 360213;
const TEMPEST_TRASH_ARROW_R_D = 900;

const GALE1 = 340100;
const GALE2 = 340110;
const GALE3 = 340120;
const GALE4 = 340130;
const GALE5 = 340140;
const GALE6 = 340150;
const GALE7 = 340160;
const GALE8 = 340170;
const GALE9 = 340180;
const GALE_D = 660;

//LANCER
const SHIELDB_1 = 181100;
const SHIELD_BARRAGE = 181101;
const DEBILITATE_1 = 100300;
const DEBILITATE = 100330;
const SHIELD_COUNTER = 81100;
const LOCK_DOWN_BLOW = 210401;
const WALLOP = 251030;
const SHIELD_BASH = 50101;
const SPRING_ATTACK = 131130;

module.exports = function archer(mod) {

    let config = {};
    let settingTimeout = null;
    let settingLock = false;
    let enabled = false;
    const path = require('path');
    const fs = require('fs');
    const exec = require('child_process').exec


    try { config = require('./config.json'); }
    catch (e) {
        printChat("Config error!");
    }



    if (("ENABLED" in config)) {
        enabled = config.ENABLED;
        if (enabled) {
            printChat("Retarded mode activated!");
        } else {
            printChat("Retarded mode deactivated!");
        }
    }

    let SEQFIREKEY = 6;
    if (("SEQFIREKEY" in config)) {
        SEQFIREKEY = config.SEQFIREKEY;
    }

    let WWKEY = "{f9}";
    if (("WWKEY" in config)) {
        WWKEY = config.WWKEY;
    }
    let SUPERLEAPKEY = "`";
    if (("SUPERLEAPKEY" in config)) {
        SUPERLEAPKEY = config.SUPERLEAPKEY;
    }

    let WALLOPKEY = 3;
    if (("WALLOPKEY" in config)) {
        WALLOPKEY = config.WALLOPKEY;
    }

    let SPRINGATTACKKEY = "z";
    if (("WALLOPKEY" in config)) {
        SPRINGATTACKKEY = config.SPRINGATTACKKEY;
    }

    let DEBILITATEKEY = "q";
    if (("WALLOPKEY" in config)) {
        DEBILITATEKEY = config.DEBILITATEKEY;
    }

    let ONSLAUGHTKEY = 2;
    if (("WALLOPKEY" in config)) {
        ONSLAUGHTKEY = config.ONSLAUGHTKEY;
    }

    let SHIELDBASHKEY = 2;
    if (("WALLOPKEY" in config)) {
        SHIELDBASHKEY = config.SHIELDBASHKEY;
    }
    
    mod.command.add('l2p', () => {
        enabled = !enabled;
        if (enabled) {
            printChat("Retarded mode activated!");
        } else {
            printChat("Retarded mode deactivated!");
        }
    })

    function pressKey(key) {
        //printChat("PressKeyStarted " + key);
        try {
            exec('"%programfiles%/AutoHotkey/AutoHotkey.exe" "%programfiles%/AutoHotkey/SendKey.ahk" ' + key);
        } catch (e) {
            printChat("Error AutoHotKey");
        }
    }

    function addCooldown(variableName, value) {
        cooldowns[variableName + "_cd"] = value;
        //printChat("added: " + variableName);
    }

    function hasCooldown(variableName) {
        if (typeof (cooldowns[variableName + "_cd"]) != "undefined") {
            //printChat("esiste: " + cooldowns[variableName + "_cd"]);
            return cooldowns[variableName + "_cd"];
        } else {
            //printChat("non esiste");
            return false;
        }

    }
    function existsInObject(obj, variableName) {
        //return variableName in obj;
        // Alternativa con hasOwnProperty:
        return obj.hasOwnProperty(variableName);
    }

    /*var arc;
    mod.command.add('arcreload', () => {
        mod.command.message("arc reloaded")
        arc = reloadModule('./arc.js')
    })
    var hooks = [];
    function reloadModule(modulePath) {
        try {
            // Cancella la cache del modulo
            delete require.cache[require.resolve(modulePath)];
        	
            // Ricarica il modulo
            var reloadedModule = require(modulePath)(mod, hooks);
            mod.command.message("Modulo ${modulePath} ricaricato con successo!");
            return reloadedModule;
        } catch (error) {
            mod.command.message("Errore durante la ricarica del modulo = "+ error);
            return null;
        }
    }	
	
    arc = reloadModule('./arc.js');*/

    mod.hook('C_PRESS_SKILL', 4, (event) => {
        if (isMe(event)) { }
        //mod.command.message("C_PRESS_SKILL");
    });


    mod.hook('C_START_SKILL', 7, (event) => {
        //mod.command.message("C_START_SKILL");
    });


    mod.hook('S_ACTION_STAGE', 9, (event) => {
        if (isMe(event)) {
            //mod.command.message("S_ACTION_STAGE: " + event.skill.id);
            //printSkillId(event);
            onArcerStage(event);
            onLancerStage(event);
        }
    });

    mod.hook('S_ACTION_END', 5, (event) => {
        if (isMe(event)) {
            //printChat("S_ACTION_END: " + event.skill.id);
            //printSkillId(event);
            onLancerEnd(event);
        }

    });

    mod.hook('S_START_COOLTIME_SKILL', 3, (event) => {
        //printChat("S_START_COOLTIME_SKILL: " + event.skill.id);
        //printSkillId(event);
        onArcerCd(event);
        onLancerCd(event);
    });

    function isArcher(event) {
        if (mod.game.me.class == 'archer' && enabled) return true;
        return false
    }

    function isLancer(event) {
        if (mod.game.me.class == 'lancer' && enabled) return true;
        return false;
    }

    function isMe(event) {
        if (event.gameId == mod.game.me.gameId) return true;
        return false;
    }

    function printObj(obj) {
        mod.command.message("Debug:" + JSON.stringify(obj, (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value, 2
        ));
    }

    function printChat(message) {
        mod.command.message(message);
    }

    function printSkillId(obj) {
        mod.command.message("SkillId: " + obj.skill.id);
    }

    function onArcerStage(event) {
        if (isArcher(event) && [S_RADIANT_4].includes(event.skill.id)) {
            pressKey(SEQFIREKEY);
        }
        if (isArcher(event) && [S_PENARROW_4].includes(event.skill.id)) {
            pressKey(SEQFIREKEY);
        }
        if (isArcher(event) && [S_RAPIDFIRE7, S_RAPIDFIRE_B4].includes(event.skill.id)) {
            delayedPressSkill(WWKEY, 50);
        }
    }
    function onArcerCd(event) {
        if (isArcher(event) && [S_THUNDER].includes(event.skill.id)) {
            pressKey(SEQFIREKEY);
        }
        if (isArcher(event) && [TEMPEST_TRASH_ARROW_R].includes(event.skill.id)) {
            delayedPressSkill(WWKEY, 200);
        }
    }
    function onLancerStage(event) {
        if (isLancer(event) && [SHIELD_BARRAGE].includes(event.skill.id)) {
            if (hasCooldown(DEBILITATE)) {
                //printChat("debilitate in cd!!!");
                if (hasCooldown(SPRING_ATTACK) && !hasCooldown(SHIELD_BASH)) {
                    pressKey(SHIELDBASHKEY);
                } else {
                    pressKey(SPRINGATTACKKEY);
                    delayedPressSkill(SPRINGATTACKKEY, 100);
                }

            } else {

                pressKey(DEBILITATEKEY);
                delayedPressSkill(DEBILITATEKEY, 100);
            }
        }
        if (isLancer(event) && [LOCK_DOWN_BLOW].includes(event.skill.id)) {
            pressKey(SPRINGATTACKKEY);
            delayedPressSkill(SPRINGATTACKKEY, 100);
        }
        if (isLancer(event) && [SHIELD_BASH].includes(event.skill.id)) {
            pressKey(ONSLAUGHTKEY);
        }
    }
    function onLancerCd(event) {
        if (isLancer(event) && [DEBILITATE, SHIELD_COUNTER, LOCK_DOWN_BLOW].includes(event.skill.id)) {
            pressKey(SPRINGATTACKKEY);
            delayedPressSkill(SPRINGATTACKKEY, 100);
            if (isLancer(event) && [SHIELD_COUNTER].includes(event.skill.id)) {
                if (hasCooldown(SPRING_ATTACK)) {
                    delayedPressSkill(SHIELDBASHKEY, 200);
                }
                delayedPressSkill(SPRINGATTACKKEY, 200);
            }
        }
        if (isLancer(event) && [WALLOP].includes(event.skill.id)) {
            pressKey(SUPERLEAPKEY);
        }
        if (isLancer(event) && [SHIELD_BASH].includes(event.skill.id)) {
            pressKey(ONSLAUGHTKEY);
        }
    }
    function onLancerEnd(event) {
        if (isLancer(event) && [SHIELD_BASH].includes(event.skill.id)) {
            pressKey(ONSLAUGHTKEY);
        }
        if (isLancer(event) && [LOCK_DOWN_BLOW].includes(event.skill.id)) {
            pressKey(SPRINGATTACKKEY);
        }
        if (isLancer(event) && [SHIELD_COUNTER].includes(event.skill.id)) {
            pressKey(SHIELDBASHKEY);
        }
    }


    mod.hook('S_START_COOLTIME_SKILL', 3, { order: 1000, filter: { fake: false } }, event => {
        if (enabled && isMe(event)) return
        function startCooldown(skillId) {
            if (skillTimeouts[skillId]) {
                clearTimeout(skillTimeouts[skillId]);
            }
            setCooldown(skillId, true);
            skillTimeouts[skillId] = setTimeout(() => {
                setCooldown(skillId, false);
                delete skillTimeouts[skillId];
            }, event.cooldown);
        }
        startCooldown(event.skill.id);
    });

    mod.hook('S_DECREASE_COOLTIME_SKILL', 3, { order: 1000, filter: { fake: false } }, event => {
        if (enabled && isMe(event)) return

        function decreaseCooldown(skillId) {
            if (skillTimeouts[skillId]) {
                clearTimeout(skillTimeouts[skillId]);
            }
            setCooldown(skillId, true);
            skillTimeouts[skillId] = setTimeout(() => {
                setCooldown(skillId, false);
                delete skillTimeouts[skillId];
            }, event.cooldown);
        }
        decreaseCooldown(event.skill.id);
    });

    function setCooldown(skillId, isOnCooldown) {
        switch (skillId) {
            case DEBILITATE: addCooldown(DEBILITATE, isOnCooldown); break;
            case SPRING_ATTACK: addCooldown(SPRING_ATTACK, isOnCooldown); break;
            case SHIELD_BASH: addCooldown(SHIELD_BASH, isOnCooldown); break;
        }
    }
    function delayedPressSkill(button, daly) {
        setTimeout(() => {
            pressKey(button);
        }, daly);
    }
}



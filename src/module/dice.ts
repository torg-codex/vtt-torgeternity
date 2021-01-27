export class BonusDie extends Die {
    constructor(termData) {
        super({number: termData.number, faces: 6, modifiers: termData.modifiers, options: termData.options});
    }

    static DENOMINATION = "b";
    static MODIFIERS = {};

    roll({minimize=false, maximize=false}={}) {
        let roll = super.roll({minimize, maximize});
        if(roll['result'] === 6) {
            roll['exploded'] = true;
            roll['result'] = roll['result'] - 1;
            this.roll();
        }
        return roll;
    }
}

export class TorgDie extends Die {
    constructor(termData) {
        super({number: termData.number, faces: 20, modifiers: termData.modifiers, options: termData.options});
    }

    static DENOMINATION = "t";
    static MODIFIERS = {};

    roll({minimize=false, maximize=false}={}) {
        let roll = super.roll({minimize, maximize});
        if(roll['result'] === 10 || roll['result'] === 20) {
            roll['exploded'] = true;
            this.roll();
        }
        return roll;
    }

    get total() {
        return torgTable(super.total);
    }
}

export class TorgDieUntrained extends Die {
    constructor(termData) {
        super({number: termData.number, faces: 20, modifiers: termData.modifiers, options: termData.options});
    }

    static DENOMINATION = "tu";
    static MODIFIERS = {};

    roll({minimize=false, maximize=false}={}) {
        let roll = super.roll({minimize, maximize});
        if(roll['result'] === 10) {
            roll['exploded'] = true;
            this.roll();
        }
        return roll;
    }

    get total() {
        return torgTable(super.total);
    }
}

export class TorgDieUp extends Die {
    constructor(termData) {
        super({number: termData.number, faces: 20, modifiers: termData.modifiers, options: termData.options});
    }

    static DENOMINATION = "e";
    static MODIFIERS = {};

    roll({minimize=false, maximize=false}={}) {
        this.modifiers.forEach(m=>{
            if(m.startsWith("p")) {
                let prev = {result: parseInt(m.substring(1)), active: true};
                this.results.push(prev);
            }
        });
        let firstRoll = this.rollSecond({minimize, maximize});
        if(firstRoll['result'] < 10 && this.modifiers.includes('l10')) {
            firstRoll['result'] = 10;
        }
        return firstRoll;
    }

    rollSecond({minimize=false, maximize=false}={}) {
        let roll = super.roll({minimize, maximize});
        if(roll['result'] === 10 || roll['result'] === 20) {
            roll['exploded'] = true;
            this.rollSecond();
        }
        return roll;
    }

    get total() {
        return torgTable(super.total);
    }

    static addTo(e:any, prevRoll:any, atLeast10:boolean) {
        let rollElem = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        let fullRoll = rollElem.getElementsByClassName("dice-formula")[0].textContent;
        let rolled = "";
        for (let roll of prevRoll.rolls) {
            rolled += "p"+parseInt(roll.result);
        }
        fullRoll = fullRoll.replace(/\d+d(tu?|e(l10)?)(p\d+)*/g, '1de'+(atLeast10?'l10':'')+rolled);
        new Roll(fullRoll).toMessage();
    }
}

function torgTable(roll:number) {
    if(roll === 1)
        return -10;
    if(roll === 2)
        return -8;
    if(roll <= 4)
        return -6;
    if(roll <= 6)
        return -4;
    if(roll <= 8)
        return -2;
    if(roll <= 10)
        return -1;
    if(roll <= 12)
        return 0;
    if(roll <= 14)
        return 1;
    if(roll <= 20)
        return roll-13;
    
    return 3+Math.ceil(roll/5);
}
export default class TorgEternityCharacterSheet extends ActorSheet {
    get template() {
        return `systems/torgeternity/templates/sheets/character-sheet.hbs`
    }

    getData() {
        const data = super.getData();
        const torgData:any = data.data;
        const skills = torgData.skills;
        const attributes = torgData.attributes;
        //RollTableDirectory.collection.forEa

        Object.keys(skills).forEach(function(key){
            const attr = skills[key]["basedOn"]
            const baseAttributeValue = attributes[attr].value;
            skills[key].attribute = baseAttributeValue;
            skills[key].value = skills[key].adds + baseAttributeValue;
        });

        if(torgData.notes === null)
            torgData.notes = "";

        torgData.calc = {
            run: 3*torgData.attributes.dexterity.value
        }
        
        return data;
    }

    activateListeners(html: JQuery): void {
        html.find(".roll").on("click", this._roll.bind(this));
        super.activateListeners(html);
    }

    _roll(e): void {
        e.preventDefault();
        let act = this.actor.data;
        let val = this._resolvePath(e.currentTarget.dataset.rolltarget);
        
        let roll = "1dt";
        if(val.adds === 0)
            roll+="u";
        roll+=" + @bonus";
        let wounds = this.actor.data.data["wounds"];
        let penalty = Math.max(Math.min(wounds.max - wounds.value, 3), 0);
        if(penalty > 0)
            roll+=" - @wounds";


        new Roll(roll, {bonus:val.value, wounds: penalty})
            .toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor: game.i18n.localize(val.label)
            });
            
                //{speaker: mergeObject(ChatMessage.getSpeaker(), {actor: this.actor._id})});
                /*speaker: {
                  scene: canvas.scene._id,
                  actor: c.actor ? c.actor._id : null,
                  token: c.token._id,
                  alias: c.token.name
                },});*/
    }

    _resolvePath(path:string): any {
        return path.split('.')
            .reduce((o, p) => o ? o[p] : null, this.getData().data);
    }
}
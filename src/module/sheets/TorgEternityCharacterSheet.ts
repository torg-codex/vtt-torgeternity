export default class TorgEternityCharacterSheet extends ActorSheet {
    get template() {
        return `systems/torgeternity/templates/sheets/character-sheet.html`
    }

    getData() {
        const data = super.getData();
        const skills = data.data["skills"];
        const attributes = data.data["attributes"];
        //RollTableDirectory.collection.forEa

        Object.keys(skills).forEach(function(key){
            const attr = skills[key]["basedOn"]
            const baseAttributeValue = attributes[attr].value;
            skills[key].attribute = baseAttributeValue;
            skills[key].value = skills[key].adds + baseAttributeValue;
        });
        return data;
    }
}
export default class TorgEternityCharacterSheet extends ActorSheet {
    get template() {
        return `systems/torgeternity/templates/sheets/character-sheet.html`
    }

    getData() {
        const data = super.getData();
        const skills = data.data["skills"];
        const attributes = data.data["attributes"];

        Object.keys(skills).forEach(function(key){
            const attr = skills[key]["basedOn"]
            const baseAttributeValue = attributes[attr].value;
            skills[key]["value"] = skills[key]["adds"] + baseAttributeValue;
        });

        // we cant chang ethe datamodel right now....

        const combatSkills = ["energyWeapons", "fireCombat", "meleeWeapons", "missileWeapons", "unarmedCombat", "heavyWeapons"]

        data.data["combatSkills"] = {};
        combatSkills.forEach((skillName) => {data.data["combatSkills"][skillName] = skills[skillName]} );
        
        const interactionSkills = ["intimidation", "maneuver", "taunt", "trick"]

        data.data["interactionSkills"] = {};
        interactionSkills.forEach((skillName) => {data.data["interactionSkills"][skillName] = skills[skillName]} );

        
        const defenseSkills = ["dodge", "meleeWeapons", "unarmedCombat", "willpower"]
        data.data["defenseSkills"] = {};
        interactionSkills.forEach((skillName) => {data.data["defenseSkills"][skillName] = skills[skillName]});
        
        const otherSkills = Object.keys(skills).filter(skill => !interactionSkills.includes(skill) && !combatSkills.includes(skill))

        data.data["otherSkills"] = {};
        otherSkills.forEach((skillName) => {data.data["otherSkills"][skillName] = skills[skillName]} );
        return data;
    }
}
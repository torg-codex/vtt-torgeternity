import TorgCharacterSheet from "./module/sheets/TorgCharacterSheet.js";

Hooks.once("init", function() {
    console.log("initializing torgeternity systems");
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("torgeternity", TorgCharacterSheet, {makeDefault: true});
});
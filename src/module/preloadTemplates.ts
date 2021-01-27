export const preloadTemplates = async function() {
	const templatePaths = [
		"systems/torgeternity/templates/sheets/character-sheet-skill.hbs",
		"systems/torgeternity/templates/roll.hbs"
	];

	return loadTemplates(templatePaths);
}

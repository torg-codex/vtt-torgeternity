export const preloadTemplates = async function() {
	const templatePaths = [
		"systems/torgeternity/templates/sheets/character-sheet-skill.hbs"
	];

	return loadTemplates(templatePaths);
}

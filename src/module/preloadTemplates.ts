export const preloadTemplates = async function() {
	const templatePaths = [
		"systems/torgeternity/templates/partials/StatblockPartial.hbs",
		"systems/torgeternity/templates/partials/StatblockPartialVertical.hbs"
		// Add paths to "systems/vtt-torgeternity/templates"
	];

	return loadTemplates(templatePaths);
}

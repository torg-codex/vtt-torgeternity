export const preloadTemplates = async function() {
	const templatePaths = [
		"systems/torgeternity/templates/partials/StatblockPartial.html",
		"systems/torgeternity/templates/partials/StatblockPartialVertical.html"
		// Add paths to "systems/vtt-torgeternity/templates"
	];

	return loadTemplates(templatePaths);
}

/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your system, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your system
 */

// Import TypeScript modules
import { registerSettings } from './module/settings';
import { preloadTemplates } from './module/preloadTemplates';
import TorgEternityCharacterSheet from './module/sheets/TorgEternityCharacterSheet'

/* ------------------------------------ */
/* Initialize system					*/
/* ------------------------------------ */
Hooks.once('init', async function() {
	console.log('vtt-torgeternity | Initializing vtt-torgeternity');

	// Assign custom classes and constants here
	
	// Register custom system settings
	registerSettings();
	
	// Preload Handlebars templates
	await preloadTemplates();

	// Register custom sheets (if any)

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("torgeternity", TorgEternityCharacterSheet, {makeDefault: true});
});

/* ------------------------------------ */
/* Setup system							*/
/* ------------------------------------ */
Hooks.once('setup', function() {
	// Do anything after initialization but before
	// ready
});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', function() {
	// Do anything once the system is ready
});

// Add any additional hooks if necessary

/**
 * Activate certain behaviors on Canvas Initialization hook (thanks for MooMan for this snippet)
 */
Hooks.on('canvasInit', async () => {
	/**
	 * Double every other diagonal movement
	 */
	// @ts-ignore
	SquareGrid.prototype.measureDistances = function measureDistances(segments, options) {
		//if ( !options.gridSpaces ) return BaseGrid.prototype.measureDistances.call(this, segments, options);
  
		// Track the total number of diagonals
		const d = canvas.dimensions;
	
		// Iterate over measured segments
		return segments.map(s => {
			const r = s.ray;

			// Determine the total distance traveled
			const nx = Math.abs(Math.ceil(r.dx / d.size));
			const ny = Math.abs(Math.ceil(r.dy / d.size));

			// Determine the number of straight and diagonal moves
			const nd = Math.min(nx, ny);
			const ns = Math.abs(ny - nx);

			return (ns + nd*1.5) * canvas.dimensions.distance;
		});
	};
});
  
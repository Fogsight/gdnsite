"use strict";

const config = require("../config.json");
const db = require("../helpers/db");
const common = require("../helpers/common");

/**
* GET '/'
* @returns {view} index.hbs - Returns user to the homepage
*/
module.exports.index = function* index() {
	let user = null;
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	yield this.render("index", {
		title: config.site.name,
		user: user
	});
};

/**
* GET '/success'
* @returns {view} success.hbs - Returns user to the success page
*/
module.exports.success = function* success() {
	let user = null;
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	yield this.render("success", {
		title: config.site.name,
		user: user
	});
};

/**
* GET '/join'
* @returns {link} gdn discord
*/
module.exports.join = function join() {
	this.redirect("https://discord.gg/sWsrrJQ");
};

/**
* GET '/'
* @returns {link} icth.io gamejam page
*/
module.exports.jam = function jam() {
	let user = null;
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	this.redirect("https://itch.io/jam/game-dev-network-cherry-jam");
};

// Not really implemented yet

module.exports.gamejam = function* gamejam() {
	let user = null;
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	yield this.render("gamejam", {
		title: config.site.name,
		user: user
	});
};

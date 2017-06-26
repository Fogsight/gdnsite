"use strict";
const db = require("../helpers/db");
const common = require("../helpers/common");

/**
* GET '/admin'
* @returns {view} admin/index.hbs - Returns user to the admin page
*/
module.exports.index = function* index() {
	let user = null;
	if (this.isUnauthenticated()) {
		this.redirect("/login");
	}
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	if (user.admin) {
		yield this.render("admin/index", {
			user: user
		});
	} else {
		throw new Error("Forbidden - You do not have sufficient priveldges!");
	}
};

/**
* GET '/admin/votes'
* @returns {view} admin/vote.hbs - Returns user to the admin vote page
*/
module.exports.votes = function* votes() {
	let user = null;
	if (this.isUnauthenticated()) {
		this.redirect("/login");
	}
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	if (user.admin) {
		let data = yield db.runView("themes/all", null, "themes");
		data = common.sortbyVotes(data.results);
		yield this.render("admin/vote", {
			user: user,
			themes: data
		});
	} else {
		throw new Error("Forbidden - You do not have sufficient priveldges!");
	}
};

/**
* GET '/votes/remove/:id'
* @param {string} id - the id of the theme to delete
* @returns {view} admin/votes.hbs - Returns user to the admin vote page
*/
module.exports.removeTheme = function* removeTheme() {
	let user = null;
	if (this.isUnauthenticated()) {
		this.redirect("/login");
	}
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	if (user.admin) {
		if (this.params.id === null) {
			throw new Error("Missing parameters!");
		}
		const document = yield db.removeDocument(this.params.id, "themes");
		if (document.error === true) {
			throw new Error(document.message);
		}
		this.redirect("/admin/votes");
	} else {
		throw new Error("Forbidden - You do not have sufficient priveldges!");
	}
};

/**
* GET '/admin/gamejam'
* @returns {view} admin/gamejam.hbs - Returns user to the admin gamejam
*/
module.exports.gamejam = function* gamejam() {
	let user = null;
	if (this.isUnauthenticated()) {
		this.redirect("/login");
	}
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	if (user.admin) {
		yield this.render("admin/gamejam", {
			user: user
		});
	} else {
		throw new Error("Forbidden - You do not have sufficient priveldges!");
	}
};

module.exports.editJam = function* editJam() {
	let user = null;
	if (this.isUnauthenticated()) {
		this.redirect("/login");
	}
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	if (user.admin) {
		if (this.params.id === null) {
			throw new Error("Missing parameters!");
		}
		
		

		this.redirect("/admin/gamejam");
	} else {
		throw new Error("Forbidden - You do not have sufficient priveldges!");
	}
}
"use strict";

const db = require("../helpers/db");
const common = require("../helpers/common");
const themeModel = require("../models/theme");
const config = require("../config.json");

/**
* GET '/vote'
* @returns {view} vote.hbs - Gives a view with all the themes to vote for
*/
module.exports.votePage = function* votePage() {
	let user = null;
	const data = yield db.runView("themes/all", null, "themes");
	let returnData = [];
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
		for (const item of data.results) {
			if (item.value.voters.indexOf(`${user.username}#${user.discriminator}`) === -1) {
				item.canVote = true;
			}
			returnData.push(item);
		}
	} else {
		returnData = data.results;
	}
	yield this.render("vote", {
		title: config.site.name,
		user: user,
		themes: returnData
	});
};

/**
* GET '/votes/:id'
* @param {string} id - id of the theme to apply vote to
* @returns {view} vote.hbs - Returns user back to the vote page with updated vote info
*/
module.exports.applyVote = function* applyVote() {
	let user = null;
	if (this.params.id === null) {
		throw new Error("Missing parameters!");
	}
	if (this.isAuthenticated()) {
		user = this.session.passport.user;
	}
	if (this.isUnauthenticated()) {
		this.redirect("/login");
	}
	let theme = yield db.getDocument(this.params.id, "themes");
	if (~theme.voters.indexOf(`${user.username}#${user.discriminator}`)) {
		theme = themeModel.removeVote(theme, `${user.username}#${user.discriminator}`);
		const result = yield db.saveDocument(theme, "themes");
		this.body = result;
		return this.redirect("/vote");
	}
	theme = themeModel.addVote(theme, `${user.username}#${user.discriminator}`);
	const result = yield db.saveDocument(theme, "themes");
	this.body = result;
	return this.redirect("/vote");
};

/**
* GET '/votes/:id'
* @param {string} name - name of the new theme
* @returns {view} success.hbs - Returns user to a view to tell them they are successful
*/
module.exports.themes = function* themes() {
	const params = this.request.body;
	if (this.isUnauthenticated()) {
		return this.redirect("/login");
	}
	if (!params.theme_name) {
		throw new Error("You must supply a theme name!");
	}
	const theme = themeModel.newTheme(params.theme_name);
	const result = yield db.saveDocument(theme, "themes");
	this.body = result;
	return this.redirect("/vote");
};

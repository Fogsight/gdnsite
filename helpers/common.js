"use strict";

const adminPermission = 267779265;

module.exports = {
	sortbyVotes: (themes) => {
		return themes.sort((a,b) => {
			return b.value.votes - a.value.votes;
		});
	},
	getPermissions: (user) => {
		for (const guild of user.guilds) {
			if (guild.name === "Game Dev Network" && (guild.permissions >= adminPermission
				|| guild.owner === true)) {
				user.admin = true;
			}
		}
		return user;
	}
};

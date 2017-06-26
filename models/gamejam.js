"use strict";

module.exports = {
	newJam: (data) => {
		const gamejam = {
			id: data.name,
			active: false,
			registering: false,
			voting: false,
			submissions: false,
			theme: data.theme,
			startDate: data.startDate,
			endDate: data.endDate,
			description: data.desc,
			winners: [],
			data: []
		};
		return gamejame;
	},
	changeTheme: (jam, theme) => {
		jam.theme = theme;
		return jam;
	},
	changeStart: (jam, start) => {
		jam.startDate = start;
		return jam;
	},
	changeEnd: (jam, end) => {
		jam.endDate = end;
		return jam;
	},
	changeDescription: (jam, desc) => {
		jam.description = desc;
		return jam;
	},
	changeData: (jam, data) => {
		jam.data = data;
		return jam;
	},
	toggleRegistering: (jam) => {
		jam.registering = !jam.registering;
		return jam;
	},
	toggleVoting: (jam) => {
		jam.voting = !jam.voting;
		return jam;
	},
	toggleSubmissions: (jam) => {
		jam.submissions = !jam.submissions;
		return jam;
	}
};

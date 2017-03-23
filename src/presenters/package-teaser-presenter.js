'use strict';

// const hyphenatePascalCase = require('../utils/hyphenate-pascal-case');
//
// const ONE_HOUR = 1000 * 60 * 60;
const MAX_RELATED_CONTENT = 3;
// const HEADSHOT_BASE_URL = 'https://www.ft.com/__origami/service/image/v2/images/raw/';
// const HEADSHOT_URL_PARAMETERS = '?source=next&fit=scale-down&compression=best&tint=054593,d6d5d3';
// const HEADSHOT_WIDTH = 75;
// const TEMPLATES_WITH_HEADSHOTS = ['light','standard','lifestyle'];
// const TEMPLATES_WITH_IMAGES = ['heavy', 'top-story-heavy','lifestyle'];
// const LIVEBLOG_MAPPING = {
// 	inprogress: {
// 		timestampStatus: 	'last post',
// 		labelModifier: 'live'
// 	},
// 	comingsoon: {
// 		timestampStatus: 'coming soon',
// 		labelModifier: 'pending'
// 	},
// 	closed: {
// 		timestampStatus: 'liveblog closed',
// 		labelModifier: 'closed'
// 	}
// };
//
// const brandAuthorDouble = (data) => {
// 	if (
// 		data.primaryBrandTag &&
// 		data.primaryBrandTag.taxonomy === 'brand' &&
// 		data.authorTags &&
// 		data.authorTags.length &&
// 		data.isOpinion === true
// 	) {
// 		return true;
// 	}
// 		return false;
// };
//
// const modsDoesNotInclude = (modToTest, modsArray) => {
// 	if (!modsArray) return true;
// 	return modsArray.indexOf(modToTest) === -1;
// };

const TeaserPresenter = class TeaserPresenter {

	constructor (data) {
		this.data = data || {};
	}

	// returns all top level class names appropriate for the teaser
	get classModifiers () {
		const theme = this.data.design.theme;
		const mods = this.data.mods || [];
		// if (
		// 	!this.data.noHeadshot &&
		// 	this.headshot &&
		// 	TEMPLATES_WITH_HEADSHOTS.some(template => template === this.data.template)
		// ) {
		// 	mods.push('has-headshot');
		// }
		if (this.data.size) mods.push(this.data.size);
		// if (
		// 	this.data.mainImage
		// 	// TEMPLATES_WITH_IMAGES.some(template => template === this.data.template)
		// ) {
		// 	mods.push('has-image');
		// }
		if (theme && (theme === 'extra-wide' || theme === 'extra')) {
			mods.push('extra');
		} else if (theme) {
			mods.push(theme);
		}
		// if (this.data.type) {
		// 	mods.push(hyphenatePascalCase(this.data.type));
		// }
		if (this.data.canBeSyndicated === 'yes') {
			mods.push('syndicatable');
		} else if(this.data.canBeSyndicated === 'no') {
			mods.push('not-syndicatable');
		}
		return mods;
	}

	//returns tag to be displayed
	get displayTag () {
		const theme = this.data.design.theme
		// // Use Primary Tag is Primary Brand Tag the same as stream
		// if (this.data.streamProperties &&
		// 	this.data.streamProperties.idV1 &&
		// 	this.data.primaryBrandTag &&
		// 	this.data.streamProperties.idV1 === this.data.primaryBrandTag.idV1) {
		// 	return this.data.primaryTag || null;
		// }
		// // Use Author Tag if Opinion & Branded unless same as stream
		// if (brandAuthorDouble(this.data) === true &&
		// 	(!this.data.streamProperties ||
		// 	(this.data.streamProperties &&
		// 	this.data.streamProperties.idV1 !== this.data.authorTags[0].idV1 ))) {
		// 	return this.data.authorTags[0];
		// }
		// return this.data.primaryBrandTag || this.data.teaserTag || null;

		// TODO: make this less brittle when this wholething is figured out.
		if (theme === 'special-report') {
			return 'Special Report'
		} else {
			return 'FT Series'
		}
	}

	//returns genre prefix
	// get genrePrefix () {
	// 	if (brandAuthorDouble(this.data) === true) {
	// 		// dedupe authors who are also brands and where Author = stream
	// 		if (this.data.primaryBrandTag.prefLabel !== this.data.authorTags[0].prefLabel &&
	// 			(!this.data.streamProperties ||
	// 			(this.data.streamProperties &&
	// 			this.data.streamProperties.idV1 !== this.data.authorTags[0].idV1))) {
	// 			return this.data.primaryBrandTag.prefLabel;
	// 		}
	// 	}
	// 	// Do not show a genre prefix against brands
	// 	if (!this.data.genreTag || this.data.primaryBrandTag === this.displayTag) {
	// 		return null;
	// 	}
	// 	// Do not show a prefix if the stream is a special report
	// 	if (this.data.genreTag && this.data.genreTag.prefLabel === 'Special Report' &&
	// 		this.data.streamProperties &&
	// 		this.data.streamProperties.taxonomy === 'specialReports') {
	// 		return null;
	// 	}
	// 	return this.data.genreTag.prefLabel;
	// }

	//returns publishedDate, status, classModifier
	// get timeObject () {
	// 	if (this.data.status) {
	// 		return this.liveBlog();
	// 	} else {
	// 		return {
	// 			publishedDate: this.data.publishedDate,
	// 			status: this.timeStatus(),
	// 			classModifier: this.timeStatus()
	// 		}
	// 	}
	// }

	// returns an array of content items related to the main article
	get packageContent () {
		let packageContent = [];
		if (Array.isArray(this.data.contains) && this.data.contains.length > 0) {
			packageContent = this.data.contains;
		}

		return packageContent
			.slice(0, MAX_RELATED_CONTENT)
	}

	// returns url and name for author headshot when primary brand tag is an author with a headshot
	// get headshot () {
	// 	let fileName;
	// 	if (this.data.primaryBrandTag
	// 		&& this.data.primaryBrandTag.attributes
	// 		&& this.data.primaryBrandTag.attributes.length > 0
	// 	) {
	// 		fileName = this.data.primaryBrandTag.attributes[0].value;
	// 	}
	// 	if ((brandAuthorDouble(this.data) === true)
	// 		&& this.data.authorTags.length > 0
	// 		&& this.data.authorTags[0].attributes.length > 0
	// 	) {
	// 		fileName = this.data.authorTags[0].attributes[0].value;
	// 	}

		// if (fileName) {
		// 	return {
		// 		url: `${HEADSHOT_BASE_URL}${fileName}${HEADSHOT_URL_PARAMETERS}`,
		// 		width: HEADSHOT_WIDTH,
		// 		height: HEADSHOT_WIDTH,
		// 		sizes: HEADSHOT_WIDTH,
		// 		widths: [HEADSHOT_WIDTH, 2 * HEADSHOT_WIDTH],
		// 		alt: `Photo of ${this.data.primaryBrandTag.prefLabel}`
		// 	};
		// } else {
		// 	return null;
		// }
	// }

	// returns class modifier for live blog label
	// get liveBlogLabelModifier () {
	// 	return LIVEBLOG_MAPPING[this.data.status.toLowerCase()].labelModifier;
	// }

	// returns title either standard or promotional based on flag
	get displayTitle () {
		if (this.data.flags && this.data.flags.teaserUsePromotionalTitle && this.data.promotionalTitle) {
			return this.data.promotionalTitle;
		}
		return this.data.title;
	}

	// get advertiserPrefix () {
	// 	if (this.data.advertiser) {
	// 		if (this.data.type === 'promoted-content') {
	// 			return ' paid for by ';
	// 		} else {
	// 			return ' by ';
	// 		}
	// 	} else {
	// 		return '';
	// 	}
	// }

	//returns prefix for timestamp (null / 'new' / 'updated')
	// timeStatus () {
	// 	const now = Date.now();
	// 	const publishedDate = new Date(this.data.publishedDate).getTime();
	// 	const initialPublishedDate = new Date(this.data.initialPublishedDate).getTime();
	// 	let status = null;
	// 	if (now - publishedDate < ONE_HOUR) {
	// 		if (publishedDate === initialPublishedDate) {
	// 			status = 'new';
	// 		} else {
	// 			status = 'updated';
	// 		}
	// 	}
	// 	return status
	// }

	// returns publishedDate, status, classModifier
	// liveBlog () {
	// 	return {
	// 		publishedDate: this.data.updates && this.data.updates[0].date,
	// 		status: LIVEBLOG_MAPPING[this.data.status.toLowerCase()].timestampStatus,
	// 		classModifier: this.data.status.toLowerCase()
	// 	}
	// }

	// get duration () {
	// 	if (this.data.duration) {
	// 		const date = new Date(this.data.duration);
	//
	// 		return {
	// 			// https://en.wikipedia.org/wiki/ISO_8601#Durations
	// 			iso: `PT${date.getMinutes()}M${date.getSeconds()}S`,
	// 			ms: this.data.duration,
	// 			formatted: this.data.formattedDuration
	// 		};
	// 	} else {
	// 		return null;
	// 	}
	// }
};

module.exports = TeaserPresenter;

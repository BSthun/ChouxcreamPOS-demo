import React from "react";
import PropTypes from "prop-types";

const BannerSection = ({ picture, subtitle, title, paragraph }) => {
	return (
		<section>
			<div>
				<img src={picture}></img>
			</div>
			<div>
				<h1>{subtitle}</h1>
				<h2>{title}</h2>
				<h3>{paragraph}</h3>
			</div>
		</section>
	);
};

BannerSection.propTypes = {
	picture: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	paragraph: PropTypes.string.isRequired,
};

export default BannerSection;

import React, { useEffect, useRef } from "react";
import { faChevronDown, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typed from "typed.js";
import { ButtonBase } from "@material-ui/core";

import DelayLink from "../utils/routing/DelayLink";
import BannerSection from "./BannerSection";

import ContentPicture1 from "../images/home/banner_content_p1.svg";
import ContentPicture2 from "../images/home/banner_content_p2.svg";
import ContentPicture3 from "../images/home/banner_content_p3.svg";

const Banner = () => {
	const contentRef = useRef(null);

	useEffect(() => {
		const options = {
			strings: [
				"Restaurant discover",
				"Menu browsing",
				"Food ordering",
				"Payment",
				"Ketchen queuing",
				"Stock controlling",
				"Eating experience",
			],
			typeSpeed: 60,
			backSpeed: 30,
			backDelay: 2000,
		};

		const typed = new Typed("#home--banner--typed", options);

		return () => {
			typed.destroy();
		};
	});

	return (
		<>
			<div className={`banner`}>
				<div className={`container`}>
					<h1>
						<span id="home--banner--typed" />
						<br className="mid" />
						will never be the same
					</h1>
					<h2>
						<b>Chouxcream, one platform for all your food.</b>
						<br className="mid" /> Chouxcream POS provides the complete solution
						for your restaurant to manage all the food workflow, from customer
						to end kitchen, in one place.
					</h2>
					<div>
						<ButtonBase
							onClick={() => {
								contentRef.current.scrollIntoView({
									behavior: "smooth",
								});
							}}
						>
							Learn more
						</ButtonBase>
						<DelayLink to="/counter">
							<ButtonBase>
								<FontAwesomeIcon icon={faPlay} /> &nbsp; Getting started
							</ButtonBase>
						</DelayLink>
					</div>
				</div>
				<div className={`scrollhint`}>
					<FontAwesomeIcon icon={faChevronDown} />
				</div>
			</div>

			<div className={`banner-content`} ref={contentRef}>
				<BannerSection
					picture={ContentPicture1}
					subtitle="Feel difficult recieve orders from customers?"
					title="Ordering on the go"
					paragraph="
							No more problem on asking for menu! Customer able to access all
							your restaurant's menu using their own startphone or smart device,
							even their watch. All order they selected will directly sent to
							the end kitchen without any staff to do that work."
				/>
				<BannerSection
					picture={ContentPicture2}
					subtitle="Tangling with a lot of stock and order to work on?"
					title="Controling made easy"
					paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book."
				/>
				<BannerSection
					picture={ContentPicture3}
					subtitle="Order not complete or payment lost, how to deal with it?"
					title="Single system, all automation."
					paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book."
				/>
			</div>

			<div className={`banner-footer`}>
				<div class="wrapper">
					<div>
						<h1 class="title">Chouxcream POS</h1>
						<h1 class="desc">
							A simple POS system for CSC105 assignment. Feature contains system
							to provides user Point-of-Sale system. Including food module,
							dashboard module, staff permission control and much more.
						</h1>
						<h1 class="copyright">
							&copy; 2021 BSthun (Bhumjate Sudprasert), all rights reserved.
						</h1>
					</div>
					<div></div>
				</div>
			</div>
		</>
	);
};

export default Banner;

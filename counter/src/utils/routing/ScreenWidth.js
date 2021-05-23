import { useEffect, useState } from "react";

const ScreenWidth = ({ children }) => {
	const [small, setSmall] = useState(window.innerWidth < 900);

	const event = () => {
		setSmall(window.innerWidth < 900);
	};

	useEffect(() => {
		window.addEventListener("resize", event);
		return () => {
			window.removeEventListener("resize", event);
		};
	});

	return small ? ( // TODO: Making 'screen too small' be a beautiful page
		<div>Your screen is too small</div>
	) : (
		children
	);
};

export default ScreenWidth;

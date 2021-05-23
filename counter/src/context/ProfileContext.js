import { useState, createContext, useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

export const ProfileContext = createContext();

const getProfile = () => {
	const token = Cookies.get("token");
	if (token) {
		const decoded = jwtDecode(token);
		return {
			avatar: decoded.avatar,
			email: decoded.email,
			name: decoded.name,
			permission:
				decoded.permission === "admin"
					? 2
					: decoded.permission === "staff"
					? 1
					: 0,
		};
	} else {
		return {
			avatar: "",
			email: "",
			name: "",
			permission: 0,
		};
	}
};

export const ProfileContextProvider = ({ children }) => {
	const [profile, setProfile] = useState(getProfile);

	const handlers = {
		profile: profile,
		setProfile: (newProfile) => {
			setProfile((profile) => ({
				...profile,
				...newProfile,
			}));
		},
		reload: () => {
			setProfile(getProfile());
		},
	};

	return (
		<ProfileContext.Provider value={handlers}>
			{children}
		</ProfileContext.Provider>
	);
};

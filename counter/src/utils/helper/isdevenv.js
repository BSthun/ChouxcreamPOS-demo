let isDev = false;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
	isDev = true;
}

export default isDev;

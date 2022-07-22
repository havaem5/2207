/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		API_URL: "https://zodinet-2207.herokuapp.com",
		RECAPTCHA_SECRET: "6LfgfwohAAAAACPQHMW1jeCoGB4wLBJ9GtZgpBp1",
		RECAPTCHA_PUBLIC: "6LfgfwohAAAAAKY_UPzJq5KY-LFDnl4vjW61X5Xf",
	},
};

module.exports = nextConfig;

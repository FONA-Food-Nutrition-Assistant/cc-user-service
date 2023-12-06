import * as dotenv from 'dotenv';

const envFound = dotenv.config();

if (!envFound || envFound.error) {
	throw new Error("Couldn't find .env file");
}

export default () => ({
	nodeEnv: process.env.NODE_ENV || 'development',
	app: {
		host: process.env.HOST || '127.0.0.1',
		port: process.env.PORT || 8080,
		prefix: process.env.PREFIX || 'api',
	},
});

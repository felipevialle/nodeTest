module.exports = {
	name: 'API',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	base_url: process.env.BASE_URL || 'http://localhost:3000',
	db: {
		uri: process.env.MONGODB_URI || 'mongodb+srv://felipevialle:RUSrwvaJeDlHG7f5@clustervialle-e3uyb.mongodb.net/test?retryWrites=true',
	},
};
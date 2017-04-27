exports.DATABASE_URL = process.env.DATABASE_URL ||
                        global.DATBASE_URL || 
                        (process.env.NODE_ENV === 'Production' ? 
                        'mongodb://localhost/shopping-list':
                        'mongodb://localhost/shopping-list-dev');
                        // "mongodb://jbyodacom:fr4gt5%@ds119091.mlab.com:19091/shopping-list");
exports.PORT = process.env.PORT || 8080;
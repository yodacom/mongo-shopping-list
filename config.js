exports.DATABASE_URL = process.env.DATABASE_URL ||
                        global.DATBASE_URL || 
                        (process.env.NODE_ENV === 'Production' ? 
                        'mongodb://localhost/shopping-list':
                        'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;
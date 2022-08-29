import { join } from 'path';

process.env.ENVIRONMENT = 'development';
process.env.DOMAIN = 'http: //localhost:3000';
process.env.PORT = 3000;

process.env.DATABASE_PORT = ''; //TBD
process.env.DATABASE_HOST = 'localhost';
process.env.DATABASE_NAME = ''; //TBD
process.env.DATABASE_USER = 'postgres';
process.env.DATABASE_PASSWORD = ''; //TBD

process.env.JWT_ACCESS_KEY = ''; //TBD
process.env.JWT_REFRESH_KEY = ''; //TBD
process.env.JWT_LOCAL_KEY = ''; //TBD
process.env.JWT_ACCESS_KEY_EXPIRE_TIME = '1h';
process.env.JWT_REFRESH_KEY_EXPIRE_TIME = '7d';
process.env.JWT_LOCAL_KEY_EXPIRE_TIME = '5s';

process.env.MODULES_PATH = join(__dirname, 'modules');
process.env.EXTRA_COMMAND = '';

import './env.js';
import { join, dirname } from 'path';
import url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.env.ENVIRONMENT = 'development';
process.env.DOMAIN = 'http: //localhost:3000';
process.env.PORT = 3000;

process.env.DATABASE_PORT = '5432';
process.env.DATABASE_HOST = 'localhost';
process.env.DATABASE_NAME = 'project';
process.env.DATABASE_USER = 'postgres';
process.env.DATABASE_PASSWORD = 'root';

process.env.JWT_ACCESS_KEY = 'b9954830-b4a9-4949-a838-fd849530d739';
process.env.JWT_REFRESH_KEY = 'e11c675b-27e4-4a75-9adf-54cfbe8a21f0';
process.env.JWT_LOCAL_KEY = '9fac9e92-ccfb-4248-8a0c-e139b70d897b';
process.env.JWT_ACCESS_KEY_EXPIRE_TIME = '1h';
process.env.JWT_REFRESH_KEY_EXPIRE_TIME = '7d';
process.env.JWT_LOCAL_KEY_EXPIRE_TIME = '5s';

process.env.MODULES_PATH = join(__dirname, 'modules');
process.env.EXTRA_COMMAND = '';

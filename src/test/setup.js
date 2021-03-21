const db = require('../db/database');
var fs = require('fs');

const TEST_DB_PATH = 'data/test_db.json';

beforeAll(async () => {
    db.FILE_PATH = TEST_DB_PATH;
    fs.createReadStream('data/db.json').pipe(fs.createWriteStream(TEST_DB_PATH));

});

afterAll(async () => {
    if (fs.existsSync(TEST_DB_PATH)) {
        fs.unlinkSync(TEST_DB_PATH)
      }
});
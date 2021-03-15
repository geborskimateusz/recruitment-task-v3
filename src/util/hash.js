const crypto = require('crypto');

function hash() {
    const toHash = data => {
        data = data instanceof String ? data : JSON.stringify(data);
        return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
    }
    return { toHash }

}

module.exports = hash;
const knex = require('../database/knex');
var crypto = require('crypto');

function makeUsersService() {
    async function getUser(query) {
        const { username, password } = query;
        var sha = crypto.createHash('sha512').update(password).digest('hex');
        return knex('user').where({
            username: username,
            password: sha
        }).select('*').first();
    }
    return {
        getUser,
    }
}

module.exports = makeUsersService;
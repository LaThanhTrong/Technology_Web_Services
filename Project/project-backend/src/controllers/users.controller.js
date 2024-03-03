const makeUsersService = require('../services/users.service');
const ApiError = require('../api-error');

async function getUser(req, res, next) {
    try {
        const usersService = makeUsersService();
        user = await usersService.getUser(req.query);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving user')
        );
    }
    req.session.user = user;
    return res.send(user);
}

function logout(req, res) {
    req.session.destroy();
    return res.status(200).send({ message: 'Logout successful' })
}

function getSession(req, res) {
    const session = req.session;
    return res.send(session);
}

module.exports = {
    getUser,
    logout,
    getSession,
}
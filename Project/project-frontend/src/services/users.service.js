function makeUsersService() {
    const baseUrl = '/api/users'

    async function getUser(user) {
        let url = `${baseUrl}?username=${user.username}&password=${user.password}`
        try {
            const res = await fetch(url).then(res => res.json())
            return res
        } catch (err) {
            return null
        }

    }

    async function getSession() {
        return await fetch(`${baseUrl}/session`).then(res => res.json())
    }

    async function logout() {
        let url = `${baseUrl}/logout`
        return await fetch(url).then(res => res.json())
    }

    return {
        getUser,
        getSession,
        logout,
    }
}

export default makeUsersService();
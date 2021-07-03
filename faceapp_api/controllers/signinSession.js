const handleSession = (req,res) => {
    if (req.session.authenticated) {
        res.send({loggedIn: true, user: req.session.UserID})
    } else {
        res.send({loggedIn: false})

    }
}











module.exports = {
    handleSession: handleSession
}
const handleProfileGet = (req,res,knex) => {
    const {id} = req.params;
    knex.select('*').from('users').where({id:id}).then(user => {
        if (user.length === 0) {
            res.status(400).json('Not found')
        } else {res.json(user)}
        
    }).catch(err => res.status(400).json('Not found'))
}

module.exports = {
    handleProfileGet: handleProfileGet
}

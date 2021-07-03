const handleRegister = (req,res,knex,bcrypt ) => {
    const { email, name, password} = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    if ( !email || !password || !name) {
        return res.status(400).json('Wrong credentials')
    }
    knex.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        }).into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date(),
                login_id: knex.select('id').from('login').where('email', '=', email)  
                }).then(user => {
                    res.json(user[0]);
        })
        .then(trx.commit)
        .catch(trx.rollback)

        })
        .catch(err => res.status(400).json("Something went wrong"))
    })
}

module.exports = {
    handleRegister: handleRegister
}


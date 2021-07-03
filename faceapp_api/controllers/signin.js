const handleSignIn = (req,res,knex,bcrypt) => {
    const {email,password,presist} = req.body;
    if ( !email || !password) {
        return res.status(400).json('Wrong credentials')
    }
    knex.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
          const isUserValid = bcrypt.compareSync(password, data[0].hash);
          if (isUserValid) {
              
              
               knex.select('*').from('users').where('email', '=', email)
                    .then(user => {
                        if (presist) {
                            req.session.authenticated = true;
                            req.session.UserID = user[0];
                            req.session.cookie.maxAge = 60*60*24;
                            res.json(user[0]);
                            
                        } else {
                            req.session.authenticated = true;
                            req.session.UserID = user[0];
                            res.json(user[0]);

                        }
                    })
              
          } else {res.json('Wrong email or password')}
        })
        .catch(err => res.status(400).json("Something went wrong"))
    }

    module.exports = {
        handleSignIn: handleSignIn
    }
    
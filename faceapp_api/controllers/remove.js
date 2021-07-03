const handleRemove = (req,res,knex,bcrypt) => {
    const {email,password} = req.body;
    if ( !email || !password) {
        return res.status(400).json('You have to confirm your password')
    }
    knex.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
          const isUserValid = bcrypt.compareSync(password, data[0].hash);
          if (isUserValid) {
            knex('login').where('email', '=', email)
            .del()
            .then(response => res.json('User has been deleted'))
            .catch(err => res.status(400).json('Something went wrong'))

          } else {
              res.json("Please enter correct password");
          }
        
   

})
.catch(err => res.status(400).json("Something went wrong"))
}


module.exports = {
    handleRemove:handleRemove
}
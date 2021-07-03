const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'apikey' //provide your api key
});

const handleApi = (req,res) => {
    app.models.predict("d02b4508df58432fbb84e800597b8959", req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Unable to reach API server"))
}

const handleImage = (req,res,knex) => {
    const {id,date,image,email} = req.body;
    knex.transaction(trx => {
        trx('users').where('id','=',id).increment('entries',1)
        .returning('entries')
        .then(entries => {
            return trx('history')
                .returning('entries')
                .insert({
                image: image,
                date: new Date(),
                email: email,
                entries: entries[0],
                user_id: knex.select('id').from('users').where('email', '=', email)  
                }).then(response => {
                    res.json(response);
        })
        .then(trx.commit)
        .catch(trx.rollback)

        })
        .catch(err => res.status(400).json("Something went wrong"))
    })
}
module.exports = {
    handleImage: handleImage,
    handleApi: handleApi
}


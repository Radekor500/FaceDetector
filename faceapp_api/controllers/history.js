const handleHistory = (req,res,knex) => {
    const{id} = req.body
    knex('history').select('image','date','entries').where('user_id','=', id)
    .then(response => {
        res.json(response)
    })
    .catch(err => console.log(err))

}

module.exports = {
    handleHistory: handleHistory
}
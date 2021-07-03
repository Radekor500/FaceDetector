


const handleUpload = (req,res,knex) => {
    knex('users')
        .where('id', '=', req.body.id)
        .update({profilepic: req.file.path})
        .returning('profilepic')
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Something went wrong"))
   
}










 module.exports = {
    handleUpload: handleUpload
}
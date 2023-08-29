const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    u_name:String,
    img_Url:String
})

module.exports = mongoose.model("images",profileSchema);
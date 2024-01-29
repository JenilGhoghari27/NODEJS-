var mongoose = require("mongoose")
var Schema = mongoose.Schema

var friendSchema = new Schema({
    send_id: {
        type: Schema.Types.ObjectId,
    },
    recive_id: {
        type: Schema.Types.ObjectId
    },
    status: {
        type: String
    }

})
var Friend = mongoose.model('friend', friendSchema)
module.exports = Friend;
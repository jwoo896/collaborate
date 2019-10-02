const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    loggedIn: { type: Boolean },
    firstName: { type: String },
    lastName: { type: String },
    location: { type: String },
    alias: { type: String },
    headliner: {
        type: Schema.Types.ObjectId,
        ref: 'song'
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'song'
    }]
});

UserSchema.statics.findSongs = function(id) {
    return this.findById(id)
        .populate('songs')
        .then(user => user.songs);
}


mongoose.model('user', UserSchema);
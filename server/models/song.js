const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: { type: String },
    url: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

SongSchema.statics.addSong = function(id) {
    const User = mongoose.model('user');

    return this.findById(id)
        .then(song => {
            const user = User.findById(song.user.id);
            user.songs.push(song);

            return Promise.all([user.save(), song.save()])
                .then(([song]) => song);
        });
}

SongSchema.statics.findUser = function(id) {
    return this.findById(id)
        .populate('user')
        .then(song => song.user);
}

mongoose.model('song', SongSchema);
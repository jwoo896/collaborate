const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const mongoose = require('mongoose');
const Song = mongoose.model('song');
const User = mongoose.model('user');
const SongType = require('./song_type');
const UserType = require('./user_type');


const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                alias: { type: GraphQLString },
                location: { type: GraphQLString },
                headliner: { type: SongType }
            },
            resolve(parentValue, args) {
                return (new User(args)).save();
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, { id }){
                return User.remove({ _id: id });
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)},
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                alias: { type: GraphQLString },
                location: { type: GraphQLString },
                headliner: { type: SongType } //might not need this here
            },
            resolve(parentValue, args){
                return new Promise((resolve, reject) => {
                    const date = Date().toString();
                    const fieldsToUpdate = {};
                    const keys = Object.keys(args);
                    //MAYBE REFACTOR THIS BY CREATING A MUTATION FOR EACH PROPERTY???
                    //OR FORCE USER TO INCLUDE ALL FIELDS (CAN LEAVE STORED VALUES IN THE FORM AND REUSE)
                    for(let i = 1; i < keys.length; i++){
                        if(args[keys[keys[i]]] !== '' && args[keys[keys[i]]] !== null) {
                            fieldsToUpdate[keys[i]] = args[keys[keys[i]]];
                        }
                    }
                    fieldsToUpdate['dateUpdated'] = date;
                    User.findOneAndUpdate(
                        { "_id": args.id },
                        { "$set": {...fieldsToUpdate} },
                        { "new": true } //returns new document
                    ).exec((err, res) => {
                        console.log('test', res)
                        if(err) reject(err)
                        else resolve(res)
                    });
                })
            }
        },
        updateUserHeadliner: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                headliner: { type: new GraphQLNonNull(SongType) }
            },
            resolve(parentValue, { id, headliner }) {
              return new Promise((resolve, reject) => {
                 User.findOneAndUpdate(
                     { "_id": id },
                     { "$set": {headliner} },
                     { "new": true }
                 ).exec((err, res) => {
                    if(err) reject(err)
                    else resolve(res)
                 });
              });
            }
        },
        addSong: {
            type: SongType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                url: { type: new GraphQLNonNull(GraphQLString) },
                user: { type: new GraphQLNonNull(UserType)}
            }
        },
        deleteSong: {
            type: SongType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, { id }){
                return Song.remove({ _id: id });
            }
        },
        updateSong: {
            type:SongType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString }
            },
            resolve(parentValue, { id, title}) {
                return new Promise((resolve, reject) => {
                    const dateUpdated = Date().toString();
                    Song.findOneAndUpdate(
                        {"_id": id},
                        {"$set": {title, dateUpdated}},
                        {"new": true}
                    ).exec((err, res) => {
                       if(err) reject(err)
                       else resolve(res)
                    });
                });
            }
        }
    }
});

module.exports = mutation;

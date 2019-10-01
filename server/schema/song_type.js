const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const UserType = require('../schema/user_type');
const Song = mongoose.model('song');

const SongType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        url: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parentValue){
                return Song.findUser(parentValue.id);
            }
        }
    })
});

module.exports = SongType;
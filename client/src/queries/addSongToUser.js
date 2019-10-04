import gql from 'graphql-tag';

export default gql`
    mutation AddSongToUser(
                $songId: ID!
            ){
                addSongToUser(
                    songId: $songId
                ){
                    id
                }
    }`;
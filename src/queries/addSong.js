import gql from 'graphql-tag';

export default gql`
    mutation AddSong(
                $title: String!,
                $url: String!,
                $user: ID!
            ){
                addSong(
                    title: $title,
                    url: $url,
                    user: $user
                ){
                    id
                }
    }`;
import gql from 'graphql-tag';

export default gql`
    mutation AddUser(
                $firstName: String!,
                $lastName: String!,
                $email: String!,
                $alias: String,
                $location: String
            ){
                addUser(
                    firstName: $firstName,
                    lastName: $lastName,
                    email: $email,
                    alias: $alias,
                    location: $location
                ){
                    id,
                    firstName,
                    lastName,
                    alias
                }
    }`;
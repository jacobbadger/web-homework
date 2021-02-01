const gql = require('graphql-tag')

export const getUsersQuery = gql`
  query getUsersQuery {
    users {
      id
      firstName
      lastName
      dob
    }
  }
`

export const deleteUser = gql`
  mutation deleteUser(
    $id: ID!
  ) {
    deleteUser(id: $id) {
      firstName
    }
  }
`

export const updateUser = gql`
  mutation updateUser(
    $dob: String!,
    $firstName: String!,
    $lastName: String!,
    $id: ID!
  ) {
    updateUser(dob: $dob, firstName: $firstName, lastName: $lastName, id: $id) {
      id
      firstName
      lastName
      dob
    }
  }
`

export const createUser = gql`
  mutation createUser($dob:String!, $firstName:String!, $lastName:String!) {
    createUser(dob: $dob, firstName: $firstName, lastName: $lastName) {
      id
    }
  }
`

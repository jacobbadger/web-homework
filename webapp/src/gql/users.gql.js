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

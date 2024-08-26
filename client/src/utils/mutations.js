import { gql } from '@apollo/client';

// login user mutation set up using Apollo Server.
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// add user mutation
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// save book mutation
export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;


// remove book mutation

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
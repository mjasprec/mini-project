'use client';
import { gql, DocumentNode } from '@apollo/client';

export const REGISTER_USER: DocumentNode = gql`
  mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $password: String!
    $email: String!
    $username: String!
    $about: String!
    $gender: String!
    $birthday: String!
    $wallet: Float!
  ) {
    register(
      registerDto: {
        firstName: $firstName
        lastName: $lastName
        password: $password
        email: $email
        username: $username
        about: $about
        gender: $gender
        birthday: $birthday
        wallet: $wallet
      }
    ) {
      activation_token
    }
  }
`;

'use client';
import { gql, DocumentNode } from '@apollo/client';

export const GET_USER: DocumentNode = gql`
  query {
    getLoggedInUser {
      user {
        id
        firstName
        lastName
        email
        username
        password
        role
        about
        gender
        wallet
        avatar {
          url
        }
        nfts {
          imgUrl
          userId
          price
          name
          description
          comments {
            text
            nftId
            userId
          }
        }
      }
      accessToken
      refreshToken
    }
  }
`;

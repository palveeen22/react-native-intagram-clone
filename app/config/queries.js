// here should be queris to get data from graph

import { gql } from "@apollo/client";

/*
############
#  QUERY   #
############
*/

export const GET_HOMESCREEN = gql`
  query GetMe($getMeId: ID!) {
    getMe(id: $getMeId) {
      statusCode
      message
      error
      data {
        _id
        name
        username
        email
        profilePicture
        Following {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        Followers {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        Posts {
          _id
          content
          description
          tags
          imgUrl
          authorId
          like {
            username
            createdAt
            updatedAt
          }
          comment {
            content
            username
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
    }
    getPosts {
      statusCode
      message
      error
      data {
        _id
        content
        description
        tags
        imgUrl
        authorId
        like {
          username
          createdAt
          updatedAt
        }
        comment {
          content
          username
          createdAt
          updatedAt
        }
        Author {
          _id
          username
          profilePicture
        }
      }
    }
    getAllUsers {
      statusCode
      message
      error
      data {
        _id
        name
        username
        email
        password
        profilePicture
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query GetMe($getMeId: ID!) {
    getMe(id: $getMeId) {
      statusCode
      message
      error
      data {
        _id
        name
        username
        email
        profilePicture
        Following {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        Followers {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        Posts {
          _id
          content
          description
          tags
          imgUrl
          authorId
          like {
            username
            createdAt
            updatedAt
          }
          comment {
            content
            username
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_USER_ID = gql`
  query ProfileUser($profileUserId: ID!) {
    profileUser(id: $profileUserId) {
      statusCode
      message
      error
      data {
        _id
        name
        username
        email
        profilePicture
        Following {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        Followers {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        Posts {
          _id
          content
          description
          tags
          imgUrl
          authorId
          like {
            username
            createdAt
            updatedAt
          }
          comment {
            content
            username
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const SEARCH = gql`
  query SearchUsers($query: String!) {
    searchUsers(query: $query) {
      _id
      name
      username
      email
      password
      profilePicture
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      statusCode
      message
      error
      data {
        _id
        content
        description
        tags
        imgUrl
        authorId
        like {
          username
          createdAt
          updatedAt
        }
        comment {
          content
          username
          createdAt
          updatedAt
        }
        Author {
          username
          profilePicture
        }
      }
    }
  }
`;

export const GET_POST_ID = gql`
  query GetPostById($getPostByIdId: ID!) {
    getPostById(id: $getPostByIdId) {
      statusCode
      message
      error
      data {
        _id
        content
        description
        tags
        imgUrl
        authorId
        like {
          username
          createdAt
          updatedAt
        }
        comment {
          content
          username
          createdAt
          updatedAt
        }
        Author {
          _id
          username
          profilePicture
        }
      }
    }
  }
`;

export const GET_LIKE = gql`
  query GetPostById($getLikesId: ID!) {
    getLikes(id: $getLikesId)
  }
`;

/*
############
# MUTATION #
############
*/

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const REGISTER = gql`
  mutation Mutation($input: RegisterInput) {
    register(input: $input) {
      statusCode
      message
      error
      data {
        _id
        name
        username
        email
        profilePicture
      }
    }
  }
`;

export const POST_CREATE = gql`
  mutation Mutation($input: PostCreate) {
    postCreate(input: $input) {
      statusCode
      message
      error
      data {
        _id
        content
        description
        tags
        imgUrl
        authorId
        like {
          username
          createdAt
          updatedAt
        }
        comment {
          content
          username
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation Login($commentCreateId: ID, $input: CommentInput) {
    commentCreate(id: $commentCreateId, input: $input) {
      statusCode
      message
      error
      data {
        content
        username
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_LIKE = gql`
  mutation Login($likeCreateId: ID, $input: LikeInput) {
    likeCreate(id: $likeCreateId, input: $input) {
      statusCode
      message
      error
      data {
        username
        createdAt
        updatedAt
      }
    }
  }
`;

export const FOLLOW_CREATE = gql`
  mutation CreateFollow($input: FollowInput) {
    createFollow(input: $input) {
      statusCode
      message
      error
      data {
        followingId
        followerId
        createdAt
        updatedAt
      }
    }
  }
`;

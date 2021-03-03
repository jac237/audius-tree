import { gql } from '@apollo/client';

const USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    getUserById(userId: $userId) {
      id
      name
      handle
      bio
      location
      is_verified
      album_count
      followee_count
      follower_count
      playlist_count
      repost_count
      track_count
      cover_photo {
        x2000
      }
      profile_picture {
        x150
      }
    }
  }
`;

const USER_BY_HANDLE = gql`
  query GetUserByHandle($handle: String!) {
    getUserByHandle(handle: $handle) {
      id
      name
      handle
      bio
      location
      is_verified
      album_count
      followee_count
      follower_count
      playlist_count
      repost_count
      track_count
      cover_photo {
        x2000
      }
      profile_picture {
        x150
      }
    }
  }
`;

const TRACK_BY_ID = gql`
  query GetTrackById($trackId: ID!) {
    getTrackById(trackId: $trackId) {
      id
      description
      genre
      mood
      release_date
      repost_count
      favorite_count
      tags
      title
      play_count
      duration
      user {
        id
        name
        handle
        is_verified
      }
      artwork {
        x150
      }
    }
  }
`;

const USER_TRACKS = gql`
  query GetUserTracks($userId: ID!) {
    getUserTracks(userId: $userId) {
      id
      title
      mood
      favorite_count
      play_count
      repost_count
      duration
      artwork {
        x150
      }
      user {
        id
        name
        handle
        is_verified
      }
    }
  }
`;

const FEATURED_TRACKS = gql`
  query GetUserFavorites($userId: ID!) {
    getUserFavorites(userId: $userId) {
      favorite_item_id
    }
  }
`;

const TRENDING_TRACKS = gql`
  query GetTrendingTracks($genre: String, $time: String) {
    getTrendingTracks(genre: $genre, time: $time) {
      id
      title
      artwork {
        x150
      }
      user {
        id
        handle
        name
        is_verified
      }
    }
  }
`;

const USER_SEARCH = gql`
  query GetUsersBySearch($query: String!) {
    getUsersBySearch(query: $query) {
      id
      name
      handle
      is_verified
      profile_picture {
        x150
      }
    }
  }
`;

const TRACK_SOURCE = gql`
  query GetTrackSource($trackId: ID!) {
    getTrackSource(trackId: $trackId)
  }
`;

export {
  USER_BY_ID,
  USER_BY_HANDLE,
  TRACK_BY_ID,
  USER_TRACKS,
  FEATURED_TRACKS,
  TRENDING_TRACKS,
  TRACK_SOURCE,
  USER_SEARCH,
};

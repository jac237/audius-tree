const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Banner {
    x640: String
    x2000: String
  }
  type Image {
    x150: String
    x480: String
    x1000: String
  }
  type Favorite {
    favorite_item_id: String
    favorite_type: String
    user_id: String
  }
  type Track {
    artwork: Image
    description: String
    genre: String
    id: ID!
    mood: String
    release_date: String
    repost_count: Int
    favorite_count: Int
    tags: String
    title: String
    user: User
    duration: Int
    downloadable: Boolean
    play_count: Int
    streamUrl: String
  }
  type User {
    id: ID!
    album_count: Int
    bio: String
    cover_photo: Banner
    followee_count: Int
    follower_count: Int
    handle: String
    is_verified: Boolean
    location: String
    name: String
    playlist_count: Int
    profile_picture: Image
    repost_count: Int
    track_count: Int
  }
  type Playlist {
    artwork: Image
    description: String
    id: ID!
    is_album: Boolean
    playlist_name: String
    repost_count: Int
    favorite_count: Int
    total_play_count: Int
    user: User
  }
  union RepostItem = Track | Playlist
  type Repost {
    timestamp: String
    item_type: String
    item: RepostItem
  }
  type Query {
    getUserById(userId: ID!): User
    getUserByHandle(handle: String!): User
    getUserTracks(userId: ID!): [Track]
    getUserFavorites(userId: ID!): [Favorite]
    getUsersBySearch(query: String!): [User]
    getUserReposts(userId: ID!): [Repost]
    getUserTags(userId: ID!): [String]

    getTrackById(trackId: ID!): Track
    getTrendingTracks(genre: String, time: String): [Track]
    getTrackSource(trackId: ID!): String
    getTracksBySearch(query: String!): [Track]

    searchPlaylists(query: String!): [Playlist]
    getPlaylist(playlistId: ID!): Playlist
    getPlaylistTracks(playlistId: ID!): [Track]
  }
`;

module.exports = typeDefs;

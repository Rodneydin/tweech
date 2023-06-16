import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Profile {
  name: string | null;
  _id: string | null;
  username: string | null;
  image: string | null;
  bio: string | null;
  followers_count: number;
  following_count: number;
  posts: any[] | null; // Replace 'any' with the actual type of your posts array
  reposts: any[] | null; // Replace 'any' with the actual type of your reposts array
  directMessages: string | null;
  country: string | null; // Add the 'country' field
  interests: string | null; // Add the 'interests' field
  location: string | null; // Add the 'location' field
  notificationPref: boolean | null; // Add the 'notificationPref' field
  feedback: string | null; // Add the 'feedback' field
}

interface ProfileState {
  profile: Profile;
}

const initialState: ProfileState = {
  profile: {
    name: 'guest',
    _id: null,
    username: 'Guest',
    image: null,
    bio: null,
    followers_count: 0,
    following_count: 0,
    posts: null,
    reposts: null,
    directMessages: null,
    country: null, // Initialize 'country' field as null
    interests: null, // Initialize 'interests' field as null
    location: null, // Initialize 'location' field as null
    notificationPref: null, // Initialize 'notificationPref' field as null
    feedback: null, // Initialize 'feedback' field as null
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;

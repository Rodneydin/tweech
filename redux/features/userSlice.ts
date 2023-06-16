import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

interface User {
  accessToken: string;
  auth: any; // Replace 'any' with the appropriate type for the 'auth' field
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: UserMetadata;
  phoneNumber: string | null;
  photoURL: string;
  proactiveRefresh: ProactiveRefresh;
  providerData: any[]; // Replace 'any' with the appropriate type for the 'providerData' field
  providerId: string;
  reloadListener: null;
  reloadUserInfo: ReloadUserInfo;
  stsTokenManager: StsTokenManager;
  tenantId: string | null;
  uid: string;
}

interface UserMetadata {
  createdAt: string;
  lastLoginAt: string;
  lastSignInTime: string;
  creationTime: string;
}

interface ProactiveRefresh {
  user: any;
  isRunning: boolean;
  timerId: any;
  errorBackoff: number;
}

interface ReloadUserInfo {
  localId: string;
  email: string;
  displayName: string;
  photoUrl: string;
  emailVerified: boolean;
  // Add more properties if needed
}

interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = {
        accessToken: action.payload.accessToken,
        auth: action.payload.auth,
        displayName: action.payload.displayName,
        email: action.payload.email,
        emailVerified: action.payload.emailVerified,
        isAnonymous: action.payload.isAnonymous,
        metadata: action.payload.metadata,
        phoneNumber: action.payload.phoneNumber,
        photoURL: action.payload.photoURL,
        proactiveRefresh: action.payload.proactiveRefresh,
        providerData: action.payload.providerData,
        providerId: action.payload.providerId,
        reloadListener: action.payload.reloadListener,
        reloadUserInfo: action.payload.reloadUserInfo,
        stsTokenManager: action.payload.stsTokenManager,
        tenantId: action.payload.tenantId,
        uid: action.payload.uid,
      };
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

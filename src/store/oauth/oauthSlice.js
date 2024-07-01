import { createSlice } from '@reduxjs/toolkit'

import { decodeToken } from '../../shared/utils';
const tokenDefault = {
  access_token: null,
  expires: null,
  refresh_token: null,
  user_onlines: [],
  currentUser: null,
  permissions: [],
  token: null,
  descriptionMenu: ""
};
export const oauthSlice = createSlice({
  name: 'oauth',
  initialState: Object.assign({}, tokenDefault),
  reducers: {
    setToken: (state, action) => {
      console.log('---2-2----')
      state = { ...tokenDefault, ...action.payload };
      state.currentUser = decodeToken(action.payload.access_token)
      return state;
    },
    setTokenLMS: (state, action) => {
      console.log('settokenLMS', action.payload);
      action.payload.Culture = 'vi-VN';
      state = { ...tokenDefault, ...action.payload };
      return state;
    },
    setUserOnlines: (state, action) => {
      state.user_onlines = action.payload;
      return state;
    },
    removeToken: (state, action) => {
      state = Object.assign({}, tokenDefault);
      return state;
    },
    setPermission: (state, action) => {
      state.permissions = action.payload;
      return state;
    },
    removeToken: (state, action) => {
      state = Object.assign({}, tokenDefault);
      return state;
    },
    setLanguage: (state, action) => {
      let Culture = '';
      if (action.payload === 'en') {
        Culture = 'en-US'
      }
      if (action.payload === 'vi') {
        Culture = 'vi-VN'
      }
      state.Culture = Culture;
      return state;
    },
    setDescriptionMenu: (state, action) => {
      state.descriptionMenu = action.payload;
      return state;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken, setUserOnlines, removeToken, setPermission, setTokenLMS, setLanguage, setDescriptionMenu } = oauthSlice.actions

export default oauthSlice.reducer
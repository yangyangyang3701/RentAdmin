import { createSlice } from '@reduxjs/toolkit';

const localUserInfo = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
  appTitle: '租房管理系统',
  collapsed: false, // 是否收起菜单
  userInfo: localUserInfo || null,
};

export const globalStore = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    changeAppTitle: (state, action) => {
      state.appTitle = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = { ...action.payload };
    },
  },
});

export const {
  toggleCollapsed, changeAppTitle, setUserInfo,
} = globalStore.actions;

export default globalStore.reducer;

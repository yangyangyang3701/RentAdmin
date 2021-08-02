import { createSlice } from '@reduxjs/toolkit';

const localUserInfo = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
  appTitle: '租房管理系统',
  collapsed: false, // 是否收起菜单
  userInfo: localUserInfo || null,
  isMobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
  showMobileMenu: false,
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
    toggleShowMobileMenu: (state) => {
      state.showMobileMenu = !state.showMobileMenu;
    },
  },
});

export const {
  toggleCollapsed, changeAppTitle, setUserInfo,
  toggleShowMobileMenu,
} = globalStore.actions;

export default globalStore.reducer;

import { combineReducers } from 'redux';

import getpetlist from './state/home/getpetlist.js';

const reducer = combineReducers({
  //各个组件中各自的状态
  //获取值  store.getState().homebanner
  getpetlist
})

export default reducer;

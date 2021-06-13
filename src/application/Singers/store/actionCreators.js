import {
  getHotSingerListRequest,
  getSingerListRequest,
} from "../../../api/requst";
import {
  CHANGE_SINGER_LIST,
  CHANGE_CATOGORY,
  CHANGE_ALPHA,
  CHANGE_LIST_OFFSET,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_ENTER_LOADING,
} from "./constants";

// 切换类型
export const changeCategory = (data) => ({
  type: CHANGE_CATOGORY,
  data,
});

// 切换字母
export const changeAlpha = (data) => ({
  type: CHANGE_ALPHA,
  data,
});

// 切换歌手列表
const changeSingerList = (data) => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data),
});

// 分页
export const changeListOffset = (data) => ({
  type: CHANGE_LIST_OFFSET,
  data,
});

//进场loading
export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data,
});

//滑动最底部loading
export const changePullUpLoading = (data) => ({
  type: CHANGE_PULLUP_LOADING,
  data,
});

//顶部下拉刷新loading
export const changePullDownLoading = (data) => ({
  type: CHANGE_PULLDOWN_LOADING,
  data,
});

// 获取热门歌手列表
export const getHotSingerList = () => {
  return async (dispatch) => {
    try {
      const data = await getHotSingerListRequest(0);
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
      dispatch(changeListOffset(data.length));
    } catch (e) {
      console.log("热门歌手数据获取失败");
    }
  };
};

// 获取更多热门歌手列表
export const refreshMoreHotSingerList = () => {
  return async (dispatch, getState) => {
    const offset = getState().getIn(["singers", "listOffset"]);
    const singerList = getState().getIn(["singers", "singerList"]).toJS();
    try {
      const res = await getHotSingerListRequest(offset);
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
      dispatch(changeListOffset(data.length));
    } catch (e) {
      console.log("热门歌手数据获取失败");
    }
  };
};

// 获取歌手列表
export const getSingerList = () => {
  return async (dispatch, getState) => {
    const offset = getState().getIn(["singers", "listOffset"]);
    const category = getState().getIn(["singers", "category"]);
    const alpha = getState().getIn(["singers", "alpha"]);
    try {
      const { artists } = await getSingerListRequest(category, alpha, offset);
      dispatch(changeSingerList(artists));
      dispatch(changeEnterLoading(false));
      dispatch(changePullUpLoading(false));
      dispatch(changeListOffset(artists.length));
    } catch (e) {
      console.log("歌手数据获取失败");
    }
  };
};

// 获取更多歌手列表
export const refreshMoreSingerList = () => {
  return async (dispatch, getState) => {
    const category = getState().getIn(["singers", "category"]);
    const alpha = getState().getIn(["singers", "alpha"]);
    const offset = getState().getIn(["singers", "listOffset"]);
    const singerList = getState().getIn(["singers", "singerList"]).toJS();
    try {
      const { artists } = await getSingerListRequest(category, alpha, offset);
      const data = [...singerList, ...artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
      dispatch(changeListOffset(data.length));
    } catch (e) {
      console.log("歌手数据获取失败");
    }
  };
};

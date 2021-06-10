import * as actionTypes from "./constants";
import { fromJS } from "immutable";
import { getBannerRequest, getRecommendListRequest } from "../../../api/requst";

export const getBannerList = () => {
  return async (dispatch) => {
    try {
      const data = await getBannerRequest();
      dispatch({
        type: actionTypes.CHANGE_BANNER,
        data: fromJS(data.banners),
      });
    } catch (e) {
      console.log("轮播图数据传输错误");
    }
  };
};

export const getRecommendList = () => {
  return async (dispatch) => {
    try {
      const data = await getRecommendListRequest();
      dispatch({
        type: actionTypes.CHANGE_RECOMMEND_LIST,
        data: fromJS(data.result),
      });
      dispatch({
        type: actionTypes.CHANGE_ENTER_LOADING,
        data: false,
      });
    } catch (e) {
      console.log("推荐歌单数据传输错误");
    }
  };
};

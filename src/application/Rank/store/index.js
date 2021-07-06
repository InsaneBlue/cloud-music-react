import { fromJS } from "immutable";
import { getRankListRequest } from "../../../api/request";

//constants
export const CHANGE_RANK_LIST = "home/rank/CHANGE_RANK_LIST";

export const CHANGE_LOADING = "home/rank/CHANGE_LOADING";

// actionCreator
const changeRankList = (data) => ({
  type: CHANGE_RANK_LIST,
  data: fromJS(data),
});

const changeLoading = (data) => ({
  type: CHANGE_LOADING,
  data,
});

export const getRankList = () => {
  return async (dispatch) => {
    try {
      const { list = [] } = await getRankListRequest();
      dispatch(changeRankList(list));
      dispatch(changeLoading(false));
    } catch (e) {
      console.log(e, "获取排行榜列表失败");
    }
  };
};

// reducer
const defaultState = fromJS({
  rankList: [],
  loading: true,
});

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_RANK_LIST:
      return state.set("rankList", action.data);
    case CHANGE_LOADING:
      return state.set("loading", action.data);
    default:
      return state;
  }
};

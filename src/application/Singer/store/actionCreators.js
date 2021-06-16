import {
  CHANGE_SONGS_OF_ARTIST,
  CHANGE_ARTIST,
  CHANGE_ENTER_LOADING,
} from "./constants";
import { fromJS } from "immutable";
import { getSingerInfoRequest } from "../../../api/requst";

export const changeArtist = (data) => ({
  type: CHANGE_ARTIST,
  data: fromJS(data),
});

export const changeSongs = (data) => ({
  type: CHANGE_SONGS_OF_ARTIST,
  data: fromJS(data),
});

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data,
});

export const getSingerInfo = (id) => {
  return async (dispatch) => {
    try {
      const { artist, hotSongs } = await getSingerInfoRequest(id);

      dispatch(changeArtist(artist));
      dispatch(changeSongs(hotSongs));
      dispatch(changeEnterLoading(false));
    } catch (e) {
      console.log("获取歌手信息失败");
    }
  };
};

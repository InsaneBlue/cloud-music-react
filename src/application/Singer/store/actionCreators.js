import {
  CHANGE_SONGS_OF_ARTIST,
  CHANGE_ARTIST,
  CHANGE_ARTIST_ID,
  CHANGE_ENTER_LOADING,
} from "./constants";
import { fromJS } from "immutable";
import { getSingerInfoRequest } from "../../../api/request";

export const changeArtist = (data) => ({
  type: CHANGE_ARTIST,
  data: fromJS(data),
});

export const changeArtistId = (data) => ({
  type: CHANGE_ARTIST_ID,
  data,
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
  return async (dispatch, getState) => {
    // 判断是否重复点击
    const artistId = getState().getIn(["singerInfo", "artistId"]);
    if (id === artistId) {
      dispatch(changeEnterLoading(false));
      return;
    }

    try {
      const { artist, hotSongs } = await getSingerInfoRequest(id);
      dispatch(changeArtistId(id));
      dispatch(changeArtist(artist));
      dispatch(changeSongs(hotSongs));
      dispatch(changeEnterLoading(false));
    } catch (e) {
      console.log("获取歌手信息失败");
    }
  };
};

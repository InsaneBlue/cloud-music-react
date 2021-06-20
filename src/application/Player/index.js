import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";

import Lyric from "../../api/lyric-parser";
import { playMode } from "../../api/config";
import { getLyricRequest } from "../../api/requst";
import { isEmptyObject, shuffle, findIndex, getSongUrl } from "../../api/utils";

import PlayList from "./play-list/index";
import MiniPlayer from "./mini-player";
import NormalPlayer from "./normal-player";
import Toast from "./../../baseUI/toast/index";

import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen,
  changeSpeed,
} from "./store/actionCreators";

function Player(props) {
  return (
    <>
      <p>this is player</p>
      {/* <MiniPlayer
        playing={playing}
        full={fullScreen}
        song={currentSong}
        percent={percent}
        clickPlaying={clickPlaying}
        setFullScreen={toggleFullScreenDispatch}
        togglePlayList={togglePlayListDispatch}
      ></MiniPlayer> */}
    </>
  );
}

const mapStateToProps = () => {};
export default React.memo(Player);

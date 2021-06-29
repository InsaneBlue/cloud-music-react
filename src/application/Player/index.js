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
  const {
    playing,
    fullScreen,
    currentSong: immuCurrentSong,
    playList: immuPlayList,
    currentIndex,
    speed,
    mode,
  } = props;
  const {
    toggleFullScreenDispatch,
    togglePlayListDispatch,
    changeCurrentDispatch,
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
  } = props;

  const currentSong = immuCurrentSong.toJS();
  const playList = immuPlayList.toJS();

  const [preSong, setPreSong] = useState({});

  const songReady = useRef(true);
  const audioRef = useRef();
  const currentLyric = useRef();
  const currentLineNum = useRef(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [modeText, setModeText] = useState("");

  const [currentPlayingLyric, setPlayingLyric] = useState("");

  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady.current
    )
      return;

    // songReady.current = false;

    // 获取当前点击播放歌曲的信息
    const current = playList[currentIndex];
    changeCurrentDispatch(current);
    setPreSong(current);

    // 设置播放器
    audioRef.current.src = getSongUrl(current.id);
    audioRef.current.autoplay = true;
    audioRef.current.playbackRate = speed;

    // 重置状态
    togglePlayingDispatch(true);
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);

    // 获取歌词
    getLyric(current.id);
  }, [playList, currentIndex]);

  // 按钮切换播放/暂停
  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  // 点击播放栏的暂停/播放按钮
  const clickPlaying = (e, status) => {
    e.stopPropagation();
    togglePlayingDispatch(status);
  };

  // 更新播放进度
  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  // 循环播放
  const handleLoop = () => {};

  // 播放下一首
  const handleNext = () => {
    const len = playList.length;

    // 若只有一首歌曲，默认循环播放
    if (len === 1) {
      handleLoop();
      return;
    }

    const index = currentIndex >= len - 1 ? currentIndex + 1 : 0;

    // 若当前不是正在播放
    if (!playing) togglePlayingDispatch(true);

    // 按序播放下一首
    changeCurrentIndexDispatch(index);
  };

  // 播放结束
  const handleEnd = (e) => {
    if (mode === playMode.loop) handleLoop();
    else handleNext();
  };

  // 播放出错
  const handleError = () => {
    handleNext();
    console.log("播放出错");
  };

  // 中断事件
  const handlePause = () => {
    togglePlayingDispatch(false);
  };

  // 播放事件
  const handlePlay = () => {
    togglePlayingDispatch(true);
  };

  const changeMode = () => {};

  const handlePrev = () => {};

  const onProgressChange = (newPercent) => {
    const newTime = newPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) togglePlayingDispatch(true);
    if (currentLyric.current) currentLyric.current.seek(newTime * 1000);
  };

  const clickSpeed = () => {};

  const handleLyric = ({ lineNum, txt }) => {
    if (!currentLyric.current) return;
    currentLineNum.current = lineNum;
    setPlayingLyric(txt);
  };

  // 请求歌词
  const getLyric = async (id) => {
    if (currentLyric.current) {
      currentLyric.current.stop();
    }
    try {
      const { lrc: { lyric } = {} } = await getLyricRequest(id);
      if (!lyric) {
        currentLyric.current = null;
        return;
      }

      currentLyric.current = new Lyric(lyric, handleLyric, speed);
      currentLyric.current.play();
      currentLineNum.current = 0;
      currentLyric.current.seek(0);
    } catch (e) {
      currentLyric.current = "";
      songReady.current = true;
      audioRef.current.play();
    }
  };

  return (
    <>
      {/* 播放页 */}
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          song={currentSong}
          full={fullScreen}
          playing={playing}
          mode={mode}
          percent={percent}
          modeText={modeText}
          duration={duration}
          currentTime={currentTime}
          currentLyric={currentLyric.current}
          currentPlayingLyric={currentPlayingLyric}
          speed={speed}
          changeMode={changeMode}
          handlePrev={handlePrev}
          handleNext={handleNext}
          onProgressChange={onProgressChange}
          currentLineNum={currentLineNum.current}
          clickPlaying={clickPlaying}
          toggleFullScreenDispatch={toggleFullScreenDispatch}
          togglePlayListDispatch={togglePlayListDispatch}
          clickSpeed={clickSpeed}
        ></NormalPlayer>
      )}
      {/* 底部播放栏 */}
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          playing={playing}
          full={fullScreen}
          song={currentSong}
          percent={percent}
          clickPlaying={clickPlaying}
          setFullScreen={toggleFullScreenDispatch}
          togglePlayList={togglePlayListDispatch}
        ></MiniPlayer>
      )}

      {/* 播放列表 */}
      <PlayList clearPreSong={setPreSong.bind(null, {})}></PlayList>

      {/* 播放器 */}
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
        onPause={handlePause}
        onPlay={handlePlay}
      ></audio>
    </>
  );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  fullScreen: state.getIn(["player", "fullScreen"]),
  playing: state.getIn(["player", "playing"]),
  currentSong: state.getIn(["player", "currentSong"]),
  showPlayList: state.getIn(["player", "showPlayList"]),
  mode: state.getIn(["player", "mode"]),
  speed: state.getIn(["player", "speed"]),
  currentIndex: state.getIn(["player", "currentIndex"]),
  playList: state.getIn(["player", "playList"]),
  sequencePlayList: state.getIn(["player", "sequencePlayList"]),
});

// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => ({
  togglePlayingDispatch(data) {
    dispatch(changePlayingState(data));
  },
  toggleFullScreenDispatch(data) {
    dispatch(changeFullScreen(data));
  },
  togglePlayListDispatch(data) {
    dispatch(changeShowPlayList(data));
  },
  changeCurrentIndexDispatch(index) {
    dispatch(changeCurrentIndex(index));
  },
  changeCurrentDispatch(data) {
    dispatch(changeCurrentSong(data));
  },
  changeModeDispatch(data) {
    dispatch(changePlayMode(data));
  },
  changePlayListDispatch(data) {
    dispatch(changePlayList(data));
  },
  changeSpeedDispatch(data) {
    dispatch(changeSpeed(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));

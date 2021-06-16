import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { changeEnterLoading } from "./store/actionCreators";
import { getSingerInfo } from "./store/actionCreators";

import Header from "../../baseUI/header/index";
import Scroll from "../../baseUI/scroll/index";
import Loading from "./../../baseUI/loading/index";
import MusicNote from "../../baseUI/music-note/index";
import {
  ImgWrapper,
  CollectButton,
  SongListWrapper,
  BgLayer,
  Container,
} from "./style";
import { CSSTransition } from "react-transition-group";

function Singer(props) {
  const initialHeight = useRef(0);
  const [showStatus, setShowStatus] = useState(true);

  const OFFSET = 5;

  const {
    artist: immutableArtist,
    songs: immutableSongs,
    loading,
    songCount,
    getSingerDataDispatch,
  } = props;

  const artist = immutableArtist.toJS();
  const songs = immutableSongs.toJS();
  const header = useRef();

  useEffect(() => {
    const id = props.match.params.id;
    getSingerDataDispatch(id);
  }, []);

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header
          handleClick={setShowStatusFalse}
          title={artist.name}
          ref={header}
        ></Header>
        <div>this is singer children</div>
      </Container>
    </CSSTransition>
  );
}

// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getSingerDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getSingerInfo(id));
    },
  };
};

// 映射state到props上
const mapStateToProps = (state) => ({
  artist: state.getIn(["singerInfo", "artist"]),
  songs: state.getIn(["singerInfo", "songsOfArtist"]),
  loading: state.getIn(["singerInfo", "loading"]),
  // songsCount: state.getIn(["player", "playList"]).size
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));

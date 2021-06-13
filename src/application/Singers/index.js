import React from "react";
import {
  NavContainer,
  ListContainer,
  List,
  ListItem,
  EnterLoading,
} from "./style";
import Horizen from "../../baseUI/horizen-item/index";
import { categoryTypes, alphaTypes } from "../../api/config";
import { connect } from "react-redux";
import {
  getSingerList,
  changeCategory,
  changeAlpha,
  getHotSingerList,
  changeListOffset,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
} from "./store/actionCreators";
import Scroll from "../../baseUI/scroll/index";
import LazyLoad, { forceCheck } from "react-lazyload";
import Loading from "../../baseUI/loading/index";
import { renderRoutes } from "react-router-config";

function Singers(props) {
  return (
    <div className="singers">
      <NavContainer>
        <Horizen title={"分类(默认热门):"}></Horizen>
        <Horizen title={"首字母:"}></Horizen>
      </NavContainer>

      <ListContainer></ListContainer>

      {renderRoutes(props.route.routes)}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    alpha: state.getIn(["singers", "alpha"]),
    category: state.getIn(["singers", "category"]),
    singerList: state.getIn(["singers", "singerList"]),
    enterLoading: state.getIn(["singers", "enterLoading"]),
    pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
    pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
    pageCount: state.getIn(["singers", "pageCount"]),
    // songsCount: state.getIn(["player", "playList"]).size,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    getHotSinger() {
      dispatch(getHotSingerList());
    },
    updateCategory(newVal) {
      dispatch(changeCategory(newVal));
      dispatch(getSingerList());
    },
    updateAlpha(newVal) {
      dispatch(changeAlpha(newVal));
      dispatch(getSingerList());
    },
    // 触底更新
    pullUpRefresh(hot) {
      dispatch(changePullDownLoading(true));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList());
      }
    },
    // 下拉刷新
    pullDownRefresh(category, alpha) {
      dispatch(changePullUpLoading(true));
      if (category || alpha) dispatch(getHotSingerList());
      else dispatch(getSingerList());
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(React.memo(Singers));

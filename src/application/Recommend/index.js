import React, { useEffect } from "react";
import { Content } from "./style";
import { connect } from "react-redux";
import { forceCheck } from "react-lazyload";
import * as actionTypes from "./store/actionCreators";
import Slider from "../../components/slider";
import RecommendList from "../../components/list/";
import Scroll from "../../baseUI/scroll/index";
import Loading from "../../baseUI/loading-v2/index";
import { renderRoutes } from "react-router-config";
import { EnterLoading } from "./../Singers/style";

function Recommend(props) {
  const { songsCount = 0, recommendList, bannerList, enterLoading } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content isPlaying={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div className="rec-container">
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>

      {enterLoading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}

      {renderRoutes(props.route.routes)}
    </Content>
  );
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
  songsCount: state.getIn(["player", "playList"]).size,
  enterLoading: state.getIn(["recommend", "enterLoading"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));

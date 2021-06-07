import React, { useEffect } from "react";
import { Content } from "./style";
import { connect } from "react-redux";
import { forceCheck } from "react-lazyload";
import * as actionTypes from "./store/actionCreators";
import Slider from "../../components/slider";
import Scroll from "../../baseUI/scroll/index";

function Recommend(props) {
  const { songsCount, bannerList } = props;
  const { getBannerDataDispatch } = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];

  return (
    <Content isPlaying={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div className="rec-container">
          <Slider bannerList={bannerListJS}></Slider>
        </div>
      </Scroll>
    </Content>
  );
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));

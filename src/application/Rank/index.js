import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRankList } from "./store";
import Loading from "../../baseUI/loading";
import { List, ListItem, SongList, Container } from "./style";
import Scroll from "../../baseUI/scroll/index";
import { EnterLoading } from "./../Singers/style";
import { filterIndex } from "../../api/utils";
import { renderRoutes } from "react-router-config";

function Rank(props) {
  const { rankList, loading } = props;
  const { getRankListDataDispatch } = props;

  const list = rankList ? rankList.toJS() : [];

  useEffect(() => {
    if (!list.length) {
      getRankListDataDispatch();
    }
  }, []);

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`);
  };

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  const renderRankList = (list, isGlobal) => {
    return (
      <List globalRank={isGlobal}>
        {list.map((item, ind) => {
          return (
            <ListItem
              key={`${item.coverImgId}${ind}`}
              tracks={item.tracks}
              onClick={() => enterDetail(item)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  const globalStartIndex = filterIndex(list);
  const officialList = list.slice(0, globalStartIndex);
  const globalList = list.slice(globalStartIndex);
  const displayStyle = loading ? { display: "none" } : { display: "" };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}

          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
          {loading ? (
            <EnterLoading>
              <Loading></Loading>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(["rank", "rankList"]),
  loading: state.getIn(["rank", "loading"]),
});

const mapDispatchToProps = (dispatch) => ({
  getRankListDataDispatch() {
    dispatch(getRankList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));

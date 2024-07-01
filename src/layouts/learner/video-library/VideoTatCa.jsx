import { classNames } from "primereact/utils";
import styles from "./style/videoLibrary.module.scss";
import ReactPlayer from "react-player";
import { videoService } from "services/videoService";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { LoadingPanel } from "components/loader-ui/LoadingPanel";
import { useListState } from "shared/hooks/useListState";
import "./style/HomeContainer.scss";
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
const VideoTatCa = (props) => {
  const { filterCha } = props;
  const [lstfavoritevideos, handlers] = useListState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLoadmore, setLoadingLoadmore] = useState(false);
  const [visibleMore, setVisibleMore] = useState(false);
  const [filter, setFilter] = useState({
    PageNumber: 1,
    RecordsPerPage: 8,
    SortBy: 'RECENT',
    SeartchText: props.Keysearch,
    orderBy: 'DT_MDFCTN_DT'
  });
  useEffect(() => {
    let _filter = { ...filter }
    _filter = { ...filter, SortBy: filterCha, PageNumber: 1 };
    setFilter(_filter)
    // call api here
    loadApi(_filter);
  }, [filterCha, props.check, props.Keysearch, props.onReset]);

  const loadApi = async (value) => {
    //
    setLoading(true);
    value.SeartchText = props.Keysearch
    let result2 = await videoService.getfavoritevideosall(value);
    handlers.setState(result2.data.VideoDetailList);
    if (result2.data.TotalRecords > result2.data.RecordsPerPage && result2.data.VideoDetailList.length == 8) {
      setVisibleMore(true);
    }
    else {
      setVisibleMore(false);
    }
    setLoading(false);
  };

  const clickTitle = (item) => {
    props.onClickTitle(item);
  };
  const onShowMore = async () => {
    setLoadingLoadmore(true);
    filter.PageNumber++;
    setFilter(filter);
    let result = await videoService.getfavoritevideosall(filter);
    if (
      result.data.TotalRecords <=
      result.data.RecordsPerPage * result.data.PageNumber
    ) {
      setVisibleMore(false);
    }

    if (result.data.VideoDetailList.length > 0) {
      result.data.VideoDetailList.forEach((element) => {
        handlers.append(element);
      });
    }
    setLoadingLoadmore(false);
  };
  const defaultImg = window.location.origin + "/images/screenshot_1a.png";
  const handleImageError = (event) => {
    event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
  };
  const lstVideoTatCa = () => {
    return lstfavoritevideos.map((dataItem, index) => {
      return (
        <div
          style={{ width: "188px", padding: "5px" }}
          key={index}
          className={classNames(
            " d-flex flex-column justify-content-between mr-2 mb-2",
            styles.colWrapper
          )}
        >
          <div className="">
            <div>
              <div
                className={classNames("card-img-top", styles.playerWrapper)}
                onClick={() => clickTitle(dataItem)}
              >
                <ReactPlayer
                  url={appSetting.ADMIN_URL + dataItem?.URLAttachment}
                  className="image-play"
                  light={
                    <img
                      src={
                        dataItem.VideoThumbnailUrl != ""
                          ? dataItem?.VideoThumbnailUrl.substring(2)
                          : defaultImg
                      }
                      onError={handleImageError}
                      alt="Thumbnail"
                      style={{ width: "100%", height: "100%" }}
                    />
                  }
                  width="100%"
                  height="100%"
                  pip={true}
                  playing={false}
                  controls={true}
                  loop={true}
                  volume={true}
                  muted={false}
                ></ReactPlayer>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: "-26px" }}
              >
                {dataItem.IsFavourite == false ? (
                  <i
                    style={{
                      color: "red",
                      position: "relative",
                      top: "8px",
                      right: "-5px",
                    }}
                    className="fa-regular fa-heart"
                  ></i>
                ) : (
                  <i
                    style={{
                      color: "red",
                      position: "relative",
                      top: "8px",
                      right: "-5px",
                    }}
                    className="fa-solid fa-heart"
                  ></i>
                )}

                <span
                  style={{
                    position: "relative",
                    zIndex: "9",
                    top: "5px",
                    right: "5px",
                    color: "#fff",
                    background: 'black',
                    borderRadius: 5,
                  }}
                >
                  {dataItem.VideoDuration}
                </span>
              </div>
            </div>

            <div className="p-2" style={{ border: "1px solid #ccc" }}>
              <div
                onClick={() => clickTitle(dataItem)}
                className=""
                style={{
                  cursor: "pointer",
                  width: "150px",
                  fontSize: "14px",
                  fontWeight: "700",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={dataItem?.VideoTitle}
              >
                {dataItem?.VideoTitle}
              </div>
              <div
                style={{
                  width: "168px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginBottom: "10px",
                }}
                className="fsx-11px"
                title={dataItem.username}
              >
                Bởi {dataItem.username}
              </div>

              <div className="d-flex justify-content-between">
                <span className="fsx-11px">{dataItem.ViewCount} Lượt xem</span>
                <div title={"Đã xem"} className="fsx-11px">
                  {dataItem?.TimeDuration}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  // const filterItems = [
  //   {
  //     value: "RECENT",
  //     text: "Gần đây",
  //   },
  //   {
  //     value: "NAMEASC",
  //     text: "A đến Z",
  //   },
  //   {
  //     value: "NAMEDESC",
  //     text: "Z đến A",
  //   },
  // ];
  return (
    <div style={{ paddingTop: "40px" }}>
      <div style={{ alignItems: "center" }} className="div_yeu">
        <div className="title_yeuthich">Tất cả video</div>
        {/* <div className="d-flex justify-content-end ">
          <div className="d-flex flex-row">
            <div className={classNames("dropdown", styles.sortdropdown)}>
              <DropdownFilter items={filterItems} onChange={onChangeFilter} />
            </div>
          </div>
        </div> */}
      </div>

      <div className=" ">
        <div class="card-deck">
          <LoadingPanel loading={loading}>{lstVideoTatCa()}</LoadingPanel>
        </div>
      </div>
      <div>
        {lstfavoritevideos.length == 0 ? (
          <span className="mt-3">Không có mục nào để hiển thị.</span>
        ) : (
          ""
        )}
        {visibleMore && (
          <div
            className="d-flex justify-content-end"
            style={{ right: "20px", left: "20px" }}
          >
            <Button
              className="btn-showmore"
              label="Xem nhiều hơn"
              loading={loadingLoadmore}
              onClick={onShowMore}
              style={{
                backgroundColor: "white",
                color: "#1aa1dc",
                borderColor: "white",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default VideoTatCa;

import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { classNames } from "primereact/utils";
import styles from "./style/AvailableChannel.scss";
import "./style/AvailableChannel.scss";
import { LoadingPanel } from "components/loader-ui/LoadingPanel";
import React, { useEffect, useState, useRef } from "react";
import { videoService } from "services/videoService";
import { Paginator } from "primereact/paginator";
import Image from "components/Image";
import AvailableChannelListChannel from "./AvailableChannelListChannel";
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
import DetailVideo from "./detailVideo/detailVideo";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { confirmDialogGlobal } from "shared/components/confirmDialogGlobal";
import { useDispatch } from "react-redux";
import { setListChannel } from "store/listchannel/listChannelSlice";
import { InputText } from "primereact/inputtext";
import ReactPlayer from "react-player";
import { useQuery } from "shared/hooks/useQuery";

const VideoChannelAll = (props) => {
  let query = useQuery();
  let ChannelId = query.get('ChannelId');
  const [keySearch, setKeysearch] = useState('');

  const [filterBy1, setfilterBy1] = useState({
    PageNumber: 1,
    RecordsPerPage: 10,
    SortBy: "RECENT",
    ChannelId: ChannelId,
    SeartchText: keySearch
  });
  const filterItems = [
    {
      value: "RECENT",
      text: "Gần đây",
    },
    {
      value: "NAMEASC",
      text: "A đến Z",
    },
    {
      value: "NAMEDESC",
      text: "Z đến A",
    },
  ];
  const [infoChannel, setInfoChannel] = useState([]);
  const [video, setVideo] = useState([]);
  const [visibleMore, setVisibleMore] = useState(true);
  const [isSubcribe, setIsSubcribe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    loadApi(filterBy1);
  }, [filterBy1]);

  const loadApi = async () => {
    setLoading(true);
    let result = await videoService.getavailablechannelitem(value);
    setInfoChannel(result.data.ChannelList[0]);
    setVideo(result.data.ChannelList[0].VideoDetailList);

    //showMoreBtn
    if (result.data.TotalRecords > result.data.RecordsPerPage) {
      setVisibleMore(true);
    }
    if (
      result.data.TotalRecords <= result.data.RecordsPerPage ||
      result.data.PageNumber * result.data.RecordsPerPage >=
      result.data.totalRecords
    ) {
      setVisibleMore(false);
    }
    setLoading(false);
  };

  const onChangeFilterInChannel = (item) => {
    setfilterBy1({ ...filterBy1, SortBy: item.value, PageNumber: 1 });
  };

  const btnUnSubcribeChannel = () => {
    confirmDialogGlobal({
      message: "Bạn có chắc chắn muốn hủy đăng ký kênh này không? ",
      accept: () => unSubcribeChannel(),
    });
  };
  const unSubcribeChannel = async () => {
    var param = {
      ChannelId: props.idChannel,
    };
    const param1 = {
      "SortBy": "RECENT",
    }
    await videoService.subscribeunsubcribechannel(param);
    setIsSubcribe(false);
    let result4 = await videoService.getchannelnamelist(param1);
    dispatch(setListChannel(result4.data.channelLst));
  };
  const subcribeChannel = async () => {
    const param = {
      ChannelId: props.idChannel,
    };
    const param1 = {
      "SortBy": "RECENT",
    }
    await videoService.subscribeunsubcribechannel(param);
    setIsSubcribe(true);
    let result4 = await videoService.getchannelnamelist(param1);
    dispatch(setListChannel(result4.data.channelLst));
  };

  const onShowMore = async () => {
    let videoTemp;
    filterBy1.PageNumber++;
    setfilterBy1(filterBy1);

    let result = await videoService.videolibrarysubscribedvideolist(filterBy1);
    if (result.data.VideoDetailList.length > 0) {
      videoTemp = [...video, ...result.data.VideoDetailList];
      setVideo(videoTemp);
    }
    if (
      result.data.TotalRecords <= result.data.RecordsPerPage ||
      result.data.PageNumber * result.data.RecordsPerPage >=
      result.data.TotalRecords
    ) {
      setVisibleMore(false);
    }
  };

  const [dataItem, setDataItem] = useState({});
  const closeDetail = async () => {
    setVisibleRight(false);
    loadApi(filterBy1);
  };
  const clickTitle = (item) => {
    setVisibleRight(true);
    setDataItem(item);
  };
  const defaultImg = window.location.origin + "/images/screenshot_1a.png";
  const handleImageError = (event) => {
    event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
  };
  function keyDown(e) {
    if (e.key == 'Enter') {
      let newText = e.target.value.trim()
      setKeysearch(newText);
    }
  }
  const [ChangeText, onChangeText] = useState("");
  function onKeySearchChange() {
    let newText = ChangeText
    setKeysearch(newText);
  }
  return (
    <>
      <div className="mb-5">
        <div className="d-flex flex-row">
          <div className="d-flex flex-column mainText1">

            <div>
              <div>
                <span style={{ fontWeight: '700', fontSize: '14px', textTransform: 'uppercase' }}>Đăng ký của tôi</span>
              </div>
              <div style={{
                float: 'left',
                width: '130px',
                height: '4px',
                background: '#f36464',
              }}></div>
            </div>
          </div>
          <div style={{ width: "69%", marginTop: -5 }}>
            <div
              className="p-input-icon-right justify-content-end "
              style={{ float: "right" }}
            >
              <InputText
                onKeyDown={(e) => keyDown(e)}
                onChange={(e) => onChangeText(e.target.value)}
                placeholder="Nhập từ khóa tìm kiếm"
                style={{ width: "250px" }}
              />
              <Button
                style={{ padding: 12, border: 0, color: "black" }}
                onClick={(e) => onKeySearchChange()}
                className="pi pi-search"
              />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className={classNames("dropdown", styles.sortdropdown)}>
              <DropdownFilter
                items={filterItems}
                onChange={onChangeFilterInChannel}
              />
            </div>
          </div>

        </div>
        <div style={{ display: 'flex', margin: '30px 0' }}>
          <div>
            <Image src={infoChannel.ChannelImage} style={{ width: '80px', height: '80px' }}></Image>
          </div>
          <div style={{ width: '70%', display: 'block', marginLeft: '10px' }}>

            <div style={{ fontWeight: '700', fontSize: '18px' }}>{infoChannel.ChannelTitle}</div>
            <div style={{ color: '#c2c2a3' }}>
              Bởi {infoChannel.UserName}, {infoChannel.ChannelDuration}
            </div>
            <div>{infoChannel.ChannelDescription}</div>
          </div>

          <div className=" " style={{ width: "300px", marginTop: '20px' }}>
            <div className="d-flex flex-column btn-group mb-sm pull-right">
              {isSubcribe == false ? (
                <a className="btnSubcribe" onClick={() => subcribeChannel()}>
                  Đăng ký
                </a>
              ) : (
                <a
                  className="btnSubcribe"
                  onClick={() => btnUnSubcribeChannel()}
                >
                  Hủy đăng ký
                </a>
              )}
              <div className="subs-count" style={{ marginTop: '10px' }}>
                {infoChannel.TotalChannelSubscriber} Người dùng đã đăng ký
              </div>
            </div>
          </div>
        </div>



        <div
          className={classNames(
            "flex-row d-flex justify-content-end",
            styles.titleHead
          )}
        >

        </div>

        <div className="break-line" />
        <LoadingPanel loading={loading}>
          {video?.map((item, index) => {
            return (
              <div
                key={index}
                className="d-flex flex-row"
                style={{
                  border: "1px solid #dddddd",
                  marginBottom: "16px",
                  marginLeft: "0.1rem",
                }}
              >
                <div
                  className="col-md-4"
                  style={{
                    width: "380px",
                    height: "200px",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    cursor: "pointer",
                  }}
                  onClick={() => clickTitle(item)}
                >
                  <ReactPlayer
                    url={appSetting.ADMIN_URL + item?.URLAttachment}
                    className="image-play"
                    light={
                      <img
                        src={
                          item?.VideoThumbnailUrl != ""
                            ? item.VideoThumbnailUrl.substring(2)
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

                  <div className="d-flex justify-content-between">
                    {item.IsFavourite == false ? (
                      <i
                        style={{
                          color: "red",
                          position: "relative",
                          top: "-17px",
                          right: "-5px",
                        }}
                        className="fa-regular fa-heart"
                      ></i>
                    ) : (
                      <i
                        style={{
                          color: "red",
                          position: "relative",
                          top: "-17px",
                          right: "-5px",
                        }}
                        className="fa-solid fa-heart"
                      ></i>
                    )}

                    <span
                      style={{
                        position: "relative",
                        zIndex: "9",
                        top: "-22px",
                        right: "5px",
                        color: "#fff",
                        background: "black",
                        borderRadius: 5,
                      }}
                    >
                      {item.VideoDuration}
                    </span>
                  </div>
                </div>

                <div
                  className="d-flex flex-column justify-content-between "
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderLeft: "1px solid #DDDDDD",
                  }}
                >
                  <div className="d-flex flex-column">
                    <div
                      className="videoTitle"
                      style={{ cursor: "pointer" }}
                      onClick={() => clickTitle(item)}
                    >
                      {item.VideoTitle}
                    </div>
                    <div
                      className="videoDesc"
                      dangerouslySetInnerHTML={{
                        __html: item.VideoDescription,
                      }}
                    ></div>
                  </div>

                  <div className="videoViewCount" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {item.ViewCount} Lượt xem | {item.TimeDuration}
                    <div>
                      <span>Được ra mắt vào ngày: {item.ChannelCreationDate}</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

          {visibleMore && (
            <div className="loadMoreBtn">
              <a onClick={() => onShowMore()}>Hiển thị thêm</a>
            </div>
          )}
        </LoadingPanel>
      </div>
      <Sidebar
        className="sidebar-header-none"
        visible={visibleRight}
        onHide={() => closeDetail()}
        position="right"
        style={{ width: "70%" }}
      >
        {
          <>
            <Button
              style={{ position: "absolute", right: "10px", zIndex: "9" }}
              icon="pi pi-times"
              className="p-button-rounded p-button-secondary p-button-text"
              aria-label="Cancel"
              onClick={() => closeDetail()}
            />
            <DetailVideo dataObj={dataItem} version="v1" />
          </>
        }
      </Sidebar>
    </>
  );
};
export default VideoChannelAll;

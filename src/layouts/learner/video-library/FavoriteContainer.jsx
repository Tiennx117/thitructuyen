import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import styles from "./style/videoLibrary.module.scss";
import { LoadingPanel } from "components/loader-ui/LoadingPanel";
import MyUploadForm from "./MyUploadForm";
import ReactPlayer from "react-player";
import { Sidebar } from "primereact/sidebar";
import { Paginator } from "primereact/paginator";
import React, { useEffect, useState, useRef } from "react";
import { videoService } from "services/videoService";
import DetailVideo from "./detailVideo/detailVideo";
import { getCurrentUserDefault } from "shared/utils/getCurrentUserDefault";
import "./style/HistoryVideo.scss";
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
import { InputText } from "primereact/inputtext";
const FavoriteContainer = () => {
  const userDefault = getCurrentUserDefault();
  const { t } = useTranslation();
  const [Keysearch, setKeysearch] = useState("");
  const [video, setvideo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openform, setopenform] = useState(false);
  const [filterBy1, setfilterBy1] = useState({
    PageNumber: 1,
    RecordsPerPage: 8,
    SortBy: "RECENT",
    SearchText: "",
  });
  const [visibleRight, setVisibleRight] = useState(false);
  const [basicFirst, setBasicFirst] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [dataItem, setDataItem] = useState({});
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
  const onChangeFilter = (item) => {
    setfilterBy1({ ...filterBy1, SortBy: item.value, PageNumber: 1 });
  };

  useEffect(() => {
    // call api here
    let _filter = { ...filterBy1 }
    _filter = { ...filterBy1, PageNumber: 1 };
    loadApi(_filter);
  }, [filterBy1, Keysearch]);


  const loadApi = async (filterBy1) => {
    setLoading(true);
    const params = {
      UserID: userDefault.UserId,
      PageNumber: filterBy1.PageNumber,
      RecordsPerPage: filterBy1.RecordsPerPage,
      SortBy: filterBy1.SortBy,
      SeartchText: Keysearch
    };
    let result = await videoService.getfavoritevideos(params);
    setTotalRecords(result.data?.VideoDetailList.length);

    setvideo(result.data?.VideoDetailList);
    if (result.data.TotalRecords > result.data.RecordsPerPage && result.data.VideoDetailList.length == 8) {
      setVisibleMore(true);
    }
    else {
      setVisibleMore(false);
    }
    setLoading(false);
  };
  const closeDetail = async () => {
    let _filterBy1 = { ...filterBy1, PageNumber: 1 }
    setfilterBy1(_filterBy1);
    setVisibleRight(false);
    // loadApi(_filterBy1);
  };
  function keyDown(e) {
    if (e.key == 'Enter') {
      let newText = e.target.value.trim()
      setKeysearch(newText);
    }
  }
  function onKeySearchChange() {
    let newText = ChangeText
    setKeysearch(newText);
  }
  const [ChangeText, onChangeText] = useState("");

  const clickTitle = (item) => {
    setVisibleRight(true);
    setDataItem(item);
  };
  const [visibleMore, setVisibleMore] = useState(false);
  const onShowMore = async () => {
    let videoTemp;
    filterBy1.PageNumber++;
    setfilterBy1(filterBy1);
    const params = {
      UserID: userDefault.UserId,
      PageNumber: filterBy1.PageNumber,
      RecordsPerPage: filterBy1.RecordsPerPage,
      SortBy: filterBy1.SortBy,
    };
    let result = await videoService.getfavoritevideos(params);
    if (result.data.VideoDetailList.length > 0) {
      videoTemp = [...video, ...result.data.VideoDetailList];
      setvideo(videoTemp);
    }
    if (
      result.data.TotalRecords <= result.data.RecordsPerPage ||
      result.data.PageNumber * result.data.RecordsPerPage >=
      result.data.TotalRecords
    ) {
      setVisibleMore(false);
    }
  };


  const defaultImg = window.location.origin + "/images/screenshot_1a.png";
  const handleImageError = (event) => {
    event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
  };

  const rendervideo = () => {
    return video.map((dataItem, index) => {
      return (
        <>
          <div
            key={index}
            className={classNames("col", styles.colWrapper)}
            style={{ maxWidth: '200px' }}
          >
            <div className="card h-90">
              <div>
                <div
                  className={classNames(
                    "card-img-top",
                    styles.playerWrapper
                  )}
                  onClick={() => clickTitle(dataItem)}
                >
                  <ReactPlayer
                    className="image-play"
                    url={appSetting.ADMIN_URL + dataItem?.URLAttachment}
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

              <div className="p-2" style={{ border: "1px solid #ccc", marginTop: 5 }}>
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
                  <span className="fsx-11px">
                    {dataItem.ViewCount} Lượt xem
                  </span>
                  <div title={"Đã xem"} className="fsx-11px">
                    {dataItem?.TimeDuration}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <>
      <Card className={styles.uploadContainer}>
        <div className="d-flex flex-row justify-content-between">
          <b
            style={{
              color: "black",
              fontSize: "16px",
              fontWeight: "700",
              paddingBottom: "8px",
              width: '250px'
            }}
          >
            YÊU THÍCH
          </b>
          <span
            style={{
              top: "57px",
              float: "left",
              width: "90px",
              height: "4px",
              background: "#f36464",
              position: 'absolute'
            }}
          ></span>
          <div style={{ width: '100%' }}>
            <div className="p-input-icon-right">
              <div className="col-12 md:col-4">
                <div className="p-inputgroup">
                  <InputText
                    onKeyDown={(e) => keyDown(e)}
                    onChange={(e) => onChangeText(e.target.value)}
                    placeholder="Nhập từ khóa tìm kiếm"
                    style={{ width: "400px" }}
                  />
                  <Button
                    style={{ padding: 12, border: 0, color: 'black', background: '#ebebeb' }}
                    onClick={(e) => onKeySearchChange()}
                  >
                    <i style={{ fontWeight: '700' }} className="pi pi-search"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className={classNames("dropdown", styles.sortdropdown)}>
              <DropdownFilter items={filterItems} onChange={onChangeFilter} />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="card mb-3" style={{ marginLeft: '-6px' }}>
            <div className="d-flex flex-row justify-content-start flex-wrap" style={{ flexWrap: 'wrap !important' }}>
              <LoadingPanel loading={loading}> {rendervideo()}</LoadingPanel>
            </div>
          </div>
        </div>
        {/* <div>
                    <Paginator first={basicFirst}
                        rows={filterBy1.RecordsPerPage}
                        totalRecords={totalRecords}
                        onPageChange={onBasicPageChange}></Paginator>
                </div> */}
        {visibleMore && (
          <div className="loadMoreBtn">
            <a style={{ cursor: "pointer" }} onClick={() => onShowMore()}>Hiển thị thêm</a>
          </div>
        )}
      </Card>
      <MyUploadForm
        openform={openform}
        onChange={(data) => {
          setopenform(data);
          loadApi(filterBy1);
        }}
      />
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
export default FavoriteContainer;

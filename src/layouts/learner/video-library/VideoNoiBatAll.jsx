import React, { useState, useEffect, useRef } from 'react';
import { Card } from "primereact/card";
import { learnerService } from 'services/learnerService';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import DropdownFilter from '../my-learning/DropdownFilter';
import { videoService } from "services/videoService";
import { classNames } from 'primereact/utils';
import styles from './style/videoLibrary.module.scss';
import ReactPlayer from 'react-player'
import DetailVideo from "./detailVideo/detailVideo";
import '../components/style/catalogue.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function VideoNoiBatAll(props) {

  const [totalRecords, setTotalRecords] = useState(0)
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [loadingLoadmore, setLoadingLoadmore] = useState(false);
  const [keySearch, setKeysearch] = useState('')
  const [dataItem, setdataItem] = useState([])
  const [visibleRight, setVisibleRight] = useState(false);
  const [lstfavoritevideos, setlstfavoritevideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleMore, setVisibleMore] = useState(true);
  const defaultImg = window.location.origin + '/images/screenshot_1a.png';
  const handleImageError = (event) => {
    event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
  };



  function closeDetail() {
    setVisibleRight(false);
    loadApi(filterBy1);
  }

  const clickTitle = (dataItem) => {
    setdataItem(dataItem);
    setVisibleRight(true);
  }

  const lstVideoNoiBat = () => {
    return (
      lstfavoritevideos.map((dataItem, index) => {
        return (
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
        );
      })
    )
  }
  const [filterBy1, setfilterBy1] = useState({
    PageNumber: 1,
    RecordsPerPage: 10,
    SortBy: "RECENT",
    SeartchText: keySearch
  });

  useEffect(() => {
    // call api here
    loadApi(filterBy1);
  }, [filterBy1]);

  const loadApi = async (value) => {
    let result2 = await videoService.getfavoritevideosNoiBat(value);
    setlstfavoritevideos(result2.data.VideoDetailList);
    setTotalRecords(result2.data.TotalRecords)
    if (result2.data.VideoDetailList.length == result2.data.TotalRecords) {
      setVisibleMore(false);
    }
  }

  const filterItems = [
    {
      value: 'Recent',
      text: 'Gần đây'
    },
    {
      value: 'NAMEASC',
      text: 'A đến Z'
    },
    {
      value: 'NAMEDESC',
      text: 'Z đến A'
    },
    {
      value: 'EXPIRY',
      text: 'Ngày hết hạn'
    }
  ]

  const onChangeFilter = (item) => {
    setfilterBy1({ ...filterBy1, SortBy: item.value, PageNumber: 1 });
    setVisibleMore(true);
  }

  function keyDown(e) {
    if (e.key == 'Enter') {
      let result = e.target.value.trim()
      setfilterBy1({ ...filterBy1, SeartchText: result, PageNumber: 1 });
      setVisibleMore(true);
    }
  }

  function onKeySearchChange(text) {
    let result = text.trim();
    setKeysearch(result);
  }



  const onShowMore = async () => {
    debugger;
    setLoadingLoadmore(true);
    filterBy1.PageNumber++;
    filterBy1.SeartchText = keySearch;
    let result = await videoService.getfavoritevideosNoiBat(filterBy1);

    if (result.data.VideoDetailList.length > 0) {
      let _lstfavoritevideos = [...lstfavoritevideos];
      _lstfavoritevideos = [..._lstfavoritevideos, ...result.data.VideoDetailList];
      setlstfavoritevideos(_lstfavoritevideos);
      if (_lstfavoritevideos.length == totalRecords) {
        setVisibleMore(false);
      }
    }
    setLoadingLoadmore(false);
  }


  return (
    <>
      <div className="my-learning-container mt-2" style={{ backgroundColor: 'white' }}>
        <div className='d-flex justify-content-between'>
          <div style={{ position: 'relative', marginLeft: '2rem', marginTop: '10px' }}>
            <b className='font-size-tieude' style={{ color: 'black', marginTop: '1rem' }}>XEM TẤT CẢ</b>
            <span className='bottom-title-learning' style={{ width: '100px' }}></span>
          </div>
          <span className='d-flex justify-content-end' >
            {
              visibleSearch == false ?
                <p className='d-flex flex-row justify-content-end border-end' style={{ marginRight: '10px', marginTop: '10px' }}>
                  <span className='font-size-tieude d-flex align-self-center'>
                    BỞI
                  </span>
                  <div style={{ width: '100px', marginRight: '40px' }}>
                    <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                  </div>
                </p>
                :
                ''
            }

            <p className='d-flex flex-row justify-content-end' style={{ marginRight: '10px', marginTop: '10px' }}>
              <span className="p-inputgroup">
                {
                  visibleSearch == true ?
                    <div className='p-input-icon-right'>
                      <i className="pi pi-times" onClick={() => setVisibleSearch(false)} />
                      <InputText className='search-all' onKeyDown={(e) => keyDown(e)} onChange={(e) => onKeySearchChange(e.target.value)} visible={visibleSearch} onHide={() => setVisibleSearch(false)} placeholder="Nhập tìm kiếm theo Tên / Mô tả / Chủ đề / Từ khoá / Mã khoá học" />
                    </div>
                    :
                    ''
                }
                {
                  visibleSearch == false ?
                    <i className=" fa-sharp fa-solid fa-magnifying-glass align-self-center mr-2" type='button' onClick={() => setVisibleSearch(true)}></i>
                    :
                    ''
                }

              </span>
            </p>
          </span>
        </div>
        <LoadingPanel loading={loading} >
          <Card style={{ boxShadow: 'none', height: 'calc(100vh - 300px)' }} title=
            {
              <div className='d-flex flex-row justify-content-between header-fix' >
                <span className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 12, textTransform: 'uppercase' }}>video nổi bật</span>
                <span className='d-flex flex-column align-self-center justify-content-end mr-3' >
                  <Link to={'/learner/video-library'} style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} className='fsx-10px text-uppercase'> Quay lại </Link>
                </span>
              </div>
            }
            className='ml-2 mr-2 overflow-y-auto' >
            <div className="d-flex flex-row justify-content-start flex-wrap" style={{ flexWrap: 'wrap !important', marginLeft: '30px' }}>
              {lstVideoNoiBat()}
            </div>
            {
              visibleMore &&
              <div className="d-flex justify-content-end" style={{ right: '20px', left: '20px' }}>
                <Button className='btn-showmore' label="Xem nhiều hơn" loading={loadingLoadmore} onClick={onShowMore} style={{ backgroundColor: 'white', color: '#1aa1dc', borderColor: 'white' }} />
              </div>
            }
          </Card>
        </LoadingPanel>

        <Sidebar
          className="sidebar-header-none"
          visible={visibleRight}
          onHide={() => {
            closeDetail(), setcheck(true);
          }}
          position="right"
          style={{ width: "70%" }}
        >
          {
            <>
              <Button
                style={{ position: "absolute", right: "0" }}
                icon="pi pi-times"
                className="p-button-rounded p-button-secondary p-button-text"
                aria-label="Cancel"
                onClick={() => {
                  closeDetail(), setcheck(true);
                }}
              />
              <DetailVideo dataObj={dataItem} version="v1" />
            </>
          }
        </Sidebar>
      </div>
    </>
  )
}
export default VideoNoiBatAll;
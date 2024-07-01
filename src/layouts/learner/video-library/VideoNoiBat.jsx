import { classNames } from 'primereact/utils';
import styles from './style/videoLibrary.module.scss';
import ReactPlayer from 'react-player'
import { videoService } from "services/videoService";
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { SliderSlick as Slider } from "components/ReactSlickSlider/SliderSlick";
import './style/HomeContainer.scss';
const VideoNoiBat = (props) => {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lstfavoritevideos, setlstfavoritevideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [check, setcheck] = useState(props.check);
  const [filterBy1, setfilterBy1] = useState({
    PageNumber: 1,
    RecordsPerPage: 10,
    SortBy: "ASC",
    SeartchText: props.Keysearch
  });
  const slider00 = useRef(null);




  let settingsCourse = {
    slideIndex: 0,
    dots: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite: false,
    //variableWidth: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {

          slidesToShow: 3,
          slidesToScroll: 2,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true
        }
      }
    ]
  };
  useEffect(() => {
    // call api here
    loadApi(filterBy1);
  }, [filterBy1, props.check, props.Keysearch, props.onReset]);


  const loadApi = async (value) => {
    setLoading(true)
    value.SeartchText = props.Keysearch
    let result2 = await videoService.getfavoritevideosNoiBat(value);
    setlstfavoritevideos(result2.data.VideoDetailList);
    setLoading(false);

  }

  const clickTitle = (item) => {
    props.onClickTitle(item);
  }
  const defaultImg = window.location.origin + '/images/Screenshot_1a.png';
  const handleImageError = (event) => {
    event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
  };

  const lstVideoNoiBat = () => {
    return (
      lstfavoritevideos.map((dataItem, index) => {
        return (
          <div
            key={index}
            className={classNames("col", styles.colWrapper)}
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

  // next trang từ đây
  useEffect(() => {
    if (slider00.current) {
      setIsLastSlide(currentSlide === 2 || currentSlide === 6 ? true : false);
    }
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (slider00.current && currentSlide < slider00.current.props.children.length - 1) {
      slider00.current.slickNext();
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0 && slider00.current) {
      slider00.current.slickPrev();
      setCurrentSlide(currentSlide - 1);
    }
  }
  // đến đây

  // function onSlickNext() {
  //   debugger;
  //   slider00.current.slickNext();
  // }

  // function onSlickPrev() {

  //   slider00.current.slickPrev();

  // }

  return (
    <div>
      <div className="div_yeu">
        <div className="title_yeuthich">Video nổi bật</div>
        <div className='d-flex justify-content-end mr-5'>
          <Button disabled={currentSlide == 0} onClick={() => handlePrevSlide()} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
          <Button disabled={isLastSlide} onClick={() => handleNextSlide()} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
          {/* <Button onClick={handlePrevSlide} style={{ height: '20px', width: '20px' }} disabled={currentSlide === 0}>
            <i className="pi pi-arrow-left"></i>
          </Button>
          <Button onClick={handleNextSlide} style={{ height: '20px', width: '20px' }} disabled={isLastSlide}>
            <i className="pi pi-arrow-right"></i>
          </Button> */}
        </div>
      </div>

      <div>
        <LoadingPanel loading={loading}>
          <Slider afterChange={(current) => setCurrentSlide(current)} ref={slider00} {...settingsCourse} style={{ display: 'flex', with: "100%" }}>
            {lstVideoNoiBat()}
          </Slider>
        </LoadingPanel>
      </div>
    </div>
  )
}
export default VideoNoiBat;
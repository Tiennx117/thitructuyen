import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import styles from './style/videoLibrary.module.scss';
import ReactPlayer from 'react-player'
import { videoService } from "services/videoService";
import React, { useEffect, useState, useRef } from 'react';
import './style/HomeContainer.scss';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { SliderSlick as Slider } from "components/ReactSlickSlider/SliderSlick";
const VideoTopChannel = (props) => {
    const [topchannelslst, settopchannelslst] = useState([]);
    const [visibleRight, setVisibleRight] = useState(false);
    const [dataItem, setDataItem] = useState({})
    const [loading, setLoading] = useState(false);
    const [filterBy1, setfilterBy1] = useState({
        PageNumber: 1,
        RecordsPerPage: 10,
        SortBy: "RECENT",
    });
    const [totalChanel, settotalChanel] = useState(0);
    const slider00 = useRef([]);
    //const[filter,setfilter]=useState('Gần đây')
    useEffect(() => {
        // call api here
        loadApi(filterBy1);
    }, [filterBy1]);

    const loadApi = async (value) => {
        //
        setLoading(true)
        let result3 = await videoService.gettopchannels(value);
        settopchannelslst(result3.data.ChannelList);
        settotalChanel(result3.data.ChannelList.length);
        setLoading(false);

    }
    const rendertime = (value) => {
        let countDownDate = new Date(value).getTime();
        let now = new Date().getTime();
        let distance = now - countDownDate;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24))
        return days
    }
    const clickTitle = (item) => {
        props.onClickTitle(item);
    }
    function onSlickNext(x) {
        slider00.current[x].slickNext();
    }

    function onSlickPrev(x) {
        slider00.current[x].slickPrev();

    }

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
    const defaultImg = window.location.origin + '/images/screenshot_1a.png';
    const handleImageError = (event) => {
        event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
    };

    const videoTop = () => {
        return (
            props.lstvideo && props.lstvideo.map((dataItem, index) => {
                return (
                    <div key={index} className='w-100'>
                        <div className="div_yeu" style={{ width: "100%" }}>
                            <div style={{ cursor: "pointer", color: "#1AA1DC " }} onClick={() => props.clickTitleChanel(dataItem)} className="title_yeuthich">{dataItem.ChannelTitle}</div>
                            <div className='d-flex justify-content-end mr-5'>
                                <Button onClick={() => onSlickPrev(index)} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                                <Button onClick={() => onSlickNext(index)} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
                            </div>
                        </div>
                        <div className='mt-3 ' >
                            <Slider ref={el => slider00.current[index] = el} {...settingsCourse}>
                                {
                                    dataItem.VideoDetailList.map((item, idx) => {
                                        return (
                                            <div key={idx} className={classNames("col", styles.colWrapper)} style={{ marginBottom: "0px" }} >
                                                <div className="card h-90">
                                                    <div>
                                                        <div className={classNames("card-img-top", styles.playerWrapper)} onClick={() => clickTitle(item)} >
                                                            <ReactPlayer
                                                                url={appSetting.ADMIN_URL + item?.URLAttachment}
                                                                light={<img src={item.VideoThumbnailUrl != "" ? item?.VideoThumbnailUrl.substring(2) : defaultImg} onError={handleImageError} alt='Thumbnail' style={{ width: '100%', height: '100%' }} />}

                                                                width='100%'
                                                                height='100%'
                                                                pip={true}
                                                                playing={false}
                                                                controls={true}
                                                                loop={true}
                                                                volume={true}
                                                                muted={false}>
                                                            </ReactPlayer>
                                                        </div>
                                                        <div className='d-flex justify-content-between' style={{ marginTop: "-26px" }}>
                                                            {item.IsFavourite == false ?
                                                                <i style={{ color: "red", position: "relative", top: '8px', right: '-5px' }} className="fa-regular fa-heart"></i>
                                                                :
                                                                <i style={{ color: "red", position: "relative", top: '8px', right: '-5px' }} className="fa-solid fa-heart"></i>
                                                            }

                                                            <span style={{ position: "relative", zIndex: "9", top: "5px", right: "5px", color: 'black' }}>{item.VideoDuration}</span>
                                                        </div>
                                                    </div>
                                                    <div className="p-2" style={{ border: '1px solid #ccc' }}>
                                                        <div onClick={() => clickTitle(item)} className="" style={{
                                                            cursor: "pointer", width: "150px", fontSize: '14px', fontWeight: '700',
                                                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                                                        }} title={item?.VideoTitle}>
                                                            {item?.VideoTitle}
                                                        </div>
                                                        <div
                                                            style={{ width: "168px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: '10px' }} className='fsx-11px' title={item.username}>
                                                            Bởi {item.username}

                                                        </div>
                                                        <div className='d-flex justify-content-between'>
                                                            <span className='fsx-11px'>{item.ViewCount} Lượt xem</span>
                                                            <span className='fsx-11px'>{(item?.TimeDuration)}</span>
                                                        </div>
                                                    </div>



                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>

                        </div>

                        <hr style={{ marginTop: "40px" }} />
                    </div >
                )
            })
        )
    }
    return (
        <div >
            <LoadingPanel loading={loading}>
                {videoTop()}
            </LoadingPanel>
        </div>
    )
}
export default VideoTopChannel;
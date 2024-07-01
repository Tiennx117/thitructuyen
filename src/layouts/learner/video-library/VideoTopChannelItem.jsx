import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import styles from './style/videoLibrary.module.scss';
import ReactPlayer from 'react-player'
import { videoService } from "services/videoService";
import React, { useEffect, useState, useRef } from 'react';
import './style/HomeContainer.scss';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { SliderSlick as Slider } from "components/ReactSlickSlider/SliderSlick";
const VideoTopChannelItem = (props) => {
    const [videoTopChanel, setvideoTopChanel] = useState([]);
    const [visibleRight, setVisibleRight] = useState(false);
    const [dataItem, setDataItem] = useState({})
    const [loading, setLoading] = useState(false);
    const [filterBy1, setfilterBy1] = useState({
        PageNumber: 1,
        RecordsPerPage: 10,
        SortBy: "RECENT",
    });
    const slider00 = useRef();

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
        debugger;
        setVisibleRight(true)
        setDataItem(item)
    }
    function onSlickNext() {
        debugger;
        slider00.current.slickNext();
    }

    function onSlickPrev() {
        slider00.current.slickPrev();

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

    const videoItem = () => {
        return (
            <div className='row'>
                {props.dataTopItem.map((item, idx) => {
                    return (
                        <div key={idx} style={{ width: "230px", height: "300px", marginBottom: "2rem", marginRight: "15px", display: "flex" }} >
                            <div style={{ height: "220px", width: "230px" }}>
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
                                <div className="p-3" style={{ border: '1px solid #ccc', marginTop: "-6px" }}>
                                    <h5 onClick={() => clickTitle(item)} className="" style={{ paddingLeft: '0.5rem', cursor: "pointer" }}>{item?.VideoTitle}</h5>
                                    <span className='fsx-12px'>{item.ViewCount} lượt xem <span>&nbsp;&nbsp;{(item?.TimeDuration)} ngày trước</span></span>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
        )
    }


    return (
        <>
            <LoadingPanel loading={loading}>
                <Slider ref={slider00} {...settingsCourse} style={{ display: 'flex' }}>
                    {videoItem()}
                </Slider>

            </LoadingPanel>

        </>
    )
}
export default VideoTopChannelItem;
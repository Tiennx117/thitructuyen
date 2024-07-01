
import { classNames } from 'primereact/utils';
import styles from './style/videoLibrary.module.scss';
import ReactPlayer from 'react-player'
import { videoService } from "services/videoService";
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { SliderSlick as Slider } from "components/ReactSlickSlider/SliderSlick";
import './style/HomeContainer.scss';
const LichSuVideo = (props) => {
    const [libraryhistoryvideolist, setlibraryhistoryvideolist] = useState([]);
    const [visibleRight, setVisibleRight] = useState(false);
    const [dataItem, setDataItem] = useState({})
    const [loading, setLoading] = useState(false);
    const [filterBy1, setfilterBy1] = useState({
        PageNumber: 1,
        RecordsPerPage: 10,
        SortBy: "RECENT",
    });
    const [basicFirst, setBasicFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const slider00 = useRef();

    function onSlickNext() {
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
    const defaultImg = window.location.origin + '/images/Screenshot_1a.png';;
    const handleImageError = (event) => {
        event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
    };

    const lstLichSuVideo = () => {
        return (
            props.lstvideo.map && props.lstvideo.map((dataItem, index) => {
                return (
                    <div key={index} className={classNames("col", styles.colWrapper)} style={{ marginBottom: "0px" }}>
                        <div className="card h-90">
                            <div>
                                <div className={classNames("card-img-top", styles.playerWrapper)} onClick={() => clickTitle(dataItem)} >
                                    <ReactPlayer
                                        url={appSetting.ADMIN_URL + dataItem?.URLAttachment}
                                        className="image-play"
                                        light={<img src={dataItem.VideoThumbnailUrl != "" ? dataItem?.VideoThumbnailUrl.substring(2) : defaultImg} onError={handleImageError} alt='Thumbnail' style={{ width: '100%', height: '100%' }} />}

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
                                    {dataItem.IsFavourite == false ?
                                        <i style={{ color: "red", position: "relative", top: '8px', right: '-5px' }} className="fa-regular fa-heart"></i>
                                        :
                                        <i style={{ color: "red", position: "relative", top: '8px', right: '-5px' }} className="fa-solid fa-heart"></i>
                                    }

                                    <span style={{ position: "relative", zIndex: "9", top: "5px", right: "5px", color: "#fff", background: 'black', borderRadius: 5, }}>{dataItem.VideoDuration}</span>
                                </div>
                            </div>

                            <div className="p-2" style={{ border: '1px solid #ccc' }}>
                                <div onClick={() => clickTitle(dataItem)} className="" style={{
                                    cursor: "pointer", width: "150px", fontSize: '14px', fontWeight: '700',
                                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                                }} title={dataItem?.VideoTitle}>
                                    {dataItem?.VideoTitle}
                                </div>
                                <div style={{ width: "168px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: '10px' }} className='fsx-11px' title={dataItem.username}>
                                    Bởi {dataItem.username}

                                </div>

                                <div className='d-flex justify-content-between'>
                                    <span className='fsx-11px'>{dataItem.ViewCount} Lượt xem</span>
                                    <span className='fsx-11px'>{(dataItem?.TimeDuration)}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            })
        )
    }
    //const[filter,setfilter]=useState('Gần đây')
    useEffect(() => {
        // call api here
        // filterBy1.ChannelId = props.idChannel;
        // filterBy1.PageNumber = 1;
        loadApi(filterBy1);
    }, [filterBy1]);

    const loadApi = async (value) => {
        setLoading(true);
        let result5 = await videoService.videolibraryhistoryvideolist(value);
        setlibraryhistoryvideolist(result5.data.VideoDetailList);
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

    useEffect(() => {
        document.body.classList.add('overflow-x-disable');
    }, []);

    useEffect(() => {
        return () => {
            document.body.classList.remove('overflow-x-disable');
        };
    }, []);


    return (
        <div style={{ paddingBottom: "30px" }}>
            <div className="div_yeu">
                <div className="title_yeuthich">Lịch sử</div>
                <div className='d-flex justify-content-end mr-5'>
                    <Button onClick={() => onSlickPrev()} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                    <Button onClick={() => onSlickNext()} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
                </div>
            </div>

            <div className="mt-3">
                <LoadingPanel loading={loading}>
                    <Slider ref={slider00} {...settingsCourse} style={{ display: 'flex' }}>
                        {lstLichSuVideo()}
                    </Slider>

                </LoadingPanel>
            </div>
        </div>
    )
}
export default LichSuVideo;
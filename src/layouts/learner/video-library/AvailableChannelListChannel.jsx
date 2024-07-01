import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';
import styles from './style/videoLibrary.module.scss';
import ReactPlayer from 'react-player'
import { videoService } from "services/videoService";
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { SliderSlick as Slider } from "components/ReactSlickSlider/SliderSlick";
import './style/AvailableChannel.scss';
import { Sidebar } from "primereact/sidebar";
import DetailVideo from './detailVideo/detailVideo';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import { useDispatch } from 'react-redux';
import { setListChannel } from 'store/listchannel/listChannelSlice';
import { Image } from 'components/Image';
import { Link } from 'react-router-dom';
import { use } from 'i18next';

const AvailableChannelListChannel = (props) => {
    const dispatch = useDispatch();
    const [isDisabale, setisDisabale] = useState(false);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleRight, setVisibleRight] = useState(false);
    const [dataChannel, setDataChannel] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filterBy1, setfilterBy1] = useState({
        PageNumber: 1,
        RecordsPerPage: 10,
        SortBy: "RECENT",
    });

    const slider00 = useRef();

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
    //     slider00.current.slickNext();
    // }

    // function onSlickPrev() {
    //     slider00.current.slickPrev();

    // }
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
        //rtl: true,
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


    //const[filter,setfilter]=useState('Gần đây')
    useEffect(() => {
        // call api here
        loadApi();
    }, [props.dataChannel]);


    const loadApi = async () => {

        setLoading(true)
        // let result2 = await videoService.getfavoritevideos(value);
        // setlstfavoritevideos(result2.data.VideoDetailList);

        // if (props.dataChannel) {
        //     props.dataChannel.isSubcribe = isSubcribe;

        // }
        setDataChannel(props.dataChannel)
        // console.log('status', props.dataChannel.isSubcribe)
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
        setVisibleRight(true)
        setDataChannel(item)
    }
    const closeDetail = async () => {
        setVisibleRight(false);
        loadApi(filterBy1);
        props.loadApi();
    }

    const subcribeChannel = async (channelId) => {
        const param = {
            "ChannelId": channelId,
        }
        const param1 = {
            "SortBy": "RECENT",
        }
        await videoService.subscribeunsubcribechannel(param);
        let result4 = await videoService.getchannelnamelist(param1);
        dispatch(setListChannel(result4.data.channelLst));
        props.changeIsSubcribeStatus(channelId); // isSubcribe = true
    }
    const btnUnSubcribeChannel = async (channelId) => {
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn muốn hủy đăng ký kênh này không ?',
            accept: () => unSubcribeChannel(channelId)
        })
    }
    const unSubcribeChannel = async (id) => {
        var param = {
            ChannelId: id,
        }
        const param1 = {
            "SortBy": "RECENT",
        }
        await videoService.subscribeunsubcribechannel(param);
        let result4 = await videoService.getchannelnamelist(param1);
        dispatch(setListChannel(result4.data.channelLst));
        props.changeIsSubcribeStatus(id); // isSubcribe = false
    }
    const defaultImg = window.location.origin + '/images/screenshot_1a.png';
    const handleImageError = (event) => {
        event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
    };



    const lstAvailableChannelListChannel = () => {
        return (
            props.dataChannel && props.dataChannel.VideoDetailList ?
                props.dataChannel.VideoDetailList.map((dataItem, index) => {
                    return (
                        <div>
                            <div key={index} className={classNames("col", styles.colWrapper)} >
                                <div className="card h-90" >
                                    <div className={classNames("card-img-top", styles.playerWrapper)} onClick={() => clickTitle(dataItem)} >
                                        <ReactPlayer
                                            url={appSetting.ADMIN_URL + dataItem?.URLAttachment}
                                            light={<img src={dataItem.VideoThumbnailUrl != "" ? dataItem?.VideoThumbnailUrl.substring(2) : defaultImg} alt='Thumbnail' onError={handleImageError} style={{ width: '100%', height: '100%' }} />}
                                            className="image-play"
                                            width='100%'
                                            height='100%'
                                            pip={true}
                                            playing={false}
                                            controls={true}
                                            loop={true}
                                            volume={true}
                                            muted={false}>
                                        </ReactPlayer>
                                        <div className="d-flex justify-content-between">
                                            {dataItem.IsFavourite == false ?
                                                <i style={{ color: "red", position: "relative", top: '-17px', right: '-5px' }} className="fa-regular fa-heart"></i>
                                                :
                                                <i style={{ color: "red", position: "relative", top: '-17px', right: '-5px' }} className="fa-solid fa-heart"></i>
                                            }

                                            <span style={{ position: "relative", zIndex: "9", top: "-22px", right: "5px", color: "#fff", background: 'black', borderRadius: 5, }}>{dataItem.VideoDuration}</span>
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

                        </div>

                    )
                })
                : 'Chưa có video khả dụng'
        )
    }


    console.log('currentSlide', currentSlide)

    return (
        <>
            {props.dataChannel ?
                <>
                    <div>
                        <div className='d-flex flex-row'>
                            <div className='titleChannel mainText' style={{ display: 'flex' }}>
                                <Image src={dataChannel.channelImage} style={{ width: '100px', height: '100px' }}></Image>
                                <div style={{ display: 'block', marginLeft: 10 }}>
                                    <div>
                                        <a style={{ cursor: 'pointer' }} onClick={() => { props.clickTitleChanel(dataChannel), props.onSetShow(true) }}>
                                            {dataChannel?.ChannelTitle}
                                        </a>
                                    </div>
                                    <div style={{ fontSize: 12, margin: '2px 30px 25px 0' }}>
                                        {dataChannel.TotalChannelSubscriber} Người dùng đã đăng ký
                                    </div>
                                    <div className='btn-group mb-sm  ' >
                                        {dataChannel.isSubcribe == false ?
                                            <a className='btnSubcribe' onClick={() => subcribeChannel(dataChannel.ChannelId)}>Đăng ký</a>
                                            :
                                            <a className='btnSubcribe' onClick={() => btnUnSubcribeChannel(dataChannel.ChannelId)}>Hủy đăng ký</a>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div >
                                {/* <div className='d-flex' style={{ width: '240px', justifyContent: 'end', marginRight: '10px', marginTop: '50px', cursor: 'pointer' }}>
                                    <span style={{ textDecoration: 'underline', color: '#B7A9A9', fontWeight: 500 }} onClick={() => { props.clickTitleChanel(dataChannel), props.onSetShow(true) }}>Xem tất cả</span>
                                </div> */}
                                <div className='d-flex' style={{ width: '240px', justifyContent: 'end', marginRight: '10px', }}>
                                    <div>
                                        <Button disabled={props.dataChannel.VideoDetailList.length <= 4 ? true : currentSlide == 0} onClick={() => handlePrevSlide()} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                                        <Button disabled={props.dataChannel.VideoDetailList.length <= 4 ? true : isLastSlide} onClick={() => handleNextSlide()} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='slickAlignLeft' style={{ marginTop: '0.5rem' }}>
                        <div>
                            <LoadingPanel loading={loading}>
                                <Slider ref={slider00} {...settingsCourse} >
                                    {lstAvailableChannelListChannel()}
                                </Slider>
                            </LoadingPanel>
                        </div>
                    </div>
                </>
                :
                "Chưa có dữ liệu khả dụng"
            }
            <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                {
                    <>
                        <Button style={{ position: 'absolute', right: '10px', zIndex: '9' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                        <DetailVideo dataObj={dataChannel} version='v1' />
                    </>
                }
            </Sidebar>
        </>
    )
}
AvailableChannelListChannel.propTypes = {
    dataChannel: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
};
export default AvailableChannelListChannel;
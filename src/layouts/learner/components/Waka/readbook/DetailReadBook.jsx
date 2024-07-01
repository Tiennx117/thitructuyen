import axios from "axios";
import Image from 'components/Image';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { wakaService } from 'services/wakaService';
import { useQuery } from 'shared/hooks/useQuery';
import EpubWakaComponent from 'layouts/demo/components/waka/EpubWakaComponent';
import { WakaChapter } from 'layouts/demo/components/waka/WakaChapter';
import '../../../../learner/components/style/audio-book.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from 'primereact/button';
// import Duration from './Duration';
import { useNavigate } from 'react-router-dom';
// import PlayerAudio from './PlayerAudio';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayerAudioItem } from "store/playeraudio/detailplayer";
import { setDetailPlayerAudio } from "store/playeraudio/detailaudio";
import { setDetailUrlAudio } from "store/playeraudio/detailurl";
import { FaAngleDoubleRight } from 'react-icons/fa';
import { Dropdown } from 'primereact/dropdown';
import PlayerEpub from './PlayerEpub';
import { Sidebar } from 'primereact/sidebar';

const useMountEffect = fun => useEffect(fun, []);

const ContentDetail = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [content_id, setID] = useState(props.read_book_id ? props.read_book_id : 0);
    const [data, setData] = useState();
    const [dataOther, setDataOther] = useState();
    const [otherCategory, setOtherCategory] = useState(null);
    const [showmore, setShowmore] = useState(false);
    const slider01 = useRef();
    const ref = useRef(null);    
    const executeScroll = () => ref.current.scrollIntoView();
    useMountEffect(executeScroll);

    let params = {
        iss: 254,
        did: 123,
        os: 'web',
        iat: Math.floor(Date.now() / 1000),
        ct: props.content_type,
        ci: content_id
    }

    const getDetailContent = async () => {
        let token = await wakaService.tokenDetailContentWaka(params);
        let result = await wakaService.detailContent(token.data);
        setData(result.data.data);
        getOtherCategory(result?.data?.data?.categories[0]?.id);
    }
    const getOtherCategory = async (category_id) => {
        let params = {
            iss: 254,
            did: 123,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ct: props.content_type,
            ci: category_id,
            pn: 1,
            ps: 10
        }
        let resultToken = await wakaService.tokenContentEnterpriseCategory(params);
        let token = resultToken.data;
        let result = await wakaService.listContentEnterpriseCategory(params, token);
        setOtherCategory(result.data.data);
    }

    useEffect(() => {
        getDetailContent();
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        // setDataChapters(playerAudioItem?.data?.data)
    }, [content_id])


    const settings = {
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
    function onSlickNext(slidId) {
        switch (slidId) {
            case '1': slider01.current.slickNext(); break;
            default:
        }
    }
    function onSlickPrev(slidId) {
        switch (slidId) {
            case '1': slider01.current.slickPrev(); break;
            default:
        }
    }


    const [visibleRightEpub, setVisibleRightEpub] = useState(false)
    const handleKeyDown1 = () => {
        setVisibleRightEpub(!visibleRightEpub)
    }

    const closeRightEpub = () => {
        setVisibleRightEpub(false)
        setDataOther(null);
        // setData(null);
    }

    const getDetailContentOther = async (item, content_type) => {
        // debugger;
        let paramsDetail = {
            iss: 254,
            did: 123,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ct: content_type,
            ci: item
        }
        let token = await wakaService.tokenDetailContentWaka(paramsDetail);
        let result = await wakaService.detailContent(token.data);        
        setDataOther(result.data.data);

    }

    const [visibleRightEpubOther, setVisibleRightEpubOther] = useState(false)

    const closeRightOther = () => {
        setVisibleRightEpubOther(false)
        setDataOther(null);
        // setData(null);
    }
    const handleKeyDownOther = (item, content_type) => {
        setVisibleRightEpubOther(!visibleRightEpub);
        getDetailContentOther(item, content_type);        
    }

    const scrollToTop = () => {        
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        console.log('345634534')
      };

    return (<>

        <div className='audio-book-list' ref={ref}>
        <div onClick={props.bookID}><Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" /></div>
            <div class="w-full mt-4-5 p-7-5 bg-white-default rounded-xl flex flex-row border-shadow-2">
                <div class="mr-12 max-w-80 w-80">
                    <div class="w-full relative pt-full-316-220">
                        <img src={data?.thumb} alt="" class="object-cover absolute top-0 left-0 w-full max-w-80 max-h-[486px] rounded-md border border-black-9 shadow-default lazyLoad isLoaded" />
                    </div>
                </div>
                <div class="flex flex-1 flex-col">
                    <div class="w-full flex flex-row items-start justify-between">
                        <div class="flex flex-1 flex-col">
                            <div class="flex justify-between items-center">
                                <h1 style={{ fontSize: '14px' }} class="font-bold">{data?.name}</h1>
                                <div class="flex items-center justify-items-end">
                                    <div class="mr-3">
                                        <button onClick={props.bookID} style={{ background: 'transparent' }} class="text-xs-12-14 text-0ba font-medium border border-0ba px-2 py-1 rounded-sm">Sách đọc</button>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <div class="w-full mt-1">
                                    <div class="w-full flex-row-center text-sm-15-17 text-666 mb-2">
                                        <span class="text-666 mr-1">Tác giả: </span>
                                        <span>{data?.authors[0]?.name}</span>
                                    </div>
                                    <div class="w-full flex-row-center text-sm-15-17 text-666 mb-2">
                                        <span class="text-666 mr-1">Thể loại: </span> <span>{data?.categories[0]?.name}</span>
                                    </div>

                                    <div class="w-full flex-row-center text-sm-15-17 text-666 mb-2">
                                        <span class="text-666 mr-1">Nhà xuất bản: </span> <span>{data?.publishing_houses[0]?.name}</span>
                                    </div>
                                </div>

                            </div>

                            <div class="flex items-center">
                                <div
                                    onClick={() => 
                                        {
                                            dispatch(setDetailPlayerAudio(null))
                                            dispatch(setPlayerAudioItem(null))
                                            dispatch(setDetailUrlAudio(null))
                                            handleKeyDown1()
                                        }
                                    }
                                    class="m-2 rounded-3xl cursor-pointer bg-linear-3 w-[240px] h-[48px] flex items-center justify-center">
                                    <div class="w-6 h-6">
                                        <img src="/images/player/icon-read-book.svg" alt="icon-player" class="cursor-pointer" />
                                    </div>
                                    <p style={{ paddingBottom: '0' }} class="text-white-default ml-2 text-sm-15-18 uppercase">
                                        Đọc sách
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {data?.description.length > 600 ?
                        <>
                            {showmore ?
                                <>
                                    <div class="w-full mt-7-5 text-sm-15-24 text-black-222" dangerouslySetInnerHTML={{ __html: data?.description ? data?.description : "Không có mô tả." }}>
                                    </div>
                                    <div className="mt-2" onClick={() => setShowmore(!showmore)} style={{ color: '#1aa1dc', cursor: 'pointer' }}>{showmore ? "Thu gọn" : "Xem thêm"} <FaAngleDoubleRight style={{ display: 'initial' }} /></div>
                                </>
                                :
                                <>
                                    <div class="w-full mt-7-5 text-sm-15-24 text-black-222" dangerouslySetInnerHTML={{ __html: data?.description ? data?.description.substring(0, 800) + "..." : "Không có mô tả." }}>
                                    </div>

                                    <div className="mt-2" onClick={() => setShowmore(!showmore)} style={{ color: '#1aa1dc', cursor: 'pointer' }}>{showmore ? "Thu gọn" : "Xem thêm"} <FaAngleDoubleRight style={{ display: 'initial' }} /></div>
                                </>
                            }

                        </>
                        :
                        <div class="w-full mt-7-5 text-sm-15-24 text-black-222" dangerouslySetInnerHTML={{ __html: data?.description ? data?.description : "Không có mô tả." }}>
                        </div>
                    }


                </div>
            </div>


            <div class="w-full mt-4-5 bg-white-default rounded-xl border-shadow-2 pb-3">
                <div class="flex items-center justify-between py-6 px-5-5 border-b-f5f">
                    <div class="w-fit h-5-25 lg:h-7-5 px-0 lg:px-0 relative" data-v-9ef1d86c="">
                        <div class="w-15 h-1-5 lg:w-20 lg:h-2 bg-linear-6 absolute left-0 bottom-0 opacity-30 rounded-lg" data-v-9ef1d86c=""></div>
                        <h2 class="text-lg-18-24 lg:text-2xl-24-30 t-ellipsis-1 font-bold relative text-222" data-v-9ef1d86c="">Cùng thể loại</h2>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button onClick={() => onSlickPrev('1')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                        <Button onClick={() => onSlickNext('1')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
                    </div>
                </div>
                <div class="p-7-5 pt-0">

                    <Slider ref={slider01} {...settings}>
                        {otherCategory && otherCategory.map((item) => {
                            return (
                                <div key={item.id}>
                                    <div class="animation-content-item  mr-4 " >
                                        <div class="w-full cursor-pointer border rounded-md border-black-9 relative grid-center pt-full-193-148">
                                            <div class="w-full-8 h-1-5 absolute left-center bottom-0 shadow-item"></div>
                                            <span                                            
                                                onClick={() => {                                                    
                                                    executeScroll();
                                                    setID(item.id);
                                                }}
                                                class="absolute-full rounded-md overflow-hidden">
                                                <img src={item.thumb} alt="" class="object-cover wh-full thumbnail lazyLoad isLoaded" />
                                            </span>
                                            <div
                                                onClick={() => {
                                                    handleKeyDownOther(item.id, item.content_type)                                                    
                                                }}
                                                class="w-12 h-12 btn-action absolute invisible">
                                                <img src="/images/player/icon-read.svg" alt="icon-play" class="cursor-pointer wh-full" />
                                            </div>
                                        </div>
                                        <div class="w-full flex flex-col h-9 mt-3"><span
                                            onClick={() => {
                                                setID(item.id)
                                                //navigate('/learner/catalogue/detailaudiobook/id=' + item.id + '?content_type=' + item.content_type)
                                                //('/learner/video-library/detail-audio-book/' + item.id + '?content_type=' + item.content_type)
                                            }}
                                            class="cursor-pointer t-ellipsis-2 inline-block text-sm-15-18 lg:group-hover:text-0ba font-medium  text-222">
                                            {item.name}
                                        </span>
                                        </div>
                                        <p class="text-sm-14-16 text-666 t-ellipsis-1 mt-1-5"> {item.authors[0].name}</p>
                                    </div>
                                </div>
                            )
                        })}


                    </Slider>
                </div>


            </div>

            <div className="w-full mt-4-5 bg-white-default rounded-xl border-shadow-2 pb-3">

                <Sidebar className='sidebar-header-none' visible={visibleRightEpub} onHide={() => closeRightEpub()} fullScreen style={{ width: '70%' }}>
                    {
                        <>
                            <Button style={{ position: 'absolute', right: '10px', zIndex: '999' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeRightEpub()} />
                            <PlayerEpub bookId={data?.id} url={data?.epub_link} title={data?.name} publishing={data?.publishing_houses[0]?.name} />
                        </>
                    }
                </Sidebar>

                <Sidebar className='sidebar-header-none' visible={visibleRightEpubOther} onHide={() => closeRightOther()} fullScreen style={{ width: '70%' }}>
                    {
                        <>
                            <Button style={{ position: 'absolute', right: '10px', zIndex: '999' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeRightOther()} />
                            <PlayerEpub bookId={dataOther?.id} url={dataOther?.epub_link} title={dataOther?.name} publishing={dataOther?.publishing_houses[0]?.name} />
                        </>
                    }
                </Sidebar>

            </div>

        </div>

    </>)
}

export default ContentDetail;
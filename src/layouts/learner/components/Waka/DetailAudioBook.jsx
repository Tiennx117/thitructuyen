import axios from "axios";
import Image from 'components/Image';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react'
import { wakaService } from 'services/wakaService';
import { useQuery } from 'shared/hooks/useQuery';
import EpubWakaComponent from 'layouts/demo/components/waka/EpubWakaComponent';
import { WakaChapter } from 'layouts/demo/components/waka/WakaChapter';
import '../../../learner/components/style/audio-book.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style/detail-audio-book.scss';
import { Button } from 'primereact/button';
import Duration from './Duration';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setDetailPlayerAudio } from "store/playeraudio/detailaudio";
import { setPlayerAudioItem } from "store/playeraudio/detailplayer";
import { setDetailUrlAudio } from "store/playeraudio/detailurl";
import { setVoicePlayer } from "store/playeraudio/voiceplayer";
import { FaAngleDoubleRight } from 'react-icons/fa';
import { Paginator } from "primereact/paginator";
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import { setProgressLtsAudioBook } from "store/playeraudio/progressLtsAudioBook";
import { setPageCurrent } from "store/playeraudio/pageCurrent";

const useMountEffect = fun => useEffect(fun, []);

const ContentDetail = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [content_id, setID] = useState(props.audio_book_id ? props.audio_book_id : 0);
    const [data, setData] = useState();
    const [dataChapters, setDataChapters] = useState(null);
    const [otherCategory, setOtherCategory] = useState(null);
    const [resultStream, setResultStream] = useState(null);
    const [chapterId, setChapterId] = useState(null);
    const [textChosseChapter, setTextChosseChapter] = useState(null);
    const [showmore, setShowmore] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const [activePopover, setActivePopover] = useState(0);
    const slider01 = useRef();
    const lstValueStore = useSelector(state => state.detailplayaudio) || [];
    const oauth = useSelector(state => state.oauth) || [];
    const lstAudioBookStore = useSelector(state => state.detailplayaudio) || [];
    const voicePlayer = useSelector(state => state.voicePlayer) || [];
    const statusProgress = useSelector(state => state.statusProgress);
    const [indexChapter, setIndexChapter] = useState(lstAudioBookStore?.indexItem);
    const [sortChapter, setSortChapter] = useState(0)
    const [resultProgressAudioBook, setResultProgressAudioBook] = useState();
    const [resultProgressLtsAudioBook, setResultProgressLtsAudioBook] = useState();
    const [progressChapter, setProgressChapter] = useState();
    const playerAudioItem = useSelector(state => state.playerAudioItem) || [];
    const [allChapter, setAllChapter] = useState();
    const pageCurrent = useSelector(state => state.pageCurrent);

    const ref = useRef(null);
    const executeScroll = () => ref.current.scrollIntoView();
    useMountEffect(executeScroll);

    const userDefault = getCurrentUserDefault()
    const userID = userDefault.UserId;

    let params = {
        iss: 262,
        did: 123,
        os: 'web',
        iat: Math.floor(Date.now() / 1000),
        ct: props.content_type,
        ci: content_id
    }

    const getDetailContent = async () => {
        let token = await wakaService.tokenDetailContentWaka(params);
        let result = await wakaService.detailContent(token.data);
        result.data.data.total_full_chapter_master = result.data.data.total_full_chapter;

        // get all chapter
        let paramsChapters = {
            iss: 262,
            did: 123,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ct: 52,
            ci: result.data.data.id,
            type: 0,
            pn: 1,
            ps: 1000,
            sort: 0,
        }
        let tokenDetail = await wakaService.tokenChapterAudio(paramsChapters);
        let listChapterAudio = await wakaService.listChapterAudio(paramsChapters, tokenDetail.data);

        // cập nhật lại 1 số trường vì api waka detail trả về sai thông tin
        if (listChapterAudio?.data?.message == 'Thành công'){
            result.data.data.total_full_chapter = listChapterAudio?.data?.total;
            result.data.data.total_full_chapter_master = listChapterAudio?.data?.total;

            let duration = 0;
            for (let i = 0; i < listChapterAudio?.data?.data.length; i++) {
                duration += listChapterAudio?.data?.data[i].duration;
            }
            result.data.data.duration_info = fancyTimeFormat(duration);
        }

        setAllChapter(listChapterAudio?.data?.data);
        // end get all chapter

        setData(result.data.data);
        if (result?.data?.data?.chapter_type == 1) {
            setTextChosseChapter('Bản tóm tắt');
            getChapters(result?.data?.data?.id, 1)
        } else {
            setTextChosseChapter('Bản đầy đủ');
            getChapters(result?.data?.data?.id, 0)
        }
        getOtherCategory(result?.data?.data?.categories[0]?.id);
        
        // insertAudioBook
        await insertAudioBook(result?.data?.data);
        props.reloadProgress();

        // dispatch(setPageCurrent({
        //     page: 0,
        //     rows: 10
        // }));
    }
    const getOtherCategory = async (category_id) => {
        let params = {
            iss: 262,
            did: 123,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ct: 52,
            ci: category_id,
            pn: 1,
            ps: 10
        }
        let resultToken = await wakaService.tokenContentEnterpriseCategory(params);
        let token = resultToken.data;
        let result = await wakaService.listContentEnterpriseCategory(params, token);
        setOtherCategory(result.data.data);

        // chuỗi id sách nói
        let str_audio_book_id = '';
        if (result.data?.data && result.data?.data.length > 0){
            for (let item of result.data?.data) {
                str_audio_book_id += `${item.id},`;
            }
            str_audio_book_id = str_audio_book_id.slice(0, -1);
        }
        let obj = {
            str_audio_book_id,
            user_id: userID
        };
        // data progress sách
        console.log('obj', obj);
        let ress = await wakaService.getProgressLtsAudioBook(obj);
        setResultProgressLtsAudioBook(ress?.data);
        console.log('ress', ress);
    }

    const insertAudioBook = async(data) => {
        if(data.total_full_chapter > 0){
            var obj = {
                id: data.id,
                categories_id: data.categories[0].id,
                total_full_chapter: data.total_full_chapter,
                total_full_chapter_master: data.total_full_chapter,
                user_id: userID,
                name: data.name,
                description: data.description,
                duration_info: data.duration_info,
                thumb: data.thumb
            };
            await wakaService.insertAudioBook(obj); 
        }
    }

    useEffect(() => {
        getDetailContent();
        // setDataChapters(playerAudioItem?.data?.data)
    }, [content_id, sortChapter])

    useEffect(() => {
        getProgress(statusProgress?.audio_id, statusProgress?.user_id);
    }, [statusProgress])

    const getProgress = async (audio_id, user_id) => {
        let ress = await wakaService.getProgressAudioBook(audio_id, user_id);
        let resProgressChapter = await wakaService.getProgressLtsAudioBookChapter(audio_id, user_id);
        
        let obj = {
            str_audio_book_id: statusProgress?.audio_id.toString(),
            user_id: userID
        };
        // data progress sách
        let progressLtsAudio = await wakaService.getProgressLtsAudioBook(obj);

        dispatch(setProgressLtsAudioBook(progressLtsAudio?.data[0]));

        let ab = fancyTimeFormat(ress?.data?.thoi_gian_nghe);
        let resss = ress?.data;
        
        let ressss = {
                ...resss,
                thoi_gian_nghe: ab
            };
        setResultProgressAudioBook(ressss);
        setProgressChapter(resProgressChapter?.data);
    }

    const getChapters = async (content_id, type, numberPage = 1) => { // 2237                
        let paramsChapters = {
            iss: 262,
            did: 123,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ct: 52,
            ci: content_id,
            type: type,
            pn: numberPage,
            ps: 10,
            sort: sortChapter ? 1 : 0,
        }
        let tokenDetail = await wakaService.tokenChapterAudio(paramsChapters);
        let listChapterAudio = await wakaService.listChapterAudio(paramsChapters, tokenDetail.data);
        if (listChapterAudio?.data?.code == 0) {
            setDataChapters(listChapterAudio?.data?.data);
        }

        // data progress chapter
        let ress = await wakaService.getProgressAudioBook(content_id, userID);
        let resProgressChapter = await wakaService.getProgressLtsAudioBookChapter(content_id, userID);
        let ab = fancyTimeFormat(ress?.data?.thoi_gian_nghe);
        let resss = ress?.data;
        
        let ressss = {
                ...resss,
                thoi_gian_nghe: ab
            };
        setResultProgressAudioBook(ressss);
        setProgressChapter(resProgressChapter?.data);

        // return listChapterAudio?.data;
    }

    const fancyTimeFormat = (duration) => {
        // Hours, minutes and seconds
        const hrs = ~~(duration / 3600);
        const mins = ~~((duration % 3600) / 60);
        const secs = ~~duration % 60;
      
        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";
      
        if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
      
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
      
        return ret;
    }

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

    const onDataChapterAndGetStreamingLink = async (type_chapter) => {
        let paramsChapters = {
            iss: 262,
            did: 123,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ct: 52,
            ci: content_id,
            type: type_chapter,
            pn: 1,
            ps: 500,
            sort: 0,
        }
        let tokenDetail = await wakaService.tokenChapterAudio(paramsChapters);
        let listChapterAudio = await wakaService.listChapterAudio(paramsChapters, tokenDetail.data);

        
        let info_chapter_last = await wakaService.getChapterLast(content_id, userID);

        let dataChapter = listChapterAudio?.data;

        data.total_full_chapter = dataChapter?.total;
        setData(data);

        if (type_chapter == 1) {
            setActivePopover(1);
            setTextChosseChapter('Bản tóm tắt');
            getChapters(content_id, 1);
            setShowPopover(false);
        } else {
            setActivePopover(0);
            setTextChosseChapter('Bản đầy đủ');
            getChapters(content_id, 0);
            setShowPopover(false);
        }

        let paramsStream = {
            iss: 262,
            did: 1231231,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ci: dataChapter.data[0].id
        }
        let tokenStream = await wakaService.tokenStreamingLinkWaka(paramsStream);
        let resultStream = await wakaService.getStreamingLink(paramsStream, tokenStream.data);

        let chapter = dataChapter.data.filter(x => x.id == info_chapter_last.data.chapter_id);
        if(chapter.length > 0){
            resultStream.data.data.id = chapter[0].id;
            resultStream.data.data.name = chapter[0].name;
            resultStream.data.data.duration = chapter[0].duration;
            resultStream.data.data.content_type = chapter[0].content_type;
        }

        setResultStream(resultStream);
        setChapterId(dataChapter.data[0].id);

        let itemVoicePlayer = resultStream?.data?.data?.audio_data.find(x => x.voice === voicePlayer.voice);
        let urlVoice = resultStream?.data?.data?.audio_data[0].url
        if (itemVoicePlayer && voicePlayer && voicePlayer.voice) {
            urlVoice = itemVoicePlayer.url
        }

        let obj = {
            content_id: content_id,
            data: resultStream?.data?.data,
            // chapter_id: dataChapter.data[0].id,
            chapter_id: info_chapter_last.data.chapter_id != 0 ? info_chapter_last.data.chapter_id : dataChapter.data[0].id,
            thumb: data?.thumb,
            name: data?.name,
            // playerSeekTo: 0,
            playerSeekTo: info_chapter_last.data.thoi_gian_nghe_hien_tai || 0,
            url: urlVoice,
            pip: false,
            playing: true,
            controls: false,
            light: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,
            seeking: false,
            title: resultStream?.data?.data?.name,
            indexItem: 0
        }
        dispatch(setDetailPlayerAudio(obj));
        dispatch(setDetailUrlAudio({ 'data': urlVoice }));
        let objChapter = {
            data: dataChapter
        }
        dispatch(setPlayerAudioItem(objChapter))
    }

    const onPlayChapter = async (audio_id, chapter_id, index) => {
        // // tìm chapter đang chạy trước đó và update thời gian nghe thực tế
        // console.log('lstAudioBookStore', lstAudioBookStore);
        // var obj_chapter_prev = {
        //     id: lstAudioBookStore.data.id,
        //     audio_id: lstAudioBookStore.data.audio_id,
        //     name: lstAudioBookStore.data.name,
        //     description: '',
        //     trang_thai: 'S',
        //     duration: lstAudioBookStore.data.duration,
        //     user_id: userID,
        //     listening_time: 0
        // };
        // wakaService.playAudioBook(obj_chapter_prev);

        let index_new = (pageCurrent.rows * pageCurrent.page) + index;
        setIndexChapter((index_new))
        let paramsStream = {
            iss: 262,
            did: 1231231,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ci: chapter_id
        }
        let tokenStream = await wakaService.tokenStreamingLinkWaka(paramsStream);
        let resultStream = await wakaService.getStreamingLink(paramsStream, tokenStream.data);

        let itemVoicePlayer = resultStream?.data?.data?.audio_data.find(x => x.voice === voicePlayer.voice);
        let urlVoice = resultStream?.data?.data?.audio_data[0].url
        if (itemVoicePlayer && voicePlayer && voicePlayer.voice) {
            urlVoice = itemVoicePlayer.url
        }

        const currentTime = await wakaService.getCurrentListeningTime(resultStream?.data?.data?.id, resultStream?.data?.data?.audio_id, userID);
        let obj = {
            content_id: content_id,
            data: resultStream?.data?.data,
            chapter_id: chapter_id,
            thumb: resultStream?.data?.data?.thumb,
            name: data?.name,
            playerSeekTo: currentTime ? ((currentTime == '0' || currentTime == 0) ? 0 : (Object.keys(currentTime.data).length === 0 && currentTime.data.constructor === Object ? 0 : currentTime.data)) : 0,
            url: urlVoice,
            pip: false,
            playing: true,
            controls: false,
            light: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,
            seeking: false,
            title: resultStream?.data?.data?.name,
            indexItem: index_new
        }
        dispatch(setDetailPlayerAudio(obj));
        dispatch(setDetailUrlAudio({ 'data': urlVoice }));

        let chapter_type = data?.chapter_type;
        let paramsChapters = {
            iss: 262,
            did: 123,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ct: 52,
            ci: audio_id,
            type: chapter_type == 1 ? 1 : 0,
            pn: 1,
            ps: 500,
            sort: 0,
        }
        let tokenDetail = await wakaService.tokenChapterAudio(paramsChapters);
        let listChapterAudio = await wakaService.listChapterAudio(paramsChapters, tokenDetail.data);
        let dataChaptersList = listChapterAudio?.data?.data;

        let objChapter = {
            data: dataChaptersList
        }
        dispatch(setPlayerAudioItem({ 'data': objChapter }))

        // sự kiện play sách nói
        var obj_chapter = {
            id: obj.data.id,
            audio_id: obj.data.audio_id,
            name: obj.data.name,
            description: '',
            trang_thai: 'N',
            duration: obj.data.duration,
            user_id: userID,
            listening_time: 0,
            current_listening_time: currentTime ? ((currentTime == '0' || currentTime == 0) ? 0 : (Object.keys(currentTime.data).length === 0 && currentTime.data.constructor === Object ? 0 : currentTime.data)) : 0,
        };
        wakaService.playAudioBook(obj_chapter);
    }

    const onShowPopover = () => {
        setShowPopover(!showPopover);
    }


    const chooseVision = async (content_id, type) => {
        let paramsChapters = {
            iss: 262,
            did: 123,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ct: 52,
            ci: content_id,
            type: type,
            pn: 1,
            ps: 500,
            sort: 0,
        }
        let tokenDetail = await wakaService.tokenChapterAudio(paramsChapters);
        let listChapterAudio = await wakaService.listChapterAudio(paramsChapters, tokenDetail.data);

        let dataChapter = listChapterAudio?.data;

        data.total_full_chapter = dataChapter?.total;
        setData(data);

        if (type == 1) {
            setActivePopover(1);
            setTextChosseChapter('Bản tóm tắt');
            getChapters(content_id, 1);
            setShowPopover(false);
        } else {
            setActivePopover(0);
            setTextChosseChapter('Bản đầy đủ');
            getChapters(content_id, 0);
            setShowPopover(false);
        }
    }

    const playItemToListFirst = async (content_id) => {        
        let params = {
            iss: 262,
            did: 123,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ct: 52,
            ci: content_id
        }
        let token = await wakaService.tokenDetailContentWaka(params);
        let result = await wakaService.detailContent(token.data);
        if (result?.data?.data?.chapter_type == 1) {
            getDataChapterAndGetStreamingLink(content_id, 1, result.data.data);
        } else {
            getDataChapterAndGetStreamingLink(content_id, 0, result.data.data);
        }
        let newAudioBookStore = {
            ...lstAudioBookStore,
            playing: true, playerSeekTo: lstAudioBookStore?.playerSeekTo
        }
        dispatch(setDetailPlayerAudio(newAudioBookStore));
        // setDataChaptersListItem(null);
    }

    const handlePauseItem = async (content_id) => {
        let newAudioBookStore = {
            ...lstAudioBookStore,
            playing: false, playerSeekTo: lstAudioBookStore?.playerSeekTo
        }
        dispatch(setDetailPlayerAudio(newAudioBookStore));
    }

    const getDataChapterAndGetStreamingLink = async (content_id, type_chapter, detailItem) => {
        let dataChapterAndStream = getDataChapters(content_id, type_chapter)
        dataChapterAndStream.then(function (result) {
            let resultStream = result[1].resultStream;
            let dataChapter = result[0].dataChapter;

            let itemVoicePlayer = resultStream?.data?.data?.audio_data.find(x => x.voice === voicePlayer.voice);
            let urlVoice = resultStream?.data?.data?.audio_data[0].url
            if (itemVoicePlayer && voicePlayer && voicePlayer.voice) {
                urlVoice = itemVoicePlayer.url
            }

            let obj = {
                content_id: content_id,
                data: resultStream?.data?.data,
                chapter_id: dataChapter.data[0].id,
                thumb: detailItem?.thumb,
                name: detailItem?.name,
                playerSeekTo: 0,
                url: urlVoice,
                pip: false,
                playing: true,
                controls: false,
                light: false,
                volume: 0.8,
                muted: false,
                played: 0,
                loaded: 0,
                duration: 0,
                playbackRate: 1.0,
                loop: false,
                seeking: false,
                title: resultStream?.data?.data?.name,
                indexItem: 0
            }
            dispatch(setDetailPlayerAudio(obj));
            dispatch(setDetailUrlAudio({ 'data': urlVoice }));
            let objChapter = {
                data: dataChapter
            }
            dispatch(setPlayerAudioItem(objChapter));
        })
    }

    let getDataChapters = async function (content_id, type_chapter) {
        let paramsChapters = {
            iss: 262,
            did: 123,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ct: 52,
            ci: content_id,
            type: type_chapter,
            pn: 1,
            ps: 10,
            sort: 0,
        }
        let tokenDetail = await wakaService.tokenChapterAudio(paramsChapters);
        let listChapterAudio = await wakaService.listChapterAudio(paramsChapters, tokenDetail.data);

        let dataChapter = listChapterAudio?.data;
        let paramsStream = {
            iss: 262,
            did: 1231231,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ci: dataChapter.data[0].id
        }
        let tokenStream = await wakaService.tokenStreamingLinkWaka(paramsStream);
        let resultStream = await wakaService.getStreamingLink(paramsStream, tokenStream.data);

        return [
            { 'dataChapter': dataChapter },
            { 'resultStream': resultStream },
        ];
    }

    const onSortChapter = () => {
        setSortChapter(sortChapter == 0 ? 1 : 0);
        getChapters(content_id, 0)
        setActivePage(1);
    }

    const [basicFirst, setBasicFirst] = useState(0);
    const onBasicPageChange = (event) => {
        console.log('event', event);
        if (event.first > 0) {
            getChapters(content_id, 0, event.page + 1)
        } else {
            getChapters(content_id, 0, 1)
        }
        setBasicFirst(event.first);

        dispatch(setPageCurrent({
            page: event.page,
            rows: event.rows
        }));
    };

    return (<>

        <div className='audio-book-list' ref={ref}>
            <div onClick={props.audioBookID}><Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" /></div>
            <div className="w-full mt-4-5 p-7-5 bg-white-default rounded-xl flex flex-row border-shadow-2">
                <div className="mr-12 max-w-80 w-80">
                    <div className="w-full relative pt-full-316-220">
                        <img src={data?.thumb} alt="" className="object-cover absolute top-0 left-0 w-full max-w-80 max-h-[486px] rounded-md border border-black-9 shadow-default lazyLoad isLoaded" />
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="w-full flex flex-row items-start justify-between">
                        <div className="flex flex-1 flex-col">
                            <div className="flex justify-between items-center">
                                <h1 style={{ fontSize: '14px' }} className="font-bold">{data?.name}</h1>
                                <div className="flex items-center justify-items-end">
                                    <div className="mr-3">
                                        <button onClick={props.audioBookID} style={{ background: 'transparent' }} className="text-xs-12-14 text-0ba font-medium border border-0ba px-2 py-1 rounded-sm">Sách nói</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="w-full mt-1">
                                    <div className="w-full flex-row-center text-sm-15-17 text-666 mb-2">
                                        <span className="text-666 mr-1">Tác giả: </span>
                                        <span>{data?.authors[0]?.name}</span>
                                    </div>
                                    <div className="w-full flex-row-center text-sm-15-17 text-666 mb-2">
                                        <span className="text-666 mr-1">Thể loại: </span> <span>{data?.categories[0]?.name}</span>
                                    </div>

                                    <div className="w-full flex-row-center text-sm-15-17 text-666 mb-2">
                                        <span className="text-666 mr-1">Thời lượng: </span> <span>{data?.duration_info}</span>
                                        <>
                                            <span className="mx-1"> - </span> <span>
                                                {data?.total_full_chapter_master} chương
                                            </span>
                                        </>
                                    </div>
                                </div>

                            </div>

                            <div className="flex items-center">
                                {(data?.chapter_type == 1 || data?.chapter_type == 3) &&
                                    <div
                                        onClick={() => onDataChapterAndGetStreamingLink(1)}
                                        className="m-2 rounded-3xl cursor-pointer w-[240px] h-[48px] flex items-center justify-center mr-5 bg-btn-sumary text-0ba"
                                        style={{ color: '#000' }}
                                    >
                                        <div className="w-6 h-6">
                                            <img src="/images/player/icon-player.svg" alt="icon-player" className="cursor-pointer" />
                                        </div>
                                        <p style={{ paddingBottom: '0' }} className="text-222 ml-2 text-sm-15-18 uppercase">
                                            Nghe tóm tắt
                                        </p>
                                    </div>
                                }
                                {(data?.chapter_type == 2 || data?.chapter_type == 3) &&
                                    <div
                                        onClick={() => onDataChapterAndGetStreamingLink(0)}
                                        className="m-2 rounded-3xl cursor-pointer bg-linear-3 w-[240px] h-[48px] flex items-center justify-center">
                                        <div className="w-6 h-6">
                                            <img src="/images/player/icon-player.svg" alt="icon-player" className="cursor-pointer" />
                                        </div>
                                        <p style={{ paddingBottom: '0' }} className="text-white-default ml-2 text-sm-15-18 uppercase">
                                            Nghe đầy đủ
                                        </p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    {data?.description.length > 600 ?
                        <>
                            {showmore ?
                                <>
                                    <div className="w-full mt-7-5 text-sm-15-24 text-black-222" dangerouslySetInnerHTML={{ __html: data?.description ? data?.description : "Không có mô tả." }}>
                                    </div>
                                    <div className="mt-2" onClick={() => setShowmore(!showmore)} style={{ color: '#1aa1dc', cursor: 'pointer' }}>{showmore ? "Thu gọn" : "Xem thêm"} <FaAngleDoubleRight style={{ display: 'initial' }} /></div>
                                </>
                                :
                                <>
                                    <div className="w-full mt-7-5 text-sm-15-24 text-black-222" dangerouslySetInnerHTML={{ __html: data?.description ? data?.description.substring(0, 600) + "..." : "Không có mô tả." }}>
                                    </div>

                                    <div className="mt-2" onClick={() => setShowmore(!showmore)} style={{ color: '#1aa1dc', cursor: 'pointer' }}>{showmore ? "Thu gọn" : "Xem thêm"} <FaAngleDoubleRight style={{ display: 'initial' }} /></div>
                                </>
                            }

                        </>
                        :
                        <div className="w-full mt-7-5 text-sm-15-24 text-black-222" dangerouslySetInnerHTML={{ __html: data?.description ? data?.description : "Không có mô tả." }}>
                        </div>
                    }


                </div>
            </div>

            {data?.total_full_chapter > 0 &&
                <div className="info_view">
                    <div className="info_view_left">
                        <span>Thời gian nghe: {resultProgressAudioBook?.thoi_gian_nghe} | Hoàn thành: {resultProgressAudioBook?.hoan_thanh}%</span>
                    </div>
                    <div className="info_view_right">
                        <span>Lượt xem: {resultProgressAudioBook?.luot_xem}</span>
                    </div>
                </div>
            }

            <div className="w-full bg-white-default rounded-xl border-shadow-2 pb-3">
                <div className="flex items-center justify-between py-4 px-5-5 border-b-f5f">
                    <div className="w-fit h-5-25 lg:h-7-5 px-0 lg:px-0 relative" data-v-9ef1d86c="">
                        <div className="w-15 h-1-5 lg:w-20 lg:h-2 bg-linear-6 absolute left-0 bottom-0 opacity-30 rounded-lg" data-v-9ef1d86c=""></div>
                        <h2 className="text-lg-18-24 lg:text-2xl-24-30 t-ellipsis-1 font-bold relative text-222" data-v-9ef1d86c="">Danh sách chương ({data?.total_full_chapter})</h2>
                    </div>
                    <div className="flex items-center">
                        <span style={{ position: 'relative' }}>
                            {showPopover &&
                                <div role="tooltip" id="el-popover-4716" aria-hidden="true" className="el-popover el-popper popover-type-chapter" tabindex="0" >
                                    <div className="bg-f5f rounded-lg">
                                        {(data?.chapter_type == 1 || data?.chapter_type == 3) &&
                                            <div
                                                onClick={(e) => chooseVision(data?.id, 1)}
                                                className="p-3-5 cursor-pointer flex items-center justify-center">
                                                <span class={`text-sm-14-20 hover:text-0ba mr-3 ${activePopover == 1 ? 'text-0ba' : 'text-222'}`}>
                                                    Bản tóm tắt
                                                </span>
                                                {activePopover == 1 &&
                                                    <img src="/images/player/icon-active.svg" alt="icon-active" className="cursor-pointer"></img>
                                                }
                                            </div>
                                        }
                                        {(data?.chapter_type == 2 || data?.chapter_type == 3) &&
                                            <div
                                                onClick={(e) => chooseVision(data?.id, 0)}
                                                className="p-3-5 px-0 border-b border-b-555 cursor-pointer flex items-center justify-center border-b border-b-555">
                                                <span class={`text-sm-14-20 hover:text-0ba mr-3 ${activePopover == 0 ? 'text-0ba' : 'text-222'}`}>
                                                    Bản đầy đủ
                                                </span>
                                                {activePopover == 0 &&
                                                    <img src="/images/player/icon-active.svg" alt="icon-active" className="cursor-pointer"></img>
                                                }
                                            </div>
                                        }

                                    </div>
                                </div>
                            }
                            <span
                                onClick={() => onShowPopover()}
                                className="el-popover__reference-wrapper">
                                <div className="cursor-pointer flex items-center justify-center  w-32-5 h-7-5 bg-f5f px-4 py-2 rounded-2xl el-popover__reference" aria-describedby="el-popover-4716" tabindex="0">
                                    <span className="text-sm-14-16 mr-4 block text-222">
                                        <span>{textChosseChapter}</span>
                                    </span>
                                    <img src="/images/player/icon-more.svg" alt="icon-more" className="cursor-pointer" />
                                </div>
                            </span>
                        </span>
                        {dataChapters && dataChapters.length > 1 &&
                            <>                                
                                {sortChapter ?
                                    <img onClick={() => onSortChapter()} src="/images/player/icon-big-small.svg" alt="icon-big-small" className="cursor-pointer" />
                                    :
                                    <img onClick={() => onSortChapter()} src="/images/player/icon-small-big.svg" alt="icon-small-big" className="cursor-pointer" />
                                }
                            </>
                        }
                    </div>
                </div>
                <div className="p-7-5 pt-0">
                    <div>
                        {dataChapters && dataChapters.map((item, index) => {
                            let percent = 0;
                            let time = '0:00';
                            let chptr = progressChapter?.filter(x => x.chapter_id == item.id);
                            if(chptr && chptr.length > 0){
                                percent = (chptr[0].trang_thai_chapter == 'C' && chptr[0].thoi_gian_nghe_hien_tai == 0) ? 100 : (Math.floor((chptr[0].thoi_gian_nghe_hien_tai / item.duration) * 100));

                                time = '';
                                const hrs = ~~(chptr[0].thoi_gian_nghe_thuc_te / 3600);
                                const mins = ~~((chptr[0].thoi_gian_nghe_thuc_te % 3600) / 60);
                                const secs = ~~chptr[0].thoi_gian_nghe_thuc_te % 60;
                            
                                if (hrs > 0) {
                                    time += "" + hrs + ":" + (mins < 10 ? "0" : "");
                                }
                            
                                time += "" + mins + ":" + (secs < 10 ? "0" : "");
                                time += "" + secs;
                            }
                            return (<div key={item.id}>
                                <div
                                    onClick={() => onPlayChapter(item.audio_id, item.id, index)}
                                    className="flex items-center justify-between border-b border-b-f5f cursor-pointer h-16-25">
                                    <div className="flex items-center font-medium text-sm-15-18"><span className="mr-7-5 text-222">
                                        {item.order}
                                    </span>
                                        {lstAudioBookStore?.chapter_id == item.id ?
                                            <>
                                                <p className="hover:text-0ba text-0ba">
                                                    {item.name}
                                                </p>
                                            </>
                                            :
                                            <p className="hover:text-0ba text-222">
                                                {item.name}
                                            </p>
                                        }

                                        {/* <p class={`hover:text-0ba ${item.isPlay ? 'text-0ba' : 'text-222'}`}>
                                            {item.name}
                                        </p> */}
                                    </div>

                                    {lstAudioBookStore?.chapter_id == item.id &&
                                        <div className="flex items-center justify-center img_playing">
                                            <img src="/images/player/icon-playing.gif" className="mr-9" />
                                        </div>
                                    }

                                    {lstAudioBookStore?.chapter_id != item.id && data?.total_full_chapter > 0 &&
                                        <div className={`progress-bar progress-tien-trinh-${percent}`} data-time={time}>
                                            <progress id="html" min="0" max="100"></progress>
                                        </div>
                                    }
                                    <div className="flex items-center justify-center">
                                        

                                        <span className="text-222">
                                            <Duration seconds={item.duration} />
                                        </span>
                                    </div>
                                </div>
                            </div>)
                        })}
                        {data?.total_full_chapter > 10 &&
                            <Paginator
                                first={basicFirst}
                                rows={10}
                                totalRecords={data?.total_full_chapter}
                                onPageChange={onBasicPageChange}
                            ></Paginator>
                        }
                    </div>
                </div>

            </div>

            <div className="w-full mt-4-5 bg-white-default rounded-xl border-shadow-2 pb-3">
                <div className="flex items-center justify-between py-6 px-5-5 border-b-f5f">
                    <div className="w-fit h-5-25 lg:h-7-5 px-0 lg:px-0 relative" data-v-9ef1d86c="">
                        <div className="w-15 h-1-5 lg:w-20 lg:h-2 bg-linear-6 absolute left-0 bottom-0 opacity-30 rounded-lg" data-v-9ef1d86c=""></div>
                        <h2 className="text-lg-18-24 lg:text-2xl-24-30 t-ellipsis-1 font-bold relative text-222" data-v-9ef1d86c="">Cùng thể loại</h2>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button onClick={() => onSlickPrev('1')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                        <Button onClick={() => onSlickNext('1')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
                    </div>
                </div>
                <div className="p-7-5 pt-0">
                    <Slider ref={slider01} {...settings}>
                        {otherCategory && otherCategory.map((item) => {
                            return (
                                <div key={item.id}>
                                    <div className="animation-content-item  mr-4 " >
                                        <div className="w-full cursor-pointer border rounded-md border-black-9 relative grid-center pt-full-193-148">
                                            <div className="w-full-8 h-1-5 absolute left-center bottom-0 shadow-item"></div>
                                            <span
                                                onClick={() => {
                                                    setID(item.id);
                                                    executeScroll();
                                                    //navigate('/learner/catalogue/detailaudiobook/id=' + item.id + '?content_type=' + item.content_type)
                                                    //navigate('/learner/video-library/detail-audio-book/' + item.id + '?content_type=' + item.content_type)
                                                }}
                                                className="absolute-full rounded-md overflow-hidden">
                                                <img src={item.thumb} alt="" className="object-cover wh-full thumbnail lazyLoad isLoaded" />
                                            </span>
                                            {lstAudioBookStore?.content_id == item.id && lstAudioBookStore?.playing
                                                ?
                                                <div
                                                    onClick={() => handlePauseItem(item.id)}
                                                    className="w-12 h-12 btn-action absolute visible">
                                                    <img src="/images/player/icon-pause-audiobook.svg" alt="icon-pause-audiobook" className="cursor-pointer wh-full" />
                                                </div>
                                                : (resultProgressLtsAudioBook?.filter(x =>x.audio_id == item.id).length > 0) ?
                                                <div
                                                    onClick={() => playItemToListFirst(item.id)}
                                                    className="w-12 h-12 btn-action absolute invisible">
                                                    <img src="/images/player/icon-play.svg" alt="icon-play" className="cursor-pointer wh-full" />
                                                </div>
                                                : ''
                                            }
                                            {/* <div
                                                onClick={() => playItemToListFirst(item.id)}
                                                className="w-12 h-12 btn-action absolute invisible">
                                                <img src="/images/player/icon-play.svg" alt="icon-play" className="cursor-pointer wh-full" />
                                            </div> */}
                                        </div>
                                        <div className="w-full flex flex-col h-9 mt-3"><span
                                            onClick={() => {
                                                setID(item.id)
                                                //navigate('/learner/catalogue/detailaudiobook/id=' + item.id + '?content_type=' + item.content_type)
                                                //('/learner/video-library/detail-audio-book/' + item.id + '?content_type=' + item.content_type)
                                            }}
                                            className="t-ellipsis-2 inline-block text-sm-15-18 lg:group-hover:text-0ba font-medium  text-222">
                                            {item.name}
                                        </span>
                                        </div>
                                        <p className="text-sm-14-16 text-666 t-ellipsis-1 mt-1-5"> {item.authors[0].name}</p>
                                        <div className='progress_view'>
                                            <div className='progress_custom'>
                                                <progress max="100" value={resultProgressLtsAudioBook?.filter(x => x.audio_id == item.id)[0]?.progress}></progress>
                                                <div className='view_custom'>
                                                    <span className="pi pi-eye"></span>
                                                    <span className="view">{resultProgressLtsAudioBook?.filter(x => x.audio_id == item.id)[0]?.attmpts || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}


                    </Slider>
                </div>


            </div>


        </div>
    </>)
}

export default ContentDetail;
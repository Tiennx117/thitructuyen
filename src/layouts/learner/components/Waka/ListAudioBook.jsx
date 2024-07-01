import Image from 'components/Image';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { wakaService } from 'services/wakaService';
// import '../styleepub.scss'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { setvisibleDialog } from 'store/perFormExam/perFormExam';
import { useNavigate } from 'react-router-dom';
import '../../../learner/components/style/audio-book.scss';
import './style/audio-book.scss';
import DetailAudioBook from './DetailAudioBook';
import { useSelector, useDispatch } from 'react-redux';
import { setDetailPlayerAudio } from "store/playeraudio/detailaudio";
import { setPlayerAudioItem } from "store/playeraudio/detailplayer";
import { setDetailUrlAudio } from "store/playeraudio/detailurl";
import DropdownFilter from '../../my-learning/DropdownFilter';
import { Paginator } from "primereact/paginator";
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const WakaApiList = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lstAudioBookStore = useSelector(state => state.detailplayaudio) || [];
    const progressLtsAudioBook = useSelector(state => state.progressLtsAudioBook) || [];
    const voicePlayer = useSelector(state => state.voicePlayer) || [];
    const [resultAudioBook, setResultAudioBook] = useState();
    const [totalAudioBook, setTotalAudioBook] = useState();
    const [goDetailAudioBook, setGoDetailAudioBook] = useState(false);
    const [audioBookID, setAudioBookID] = useState(0);
    const [contentType, setContentType] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [resultCategory, setResultCategory] = useState();
    const [optionCategories, setOptionCateogries] = useState([]);
    const [dataChaptersListItem, setDataChaptersListItem] = useState();
    const [resultProgressAudioBook, setResultProgressAudioBook] = useState();
    const [keyword, setKeyword] = useState(null);
    const [titleCategory, setTitleCategory] = useState(null);
    const userDefault = getCurrentUserDefault()
    const userID = userDefault.UserId;

    // console.log('88888888888888888888888888888', progressLtsAudioBook);

    const [params, setParams] = useState({
        iss: 254,
        did: 123,
        os: 'web',
        iat: Math.floor(Date.now() / 1000),
        q: null,
        ct: 52,
        ci: 0,
        pn: 1,
        ps: 12
    })
    const [basicFirst, setBasicFirst] = useState(0);

    const load = async () => {
        let resultToken = await wakaService.tokenContentEnterpriseCategory(params);
        let token = resultToken.data;
        let result = await wakaService.listContentEnterpriseCategory(params, token);

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
        let ress = await wakaService.getProgressLtsAudioBook(obj);
        setResultProgressAudioBook(ress?.data);

        let resultCategory = await wakaService.listEnterpriseCategory(params, token);
        setResultAudioBook(result.data.data);
        setTotalAudioBook(result.data.total)
        setResultCategory(resultCategory.data.data)

        // insertEnterpriseCategory
        await wakaService.insertEnterpriseCategory(resultCategory.data.data); 
    }

    useEffect(() => {
        load();
    }, [params.pn, params.ci])

    useEffect(() => {
        resultProgressAudioBook && resultProgressAudioBook?.map(x => {
            if (x.audio_id == progressLtsAudioBook.audio_id){
                x.progress = progressLtsAudioBook.progress;
            }
            return x;
        });
        setResultProgressAudioBook(resultProgressAudioBook);
        
        
        console.log('resultProgressAudioBook', resultProgressAudioBook);
        console.log('progressLtsAudioBook', progressLtsAudioBook);
    }, [progressLtsAudioBook])

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

        let info_chapter_last = await wakaService.getChapterLast(result.data.data.id, userDefault.UserId);

        if (result?.data?.data?.chapter_type == 1) {
            getDataChapterAndGetStreamingLink(content_id, 1, result.data.data, info_chapter_last);
        } else {
            getDataChapterAndGetStreamingLink(content_id, 0, result.data.data, info_chapter_last);
        }

        // let newAudioBookStore = {
        //     ...lstAudioBookStore,
        //     playing: true, playerSeekTo: lstAudioBookStore?.duration * lstAudioBookStore?.ePlayed
        // }

        // dispatch(setDetailPlayerAudio(newAudioBookStore));

        setDataChaptersListItem(null);
    }

    const handlePauseItem = async (content_id) => {
        let newAudioBookStore = {
            ...lstAudioBookStore,
            playing: false, playerSeekTo: lstAudioBookStore?.duration * lstAudioBookStore?.ePlayed
        }
        dispatch(setDetailPlayerAudio(newAudioBookStore));
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
            ps: 500,
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

    const getDataChapterAndGetStreamingLink = async (content_id, type_chapter, detailItem, info_chapter_last) => {
        let dataChapterAndStream = getDataChapters(content_id, type_chapter)
        dataChapterAndStream.then(function (result) {

            let resultStream = result[1].resultStream;
            let dataChapter = result[0].dataChapter;

            let chapter = result[0].dataChapter.data.filter(x => x.id == info_chapter_last.data.chapter_id);
            if(chapter.length > 0){
                resultStream.data.data.id = chapter[0].id;
                resultStream.data.data.name = chapter[0].name;
                resultStream.data.data.duration = chapter[0].duration;
                resultStream.data.data.content_type = chapter[0].content_type;
            }

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
                thumb: detailItem?.thumb,
                name: detailItem?.name,
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
            let objChapter = {
                data: dataChapter
            }
            dispatch(setPlayerAudioItem(objChapter));
            dispatch(setDetailUrlAudio({ 'data': urlVoice }));
        })

    }

    const handleKeyDown = (event, params) => {
        if (event.key === 'Enter') {
            setKeyword(params.q)
            getSearch(params)

        }
    }

    const getSearch = async (params) => {
        if (params.q) {
            let paramsSearch = {
                iss: 254,
                did: 1231231,
                os: 'web',
                iat: Math.floor(Date.now() / 1000),
                q: params.q,
                pn: params.pn,
                ps: 12,
                ct: 52
            }

            let tokenSearch = await wakaService.tokenSearchContentWaka(paramsSearch);
            let result = await wakaService.searchListContent(paramsSearch, tokenSearch.data);
            setResultAudioBook(result.data.data.list)
            setTotalAudioBook(result.data.data.total)
        } else {
            load();
            setKeyword(null)
        }
    }

    const onSearch = (params) => {
        setKeyword(params.q)
        getSearch(params)
    }

    const onAudioBookID = () => {
        setAudioBookID(0)
    }

    const onBasicPageChange = (event) => {
        if (event.first > 0) {
            if (!keyword) {
                let filterBy2 = { ...params, pn: event.page + 1 };
                setParams(filterBy2);
            } else {
                let filterBy2 = { ...params, pn: event.page + 1 };
                getSearch(filterBy2)
            }
        } else {
            let filterBy2 = { ...params, pn: 1 };
            if (keyword) {
                getSearch(filterBy2)
            } else {
                setParams(filterBy2);
            }
        }
        setBasicFirst(event.first);
    };

    const onChangeCategory = (value) => {    
        params.pn = 1; 
        params.ci = value;
        params.iat = Math.floor(Date.now() / 1000);
        let filterBy = { ...params, params };
        setParams(filterBy);
        if (resultCategory) {
            let resultCategoryItem = resultCategory.find(x => x.id === value);
            setTitleCategory(resultCategoryItem?.name)
        }
    }

    const reloadProgress = async () => {
        console.log('resultAudioBook', resultAudioBook);
        // chuỗi id sách nói
        let str_audio_book_id = '';
        if (resultAudioBook && resultAudioBook.length > 0){
            for (let item of resultAudioBook) {
                str_audio_book_id += `${item.id},`;
            }
            str_audio_book_id = str_audio_book_id.slice(0, -1);
        }
        let obj = {
            str_audio_book_id,
            user_id: userID
        };
        // data progress sách
        let ress = await wakaService.getProgressLtsAudioBook(obj);
        setResultProgressAudioBook(ress?.data);
    }

    return (
        <>
            {props.goDetailAudioBook == true && audioBookID > 0 ?
                <DetailAudioBook audioBookID={onAudioBookID} content_type={contentType} audio_book_id={audioBookID} reloadProgress={() => reloadProgress()}/>
                :
                <div className='d-flex flex-column'>
                    <div className='d-flex justify-content-between' style={{ padding: "0.5rem 1rem" }}>
                        <div style={{ position: 'relative' }}>
                            <b className='font-size-tieude' style={{ color: 'black' }}>
                                Sách nói
                            </b>
                            <span className='bottom-title-learning learning-public'></span>
                        </div>
                        <div>
                            <div class="dropdown"><a class="nav-link dropdown-toggle fw-bold fsx-14px cursor-pointer text-uppercase " data-bs-toggle="dropdown" aria-expanded="true" >
                                {titleCategory ? titleCategory : 'Danh sách thể loại'}
                            </a>
                                <ul class="dropdown-menu cursor-pointer custom-category" data-popper-placement="bottom-start">
                                    <li onClick={() => onChangeCategory(0)}><a class="dropdown-item">Tất cả thể loại</a></li>
                                    {resultCategory && resultCategory?.map(item => {
                                        return (
                                            <li onClick={() => onChangeCategory(item.id)} key={item.id}>
                                                <a class="dropdown-item">{item.name}</a>
                                            </li>
                                        )
                                    })}

                                </ul>
                            </div>
                        </div>
                    </div>
                    <span class="d-flex flex-row justify-content-start mb-2" style={{ padding: '0.5rem 1rem' }}>
                        <div class="input-field">
                            <input
                                onKeyDown={(e) => handleKeyDown(e, params)}
                                onChange={(e) => {
                                    setParams((data) => {
                                        data.q = e.target.value
                                        return data;
                                    })
                                }}
                                class="search-box" type="text" placeholder="Tìm kiếm theo tên sách" />
                            <button onClick={() => { onSearch(params) }} class="search-icon" icon="pi pi-search"></button>
                        </div>
                    </span>
                    <div className='audio-book-list'>

                        <div className="grid grid-cols-3 2xl:grid-cols-5 gap-8 mt-7-5">

                            {resultAudioBook && resultAudioBook?.map(item => {
                                return (
                                    <div className="pb-0-5 pt-7-5 animation-content-item float-left inline-block group col-span-1">
                                        <div className="w-full bg-white-default rounded-xl shadow-[0_2px_2px_rgba(0,0,0,0.1)] border border-white-default hover:border hover:border-0ba relative">
                                            <div className="w-full px-4-5 -mt-7-5 relative">
                                                <div className="w-[153px] mx-auto relative">
                                                    <div className="w-full cursor-pointer pt-full-234-160 border rounded-md border-black-9 relative grid-center">
                                                        <div className="w-full-8 h-1-5 absolute left-center bottom-0 shadow-item"></div>
                                                        <div className="absolute-full rounded-md overflow-hidden">

                                                            <span
                                                                onClick={() => {
                                                                    props.setGoDetailAudioBook(true)
                                                                    setAudioBookID(item.id)
                                                                    setContentType(item.content_type)                                                                    
                                                                }}
                                                                className="">
                                                                <Image className="object-cover wh-full thumbnail lazyLoad isLoaded" src={item.thumb} />
                                                            </span>
                                                            <span
                                                                className="">
                                                                <div className="absolute-full bg-black-15 group-hover:visible invisible"></div>
                                                            </span>
                                                        </div>
                                                        {resultProgressAudioBook?.filter(x => x.audio_id == item.id).length > 0 ? 
                                                        <>
                                                            {lstAudioBookStore?.content_id == item.id && lstAudioBookStore?.playing
                                                            ?
                                                            <div
                                                                onClick={() => handlePauseItem(item.id)}
                                                                class="w-12 h-12 btn-action absolute visible">
                                                                <img src="/images/player/icon-pause-audiobook.svg" alt="icon-pause-audiobook" class="cursor-pointer wh-full" />
                                                            </div>
                                                            :
                                                            <div
                                                                onClick={() => playItemToListFirst(item.id)}
                                                                className="w-12 h-12 btn-action absolute invisible">
                                                                <img src="/images/player/icon-play.svg" alt="icon-play" className="cursor-pointer wh-full" />
                                                            </div>
                                                        } 
                                                        </>
                                                        : ''}
                                                        

                                                    </div>
                                                </div>
                                               
                                            </div>
                                            <div className="flex px-4-5 flex-1 flex-col mt-4-5">
                                                <div className="w-full h-9 flex">
                                                    <a
                                                        onClick={() => {
                                                            props.setGoDetailAudioBook(true)
                                                            setAudioBookID(item.id)
                                                            setContentType(item.content_type)
                                                            //navigate('/learner/catalogue/detailaudiobook/id=' + item.id + '?content_type=' + item.content_type)
                                                        }}
                                                        href="#"
                                                        style={{ fontSize: '15px', fontWeight: '600 !importantoo' }}
                                                        className="t-ellipsis-2 inline-block text-sm-15-18 hover:text-0ba font-medium text-center  text-222">
                                                        {item.name}
                                                    </a>
                                                </div>
                                                <a
                                                    onClick={() => {
                                                        props.setGoDetailAudioBook(true)
                                                        setAudioBookID(item.id)
                                                        setContentType(item.content_type)
                                                        //navigate('/learner/catalogue/detailaudiobook/id=' + item.id + '?content_type=' + item.content_type)
                                                    }}
                                                    href="#" className="">
                                                    <p style={{ fontSize: '1.1rem', height: 32 }} className="text-sm-14-16 text-999 text-center hover:text-0ba mt-1-5  pb-2">
                                                        {item.authors[0].name ? item.authors[0].name : item.authors}
                                                    </p>
                                                </a>
                                            </div>
                                            <div className='progress_view'>
                                                <div className='progress_custom'>
                                                    <progress max="100" value={resultProgressAudioBook?.filter(x => x.audio_id == item.id)[0]?.progress}></progress>
                                                    <div className='view_custom'>
                                                        <span className="pi pi-eye"></span>
                                                        <span className="view">{resultProgressAudioBook?.filter(x => x.audio_id == item.id)[0]?.attmpts || 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}
                            {!resultAudioBook && <div className='no-more-responsive'><span className='mt-4'>Không có sách</span></div>}

                        </div>
                    </div>
                    {resultAudioBook &&
                        <div className='mb-3'>
                            <Paginator
                                first={basicFirst}
                                rows={12}
                                totalRecords={totalAudioBook}
                                onPageChange={onBasicPageChange}
                            ></Paginator>
                        </div>
                    }
                </div>


            }

        </>
    )
};
export default WakaApiList;
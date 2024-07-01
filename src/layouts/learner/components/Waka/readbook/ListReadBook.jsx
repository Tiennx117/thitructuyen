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
import './styles.scss';
import DetailBook from './DetailReadBook';
import { useSelector, useDispatch } from 'react-redux';
// import DropdownFilter from '../../my-learning/DropdownFilter';
import PlayerEpub from './PlayerEpub';
import { Sidebar } from 'primereact/sidebar';
import { Paginator } from "primereact/paginator";
import { setPlayerAudioItem } from "store/playeraudio/detailplayer";
import { setDetailPlayerAudio } from "store/playeraudio/detailaudio";
import { setDetailUrlAudio } from "store/playeraudio/detailurl";
const WakaBookList = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [resultAudioBook, setResultAudioBook] = useState();
    const [totalAudioBook, setTotalAudioBook] = useState();
    const [readBookID, setReadBookID] = useState(0);
    const [contentType, setContentType] = useState(0);
    const [keySearch, setKeySearch] = useState();
    const [data, setData] = useState(null);
    const [keyword, setKeyword] = useState(null);
    const [titleCategory, setTitleCategory] = useState(null);
    const [resultCategory, setResultCategory] = useState();

    const [params, setParams] = useState({
        iss: 262,
        did: 123,
        os: 'web',
        iat: Math.floor(Date.now() / 1000),
        q: null,
        ct: 1,
        ci: 0,
        pn: 1,
        ps: 12
    })

    const [basicFirst, setBasicFirst] = useState(0);

    const load = async () => {
        let resultToken = await wakaService.tokenContentEnterpriseCategory(params);
        let token = resultToken.data;
        let result = await wakaService.listContentEnterpriseCategory(params, token);
        let resultCategory = await wakaService.listEnterpriseCategory(params, token);
        setResultAudioBook(result.data.data);
        setTotalAudioBook(result.data.total);
        setResultCategory(resultCategory.data.data)
    }

    useEffect(() => {
        load();
    }, [params.pn, params.ci]) //

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
                ct: 1
            }
            let tokenSearch = await wakaService.tokenSearchContentWaka(paramsSearch);
            let result = await wakaService.searchListContent(paramsSearch, tokenSearch.data);
            setResultAudioBook(result.data.data.list)
            setTotalAudioBook(result.data.data.total)
        } else {
            load();
        }
    }


    const onSearch = (params) => {
        setKeyword(params.q)
        getSearch(params)
    }

    const getDetailContent = async (item, content_type) => {
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
        setData(result.data.data);

    }

    const [visibleRightEpub, setVisibleRightEpub] = useState(false)
    const handleKeyDown1 = (item, content_type) => {
        setVisibleRightEpub(!visibleRightEpub);
        getDetailContent(item, content_type);
    }

    const closeRightEpub = () => {
        setVisibleRightEpub(false);
        setData(null);
    }

    const onBookID = () => {
        setReadBookID(0)
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

    return (
        <>

            {props.goDetailBook == true && readBookID > 0 ?
                <DetailBook bookID={onBookID} content_type={contentType} read_book_id={readBookID} />
                :
                <div className='d-flex flex-column'>
                    <div className='d-flex justify-content-between' style={{ padding: "0.5rem 1rem" }}>
                        <div style={{ position: 'relative' }}>
                            <b className='font-size-tieude' style={{ color: 'black' }}>
                                Sách đọc
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
                    <span class="mt-2 d-flex flex-row justify-content-start mb-2" style={{ padding: '0.5rem 1rem' }}>
                        <div class="input-field">
                            <input
                                onKeyDown={(e) => handleKeyDown(e, params)}
                                // onChange={(e) => { onChangeText(e.target.value), setValue(e.target.value) }}
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
                    <div className='book-list'>

                        <div className="grid grid-cols-2 2xl:grid-cols-4 gap-8 mt-7-5">

                            {resultAudioBook && resultAudioBook.map(item => {
                                return (
                                    <>
                                        <div class="pb-0-5 pt-7-5 inline-block float-left group animation-content-item col-span-1">
                                            <div

                                                class="w-full bg-white-default rounded-xl shadow border border-white-default px-4-5 hover:border hover:border-0ba relative">
                                                <div class="w-full flex flex-row">
                                                    <div class="w-[153px] -mt-7-5 relative">
                                                        <div class="w-full cursor-pointer pt-full-234-160 border rounded-md border-black-9 relative grid-center">
                                                            <div class="w-full-8 h-1-5 absolute left-center bottom-0 shadow-item"></div>
                                                            <span class="">
                                                                <div
                                                                    onClick={() => {
                                                                        props.setGoDetailBook(true)
                                                                        setReadBookID(item.id)
                                                                        setContentType(item.content_type)
                                                                    }}
                                                                    class="absolute-full rounded-md overflow-hidden">
                                                                    <Image className="object-cover wh-full thumbnail lazyLoad isLoaded" src={item.thumb} />
                                                                    <div class="absolute-full bg-black-15 invisible group-hover:visible"></div>
                                                                </div>
                                                            </span>
                                                            <div
                                                                onClick={() => {
                                                                    dispatch(setDetailPlayerAudio(null))
                                                                    dispatch(setPlayerAudioItem(null))
                                                                    dispatch(setDetailUrlAudio(null))
                                                                    handleKeyDown1(item.id, item.content_type)
                                                                }}
                                                                class="w-12 h-12 btn-action absolute">
                                                                <img src="/images/player/icon-read.svg" alt="icon-read" class="cursor-pointer wh-full" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex flex-1 flex-col ml-4-5 pt-6">
                                                        <span
                                                            onClick={() => {
                                                                props.setGoDetailBook(true)
                                                                setReadBookID(item.id)
                                                                setContentType(item.content_type)
                                                                //navigate('/learner/catalogue/detailaudiobook/id=' + item.id + '?content_type=' + item.content_type)
                                                            }}
                                                            href='javascript:;' class="cursor-pointer t-ellipsis-2 inline-block text-sm-15-18 hover:text-0ba text-222 hover:text-0ba font-medium">
                                                            {item.name}
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                props.setGoDetailBook(true)
                                                                setReadBookID(item.id)
                                                                setContentType(item.content_type)
                                                                //navigate('/learner/catalogue/detailaudiobook/id=' + item.id + '?content_type=' + item.content_type)
                                                            }}
                                                            class="cursor-pointer text-sm-14-16 text-999 hover:text-0ba mt-1-5 t-ellipsis-1">
                                                            {item.authors[0].name ? item.authors[0].name : item.authors}
                                                        </span>
                                                        <span class="">
                                                            <p class="text-sm-14-20 text-222 mt-3-75 t-ellipsis-4" dangerouslySetInnerHTML={{ __html: item?.description ? item?.description : "Không có mô tả." }}>
                                                            </p>
                                                        </span>
                                                    </div>
                                                </div>
                                                <span
                                                    onClick={() => {
                                                        props.setGoDetailBook(true)
                                                        setReadBookID(item.id)
                                                        setContentType(item.content_type)
                                                        //navigate('/learner/catalogue/detailaudiobook/id=' + item.id + '?content_type=' + item.content_type)
                                                    }}
                                                    href='javascript:;' class="cursor-pointer w-max px-3-75 h-7-5 rounded-full text-sm-14-16 text-white-default grid-center absolute bottom-4-5 right-4-5 bg-linear-3 hover:bg-linear-4 invisible group-hover:visible">
                                                    Chi tiết
                                                </span>
                                                <div class="w-full opacity-[.09] h-0-25 bg-linear-1 mt-4-5"></div>
                                            </div>
                                        </div>


                                    </>
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
                    
                    <Sidebar
                        className='sidebar-header-none'
                        visible={visibleRightEpub}
                        // onHide={() => closeRightEpub()} 
                        fullScreen
                        style={{ width: '70%' }}>
                        {
                            <>
                                <Button
                                    style={{ position: 'absolute', right: '10px', zIndex: '999' }}
                                    icon="pi pi-times"
                                    className="p-button-rounded p-button-secondary p-button-text"
                                    aria-label="Cancel"
                                    onClick={() => closeRightEpub()}
                                />
                                {data &&
                                    <PlayerEpub visibleRightEpub={visibleRightEpub} bookId={data?.id} url={data?.epub_link} title={data?.name} publishing={data?.publishing_houses[0]?.name} />
                                }
                            </>
                        }
                    </Sidebar>


                </div>



            }
        </>
    )
};
export default WakaBookList;
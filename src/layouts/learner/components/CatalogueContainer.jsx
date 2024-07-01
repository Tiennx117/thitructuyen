import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { catalogueService } from 'services/catalogueService';
import { Sidebar } from 'primereact/sidebar';
import LearningDetailContainer from './LearningDetailContainer';
import { LoadingPanel } from '../../../components/loader-ui/LoadingPanel';
import DropdownFilter from '../my-learning/DropdownFilter';
import { CourseItemV2 } from '../my-learning/CourseItemV2';
import './style/MultiSelect.scss';
import './style/catalogue.scss';
import PublicCourseByTopicContainer from './PublicCourseByTopicContainer';
import { useNavigate, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import { loadable } from 'shared/utils';
import ListAudioBook from './Waka/ListAudioBook'
import ListBook from './Waka/readbook/ListReadBook'

const CatalogueContainer = (props) => {
    const [loading, setLoading] = useState(false);
    const [courseId, setCourseId] = useState(0);
    const [courseType, setCourseType] = useState("");
    const [visibleRight, setVisibleRight] = useState(false);
    const [expandDoc, setExpandDoc] = useState(false);
    const [expandBook, setExpandBook] = useState(false);
    const [publicCourseItems, setPublicCourseItems] = useState([]);
    const [topicMenu, setTopicMenu] = useState([]);
    const [Keysearch, setKeysearch] = useState("");
    const navigate = useNavigate();
    const [activeItemTopic, setActiveItemTopic] = useState(null);
    const [defaultFilter] = useState({
        sortOrder: "DESC",
        filterBy: "",
        pageNumber: 1,
        pageSize: 12,
        sortBy: "DT_STRT_DT",
        searchBy: "",
        customFilterBy: {
            keywords: [],
            topics: [],
            learningTypes: ["0"],
            creditHrs: 0,
            ratings: ""
        },
        topicId: 0,
        registered: 0
    });
    const [filterBy1, setfilterBy1] = useState({
        sortOrder: "DESC",
        filterBy: "",
        pageNumber: 1,
        pageSize: 12,
        sortBy: "DT_STRT_DT",
        searchBy: "",
        customFilterBy: {
            keywords: [],
            topics: [],
            learningTypes: ["0"],
            creditHrs: 0,
            ratings: ""
        },
        topicId: 0,
        registered: 0
    });

    useEffect(() => {
        let _filter = { ...filterBy1 }
        _filter = { ...filterBy1, pageNumber: 1 };
        loadApi(_filter);
    }, [filterBy1, Keysearch])

    useEffect(() => {
        loadApiGetTopic();
    }, [])

    const [visibleMore, setVisibleMore] = useState(false);
    const onShowMore = async () => {
        let dataTemp;
        filterBy1.pageNumber++;
        setfilterBy1(filterBy1);
        const params = {
            sortOrder: filterBy1.sortOrder,
            filterBy: filterBy1.filterBy,
            pageNumber: filterBy1.pageNumber,
            pageSize: filterBy1.pageSize,
            sortBy: filterBy1.sortBy,
            searchBy: Keysearch,
            customFilterBy: {
                keywords: [],
                topics: [],
                learningTypes: ["0"],
                creditHrs: 0,
                ratings: ""
            },
            topicId: 0,
            registered: filterBy1.registered
        }
        let result = await catalogueService.getpubliccourses(params);
        //xem thêm
        if (result.data.totalRecords <= result.data.pageSize || result.data.totalRecords <= result.data.pageSize * result.data.pageNumber) {
            setVisibleMore(false);
        }
        if (result.data.publicCourseItems.length > 0) {
            dataTemp = [...publicCourseItems, ...result.data.publicCourseItems]
            setPublicCourseItems(dataTemp)
        }

    }

    const loadApi = async (body) => {
        setLoading(true);
        const params = {
            sortOrder: body.sortOrder,
            filterBy: body.filterBy,
            pageNumber: body.pageNumber,
            pageSize: body.pageSize,
            sortBy: body.sortBy,
            searchBy: Keysearch.trim(),
            customFilterBy: {
                keywords: [],
                topics: [],
                learningTypes: ["0"],
                creditHrs: 0,
                ratings: ""
            },
            registered: body.registered
        }
        let result = await catalogueService.getpubliccourses(params);
        setPublicCourseItems(result.data.publicCourseItems);

        if (result.data.totalRecords > result.data.pageSize && result.data.publicCourseItems.length == 12) {
            setVisibleMore(true);
        }
        else {
            setVisibleMore(false);
        }

        setLoading(false);
    }

    const loadApiGetTopic = async () => {
        let result = await catalogueService.getlearningtopics();
        setTopicMenu(result.data.Topics)
    }

    const onClickTitleIner = async (data) => {
        props.onClickTitle(data);
        if (data.LearningType === "T") {
            setCourseId(data.ILTID);
            setCourseType(data.LearningType);
        } else {
            setCourseId(data.CourseID);
            setCourseType(data.LearningType);
        }
        setVisibleRight(true);
    }

    const filterStatus = [
        {
            value: 0,
            text: 'Tất cả'
        },
        {
            value: 2,
            text: 'Chưa đăng ký'
        },
        {
            value: 1,
            text: 'Đã đăng ký'
        }

    ]

    const onChangeFilterStatus = (item) => {
        filterBy1.registered = item.value;
        filterBy1.pageNumber = 1;
        setfilterBy1({ ...filterBy1, registered: item.value, pageNumber: 1 });
    }

    const filterItems = [
        {
            value: 'DT_STRT_DT',
            text: 'Gần đây'
        },
        {
            value: 'DT_END_DT',
            text: 'Ngày kết thúc'
        },
        {
            value: 'VC_ILT_CRS_LNCH_NM',
            text: 'A đến Z'
        },
        {
            value: 'VC_ILT_CRS_LNCH_NM',
            text: 'Z đến A'
        },
        {
            value: 'VIEW_COUNT',
            text: 'Lượt xem'
        },
        {
            value: 'NM_AVG_RTNG',
            text: 'Đánh giá'
        }
    ]

    const onChangeFilter = (item) => {
        let sortOd;
        switch (item.text) {
            case "Gần đây":
                filterBy1.sortOrder = 'DESC';
                sortOd = 'DESC';
                break;
            case "A đến Z":
                filterBy1.sortOrder = 'ASC';
                sortOd = 'ASC';
                break;
            case "Z đến A":
                filterBy1.sortOrder = 'DESC';
                sortOd = 'DESC';
                break;
            case "Ngày kết thúc":
                if(filterBy1.sortBy == item.value && filterBy1.sortOrder == 'ASC')
                {
                    sortOd = 'DESC';
                    filterBy1.sortOrder = 'DESC';
                }
                else
                {
                    sortOd = 'ASC';
                    filterBy1.sortOrder = 'ASC';
                }
                break;
            case "Lượt xem":
                if(filterBy1.sortBy == item.value && filterBy1.sortOrder == 'DESC')
                {
                    sortOd = 'ASC';
                    filterBy1.sortOrder = 'ASC';
                }
                else
                {
                    sortOd = 'DESC';
                    filterBy1.DESC = 'DESC';
                }
                break;
            case "Đánh giá":
                if(filterBy1.sortBy == item.value && filterBy1.sortOrder == 'DESC')
                {
                    sortOd = 'ASC';
                    filterBy1.sortOrder = 'ASC';
                }
                else
                {
                    sortOd = 'DESC';
                    filterBy1.DESC = 'DESC';
                }
                break;

        }
        filterBy1.sortBy = item.value;
        filterBy1.pageNumber = 1;
        setfilterBy1({ ...filterBy1, sortBy: item.value, pageNumber: 1, sortOrder: sortOd });
        //onSubmit(filter);
    }

    const [ChangeText, onChangeText] = useState("");
    function keyDown(e) {
        if (e.key == 'Enter') {
            let newText = e.target.value.trim();
            setKeysearch(newText);
            if(newText == Keysearch){
                loadApi(defaultFilter); // Nếu text search không thay đổi thì sẽ call lại search
            }
        }
    }
    function onKeySearchChange() {
        let newText = value.trim()
        setKeysearch(newText);
    }

    function closeDetail() {
        setVisibleRight(false);
        filterBy1.pageNumber=1
        setfilterBy1(filterBy1)
        loadApi(filterBy1)
    }

    const onReSet = (e) => {
        onChangeText('')
    }
    const onResetFilter = (e) => {
        //debugger
    }

    function openMenuVideoLibrary() {
        const newTab = window.open('', '_blank');
        if (newTab) {
            newTab.location.href = '/learner/video-library/home';
        } else {
            alert('Không thể mở tab mới. Hãy kiểm tra cài đặt trình duyệt của bạn.');
        }
    }
    function openMenuBriefcase() {
        const newTab = window.open('', '_blank');
        if (newTab) {
            newTab.location.href = '/collaborate/briefcase';
        } else {
            alert('Không thể mở tab mới. Hãy kiểm tra cài đặt trình duyệt của bạn.');
        }
    }

    const [onAudioBook, setOnAudioBook] = useState(false)
    const [goDetailAudioBook, setGoDetailAudioBook] = useState(false)
    function openDetailAudioBook() {
        setGoDetailAudioBook(true)
    }

    const [onBook, setOnBook] = useState(false)
    const [goDetailBook, setGoDetailBook] = useState(false)
    function openDetailBook() {
        setGoDetailBook(true)
    }

    const handleItemClick = (index, item) => {
        setExpandBook(true)
        setActiveItemTopic(index);

        if (item.TopicKey == "audiobook") {
            setOnAudioBook(true)
            setGoDetailAudioBook(false)
            setOnBook(false)
        } else if (item.TopicKey == "book") {
            setOnBook(true)
            setGoDetailBook(false)
            setOnAudioBook(false)
        } else {
            setOnAudioBook(false)
            setOnBook(false)
        }
    };

    const tabSelected =
        <div className="progress-list-course nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <div className={(expandBook == false && expandDoc == false) ? 'left-menu-active' : 'left-menu'} style={{ cursor: 'pointer' }}
                onClick={() => {
                    setExpandDoc(false)
                    setExpandBook(false)

                    setKeysearch('')
                    setValue('')//hiển thị text ở thanh search
                    onResetFilter() //reset filterItem
                    loadApi(defaultFilter)
                    navigate('/learner/catalogue')
                }}>
                <div className='d-flex align-items-center'>
                    <div className={(expandBook == false && expandDoc == false) ? 'canv-name text-left-menu-active' : 'canv-name text-left-menu'} >
                        Bài giảng trực tuyến
                    </div>
                </div>
            </div>



            <div className="" style={{ width: '100%', padding: '0.5rem 1rem' }}>
                <div className='d-flex align-items-center'>
                    <div className={expandDoc == true ? 'canv-name text-left-menu-active' : 'canv-name text-left-menu'} >
                        Tài liệu lớp học
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column' style={{ marginLeft: '1rem' }}>
                <NavLink style={{ cursor: 'pointer', marginLeft: '1rem', marginBottom: '0.4rem' }} onClick={() => openMenuVideoLibrary()}  >
                    <i className='pi pi-angle-right' />
                    Thư viện video
                </NavLink>
                <NavLink style={{ cursor: 'pointer', marginLeft: '1rem', marginBottom: '0.4rem' }} onClick={() => openMenuBriefcase()}  >
                    <i className='pi pi-angle-right' />
                    Kho tài liệu
                </NavLink>
            </div>

            <div className={(expandBook == true) ? 'left-menu-active' : 'left-menu'} >
                <div className='d-flex align-items-center'>
                    <div className={expandBook == true ? 'canv-name text-left-menu-active' : 'canv-name text-left-menu'} >
                        Sách và Podcast
                    </div>
                </div>
            </div>

            <div className='d-flex flex-column' style={{ marginLeft: '1rem' }}>
                {topicMenu.length > 0 && topicMenu.map((item, index) => {
                    return (
                        <NavLink onClick={() => handleItemClick(index, item)} key={index} className={({ isActive }) => isActive && expandBook == true ? 'text-topic-menu-active' : 'text-topic-menu'}
                            to={'/learner/catalogue/' + item.TopicKey} >
                            <i className='pi pi-angle-right' />
                            {item.TopicName}
                        </NavLink>
                    )
                })}
            </div>
        </div>

    const catalogueRouters = [
        {
            path: '/audiobook',
            component: loadable(() => import('../components/Waka/ListAudioBook'))
        },
        {
            path: '/audiobook/*',
            component: loadable(() => import('../components/Waka/DetailAudioBook'))
        },


    ]

    const openLeftMenu = () => {
        let overlayElement = document.getElementById('overlay').style.display;
        let leftElement = document.getElementById('left-learning-id').style.display;
        document.getElementById('overlay').style.display = (overlayElement == '' || overlayElement == 'none') ?  'block' : 'none';
        document.getElementById('left-learning-id').style.display = (leftElement == '' || leftElement == 'none') ?  'block' : 'none';
    }

    const [value, setValue] = useState('')
    return (
        <>
            <div className="row my-learning-container">
                <div className='left-learning-icon' onClick={() => {openLeftMenu()}}>
                    <i className='pi pi-align-left' style={{ marginRight: '-10px'}} />
                </div>
                <div id='left-learning-id' className="left-learning col-3 scroll-wrapper left-learning-responsive" style={{ backgroundColor: '#E5E5E5' }}>
                    {tabSelected}
                </div>
                

                <div className="right-learning col-9 scroll-wrapper right-learning-reposive" style={{ backgroundColor: 'white', width: '110%' }}>
                    {expandBook == false &&
                        <div style={{ padding: '0.5rem 1rem' }}>
                            <div className='d-flex justify-content-between card-title-reponsive' style={{ marginBottom: '15px' }}>
                                <div style={{ position: 'relative' }}>
                                    <b className='font-size-tieude' style={{ color: 'black' }}>
                                        BÀI GIẢNG TRỰC TUYẾN
                                    </b>
                                    <span className='bottom-title-learning learning-public'></span>
                                </div>

                                <div className='d-flex flex-row justify-content-end align-items-center' >
                                    <span className='d-flex flex-row border-end' style={{ marginRight: '10px', alignItems: 'center' }}>
                                        <span className='d-flex align-self-center'>
                                            <i className='pi pi-filter' style={{ marginRight: '-10px' }} />
                                        </span>

                                        <DropdownFilter items={filterStatus} onChange={onChangeFilterStatus} />
                                    </span>

                                    <span className='d-flex flex-row justify-content-end'>
                                        <span className='d-flex align-self-center' style={{ marginRight: '-10px' }}>
                                            BỞI
                                        </span>

                                        <DropdownFilter items={filterItems} onChange={onChangeFilter} onReset={onResetFilter} />
                                    </span>
                                </div>

                            </div>
                            <span className='d-flex flex-row justify-content-start mb-2'>
                                <div className="input-field">
                                    <input value={value} className="search-box" id="topicSearch" type="text" onKeyDown={(e) => keyDown(e)} onChange={(e) => { setValue(e.target.value) }} placeholder="Tìm kiếm dựa trên Tên / Mô tả / Chủ đề / Từ khoá / Mã khoá học / Nội dung" />
                                    {/* <input className="search-box-responsive" id="topicSearch-responsive" type="text" onKeyDown={(e) => keyDown(e)} onChange={(e) => setValue('searchBy', e.target.value)} placeholder="Tìm kiếm" /> */}
                                    {/* <button className="close-icon" type="reset" onClick={() => onReSet()} /> */}
                                    <button className="search-icon" icon="pi pi-search" onClick={(e) => onKeySearchChange()} />
                                </div>
                            </span>

                            <LoadingPanel loading={loading}>
                                <div className="card-deck card-small-device" style={{ flexWrap: 'wrap !important', marginLeft: '-3px' }}>
                                    {publicCourseItems.map((dataItem, index) => {
                                        return (<CourseItemV2 isMyLearning={false} onClickTitle={(data) => onClickTitleIner(data)} key={index} dataItem={dataItem} />)
                                    })}
                                    <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                                        {
                                            <>
                                                <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                                                <LearningDetailContainer isMyLearning={false} idCourse={courseId} nameCourseType={courseType} isCatalogue={true} />
                                            </>
                                        }
                                    </Sidebar>
                                </div>
                            </LoadingPanel>
                            <div>
                                {publicCourseItems == '' ? <div className='no-more-responsive'><span className='mt-4'>Không có mục nào để hiển thị.</span></div> : ''}
                                {
                                    visibleMore &&
                                    <div className="d-flex justify-content-end" style={{ right: '20px', left: '20px' }}>
                                        <Button className='btn-showmore' label="Xem nhiều hơn" onClick={onShowMore} style={{ backgroundColor: 'white', color: '#1aa1dc', borderColor: 'white' }} />
                                    </div>
                                }
                            </div>
                        </div>
                    }



                    {/* {expandBook == true &&
                        <main className="container-fluid mt-2">
                            <Routes>
                                {
                                    catalogueRouters.map(({ path, component: Component }, index) => {
                                        return (<Route path={path} key={index} element={<Component />} />)
                                    })
                                }
                            </Routes>
                            <Outlet />
                        </main>
                    } */}

                    {onAudioBook == true && expandBook == true &&
                        <ListAudioBook goDetailAudioBook={goDetailAudioBook} setGoDetailAudioBook={() => openDetailAudioBook()} />

                    }

                    {onBook == true && expandBook == true &&
                        <ListBook goDetailBook={goDetailBook} setGoDetailBook={() => openDetailBook()} />
                    }

                    {topicMenu.length > 0 && expandBook == true && topicMenu.map((item, index) => {
                        return (
                            <>
                                {item.TopicKey != 'audiobook' && item.TopicKey != 'book' &&
                                    <>
                                        {activeItemTopic == index &&
                                            <PublicCourseByTopicContainer topicID={item.TopicId} title={item.TopicName} />
                                        }
                                    </>
                                }
                            </>
                        )
                    })
                    }

                </div >
            </div >
            <div id="overlay" onClick={()=>{
                document.getElementById("overlay").style.display = "none";
                document.getElementById("left-learning-id").style.display = "none";
            }}></div>
        </>
    )
}

CatalogueContainer.defaultProps = {
    onChange: () => { },
    onClickTitle: () => { }
}

CatalogueContainer.propTypes = {
    tabIndex: PropTypes.number,
    idCourse: PropTypes.number,
    nameCourseType: PropTypes.string,
    onChange: PropTypes.func,
    onClickTitle: PropTypes.func
};
export default CatalogueContainer;
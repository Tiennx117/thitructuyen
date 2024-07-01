import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import LearningDetailContainer from './LearningDetailContainer';
import { LoadingPanel } from '../../../components/loader-ui/LoadingPanel';
import { CourseItemV2 } from '../my-learning/CourseItemV2';
import './style/MultiSelect.scss';
import './style/catalogue.scss';
import { coursesLocation } from 'services/coursesLocation';
import { NavLink, Routes, Outlet, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PanelMenu } from 'primereact/panelmenu';
import Image from "components/Image"
import CoursesLocationNew from './CoursesLocationNew';
import { InputText } from 'primereact/inputtext';
import { CascadeSelect } from "primereact/cascadeselect";
const imglearn = window.location.origin + '/images/learn.png';
const CoursesLocationV2 = (props) => {
    let navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState(null);
    const descriptionMenu = useSelector(state => state.oauth.descriptionMenu) || "";
    const location = useLocation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loadingLoadmore, setLoadingLoadmore] = useState(false);
    const [isHovered, setHovered] = useState(false);
    const [courseId, setCourseId] = useState(0);
    const [idmenu, setidmenu] = useState(0);
    const [courseType, setCourseType] = useState("");
    const [coursesLocationTitle, setCoursesLocationTitle] = useState("");
    const [coursesDescription, setCoursesDescription] = useState(descriptionMenu);
    const [coursesID, setCoursesID] = useState(0);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleShowCourse, setVisibleShowCourse] = useState(false);
    const [visibleShowAll, setVisibleShowAll] = useState(false);
    const [isCourseNoTitle, setIsCourseNoTitle] = useState(false);
    const [CourseItems1, setCourseItems1] = useState([]);
    const [menuCoursesLocation, setMenuCoursesLocation] = useState([]);
    const [Keysearch, setKeysearch] = useState('');
    const [dataCourse, setDataCourse] = useState([]);
    const [dataCourseNotitle, setDataCourseNotitle] = useState([]);
    const [visibleSearch, setVisibleSearch] = useState(false);
    const [showChil, setShowChil] = useState(false);
    const [filterBy1, setfilterBy1] = useState({
        MasterCoursesLocation: 0,
        PageNumber: 1,
        RecordsPerPage: 10,
        CoursesLocationTitle: ""
    });
    const [filterBy, setFilterBy] = useState({
        SearchText: "",
        SearchBy: "VC_CRS_LCTN_FL_NM",
        SortBy: "asc",
        PageNumber: 1,
        RecordsPerPage: 50
    });
    useEffect(() => {
        let _filter = { ...filterBy1 }
        _filter = { ...filterBy1, PageNumber: 1 };
        loadApi(_filter);
    }, [])
    const [visibleMore, setVisibleMore] = useState(false);
    const onShowMore = async () => {
        setLoadingLoadmore(true);
        let dataTemp;
        filterBy1.PageNumber++;
        setfilterBy1(filterBy1);

        if (!visibleShowAll) {
            const params = {
                MasterCoursesLocation: filterBy1.MasterCoursesLocation,
                PageNumber: filterBy1.PageNumber,
                RecordsPerPage: filterBy1.RecordsPerPage,
                CoursesLocationTitle: filterBy1.CoursesLocationTitle
            }
            let result1 = await coursesLocation.getListCoursesLocation(params);
            if (result1.data.length > 0) {
                dataTemp = [...CourseItems1, ...result1.data]
                setCourseItems1(dataTemp)
                if (dataTemp.length < dataTemp[0].TotalRecords) {
                    setVisibleMore(true);
                }
                else {
                    setVisibleMore(false);
                }
            }
        }
        else {
            let result1
            if (isCourseNoTitle) {
                const params = {
                    SearchText: "",
                    SearchBy: "VC_CRS_LCTN_FL_NM",
                    SortBy: "asc",
                    PageNumber: filterBy1.PageNumber,
                    RecordsPerPage: filterBy1.RecordsPerPage,
                }
                result1 = await coursesLocation.GetAllCoursesLocationByMenu({ ...params, ParenId: filterBy1.MasterCoursesLocation });
                setCourseItems1(result1.data)
                if (result1.data.length > 0) {
                    dataTemp = [...CourseItems1, ...result1.data]
                    setCourseItems1(dataTemp);
                    if (result1.data.length == 10) {
                        if (dataTemp.length < dataTemp[0].TotalRecords) {
                            setVisibleMore(true);
                        }
                        else {
                            setVisibleMore(false);
                        }
                    } else {
                        setVisibleMore(false);
                    }
                }
            }
            else {
                const params = {
                    SearchText: "",
                    SearchBy: "VC_CRS_LCTN_FL_NM",
                    SortBy: "asc",
                    PageNumber: filterBy1.PageNumber,
                    RecordsPerPage: filterBy1.RecordsPerPage + 40,
                }
                result1 = await coursesLocation.GetCoursesLocationDetail({ ...params, ParenId: filterBy1.MasterCoursesLocation });
                if (result1.data.ListCourses[0].ListCourses.length > 0) {
                    dataTemp = [...CourseItems1, ...result1.data.ListCourses[0].ListCourses]
                    setCourseItems1(dataTemp)
                    if (dataTemp.length < result1.data.ListCourses[0].TotalRecords) {
                        setVisibleMore(true);
                    }
                    else {
                        setVisibleMore(false);
                    }
                }
            }


        }

        setLoadingLoadmore(false);
    }
    const showAll = async (id, title, IsCourse, CoursesDescription) => {
        if (CoursesDescription != undefined) {
            setCoursesDescription(CoursesDescription);
        }
        setIsCourseNoTitle(IsCourse);
        setLoading(true);
        if (!IsCourse) {
            setCoursesLocationTitle(title);
            setVisibleShowAll(true);
            filterBy1.CoursesLocationTitle = Keysearch;
            filterBy1.PageNumber = 1; // reset pagenumber
            filterBy1.MasterCoursesLocation = id;
            setfilterBy1(filterBy1);
            const params = {
                SearchText: '',
                SearchBy: "VC_CRS_LCTN_FL_NM",
                SortBy: "asc",
                PageNumber: 1,
                RecordsPerPage: 50
            }
            let result1 = await coursesLocation.GetCoursesLocationDetail({ ...params, ParenId: id });
            // let result1 = await coursesLocation.GetCoursesLocationDetail({ ...params, ParenId: body.MasterCoursesLocation });
            setCourseItems1(result1.data.ListCourses[0].ListCourses)
            if (result1.data.ListCourses[0].ListCourses.length > 0) {
                if (result1.data.ListCourses[0].ListCourses.length == 50) {
                    if (result1.data.ListCourses[0].ListCourses.length < result1.data.ListCourses[0].TotalRecords) {
                        setVisibleMore(true);
                        setVisibleShowCourse(true);
                    }
                    else {
                        setVisibleMore(false);
                        setVisibleShowCourse(false);
                    }
                } else {
                    setVisibleMore(false);
                    setVisibleShowCourse(false);
                }
            }
            else {
                setVisibleShowCourse(false);
            }
        }
        else {
            setCoursesLocationTitle(title);
            setVisibleShowAll(true);
            filterBy1.CoursesLocationTitle = Keysearch;
            filterBy1.PageNumber = 1; // reset pagenumber
            filterBy1.MasterCoursesLocation = id;
            setfilterBy1(filterBy1);
            const params = {
                SearchText: '',
                SearchBy: "VC_CRS_LCTN_FL_NM",
                SortBy: "asc",
                PageNumber: 1,
                RecordsPerPage: 10
            }
            let result1 = await coursesLocation.GetAllCoursesLocationByMenu({ ...params, ParenId: id });
            setCourseItems1(result1.data)
            if (result1.data.length > 0) {
                if (result1.data.length == 10) {
                    if (result1.data.length < result1.data[0].TotalRecords) {
                        setVisibleMore(true);
                        setVisibleShowCourse(true)
                    }
                    else {
                        setVisibleMore(false);
                        setVisibleShowCourse(false)
                    }
                } else {
                    setVisibleMore(false);
                    setVisibleShowCourse(true)
                }
            }
            else {
                setVisibleShowCourse(false);
            }
        }
        setCoursesID(id);
        setLoading(false);
    }
    const loadApi = async (body) => {
        setLoading(true);
        let result = await coursesLocation.getMenuCoursesLocationList({});
        let menuItems = changeDoman(result.data);
        setMenuCoursesLocation(menuItems)
        setVisibleShowCourse(true);
        var param = { ...filterBy, SearchBy: 'CRS_LCTN_STT' }
        let result1 = await coursesLocation.GetAllCoursesLocation(param);
        setDataCourse(result1.data.ListCourses);
        setDataCourseNotitle(result1.data.ListCoursesNotilte)
        setCourseItems1([]);
        setLoading(false);
    }
    const loadApi1 = async (body) => {
        setLoading(true);
        let result1
        // filterBy1.CoursesLocationTitle = Keysearch;
        filterBy1.PageNumber = 1; // reset pagenumber
        setfilterBy1(filterBy1);
        const params = {
            MasterCoursesLocation: filterBy1.MasterCoursesLocation,
            PageNumber: filterBy1.PageNumber,
            RecordsPerPage: filterBy1.RecordsPerPage,
            CoursesLocationTitle: filterBy1.CoursesLocationTitle
        }
        // let result1 = await coursesLocation.getListCoursesLocation(params);
        // setCourseItems1(result1.data)
        if (isCourseNoTitle) {
            result1 = await coursesLocation.GetAllCoursesLocationByMenu({ ...filterBy, ParenId: filterBy1.MasterCoursesLocation, SearchText: body.CoursesLocationTitle });
            setCourseItems1(result1.data)
            if (result1.data.length > 0) {
                setCourseItems1(result1.data);
                if (result1.data.length == 10) {
                    if (result1.data.length < result1.data[0].TotalRecords) {
                        setVisibleMore(true);
                    }
                    else {
                        setVisibleMore(false);
                    }
                } else {
                    setVisibleMore(false);
                }
            }
        } else {
            result1 = await coursesLocation.GetCoursesLocationDetail({ ...filterBy, ParenId: body.MasterCoursesLocation, SearchText: body.CoursesLocationTitle });
            setCourseItems1(result1.data.ListCourses[0].ListCourses);
            if (result1.data.ListCourses[0].ListCourses.length > 0) {
                if (result1.data.ListCourses[0].ListCourses.length == 10) {
                    if (result1.data.ListCourses[0].ListCourses.length < result1.data.ListCourses[0].TotalRecords) {
                        setVisibleMore(true);
                    }
                    else {
                        setVisibleMore(false);
                    }
                } else {
                    setVisibleMore(false);
                }
            }
            else {
                setVisibleShowCourse(false);
                setVisibleMore(false);
            }
        }
        setDataCourse([]);
        setDataCourseNotitle([])
        setLoading(false);
    }
    const onClickTitleIner = async (data) => {
        props.onClickTitle(data);
        // if (data.LearningType === "T") {
        //     setCourseId(data.ILTID);
        //     setCourseType(data.LearningType);
        // } else {
        //     setCourseId(data.CourseID);
        //     setCourseType(data.LearningType);
        // }
        setCourseType(data.LearningType);
        setCourseId(data.CoursesID);
        setVisibleRight(true);
    }
    function changeDoman(data) {
        return data.map((menuItem) => {
            let modifiedMenuItem = { ...menuItem, command: () => handleItemClick(menuItem.CoursesLocationId, menuItem.label, menuItem.Description, menuItem.items.length) };
            if (menuItem.items && menuItem.items.length > 0) {
                modifiedMenuItem.items = changeDoman(menuItem.items);
            }

            return modifiedMenuItem;
        });
    }

    const [ChangeText, onChangeText] = useState("");
    function keyDown(e) {
        if (e.key == 'Enter') {
            // if (coursesID != 0) {
            let newText = e.target.value.trim()
            setKeysearch(newText);
            filterBy1.CoursesLocationTitle = e.target.value.trim();
            filterBy1.PageNumber = 1;
            filterBy.SearchText = newText;
            setfilterBy1(filterBy1);
            if (visibleShowAll) {
                loadApi1({ ...filterBy1 });
            }
            else {
                loadApi();
            }
            // }

        }
    }
    function onKeySearchChange() {
        let newText = ChangeText.trim()
        setKeysearch(newText);
    }
    function closeDetail() {
        setVisibleRight(false);
        let _filter = { ...filterBy1 }
        _filter = { ...filterBy1, PageNumber: 1 };
        if (visibleShowAll) {
            loadApi1(_filter);
        }
        else {
            loadApi(_filter);
        }
    }
    //click menu left
    const handleItemClick = (id, title, description, countItem) => {
        filterBy1.MasterCoursesLocation = id;
        filterBy1.PageNumber = 1;
        setfilterBy1(filterBy1)
        onChangeText("")
        setKeysearch("");
        //loadApi1(param);
        setVisibleMore(false);
        setCoursesID(id);
        if (countItem == 0) {
            setCoursesLocationTitle(title);
            setCoursesDescription(description);
            showAll(id, title, false);
            setHovered(false);
        }

    };

    const openLeftMenu = () => {
        let overlayElement = document.getElementById('overlay').style.display;
        let leftElement = document.getElementById('left-learning-id').style.display;
        document.getElementById('overlay').style.display = (overlayElement == '' || overlayElement == 'none') ? 'block' : 'none';
        document.getElementById('left-learning-id').style.display = (leftElement == '' || leftElement == 'none') ? 'block' : 'none';
    }
    const onShowHome = () => {
        setCourseItems1([]);
        filterBy1.MasterCoursesLocation = 0;
        filterBy.SearchText = "";
        onChangeText("");
        setfilterBy1(filterBy1);
        setCoursesLocationTitle("");
        setVisibleMore(false);
        setVisibleShowCourse(true);
        setCoursesID(0);
        setCoursesDescription(descriptionMenu);
        let _filter = { ...filterBy1 }
        _filter = { ...filterBy1, PageNumber: 1 };
        loadApi(_filter);
        setHovered(false);
        setVisibleShowAll(false);
    }
    const onShowMenu = () => {
        var menuLeft = document.getElementById('menu-left');
        var displayValue = window.getComputedStyle(menuLeft).getPropertyValue('display');
        menuLeft.style.display = (displayValue === 'none') ? 'block' : 'none';
    }
    const handleHover = () => {
        setHovered(true);
    };

    const handleLeave = () => {
        setHovered(false);
    };
    const closeSearchText = () => {
        setVisibleSearch(false)
        filterBy.SearchText = "";
        onChangeText("");
        if (coursesLocationTitle == "") {
            let _filter = { ...filterBy1 }
            _filter = { ...filterBy1, PageNumber: 1 };
            loadApi(_filter);
        }
        else {
            let _filter = { ...filterBy1 }
            _filter = { ...filterBy1, PageNumber: 1, CoursesLocationTitle: "" };
            loadApi1(_filter);
        }

    }
    const menuClasses = `col-3 ${isHovered ? 'visible' : ''}`;
    return (
        <>
            <div className="row my-learning-container">
                {menuCoursesLocation.length > 0 ?
                    <>
                        <div onMouseEnter={handleHover}
                            onMouseLeave={handleLeave} id='menu-left' className={menuClasses} style={{ marginTop: coursesDescription != "" ? '-5px' : 0, marginRight: visibleSearch ? "400px" : 0 }}>
                            <div id='left-learning-id' className="left-learning  scroll-wrapper left-learning-responsive" >
                                <div className="progress-list-course nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <div className='p-component p-panelmenu-header' style={{
                                        cursor: 'pointer', width: '100%',
                                        padding: '1rem', backgroundColor: '#f8f9fa', color: '#495057', fontWeight: '600',
                                        borderTop: '1px solid #dee2e6', borderLeft: '1px solid #dee2e6', borderRight: '1px solid #dee2e6'
                                    }} onClick={() => onShowHome()}>
                                        <span className='p-panelmenu-header'>Tất cả danh mục</span>
                                    </div>
                                    <PanelMenu model={menuCoursesLocation} className="w-full md:w-25rem" />
                                </div>
                            </div>
                        </div>
                        <div className="right-learning col-12 scroll-wrapper right-learning-reposive" style={{ backgroundColor: 'white', width: '110%' }}>
                            <div className="tab-content w-100" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    <Card id='yourCardId' style={{ minHeight: '80vh' }}>
                                        <div >
                                            <div className='d-flex justify-content-between' style={{ marginBottom: "10px" }}>
                                                <div className='d-flex'>
                                                    <div style={{ position: 'relative' }}>
                                                        <b className='font-size-tieude' style={{ color: 'black' }}>
                                                            {coursesLocationTitle.toUpperCase() || "HÀNH TRANG SỐ"}
                                                        </b>
                                                        <span style={{ width: coursesLocationTitle == "" ? "180px" : "50px" }} className='bottom-title-learning learning-public'></span>
                                                    </div>

                                                </div>
                                                <div className='d-flex'>
                                                    <div style={{ cursor: 'pointer', marginRight: "10px", minWidth: '200px', display: 'flex', justifyContent: 'flex-end' }} onMouseEnter={handleHover}
                                                        onMouseLeave={handleLeave}>
                                                        <span className='dropdown-toggle' style={{ fontSize: "16px", fontWeight: '700' }}>{coursesLocationTitle || "Tất cả danh mục"}</span>
                                                    </div>
                                                    <div>
                                                        <span className="p-inputgroup">
                                                            {
                                                                visibleSearch == true ?
                                                                    <div className='p-input-icon-right input-style'>
                                                                        <i className="pi pi-times" onClick={() => closeSearchText()} />
                                                                        {/* value={keySearchOld} */}
                                                                        <InputText autoFocus onKeyDown={(e) => keyDown(e)} value={ChangeText} onChange={(e) => onChangeText(e.target.value)} visible={visibleSearch} onHide={() => setVisibleSearch(false)} placeholder="Tên khóa học/ Mã nội dung" style={{ width: '100%' }} />
                                                                    </div>
                                                                    :
                                                                    ''
                                                            }
                                                            {
                                                                visibleSearch == false ?
                                                                    <i className="ml-2 fa-sharp fa-solid fa-magnifying-glass align-self-center" type='button' style={{ fontSize: '16px' }} onClick={() => setVisibleSearch(true)}></i>
                                                                    :
                                                                    ''
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ marginLeft: '2.5 rem' }}>
                                                {coursesDescription}
                                            </div>
                                            {visibleShowAll &&
                                                <div style={{
                                                    fontSize: '14px', fontWeight: '600', cursor: "pointer", textDecoration: "underline", display: 'flex',
                                                    justifyContent: 'flex-end'
                                                }} onClick={() => onShowHome()}>Quay lại</div>
                                            }
                                        </div>

                                        <div >
                                            <LoadingPanel loading={loading}>
                                                {
                                                    CourseItems1.length > 0 ?
                                                        <div className="card-deck card-small-device" style={{ marginLeft: '30px', marginTop: '20px', flexWrap: 'wrap !important' }}>
                                                            {CourseItems1.map((dataItem, index) => {
                                                                return (<CourseItemV2 isMyLearning={false} onClickTitle={(data) => onClickTitleIner(data)} key={index} dataItem={dataItem} />)
                                                            })}
                                                        </div>

                                                        :
                                                        (
                                                            !visibleShowCourse ?
                                                                <div className='no-more-responsive' style={{ marginTop: 10 }}>
                                                                    <span className='mt-4'>Không có mục nào để hiển thị.</span>
                                                                </div>
                                                                :
                                                                <CoursesLocationNew
                                                                    handleItemClick={(id, title) => handleItemClick(id, title)}
                                                                    onClickTitleIner={(data) => onClickTitleIner(data)}
                                                                    loading={loading}
                                                                    Keysearch={Keysearch}
                                                                    showAll={(id, title, IsCourse, CoursesDescription) => showAll(id, title, IsCourse, CoursesDescription)}
                                                                    coursesID={coursesID}
                                                                    dataCourse={dataCourse}
                                                                    dataCourseNotitle={dataCourseNotitle}
                                                                    title={coursesLocationTitle}
                                                                >
                                                                </CoursesLocationNew>
                                                        )
                                                }
                                                <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                                                    {
                                                        <>
                                                            <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                                                            <LearningDetailContainer isMyLearning={false} idCourse={courseId} isCatalogue={true} />
                                                        </>
                                                    }
                                                </Sidebar>
                                            </LoadingPanel>
                                            <div>
                                                {
                                                    visibleMore &&
                                                    <div className="d-flex justify-content-end" style={{ right: '20px', left: '20px' }}>
                                                        <Button className='btn-showmore' label="Xem nhiều hơn" loading={loadingLoadmore} onClick={onShowMore} style={{ backgroundColor: 'white', color: '#1aa1dc', borderColor: 'white' }} />
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                    </Card>
                                </div>


                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='no-more-responsive'><span className='mt-4' style={{ fontSize: '2rem', fontWeight: 600 }}>Không có dữ liệu hiển thị.</span></div>
                    </>

                }
                <div id="overlay" onClick={() => {
                    document.getElementById("overlay").style.display = "none";
                    document.getElementById("left-learning-id").style.display = "none";
                }}></div>
            </div >
        </>
    )
}

CoursesLocationV2.propTypes = {
    onChange: PropTypes.func
};
CoursesLocationV2.defaultProps = {
    onChange: () => { }
}
CoursesLocationV2.propTypes = {
    onClickTitle: PropTypes.func
};
CoursesLocationV2.defaultProps = {
    onClickTitle: () => { }
}
CoursesLocationV2.propTypes = {
    tabIndex: PropTypes.number,
    idCourse: PropTypes.number,
    nameCourseType: PropTypes.string,
};
export default CoursesLocationV2;
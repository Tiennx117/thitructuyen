import React, { useState, useEffect } from 'react';
import { loadable } from 'shared/utils';
import PropTypes from 'prop-types';
import { Card } from "primereact/card";
import { setListChannel } from 'store/listchannel/listChannelSlice';
import { FaSearch, FaStar } from 'react-icons/fa';
import { Checkbox } from 'primereact/checkbox';
import { videoService } from "services/videoService";
import CardCollapseMb from 'components/CardCollapseMb';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { catalogueService } from 'services/catalogueService';
import { useListState } from 'shared/hooks/useListState';
import Course from './Course';
import { arrow, left } from '@popperjs/core';
import { learnerService } from 'services/learnerService';
import { Sidebar } from 'primereact/sidebar';
import LearningDetailContainer from './LearningDetailContainer';
import { learningService } from 'services/learningService';
import { LoadingPanel } from '../../../components/loader-ui/LoadingPanel';
import DropdownFilter from '../my-learning/DropdownFilter';
import { CourseItemV2 } from '../my-learning/CourseItemV2';
import { MdSkipNext } from 'react-icons/md';
import { MultiSelect } from 'primereact/multiselect';
import './style/MultiSelect.scss';
import LstChannel from "../video-library/LstChannel";
import ListVideoChannel from "../video-library/ListVideoChannel";
import CheckBoxCatalogue from './CheckBoxCatalogue';
import CheckBoxTopicCatalogi from './CheckBoxTopicCatalogi';
import './style/catalogue.scss';
import { coursesLocation } from 'services/coursesLocation';
import { StatisticCourseList } from './StatisticCourseList';
import { NavLink, Routes, Outlet, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PanelMenu } from 'primereact/panelmenu';
import Image from "components/Image"
import CoursesLocationNew from './CoursesLocationNew';
const imglearn = window.location.origin + '/images/learn.png';
const CoursesLocation = (props) => {
    let navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loadingLoadmore, setLoadingLoadmore] = useState(false);

    const [courseId, setCourseId] = useState(0);
    const [idmenu, setidmenu] = useState(0);
    const [courseType, setCourseType] = useState("");
    const [coursesLocationTitle, setCoursesLocationTitle] = useState("");
    const [visibleRight, setVisibleRight] = useState(false);
    const [CourseItems1, setCourseItems1] = useState([]);
    const [menuCoursesLocation, setMenuCoursesLocation] = useState([]);
    const [Keysearch, setKeysearch] = useState('');
    const [filterBy1, setfilterBy1] = useState({
        MasterCoursesLocation: 0,
        PageNumber: 1,
        RecordsPerPage: 8,
        CoursesLocationTitle: ""
    });
    useEffect(() => {
        let _filter = { ...filterBy1 }
        _filter = { ...filterBy1, PageNumber: 1 };
        loadApi(_filter);

    }, [])
    useEffect(() => {
        let _filter = { ...filterBy1 }
        _filter = { ...filterBy1, PageNumber: 1 };
        if (visibleRight != true) {
            loadApi1(_filter);
        }


    }, [filterBy1, Keysearch, visibleRight])

    const [visibleMore, setVisibleMore] = useState(false);
    const onShowMore = async () => {

        setLoadingLoadmore(true);
        let dataTemp;
        filterBy1.PageNumber++;
        setfilterBy1(filterBy1);

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
        setLoadingLoadmore(false);
    }

    const loadApi = async (body) => {
        setLoading(true);

        let result = await coursesLocation.getMenuCoursesLocationList({});
        let menuItems = changeDoman(result.data);
        setMenuCoursesLocation(menuItems)
        if (result.data.length > 0) {
            filterBy1.MasterCoursesLocation = menuItems[0].CoursesLocationId;
            setfilterBy1(filterBy1)
            const params = {
                MasterCoursesLocation: menuItems[0].CoursesLocationId,
                PageNumber: body.PageNumber,
                RecordsPerPage: body.RecordsPerPage,
                CoursesLocationTitle: body.CoursesLocationTitle
            }
            setCoursesLocationTitle(menuItems[0].label)
            let result1 = await coursesLocation.getListCoursesLocation(params);

            setCourseItems1(result1.data)
            if (result1.data.length > 0) {
                if (result1.data.length == 8) {
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
        }
        setLoading(false);
    }
    const loadApi1 = async (body) => {
        setLoading(true);
        filterBy1.CoursesLocationTitle = Keysearch;
        filterBy1.PageNumber = 1; // reset pagenumber
        setfilterBy1(filterBy1)
        const params = {
            MasterCoursesLocation: body.MasterCoursesLocation,
            PageNumber: body.PageNumber,
            RecordsPerPage: body.RecordsPerPage,
            CoursesLocationTitle: filterBy1.CoursesLocationTitle
        }
        let result1 = await coursesLocation.getListCoursesLocation(params);
        setCourseItems1(result1.data)
        if (result1.data.length > 0) {
            if (result1.data.length == 8) {
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
            let modifiedMenuItem = { ...menuItem, command: () => handleItemClick(menuItem.CoursesLocationId, menuItem.label) };
            if (menuItem.items && menuItem.items.length > 0) {
                modifiedMenuItem.items = changeDoman(menuItem.items);
            }

            return modifiedMenuItem;
        });
    }

    const [ChangeText, onChangeText] = useState("");
    function keyDown(e) {
        if (e.key == 'Enter') {
            let newText = e.target.value.trim()
            setKeysearch(newText);
            // setValue('searchBy', e.target.value);
            filterBy1.CoursesLocationTitle = e.target.value.trim();
            // filterBy1.pageNumber = 1;
            setfilterBy1(filterBy1);
            if (newText == Keysearch) {
                loadApi1(filterBy1);
            }
            //onSubmit(filter);
        }
    }
    function onKeySearchChange() {
        let newText = ChangeText.trim()
        setKeysearch(newText);
    }
    function closeDetail() {
        setVisibleRight(false);
        //getpubliccourses(filter);
        loadTypeList();
    }
    const handleItemClick = (id, title) => {
        let param = {
            MasterCoursesLocation: id,
            PageNumber: 1,
            RecordsPerPage: 8,
            CoursesLocationTitle: ""
        }
        filterBy1.MasterCoursesLocation = id;
        filterBy1.PageNumber = 1;
        setfilterBy1(filterBy1)
        onChangeText("")
        setKeysearch("");
        loadApi1(param);
        setCoursesLocationTitle(title)
    };

    const openLeftMenu = () => {
        let overlayElement = document.getElementById('overlay').style.display;
        let leftElement = document.getElementById('left-learning-id').style.display;
        document.getElementById('overlay').style.display = (overlayElement == '' || overlayElement == 'none') ? 'block' : 'none';
        document.getElementById('left-learning-id').style.display = (leftElement == '' || leftElement == 'none') ? 'block' : 'none';
    }
    return (
        <>
            <div className="row my-learning-container">
                {menuCoursesLocation.length > 0 ?
                    <>
                        <div className='left-learning-icon' onClick={() => { openLeftMenu() }}>
                            <i className='pi pi-align-left' style={{ marginRight: '-10px' }} />
                        </div>
                        <div id='left-learning-id' className="left-learning col-3 scroll-wrapper left-learning-responsive" style={{ backgroundColor: '#E5E5E5' }}>
                            <div className="progress-list-course nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <PanelMenu model={menuCoursesLocation} className="w-full md:w-25rem" />
                            </div>
                        </div>
                        <div className="right-learning col-9 scroll-wrapper right-learning-reposive" style={{ backgroundColor: 'white', width: '110%' }}>
                            <div className="tab-content w-100" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    <Card>
                                        <div className='d-flex justify-content-between'>
                                            <div style={{ position: 'relative' }}>
                                                <b className='font-size-tieude' style={{ color: 'black' }}>
                                                    {coursesLocationTitle.toUpperCase()}
                                                </b>
                                                <span className='bottom-title-learning learning-public'></span>
                                            </div>
                                        </div>
                                        <span className='d-flex flex-row justify-content-start mt-4 mb-2'>
                                            <div className="input-field">
                                                <input className="search-box" id="topicSearch" type="text" value={ChangeText} onKeyDown={(e) => keyDown(e)} onChange={(e) => onChangeText(e.target.value)} placeholder="Tìm kiếm theo tên thư mục/ Khóa học/ Mã nội dung" />
                                                {/* <input className="search-box-responsive" id="topicSearch-responsive" type="text" onKeyDown={(e) => keyDown(e)} onChange={(e) => setValue('searchBy', e.target.value)} placeholder="Tìm kiếm" /> */}
                                                {/* <button className="close-icon" type="reset" onClick={() => onReSet()} /> */}
                                                <button className="search-icon" icon="pi pi-search" onClick={(e) => onKeySearchChange()} />
                                            </div>
                                        </span>

                                        <LoadingPanel loading={loading}>
                                            <div className="card-deck card-small-device" style={{ flexWrap: 'wrap !important' }}>
                                                {CourseItems1.length > 0 ?
                                                    CourseItems1.map((dataItem, index) => {
                                                        console.log(dataItem.Type)
                                                        if (dataItem.Type == 'D') {
                                                            let url = "";

                                                            if (dataItem?.URL_IMG == "") {
                                                                if (dataItem?.IS_FLDR == 0) {
                                                                    url = window.location.origin + '/images/Bgr-folder-2.jpg'
                                                                }
                                                                else {
                                                                    url = window.location.origin + '/images/Brg-folder-1.jpg'
                                                                }
                                                            }
                                                            else {
                                                                url = dataItem?.URL_IMG.replace(/ImageWidth=125&ImageHeight=120/g, 'ImageWidth=375');;
                                                            }
                                                            return (<>
                                                                <div className="course-item d-flex flex-column justify-content-between ml-2 mr-2 mb-2 course-small-device">
                                                                    <div className="bg-course d-flex justify-content-center">
                                                                        <Image
                                                                            src={url}
                                                                        ></Image>
                                                                    </div>

                                                                    {/* title */}
                                                                    <div className="d-flex flex-row justify-content-between flex-grow-1 ml-2 mr-2 pt-2">
                                                                        <span onClick={() => handleItemClick(dataItem.CoursesLocationId, dataItem.CoursesLocationTitle)} className="title-text fw-bold cursor-pointer" title={dataItem?.CoursesLocationTitle} data-pr-tooltip="A Disabled Button" data-pr-position="top" dangerouslySetInnerHTML={{ __html: dataItem?.CoursesLocationTitle }}>

                                                                        </span>
                                                                    </div>



                                                                    {/* footer */}
                                                                    <div className="d-flex flex-row justify-content-between m-2" style={{ marginBottom: 0 }}>
                                                                        <div className="mr-1">

                                                                        </div>

                                                                        {/* {props.isMyLearning != false && */}
                                                                        <div className="assign-status">
                                                                            {/* <span className="fsx-10px p-2" style={{ backgroundColor: 'white', color: 'black', border: 'none', fontSize: '20' }}>{dataItem.LearningFlag || dataItem.Status}</span> */}
                                                                            <span className="fsx-10px p-2" style={{ backgroundColor: 'white', color: 'black', border: 'none', fontSize: '20' }}>
                                                                                <i style={{ marginRight: '3px', verticalAlign: 'middle' }}></i>
                                                                                Thư mục
                                                                            </span>
                                                                        </div>
                                                                        {/* } */}
                                                                    </div>
                                                                </div>
                                                            </>)

                                                        }
                                                        else {
                                                            console.log('dataItem', dataItem)
                                                            return (<CourseItemV2 isMyLearning={false} onClickTitle={(data) => onClickTitleIner(data)} key={index} dataItem={dataItem} />)
                                                        }

                                                    })
                                                    : 
                                                    ""
                                                }
                                                <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                                                    {
                                                        <>
                                                            <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                                                            <LearningDetailContainer isMyLearning={false} idCourse={courseId} isCatalogue={true} />
                                                        </>
                                                    }
                                                </Sidebar>
                                            </div>
                                        </LoadingPanel>
                                        <div>
                                            {CourseItems1 == '' ? <div className='no-more-responsive'><span className='mt-4'>Không có mục nào để hiển thị.</span></div> : ''}
                                            {
                                                visibleMore &&
                                                <div className="d-flex justify-content-end" style={{ right: '20px', left: '20px' }}>
                                                    <Button className='btn-showmore' label="Xem nhiều hơn" loading={loadingLoadmore} onClick={onShowMore} style={{ backgroundColor: 'white', color: '#1aa1dc', borderColor: 'white' }} />
                                                </div>
                                            }
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
            </div>
        </>
    )
}

CoursesLocation.propTypes = {
    onChange: PropTypes.func
};
CoursesLocation.defaultProps = {
    onChange: () => { }
}
CoursesLocation.propTypes = {
    onClickTitle: PropTypes.func
};
CoursesLocation.defaultProps = {
    onClickTitle: () => { }
}
CoursesLocation.propTypes = {
    tabIndex: PropTypes.number,
    idCourse: PropTypes.number,
    nameCourseType: PropTypes.string,
};
export default CoursesLocation;
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './style/MultiSelect.scss';
import './style/catalogue.scss';
import CoursesLocationItem from './CoursesLocationItem';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SliderSlick as Slider } from "components/ReactSlickSlider/SliderSlick";
import { Card } from "primereact/card";
import { Button } from 'primereact/button';
import { LoadingPanel } from '../../../components/loader-ui/LoadingPanel';
import { CourseItemV2 } from '../my-learning/CourseItemV2';
const CoursesLocationNew = (props) => {
    const { handleItemClick, onClickTitleIner, showAll, dataCourse, dataCourseNotitle, title, coursesID } = props;
    const [loading, setLoading] = useState(false);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [countCurrent, setCountCurrent] = useState(dataCourseNotitle.length / 5);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slider00 = useRef();
    const LoaderCard = ({ title }) => {
        return (<Card style={{ boxShadow: 'none' }} className='' title={title}><ProgressSpinner className='w-100' style={{ width: '50px', height: '50px' }} strokeWidth="2" fill="var(--surface-ground)" animationDuration=".5s" /> </Card>)
    }
    let settingsCourse = {
        slideIndex: 0,
        dots: true,
        arrows: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
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
    // next trang từ đây
    useEffect(() => {
        if (slider00.current) {
            setIsLastSlide(currentSlide == Math.ceil(countCurrent) - 1 ? true : false);
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
    const lstItem = (item) => {
        return (
            item.map((it, idx) => {
                if (it.Type == 'D') {
                    let url = "";

                    if (it?.URL_IMG == "" || it?.URL_IMG == null) {
                        if (it?.IS_FLDR == 0) {
                            url = window.location.origin + '/images/Bgr-folder-2.jpg'
                        }
                        else {
                            url = window.location.origin + '/images/Brg-folder-1.jpg'
                        }
                    }
                    else {
                        url = it?.URL_IMG.replace(/ImageWidth=125&ImageHeight=120/g, 'ImageWidth=375');;
                    }
                    return (<>
                        <div className="course-item d-flex flex-column justify-content-between ml-2 mr-2 mb-2 course-small-device">
                            <div className="bg-course d-flex justify-content-center">
                                <Image
                                    src={url}
                                ></Image>
                            </div>

                            <div className="d-flex flex-row justify-content-between flex-grow-1 ml-2 mr-2 pt-2">
                                <span onClick={() => showAll(it.CoursesLocationId, it.CoursesLocationTitle, true)} className="title-text fw-bold cursor-pointer" title={it?.CoursesLocationTitle} data-pr-tooltip="A Disabled Button" data-pr-position="top" dangerouslySetInnerHTML={{ __html: it?.CoursesLocationTitle }}>
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
                    return (<CourseItemV2 isMyLearning={false} onClickTitle={(data) => onClickTitleIner(data)} key={idx} dataItem={it} />)
                }
            })
        )
    }
    return (
        <>
            {
                dataCourse.map((item, index) => {
                    return (
                        item.ListCourses.length > 0 ?
                            <CoursesLocationItem
                                dataItem={item}
                                handleItemClick={(id, title) => handleItemClick(id, title)}
                                showAll={(id, title) => showAll(id, title, false, item.CoursesDescription)}
                                onClickTitleIner={(data) => onClickTitleIner(data)}
                                loading={loading}
                            ></CoursesLocationItem>
                            : ""
                    )
                })
            }
            <div id="overlay" onClick={() => {
                document.getElementById("overlay").style.display = "none";
                document.getElementById("left-learning-id").style.display = "none";
            }}></div>

        </>
    )
}

CoursesLocationNew.propTypes = {
    onChange: PropTypes.func
};
CoursesLocationNew.defaultProps = {
    onChange: () => { }
}
CoursesLocationNew.propTypes = {
    onClickTitle: PropTypes.func
};
CoursesLocationNew.defaultProps = {
    onClickTitle: () => { }
}
CoursesLocationNew.propTypes = {
    tabIndex: PropTypes.number,
    idCourse: PropTypes.number,
    nameCourseType: PropTypes.string,
};
export default CoursesLocationNew;
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { LoadingPanel } from '../../../components/loader-ui/LoadingPanel';
import { CourseItemV2 } from 'layouts/learner/my-learning/CourseItemV2';
import 'layouts/learner/components/style/MultiSelect.scss';
import 'layouts/learner/components/style/catalogue.scss';
import { SliderSlick as Slider } from "components/ReactSlickSlider/SliderSlick";
import { FrameworkConfigService } from "services/FrameworkConfigService";
const CoursesFWItem = (props) => {
    const { handleItemClick, onClickTitleIner, iDNL, valueFilter, iDGD } = props;
     const [loading, setLoading] = useState(false);
    const [dataCourse, setDataCourse] = useState([]);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [countCurrent, setCountCurrent] = useState(props.dataItem.length / 5);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [filterBy1, setFilterBy1] = useState({
        GiaiDoanID: iDNL,
        CourseStatus: valueFilter
    });

    useEffect(() => {
        let _filter = { ...filterBy1 }
        _filter = { ...filterBy1, PageNumber: 1 };
        loadApi(_filter);

    }, [props.dataItem, iDGD, valueFilter])

    const slider00 = useRef();
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
            // setIsLastSlide(currentSlide === 2 || currentSlide === 6 ? true : false);
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

    const loadApi = async (body) => {
         setLoading(true);
        var _filter = {
            ...body,
            NangLucID: iDNL,
            CourseStatus: valueFilter,
            GiaiDoanID: iDGD
        }

        let result = await FrameworkConfigService.getbyidnl(_filter);
        console.log('result.data', result.data)
        setDataCourse(result.data);
        setLoading(false);
    }

    const lstItem = (item) => {
        return (
            item.map((it, idx) => {
                return (<CourseItemV2 isMyLearning={false} onClickTitle={(data) => onClickTitleIner(data)} key={idx} dataItem={it} />)
            })
        )
    }
    return (
        <>
            <div className='d-flex justify-content-end mr-5 mb-2'>
                <Button disabled={dataCourse.length < 5 ? true : currentSlide == 0} onClick={() => handlePrevSlide()} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                <Button disabled={dataCourse.length <= 5 ? true : isLastSlide} onClick={() => handleNextSlide()} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
            </div >
            <div className='d-flex flex-row justify-content-between' style={{ marginLeft: "10px" }}>
                <div className="w-100 card-courseitems">
                    <LoadingPanel loading={loading}>
                        <Slider ref={slider00} {...settingsCourse} >
                            {lstItem(dataCourse)}
                        </Slider>
                    </LoadingPanel>
                </div>
            </div>
        </>
    )
}

CoursesFWItem.propTypes = {
    onChange: PropTypes.func
};
CoursesFWItem.defaultProps = {
    onChange: () => { }
}
CoursesFWItem.propTypes = {
    onClickTitle: PropTypes.func
};
CoursesFWItem.defaultProps = {
    onClickTitle: () => { }
}
CoursesFWItem.propTypes = {
    tabIndex: PropTypes.number,
    idCourse: PropTypes.number,
    nameCourseType: PropTypes.string,
};
export default CoursesFWItem;
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { skillPathService } from "services/skillPathService";
import { profileSkillService } from "services/profileSkillService";
import { ProgressCircle } from "components/progress-circle/ProgressCircle";
import { createRef, useRef } from "react";
import { Button } from "primereact/button";
import './skillpath.scss';
import { JobRole } from "./JobRole";
import { SliderSlick as Slider } from "components/ReactSlickSlider/SliderSlick";
import { Sidebar } from 'primereact/sidebar';
import LearningDetailContainer from "layouts/learner/components/LearningDetailContainer";
import { OverlayPanel } from "primereact/overlaypanel";
import { Rating } from "primereact/rating";
import { MdChecklist } from "react-icons/md";
import { profileInfoService } from "services/profileInfoService";
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { CourseItemV2 } from "layouts/learner/my-learning/CourseItemV2";
import { useListState } from 'shared/hooks/useListState';

const LoTrinhKyNang = () => {
    const [parentJob, setParentJob] = useState([]);
    const [skillJob, setSkillJob] = useState([]);

    const [jobRole, setJobRole] = useState("");
    const [loading, setLoading] = useState(false);

    const loadInfo = async () => {
        let result = await profileInfoService.getuserdetails();
        setJobRole(result.data.JobRole);
    }

    useEffect(() => {
        loadInfo();
    }, []);

    const loadParentJob = async () => {
        let result = await skillPathService.getskilljobroles();
        setParentJob(result.data.ParentJobRoleItems);
    }

    const loadSkillJob = async () => {
        let result = await skillPathService.getskilljobroles();
        setSkillJob(result.data.SkillJobRoleItems);
    }

    const slider00 = useRef();

    let settings = {
        slideIndex: 0,
        dots: true,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    let settingsCourse = {
        slideIndex: 0,
        dots: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: false,
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
            case '0': slider00.current.slickNext();
                break;
            default:
        }
    }

    function onSlickPrev(slidId) {
        switch (slidId) {
            case '0': slider00.current.slickPrev();
                break;
            default:
        }
    }

    const [parentClicked, setParentClicked] = useState(false);
    const [skillClicked, setSkillClicked] = useState(false);

    const loadparent = async (value) => {
        body.JobRoleId = value;
        let result = await profileSkillService.getskills(body);
        setTable(result.data.SkillItems);
        setParentClicked(true);
        setSkillClicked(false);
    }

    const loadskill = async (value) => {
        body.JobRoleId = value;
        let result = await profileSkillService.getskills(body);
        setTable(result.data.SkillItems);
        setParentClicked(false);
        setSkillClicked(true);
    }

    function renderParentJob() {
        return (
            parentJob.map((data, index) => {
                return (
                    <div key={index} className="mb-2">
                        <JobRole
                            role="parent"
                            onClick={() => loadparent(data.JobRoleId)}
                            name={data.JobRoleName}
                            skill={data.TotalSkills}
                            level={data.TotalLevels}
                            clicked={parentClicked}
                        />
                    </div>
                )
            })
        )
    }

    function renderSkillJob() {
        return (
            skillJob.map((data, index) => {
                return (
                    <div key={index} >
                        {
                            jobRole == data.JobRoleName ?
                                <div>
                                    <JobRole
                                        role="skill"
                                        onClick={() => loadskill(data.JobRoleId)}
                                        name={data.JobRoleName}
                                        current="Hiện tại"
                                        skill={data.TotalSkills}
                                        level={data.TotalLevels}
                                        clicked={skillClicked}
                                    />
                                </div>
                                :
                                <JobRole
                                    role="skill"
                                    onClick={() => loadskill(data.JobRoleId)}
                                    name={data.JobRoleName}
                                    skill={data.TotalSkills}
                                    level={data.TotalLevels}
                                    clicked={skillClicked}
                                />
                        }
                    </div>
                )
            })
        )
    }

    // Table

    const [table, setTable] = useState([]);
    const [openRow, setOpenRow] = useState();
    const [courses, setCourses] = useListState([]);

    const loadTable = async () => {
        setLoading(true);
        let result = await profileSkillService.getskills(body);
        setTable(result.data.SkillItems);
        setLoading(false);
    }

    const bodyTest = {
        'SkillId': 51,
        'SkillRequiredLevelId': 2,
        'PageNumber': 1,
        'PageSize': 10,
        'TotalRecords': 10,
    }

    const open = async (dataItem, index) => {
        setOpenRow(index);
        bodyTest.SkillId = dataItem.SkillId;
        bodyTest.SkillRequiredLevelId = dataItem.SkillRequiredLevelId;
        let result = await skillPathService.getskillssuggestedcourses(bodyTest);
        handlers.setState(result.data.SkillSuggestedCourseItems);
    }

    const body = {
        'JobRoleId': 0,
        'PageNumber': 1,
        'PageSize': 10
    }

    const loopchartacquired = dataItem => {
        let content = [];
        for (let i = 0; i < dataItem.Level.AcquiredLevels; i++) {
            content.push(
                <div className="progress" style={{ marginRight: '5px', width: '18%' }} >
                    <div className="progress-bar" style={{ backgroundColor: '#29b6cd', width: '100%' }} />
                </div>
            );
        }
        return content;
    };

    const loopchartrequired = dataItem => {
        let content = [];
        for (let i = 0; i < (dataItem.Level.RequiredLevels - dataItem.Level.AcquiredLevels); i++) {
            content.push(
                <div className="progress" style={{ marginRight: '5px', width: '18%' }} >
                    <div className="progress-bar" style={{ backgroundColor: '#a085bd', width: '100%' }} />
                </div>
            );
        }
        return content;
    };

    const loopchartleft = dataItem => {
        let content = [];
        if (dataItem.Level.RequiredLevels >= dataItem.Level.AcquiredLevels) {
            for (let i = 0; i < (dataItem.Level.TotalLevels - dataItem.Level.RequiredLevels); i++) {
                content.push(
                    <div className="progress" style={{ marginRight: '5px', width: '18%' }} >
                        <div className="progress-bar" style={{ backgroundColor: 'grey', width: '100%' }} />
                    </div>
                );
            }
        } else {
            for (let i = 0; i < (dataItem.Level.TotalLevels - dataItem.Level.AcquiredLevels); i++) {
                content.push(
                    <div className="progress" style={{ marginRight: '5px', width: '18%' }} >
                        <div className="progress-bar" style={{ backgroundColor: 'grey', width: '100%' }} />
                    </div>
                );
            }
        }

        return content;
    };

    const loopcharticon = dataItem => {
        let content = [];
        for (let i = 0; i < dataItem.Level.RequiredLevels; i++) {
            content.push(
                <div className="progress" style={{ marginRight: '5px', width: '17.75%' }} >
                    <div className="progress-bar" style={{ backgroundColor: 'white', width: '100%' }} />
                </div>
            );
        }
        return content;
    };

    const [courseId, setCourseId] = useState(0);
    const [val, setVal] = useState(0);
    const [courseType, setCourseType] = useState("");
    const [visibleRight, setVisibleRight] = useState(false);

    const selfrate = async (data, value) => {
        data.Level.SelfRatedLevels = value;
        let result = await skillPathService.updateselfanalysisrating(data);
        setVal(result.data.Level.SelfRatedLevels);
    }

    const onClickTitleIner = async (data) => {
        console.log('data', data)
        if (data.LearningType === "T") {
            setCourseId(data.ILTID);
            setCourseType(data.LearningType);
        } else {
            setCourseId(data.CourseId);
            setCourseType(data.LearningType);
        }
        setVisibleRight(true);
    }

    function closeDetail() {
        setVisibleRight(false);
        loadTable();
    }

    const courselist = (dataItem, index) => {
        if (openRow == index) {
            return (
                <tr id={`collapseExample${openRow}`}>
                    {
                        courses.length == 0 ? 'Không có đề xuất.'
                            :
                            <>
                                <th colSpan={6}>
                                    <h6>Được đề xuất ({courses.length})</h6>
                                    <div className="container">
                                        <div className="row">
                                            <div className="mr-2" style={{ display: "flex" }} >
                                                {
                                                    courses.map((dataItem, index) => {
                                                        return (
                                                            <p key={index} className="card border mr-2">
                                                                <CourseItemV2 onClickTitle={(data) => onClickTitleIner(data)} key={index} dataItem={dataItem} />
                                                            </p>
                                                        )
                                                    }
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                                        {
                                            <>
                                                <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                                                <LearningDetailContainer idCourse={courseId} nameCourseType={courseType} />
                                            </>
                                        }
                                    </Sidebar>
                                </th>
                            </>
                    }
                </tr>
            )
        }
    }

    const op = useRef([]);

    function skilltable() {
        return (
            table.map((dataItem, index) => {
                op[index] = createRef();
                return (
                    <>
                        <tr
                            key={index}
                            data-toggle="collapse"
                            className="accordion-toggle"
                        >
                            <td>{dataItem.SkillName}</td>
                            <td>{dataItem.SkillCategoryName}</td>
                            <td>
                                <span>
                                    <div className="d-flex justify-content-between">
                                        <div className=''>
                                            0
                                        </div>
                                        <div className=''>
                                            {dataItem.Level.TotalLevels}
                                        </div>
                                    </div>
                                    <span className='d-flex flex-row'>
                                        {loopchartacquired(dataItem)}
                                        {loopchartrequired(dataItem)}
                                        {loopchartleft(dataItem)}
                                    </span>
                                    <span className='d-flex flex-row'>
                                        {loopcharticon(dataItem)}
                                        <i className='fas fa-caret-up' style={{ color: '#a085bd' }}></i>
                                    </span>
                                </span>
                            </td>
                            <td>
                                <div>
                                    <button className="btn btn-light" style={{ border: '1px solid black' }}
                                        onClick={
                                            (e) => op[index].current.toggle(e)
                                        }
                                    >
                                        <MdChecklist />
                                    </button>
                                    <OverlayPanel ref={op[index]} showCloseIcon>
                                        <div className="overlayPanel" style={{ display: 'block', width: (dataItem.Level.TotalLevels == 3) ? '250px' : '390px' }}>
                                            <div className="overlayPanelTop">
                                                MỨC ĐÁNH GIÁ
                                            </div>
                                            <div className="overlayPanelBottom">
                                                <div className='row'>
                                                    Bắt buộc
                                                </div>
                                                <div className='row'>
                                                    <Rating
                                                        value={dataItem.Level.RequiredLevels}
                                                        stars={dataItem.Level.TotalLevels}
                                                        cancel={false}
                                                        style={{ fontSize: '0.9rem' }}
                                                        onIcon={<img src={'/images/requiredlevel.png'} />}
                                                        offIcon={<img src={'/images/emptylevel.png'} />}
                                                    />
                                                </div>
                                                <div className='row'>
                                                    Hiện hành
                                                </div>
                                                <div className='row'>
                                                    <Rating
                                                        value={dataItem.Level.AcquiredLevels}
                                                        stars={dataItem.Level.TotalLevels}
                                                        cancel={false}
                                                        style={{ fontSize: '0.9rem' }}
                                                        onIcon={<img src={'/images/acquiredlevel.png'} />}
                                                        offIcon={<img src={'/images/emptylevel.png'} />}
                                                    />
                                                </div>
                                                <div className='row'>
                                                    Tự đánh giá
                                                </div>
                                                <div className='row'>
                                                    <Rating
                                                        onChange={
                                                            (e) => {
                                                                selfrate(dataItem, e.value)
                                                                console.log('val', val)
                                                                console.log('selfrate', dataItem.Level.SelfRatedLevels)
                                                                console.log('total', dataItem.Level.TotalLevels)
                                                            }}
                                                        value={dataItem.Level.SelfRatedLevels}
                                                        stars={dataItem.Level.TotalLevels}
                                                        cancel={false}
                                                        style={{ fontSize: '0.9rem' }}
                                                        onIcon={<img src={'/images/selfratedlevel.png'} />}
                                                        offIcon={<img src={'/images/emptylevel.png'} />}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </OverlayPanel>
                                </div>
                            </td>
                            <td>
                                {
                                    dataItem.Level.RequiredLevels == 0 ?
                                        <ProgressCircle value={0} />
                                        :
                                        <ProgressCircle value={Math.round((Math.abs(dataItem.Level.RequiredLevels - dataItem.Level.AcquiredLevels)) * 100 / dataItem.Level.RequiredLevels)} />
                                }
                            </td>
                            <td>
                                <Button onClick={() => open(dataItem, index)}>Xem bài học</Button>
                            </td>
                        </tr>
                        {courselist(dataItem, index)}
                    </>
                );
            })
        )
    }

    useEffect(() => {
        loadParentJob();
        loadSkillJob();
        loadTable();
    }, [])

    return (
        <>
            {
                parentJob.length == 0 && skillJob == 0 ?
                    <Card className="mb-8">
                        <div className="row">
                            <div className="col-3 text-center">
                                <label className="p-card-title text-center">Không có dữ liệu.</label>
                            </div>
                        </div>
                    </Card>
                    :
                    <Card className="mb-8">
                        <div className="row">
                            <div className="col-3 text-center">
                                <label className="p-card-title text-center">VAI TRÒ CÔNG VIỆC</label>
                                <Slider ref={slider00} {...settings} style={{ display: 'flex' }}>
                                    {renderParentJob()}
                                </Slider>
                                <Slider ref={slider00} {...settingsCourse} style={{ display: 'flex' }}>
                                    {renderSkillJob()}
                                </Slider>
                                <div className='d-flex justify-content-between'>
                                    <Button onClick={() => onSlickPrev('0')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-left" className="p-button-rounded p-button-secondary p-button-text" />
                                    <Button onClick={() => onSlickNext('0')} style={{ height: '20px', width: '20px' }} icon="pi pi-arrow-right" className="ml-3 p-button-rounded p-button-secondary p-button-text" />
                                </div>
                            </div>
                            <div className="col-9">
                                <label className="p-card-title">LỘ TRÌNH KỸ NĂNG - KẾT QUẢ CỦA TÔI</label>
                                <LoadingPanel loading={loading} >
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"> Tên kỹ năng </th>
                                                <th scope="col"> Hạng mục kỹ năng </th>
                                                <th scope="col"> Các cấp độ: 🟣 Bắt buộc 🔵 Hiện tại </th>
                                                <th scope="col"></th>
                                                <th scope="col"> Khoảng cách (%) </th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {skilltable()}
                                        </tbody>
                                    </table>
                                </LoadingPanel>
                            </div>
                        </div>
                    </Card>
            }
        </>
    )
}
export default LoTrinhKyNang;
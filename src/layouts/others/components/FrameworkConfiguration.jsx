import { useEffect, useState, useRef } from "react";
import { Card } from "primereact/card";
import { FrameworkConfigService } from "services/FrameworkConfigService";
import './FrameworkConfiguration.scss';
import { ProgressCircleFW } from "components/progress-circle/ProgressCircleFW";
import CoursesFWItem from "./CoursesFWItem";
import LearningDetailContainer from "layouts/learner/components/LearningDetailContainer";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
const FrameworkConfiguration = (props) => {

    const [loading, setLoading] = useState(false);
    const [dataFW, setDataFW] = useState([]);
    const [visibleRight, setVisibleRight] = useState(false);
    const [courseId, setCourseId] = useState(0);
    const [isShow, setIsShow] = useState(0);
    const [textShowGD, SetTextShowGD] = useState("");
    const [textShowNL, SetTextShowNL] = useState("");
    const [textFilter, SetTextFilter] = useState("");
    const [valueFilter, SetValueFilter] = useState("");
    const [iDNL, SetIDNL] = useState(0);
    const [iDGD, SetIDGD] = useState(0);

    const [filterBy, setFilterBy] = useState({
        GiaiDoanID: 0,
        CourseStatus: ''
    });
    useEffect(() => {
        let _filter = { ...filterBy }
        _filter = { ...filterBy, PageNumber: 1 };
        loadApi(_filter);
    }, [])

    const loadApi = async (body) => {
        setLoading(true);
        let result = await FrameworkConfigService.getall(body);
        setDataFW(result.data)
        setLoading(false);
    }

    const onClickTitleIner = (data) => {
        // props.onClickTitle(data);
        setCourseId(data.CoursesID);
        setVisibleRight(true);
    }

    function closeDetail() {
        setVisibleRight(false);
        let _filter = { ...filterBy }
        _filter = { ...filterBy, PageNumber: 1 };
        loadApi(_filter);
    }

    const ShowGD = (index) => {
        if (textShowGD != "showGD" + index) {
            SetTextShowGD("showGD" + index)
        }
        else {
            SetTextShowGD("");
            setFilterBy({ ...filterBy, CourseStatus: "" });
            SetTextFilter("");
        }
    }

    const ShowNL = (index, idnl, idgd) => {
        SetIDNL(idnl);
        SetIDGD(idgd);
        if (textShowNL != "showNL" + index) {
            SetTextShowNL("showNL" + index)
        }
        else {
            SetTextShowNL("");
            SetValueFilter("");
            SetTextFilter("");
        }
    }

    const onFilter = (value, id) => {
        SetIDNL(id);
        SetValueFilter(value);
        let val = value + id;
        if (textFilter != val) {
            SetTextFilter(val);

            // switch (value) {
            //     case 'O':
            //         setFilterBy({ ...filterBy, CourseStatus: value })
            //         break;
            //     case 'S':
            //         setFilterBy({ ...filterBy, CourseStatus: value })
            //         break;
            //     case 'C':
            //         setFilterBy({ ...filterBy, CourseStatus: value })
            //         break;
            //     case 'Q':
            //         setFilterBy({ ...filterBy, CourseStatus: value })
            //         break;
            // }
        }
        else {
            SetTextFilter("");
            SetValueFilter("");
            setFilterBy({ ...filterBy, CourseStatus: "" })
        }

    }

    return (
        <>
            <div className="row my-learning-container">
                <div className="right-learning col-12 scroll-wrapper right-learning-reposive" style={{ backgroundColor: 'white', width: '110%' }}>
                    <div className="tab-content w-100" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                            <Card id='yourCardId' style={{ minHeight: '80vh' }}>
                                <div >
                                    <div className='d-flex justify-content-between' style={{ marginBottom: "10px" }}>
                                        <div className='d-flex'>
                                            <div style={{ position: 'relative' }}>
                                                <b className='font-size-tieude' style={{ color: 'black', textTransform: 'uppercase' }}>
                                                    Khung năng lực bắt buộc
                                                </b>
                                                <span style={{ width: "50px" }} className='bottom-title-learning learning-public'></span>
                                            </div>

                                        </div>
                                    </div>
                                    {dataFW?.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                {item.lst_nl.length > 0 &&
                                                    <div className='d-flex flex-row justify-content-between headerfix' style={{ marginTop: '20px' }}>
                                                        <span onClick={() => ShowGD(index)} className='d-flex flex-grow-1 align-self-center' style={{ fontSize: 16, cursor: 'pointer' }}>{item.ten_giai_doan}</span>
                                                        <ProgressCircleFW value={Math.round(item.so_khoa_hocHT * 100 / item.so_khoa_hoc)} />
                                                    </div>
                                                }
                                                {textShowGD == "showGD" + index &&
                                                    <div style={{}}>
                                                        {item.lst_nl.map((it, idx) => {
                                                            return (
                                                                it.is_group == false && it.lst_khoa_hoc.length > 0 &&
                                                                <div className="view1" >
                                                                    <div className="view2">
                                                                        <div onClick={() => ShowNL(idx, it.id_nl, item.giai_doan_id)} className="nl" key={idx}>
                                                                            {it.ten_nl}
                                                                            <span style={{ marginLeft: '20px', color: '#4caf50' }}>({Math.round((it.so_khoa_hoc_HT / it.so_khoa_hoc) * 100)}%)</span>
                                                                        </div>
                                                                        <div className="d-flex flex-row">
                                                                            <div className="progress-bar-main mb-2" >
                                                                                <div className="progress-bar-inn" style={{ width: (it.so_khoa_hoc_HT / it.so_khoa_hoc) * 100 + '%' }} />
                                                                            </div>
                                                                        </div>

                                                                        <div className="d-flex flex-row justify-content-between mb-3" style={{ width: '50%' }}>
                                                                            <div className="filter" onClick={() => onFilter('O', it.id_nl)}>
                                                                                {/* <i class="fa-solid fa-life-ring "></i> */}
                                                                                <i style={{ color: textFilter == 'O' + it.id_nl ? 'blue' : 'black' }} className="fa-solid fa-ban"></i>
                                                                                <span style={{ color: textFilter == 'O' + it.id_nl ? 'blue' : 'black' }} className="ml-2">
                                                                                    <span style={{ fontWeight: it.so_khoa_hoc_CBD > 0 ? "700" : "400" }}>{it.so_khoa_hoc_CBD} </span>
                                                                                    Chưa bắt đầu</span>
                                                                            </div>
                                                                            <div className="filter" onClick={() => onFilter('S', it.id_nl)}>
                                                                                <i style={{ color: textFilter == 'S' + it.id_nl ? 'blue' : 'black' }} className="fa-regular fa-circle-right"></i>
                                                                                <span style={{ color: textFilter == 'S' + it.id_nl ? 'blue' : 'black' }} className="ml-2">
                                                                                    <span style={{ fontWeight: it.so_khoa_hoc_DR > 0 ? "700" : "400" }}>{it.so_khoa_hoc_DR} </span>
                                                                                     Đang diễn ra</span>
                                                                            </div>
                                                                            <div className="filter" onClick={() => onFilter('C', it.id_nl)}>
                                                                                <i style={{ color: textFilter == 'C' + it.id_nl ? 'blue' : 'black' }} className="fa-regular fa-circle-check"></i>
                                                                                <span style={{ color: textFilter == 'C' + it.id_nl ? 'blue' : 'black' }} className="ml-2">
                                                                                <span style={{ fontWeight: it.so_khoa_hoc_HT > 0 ? "700" : "400" }}>{it.so_khoa_hoc_HT} </span>
                                                                                     Đã hoàn thành</span>
                                                                            </div>
                                                                            <div className="filter" onClick={() => onFilter('Q', it.id_nl)}>
                                                                                <i style={{ color: textFilter == 'Q' + it.id_nl ? 'blue' : 'black' }} className="fa-regular fa-clock"></i>
                                                                                <span style={{ color: textFilter == 'Q' + it.id_nl ? 'blue' : 'black' }} className="ml-2">
                                                                                <span style={{ fontWeight: it.so_khoa_hoc_QH > 0 ? "700" : "400" }}>{it.so_khoa_hoc_QH} </span>
                                                                                    Quá hạn</span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    {textShowNL == "showNL" + idx &&
                                                                        <div className="view3">
                                                                            <CoursesFWItem
                                                                                iDNL={iDNL}
                                                                                iDGD={iDGD}
                                                                                valueFilter={valueFilter}
                                                                                dataItem={it.lst_khoa_hoc}
                                                                                handleItemClick={(id, title) => handleItemClick(id, title)}
                                                                                showAll={(id, title) => showAll(id, title, false, item.CoursesDescription)}
                                                                                onClickTitleIner={(data) => onClickTitleIner(data)}
                                                                                loading={loading}
                                                                            />
                                                                        </div>
                                                                    }



                                                                </div>

                                                            )
                                                        })}
                                                    </div>
                                                }


                                            </div>

                                        )
                                    })}

                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                {
                    <>
                        <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                        <LearningDetailContainer isMyLearning={false} idCourse={courseId} isCatalogue={true} />
                    </>
                }
            </Sidebar>
        </>
    )
}

export default FrameworkConfiguration;
import { Card } from "primereact/card";
import DemoFunctionalTranslation from "./DemoFunctionalTranslation";
import { useTranslation } from 'react-i18next';
import { TabView, TabPanel } from 'primereact/tabview';
import { learnerService } from 'services/learnerService';
import React, { useEffect, useState, useRef } from 'react';
const MyLearnerContainer = () => {
    const [dataTitle, setdataTitle] = useState([]);
    const [filterBy1, setfilterBy1] = useState(0);
    useEffect(() => {
        // call api here
        loadApi();

    }, []);
    const loadApi = async () => {
        //
        let result = await learnerService.getmylearningsummary();
        setdataTitle(result.data.learningSummaryItem)
    }
    const onClickFrom = (e) => {

        setfilterBy1(e);
    }
    const progressView = () => {
        return (
            dataTitle.map((dataItem, index) => {
                return (
                    <>
                        <div style={{ padding: '1rem' }} onClick={() => onClickFrom(dataItem?.LearningTypeID)} key={index} classname="p-2"><h5 style={{ cursor: 'pointer' }}>{dataItem?.LearningType}</h5></div>
                    </>
                )

            })
        )
    }
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <div className="card-header">
                            <div className="d-flex flex-row">
                                {progressView()}
                            </div>
                        </div>
                        <div className="card-body">
                            <DemoFunctionalTranslation filterBy1={filterBy1} />
                        </div>
                    </Card>
                </div>
                {/* <div className="col-3">
                    <Card>
                        <div className="course-summary" style={{ boxShadow: '0px 2px 2px 1px rgb(52 51 51 / 40%)' }}>
                            <h5 className="title-summary">KHÓA HỌC</h5>
                            <p className="assigned"><span>Được giao</span><span className="total">26</span></p>
                            <p className="assigned"><span>Đăng ký</span><span className="total">3</span></p>
                            <p className="assigned"><span>Hoàn thành</span><span className="total">16</span></p>
                        </div>
                        <div className="course-summary" style={{ boxShadow: '0px 2px 2px 1px rgb(52 51 51 / 40%)' }}>
                            <h5 className="title-summary">KỲ THI</h5>
                            <p className="assigned"><span>Được giao</span><span className="total">26</span></p>
                            <p className="assigned"><span>Đăng ký</span><span className="total">3</span></p>
                            <p className="assigned"><span>Hoàn thành</span><span className="total">16</span></p>
                        </div>
                        <div className="course-summary" style={{ boxShadow: '0px 2px 2px 1px rgb(52 51 51 / 40%)' }}>
                            <h5 className="title-summary">CHỨNG CHỈ</h5>
                            <h5 style={{ paddingLeft: '10rem', fontWeight: '700', paddingTop: '3rem' }}>0</h5>
                        </div>
                    </Card>
                </div> */}
            </div>
        </>
    )
}
export default MyLearnerContainer;
import { Card } from "primereact/card";
import DemoFunctionalTranslation from "./DemoFunctionalTranslation";
import { useTranslation } from 'react-i18next';
import { TabView, TabPanel } from 'primereact/tabview';
import { learnerService } from 'services/learnerService';
import React, { useEffect, useState, useRef } from 'react';
import { traininghistoryService } from "services/traininghistoryService";
import DemoTrainingHistory from "./DemoTrainingHistory";

const TrainingHistory = () => {
    const [dataTitle, setdataTitle] = useState([]);
    const [filterBy1, setfilterBy1] = useState(0);

    useEffect(() => {
        // call api here
        loadApi();
    }, []);

    const loadApi = async () => {
        let result = await traininghistoryService.gettraininghistorysummary();
        setdataTitle(result.data.learningSummaryItem);
    }

    const onClickFrom = (e) => {
        setfilterBy1(e);
        console.log(filterBy1)
    }

    const progressView = () => {
        return (
            dataTitle.map((dataItem, index) => {
                return (
                    <>
                        <div onClick={() => onClickFrom(dataItem?.LearningTypeID)} key={index} className="p-2 cursor-pointer"><h5>{dataItem?.LearningType}</h5></div>
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
                            <DemoTrainingHistory filterBy1={filterBy1} />
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}
export default TrainingHistory;
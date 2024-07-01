/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
//import imglearn from '../../../../public/images/learn.png'
//import imglearn from '../../../assets/learn.png'
import PropTypes from 'prop-types';
import { Card } from "primereact/card";
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { FaSearch, FaStar } from 'react-icons/fa';
import { Checkbox } from 'primereact/checkbox';
//import '../styles/dskhoahoc.scss';
import CardCollapseMb from 'components/CardCollapseMb';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import LienHe from './LienHe';
import FAQ from './FAQ';
import { catalogueService } from 'services/catalogueService';
import { useListState } from 'shared/hooks/useListState';
import { arrow, left } from '@popperjs/core';
import { learnerService } from 'services/learnerService';
import { Sidebar } from 'primereact/sidebar';
import { learningService } from 'services/learningService';
import { LoadingPanel } from '../../../components/loader-ui/LoadingPanel';
import { MdSkipNext } from 'react-icons/md';
import { MultiSelect } from 'primereact/multiselect';
import '../../learner/components/style/MultiSelect.scss'
import '../../learner/components/style/catalogue.scss'
// import CheckBoxCatalogue from './CheckBoxCatalogue';
// import CheckBoxTopicCatalogi from './CheckBoxTopicCatalogi';
// import './style/catalogue.scss';
import { StatisticCourseList } from 'layouts/learner/components/StatisticCourseList';
const imglearn = window.location.origin + '/images/learn.png';

const ChamSocKH = (props) => {
    const [selectedLearningItem, setSelectedLearningItem] = useState(0);
    const ListSelectionCourse = [
        {
            "LearningType": "Liên hệ",
            "LearningTypeID": 0,
        },
        {
            "LearningType": "Câu hỏi thường gặp",
            "LearningTypeID": 1,
        },
    ]
    const onSelectedLearningItem = (value) => {
        setSelectedLearningItem(value);
        //setAdvanceSearch({ ...advanceSearch, filterBy: value });
    }
    const progressView = () => {
        return (
            ListSelectionCourse.map((dataItem, index) => {
                return (
                    <StatisticCourseList
                        onClick={() => onSelectedLearningItem(dataItem?.LearningTypeID)}
                        key={index}
                        title={dataItem?.LearningType}
                        mod={index}
                        type={dataItem?.LearningTypeID}
                        active={selectedLearningItem === dataItem.LearningTypeID}
                    />
                )
            })
        )
    }
    return (
        <>
            <div className="row my-learning-container">
                <div className="left-learning col-3 scroll-wrapper" style={{ backgroundColor: '#E5E5E5' }}>

                    <ul className='progress-list-course pl-0'>
                        {progressView()}
                    </ul>

                </div>
                <div className="right-learning col-9 scroll-wrapper" style={{ backgroundColor: 'white',width:'110%' }}>
                    {selectedLearningItem == 0 &&  <LienHe></LienHe>}
                    {selectedLearningItem == 1 &&  <FAQ></FAQ>}
                </div>
            </div>
        </>
    )
}

ChamSocKH.propTypes = {
    onChange: PropTypes.func
};
ChamSocKH.defaultProps = {
    onChange: () => { }
}
ChamSocKH.propTypes = {
    onClickTitle: PropTypes.func
};
ChamSocKH.defaultProps = {
    onClickTitle: () => { }
}
ChamSocKH.propTypes = {
    tabIndex: PropTypes.number,
    idCourse: PropTypes.number,
    nameCourseType: PropTypes.string,
};
export default ChamSocKH;

import { Image } from 'components/Image';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import LearningDetailContainer from './LearningDetailContainer';
import React, { useEffect, useState, useRef } from 'react';
import { setDetaiLearn } from "store/detaillearning/detaillearningSlice";


const LearningDetailNotifition = (props) => {
    const dispatch = useDispatch();
    const lstValueStore = useSelector(state => state.detaillearning.dataDetail) || [];
    const onHiden = () => {
        // debugger
        let obj = {
            VisibleRight: false
        }
        dispatch(setDetaiLearn(obj))
        props.CloseLearningDetailNotifition();
    }
    return (
        <>
            <Sidebar className='sidebar-header-none' visible={lstValueStore.VisibleRight} onHide={() => onHiden()} position='right' style={{ width: '70%' }}>
                {
                    <>
                        <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => onHiden()} />
                        <LearningDetailContainer idCourse={lstValueStore.CourseId} nameCourseType={lstValueStore.CourseType} />
                    </>
                }
            </Sidebar>


        </>
    )
}
export default LearningDetailNotifition;
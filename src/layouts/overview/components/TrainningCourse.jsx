import { auto } from '@popperjs/core';
import React from 'react'
import './TrainningCourse.scss';

const TrainningCourse = (props) => {

    let { id, name, status, description, attendance, image, day, month, onclick } = props;

    return (
        <>
            <div className='card-bodycourse' style={{ minHeight: "130px" }}>
                <div className='card-top'  >
                    <div className='mb-3' style={{ color: "white" }} >
                        <div className="columLeft" style={{ display: "inline-block", float: "left", marginLeft: "12px" }} >
                            <span style={{ fontSize: 32, fontWeight: 'bold', marginLeft: "8px" }}>{day}</span><br />
                            <span style={{ fontSize: 12, fontWeight: 'bold' }}>{month}</span>
                        </div>
                        <div className="" style={{ display: "inline-block", marginLeft: "12px", marginTop: "4px" }} >
                            <span onClick={onclick} className='titleName' style={{ fontSize: 14, fontWeight: 'bold', }}>{name} </span> <br />
                            <span style={{ fontSize: 14 }}>{description}</span>
                        </div>
                    </div>
                </div>
                <div className='d-flex bd-highlight mb-3 mt-1' style={{ justifyContent: 'space-between' }} >
                    <span className='dp-1 bd-highlight' style={{
                        marginLeft: "10px", fontWeight: "700", textTransform: "uppercase", lineHeight: "30px", textAlign: "center",
                        width: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}> {status}  </span>
                    <span style={{ width: "100px" }} className='p-1 bd-highlight' >{attendance} có mặt</span>
                </div>
            </div>
            <br />


        </>
    );
}
export default TrainningCourse;

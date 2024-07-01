import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { openWindow } from "shared/utils";
import { appSetting } from "shared/app-settings";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Sidebar } from "primereact/sidebar";

import { filedetailsService } from "services/filedetailsService";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from 'react';

const DemoThucHienThi = () => {

    const [visibleFullScreenFB, setVisibleFullScreenFB] = useState(false);

    //function renderfilecontroldetails() {
    //return (
    //dataFileDetails()
    // )
    //}

    const footerContent = (
        <div>
            <Button label="Thoát" onClick={() => setVisibleFullScreenFB(false)} />
        </div>
    );


    const closeFullScreenFB = () => {
        setVisibleFullScreenFB(false)
    }
    const handleClickOpen = () => {
        setVisibleFullScreenFB(true);
    };

    return (
        <>

            <br />
            <Button label="Nộp bài" onClick={() => handleClickOpen()} />
            {/* <Sidebar visible={visibleFullScreenFB} fullScreen onHide={() => closeFullScreenFB()} style={{ minWidth: '90%' }}> */}
            <Dialog                  
                visible={visibleFullScreenFB} 
                style={{ width: '50vw' }} 
                // onHide={() => setvisible(false)} 
                onHide={() => {
                    const action = closeFullScreenFB(false)
                    dispatch(action);
                }} >
                <div className="card-header">
                    <div className="media-body text-center" style={{ marginTop: '10px' }}>
                        <h2>
                            THÔNG BÁO BÀI THI
                        </h2>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                            <div className="col-6">
                                <span style={{ fontSize: '20px', color: 'grey', marginLeft: '36rem' }}>Số câu đã trả lời</span>
                                <p style={{ fontSize: '19px', fontWeight: "bold", marginLeft: '39rem', marginTop:'1rem' }}>10</p>
                            </div>

                            <div className="col-6">
                                <span style={{ fontSize: '20px', color: 'grey', marginLeft: '5rem' }}>Số câu chưa trả lời</span>
                                <p style={{ fontSize: '19px', fontWeight: "bold", marginLeft: '9rem', marginTop:'1rem'  }}>2</p>
                            </div>
                        <div className="col-6" style={{ fontSize: '20px', marginTop: '10rem' }}>
                            <div className="row">
                                <div>
                                    <span style={{ marginLeft: '20rem' }}>
                                        Tự luận câu 10: 500 ký tự
                                    </span>

                                </div>
                                <br />
                                <br />
                                <div>
                                    <span style={{ marginLeft: '20rem' }}>
                                        Tự luận câu 12: 0 ký tự
                                    </span>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Button className="rounded-pill" label="Thoát" style={{ float: 'right', marginRight: '30px', marginTop: '13rem' }} onClick={() => setVisibleFullScreenFB(false)} />
            {/* </Sidebar> */}
            </Dialog>
        </>
    );
}


export default DemoThucHienThi;
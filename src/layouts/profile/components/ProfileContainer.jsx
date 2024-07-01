import { Outlet, Route, Routes, Link } from 'react-router-dom';
import { loadable } from 'shared/utils';
import { profileInfoService } from 'services/profileInfoService';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import './profile.scss';
import { NavLink } from 'react-router-dom';
import { dataEven } from 'layouts/demo/components/event-utils';
import axios from 'axios';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import { Image } from 'components/Image';

const ProfileContainer = () => {

    const profileRoutes = [
        {
            path: '/*',
            component: loadable(() => import('./InfoLayout'))
        },
        {
            path: '/changepassword',
            component: loadable(() => import('./ChangePasswordLayout'))
        },
        {
            path: '/certificate',
            component: loadable(() => import('./CertificateLayout'))
        },
        {
            path: '/performance',
            component: loadable(() => import('./PerformanceLayout'))
        },
        {
            path: '/skill',
            component: loadable(() => import('./SkillLayout'))
        },
    ]

    const userFirstName = useSelector(state => state.oauth.UserFirstName) || '';
    const userMiddleName = useSelector(state => state.oauth.UserMiddleName) || '';
    const userLastName = useSelector(state => state.oauth.UserLastName) || '';
    const [data, setData] = useState("");


    const updateAvate = async (db) => {
        debugger;
        await profileInfoService.updateprofileimage(db);
        loadApi();
    }

    const changeAvatar = async (e) => {
        const file = e.target.files[0];

        let formData = new FormData();
        formData.append("uploadFile", file);
        formData.append("CorporateID", '1');
        formData.append('Culture', 'vi-VN');
        formData.append('AllowFileType', 'HÌNH ẢNH HỒ SƠ CÁ NHÂN:jpeg, jpg, png, bmp');

        let result = await axios.post('/AppService/api/FileUpload/UploadProfileFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })

        let obj = {
            ImagePath: result.data.SaveFilePath
        }
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn muốn đặt ảnh này làm ảnh hồ sơ của mình không? ',
            accept: () => updateAvate(obj)
        });

    }
    const loadApi = async () => {
        let result = await profileInfoService.getuserdetails();
        setData(result.data);
        console.log("result", data);
    }

    useEffect(() => {
        loadApi();
    }, []);
    return (
        <>
            <main className="container-fluid " >
                <div className='d-flex flex-row justify-content-between'>
                    <div className='d-flex flex-column m-2 flex-2'>
                        <div className="p-card" style={{ height: '80vh', overflow: 'auto' }} >
                            <div className='align-items-center justify-content-center text-center' style={{ height: '150px', 'padding': '10px', backgroundColor: 'white', position: "relative" }}>
                                <label className="p-card-title text-center"></label>
                                <Image src={data.ImagePath || '/images/user-icon.png'} className="img-fluid img-thumbnail rounded-circle" style={{ 'height': '100px', 'width': '100px', 'padding': '10px' }} alt="Ảnh đại diện"></Image>
                                <div style={{ width: "25px", height: "25px", backgroundColor: "red", borderRadius: "50%", position: "absolute", left: "220px", top: "80px", cursor: "pointer" }} title="Chỉnh sửa ảnh hồ sơ">
                                    <input accept="image/*" style={{ position: "relative", opacity: 0, width: "30px", height: "30px", zIndex: "9", cursor: "pointer" }} type="file" onChange={changeAvatar}></input>
                                    <i style={{ position: "relative", zIndex: "1", top: "-27px", color: "white", cursor: "pointer" }} className="fa-solid fa-pencil"></i>
                                </div>
                                <span className="p-float-label text-center">
                                    <h6>{userFirstName + ' ' + userMiddleName + ' ' + userLastName}</h6>
                                </span>
                                <span className="p-float-label text-center">
                                    <h6>{data.JobRole}</h6>
                                </span>
                            </div>
                            <div className="p-card-body">
                                <div className='d-flex flex-row justify-content-between'>
                                    <div className='d-flex flex-column text-center'>
                                        <span>Kỹ năng</span>
                                        <div className="row">
                                            <span className="p-float-label text-center">
                                                <img src="/images/skills.png" className="img-fluid rounded-circle" style={{ 'height': '30px', 'width': '30px' }} alt="skills"></img>
                                                {data.TotalSkills}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column text-center'>
                                        <span>Điểm</span>
                                        <div className="row">
                                            <span className="p-float-label text-center">
                                                <img src="/images/sao3.png" className="img-fluid rounded-circle" style={{ 'height': '30px', 'width': '30px' }} alt="score"></img>
                                                {data.GamificationPoints}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column text-center'>
                                        <span>Danh hiệu</span>
                                        <div className="row">
                                            <span className="p-float-label text-center">
                                                <img src="/images/honor-item.png" className="img-fluid rounded-circle" style={{ 'height': '30px' }} alt="honor"></img>
                                                {data.GamificationBadge}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-card" style={{ height: "62.3%" }}>
                                {/* or 49.8vh */}
                                <div className="p-card-body">
                                    <nav className="nav nav-underline flex-column" aria-label="Secondary navigation">
                                        <div className="nav flex-column nav-pills nav-justified mb-3 p-3 mb-2 border border-5 shadow-sm" id="v-pills-tab" role="tablist" aria-orientation="vertical" >
                                            <NavLink to={'/profile/user'} style={({ isActive }) => isActive ? { color: '#fff', background: '#1AA1DC', } : { color: '#545e6f', background: '#f0f0f0' }}>
                                                HỒ SƠ
                                            </NavLink>
                                            <NavLink to='/profile/changepassword' style={({ isActive }) => isActive ? { color: '#fff', background: '#1AA1DC', } : { color: '#545e6f', background: '#f0f0f0' }}>
                                                ĐỔI MẬT KHẨU
                                            </NavLink>
                                            <NavLink to={'/profile/certificate'} style={({ isActive }) => isActive ? { color: '#fff', background: '#1AA1DC', } : { color: '#545e6f', background: '#f0f0f0' }}>
                                                CHỨNG CHỈ
                                            </NavLink>
                                            <NavLink to={'/profile/performance'} style={({ isActive }) => isActive ? { color: '#fff', background: '#1AA1DC', } : { color: '#545e6f', background: '#f0f0f0' }}>
                                                THÀNH TÍCH
                                            </NavLink>
                                            <NavLink to={'/profile/skill'} style={({ isActive }) => isActive ? { color: '#fff', background: '#1AA1DC', } : { color: '#545e6f', background: '#f0f0f0' }}>
                                                KỸ NĂNG
                                            </NavLink>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-column flex-4'>
                        <div className="col-12 d-flex flex-column">

                            <Routes>
                                {
                                    profileRoutes.map(({ path, component: Component }, index) =>
                                        <Route path={path} key={index} element={<Component />} />
                                    )}
                            </Routes>
                            <Outlet />

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default ProfileContainer;
import React, { useState, useEffect, useRef } from 'react';
import './SettingOverview.scss';
import { Sidebar } from 'primereact/sidebar';
import { overViewService } from 'services/overViewService';
import { useForm, Controller } from 'react-hook-form';
import { Card } from "primereact/card";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import BlockUser from './BlockUser';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';




const SettingOverview = (props) => {
    const [checkboxall, setcheckboxall] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showLstUser, setshowLstUser] = useState(false);
    const [shareTree, setshareTree] = useState([]);
    const [selectedKeys3, setSelectedKeys3] = useState(null);
    // const [lstUserBlock, setlstUserBlock] = useState(props.lstUserBlook);
    const [value4, setValue4] = useState('');
    const [checkUserBlock, setcheckUserBlock] = useState('');
    const [hiddenBlockUser, sethiddenBlockUser] = useState(false);
    const [keySearch, setkeySearch] = useState('');

    const [advanceSearch, setAdvanceSearch] = useState({
        DCorporateID: 1,
        SearchText: ""
    })


    const sendData = () => {
        props.repostCallBack();
    };


    const { register, control, formState: { errors }, handleSubmit, reset, setValue } = useForm({});

    const loadApi = async (val) => {
        // let result = await overViewService.blockeduserlist(val);
        // setlstUserBlock(result.data.lstUserDetails)
    }
    let arrU = "";
    const checkUnBlock = (item) => {
        if (arrU != "") {
            if (arrU.includes(item)) {
                if (arrU.includes((',') + item)) {
                    arrU = arrU.replace((',' + item), '')
                }
                else if (arrU.includes(item + (','))) {
                    arrU = arrU.replace((item + ','), '')
                }
                else {
                    arrU = arrU.replace(item, '');
                }
            }
            else {
                arrU = arrU + ',' + item;
            }
        }
        else {
            arrU = arrU + item;
        }
        setValue('SelectedUserIds', arrU)
    }
    const hiddenFormBlockUser = () => {
        onclickshow();
        sethiddenBlockUser(true)
    }
    const renderdata = () => {
        loadApi(advanceSearch);
    }
    const checkAll = () => {
        if (checkboxall == false) {
            let ele = document.getElementsByName('SelectedUserIds');
            for (let i = 0; i < ele.length; i++) {
                if (ele[i].type == 'checkbox')
                    ele[i].checked = true;
            }

            let arrUser = ""
            if (arrUser == "") {
                for (let i = 0; i < lstUserBlock.length; i++) {
                    if (arrUser == "") {
                        arrUser = arrUser + lstUserBlock[i].UserId;
                    } else {
                        arrUser = arrUser + ',' + lstUserBlock[i].UserId;
                    }
                }
            }
            setValue('SelectedUserIds', arrUser)
            setcheckboxall(true)
        }
        else {
            let ele = document.getElementsByName('SelectedUserIds');
            for (let i = 0; i < ele.length; i++) {
                if (ele[i].type == 'checkbox')
                    ele[i].checked = false;
            }
            setcheckboxall(false)
        }

    }
    const onKeySearchChange = (key) => {
        setkeySearch(key);
    }
    function keyDown(e) {
        if (e.key == 'Enter') {
            setAdvanceSearch({ SearchText: e.target.value });
        }
    }
    useEffect(() => {
        loadApi(advanceSearch);
    }, [advanceSearch]);

    useEffect(() => {
        loadApi(advanceSearch);

    }, []);

    const onUnBlock = () => {
        console.log(checkUserBlock)
    }
    const QuayLaiFormTruoc = () => {
        sendData()
    }

    const onSubmit = async (dataSub) => {
        if (dataSub.SelectedUserIds == undefined) {
            alert("Vui lòng chọn ít nhất một người dùng để hiện")
        } else {
            await overViewService.unblockedselecteduser(dataSub);
            onclickshow();
            reset();
            loadApi(advanceSearch);
        }
    };



    let { onclickshow, visiblefull, lstUserBlock } = props;
    return (
        <>
            <div >
                <LoadingPanel loading={loading}>
                    <div className="card" >
                        <Sidebar visible={visiblefull} fullScreen onHide={onclickshow} >

                            <div className='row' style={{ backgroundColor: "#3d4758" }}>
                                <div className='col-12 col-lg-12' >
                                    <Card>
                                        <div className="card">
                                            <div className="input-group">
                                                {/* <input type="text" className="form-control mb-4" placeholder="Nhập tên người dùng" onChange={(e) => searchUser(e)} /> */}
                                                <div className="p-inputgroup mb-4" style={{ width: '100%' }}>
                                                    <InputText onKeyDown={(e) => keyDown(e)} onChange={(e) => onKeySearchChange(e.target.value)} placeholder="Nhập từ khoá tìm kiếm" />
                                                    <Button onClick={() => {
                                                        setAdvanceSearch({ ...advanceSearch, searchText: keySearch });
                                                    }} icon="pi pi-search" />

                                                </div>
                                            </div>
                                            <div >
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className='content_raw' style={{ height: '65vh', overflow: 'auto' }}>
                                                        <div className='header_raw'>
                                                            <h6 style={{ marginLeft: "12px" }}>Danh sách người dùng bị chặn</h6>
                                                            <div className='icon_right'>
                                                                <label className='lable_iconleft' htmlFor="selectAll" style={{ fontWeight: "700" }}>Chọn tất cả</label>
                                                                <input id='selectAll' type="checkbox" onChange={() => checkAll()}></input>
                                                            </div>

                                                        </div>
                                                        <div>
                                                            <table className="table table-striped">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col"> ID Đăng nhập</th>
                                                                        <th scope="col"> Tên </th>
                                                                        <th scope="col"> Địa chỉ email </th>
                                                                        <th scope="col"> Vai trò công việc </th>
                                                                        <th scope="col"> Chọn để hiện </th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                    {lstUserBlock && lstUserBlock.map((item, index) => {
                                                                        return (
                                                                            <tr key={index} className="border rounded rounded-3">
                                                                                <td>{item?.UserLogOnCode}</td>
                                                                                <td>{item?.UserName}</td>
                                                                                <td>{item?.UserEmail}</td>
                                                                                <td>{item?.JobRole}</td>
                                                                                <td><input name='SelectedUserIds' type="checkbox" onChange={() => checkUnBlock(item.UserId)} /></td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                    <div className='groupbtn'>
                                                        <button type="submit" className="btn btn-outline-dark  btnsub" onClick={() => onUnBlock()} >Lưu thay đổi</button>
                                                        <button type="button" className="btn btn-outline-dark  btnsub" onClick={() => hiddenFormBlockUser()} style={{ marginRight: "8px" }}>Ẩn người dùng</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </Sidebar>
                    </div>
                </LoadingPanel>
            </div>
            <BlockUser shareTree={props.shareTree} renderlai={() => renderdata()} Quaylai={() => QuayLaiFormTruoc()} onclickshow1={() => sethiddenBlockUser(false)}
                visiblefull1={hiddenBlockUser}></BlockUser>
        </>
    );

}
export default SettingOverview;
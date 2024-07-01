import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Card } from "primereact/card";
import { Checkbox } from 'primereact/checkbox';
import { Editor } from 'primereact/editor';
import { overViewService } from 'services/overViewService';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Tree } from 'primereact/tree';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';
import { traininghistoryService } from 'services/traininghistoryService';
import './SettingOverview.scss';


const BlockUser = (props) => {
    const refTree = useRef(null);
    let navigate = useNavigate();
    let { post_id } = useParams();
    const [checkboxSelected, setCheckboxSelected] = useState([]);
    const [checkradio, setcheckradio] = useState(0);
    const [CheckSentUser, setCheckSentUser] = useState(false);
    const [showLstUser, setshowLstUser] = useState(false);
    const [shareTree, setshareTree] = useState([]);
    const [selectedKeys3, setSelectedKeys3] = useState(null);
    const [getFile, setgetFile] = useState([]);
    const [getFileImg, setgetFileImg] = useState([]);
    const [taiLenImg, settaiLenImg] = useState([]);
    const [taiLenFile, settaiLenFile] = useState([]);
    const [lstUser, setlstUser] = useState([]);
    const [resultUser, setresultUser] = useState([]);
    const [selectUser, setselectUser] = useState([]);
    const [itemValue, setItemValue] = useState(null);
    const [lstTree, setlstTree] = useState("");



    const sendData = () => {
        props.Quaylai();
    };

    function printList(singleLinkedList) {
        let p = singleLinkedList;

        while (p) {
            p.children = p.childs;
            p.key = p.id;
            for (let k = 0; k < p.childs.length; k++) {
                p = p.childs[k];
                p.key = p.id;
                if (p.childs == null) {
                    return ""
                }
            }
        }
    }
    function printList1(singleLinkedList) {
        let p = singleLinkedList;

        while (p) {
            for (let k = 0; k < p.childs.length; k++) {
                if (p.label.indexOf('<b>') >= 0) {
                    let del_str = p.label.replace('<b>', '');
                    p.label = del_str;
                }
                if (p.label.indexOf('</b>') >= 0) {
                    let del_str = p.label.replace('</b>', '');
                    p.label = del_str;
                }
                p = p.childs[k];
                if (p.childs == null) {
                    return ""
                }
            }
        }
    }


    const [formData, setFormData] = useState();

    const { register, control, formState: { errors }, handleSubmit, reset, setValue } = useForm({});
    useEffect(() => {
        loadApi();

    }, []);

    const loadApi = async (val) => {
        // let lstTree = await overViewService.getsharetreejson();
        // var arrTree = JSON.parse(lstTree.data.TreeJson)
        // printList1(arrTree[0])
        // printList(arrTree[0])
        // setshareTree(arrTree);

        // let result = await overViewService.getfilecontroldetails();
        // let result1 = await overViewService.getfileimgcontroldetails();
        // setgetFile(result.data)
        // setgetFileImg(result1.data)

    }

    const CheckUserDetail = async (val) => {
        let obj = {
            SelectedFieldDetails: lstTree
        }
        setCheckSentUser(true)
        let result = await overViewService.getuserlist(obj);
        setlstUser(result.data.lstUserDetails);
        setresultUser(result.data.lstUserDetails);

    }

    const onCityChange = (e) => {
        let selectedCities = [...checkboxSelected];

        if (e.checked)
            selectedCities.push(e.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);

        setCheckboxSelected(selectedCities);
    }

    function onChangeValue(a) {
        setcheckradio(a)
    }

    const searchUser = (va) => {
        setshowLstUser(true)
        let valIn = va.target.value;

        let arrNew = Object.assign([], resultUser.filter(x => x.UserName.indexOf(valIn) >= 0));
        setlstUser(arrNew);
    }

    var arrU = "";
    const changCheckBox = (item) => {
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

        //setselectUser(arrU);
        setValue('Originator', arrU)
    }

    const changeTree = (tree) => {
        let strSlectTree = ""
        let selectTree = Object.getOwnPropertyNames(tree)
        if (selectTree.length > 0) {
            for (let i = 0; i < selectTree.length; i++) {
                strSlectTree = strSlectTree + selectTree[i] + ","
            }
            setlstTree(strSlectTree);
        }
    }
    const QuayLai = () => {
        onclickshow1();
        sendData();
    }

    const onSubmit = async (dataSub) => {
        dataSub.SharedBy = dataSub.Originator;
        dataSub.SelectedUsers = dataSub.Originator;
        dataSub.SelectedFieldDetails = "";
        dataSub.CorporateId = 1;
        dataSub.SelectedFieldDetails = "";
        dataSub.UserSelectionType = "U";
        await overViewService.blocksharetimelinetilesuser(dataSub);
        onclickshow1();
        props.renderlai();

    };


    let { onclickshow1, visiblefull1 } = props;
    return (
        <>
            <div >
                <div className="card" >
                    <Sidebar visible={visiblefull1} fullScreen onHide={onclickshow1} >

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='row' style={{ backgroundColor: "#3d4758" }}>
                                <div className='col-12 col-lg-3' >
                                    <Card>
                                        <div className="card" style={{ height: "100vh" }}>
                                            <div id="myListTree"></div>
                                            <div className="card-header" id="headingOne" style={{ height: '50px' }}>
                                                <h5 className="mb-0" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                                                    BỘ LỌC HIỂN THỊ
                                                </h5>
                                            </div>


                                            <Tree

                                                ref={refTree}
                                                value={props.shareTree}
                                                selectionMode="checkbox"
                                                selectionKeys={selectedKeys3}
                                                onSelectionChange={(e, b) => {
                                                    // e.preventDefault();
                                                    setSelectedKeys3(e.value);
                                                    // console.log(Object.getOwnPropertyNames(e.value))
                                                    changeTree(e.value);
                                                }}

                                            />
                                        </div>
                                    </Card>
                                </div>
                                <div className='col-12 col-lg-9'>
                                    <Card title="Người dùng được map" >
                                        <div className='card-header' onChange={event => onChangeValue(event.target.value)}>
                                            <input type="radio" id='option1' defaultValue={0} name="content" defaultChecked="checked"
                                                onClick={() => setCheckSentUser(false)}
                                            />
                                            <label htmlFor="option1" style={{ marginLeft: '5px' }}>Tất cả người dùng</label>

                                            <input type="radio" id='option2' defaultValue={1} name="content" style={{ marginLeft: '15px' }} onClick={() => CheckUserDetail()} />
                                            <label htmlFor="option2" style={{ marginLeft: '5px' }}>Người dùng cụ thể</label>
                                        </div>


                                        <div>
                                            <Card style={{ display: checkradio == 0 ? 'block' : 'none' }}>
                                                <div className='card-all-user'>
                                                    <button type="button" className="btn btn-outline-dark  btnsub" onClick={() => QuayLai()} >Quay lại danh sách</button>
                                                    <button type="submit" className="btn btn-outline-dark  btnsub" style={{ marginRight: "8px", width: "60px" }}>Ẩn</button>
                                                </div>
                                            </Card>

                                        </div>

                                        <Card title='Người dùng' style={{ display: checkradio == 1 ? 'block' : 'none' }}>
                                            <input type="text" className="form-control mb-4" placeholder="Nhập tên người dùng" onChange={(e) => searchUser(e)} />
                                            {showLstUser == true ?
                                                <div style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "1.5rem", fontSize: "16px" }}>
                                                    {
                                                        lstUser && lstUser.map((item, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <input id={item.UserId} onChange={() => changCheckBox(item.UserId)} name='Originator' type="checkbox" style={{ marginRight: "8px", fontSize: "18px" }}></input>
                                                                    <label htmlFor={item.UserId}>{item.UserName}</label>
                                                                </div>
                                                            )

                                                        })
                                                    }
                                                </div>
                                                : ""
                                            }

                                            <div className='card-user'>
                                                <button type="button" className="btn btn-outline-dark  btnsub" onClick={() => QuayLai()} >Quay lại danh sách</button>
                                                <button type="submit" className="btn btn-outline-dark  btnsub" style={{ marginRight: "8px", width: "60px" }}>Ẩn</button>
                                            </div>
                                        </Card>
                                    </Card>
                                </div>
                            </div>

                        </form>



                    </Sidebar>
                </div>
            </div>
        </>
    );

}
export default BlockUser;
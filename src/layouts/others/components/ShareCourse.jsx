import { useState, useEffect, useRef } from 'react';
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
import { loadable } from 'shared/utils';
import axios from 'axios';

const ShareCourse = (props) => {
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
    const [loading, setLoading] = useState(false);
    const [disabledChiase, setdisabledChiase] = useState(false);
    const [UserSelectionType, setUserSelectionType] = useState("O");
    const [checkShareAll, setcheckShareAll] = useState(false);
    const [checkImg, setcheckImg] = useState(true);

    let { dataTree, dataFile, dataImg } = props;

    const defaultValues = {
        AttachmentFilePath: '',
        InlineFilePath: '',
        SelectedFieldDetails: '',
        SelectedUsers: '',
        ShareComment: '', // nội dung thẻ
        ShareCommentDescription: '',
        ShareId: 0,
        TileId: 0,
        TileItemId: 0,
        TileType: 0,
        UploadedFileName: '',
        UploadedFilePath: '',
        UserSelectionType: "O"

    }
    const onLoadingClick1 = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const sendData = () => {
        props.createCallBack();
    };



    const [formData, setFormData] = useState();

    const { register, control, formState: { errors }, handleSubmit, reset, setValue } = useForm({ defaultValues: defaultValues });
    useEffect(() => {
        loadApi();

    }, []);

    const loadApi = async (val) => {
        // let lstTree = await overViewService.getsharetreejson();
        // let result = await overViewService.getfilecontroldetails();
        // let result1 = await overViewService.getfileimgcontroldetails();
        // var arrTree = JSON.parse(dataTree.data.TreeJson)
        // printList1(dataTree[0])
        // printList(dataTree[0])
        // setshareTree(dataTree);
        // setgetFile(dataFile.data)
        // setgetFileImg(dataImg.data)

    }

    const CheckUserDetail = async (val) => {
        setcheckShareAll(true);
        setUserSelectionType('U')
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
        console.log(a)
    }


    const onChangeImg = async (e) => {
        const file = e.target.files[0];
        let name = file.name;
        if (name.includes('jfif')) {
            alert('Ảnh không được hỗ trợ. \nVui lòng chọn ảnh khác.')
            setcheckImg(false)
        } else {
            let formData = new FormData();
            formData.append("uploadFile", file);
            formData.append("CorporateID", '1');
            formData.append('Culture', 'vi-VN');
            formData.append('AllowFileType', 'HÌNH ẢNH:jpeg, jpg, gif, png, bmp');

            let result = await axios.post('/AppService/api/FileUpload/UploadJsonFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            settaiLenImg(result)
            setValue('InlineFilePath', result.data.SaveFilePath)
        }

    }

    const onChangeFile = async (e) => {
        const file = e.target.files[0];

        let formData = new FormData();
        formData.append("uploadFile", file);
        formData.append("CorporateID", '1');
        formData.append('Culture', 'vi-VN');
        formData.append('AllowFileType', 'doc, docx, ppt, pptx, xls, xlsx, txt, pdf,jpeg, jpg, gif, png, bmp,mp4,mp3,zip');

        let result = await axios.post('/AppService/api/FileUpload/UploadJsonFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        settaiLenFile(result)
        setValue('AttachmentFilePath', result.data.SaveFilePath)
    }

    const searchUser = (va) => {
        let valIn = va.target.value;
        if (valIn != '') {
            setshowLstUser(true)

            let arrNew = Object.assign([], resultUser.filter(x => x.UserName.indexOf(valIn) >= 0));
            console.log('arr', arrNew)
            setlstUser(arrNew);
        }
        else {
            setshowLstUser(false);
            setlstUser([]);
        }
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

        console.log('arr', arrU)
        //setselectUser(arrU);
        setValue('SelectedUsers', arrU)
        //console.log('selectUser', selectUser);
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
    const shareAll = () => {
        setUserSelectionType('O')
        setcheckShareAll(false);
        setshowLstUser(false);
        setlstUser([]);
    }
    const closeShare = () => {
        setcheckShareAll(false);
        setshowLstUser(false);
        setlstUser([]);
        setValue('SelectedUsers', '')
        onHide();
    }

    const onSubmit = async (dataSub) => {
        debugger;
        if (dataSub.ShareComment != '') {
            dataSub.UserSelectionType = UserSelectionType;
            if (UserSelectionType == 'U' && dataSub.SelectedUsers == '') {
                alert('Vui lòng chọn ít nhất 1 user để chia sẻ')
            }
            if (taiLenImg.data) {
                dataSub.InlineFilePath = taiLenImg.data.SaveFilePath;
            }
            if (taiLenFile.data) {
                dataSub.AttachmentFilePath = taiLenFile.data.SaveFilePath;
            }
            if (checkImg == false) {
                alert('Vui lòng chọn đúng định dạng ảnh')
            }
            if (dataSub.SelectedUsers != '' && checkImg == true) {
                onLoadingClick1();
                setdisabledChiase(true);
                await overViewService.sharetimelinetiles(dataSub);
                setcheckShareAll(false);
                setshowLstUser(false);
                setlstUser([]);
                onclickshow();
                sendData();
                setdisabledChiase(false);
                alert('Chia sẻ bài đăng thành công');
                setValue('ShareComment', '');
                setValue('SelectedUsers', '')
                // reset();
            }
            else if (UserSelectionType == 'O' && checkImg == true) {
                onLoadingClick1();
                setdisabledChiase(true);
                await overViewService.sharetimelinetiles(dataSub);
                onclickshow();
                sendData();
                setdisabledChiase(false);
                alert('Chia sẻ bài đăng thành công');
                setValue('ShareComment', '')
            }


        }
        else {
            alert('Vui lòng nhập nội dung chia sẻ')
        }

    };
    let { onHide, visiblefull } = props;
    return (
        <>
            <div >
                <div className="card" >
                    <Sidebar visible={visiblefull} fullScreen onHide={() => closeShare()} >
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
                                            <div style={{ height: "100%", overflow: "auto" }}>
                                                <Tree

                                                    ref={refTree}
                                                    value={dataTree}
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

                                        </div>
                                    </Card>
                                </div>
                                <div className='col-12 col-lg-9'>
                                    <Card title="CHIA SẺ VỚI" >
                                        <div className='card-header' onChange={event => onChangeValue(event.target.value)}>
                                            <input type="radio" id='option1' defaultValue={0} name="content" defaultChecked="checked"
                                                onClick={() => shareAll()}
                                            />
                                            <label htmlFor="option1" style={{ marginLeft: '5px' }}>Tất cả người dùng</label>

                                            <input type="radio" id='option2' defaultValue={1} name="content" style={{ marginLeft: '15px' }} onClick={() => CheckUserDetail()} />
                                            <label htmlFor="option2" style={{ marginLeft: '5px' }}>Người dùng cụ thể</label>
                                        </div>


                                        <div>
                                            {checkShareAll == false ?
                                                <Card>
                                                    <div className='card-all-user'>
                                                        <div className='card-content'>
                                                            <div className="text-center">
                                                                <Controller name="ShareComment" control={control} render={({ field: { ref, ...field } }) => (
                                                                    <Editor className='edit' placeholder='Viết điều gì đó với người được chia sẻ'
                                                                        value={field.value ?? ""} {...field} onTextChange={(e) => field.onChange(e.htmlValue)} style={{ height: '200px' }} autoFocus
                                                                    />
                                                                )} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h5>{dataFile.FileLabel} hình ảnh</h5>
                                                            <div className="mb-3">
                                                                <input accept="image/*" name='InlineFilePath' className="form-control" type="file" onChange={onChangeImg} />
                                                            </div>
                                                            <div style={{ backgroundColor: "#3333", marginTop: "6px", height: "20px", width: "100%" }}></div>
                                                            <div>Ghi chú: </div>
                                                            <div>-Kích thước tệp tối đa tải lên là {dataImg.AllowFileSize} MB</div>
                                                            <div>-Các định dạng tệp được phép là:</div>
                                                            <div dangerouslySetInnerHTML={{ __html: dataImg.AllowedDisplayFileTypes }}></div>
                                                        </div>
                                                        <div>
                                                            <h5>{dataFile.FileLabel} tệp đính kèm</h5>
                                                            <div className="mb-3">
                                                                <input name='AttachmentFilePath' className="form-control" type="file" onChange={onChangeFile} />
                                                            </div>
                                                            <div style={{ backgroundColor: "#3333", marginTop: "6px", height: "20px", width: "100%" }}></div>
                                                            <div>Ghi chú: </div>
                                                            <div>-Kích thước tệp tối đa tải lên là {dataFile.AllowFileSize} MB</div>
                                                            <div>-Các định dạng tệp được phép là:</div>
                                                            <div dangerouslySetInnerHTML={{ __html: dataFile.AllowedDisplayFileTypes }}></div>
                                                        </div>
                                                        {/* <Button disabled={disabledChiase} loading={loading} type="submit" className="btn btn-outline-dark btn-sm rounded-3" style={{ float: 'right', fontSize: '0.85rem' }}>Chia sẻ</Button> */}
                                                    </div>
                                                </Card>
                                                :
                                                <Card title='Người dùng'>
                                                    <input type="text" className="form-control mb-4" placeholder="Nhập tên người dùng" onChange={(e) => searchUser(e)} />
                                                    {showLstUser == true ?
                                                        <div style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "1.5rem", fontSize: "16px", maxHeight: '50vh', overflow: 'auto' }}>
                                                            {

                                                                lstUser.length == 0 ?
                                                                    'Không có tài khoản nào'
                                                                    :
                                                                    (
                                                                        lstUser && lstUser.map((item, index) => {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <input id={item.UserId} onChange={() => changCheckBox(item.UserId)} name='SelectedUsers' type="checkbox" style={{ marginRight: "8px", fontSize: "18px" }}></input>
                                                                                    <label htmlFor={item.UserId}>{item.UserName}</label>
                                                                                </div>
                                                                            )

                                                                        })
                                                                    )
                                                            }
                                                        </div>
                                                        : ""
                                                    }

                                                    <div className='card-user'>
                                                        <div className='card-content'>
                                                            <div className="text-center">
                                                                <Controller name="ShareComment" control={control} render={({ field, fieldState }) => (
                                                                    <Editor className='edit'
                                                                        value={field.value} onTextChange={(e) => field.onChange(e.htmlValue)} style={{ height: '200px' }} />
                                                                )} />
                                                            </div>

                                                        </div>
                                                        <div>
                                                            <h5>{dataImg.FileLabel}</h5>
                                                            <div className="mb-3">
                                                                <input accept="image/*" name='InlineFilePath' className="form-control" type="file" onChange={onChangeImg} />
                                                            </div>
                                                            <div style={{ backgroundColor: "#3333", marginTop: "6px", height: "20px", width: "100%" }}></div>
                                                            <div>Ghi chú: </div>
                                                            <div>-Kích thước tệp tối đa tải lên là {dataImg.AllowFileSize} MB</div>
                                                            <div>-Các định dạng tệp được phép là:</div>
                                                            <div dangerouslySetInnerHTML={{ __html: dataImg.AllowedDisplayFileTypes }}></div>
                                                        </div>
                                                        <div>
                                                            <h5>{dataFile.FileLabel} tệp đính kèm</h5>
                                                            <div className="mb-3">
                                                                <input accept="doc, docx, xls, xlsx, ppt, pptx, txt, pdf,image/* " name='AttachmentFilePath' className="form-control" type="file" onChange={onChangeFile} />
                                                            </div>
                                                            <div style={{ backgroundColor: "#3333", marginTop: "6px", height: "20px", width: "100%" }}></div>
                                                            <div>Ghi chú: </div>
                                                            <div>-Kích thước tệp tối đa tải lên là {dataFile.AllowFileSize} MB</div>
                                                            <div>-Các định dạng tệp được phép là:</div>
                                                            <div dangerouslySetInnerHTML={{ __html: dataFile.AllowedDisplayFileTypes }}></div>
                                                        </div>
                                                        {/* <Button disabled={disabledChiase} loading={loading} type="submit" className="btn btn-outline-dark btn-sm rounded-3" style={{ float: 'right', fontSize: '0.85rem' }}>Chia sẻ</Button> */}
                                                    </div>
                                                </Card>
                                            }
                                        </div>


                                    </Card>
                                </div>
                            </div>

                        </form>
                    </Sidebar>
                </div>

            </div>
        </>
    )

}
export default ShareCourse;
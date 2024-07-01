import 'styles/themes/offcanvas.scss';
import { Card } from 'primereact/card';
import { useRef, useState, useEffect } from "react";
import { profileCertificateService } from 'services/profileCertificateService';
import { learningService } from 'services/learningService';
import { useForm } from 'react-hook-form';
import { appSetting } from 'shared/app-settings';
import { getCurrentUserDefault } from "shared/utils/getCurrentUserDefault";
import { Button } from 'primereact/button';
import { Image } from "components/Image";
import { InputText } from "primereact/inputtext";


const CertificateLayout = () => {
    const [active, setActive] = useState(0);
    const [expiring, setExpiring] = useState(0);
    const [expired, setExpired] = useState(0);
    const [certcount, setCertcount] = useState(0);
    const [certlist, setCertlist] = useState([]);
    const [btnActive, setbtnActive] = useState(0);
    const [Keysearch, setKeysearch] = useState("");
    const [ChangeText, onChangeText] = useState("");
    const [onReset, setonReset] = useState(false);
    const [visibleMore, setVisibleMore] = useState(false);
    const [filterBy1, setfilterBy1] = useState({
        PageNumber: 1,
        PageSize: 9,
        SeartchText: Keysearch,
    });
    useEffect(() => {
        let _filterBy1 = { ...filterBy1, PageNumber: 1, SeartchText: Keysearch }
        loadData(_filterBy1);
    }, [onReset])

    const loadData = async (param) => {
        debugger;
        let result = await profileCertificateService.getcertificatesummarydata();
        setActive(result.data.CertificateSummaryList[0].StatusCount);
        setExpiring(result.data.CertificateSummaryList[1].StatusCount);
        setExpired(result.data.CertificateSummaryList[2].StatusCount);

        // let result2 = await profileCertificateService.getiltcoursecountdata();
        // setCertcount(result2.data.CertificateCount);

        // let result3 = await profileCertificateService.getcertificatedata();
        if (btnActive == 1) {
            let result3 = await profileCertificateService.getcertificateexsonactivesummarydata(param);
            setCertlist(result3.data.CertificateList);
            setCertcount(result3.data.CertificateList.length);
            if (result3.data?.CertificateList.length == filterBy1.PageSize && result3.data?.CertificateList.length < result.data.CertificateSummaryList[1].StatusCount) {
                setVisibleMore(true);
            }
        }
        else if (btnActive == 2) {
            let result3 = await profileCertificateService.getcertificateexprilsummarydata(param);
            setCertlist(result3.data.CertificateList);
            setCertcount(result3.data.CertificateList.length);
            if (result3.data?.CertificateList.length == filterBy1.PageSize && result3.data?.CertificateList.length < result.data.CertificateSummaryList[2].StatusCount) {
                setVisibleMore(true);
            }
        }
        else {
            let result3 = await profileCertificateService.getcertificateactivesummaryData(param);
            setCertlist(result3.data.CertificateList);
            setCertcount(result3.data.CertificateList.length);
            if (result3.data?.CertificateList.length == filterBy1.PageSize && result3.data?.CertificateList.length < result.data.CertificateSummaryList[0].StatusCount) {
                setVisibleMore(true);
            }
        }
    }

    function replaceSpaces(input) {
        let rep = "%20"
        for (let i = 0; i < input.length; i++) {
            if (input[i] == ' ')
                input = input.replace(input[i], rep);
        }
        document.write(input);
    }

    const openInNewTab = async (data) => {
        const userDefault = getCurrentUserDefault();
        const userID = userDefault.UserId;
        let obj = {
            Mode: 'open',
            AuthKey: '',
            CertificateId: data.CertificateId,
            CertificateTemplateId: data.CertificateTemplateId,
            CourseLaunchId: data.CourseId,
            SelectedUserId: userID,
            LearningType: data.learningType,
            SearchText: '',
            OrderBy: 'DT_CMPLTN_DT',
            Order: 'desc',
        };
        try {
            const response = await learningService.getimgcertificate(obj);
            const newTab = window.open('', '_blank');
            newTab.document.write(response.data);

            newTab.document.title = "Chứng chỉ hoàn thành khóa học";

        } catch (error) {
            console.error(error);
        }
    };
    const onActiveCC = async () => {
        debugger;
        let _filterBy1 = { ...filterBy1, PageNumber: 1 }
        setfilterBy1(_filterBy1);
        setbtnActive(0);
        setKeysearch("");
        onChangeText('');
        let result = await profileCertificateService.getcertificateactivesummaryData(_filterBy1);
        setCertlist(result.data.CertificateList);
        setCertcount(result.data.CertificateList.length);
        if (result.data?.CertificateList.length == filterBy1.PageSize && result.data?.CertificateList.length < active) {
            setVisibleMore(true);
        }
        else {
            setVisibleMore(false);
        }
    }
    const onExsonActiveCC = async () => {
        debugger;
        let _filterBy1 = { ...filterBy1, PageNumber: 1 }
        setfilterBy1(_filterBy1);
        setbtnActive(1);
        setKeysearch("");
        onChangeText('');
        let result = await profileCertificateService.getcertificateexsonactivesummarydata(_filterBy1);
        setCertlist(result.data.CertificateList);
        setCertcount(result.data.CertificateList.length);
        if (result.data?.CertificateList.length == filterBy1.PageSize && result.data?.CertificateList.length < expiring) {
            setVisibleMore(true);
        }
        else {
            setVisibleMore(false);
        }
    }
    const onExprilCC = async () => {
        debugger;
        let _filterBy1 = { ...filterBy1, PageNumber: 1 }
        setfilterBy1(_filterBy1);
        setbtnActive(2);
        setKeysearch("");
        onChangeText('');
        let result = await profileCertificateService.getcertificateexprilsummarydata(_filterBy1);
        setCertlist(result.data.CertificateList);
        setCertcount(result.data.CertificateList.length);
        if (result.data?.CertificateList.length == filterBy1.PageSize && result.data?.CertificateList.length < expired) {
            setVisibleMore(true);
        }
        else {
            setVisibleMore(false);
        }
    }
    function onKeySearchChange() {
        let newText = ChangeText
        setKeysearch(newText);
        setonReset(!onReset);
    }
    function keyDown(e) {
        if (e.key == 'Enter') {
            let newText = e.target.value.trim()
            setKeysearch(newText);
            setonReset(!onReset);
            //setAdvanceSearch({ ...advanceSearch, searchBy: newText });
        }
    }
    function rendercertlist() {
        return (
            certlist.map((data, index) => {
                return (
                    <div className="col-4">
                        <div key={index} className="card border border-3 rounded-3" >
                            <div className="card-body" style={{ cursor: 'pointer' }} onClick={() => openInNewTab(data)}>
                                <a >
                                    {/* href={appSetting.ADMIN_URL + '/PrintCertificate.aspx?CertificateId=' + data.CertificateId + '&CertificateTemplateId=' + data.CertificateTemplateId + '&userID=' + userid + '&CourseId=' + data.CourseId + '&corporateID=' + corpid + '&TimeZoneValue=' + timezone + '&Path=certificate&learningType=' + data.learningType} */}
                                    <Image style={{ height: 110 }} src={data.CerficateImagePath} className="card-img-top" alt="Chứng chỉ" />
                                    <div className="card-title" style={{ height: '70px', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 10 }}>
                                        <h5 style={{ color: 'green' }}>{data.CertificateName}</h5>
                                        <span>{data.CourseName}</span>
                                    </div>
                                </a>
                            </div>
                            <div className="p-card-body">
                                <div className='d-flex flex-row justify-content-between'>
                                    <div className='d-flex flex-column text-center'>
                                        <span>Đạt được vào</span>
                                        <div className="row">
                                            <h6 className="p-float-label text-center">
                                                {data.CertificateCompletionDate}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column text-center'>
                                        <span>Hết hạn vào</span>
                                        <div className="row">
                                            <h6 className="p-float-label text-center">
                                                {data.CertificateExpiryDate}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            })
        )
    }
    const onShowMore = async () => {
        debugger;
        let CrouseTemp;
        filterBy1.PageNumber++;
        setfilterBy1(filterBy1);
        const params = {
            PageNumber: filterBy1.PageNumber,
            PageSize: filterBy1.PageSize,
            SeartchText: filterBy1.SeartchText,
        };
        if (btnActive == 1) {
            let result = await profileCertificateService.getcertificateexsonactivesummarydata({ ...params });
            if (result.data?.CertificateList.length > 0) {
                CrouseTemp = [...certlist, ...result.data?.CertificateList];
                setCertlist(CrouseTemp);
            }
            if (
                result.data?.CertificateList.length < filterBy1.PageSize ||
                result.data.PageNumber * result.data.PageSize >= expiring
            ) {
                setVisibleMore(false);
            }
        }
        else if (btnActive == 2) {
            let result = await profileCertificateService.getcertificateexprilsummarydata({ ...params });
            if (result.data?.CertificateList.length > 0) {
                CrouseTemp = [...certlist, ...result.data?.CertificateList];
                setCertlist(CrouseTemp);
            }
            if (
                result.data?.CertificateList.length < filterBy1.PageSize ||
                result.data.PageNumber * result.data.PageSize >= expired
            ) {
                setVisibleMore(false);
            }
        }
        else if (btnActive == 0) {
            let result = await profileCertificateService.getcertificateactivesummaryData({ ...params });
            if (result.data?.CertificateList.length > 0) {
                CrouseTemp = [...certlist, ...result.data?.CertificateList];
                setCertlist(CrouseTemp);
            }
            if (
                result.data?.CertificateList.length < filterBy1.PageSize ||
                result.data.PageNumber * result.data.PageSize >= active
            ) {
                setVisibleMore(false);
            }
        }

    };
    console.log('visibleMore', visibleMore)
    return (
        <>
            <div>
                <Card style={{ height: '80vh', overflow: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h5>TRẠNG THÁI CHỨNG CHỈ</h5>
                            <label>TÓM LƯỢC</label>
                        </div>
                        <div className="p-inputgroup" style={{ width: 400, height: 40 }}>
                            <InputText
                                onKeyDown={(e) => keyDown(e)}
                                onChange={(e) => onChangeText(e.target.value)}
                                placeholder="Nhập từ khóa tìm kiếm"
                                style={{ width: "400px" }}
                                value={ChangeText}
                            />
                            <Button
                                style={{ padding: 12, border: 0, color: 'black', background: '#ebebeb' }}
                                onClick={(e) => onKeySearchChange()}
                            >
                                <i style={{ fontWeight: '700' }} className="pi pi-search"></i>
                            </Button>
                        </div>
                    </div>
                    <div className="col-12 row">
                        <div className="col-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <div className="card-body" style={{ border: '1px solid #ccc' }}>
                                <span className="p-float-label text-center">
                                    <h6 style={{ color: 'green' }}>Hoạt động</h6>
                                    <h5>{active}</h5>
                                </span>
                            </div> */}
                            <Button label={"Hoạt động " + '(' + active + ')'} severity="info" outlined
                                style={{ backgroundColor: btnActive == 0 ? 'rgb(26, 161, 220)' : '#fff', color: btnActive == 0 ? '#fff' : '#333', fontWeight: '600' }}
                                onClick={() => onActiveCC()} />
                        </div>
                        <div className="col-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <div className="card-body" style={{ border: '1px solid #ccc' }}>
                                <span className="p-float-label text-center">
                                    <h6 style={{ color: 'orange' }}>Chuẩn bị hết hạn</h6>
                                    <h5>{expiring}</h5>
                                </span>
                            </div> */}
                            <Button label={"Chuẩn bị hết hạn " + '(' + expiring + ')'} severity="info" outlined
                                style={{ backgroundColor: btnActive == 1 ? 'rgb(26, 161, 220)' : '#fff', color: btnActive == 1 ? '#fff' : '#333', fontWeight: '600' }}
                                onClick={() => onExsonActiveCC()} />
                        </div>
                        <div className="col-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <div className="card-body" style={{ border: '1px solid #ccc' }}>
                                <span className="p-float-label text-center">
                                    <h6 style={{ color: 'red' }}>Hết hạn</h6>
                                    <h5>{expired}</h5>
                                </span>
                            </div> */}
                            <Button label={"Hết hạn " + '(' + expired + ')'} severity="info" outlined
                                style={{ backgroundColor: btnActive == 2 ? 'rgb(26, 161, 220)' : '#fff', color: btnActive == 2 ? '#fff' : '#333', fontWeight: '600' }}
                                onClick={() => onExprilCC()} />
                        </div>
                    </div>
                    <label>TỔNG SỐ CHỨNG CHỈ ({certcount})</label>
                    <div className="col-12 row">
                        {rendercertlist()}
                    </div>
                    {visibleMore && (
                        <div className="loadMoreBtn" style={{ marginLeft: 12 }}>
                            <a style={{ cursor: "pointer", color: 'blue' }} onClick={() => onShowMore()}>Xem nhiều hơn</a>
                        </div>
                    )}
                </Card>
            </div>
        </>
    )
}
export default CertificateLayout;
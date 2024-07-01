import { Card } from "primereact/card";
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';
import { cuocthiService } from 'services/cuocthiService';
import { useState, useEffect } from 'react';
import { Image } from 'components/Image';
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';


const BanLanhDaoContainer = () => {
    const [lstUser, setlstUser] = useState({});
    const [keySearch, setKeysearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [leverFilter, setLeverFilter] = useState([]);
    const [advanceSearch, setAdvanceSearch] = useState({
        AreaId: 0,
        AreaIds: "",
        CorporateID: 1,
        GroupIds: "",
        NodeType: 0,
        Order: "ASC",
        OrderBy: "NM_RNK_ID",
        RecordCount: 10,
        searchText: "",
        pageNumber: 1,
        pageSize: 10,
        UserLevelID: 0,
        WebAppFlag: "W",


    });
    const filterCourse = async (value) => {
        setLoading(true);
        let lstconversation = await cuocthiService.getgamficationarealeaderboard(value);
        setlstUser(lstconversation.data)
        setLoading(false);
    }
    const newLocal =
        <div className="nav flex-column nav-pills nav-justified mb-3 p-3 mb-2 bg-light text-dark" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <span style={{ fontWeight: "700", textTransform: "uppercase", marginLeft: "5%", lineHeight: "1.5rem", marginBottom: "10px", fontSize: "16px" }}>Hạng mục</span>
            <button className="nav-link active d-flex" id="v-pills-rank-tab" data-bs-toggle="pill" data-bs-target="#v-pills-rank" type="button" role="tab" aria-controls="v-pills-rank" aria-selected="true">TỔNG QUAN</button>
        </div>;
    const filterItems = [
        {
            value: 'FR',
            text: 'LÀM MỚI'
        },
        {
            value: 'CR',
            text: 'NGÀY TẠO'
        }
    ]
    const filterItems3 = [
        {
            UserLevelID: 0,
            HierarchyName: "Tất cả",
            IsSelected: 0,
            NodeType: 0,
            text: "Tất cả",
            value: 0
        },
        {
            UserLevelID: 231,
            HierarchyName: "TRG",
            IsSelected: 0,
            NodeType: 0,
            text: "TRG",
            value: 231
        }
        ,
        {
            UserLevelID: 395,
            HierarchyName: "Phòng Quản lý Đào tạo",
            IsSelected: 0,
            NodeType: 0,
            text: "Phòng Quản lý Đào tạo",
            value: 395
        }
    ]
    const filterItems1 = [
        {
            value: 'ASC',
            text: 'Tăng dần'
        },
        {
            value: 'DESC',
            text: 'Giảm dần'
        }
    ]
    function keyDown(e) {
        if (e.key == 'Enter') {
            setAdvanceSearch({ ...advanceSearch, searchText: e.target.value });
        }
    }
    function onKeySearchChange(text) {
        let newText = text.trim();
        setKeysearch(newText);
    }
    const onChangeFilter = (item) => {
        setAdvanceSearch({ ...advanceSearch, UserLevelID: item.value });
    }
    const onChangeFilter1 = (item) => {
        setAdvanceSearch({ ...advanceSearch, Order: item.value });
    }

    const loadApi = async (val) => {
        let lstconversation = await cuocthiService.getgamficationarealeaderboard(val);
        let lstLever = await cuocthiService.getgamificationlevels(val);
        setlstUser(lstconversation.data)
        let lstlevernew = lstLever.data;
        for (let i = 0; i < lstlevernew.length; i++) {
            lstlevernew[i].text = lstlevernew[i].HierarchyName;
            lstlevernew[i].value = lstlevernew[i].UserLevelID;

        }
        setLeverFilter(lstlevernew)

    }
    useEffect(() => {
        // call api here
        loadApi(advanceSearch);
    }, []);
    useEffect(() => {
        filterCourse(advanceSearch);
    }, [advanceSearch]);

    return (
        <>
            <div className="my-learning-container row">
                <div className="col-3 scroll-wrapper"> {newLocal} </div>
                <div className="col-9 scroll-wrapper">
                    <div className="d-flex align-items-start">
                        <div className="tab-content w-100" id="v-pill-tabContent">
                            <div className="tab-panel fade show active" id="v-pill-rank" role="tabpanel" aria-labelledby="v-pill-rank-tab">
                                <Card title="CUỘC THI & BẢNG XẾP HẠNG">
                                    <div style={{ display: "flex", marginBottom: "20px" }}>
                                        <div className="p-inputgroup" style={{ width: '488px' }}>
                                            <InputText onKeyDown={(e) => keyDown(e)} onChange={(e) => onKeySearchChange(e.target.value)} placeholder="Nhập từ khoá tìm kiếm" />
                                            <Button onClick={() => {
                                                setAdvanceSearch({ ...advanceSearch, searchText: keySearch });
                                            }} icon="pi pi-search" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <DropdownFilter items={leverFilter} onChange={onChangeFilter} />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <DropdownFilter items={filterItems1} onChange={onChangeFilter1} />
                                        </div>
                                    </div>
                                    <br />
                                    <LoadingPanel loading={loading} >
                                        {lstUser.Leaderboard != [] ?
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col"> CẤP </th>
                                                        <th scope="col">
                                                            THÔNG TIN NGƯỜI DÙNG
                                                        </th>
                                                        <th scope="col"> ĐIỂM </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        lstUser.Leaderboard && lstUser.Leaderboard.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td scope="row">{item.RankId}</td>
                                                                    <td>
                                                                        <div>
                                                                            <Image src={item.UserImagePath} style={{ width: '30px', height: '30px', borderRadius: "50%", border: "2px solid #3333" }} />
                                                                            <span className="text" style={{ marginLeft: '10px' }}>{item.Username}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>{item.Points}</td>
                                                                </tr>
                                                            )
                                                        })}

                                                </tbody>
                                            </table>
                                            :
                                            <span>Không có mục nào để hiển thị</span>
                                        }
                                    </LoadingPanel>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default BanLanhDaoContainer;
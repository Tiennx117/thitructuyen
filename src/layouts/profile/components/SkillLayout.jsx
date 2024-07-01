import 'styles/themes/offcanvas.scss';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRef, useState, useEffect } from "react";
import { profileSkillService } from 'services/profileSkillService';
import './progress.scss';
import { FaArrowUp } from 'react-icons/fa';
import Image from 'components/Image';

const SkillLayout = () => {
    const [data, setData] = useState({});
    const [table, setTable] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const body = {
        'JobRoleId': '0',
        'PageNumber': '1',
        'PageSize': '10'
    }

    const loadData = async () => {
        let result = await profileSkillService.getskillandleveldata();
        let resultTable = await profileSkillService.getskills(body);
        setData(result.data);
        setTable(resultTable.data.SkillItems);
    }

    const loopchart = dataItem => {
        let content = [];
        for (let i = 0; i < dataItem.Level.AcquiredLevels; i++) {
            content.push(
                <div className="progress" style={{ marginRight: '5px', width: '20%' }} >
                    <div className="progress-bar" style={{ backgroundColor: '#0078d7', width: '100%' }} />
                </div>
            );
        }
        return content;
    };

    const loopchartyellow = dataItem => {
        let content = [];
        for (let i = 0; i < (dataItem.Level.RequiredLevels - dataItem.Level.AcquiredLevels); i++) {
            content.push(
                <div className="progress" style={{ marginRight: '5px', width: '20%' }} >
                    <div className="progress-bar" style={{ backgroundColor: '#a085bd', width: '100%' }} />
                </div>
            );
        }
        return content;
    };

    const loopcharticon = dataItem => {
        let content = [];
        for (let i = 0; i < dataItem.Level.RequiredLevels; i++) {
            content.push(
                <div className="progress" style={{ marginRight: '5px', width: '19.5%' }} >
                    <div className="progress-bar" style={{ backgroundColor: 'white', width: '100%' }} />
                </div>
            );
        }
        return content;
    };

    function progress() {
        return (
            table.map((dataItem, index) => {
                return (
                    <>
                        <tr key={index}>
                            <td>{dataItem.SkillName}</td>
                            <td>{dataItem.SkillCategoryName}</td>
                            <td>
                                <span>
                                    <div className="d-flex justify-content-between">
                                        <div className=''>
                                            0
                                        </div>
                                        <div className=''>
                                            {dataItem.Level.TotalLevels}
                                        </div>
                                    </div>
                                    <span className='d-flex flex-row'>
                                        {loopchart(dataItem)}
                                        {loopchartyellow(dataItem)}
                                    </span>
                                    <span className='d-flex flex-row'>
                                        {loopcharticon(dataItem)}
                                        <i className='fas fa-caret-up' style={{ color: '#a085bd' }}></i>
                                    </span>
                                </span>
                            </td>
                        </tr>
                    </>
                );
            })
        )
    }

    return (
        <>
            <div>
                <Card style={{ height: '80vh', overflow: 'auto' }}>
                    <div className="p-fluid container">
                        <h5>KỸ NĂNG</h5>
                        <label>TÓM LƯỢC</label>
                        <div className="col-12 row">
                            <div className="col-4">
                                <div className="card-body" style={{ border: '1px solid #ccc' }}>
                                    <span className="p-float-label text-center">
                                        <h6>Kỹ năng</h6>
                                        <span className="p-float-label text-center">
                                            <img src="/images/skills.png" className="img-fluid rounded-circle" style={{ 'height': '30px', 'width': '30px' }} alt="skills"></img>
                                            <h5>{data.SkillCount}</h5>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="card-body" style={{ border: '1px solid #ccc' }}>
                                    <span className="p-float-label text-center">
                                        <h6>Cấp độ đã đạt được</h6>
                                        <span className="p-float-label text-center">
                                            <img src="/images/request-icon.png" className="img-fluid rounded-circle" style={{ 'height': '30px', 'width': '30px' }} alt="skills"></img>
                                            <h5>{data.LevelCount}</h5>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"> Tên kỹ năng </th>
                                    <th scope="col"> Hạng mục kỹ năng </th>
                                    <th scope="col"> Các cấp độ: 🟣 Bắt buộc 🔵 Hiện tại </th>
                                </tr>
                            </thead>
                            <tbody>
                                {progress()}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div >
        </>
    )
}
export default SkillLayout;
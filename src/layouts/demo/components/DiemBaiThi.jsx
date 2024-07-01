import React, { useState, useEffect, useRef } from 'react';
import { Card } from "primereact/card";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const data = [
    {
        lan_thi: '1',
        bat_dau: '10/09/2022 9:05:02 AM',
        ket_thuc: '10/09/2022 9:10:00 AM',
        diem: '15',
        loai: 'Đỗ',
        trang_thai: 'Đã thi'
    },
];

const DiemBaiThi = () => {
    const [expandedRows, setExpandedRows] = useState(null);
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            console.log(1);
        }
    }, [expandedRows]);

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <Card className="mb-3">
                    <div className="row">
                        <div className="col-9">
                            <label className="p-float-label">Câu hỏi 1: Khi thời gian của ca thi bắt đầu, nếu cán bộ không bấm vào nút "Bắt đầu" sau bao lâu thì hệ thống sẽ tự động khóa và không thể làm bài thi của ca đó?</label>
                            <span>
                                <h6>Phản hồi câu hỏi</h6>
                            </span>
                        </div>
                        <div className="col-3">
                            <label className="p-float-label">Điểm: 2/2</label>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="row">
                        <div className="col-9">
                            <label className="p-float-label">Câu hỏi 2: Khi đã vào hệ thống thi, lúc nào có thể nhìn thấy thông tin về ca thi?</label>
                            <span>
                                <h6>Phản hồi câu hỏi</h6>
                            </span>
                        </div>
                        <div className="col-3" style={{ 'right': '5px' }}>
                            <label className="p-float-label">Điểm: 2/2</label>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
    const allowExpansion = (rowData) => {
        console.log(rowData);
        return true
    };
    return (
        <>
            <div className="d-flex flex-column text-center w-100 m-3">
                <h3>
                    Tuần 1: Cuộc thi tìm hiểu về Đảng
                </h3>
                <div>
                    Nguyễn Văn A
                </div>
            </div>
            <Card title='Kết quả bài thi' className="mb-3">
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="float-input">Tên cuộc thi</label>
                        <span className="p-float-label">
                            <h6>Tuần 1: Cuộc thi tìm hiểu về Đảng</h6>
                        </span>
                    </div>
                    <div className="col-3">
                        <label htmlFor="float-input">Mã khóa học</label>
                        <span className="p-float-label">
                            <h6>050922-THVĐ</h6>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="float-input">Tên bài thi</label>
                        <span className="p-float-label">
                            <h6>Tuần 1: Cuộc thi tìm hiểu về Đảng</h6>
                        </span>
                    </div>
                    <div className="col-3">
                        <label htmlFor="float-input">Tổng số điểm</label>
                        <span className="p-float-label">
                            <h6>15/30</h6>
                        </span>
                    </div>
                    <div className="col-3">
                        <label htmlFor="float-input">Tổng số câu hỏi</label>
                        <span className="p-float-label">
                            <h6>15</h6>
                        </span>
                    </div>
                    <div className="col-3">
                        <label htmlFor="float-input">Xếp loại</label>
                        <span className="p-float-label">
                            <h6>Đỗ</h6>
                        </span>
                    </div>
                </div>
            </Card>
            <Card>
                <DataTable value={data}
                    expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}
                >

                    <Column style={{ width: '100px' }} header="Lần thi" field="lan_thi" />
                    <Column header="Thời gian bắt đầu thi" field="bat_dau" />
                    <Column header="Thời gian kết thúc thi" field="ket_thuc" />
                    <Column header="Điểm thi" field="diem" />
                    <Column header="Xếp loại" field="loai" />
                    <Column header="Trạng thái" field="trang_thai" />
                    {/*<Column header="Hành động">
                        <div>
                        <Button label="Chi tiết" className="mt-2" style={{ width: 100 }} />
                        </div>
                    </Column>*/}
                    <Column expander={allowExpansion} style={{ width: '3em' }} />
                </DataTable>
            </Card>
        </>
    )
}
export default DiemBaiThi;
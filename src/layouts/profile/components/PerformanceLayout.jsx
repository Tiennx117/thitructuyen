import 'styles/themes/offcanvas.scss';
import { Card } from 'primereact/card';
import { useRef, useState, useEffect } from "react";
import { profilePerformanceService } from 'services/profilePerformanceService';
import { useForm } from 'react-hook-form';

const PerformanceLayout = () => {
    const [data, setData] = useState({});

    const defaultValues = {
        name: ''
    }
    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({
        defaultValues: defaultValues
    });

    useEffect(() => {
        loadData();
    }, [])

    useEffect(() => {
        return (() => {
            console.log('unmount');
        })
    }, [])

    const loadData = async () => {
        let result = await profilePerformanceService.getearnpointdata();
        setData(result.data);
        reset(result.data);
    }

    const toast = useRef(null);

    const onSubmit = async (data) => {
        await profilePerformanceService.getearnpointdata(data);
        await profilePerformanceService.getachievementdata(data);
    }

    return (
        <>
            <div>
                <Card style={{ height: '80vh', overflow: 'auto' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-fluid container">
                            <h5>THÀNH TÍCH</h5>
                            <label>ĐIỂM</label>
                            <div className="col-12 row">
                                <div className="col-4">
                                    <div className="card-body" style={{ border: '1px solid #ccc' }}>
                                        <span className="p-float-label text-center">
                                            <h6>Tổng số điểm kiếm được</h6>
                                            <h5>{data.TotalEarnPoint}</h5>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <label>GIỜ TÍN CHỈ</label>
                            <div className="col-12 row">
                                <div className="col-4">
                                    <div className="card-body" style={{ border: '1px solid #ccc' }}>
                                        <span className="p-float-label text-center">
                                            <h6>Tổng số giờ tín chỉ</h6>
                                            <h5>{data.TotalCreditHours}</h5>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <label>DANH HIỆU</label>
                        </div >
                    </form>
                </Card>
            </div>
        </>
    )
}
export default PerformanceLayout;
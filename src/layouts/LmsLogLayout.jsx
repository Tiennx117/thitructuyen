import { Calendar } from "primereact/calendar";
import { format, parse, parseISO } from "date-fns";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import { useEffect, useState } from "react";
import { lmslogService } from "services/lmslogService";
import { Controller, useForm } from "react-hook-form";
import { mapPaginator } from "shared/utils";
import { PermissionLMS } from "components/PermissionLMS";
import { useSelector } from "react-redux";
export const pagingDefaults = {
    key_search: '',
    first: 0,
    rows: 20,
    page: 0,
    sortField: 'created_at',
    sortOrder: true,

    pageSize: 20,
    pageNumber: 0,

}
const LmsLogLayout = () => {
    const userRoleIds = useSelector(state => state.oauth.UserRoles.map(x => x.mnUserRoleId.toString())) || [];
    const roleSuperAmin = "1";
    const isAuthenLmsLog = userRoleIds.includes(roleSuperAmin);

    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [items, setItems] = useState(null);
    const [lazyParams, setLazyParams] = useState(pagingDefaults);
    const [selectedRow, setSelectedRow] = useState(null);
    const filterLog = (courseId, courseCode, courseTitle, userName, path, domain, status, fromDate, toDate, pageNumber, pageSize) => {
        setLoading(true);
        lmslogService.filterLog(courseId, courseCode, courseTitle, userName, path, domain, status, fromDate, toDate, pageNumber, pageSize).then(res => {
            console.log(res);
            setDataSource(res.data.logs);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        })
    }
    const activityBodyTemplate = (rowData) => {
        return <><div style={{ width: '100px', wordWrap: 'break-word', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rowData.body}</div></>
    };
    const dataTemplate = (rowData) => {
        return <><div style={{ width: '100px', wordWrap: 'break-word', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rowData.data}</div></>
    };
    const createdAtTemplate = (rowData) => {
        return <>{format(new Date(rowData.created_at), 'dd/MM/yyyy HH:mm:ss')}</>
    }
    const actionTemplate = (rowData) => {
        return <div className="d-flex flex-row">
            <Button size="small" className="w-100" onClick={() => openDetail(rowData)}  >Chi tiết</Button>
            <Button size="small" className="ml-2 w-100" onClick={() => exportDataBody(rowData)}>Export body</Button>
            <Button size="small" className="ml-2 w-100" onClick={() => exportData(rowData)}>Export data</Button>
        </div>
    }
    const [visible, setVisible] = useState(false);
    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Ok" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );
    const openDetail = (rowData) => {
        setVisible(true)
        setSelectedRow(rowData);
    }
    const exportDataBody = (data) => {
        // const bodyObjects = data.map(item => JSON.parse(item.body));
        const bodyObjects = JSON.parse(data.body);
        console.log(bodyObjects);
        const jsonData = JSON.stringify(bodyObjects);
        const fileBlob = new Blob([jsonData], { type: 'application/json' });
        const fileUrl = URL.createObjectURL(fileBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = 'body.json';
        downloadLink.click();
    };
    const exportData = (data) => {
        // const dataObjects = data.map(item => JSON.parse(item.data));
        const dataObjects = JSON.parse(data.data);
        console.log(dataObjects);
        const jsonData = JSON.stringify(dataObjects);
        const fileBlob = new Blob([jsonData], { type: 'application/json' });
        const fileUrl = URL.createObjectURL(fileBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = 'data.json';
        downloadLink.click();
    };
    const cities = [
        { name: 'Đã Hoàn Thành', code: '200' },
        { name: 'Bị lỗi', code: '500' },
        { name: 'Trước Khi Gửi Request', code: '0' },
        { name: 'Câu trả lời tự luận', code: '1' },

    ];
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        if (isAuthenLmsLog) {
            loadLazyData();
        }

    }, [lazyParams])
    const loadLazyData = async () => {
        try {
            setLoading(true);
            let advanceSearch = { ...lazyParams }
            advanceSearch.pageNumber = lazyParams.page;
            advanceSearch.pageSize = lazyParams.rows;
            let result = await lmslogService.filterLog(advanceSearch);
            setItems(result.data.logs);
            setTotalRecords(result.data.totalCount);
            setLoading(false);
        } catch {

        }
        finally {
            setLoading(false);
        }

    }

    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({
        courseId: '',
        fromDate: '',
        pageNumber: 1,
        pageSize: 10
    });
    const onSubmit = (data) => {
        console.log(data);
        let advanceSearch = { ...lazyParams, ...data }
        setLazyParams(advanceSearch);

    }
    const clearSearch = () => {
        reset(null);
        setLazyParams(pagingDefaults);
    }

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" onClick={() => loadLazyData()} />;
    const onPage = (event) => {
        setLazyParams(event);
    }
    const onSort = (event) => {
        console.log(event)
        setLazyParams(event);
    }
    console.log(isAuthenLmsLog)
    if (!isAuthenLmsLog) {
        return (<>
            <h1 className="text-center">
                Not Authorize
                <br />
            </h1>
            <h4 className="text-center">Bạn không có quyền truy cập </h4>
        </>)
    }
    return (<>
        <div className="d-flex flex-column">
            <h1 className="text-center">


                EPS LMS LOG SYSTEM

            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-row ml-4">
                    <div className="flex flex-column w-100 m-2">
                        <label htmlFor="courseId">Id khoá học</label>
                        <Controller
                            control={control}
                            name='courseId'
                            render={({ field }) => <InputText  {...field} value={field.value ?? ''} type='text' />}

                        />


                    </div>
                    <div className="flex flex-column w-100 m-2">
                        <label htmlFor="courseCode">Mã khoá học</label>
                        <Controller
                            control={control}
                            name='courseCode'
                            render={({ field }) => <InputText  {...field} value={field.value ?? ''} type='text' />}
                        />

                    </div>
                    <div className="flex flex-column w-100 m-2">
                        <label htmlFor="username">Domain</label>
                        <Controller
                            control={control}
                            name='domain'
                            render={({ field }) => <InputText  {...field} value={field.value ?? ''} type='text' />}
                        />

                    </div>
                </div>

                <div className="d-flex flex-row ml-4">
                    <div className="flex flex-column w-100 m-2">
                        <label htmlFor="username">Tên khoá học</label>
                        <Controller
                            control={control}
                            name='courseTitle'
                            render={({ field }) => <InputText  {...field} value={field.value ?? ''} type='text' />}
                        />

                    </div>
                    <div className="flex flex-column w-100 m-2">
                        <label htmlFor="username">Username</label>
                        <Controller
                            control={control}
                            name='userName'
                            render={({ field }) => <InputText  {...field} value={field.value ?? ''} type='text' />}
                        />

                    </div>
                    <div className="flex flex-column w-100 m-2">
                        <label htmlFor="username">Loại</label>
                        <Controller
                            control={control}
                            name='status'
                            render={({ field }) =>
                                <Dropdown value={field.value}
                                    onChange={(e) => field.onChange(e.value)} options={cities} optionValue="code" optionLabel="name"
                                    showClear placeholder="--Chọn--" className="w-100 md:w-14rem" />}
                        />



                    </div>
                </div>

                <div className="d-flex flex-row ml-4">
                    <div className="flex flex-column w-100 m-2">
                        <label htmlFor="username">Path</label>
                        <InputText id="username" aria-describedby="username-help" />

                    </div>
                    <div className="flex flex-column w-100 m-2">
                        <label htmlFor="username">Ngày tạo từ ngày</label>
                        <div className="d-flex flex-row">
                            <Controller
                                control={control}
                                name='fromDate'
                                render={({ field }) =>
                                    <Calendar
                                        showButtonBar={true}
                                        dateFormat="dd/mm/yy"
                                        style={{ width: '200px' }}
                                        id="input_date"
                                        value={field.value ? parseISO(field.value) : null}
                                        onChange={(e) => {

                                            let v = format(e.value, 'yyyy-MM-dd HH:mm')
                                            field.onChange(v);
                                        }}
                                        mask="99/99/9999 99:99"
                                        showIcon
                                        showTime

                                    />}
                            />

                            <span> - </span>
                            <Controller
                                control={control}
                                name='toDate'
                                render={({ field }) =>
                                    <Calendar
                                        showButtonBar={true}
                                        dateFormat="dd/mm/yy"
                                        style={{ width: '200px' }}
                                        id="input_date"
                                        value={field.value ? parseISO(field.value) : null}
                                        onChange={(e) => {

                                            let v = format(e.value, 'yyyy-MM-dd HH:mm')
                                            field.onChange(v);
                                        }}
                                        mask="99/99/9999 99:99"
                                        showIcon
                                        showTime

                                    />}
                            />
                        </div>


                    </div>
                    <div className="flex flex-column w-100 m-2">
                        <label htmlFor="username"></label>


                    </div>
                </div>

                <div className="d-flex flex-row ml-4 mb-4 justify-content-center">
                    <Button size="small" type="submit" className="ml-2" >Tìm kiếm</Button>
                    <Button size="small" type="button" link onClick={clearSearch} >Xoá </Button>

                </div>
            </form>
            <DataTable size="small" value={items} lazy responsiveLayout="stack" dataKey="id"
                paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                currentPageReportTemplate="{first} - {last} / {totalRecords}"
                rows={lazyParams.rows}
                rowsPerPageOptions={[10, 20, 50]}
                paginatorLeft={paginatorLeft} first={lazyParams.first} totalRecords={totalRecords} onPage={onPage}
                sortField={lazyParams.sortField} sortOrder={lazyParams.sortOrder}
                loading={loading}

            >
                <Column body={createdAtTemplate} header="Ngày tạo" style={{ width: '15%' }}></Column>
                <Column field="user_name" header="Tài khoản" style={{ width: '10%' }}></Column>
                <Column header="Body" body={activityBodyTemplate} style={{ width: '200px' }} ></Column>
                <Column field="domain" header="Domain" style={{ width: '10%' }}></Column>
                <Column field="path" header="path" style={{ width: '10%' }}></Column>
                <Column body={dataTemplate} header="Data" style={{ width: '10%' }}></Column>
                <Column field="status" header="Status" style={{ width: '10%' }}></Column>
                <Column field="note" header="Note" style={{ width: '10%' }}></Column>
                <Column header="Action" body={actionTemplate} style={{ width: '40%' }}></Column>
            </DataTable>
        </div>


        <Dialog position="top" header="Xem chi tiết" visible={visible} style={{ width: '80vw', top: '20px' }} onHide={() => setVisible(false)} footer={footerContent}>
            <TabView>
                <TabPanel header="Body">
                    <pre>{selectedRow ? JSON.stringify(JSON.parse(selectedRow?.body), null, 4) : ''}</pre>
                </TabPanel>
                <TabPanel header="Data">
                    <pre>{selectedRow ? JSON.stringify(JSON.parse(selectedRow?.data), null, 4) : ''}</pre>
                </TabPanel>

            </TabView>
        </Dialog>
    </>)
}
export default LmsLogLayout;
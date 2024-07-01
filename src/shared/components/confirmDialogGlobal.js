import { confirmDialog } from 'primereact/confirmdialog';
const confirmDialogGlobal = (props)=>{

    let defaultValue = {
        header:'Thông báo',
        message: 'Bạn có chắc chắn muốn thực hiện không?',
        icon: 'pi pi-info-circle',
        //acceptClassName: 'p-button-danger',
        acceptLabel:'Đồng ý',
        rejectLabel:'Huỷ'
    }
    let global = {...defaultValue, ...props}
    confirmDialog(global);
};
export { confirmDialogGlobal }
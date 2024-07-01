import { appSetting } from 'shared/app-settings';
const ErrorComponent = ()=>{
    return(<>
    <h2> Trang {appSetting.ADMIN_URL} không hoạt động!</h2>
    </>)
}
export default ErrorComponent;
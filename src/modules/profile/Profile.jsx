import { useEffect } from 'react'
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { userService } from 'modules/user/userService';
import { useSelector } from 'react-redux';
import { Calendar } from 'primereact/calendar';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import ChangePassword from './ChangePassword';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
const Profile = () => {
    let navigate = useNavigate();
    const defaultValues = {
        user_name: '',
        full_name: '',
        email: '',
        password: '',
        confirm_password:'',
        date_of_birth: null,
        list_role: []
        
    }
    const currentUser = useSelector(state => state.oauth.currentUser);

    const getFormErrorMessage= (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    const onSubmit = async (values) => {
        await userService.update(values);
    }
    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({ defaultValues });
    const  getUserById = async (userId)=>{
        let result = await userService.getById(userId);
        reset(result.data)
    }
    const logoutAllDevices = async ()=>{
        await userService.logoutAllDevices();
        navigate('/admin/logout');
      }
    const confirmLogout = (data) => {
        //console.log(confirmDialog);
        confirmDialogGlobal({
            message: 'Bạn có muốn đăng xuất khỏi tất cả các thiết bị?',
            accept: ()=>logoutAllDevices()
        });
    };
    useEffect(() => {
        getUserById(currentUser.user_id);
    }, []);
    return (<Card title='Thông tin tài khoản'>
        <TabView>
            <TabPanel header="Thông tin">
                <form className="p-fluid" onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <label htmlFor="user_name">Tên tài khoản</label>
                            <Controller name="user_name" control={control}  render={({ field, fieldState }) => (
                                <InputText disabled id={field.user_name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            {getFormErrorMessage('user_name')}
                        </div>

                        <div className="field">
                            <label htmlFor="full_name">Tên đầy đủ</label>
                            <Controller name="full_name" control={control} rules={{ required: 'Trường không được để trống!' }} render={({ field, fieldState }) => (
                                <InputText id={field.full_name} {...field} value={field.value ?? ''} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            {getFormErrorMessage('full_name')}
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <Controller name="email" control={control} rules={{ required: 'Trường không được để trống!',pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }} render={({ field, fieldState }) => (
                                <InputText id={field.full_name} {...field} value={field.value ?? ''} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field">
                            <label htmlFor="date_of_birth">Ngày sinh</label>
                            <Controller name="date_of_birth" control={control} render={({ field }) => (
                                <Calendar showOnFocus={false} showButtonBar={true} style={{ width: 120 }} id={field.name}  value={dayjs(field.value).$d ?? ''} onChange={(e) => {field.onChange(e.value);console.log(e.value)}} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                            )} />
                            
                        </div>
                        <Button type="submit" label="Save" className="mt-2" style={{ width: 100 }} />
                    </form>
            </TabPanel>
            <TabPanel header="Đổi mật khẩu">
               <ChangePassword/>
            </TabPanel>
            <TabPanel header="Bảo mật">
                <Button onClick={()=>confirmLogout()}>Đăng xuất khỏi tất cả các thiết bị</Button>
            </TabPanel>
            
        </TabView>
    </Card>)
}
export default Profile;
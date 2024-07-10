import { useEffect, useState, useRef } from 'react';
import { authRouters } from '../routers/authRouters';
import registerAxiosInterceptor from '../shared/interceptor';
import { Outlet, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { appSetting } from 'shared/app-settings';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
function getParameterByName(name, url = window.location.href) {
  //name = name;
  //url = window.location.href;
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function AuthLayout() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [tm, setTm] = useState(null);
  const toast = useRef(null);
  const storeNetwork = useSelector(state => state.network);

  useEffect(() => {
    //1. setup axios default interceptor
    registerAxiosInterceptor();
    //set time logout tren old lms
    setTm(Math.floor(Date.now() / 1000));

    //let aspSessionId = sessionStorage.getItem('aspSessionId');
    let aspSessionIdParam = atob(getParameterByName('aspSSId'));// fix lỗi switch role, logout từ phía admin
    if (aspSessionIdParam) {

      sessionStorage.setItem('corporateID', getParameterByName('corporateID'));
      sessionStorage.clear();
      sessionStorage.setItem('corporateID', getParameterByName('corporateID'));
      sessionStorage.setItem('selectedCultureID', getParameterByName('selectedCultureID')); //'vi-VN'); //
      sessionStorage.setItem('selectedUserRoleID', getParameterByName('selectedUserRoleID'));
      sessionStorage.setItem('aspSessionId', aspSessionIdParam);
      sessionStorage.setItem('LMS_URL', appSetting.ADMIN_URL + '/');

      if (sessionStorage.getItem('corporateID') + '' == '') {
        sessionStorage.setItem('corporateID', '1');
      }
      if (sessionStorage.getItem('selectedCultureID') + '' == '') {
        sessionStorage.setItem('selectedCultureID', 'vi-VN');
      }
      if (sessionStorage.getItem('selectedUserRoleID') + '' == '') {
        sessionStorage.setItem('selectedUserRoleID', '3'); //learner
      }
      navigate({ pathname: '/login' })
    }

  }, []);

  useEffect(() => {

    if (storeNetwork.count === 3) {
      toast.current.show({ severity: 'warn', summary: 'Mất kết nối, ', detail: 'Vui lòng kiểm tra kết nối ' + appSetting.ADMIN_URL, sticky: true });
    } else {
      toast.current.clear();
    }
  }, [storeNetwork.count]);
  return (
    <>
      {/* <iframe src={sessionStorage.getItem('LMS_URL') + '?tm=' + tm} style={{ display: 'none' }}></iframe> */}
      <Toast position='top-center' ref={toast} />
      <ConfirmDialog header="Thông báo" />
      <Routes>

        {authRouters.map(({ path, component: Component }, index) =>
          //console.log(route)
          <Route path={path} key={index} element={<Component />} />
        )}
        <Route path="*" element={<Navigate to="/overview" />} />
      </Routes>
      <Outlet />
    </>
  )

}
export default AuthLayout;

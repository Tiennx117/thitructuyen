import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { removeToken, setTokenLMS } from 'store/oauth/oauthSlice';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { oauthService } from 'services/oauthService';
import { appSetting } from 'shared/app-settings';
import { ProgressSpinner } from 'primereact/progressspinner';
import he from 'he';

const LoginLMS = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const oauth = useSelector(state => state.oauth);
  useEffect(() => {

    if (sessionStorage.getItem('aspSessionId') != null && sessionStorage.getItem('aspSessionId') + '' != '') {

      oauthService.loginLMS({ username: '', password: '' }).then((auth) => {
        console.log('login lms', auth);

        let token = auth.data;
        //datnh fix lỗi tiếng việt thông tin người dùng
        if (token.UserFirstName) {
          token.UserFirstName = he.decode(token.UserFirstName)
        }
        if (token.UserLastName) {
          token.UserLastName = he.decode(token.UserLastName)
        }
        if (token.UserMiddleName) {
          token.UserMiddleName = he.decode(token.UserMiddleName)
        }

        if (!sessionStorage.getItem('corporateID')) {
          sessionStorage.clear();
          sessionStorage.setItem('corporateID', token.CorporateId);
          sessionStorage.setItem('selectedCultureID', token.Culture); //'vi-VN'); //
          sessionStorage.setItem('selectedUserRoleID', token.SelectedUserRoleId);
        }
        // datnh test
        dispatch(setTokenLMS(token));
        // navigate({ pathname: '/overview' });
        // localStorage.setItem('pathUrlActive', '/overview');

        navigate({ pathname: appSetting.DEFAULT_PAGE ? appSetting.DEFAULT_PAGE : "/learner/my-learning" });
        localStorage.setItem('pathUrlActive', appSetting.DEFAULT_PAGE ? appSetting.DEFAULT_PAGE : "/learner/my-learning");

        console.log('hear')
      }).catch(err => {
        console.log(err.response);

        //datnh fix lỗi check if err message
        if (err && err.response.data && err.response.data.Message == 'Session has been expired') {
          //remove tokenb 
          dispatch(removeToken());
          //HuyNV90
          //window.location.href = appSetting.ADMIN_URL + '/frmLogin.aspx';
          window.location.href = appSetting.ADMIN_URL;
        }
      });

    }
    else {
      console.log('not login');
      //HuyNV90
      //window.location.href = appSetting.ADMIN_URL + '/frmLogin.aspx';
      window.location.href = appSetting.ADMIN_URL;
    }
  }, []);
  return (
    <div className='text-center'>
      <ProgressSpinner />
    </div>

  )
}
export default LoginLMS;
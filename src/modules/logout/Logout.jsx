import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appSetting } from 'shared/app-settings';
//import * as oauthAction  from 'store/oauth/oauthAction'
import { removeToken } from 'store/oauth/oauthSlice';
import { setFilterMenu } from "store/menu/filterMenu";
function Logout() {
  const dispatch = useDispatch();
  const oauth = useSelector(state => state.oauth);
  
  useEffect(() => { 
    let LocalLogin = oauth.LocalLogin;
    sessionStorage.setItem('aspSessionId', '');
    dispatch(setFilterMenu({}));
    dispatch(removeToken());

    const timer = setTimeout(() => {
      // fix lỗi chung port logout không xoá token
      console.log('This will run after 1 second!', oauth.LocalLogin);
      
      window.location.href= appSetting.ADMIN_URL + '/DisplayLogout.aspx';
      //fix lỗi dùng chung local và sso 
    //  if(LocalLogin?.toString()==='true' || LocalLogin===undefined || LocalLogin===null){
    //    window.location.href= appSetting.ADMIN_URL + '/frmLogin.aspx?adfs_logout=';
    //  }else
    //  {
    //    window.location.href= appSetting.ADMIN_URL + appSetting.ADFSLogoutURL;
    //  } 
      
    }, 1000);

    return () => clearTimeout(timer);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <></>
  );
}
export default Logout;
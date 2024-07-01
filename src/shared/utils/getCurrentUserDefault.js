const getCurrentUserDefault = () => {
    try{
        let root = localStorage.getItem("persist:root");
        if(!root)
            return {};
        let oauthJSON = JSON.parse(root);
        let userAllInfo = JSON.parse(oauthJSON.oauth);
        // console.log('userAllInfo',userAllInfo)
        let roleLearner  =userAllInfo.UserRoles.find(x=>x.mstrRoleType==='L');// roler learner
        let UserRoleId = roleLearner?.mnUserRoleId || 3;
        let value = {
    
            "Culture": userAllInfo.Culture,
            "CorporateId": userAllInfo.CorporateId,
            "UserId": userAllInfo.UserId,
            "TimeZoneValue": userAllInfo.TimeZoneValue,
            "EmailId": userAllInfo.EmailId,
            "UserRoles": userAllInfo.UserRoles,
            "AccessibleCategories": userAllInfo.AccessibleCategories,
            "UserRoleId": UserRoleId,//userAllInfo.UserRoles ? (userAllInfo.UserRoles[0]?.mnUserRoleId || null) : null,// ==>mstrUserRoleName=Learner kiểm tra lại khi user login có nhiều role khác
            "WebAppFlag": userAllInfo.WebAppFlag || 'W'
        }
        value.UserRoleId = value.UserRoleId.toString();
        // bỏ phân quyền :check security
        value.UserRoles = [];
        
        return value;
    }
    catch(err)
    {
        console.log('Exception getCurrentUserDefault:', ex);
        return {}
    }
    
}

export { getCurrentUserDefault };
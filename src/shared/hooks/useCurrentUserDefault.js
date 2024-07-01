import { useSelector } from "react-redux";

function useCurrentUserDefault() {
    const userAllInfo = useSelector(state => state.oauth) || '';
    let value = {

        "Culture": userAllInfo.Culture,
        "CorporateId": userAllInfo.CorporateId,
        "UserId": userAllInfo.UserId,
        "TimeZoneValue": userAllInfo.TimeZoneValue,
        "EmailId": userAllInfo.EmailId,
        "UserRoles": userAllInfo.UserRoles,
        "AccessibleCategories": userAllInfo.AccessibleCategories,
        //"UserRoleId": userAllInfo.UserRoles[0]?.mnUserRoleId,// ==>mstrUserRoleName=Learner kiểm tra lại khi user login có nhiều role khác
        "WebAppFlag": userAllInfo.WebAppFlag
    }
    return value;
}

function formatTime(seconds) {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    if (hh) {
        return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
}
function pad(string) {
    return ('0' + string).slice(-2)
}

function formatDateTime (strValue) {
    if (!strValue) {
        return '';
    }
    else {
        var d = new Date(strValue);
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output = (day >= 10 ? '' : '0') + day + '/' +
            (('' + month).length < 2 ? '0' : '') + month + '/' +
            d.getFullYear();
        if (output === '01/01/1')
            return '';
        return output;
    }
}


export { useCurrentUserDefault, formatTime, formatDateTime };
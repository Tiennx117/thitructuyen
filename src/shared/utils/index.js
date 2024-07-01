import { loadable } from './loadable';
import DomHandler from './DomHandler';

export { loadable };
export { mapPaginator, mapAdvanceSearch } from './mapPaginator';
export { classNames } from './classNames';
export { DomHandler };
//export { initFacebookSdk } from './initFacebookSdk';
export { generateTree, createTree } from './generateTree';
export { swapItemArray } from './swapItemArray';
const decodeToken = (token)=> {
    let playload = JSON.parse(b64DecodeUnicode(token.split('.')[1]));
    let user = {
      full_name: playload.full_name || null,
      user_name: playload.user_name || null,
      user_id: playload.user_id || null
    }
    return user
}
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
export { decodeToken };

export { openWindow } from './openWindow';

export { removeUnicode } from './removeUnicode'

export { generateUUID  } from './generateUUID';

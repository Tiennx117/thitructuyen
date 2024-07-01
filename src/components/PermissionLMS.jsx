import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
const PermissionLMS = (props) => {
    const permissions = useSelector(state => state.oauth.UserRoles.map(x=>x.mnUserRoleId.toString())) ||[];
    const couldShow = permissions.includes(props.RoleId);
    return couldShow ? props.children : null;
};

PermissionLMS.propTypes = {
    RoleId: PropTypes.string.isRequired
};

export { PermissionLMS };
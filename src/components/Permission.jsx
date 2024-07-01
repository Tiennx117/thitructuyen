import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
const Permission = (props) => {
    const permissions = useSelector(state => state.oauth.permissions) ||[];
    const couldShow = permissions.includes(props.code);
    return couldShow ? props.children : null;
};

Permission.propTypes = {
    code: PropTypes.string.isRequired
};

export { Permission as default, Permission };
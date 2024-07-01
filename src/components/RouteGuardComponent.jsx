import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { appSetting } from 'shared/app-settings';


function RouteGuardComponent({ component: Component, ...rest }) {
    const oauthStore = useSelector((state) => state.oauth);
    const isAuthenticated=()=> {
        return !!oauthStore.access_token;
    } 
    const renderRoute = props => {
        if (isAuthenticated()) {
            return (
                <Component {...props} />
            );
        }
        // const to = {
        //     pathname: '/admin/login',
        //     state: { from: props.location }
        // };      
        const to = {
            pathname: appSetting.ADMIN_URL + '/frmLogin.aspx?from=learner'
        }      
        return (
            <Redirect to={to} />
        );
    };
    return (
        <Route {...rest} render={renderRoute} />
    );
  }
export { RouteGuardComponent };

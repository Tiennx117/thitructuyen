import React from 'react';
import { Route } from 'react-router-dom';
function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            element={(props)=><route.component {...props} routes={route.routes} />}
        />
        
    );
}
export { RouteWithSubRoutes} ;
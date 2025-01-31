import React from 'react'
import { Routes, Route,  Navigate  } from 'react-router-dom'

const PrivateRouter = ({ component: Component, ...rest }) => (
 <Routes> <Route  
        {...rest}
        render={props =>
            localStorage.getItem("token") ? (
                <Component {...props} />
            ) : (
                    < Navigate  to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                    />
                )}
    /></Routes>
);

export default PrivateRouter

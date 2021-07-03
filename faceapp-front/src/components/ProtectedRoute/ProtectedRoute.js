import { Redirect, Route, withRouter } from "react-router";


const ProtectedRoute = ({loginCheck, component: Component, component2: Component2, component3: Component3, component4: Component4, ...rest}) => {
   
    return (
        <Route
        {...rest}
        render={props => {
            if(loginCheck) {
                if(props.match.path === "/"){
                    return  (
                        <div>
                            <Component {...props} {...rest}/>
                            <Component2 {...props} {...rest}/>
                            <Component3 {...props} {...rest}/>
                            <Component4 {...props} {...rest}/>
                        </div>
                    )
                        }
                if (props.match.path === "/profile") {
                    return <Component {...props} {...rest}/>
                }

                if (props.match.path === "/history") {
                    return <Component {...props} {...rest}/>
                }
                
            } else {
                return (
                    <Redirect
                    to={{
                        pathname: "/signin",
                        state: {
                            from: props.location
                        }
                    }}
                    ></Redirect>
                )
            }
        }}
        ></Route>
    )
}

export default withRouter(ProtectedRoute);
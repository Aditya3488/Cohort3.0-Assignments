import {RouterProvider,createBrowserRouter} from 'react-router'
import Login from '../../features/auth/ui/pages/Login'
import AuthLayout from '../layouts/AuthLayout.jsx'
import Register from '../../features/auth/ui/pages/Register'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import Home from '../../features/dashboard/ui/pages/Home'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { currentLoggedEmployee } from '../../features/auth/state/auth/authAction.jsx'
import ProtectedRoute from '../protectedRoutes/ProtectedRoute.jsx'
import PublicRoute from '../protectedRoutes/PublicRoute.jsx'

const AppRoutes = () => {

    let dispatch = useDispatch();
    useEffect(()=>{
        (()=>{
            dispatch(currentLoggedEmployee())
        })()
    },[])

    let router = createBrowserRouter([
        {
            path: "/",
            element : <PublicRoute />,
            children:[
                {
                    path: "/",
                    element: <AuthLayout/>,
                    children: [
                        {
                            path: "",
                            element: <Login/>
                        },
                        {
                            path: "register",
                            element: <Register/>
                        }
                    ]
                }
            ]
        },

        {
            path: "/home",
            element: <ProtectedRoute/>,
            children:[
                {
                    path: "",
                    element: <DashboardLayout/>,
                    children: [
                        {
                            path: "",
                            element: <Home/>    
                        }
                    ]
                }
            ]
        }
    ])


  return <RouterProvider router={router} />
}

export default AppRoutes

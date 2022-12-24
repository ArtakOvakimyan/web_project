import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Person from './pages/Person'
import Main from './pages/Main'
import Grades from "./pages/Grades"
import {
    ADMIN_ROUTE,
    GRADES_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    PERSON_ROUTE,
    REGISTER_ROUTE
} from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: PERSON_ROUTE + ':id',
        Component: Person
    },
    {
        path: REGISTER_ROUTE,
        Component: Auth
    },
    {
        path: GRADES_ROUTE,
        Component: Grades
    }
]
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    }
]
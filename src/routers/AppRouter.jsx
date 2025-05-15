import { Routes, Route, useLocation } from 'react-router'
import PrivateRoute from './PrivateRoute'
import ProfileRoute from './ProfileRoute'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Validar from '../pages/Validar'
import OlvidoPassword from '../pages/OlvidoPassword'
import ResetPassword from '../pages/ResetPassword'
import Profiles from '../pages/Profiles'
import MoviesList from '../pages/MoviesList'
import MovieDetail from '../pages/MovieDetail'
import ChangePassword from '../pages/ChangePassword'
import MyList from '../pages/MyList'
import AddMovie from '../pages/addMovie'
import EditMovie from '../pages/editMovie'
import AdminUsers from '../pages/AdminUsers'
import EditorRoute from './EditorRoute'
import AdminRoute from './AdminRoute'


const AppRouter = () => {

    return (
        <>
            <Routes>
                {/* ////// rutas publicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={< Register />} />
                <Route path="/validar/:token" element={< Validar />} />
                <Route path="/olvidopassword" element={< OlvidoPassword />} />
                <Route path="/resetpassword/:token" element={< ResetPassword />} />
                <Route path="/cambiarpassword/" element={< ChangePassword />} />

                {/* rutas privadas */}
                <Route path="/movies/:id" element={
                    <PrivateRoute>
                        < MovieDetail />
                    </PrivateRoute>} />

                <Route path="/movies/page/:page" element={
                    <PrivateRoute>
                        < MoviesList />
                    </PrivateRoute>} />

                <Route path="/profiles/" element={
                    <PrivateRoute>
                        < Profiles />
                    </PrivateRoute>} />

                {/* rutas privadas y necesitan un perfil seleccionado */}
                <Route path="/movies/" element={
                    <PrivateRoute>
                        <ProfileRoute>
                            < MoviesList />
                        </ProfileRoute>
                    </PrivateRoute>} />

                <Route path="/movies/milista" element={
                    <PrivateRoute>
                        <ProfileRoute>
                            < MyList />
                        </ProfileRoute>
                    </PrivateRoute>} />

                {/* ruta por rol del usuario */}
                {/* rutas de administrador */}
                <Route path="/movies/agregar" element={
                    <PrivateRoute>
                        <AdminRoute>
                            < AddMovie />
                        </AdminRoute>
                    </PrivateRoute>} />

                    <Route path="/users" element={
                    <PrivateRoute>
                        <AdminRoute>
                            < AdminUsers />
                        </AdminRoute>
                    </PrivateRoute>} />

                {/* rutas de editor */}
                <Route path="/movies/editar/:id" element={
                    <PrivateRoute>
                        < EditorRoute>
                            < EditMovie />
                        </EditorRoute>
                    </PrivateRoute>} />

                {/* default route */}
                <Route path="*" element={<Home />} />
            </Routes>


        </>
    )
}
export default AppRouter
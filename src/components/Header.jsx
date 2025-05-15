import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';

import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { animaciones } from '../utils/animations';
import {
  Button,
  MegaMenu,
  MegaMenuDropdown,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Avatar
} from "flowbite-react";

import SidebarProfile from './sidebarProfile';
import ThemeToggle from './ThemeToggle';



const Header = () => {
  const [openLogin, setOpenLogin] = useState(true);
  const { user, logoutUser } = useAuth()
  const { currentProfile } = useProfile()
  const navigate = useNavigate()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = () => {
    navigate('/home')
    logoutUser()
  }

  return (
    <>
      <MegaMenu className="bg-violet-900 text-gray-100">
        <NavbarBrand href="/">

          {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ">NextFliks</span> */}
          <img alt="" src="/GONFLIX-LOGO.png" className="h-10 px-22" />
        </NavbarBrand>
        <div className="order-2 hidden items-center md:flex  pr-27">
          {   ///si esta logueado muestra el boton logout
            user ?
              // solo muestra logout en este lugar si no selecciono un perfil
              !currentProfile && <Button color='dark' onClick={logout} >Logout</Button>

              :
              <>
                <Link to="/login" >
                  <Button color='alternative' className=" py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 md:mr-2 md:px-5 md:py-2.5 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800">Login</Button>
                </Link>

                <Link to="/registro">
                  <Button color='dark' >Sign up</Button>
                </Link>

              </>
          }


        </div>

        <NavbarToggle />
        <NavbarCollapse className='z-5 text-white '>
          <Link to="/" className='text-gray-200 hover:text-gray-700 dark:text-gray-100 hover:dark:text-gray-300 '>Home</Link>
          <Link to="/movies" className="text-gray-200 hover:text-gray-700 dark:text-gray-100 hover:dark:text-gray-300">
            Peliculas
          </Link>
          <Link to="/movies/milista" className="text-gray-200 hover:text-gray-700 dark:text-gray-100 hover:dark:text-gray-300">
            Mi Lista
          </Link>
          <Link to='/profiles ' className='text-gray-200 hover:text-gray-700 dark:text-gray-100 hover:dark:text-gray-300' href="#">Perfiles</Link>

          {user?.role.name === 'admin' &&
            <NavbarLink >
              <MegaMenuDropdown toggle={<div className='text-gray-200 hover:text-gray-700 dark:text-gray-100 hover:dark:text-gray-300'>Administrar</div>} >
                <ul className="grid grid-cols-3 text-white ">
                  <div className="space-y-4 p-4 text-white ">
                    <li>
                      <Link to="/users" className='text-gray-900 hover:text-gray-700 dark:text-gray-100 hover:dark:text-gray-300 '>Administrar cuentas</Link>
                    </li>
                    <li>
                      <Link to="/movies/agregar" className='text-gray-900 hover:text-gray-700 dark:text-gray-100 hover:dark:text-gray-300'>Cargar películas</Link>
                    </li>
                    <li>
                      <Link to="/movies/editar" className='text-gray-900 hover:text-gray-700 dark:text-gray-100 hover:dark:text-gray-300'>Editar películas </Link>
                    </li>

                  </div>

                </ul>
              </MegaMenuDropdown>
            </NavbarLink>
          }
          <div className='flex items-center justify-center px-5  absolute items-center gap-4 top-12 md:top-2 right-15 w-auto '>
            <ThemeToggle />
          </div>
        </NavbarCollapse>
      </MegaMenu>
      <div className="absolute items-center gap-4 top-12 md:top-2 right-3 w-auto dark:bg-gray-800">

        {currentProfile && <Avatar img={`/avatars/${currentProfile?.avatar}`} alt={`avatar de ${currentProfile?.name}`} rounded onClick={toggleSidebar} className='cursor-pointer p-0 m-0 ' />}

        <div className='flex flex-col absolute   w-65 top-15 right-0   '>
          <AnimatePresence initial={false}>
            {isSidebarOpen &&
              <motion.div
                variants={animaciones()}
                initial='initial_menu'
                animate='animate_menu'
                exit='exit_menu'
                transition={{ duration: 0.5 }}
                className='relative    dark:bg-gray-800 w-110   z-50   overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-600'
              >
                <SidebarProfile onClose={toggleSidebar} />

              </motion.div>}
          </AnimatePresence>
        </div>

      </div>
    </>
  );
}

export default Header;
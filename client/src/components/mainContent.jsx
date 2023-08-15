import { Route, Routes, useLocation } from 'react-router-dom';
import RoleRouter from '../routers/role.router';
import RoleAdminRouter from '../routers/roleAdmin.router';
import Page404 from './404';
import Billing from './billing';
import Consumer from './consumer';
import ManageStaff from './manageStaff';
import OrderManagerment from './orderManagerment';
import Permission from './permission';
import Product from './product';
import Provider from './provider';
import Staff from './staff';
import StaffManager from './staffManager';
import User from './user';

import { AnimatePresence } from 'framer-motion';

import { Navigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';

const MainContent = () => {
    const location = useLocation();

    const getRoleAdmin = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return <Navigate to="/login" />;
        } else {
            const token = localStorage.getItem('token');

            let decodeToken = jwt_decode(token);

            return decodeToken.role === 'admin';
        }
    };

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route
                    exact
                    path="/"
                    element={
                        <>
                            <RoleRouter>
                                <Billing />
                            </RoleRouter>
                        </>
                    }
                />
                <Route
                    exact
                    path="/ordermanager"
                    element={
                        <>
                            <RoleRouter>
                                <OrderManagerment />
                            </RoleRouter>
                        </>
                    }
                />
                {getRoleAdmin() ? (
                    <>
                        <Route
                            exact
                            path="/consumer"
                            element={
                                <>
                                    <RoleAdminRouter>
                                        <Consumer />
                                    </RoleAdminRouter>
                                </>
                            }
                        />
                        <Route
                            exact
                            path="/product"
                            element={
                                <RoleAdminRouter>
                                    <Product />
                                </RoleAdminRouter>
                            }
                        />
                        <Route
                            exact
                            path="/provider"
                            element={
                                <RoleAdminRouter>
                                    <Provider />
                                </RoleAdminRouter>
                            }
                        />
                        <Route
                            exact
                            path="/staff"
                            element={
                                <RoleAdminRouter>
                                    <Staff />
                                </RoleAdminRouter>
                            }
                        />
                        <Route
                            exact
                            path="/staffManager"
                            element={
                                <RoleAdminRouter>
                                    <StaffManager />
                                </RoleAdminRouter>
                            }
                        />
                        <Route
                            exact
                            path="/user"
                            element={
                                <RoleAdminRouter>
                                    <User />
                                </RoleAdminRouter>
                            }
                        />
                        <Route
                            exact
                            path="/permission"
                            element={<Permission />}
                        />
                        <Route
                            exact
                            path="/permissionStaffManager"
                            element={<ManageStaff />}
                        />
                    </>
                ) : null}

                <Route path="*" element={<Page404 />} />
            </Routes>
        </AnimatePresence>
    );
};

export default MainContent;

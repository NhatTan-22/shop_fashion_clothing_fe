import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout, AuthLayout, UserLayout } from './layouts';
import { privateAdminRoutes, publicAuthRoutes, publicUserRoutes, userRoute } from './utils/constants/route';
import { NotFoundPage } from './components';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to={userRoute.home} replace />} />

                <Route element={<AuthLayout />}>
                    {publicAuthRoutes.map((route, index) => {
                        const Page = route.component || '';
                        return (
                            <Route key={index} path={route.path} element={<Page />}>
                                {route.children &&
                                    route.children.length > 0 &&
                                    route.children.map((childRoute, index) => {
                                        const ChildComponent = childRoute.component;
                                        return (
                                            <Route
                                                key={index}
                                                path={childRoute.path}
                                                index={childRoute.index ?? false}
                                                element={<ChildComponent />}
                                            />
                                        );
                                    })}
                            </Route>
                        );
                    })}
                </Route>

                <Route element={<UserLayout />}>
                    {publicUserRoutes.map((route, index) => {
                        const Page = route.component || '';
                        return (
                            <Route key={index} path={route.path} element={<Page />}>
                                {route.children &&
                                    route.children.length > 0 &&
                                    route.children.map((childRoute, index) => {
                                        const ChildComponent = childRoute.component;
                                        return (
                                            <Route
                                                key={index}
                                                path={childRoute.path}
                                                index={childRoute.index ?? false}
                                                element={<ChildComponent />}
                                            />
                                        );
                                    })}
                            </Route>
                        );
                    })}
                </Route>

                <Route path={userRoute.base} element={<AdminLayout />}>
                    {privateAdminRoutes.map((route, index) => {
                        const Page = route.component || '';
                        return (
                            <Route key={index} path={route.path} element={<Page />}>
                                {route.children &&
                                    route.children.length > 0 &&
                                    route.children.map((childRoute, index) => {
                                        const ChildComponent = childRoute.component;
                                        return (
                                            <Route
                                                key={index}
                                                path={childRoute.path}
                                                index={childRoute.index ?? false}
                                                element={<ChildComponent />}
                                            />
                                        );
                                    })}
                            </Route>
                        );
                    })}
                </Route>

                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './layouts';
import { privateAdminRoutes, publicRoutes, userRoute } from './utils/constants/route';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to={userRoute.home} replace />} />

                <Route element={<AuthLayout />}>
                    {publicRoutes.map((route, index) => {
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

                <Route path={userRoute.base} element={<AuthLayout />}>
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
            </Routes>
        </BrowserRouter>
    );
};

export default App;

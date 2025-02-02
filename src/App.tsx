import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout, AuthLayout, UserLayout } from './layouts';
import {
    privateAdminRoutes,
    privateUserRoutes,
    publicAuthRoutes,
    publicUserRoutes,
    userRoute,
} from './utils/constants/route';
import { NotFoundPage, ProtectedRoute } from './components';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to={userRoute.home} replace />} />

                <Route element={<AuthLayout />}>
                    {publicAuthRoutes.map((route, index) => {
                        const Page = route.component || <NotFoundPage />;
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
                        const Page = route.component || <NotFoundPage />;

                        const children = route.children ?? [];

                        return (
                            <Route key={index} path={route.path} element={<Page />}>
                                {children.length > 0 &&
                                    children.map((childRoute, index) => {
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

                <Route
                    path={userRoute.base}
                    element={
                        <ProtectedRoute>
                            <UserLayout />
                        </ProtectedRoute>
                    }
                >
                    {privateUserRoutes.map((route, index) => {
                        const Page = route.component || <NotFoundPage />;
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

                <Route
                    path={userRoute.base}
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    {privateAdminRoutes.map((route, index) => {
                        const Page = route.component || <NotFoundPage />;
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

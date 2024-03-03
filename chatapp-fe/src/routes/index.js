import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

// config
import { DEFAULT_PATH } from "../config";
import {LoadingScreen} from "../components/LoadingScreen";
import MainLayout from "../layouts/main";
import ProtectedAuthRouter from "./ProtectedAuthRouter";

/**
 * Dùng trả về một component sử dụng lazy load
 * Nếu component chưa kịp tải nó sẽ hiển thị LoadingScreen
 * @param {*} Component
 * @returns Function component
 */
const Loadable = (Component) => {
  return (props) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };
};
// const Loadable = (Component) => (props) => {
//   return (
//     <Suspense fallback={<LoadingScreen />}>
//       <Component {...props} />
//     </Suspense>
//   );
// };

/**
 * Định tuyến đến component trang web
 * @returns {Route}
 */
export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
        { path: "new-password", element: <NewPasswordPage /> },
        { path: "verify", element: <VerifyPage /> },
      ],
    },
    {
      path: "/",
      element: (
        <ProtectedAuthRouter>
          <DashboardLayout />
        </ProtectedAuthRouter>
      ),
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "setting", element: <Settings /> },
        { path: "group", element: <GroupPage /> },
        { path: "call", element: <CallPage /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

/**
 * Lazy load GeneralApp component
 */
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);

/**
 * Lazy load Loginpage component
 */
const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));

/**
 * Lazy load RegisterPage component
 */
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
/**
 * Lazy load Settings component
 */
const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));

/**
 * Lazy load Settings component
 */
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);
/**
 * Lazy load page404 component
 */

const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword"))
);

/**
 * Lazy load GroupPage component
 */

const GroupPage = Loadable(lazy(() => import("../pages/dashboard/Group")));
/**
 * Lazy load page404 component
 */
const Page404 = Loadable(lazy(() => import("../pages/Page404")));

/**
 * Lazy load Call component
 */
const CallPage = Loadable(lazy(() => import("../pages/dashboard/Call")));

/**
 * Lazy load verify component
 */
const VerifyPage = Loadable(lazy(() => import("../pages/auth/Verify")));

import { createBrowserRouter, RouterProvider} from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                )
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
])

export default function AppRouter() {
    return <RouterProvider router={router} />
}
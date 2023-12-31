import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PasteMAQ from './components/PasteMAQ';
import ValidatePin from './components/ValidatePin';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
            <h2>PasteMAQ</h2>
                <Outlet />
            </header>
        </div>
    );
}

const appRouter = createBrowserRouter([
    {
        path: "/", // show path for routing
        element: <App />, // show component for particular path
        children: [
            // show children component for routing
            {
                path: "/",
                element: <PasteMAQ />,
            },
            {
                path: "/view-paste/:pasteId",
                element: <ValidatePin />,
            }
        ],
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

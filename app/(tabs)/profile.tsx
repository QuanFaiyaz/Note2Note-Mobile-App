import React, { FC } from "../lib/react-shim";
import ProfileDashboard from "./components/ProfileDashboard";
import "./styles.css";

export const App: FC = () => {
    return (
        <div className="app-root">
            <ProfileDashboard />
        </div>
    );
};

export default App;



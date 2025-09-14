import React, { FC } from "../lib/react-shim";

type LogoutButtonProps = {
	onLogout?: () => void;
};

export const LogoutButton: FC<LogoutButtonProps> = ({ onLogout }) => {
	return (
		<div className="logout-container">
			<button className="logout-button" onClick={onLogout}>Logout</button>
		</div>
	);
};

export default LogoutButton;



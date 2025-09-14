import React, { FC } from "../lib/react-shim";

type MenuItem = {
	id: string;
	icon?: any;
	label: string;
	onClick?: () => void;
};

type ProfileMenuProps = {
	items: MenuItem[];
};

export const ProfileMenu: FC<ProfileMenuProps> = ({ items }) => {
	return (
		<nav className="profile-menu">
			<ul>
				{items.map((item) => (
					<li key={item.id}>
						<button className="menu-item" onClick={item.onClick}>
							<span className="menu-icon" aria-hidden>
								{item.icon || "○"}
							</span>
							<span className="menu-label">{item.label}</span>
							<span className="menu-arrow" aria-hidden>
								→
							</span>
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default ProfileMenu;



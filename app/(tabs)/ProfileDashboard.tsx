import React, { FC } from "../lib/react-shim";
import LogoutButton from "./LogoutButton";
import ProfileHeader from "./ProfileHeader";
import ProfileMenu from "./ProfileMenu";

export const ProfileDashboard: FC = () => {
	return (
		<div className="profile-dashboard">
			<ProfileHeader
				fullName="Nabiuk zuroc"
				email="ngihep@students.nu-dasma.edu.ph"
				points={20}
			/>
			<section className="profile-content">
				<ProfileMenu
					items={[
						{ id: "personal-data", label: "Personal Data" },
						{ id: "edit-profile", label: "Edit Profile Details" },
						{ id: "dashboard", label: "My Dashboard" },
					]}
				/>
				<LogoutButton />
			</section>
			<footer className="tabbar">
				<button className="tab active">HOME</button>
				<button className="tab">Discussion</button>
				<button className="tab">Notes</button>
				<button className="tab">Files</button>
			</footer>
		</div>
	);
};

export default ProfileDashboard;



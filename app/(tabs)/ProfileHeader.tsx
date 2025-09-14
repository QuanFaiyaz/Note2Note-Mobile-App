import React, { FC } from "../lib/react-shim";

type ProfileHeaderProps = {
	fullName: string;
	email: string;
	points?: number;
	onAvatarChange?: (file: File | null, dataUrl: string | null) => void;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({ fullName, email, points = 0 }) => {
	return (
		<header className="profile-header">
			<div className="profile-header__top">
				<button className="back-button" aria-label="Back">
					<span className="back-icon">←</span>
					<span className="back-text">Back</span>
				</button>
			</div>
			<div className="profile-header__content">
				<div className="profile-avatar">
					<img src="/assets/profile.jpg" alt="User avatar" className="avatar-image" />
				</div>
				<div className="profile-identifiers">
					<div className="profile-name">{fullName}</div>
					<div className="profile-email">{email}</div>
					<div className="profile-points">
						<span className="points-badge">{points} pts ★</span>
					</div>
				</div>
			</div>
			<div className="profile-title">My Profile</div>
		</header>
	);
};

export default ProfileHeader;



import { useNavigate } from "react-router-dom";
import React from "../lib/react-shim";

export default function ProfilePage() {
	const navigate = useNavigate();

	return (
		<div style={{ minHeight: "100vh", background: "#f6f7fb" }}>
			<header style={{ background: "#1f3b63", color: "#fff", padding: 16 }}>
				<h2 style={{ margin: 0 }}>My Profile</h2>
			</header>

			<main style={{ maxWidth: 720, margin: "16px auto", padding: 16 }}>
				<section style={{ background: "#fff", border: "1px solid #e6e9f2", borderRadius: 12, padding: 16 }}>
					<h3 style={{ marginTop: 0, marginBottom: 8 }}>Profile Info</h3>
					<div style={{ display: "grid", gap: 6 }}>
						<div><strong>Name:</strong> Nabiuk zuroc</div>
						<div><strong>Email:</strong> nghihep@students.nu-dasma.edu.ph</div>
					</div>

					<div style={{ height: 16 }} />

					<button
						onClick={() => navigate("/personal-data")}
						style={{
							background: "#1f3b63",
							color: "#fff",
							border: "none",
							borderRadius: 8,
							padding: "12px 16px",
							cursor: "pointer",
							fontWeight: 700,
						}}
					>
						Personal Data
					</button>
				</section>
			</main>
		</div>
	);
}



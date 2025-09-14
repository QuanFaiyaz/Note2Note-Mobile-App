import { useNavigate } from "react-router-dom";
import React from "../lib/react-shim";

export default function PersonalDataPage() {
	const navigate = useNavigate();

	return (
		<div style={{ minHeight: "100vh", background: "#f6f7fb" }}>
			<header style={{ background: "#1f3b63", color: "#fff", padding: 16 }}>
				<button
					onClick={() => navigate(-1)}
					aria-label="Back to Profile"
					style={{
						background: "transparent",
						color: "#cfe0ff",
						border: "none",
						padding: "6px 10px",
						borderRadius: 6,
						cursor: "pointer",
						marginRight: 8,
					}}
				>
					← Back to Profile
				</button>
				<h2 style={{ display: "inline-block", margin: 0, marginLeft: 8 }}>Personal Data</h2>
			</header>

			<main style={{ maxWidth: 720, margin: "16px auto", padding: 16 }}>
				<section style={{ background: "#fff", border: "1px solid #e6e9f2", borderRadius: 12, padding: 16 }}>
					<div style={{ marginBottom: 16 }}>
						<label style={{ display: "block", color: "#2c3442", marginBottom: 6 }}>Full Name</label>
						<div style={{ background: "#f0f2f7", padding: "10px 12px", borderRadius: 8 }}>Nabiuk zuroc</div>
					</div>

					<div style={{ marginBottom: 16 }}>
						<label style={{ display: "block", color: "#2c3442", marginBottom: 6 }}>Email</label>
						<div style={{ background: "#f0f2f7", padding: "10px 12px", borderRadius: 8 }}>ngihep@students.nu-dasma.edu.ph</div>
					</div>

					<div style={{ marginBottom: 16 }}>
						<label style={{ display: "block", color: "#2c3442", marginBottom: 6 }}>Date of Birth</label>
						<div style={{ background: "#f0f2f7", padding: "10px 12px", borderRadius: 8 }}>23 August 2000</div>
					</div>

					<div>
						<label style={{ display: "block", color: "#2c3442", marginBottom: 6 }}>Gender</label>
						<div style={{ background: "#f0f2f7", padding: "10px 12px", borderRadius: 8 }}>Male</div>
					</div>
				</section>
			</main>
		</div>
	);
}



import React, { FC, useRef, useState } from "../lib/react-shim";

type AvatarPickerProps = {
	initialSrc?: string;
	name?: string;
	className?: string;
	onChange?: (file: File | null, dataUrl: string | null) => void;
};

export const AvatarPicker: FC<AvatarPickerProps> = ({
	initialSrc,
	name = "avatar",
	className,
	onChange,
}) => {
	const [previewSrc, setPreviewSrc] = useState<string | undefined>(initialSrc);
	const inputRef = useRef<HTMLInputElement | null>(null);

	function handleFileChange(event: any) {
		const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
		if (!file) {
			setPreviewSrc(undefined);
			onChange && onChange(null, null);
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			const result = typeof reader.result === "string" ? reader.result : null;
			setPreviewSrc(result || undefined);
			onChange && onChange(file, result);
		};
		reader.readAsDataURL(file);
	}

	function openPicker() {
		if (inputRef.current) {
			inputRef.current.click();
		}
	}

	return (
		<div className={"avatar-picker " + (className || "")}>
			<button type="button" className="avatar-button" onClick={openPicker} aria-label="Change avatar">
				<img
					src={previewSrc || "/images/avatar-placeholder.svg"}
					alt="User avatar"
					className="avatar-image"
				/>
			</button>
			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				name={name}
				className="avatar-input"
				onChange={handleFileChange}
				style={{ display: "none" }}
			/>
		</div>
	);
};

export default AvatarPicker;



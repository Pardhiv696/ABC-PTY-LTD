import {
	Box,
	Button,
	Container,
	Dialog,
	InputBase,
	Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const verify = () => {
	const [url, setUrl] = useState("");
	const [open, setOpen] = useState(false);
	const [open1, setOpen1] = useState(false);

	const onSubmit = async () => {
		if (!url) return toast.error("Please enter the NFT URI");
		await axios
			.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/verify-authenticity`, {
				params: {
					url,
				},
			})
			.then(() => {
				setOpen(true);
				setUrl("");
			})
			.catch(() => setOpen1(true));
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleClose1 = () => {
		setOpen1(false);
	};

	return (
		<Container maxWidth="sm">
			<Dialog
				fullWidth={true}
				maxWidth={"sm"}
				open={open}
				onClose={handleClose}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						p: 2,
						gap: 2,
					}}
				>
					<img
						src={"assets/green.png"}
						alt="logo"
						style={{
							width: "100%",
							maxWidth: "200px",
						}}
					/>
					<Typography
						sx={{
							textAlign: "center",
							fontSize: "28px",
							fontWeight: "600",
						}}
					>
						The contents of this blog are authentic and verified by ABC PTY LTD
					</Typography>
				</Box>
			</Dialog>
			<Dialog
				fullWidth={true}
				maxWidth={"sm"}
				open={open1}
				onClose={handleClose1}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						p: 2,
						gap: 2,
					}}
				>
					<img
						src={"assets/red.png"}
						alt="logo"
						style={{
							width: "100%",
							maxWidth: "200px",
						}}
					/>
					<Typography
						sx={{
							textAlign: "center",
							fontSize: "28px",
							fontWeight: "600",
						}}
					>
						The contents of this blog are fake and does not belong to ABC PTY
						LTD
					</Typography>
				</Box>
			</Dialog>
			<Box
				sx={{
					my: 5,
				}}
			>
				<Typography
					sx={{
						fontSize: "38px",
						fontWeight: "bold",
						cursor: "pointer",
						textDecoration: "none",
						color: "black",
						textAlign: "center",
					}}
				>
					Verify Authenticity
				</Typography>
				<InputBase
					placeholder="Enter NFT URI"
					onChange={(e) => setUrl(e.target.value)}
					value={url}
					sx={{
						px: 2,
						py: 1,
						my: 2,
						width: "100%",
						fontSize: "18px",
						border: "1px solid #000",
						borderRadius: "5px",
					}}
				/>
				<Button
					variant="contained"
					sx={{ width: "100%", py: 1, mt: 2 }}
					onClick={() => onSubmit()}
				>
					Verify
				</Button>
			</Box>
		</Container>
	);
};

export default verify;

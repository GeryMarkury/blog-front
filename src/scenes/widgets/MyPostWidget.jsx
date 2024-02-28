import {
	AttachFileOutlined,
	GifBoxOutlined,
	ImageOutlined,
	MicOutlined,
	MoreHorizOutlined,
} from "@mui/icons-material";
import { Divider, Typography, InputBase, useTheme, Button, useMediaQuery } from "@mui/material";
import FlexBetween from "../../components/FlexBetween.jsx";
import UserImage from "../../components/UserImage.jsx";
import WidgetWrapper from "../../components/WidgetWrapper.jsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index.js";
import { Loader } from "../../components/Loader.jsx";

const MyPostWidget = ({ picturePath }) => {
	const dispatch = useDispatch();
	const [post, setPost] = useState("");
	const [header, setHeader] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { palette } = useTheme();
	const token = useSelector(state => state.token);
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

	const mediumMain = palette.neutral.mediumMain;

	const handlePost = async () => {
		setIsLoading(true);
		const postData = {
			header: header,
			content: post,
		};

		const response = await fetch(`https://blog-back-743n.onrender.com/posts`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
			body: JSON.stringify(postData),
		});
		const posts = await response.json();

		dispatch(setPosts({ posts }));
		setPost("");
		setHeader("");
		setIsLoading(false);
	};

	return (
		<>
			{isLoading && <Loader />}
			<WidgetWrapper>
				<FlexBetween
					gap="1.5rem"
					flexDirection="column"
					alignItems="center"
				>
					<UserImage image={picturePath} />
					<InputBase
						placeholder="Write a title"
						onChange={e => setHeader(e.target.value)}
						value={header}
						sx={{
							width: "50%",
							backgroundColor: palette.neutral.light,
							borderRadius: "2rem",
							padding: "1rem 2rem",
						}}
					/>
					<InputBase
						placeholder="What's on your mind?"
						onChange={e => setPost(e.target.value)}
						value={post}
						sx={{
							width: "50%",
							backgroundColor: palette.neutral.light,
							borderRadius: "2rem",
							padding: "1rem 2rem",
						}}
					/>
				</FlexBetween>
				<Divider sx={{ margin: "1.25rem 0" }} />
				<FlexBetween>
					<FlexBetween gap="0.25rem">
						<ImageOutlined sx={{ color: mediumMain }} />
						<Typography color={mediumMain}>Image</Typography>
					</FlexBetween>
					{isNonMobileScreens ? (
						<>
							<FlexBetween gap="0.25rem">
								<GifBoxOutlined sx={{ color: mediumMain }} />
								<Typography color={mediumMain}>Clip</Typography>
							</FlexBetween>
							<FlexBetween gap="0.25rem">
								<AttachFileOutlined sx={{ color: mediumMain }} />
								<Typography color={mediumMain}>Attachment</Typography>
							</FlexBetween>
							<FlexBetween gap="0.25rem">
								<MicOutlined sx={{ color: mediumMain }} />
								<Typography color={mediumMain}>Audio</Typography>
							</FlexBetween>
						</>
					) : (
						<FlexBetween gap="0.25rem">
							<MoreHorizOutlined sx={{ color: mediumMain }} />
						</FlexBetween>
					)}
					<Button
						disabled={!post}
						onClick={handlePost}
						sx={{
							color: palette.background.alt,
							backgroundColor: palette.primary.main,
							borderRadius: "3rem",
						}}
					>
						POST
					</Button>
				</FlexBetween>
			</WidgetWrapper>
		</>
	);
};

export default MyPostWidget;

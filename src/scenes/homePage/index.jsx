import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";

const HomePage = () => {
	const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
	const { _id } = useSelector(state => state.user);

	return (
		<Box>
			<Navbar />
			<Box
				flexBasis={isNonMobileScreens ? "42%" : undefined}
				mt={isNonMobileScreens ? undefined : "2rem"}
			>
				<MyPostWidget />
				<PostsWidget
					userId={_id}
					isProfile
				/>
			</Box>
		</Box>
	);
};

export default HomePage;

import { Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper.jsx";

const PostWidget = ({ name, content, header, date }) => {
	const { palette } = useTheme();
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;

	const formattedDate = new Date(date).toLocaleString();

	return (
		<WidgetWrapper m="2rem 0">
			<Typography
				color={main}
				variant="h5"
				fontWeight="500"
			>
				{name}
			</Typography>
			<Typography
				color={medium}
				fontSize="0.75rem"
			>
				{formattedDate}
			</Typography>
			<Typography
				color={main}
				variant="h4"
				fontWeight="400"
			>
				{header}
			</Typography>
			<Typography
				color={main}
				sx={{ mt: "1rem" }}
			>
				{content}
			</Typography>
		</WidgetWrapper>
	);
};

export default PostWidget;

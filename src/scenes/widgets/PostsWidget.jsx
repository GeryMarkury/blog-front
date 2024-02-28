import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget.jsx";
import { Loader } from "../../components/Loader.jsx";

const PostsWidget = () => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const posts = useSelector(state => state.posts);
	const token = useSelector(state => state.token);

	const getPosts = async () => {
		setIsLoading(true);
		const response = await fetch("https://blog-back-743n.onrender.com/posts", {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		dispatch(setPosts({ posts: data }));
		setIsLoading(false);
	};

	useEffect(() => {
		getPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{isLoading && <Loader />}
			{[...posts].reverse().map(({ _id, header, content, firstName, lastName, createdAt }) => (
				<PostWidget
					key={_id}
					name={`${firstName} ${lastName}`}
					content={content}
					header={header}
					date={createdAt}
				/>
			))}
		</>
	);
};

export default PostsWidget;

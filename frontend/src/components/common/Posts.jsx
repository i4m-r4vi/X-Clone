import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


const Posts = ({feedType,username,userId}) => {
	const getPostEndPoint = ()=>{
		switch (feedType) {
			case "forYou":
				return `${import.meta.env.VITE_APP_BACKEND}api/posts/getAllPost`
			case "following":
				return `${import.meta.env.VITE_APP_BACKEND}api/posts/follwingPost`
			case "posts":
				return `${import.meta.env.VITE_APP_BACKEND}api/posts/user/${username}`
			case "likes":
				return `${import.meta.env.VITE_APP_BACKEND}api/posts/likes/${userId}`;
			default:
				return `${import.meta.env.VITE_APP_BACKEND}api/posts/getAllPost`
		}
	}

	const Post_EndPoint = getPostEndPoint()

	const {data:posts,isLoading,refetch,isRefetching} = useQuery({
		queryKey:["posts"],
		queryFn: async()=>{
			try {
				const res = await fetch(Post_EndPoint,{
					method:"GET",
					credentials:"include",
					headers:{
						"Content-Type":"application/json"
					}
				})
				const data = await res.json();
				if(!res.ok){
					throw new Error(data.message)
				}
				return data
			} catch (error) {
				throw error
			}
		}
	})

	useEffect(()=>{
		refetch()
	},[feedType])
	return (
		<>
			{(isLoading||isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
			
		</>
	);
};
export default Posts;
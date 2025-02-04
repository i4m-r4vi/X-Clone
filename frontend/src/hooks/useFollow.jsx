import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/common/LoadingSpinner";


const useFollow = ()=>{
    const queryClient = useQueryClient();

    const {mutate:follow,isPending,variables} = useMutation({
        mutationFn:async(userId)=>{
            try {
				const res = await fetch(`${import.meta.env.VITE_APP_BACKEND}api/users/follow/${userId}`, {
					method: "POST",
                    credentials: "include"
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong!");
				}
				
				return data;
			} catch (error) {
				throw new Error(error.message);
			}
        },
        onSuccess: () => {
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
				queryClient.invalidateQueries({ queryKey: ["authUser"] })
			]);
		},
		onError: (error) => {
			toast.error(error.message);
		},
    })
    return {follow,isPending,variables};
}

export default useFollow
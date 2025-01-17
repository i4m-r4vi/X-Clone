import { useState } from "react";
import { data, Link } from "react-router-dom";
import XSvg from "../../../components/svgs/X";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../../components/common/LoadingSpinner";


const LoginPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const [showPass, setShowPass] = useState(false)

	const handleShow = () => {
		return setShowPass(!showPass)
	}
	const { mutate: signin, isPending, isError, error } = useMutation({
		mutationFn: async ({ username, password }) => {
			try {
				const res = await fetch(`${import.meta.env.VITE_APP_BACKEND}api/auth/signin`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
					body: JSON.stringify({ username, password })
				})
				const data = await res.json();
				if(!res.ok){
					throw new Error(data.error)
				}
				return data
			} catch (error) {
				throw error
			}
		},
		onSuccess:()=>{
			toast.success("Successfully Login",{
				style: {
					borderRadius: '10px',
					background: '#333',
					color: '#fff',
				},
			})
		},
		onError: (error)=>{
			toast.error(`${error.message}`,{
				style: {
					borderRadius: '10px',
					background: '#333',
					color: '#fff',
				},
			})
		}
	})

	const handleSubmit = (e) => {
		e.preventDefault();
		signin(formData)
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};



	return (
		<div className='max-w-screen-xl mx-auto flex h-screen'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
					<XSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>{"Let's"} go.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='text'
							className='grow'
							placeholder='username'
							name='username'
							onChange={handleInputChange}
							value={formData.username}
						/>
					</label>

					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type={showPass ? "text" : "password"}
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
						{showPass ? <FaRegEye onClick={handleShow} className="cursor-pointer" /> : <FaRegEyeSlash onClick={handleShow} className="cursor-pointer" />}
					</label>

					<button className='btn rounded-full btn-primary text-white'>
						{isPending ? <LoadingSpinner /> : 'Sign In'}
					</button>
					{isError && <p className='text-red-500'>{error.message}</p>}
				</form>
				<div className='flex flex-col gap-2 mt-4'>
					<p className='text-white text-lg'>{"Don't"} have an account?</p>
					<Link to='/signup'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
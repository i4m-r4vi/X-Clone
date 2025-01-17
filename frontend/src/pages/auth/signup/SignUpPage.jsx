import { Link } from "react-router-dom";
import { useState } from "react";
import XSvg from "../../../components/svgs/X.jsx";
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import toast from 'react-hot-toast'


const SignUpPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		username: "",
		fullname: "",
		password: "",
	});
	const [showPass, setShowPass] = useState(false)

	const handleShow = () => {
		return setShowPass(!showPass)
	}

	const { mutate: signup, isPending, isError, error } = useMutation({
		mutationFn: async ({ email, username, fullname, password }) => {
			try {
				const res = await fetch(`${import.meta.env.VITE_APP_BACKEND}api/auth/signup`, {
					method: "POST",
					credentials:"include",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
					body: JSON.stringify({ email, username, fullname, password })
				})
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message)
				}
				return data
			} catch (error) {
				throw error
			}
		},
		onSuccess: () => {
			toast.success("User Succesfully Created", {
				style: {
					borderRadius: '10px',
					background: '#333',
					color: '#fff',
				},
			})
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData)
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className='max-w-screen-xl mx-auto flex h-screen px-10'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className=' lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
					<XSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>
					<div className='flex gap-4 flex-wrap'>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<FaUser />
							<input
								type='text'
								className='grow '
								placeholder='Username'
								name='username'
								onChange={handleInputChange}
								value={formData.username}
							/>
						</label>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<MdDriveFileRenameOutline />
							<input
								type='text'
								className='grow'
								placeholder='Full Name'
								name='fullname'
								onChange={handleInputChange}
								value={formData.fullname}
							/>
						</label>
					</div>
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
						{isPending ? "Loading" : "Sign Up"}
					</button>
					{isError && <p className='text-red-500'>{error.message}</p>}
				</form>
				<div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
					<p className='text-white text-lg'>Already have an account?</p>
					<Link to='/login'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign in</button>
					</Link>
				</div>

			</div>
		</div>
	);
};
export default SignUpPage;
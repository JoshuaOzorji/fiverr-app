import { useState } from "react";
import newRequest from "../../utils/newRequest.js";

import { useNavigate } from "react-router-dom";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await newRequest.post("/auth/login", { username, password });
			localStorage.setItem("currentUser", JSON.stringify(res.data));
			navigate("/");
		} catch (err) {
			setError(err.response.data);
		}
	};
	return (
		<main className='padding font-lato'>
			<div className='w-full md:w-[35%] mx-auto my-4 md:my-10'>
				<form onSubmit={handleSubmit} className='flex flex-col gap-3 md:gap-6'>
					{/* HEADING */}
					<h1 className='text-center font-bold'>Sign in</h1>

					{/* USERNAME */}
					<span className='flex flex-col'>
						<label htmlFor='' className='text-sm md:text-base mb-1'>
							Username
						</label>
						<input
							name='username'
							type='text'
							placeholder='johndoe'
							className='form-focus p-2'
							onChange={(e) => setUsername(e.target.value)}
						/>
					</span>

					{/* USERNAME */}
					<span className='flex flex-col'>
						<label htmlFor='' className='text-sm md:text-base mb-1'>
							Password
						</label>
						<input
							name='password'
							type='password'
							placeholder='password'
							className='form-focus p-2'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</span>
					<span className='mx-auto'>
						<button type='submit' className='animate button py-1 px-4 '>
							Login
						</button>
					</span>
					{error && error}
				</form>
			</div>
		</main>
	);
}

export default Login;

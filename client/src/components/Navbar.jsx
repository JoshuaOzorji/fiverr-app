import { Link, useLocation, useNavigate } from "react-router-dom";
import BusinessSolutions from "./BusinessSolutions";
import { useEffect, useState } from "react";
import { submenuLinks } from "../data.jsx";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import newRequest from "../../utils/newRequest.js";

const Navbar = () => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setDrawerOpen(!isDrawerOpen);
	};

	const [active, setActive] = useState(false);
	const [open, setOpen] = useState(false);

	const { pathname } = useLocation();

	const isActive = () => {
		window.scrollY > 0 ? setActive(true) : setActive(false);
	};

	useEffect(() => {
		window.addEventListener("scroll", isActive);
		return () => {
			window.removeEventListener("scroll", isActive);
		};
	}, []);

	const navigate = useNavigate();

	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const handleLogout = async () => {
		try {
			await newRequest.post("/auth/logout");
			localStorage.setItem("currentUser", null);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<main className=''>
			{/* MD SCREEN*/}
			<section
				className={active || pathname !== "/" ? "navbar active" : "navbar"}>
				<div className='flex flex-row justify-between p-4 font-lato w-full'>
					{/* LOGO */}
					<div className='text-4xl font-black'>
						<Link className='flex' to='/'>
							<span className=''>fiverr</span>
							<span className='text-[#1dbf73]'>.</span>
						</Link>
					</div>

					{/* LINKS */}
					<ul className='flex items-center gap-4 text-base'>
						<li className='cursor-pointer'>
							<BusinessSolutions />
						</li>

						<li>Explore</li>
						<li>English</li>
						{!currentUser?.isSeller && <span>Become a Seller</span>}
						{currentUser ? (
							<div
								className='flex items-center cursor-pointer relative gap-2'
								onClick={() => setOpen(!open)}>
								<img
									src={currentUser.img || "/noavatar.jpg"}
									alt='user image'
									className='w-8 h-8 object-cover rounded-full'
								/>
								<span>{currentUser?.username}</span>
								{open && (
									<div className='absolute top-[44px] right-0 p-4 rounded-xl z-20 border flex flex-col min-w-[8rem] max-w-[10rem] bg-zinc-50 text-sm'>
										{currentUser.isSeller && (
											<div className='flex flex-col text-center'>
												<Link to='/mygigs'>Gigs</Link>
												<Link to='/add'>Add New Gig</Link>
											</div>
										)}
										<div className='flex flex-col text-center '>
											<Link className='cursor-pointer' to='/orders'>
												Orders
											</Link>
											<Link className='cursor-pointer' to='/messages'>
												Messages
											</Link>
											<Link className='cursor-pointer' onClick={handleLogout}>
												Logout
											</Link>
										</div>
									</div>
								)}
							</div>
						) : (
							<>
								<button>
									<Link to='/login'>Sign In</Link>
								</button>
								<button className='hover:bg-primary1 py-[0.4rem] px-4 rounded-md border'>
									<Link to='/register'>Join</Link>
								</button>
							</>
						)}
					</ul>
				</div>

				{(active || pathname !== "/") && (
					<>
						<hr />

						<ul className='py-3 flex justify-between px-4 w-full border font-lato'>
							{submenuLinks.map((links) => (
								<li key={links.id}>
									<Link>{links.name}</Link>
								</li>
							))}
						</ul>
					</>
				)}
			</section>

			{/* SM SCREEN */}
			<section className='md:hidden flex items-center justify-between px-6 py-4 sticky z-50 border-b text-accent bg-white font-lato'>
				<div className=''>
					{/* LOGO */}

					<button className='text-accent w-full'>
						<AiOutlineMenu
							className='w-6 h-6 cursor-pointer'
							onClick={toggleDrawer}
						/>
					</button>
				</div>

				{/* Mobile Drawer */}
				{isDrawerOpen && (
					<div
						className='fixed inset-0 z-30 bg-black bg-opacity-50'
						onClick={toggleDrawer}>
						<div className='fixed inset-y-0 left-0 max-w-xs w-full bg-white p-8 '>
							{/* Drawer content */}
							<div className='flex justify-end'>
								<button
									className='text-gray-800 hover:text-gray-600 focus:outline-none'
									onClick={toggleDrawer}>
									{/* Close icon */}
									<AiOutlineClose className='font-bold' />
								</button>
							</div>

							{/* Drawer links */}
							<nav className='mt-y overflow-auto h-[80vh]'>
								<ul className=''>
									<li className='text-lg mb-4'>
										<button className='button py-1 px-4 '>Join Fiverr</button>
									</li>
									<div className='text-base flex flex-col gap-2'>
										<Link to='/login' className='cursor-default'>
											Sign in
										</Link>
										<li className='cursor-default'>Browse categories</li>
										<li className='cursor-default'>Explore</li>
										<li className='cursor-default'>Business solutions</li>
									</div>
									{/* Add more menu items as needed */}
								</ul>
							</nav>
						</div>
					</div>
				)}

				<div className='text-4xl font-black'>
					<Link className='flex' to='/'>
						<span className=''>fiverr</span>
						<span className='text-[#1dbf73]'>.</span>
					</Link>
				</div>

				<p>Join</p>
			</section>
		</main>
	);
};

export default Navbar;

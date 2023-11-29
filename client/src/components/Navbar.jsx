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

	const [accordionOpen, setAccordionOpen] = useState(false);

	const handleAccordionToggle = (e) => {
		e.stopPropagation();
		setAccordionOpen(!accordionOpen);
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
			<section
				className={active || pathname !== "/" ? "navbar active" : "navbar"}>
				{/* MD SCREEN*/}
				<div className='flex flex-row justify-between p-4 font-lato w-full bg-zinc-50'>
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
								<button className='hover:bg-primary1 py-[0.4rem] hover:text-white px-4 rounded-md border animate'>
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
			<section className='md:hidden flex items-center justify-between px-6 py-4 sticky z-50 border-b text-accent bg-zinc-50 font-lato'>
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
						className='fixed inset-0 z-30 bg-black bg-opacity-50 '
						onClick={toggleDrawer}>
						<div className='fixed inset-y-0 left-0 max-w-xs w-full bg-zinc-100 p-8 '>
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
							<nav className='my-4 overflow-auto h-[80vh]'>
								<ul className='flex flex-col'>
									<li className='text-lg my-2'>
										{!currentUser ? (
											<Link to='/register' className='button py-1 px-4'>
												Join Fiverr
											</Link>
										) : (
											<p></p>
										)}
									</li>
									<div className='text-base flex flex-col gap-2'>
										<Link
											to='/'
											className='cursor-pointer'
											onClick={toggleDrawer}>
											Browse categories
										</Link>

										<Link
											to='/'
											className='cursor-pointer'
											onClick={toggleDrawer}>
											Explore
										</Link>

										<Link
											to='/'
											className='cursor-pointer'
											onClick={toggleDrawer}>
											Business solutions
										</Link>

										{currentUser ? (
											<div
												className={`accordion ${accordionOpen ? "open" : ""}`}>
												<button
													onClick={handleAccordionToggle}
													className='flex items-center gap-8'>
													<span className='flex items-center gap-2 border justify-between w-full py-1 px-2 rounded-lg text-white bg-primary1'>
														<img
															src={currentUser?.img || "/noavatar.jpg"}
															alt='user image'
															className='w-8 h-8 object-cover rounded-full'
														/>
														<p>{currentUser.username}</p>
													</span>
												</button>

												{accordionOpen && (
													<div className='flex flex-col items-start py-1 px-3 my-1 text-sm bg-primary1 text-zinc-50'>
														{currentUser.isSeller && (
															<div className='flex flex-col '>
																<Link to='/mygigs' className='drawer-link'>
																	Gigs
																</Link>
																<Link to='/add' className='drawer-link'>
																	Add New Gig
																</Link>
															</div>
														)}
														<div className='flex flex-col '>
															<Link className='drawer-link' to='/orders'>
																Orders
															</Link>
															<Link className='drawer-link' to='/messages'>
																Messages
															</Link>
															<Link
																className='drawer-link'
																onClick={handleLogout}>
																Logout
															</Link>
														</div>
													</div>
												)}
											</div>
										) : (
											<div>
												<Link
													to='/login'
													className='cursor-pointer hover:underline'>
													Sign in
												</Link>
											</div>
										)}
									</div>
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

				{currentUser ? <p></p> : <Link to='/register'>Join</Link>}
			</section>
		</main>
	);
};

export default Navbar;

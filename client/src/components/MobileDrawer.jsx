import { useState } from "react";

const MobileDrawer = () => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setDrawerOpen(!isDrawerOpen);
	};

	return (
		<div className='lg:hidden'>
			{/* Hamburger menu icon */}
			<button
				className='block px-2 py-1 text-gray-800 border border-gray-800 rounded focus:outline-none'
				onClick={toggleDrawer}>
				<svg
					className='w-6 h-6'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M4 6h16M4 12h16m-7 6h7'></path>
				</svg>
			</button>

			{/* Mobile Drawer */}
			{isDrawerOpen && (
				<div
					className='fixed inset-0 z-50 bg-black bg-opacity-50'
					onClick={toggleDrawer}>
					<div className='fixed inset-y-0 right-0 max-w-xs w-full bg-white p-8'>
						{/* Drawer content */}
						<div className='flex justify-end'>
							<button
								className='text-gray-800 hover:text-gray-600 focus:outline-none'
								onClick={toggleDrawer}>
								{/* Close icon */}
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M6 18L18 6M6 6l12 12'></path>
								</svg>
							</button>
						</div>

						{/* Drawer links */}
						<nav className='mt-4'>
							<ul>
								<li className='mb-4'>
									<a href='#' className='text-gray-800 hover:text-gray-600'>
										Home
									</a>
								</li>
								<li className='mb-4'>
									<a href='#' className='text-gray-800 hover:text-gray-600'>
										About
									</a>
								</li>
								<li className='mb-4'>
									<a href='#' className='text-gray-800 hover:text-gray-600'>
										Services
									</a>
								</li>
								{/* Add more menu items as needed */}
							</ul>
						</nav>
					</div>
				</div>
			)}
		</div>
	);
};

export default MobileDrawer;

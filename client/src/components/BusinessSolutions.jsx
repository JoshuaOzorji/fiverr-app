import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const BusinessSolutions = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const closeDropdown = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				closeDropdown();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div
			className='relative inline-block text-left font-lato md:text-base z-10'
			ref={dropdownRef}>
			<button
				onClick={toggleDropdown}
				type='button'
				className='inline-flex justify-center items-center w-full rounded-md px-4 py-2 gap-2  '>
				Business Solutions
				{isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
			</button>

			{isOpen && (
				<div className='origin-top-right absolute left-0 mt-2 w-72 rounded-md border bg-white'>
					<div className=''>
						<a
							href='#'
							className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
							<p className='font-bold'>Fiverr Pro</p>
							<p>
								Top freelancers and professional business tools for any project
							</p>
						</a>
						<a
							href='#'
							className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
							<p className='font-bold'>Fiverr Certified</p>
							<p>Your own branded marketplace of certified experts</p>
						</a>
						<a
							href='#'
							className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
							<p className='font-bold'>Fiverr Enterprise</p>
							<p>
								SaaS to manage your freelance workforce and onboard additional
								talent
							</p>
						</a>
					</div>
				</div>
			)}
		</div>
	);
};

export default BusinessSolutions;

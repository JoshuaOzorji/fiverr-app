import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const FeaturedMobile = () => {
	const [input, setInput] = useState("");
	const navigate = useNavigate();

	const handleSubmit = () => {
		navigate(`/gigs?/search=${input}`);
	};

	return (
		<main>
			<h1 className='text-zinc-50 text-4xl font-bold'>
				Find the right <span className='italic'>freelance</span> service, right
				away
			</h1>
			<div className='flex flex-col w-full py-12 '>
				<input
					type='search'
					placeholder='Search for any service...'
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
					className='w-full px-4 py-3 text-base font-abel text-gray-700 border border-solid border-gray-300 animate focus:text-gray-700 focus:bg-zinc-100 focus:border-blue-600 focus:outline-none mb-3 rounded'
				/>

				<button
					className='px-4 py-3  text-zinc-50 bg-primary1  animate rounded hover:bg-[#128f54] form-focus'
					type='button'
					onClick={handleSubmit}
					disabled={!input.trim()}>
					<BiSearch className='w-5 h-5' />
				</button>
			</div>
		</main>
	);
};

export default FeaturedMobile;

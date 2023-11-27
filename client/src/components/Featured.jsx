import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Featured = () => {
	const [input, setInput] = useState("");
	const navigate = useNavigate();

	const handleSubmit = () => {
		const encodedSearch = encodeURIComponent(input);
		navigate(`/gigs?search=${encodedSearch}`);
	};

	return (
		<main className='font-lato'>
			<h1 className='sm:text-5xl font-bold text-zinc-50 py-2 '>
				Find the perfect <span className='italic'>freelance</span> services for
				your business
			</h1>

			<div className='flex my-4'>
				<span className='w-[88%]'>
					<input
						type='search'
						placeholder='Search for any service...'
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
						className='w-full  focus:text-gray-700 border focus:bg-zinc-50 focus:border-primary1 focus:outline-none p-2'
					/>
				</span>
				<button
					className=' w-[12%] text-zinc-50 bg-primary1 cursor-pointer flex justify-center items-center mx-auto'
					onClick={handleSubmit}
					disabled={!input.trim()}>
					<AiOutlineSearch />
				</button>
			</div>

			<div className='flex text-zinc-50 gap-2 my-4 items-center text-sm'>
				<h3>Popular:</h3>
				<div className='flex gap-4'>
					<button className='hero-button animate'>Web Design</button>
					<button className='hero-button animate'>WordPress</button>
					<button className='hero-button animate'>Logo Design</button>
					<button className='hero-button animate'>AI Services</button>
				</div>
			</div>
		</main>
	);
};

export default Featured;

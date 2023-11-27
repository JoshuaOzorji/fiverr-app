import { Link } from "react-router-dom";
import image from "/fiverr-business-solutions.png";
import { businessSolutions } from "../data";

const Business = () => {
	return (
		<main className='flex items-center gap-6 bg-[#0D084D] px-4 md:px-8 text-white py-10 font-lato'>
			{/* TEXT */}
			<section className='md:w-[45%] '>
				{/* LOGO */}
				<div className='flex gap-x-2 items-end mb-3'>
					<Link className='flex text-3xl relative font-black' to='/'>
						<span className='text-zinc-50'>fiverr</span>
						<span className='text-primary1'>.</span>
					</Link>
					<p className='text-zinc-50'>Business Solutions</p>
				</div>

				<h1 className='text-3xl font-bold mb-9'>
					Advanced solutions and professional talent for businesses
				</h1>

				{businessSolutions.map((item) => (
					<div key={item.id} className='flex gap-3 items-center mb-8'>
						<span className='text-2xl text-[#B1ABFF]'>{item.icon}</span>
						<span>
							<p className='font-bold heading-sm-md'>{item.title}</p>
							<p className='text-sm-md'>{item.desc}</p>
						</span>
					</div>
				))}

				<div>
					<button className='px-5 py-1 text-accent2 bg-zinc-100 rounded-md text-base hover:text-black font-bold'>
						Learn more
					</button>
				</div>
			</section>

			{/* IMAGE */}
			<section className='hidden md:flex md:w-[55%] max-h-fit'>
				<img src={image} />
			</section>
		</main>
	);
};

export default Business;

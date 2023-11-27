import { Link } from "react-router-dom";
import image from "/logo-maker-c.png";

const LogoMaker = () => {
	return (
		<main className='bg-[#446ee7] flex flex-col md:flex-row gap-y-2 md:gap-y-0 items-center justify-center md:m-8 font-lato my-6'>
			{/* TEXT */}
			<section className='md:w-[45%] py-8 text-white flex flex-col gap-y-2 md:ml-12 md:py-5 px-4 md:px-0'>
				{/* LOGO */}
				<div className='flex gap-x-2 items-end mb-3'>
					<Link className='flex text-3xl relative font-black' to='/'>
						<span className='text-zinc-50'>fiverr</span>
						<span className='text-primary1'>.</span>
					</Link>
					<p className='text-2xl font-bold'>logo maker.</p>
				</div>

				<h2 className='text-3xl md:text-4xl font-bold'>
					Make an incredible logo <span className='italic'>in minutes</span>
				</h2>
				<p className='text-base md:text-lg'>
					Pre-designed by top talent. Just add your touch.
				</p>

				<div>
					<button className='bg-zinc-50 px-4 py-1 rounded-md text-[#446ee7]'>
						Try Fiverr Logo Maker
					</button>
				</div>
			</section>
			{/* IMAGE */}
			<section className='md:w-[55%]'>
				<img src={image} alt='logo maker' />
			</section>
		</main>
	);
};

export default LogoMaker;

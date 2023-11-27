import { info } from "../data";
import infoImg from "/info-img.jpg";
import { PiPlayFill } from "react-icons/pi";

const Info = () => {
	return (
		<main
			className='bg-[#edfff6] font-lato flex flex-col md:flex-row items-center gap-x-14 px-8 py-8 md
		:py-24 text-accent'>
			{/* TEXT */}
			<section className='md:w-[45%]'>
				<h1 className='text-2xl md:text-4xl font-bold mb-6'>
					The best part? Everything.
				</h1>

				{info.map((item, id) => (
					<div key={id} className='text-lg mb-6'>
						<span className='flex items-center gap-x-2 '>
							<p className='text-accent2'>{item.icon}</p>
							<p className='font-bold heading-sm-md'>{item.title}</p>
						</span>
						<p className='text-[17px] text-accent2 text-sm-md'>{item.desc}</p>
					</div>
				))}
			</section>

			{/* IMAGE */}
			<section className='md:w-[55%]'>
				<div className='relative flex justify-center items-center '>
					<img src={infoImg} alt='video thumbnail' className='rounded-lg' />
					<button className='absolute p-4 rounded-full bg-black/60 cursor-pointer hover:bg-black animate'>
						<PiPlayFill className='w-8 h-8 text-zinc-50 ' />
					</button>
				</div>
			</section>
		</main>
	);
};

export default Info;

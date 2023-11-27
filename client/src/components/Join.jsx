import image from "/join.png";
const Join = () => {
	return (
		<main className='padding font-lato'>
			<section className='hidden md:flex items-center justify-center  text-white mb-20'>
				<img src={image} alt='join fiverr' className='rounded-md relative' />
				<div className='absolute text-left left-20 flex flex-col gap-y-10'>
					<p className='font-bold text-5xl'>
						Suddenly {`it's`} all so <span className='italic'>doable.</span>
					</p>
					<div>
						<button className='bg-primary1 text-white px-4 py-1 rounded-md text-lg hover:bg-[#109255]'>
							Join Fiverr
						</button>
					</div>
				</div>
			</section>
			{/* MOBILE */}

			<div className='bg-[#460A1C] py-14 px-8 text-white block md:hidden rounded-md'>
				<p className='font-bold text-3xl mb-8'>
					Suddenly {`it's`} all so <span className='italic'>doable.</span>
				</p>
				<div>
					<button className='bg-primary1 text-white px-4 py-1 rounded-md text-base hover:bg-[#109255]'>
						Join Fiverr
					</button>
				</div>
			</div>
		</main>
	);
};

export default Join;

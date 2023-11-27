import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { guides } from "../data";

const Guides = () => {
	return (
		<main className='padding font-lato text-accent my-8 md:my-24'>
			<div className='flex justify-between mb-6 items-end'>
				<h1 className='text-2xl md:text-4xl font-bold'>
					Guides to help you grow
				</h1>
				<button className='text-sm md:text-base hover:underline'>
					See more
				</button>
			</div>

			<div className=''>
				<Swiper
					slidesPerView={5}
					spaceBetween={30}
					loop={true}
					modules={[Navigation]}
					navigation={{
						nextEl: ".button-next-slide",
						prevEl: ".button-prev-slide",
					}}
					breakpoints={{
						100: { slidesPerView: 1, spaceBetween: 8 },
						768: { slidesPerView: 3, spaceBetween: 16 },
						1024: { slidesPerView: 3, spaceBetween: 16 },
						1280: { slidesPerView: 3, spaceBetween: 16 },
					}}
					className='mySwiper'>
					<button className='swiper-button-prev button-prev-slide text-accent bg-zinc-50 rounded-full p-6 font-bold shadow-lg'></button>
					{guides.map((card) => (
						<SwiperSlide key={card.id}>
							<div className=''>
								<img
									src={card.src}
									alt={card.alt}
									className='rounded-md w-full h-[13rem] md:h-[15rem] items-center'
								/>
							</div>
							<div>
								<p className='text-lg md:text-xl font-bold'>{card.desc}</p>
							</div>
						</SwiperSlide>
					))}

					<button className='swiper-button-next button-next-slide text-accent bg-zinc-50 rounded-full p-6 font-bold shadow-lg'></button>
				</Swiper>
			</div>
		</main>
	);
};

export default Guides;

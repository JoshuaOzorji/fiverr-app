import { carousel } from "../data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Slide = () => {
	return (
		<main className='font-lato padding my-16 md:my-20'>
			<h1 className='text-4xl font-bold pb-8'>Popular services</h1>
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
						1024: { slidesPerView: 5, spaceBetween: 16 },
						1280: { slidesPerView: 5, spaceBetween: 16 },
					}}
					className='mySwiper'>
					{carousel.map((card) => (
						<SwiperSlide key={card.id}>
							<div className='relative'>
								<Link to='/gigs'>
									<img
										src={card.src}
										alt={card.alt}
										className='rounded-md w-full max-h-screen items-center'
									/>
								</Link>
							</div>
							<div className='absolute top-4 left-4 text-zinc-50'>
								<p className='text-sm'>{card.desc}</p>
								<p className='font-bold text-2xl '>{card.title}</p>
							</div>
						</SwiperSlide>
					))}
					<button className='swiper-button-prev button-prev-slide text-accent bg-zinc-50 rounded-full p-6 font-bold shadow-lg'></button>
					<button className='swiper-button-next button-next-slide text-accent bg-zinc-50 rounded-full p-6 font-bold shadow-lg'></button>
				</Swiper>
			</div>
		</main>
	);
};

export default Slide;

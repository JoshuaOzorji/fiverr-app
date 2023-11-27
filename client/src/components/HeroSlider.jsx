import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";
import { slideImages } from "../data";
import Featured from "./Featured";
import { BiSearch } from "react-icons/bi";
import FeaturedMobile from "./FeaturedMobile";

const HeroSlider = () => {
	return (
		<main>
			<section className='hidden md:block relative z-10'>
				{/* MD BREAKPOINT */}
				<div>
					<Swiper
						modules={[EffectFade, Autoplay]}
						effect={"fade"}
						loop={true}
						autoplay={{
							delay: 3500,
							disableOnInteraction: false,
						}}
						className=''>
						{slideImages.map((slide) => {
							return (
								<SwiperSlide className='' key={slide.id}>
									<div className=''>
										<img src={slide.src} alt='hero slider' />
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>

				<div className='md:max-w-[30rem] lg:max-w-[40rem] absolute top-0 left-8 right-0 bottom-0 flex items-center justify-center z-10'>
					<Featured />
				</div>
			</section>

			{/* SM BREAKPOINT */}
			<section className='bg-[#0A4226] md:hidden pt-24 px-4 font-lato'>
				<FeaturedMobile />
			</section>
		</main>
	);
};

export default HeroSlider;

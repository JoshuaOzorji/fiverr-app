import business from "/i-business.svg";
import data from "/i-data.svg";
import digital from "/i-digital-marketing.svg";
import graphics from "/i-graphics-design.svg";
import lifestyle from "/i-lifestyle.svg";
import music from "/i-music-audio.svg";
import photography from "/i-photography.svg";
import video from "/i-video-animation.svg";
import writing from "/i-writing-translation.svg";
import programming from "/i-programming-tech.svg";

const Categories = () => {
	return (
		<main className='px-8 my-12 text-accent'>
			<h1 className='text-2xl md:text-4xl mb-10 font-bold'>{`You need it, we've got it`}</h1>
			<section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12'>
				<div className='icon-container group'>
					<img src={graphics} alt='graphics' className='icon' />
					<span className='line'></span>
					<p className='container-text'>Graphics & Design</p>
				</div>

				<div className='icon-container group'>
					<img src={digital} alt='digital' className='icon' />
					<span className='line'></span>
					<p className='container-text'>Digital Marketing</p>
				</div>

				<div className='icon-container group'>
					<img src={writing} alt='writing' className='icon' />
					<span className='line'></span>
					<p className='container-text'>Writing & Translation</p>
				</div>

				<div className='icon-container group'>
					<img src={video} alt='video' className='icon' />
					<span className='line'></span>
					<p className='container-text'>Video & Animation</p>
				</div>

				<div className='icon-container group'>
					<img src={music} alt='music' className='icon' />
					<span className='line'></span>
					<p className='container-text'>Music & Audio</p>
				</div>

				<div className='icon-container group'>
					<img src={programming} alt='programming' className='icon' />
					<span className='line'></span>
					<p className='container-text'>Programming & Tech</p>
				</div>

				<div className='icon-container group'>
					<img src={business} alt='business' className='icon' />
					<span className='line'></span>
					<p className='container-text'>Business</p>
				</div>

				<div className='icon-container group'>
					<img src={lifestyle} alt='lifestyle' className='icon' />
					<span className='line'></span>
					<p className='container-text'>Lifestyle</p>
				</div>

				<div className='icon-container group'>
					<img src={data} alt='data' className='icon' />
					<span className='line'></span>
					<p className='container-text'>Data</p>
				</div>

				<div className='icon-container group'>
					<img src={photography} alt='photography' className='icon' />
					<span className='line'></span>
					<p className='container-text'>Photography</p>
				</div>
			</section>
		</main>
	);
};

export default Categories;

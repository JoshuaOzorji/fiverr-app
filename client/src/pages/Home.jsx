import Business from "../components/Business";
import Categories from "../components/Categories";
import Guides from "../components/Guides";
import HeroSlider from "../components/HeroSlider";
import Info from "../components/Info";
import Join from "../components/Join";
import LogoMaker from "../components/LogoMaker";
import Slide from "../components/Slide";
import TrustedBy from "../components/TrustedBy";

const Home = () => {
	return (
		<main className=''>
			<HeroSlider />
			<div className=''>
				<TrustedBy />
				<div className='px-4'>
					<Slide />
				</div>
				<Info />
				<Categories />
				<Business />
				<LogoMaker />
				<Guides />
				<Join />
			</div>
		</main>
	);
};

export default Home;

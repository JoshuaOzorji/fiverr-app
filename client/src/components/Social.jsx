import { Link } from "react-router-dom";
import {
	BsLinkedin,
	BsPinterest,
	BsFacebook,
	BsUniversalAccessCircle,
	BsCurrencyDollar,
} from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineGlobal, AiFillInstagram } from "react-icons/ai";
import { BiLogoTiktok } from "react-icons/bi";

const Social = () => {
	return (
		<main className='flex flex-col md:flex-row justify-between padding text-accent items-center font-lato border-t py-4  gap-2'>
			{/* LOGO */}
			<div className='flex gap-x-2'>
				<Link to='/'>
					<span className='text-2xl md:text-4xl  font-black'>
						fiverr<sub className='text-xs font-normal'>&reg;</sub>
					</span>
				</Link>
			</div>

			<p className='text-xs md:text-sm'>
				&copy; Fiverr International Ltd. 2023
			</p>

			<div className='flex gap-4 items-center'>
				<BiLogoTiktok className='footer-icon animate ' />
				<AiFillInstagram className='footer-icon animate' />
				<BsLinkedin className='footer-icon animate' />
				<BsFacebook className='footer-icon animate' />
				<BsPinterest className='footer-icon animate' />
				<FaXTwitter className='footer-icon animate' />
			</div>

			<div className='flex gap-x-4 text-lg items-center'>
				<span className='footer-icon2 animate'>
					<AiOutlineGlobal className='footer-icon' />{" "}
					<p className='text-sm md:text-lg'>English</p>
				</span>

				<span className='footer-icon2 animate'>
					<BsCurrencyDollar className='footer-icon' />
					<p className='text-sm md:text-lg'>USD</p>
				</span>

				<BsUniversalAccessCircle className='w-5 h-5 cursor-pointer' />
			</div>
		</main>
	);
};

export default Social;

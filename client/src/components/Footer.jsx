import { footerlinks } from "../data.jsx";
import FooterMobile from "./FooterMobile.jsx";
import Social from "./Social.jsx";

const Footer = () => {
	return (
		<main className="className='font-lato'">
			{/* MEDIUM DEVICE */}

			<section className='padding hidden w-full md:grid md:grid-cols-2 lg:grid-cols-5 justify-between md:mt-0 mt-10 border-t py-12'>
				{footerlinks.map((footerLink) => (
					<div key={footerLink.id}>
						<h4 className='text-lg text-accent font-bold pb-2'>
							{footerLink.title}
						</h4>

						<ul className='list-none  '>
							{footerLink.links.map((link) => (
								<li key={link.id}>
									<p className='font-lato text-accent2 text-base py-[9px] hover:underline cursor-pointer'>
										{link.name}
									</p>
								</li>
							))}
						</ul>
					</div>
				))}
			</section>

			{/* MOBILE DEVICE */}
			<section className='md:hidden my-8'>
				{footerlinks.map((item) => (
					<FooterMobile key={item.id} {...item}></FooterMobile>
				))}
			</section>

			{/* SOCIAL LINKS */}
			<Social />
		</main>
	);
};

export default Footer;

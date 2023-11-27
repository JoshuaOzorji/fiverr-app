import { IoIosRemove, IoMdAdd } from "react-icons/io";
import { useState } from "react";

const FooterMobile = ({ title, ...footerlinks }) => {
	const [showInfo, setShowInfo] = useState(false);

	return (
		<article className='padding '>
			<header className='flex justify-between items-center py-3 border-t'>
				<h4 className='font-bold text-sm text-accent py-auto'>{title}</h4>
				<button onClick={() => setShowInfo(!showInfo)}>
					{showInfo ? (
						<IoIosRemove className='text-accent rotate-icon' />
					) : (
						<IoMdAdd className='text-accent rotate-icon' />
					)}
				</button>
			</header>
			{showInfo && (
				<ul className='leading-loose text-base mt-2 text-accent2'>
					{footerlinks.links?.map((link) => (
						<li key={link.name} className={` text-accent2 text-xs py-2 `}>
							{link.name}
						</li>
					))}
				</ul>
			)}
		</article>
	);
};
export default FooterMobile;

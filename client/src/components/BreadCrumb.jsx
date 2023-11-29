import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const BreadCrumb = ({ breadcrumbs, dynamicTitle }) => {
	console.log("dynamicTitle:", dynamicTitle);

	return (
		<main>
			<div className='font-lato text-accent'>
				<span className='tracking-wider text-xs flex items-center'>
					<Link to='/'>
						<AiFillHome className='w-3 h-3 md:w-4 md:h-4' />
					</Link>{" "}
					{breadcrumbs.map((item, index) => (
						<span key={index}>
							{">"}
							{item.link ? (
								<Link to={item.link}>{item.title}</Link>
							) : index === breadcrumbs.length - 1 ? (
								dynamicTitle ? (
									<span>
										{">"} {dynamicTitle}
									</span>
								) : (
									item.title
								)
							) : (
								item.title
							)}
						</span>
					))}
				</span>
			</div>
		</main>
	);
};

export default BreadCrumb;

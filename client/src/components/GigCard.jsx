import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

/* eslint-disable */
const GigCard = ({ item }) => {
	const { isLoading, error, data } = useQuery({
		queryKey: [item.userId],
		queryFn: () =>
			newRequest.get(`/users/${item.userId}`).then((res) => {
				return res.data;
			}),
	});
	return (
		<Link
			to={`/gig/${item._id}`}
			className='w-[80%] md:w-[70%] mx-auto gap-20 font-lato group'>
			<img
				src={item.cover}
				alt=''
				className='rounded-lg  w-full md:h-[12rem] shadow-md border'
			/>
			<div className='flex flex-col gap-y-2 pt-4'>
				{/* USER */}
				<div className='flex justify-between font-bold items-center'>
					{isLoading ? (
						"loading"
					) : error ? (
						"Something went wrong!"
					) : (
						<div className='flex items-center gap-2'>
							<img
								src={data.img || "/noavatar.jpg"}
								alt=''
								className='w-8 h-8 rounded-full'
							/>
							<span className=''>{data.username}</span>
						</div>
					)}
					<p>Level 2</p>
				</div>
				<p className='group-hover:underline'>{item.title}</p>
				<p>{item.desc}</p>

				<div className='font-bold'>
					<div className='flex items-center gap-1 mb-1'>
						<AiFillStar className='text-black w-5 h-5' />
						{/* <span>{item.star.toFixed(1)}</span> */}
						{/* <span>
							{!isNaN(item.totalStars / item.starNumber) &&
								Math.round(item.totalStars / item.starNumber)}
						</span> */}
						<span>
							{!isNaN(item.totalStars / item.starNumber) &&
								Number((item.totalStars / item.starNumber).toFixed(2))}
						</span>
					</div>
					<h2>From ${item.price}</h2>
				</div>
			</div>
		</Link>
	);
};

export default GigCard;

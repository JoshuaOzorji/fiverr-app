import { useQuery } from "@tanstack/react-query";
import { AiFillStar } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {
	const { isLoading, error, data } = useQuery({
		queryKey: [review.userId],
		queryFn: () =>
			newRequest.get(`/users/${review.userId}`).then((res) => {
				return res.data;
			}),
	});

	return (
		<div className='reviews flex flex-col gap-4'>
			<div className='border-t pt-6'>
				{isLoading ? (
					"Loading..."
				) : error ? (
					"Something went wrong"
				) : (
					<div className='flex gap-2 items-start'>
						<img
							className='image rounded-full'
							src={data.img || "/noavatar.jpg"}
							alt=''
						/>
						<div>
							<div className='flex flex-col gap-1'>
								<h2 className='font-bold'>{data.username}</h2>
								<div className='flex items-center gap-2'>
									<span>{data.country}</span>
								</div>

								<div className='aside-cont '>
									{Array(review.star)
										.fill()
										.map((item, i) => (
											<AiFillStar className='text-black star' key={i} />
										))}

									<span>{review.star}</span>
								</div>
							</div>

							<p className='my-4'>{review.desc}</p>

							<div className='flex gap-2 items-center'>
								<p>Helpful?</p>

								<span className='aside-cont'>
									Yes <BiLike />
								</span>

								<span className='aside-cont'>
									No <BiDislike />
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Review;

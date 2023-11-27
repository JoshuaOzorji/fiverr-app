import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Review from "./Review";
import newRequest from "../../utils/newRequest";

const Reviews = ({ gigId }) => {
	const queryClient = useQueryClient();
	const { isLoading, error, data } = useQuery({
		queryKey: ["reviews"],
		queryFn: () =>
			newRequest.get(`/reviews/${gigId}`).then((res) => {
				return res.data;
			}),
	});

	const mutation = useMutation({
		mutationFn: (review) => {
			return newRequest.post("/reviews", review);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["reviews"]);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const desc = e.target[0].value;
		const star = e.target[1].value;
		mutation.mutate({ gigId, desc, star });
	};

	return (
		<div>
			<h2 className='font-bold text-sm-md'>Reviews</h2>
			{isLoading
				? "Loading..."
				: error
				? "Something went wrong!"
				: data.map((review) => <Review key={review._id} review={review} />)}

			<div className='border p-2 text-sm md:text-base flex flex-col gap-2 md:w-[50%] md:mx-auto mt-8 items-center'>
				<h3 className='font-bold'>Add a review</h3>
				<form action='' onSubmit={handleSubmit} className='flex flex-col gap-2'>
					<span className='flex items-center gap-2'>
						<textarea
							placeholder='write your opinion'
							className='form-focus p-2'></textarea>

						<select name='' id=''>
							<option value={5}>5</option>
							<option value={4}>4</option>
							<option value={3}>3</option>
							<option value={2}>2</option>
							<option value={1}>1</option>
						</select>
					</span>
					<span className='flex justify-center'>
						<button className='button animate px-2 py-1 '>Send</button>
					</span>
				</form>
			</div>
		</div>
	);
};

export default Reviews;

import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import getCurrentUser from "../../utils/getCurrentUser";
import newRequest from "../../utils/newRequest";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const MyGigs = () => {
	const currentUser = getCurrentUser();

	const queryClient = useQueryClient();

	const { isLoading, error, data } = useQuery({
		queryKey: ["myGigs"],
		queryFn: () =>
			newRequest.get(`/gigs?userId=${currentUser.id}`).then((res) => {
				return res.data;
			}),
	});

	const mutation = useMutation({
		mutationFn: (id) => {
			return newRequest.delete(`/gigs/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["myGigs"]);
		},
	});

	const handleDelete = (id) => {
		mutation.mutate(id);
	};
	return (
		<main>
			<section className='padding'>
				<div className='flex items-center justify-between my-6'>
					<h1 className='text-lg md:text-3xl font-bold'>Gigs</h1>

					{currentUser.isSeller && (
						<Link to='/add'>
							<button className='button text-xs md:text-base px-2 py-1 animate'>
								Add New Gig
							</button>
						</Link>
					)}
				</div>

				{isLoading ? (
					"Loading..."
				) : error ? (
					"Something went wrong"
				) : (
					<div className='w-full'>
						<ul className='grid grid-cols-5 font-bold text-xs md:text-xl grid-row-5 sm:grid-cols-5 text-center'>
							<li>Image</li>
							<li>Title</li>
							<li>Price</li>
							<li>Sales</li>
							<li>Action</li>
						</ul>

						{data.map((gig) => (
							<ul
								className='flex flex-col justify-center sm:grid sm:grid-cols-5 text-center border my-2 items-center py-2 gap-1 place-items-center text-[11px] md:text-base leading-4 md:leading-none px-[2px] bg-[#1dbf730f]'
								key={gig._id}>
								<li>
									<img
										className='w-12 h-6 object-cover'
										src={gig.cover}
										alt=''
									/>
								</li>
								<li className='flex flex-wrap leading-4 '>{gig.cover}</li>
								<li>{gig.price}</li>
								<li>{gig.sales}</li>
								<button>
									<TiDelete
										className='w-6 h-6 text-red-700'
										onClick={() => handleDelete(gig._id)}
									/>
								</button>
							</ul>
						))}
					</div>
				)}
			</section>
		</main>
	);
};

export default MyGigs;

import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import moment from "moment";

const Messages = () => {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const queryClient = useQueryClient();

	const { isLoading, error, data } = useQuery({
		queryKey: ["conversations"],
		queryFn: () =>
			newRequest.get(`/conversations`).then((res) => {
				return res.data;
			}),
	});

	const mutation = useMutation({
		mutationFn: (id) => {
			return newRequest.put(`/conversations/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["conversations"]);
		},
	});

	const handleRead = (id) => {
		mutation.mutate(id);
	};

	return (
		<section className='padding my-4'>
			{isLoading ? (
				"Loading"
			) : error ? (
				"Something went wrong"
			) : (
				<div>
					<div className='text-lg md:text-2xl font-bold'>
						<h1>Messages</h1>
					</div>

					<div className='w-full my-4'>
						{/* HEAD */}
						<ul className='grid grid-cols-4 font-bold text-xs md:text-xl grid-row-4 sm:grid-cols-4 text-center  '>
							<li>{currentUser.isSeller ? "Buyer" : "Seller"}</li>
							<li>Last Message</li>
							<li>Date</li>
							<li>Action</li>
						</ul>

						{/* BODY */}

						{data.map((c) => (
							<ul
								className={`message-table ${
									(currentUser.isSeller && !c.readBySeller) ||
									(!currentUser.isSeller && !c.readByBuyer)
										? "bg-green-100"
										: "bg-white"
								}`}
								key={c.id}>
								<li className='break-all'>
									{currentUser.isSeller ? c.buyerId : c.sellerId}
								</li>
								<li>
									<Link to={`/message/${c.id}`} className='link'>
										{c.lastMessage?.substring(0, 20)}...
									</Link>
								</li>
								<li>{moment(c.updatedAt).fromNow()}</li>
								<li>
									{((currentUser.isSeller && !c.readBySeller) ||
										(!currentUser.isSeller && !c.readByBuyer)) && (
										<button
											className='button p-[3px] md:p-2'
											onClick={() => handleRead(c.id)}>
											Mark as read
										</button>
									)}
								</li>
							</ul>
						))}
					</div>
				</div>
			)}
		</section>
	);
};

export default Messages;

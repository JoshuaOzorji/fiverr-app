import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { HiMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Orders = () => {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const navigate = useNavigate();

	const { isLoading, error, data } = useQuery({
		queryKey: ["orders"],
		queryFn: () =>
			newRequest.get(`/orders/`).then((res) => {
				return res.data;
			}),
	});

	const handleContact = async (order) => {
		const sellerId = order.sellerId;
		const buyerId = order.buyerId;
		const id = sellerId + buyerId;

		try {
			const res = await newRequest.get(`/conversations/single/${id}`);
			navigate(`/message/${res.data.id}`);
		} catch (err) {
			if (err.response.status === 404) {
				const res = await newRequest.post(`/conversations/`, {
					to: currentUser.isSeller ? buyerId : sellerId,
				});
				navigate(`/message/${res.data.id}`);
			}
		}
	};

	return (
		<section className='padding my-4'>
			{isLoading ? (
				"Loading..."
			) : error ? (
				"Something went wrong"
			) : (
				<div>
					<h1 className='text-lg md:text-2xl font-bold mb-2'>Orders</h1>

					<div className='w-full'>
						<ul className='grid grid-cols-4 font-bold text-xs md:text-xl grid-row-4 sm:grid-cols-4 text-center'>
							<li>Image</li>
							<li>Title</li>
							<li>Price</li>
							{/* {<th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>} */}
							<li>Contact</li>
						</ul>

						{data.map((order) => (
							<ul className='table' key={order._id}>
								<li>
									<img
										className='w-10 h-6 object-cover'
										src={order.img}
										alt=''
									/>
								</li>
								<li className='flex flex-wrap leading-4 '>{order.title}</li>
								<li>{order.price}</li>

								<button>
									<HiMail
										className='w-4 h-4 md:w-6 md:h-6text-accent'
										onClick={() => handleContact(order)}
									/>
								</button>
							</ul>
						))}
					</div>
				</div>
			)}
		</section>
	);
};

export default Orders;

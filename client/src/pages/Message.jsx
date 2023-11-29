import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import BreadCrumb from "../components/BreadCrumb";

const Message = () => {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const { id } = useParams();

	const queryClient = useQueryClient();

	const { isLoading, error, data } = useQuery({
		queryKey: ["messages"],
		queryFn: () =>
			newRequest.get(`/messages/${id}`).then((res) => {
				return res.data;
			}),
	});

	const mutation = useMutation({
		mutationFn: (message) => {
			return newRequest.post(`/messages`, message);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["messages"]);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		mutation.mutate({
			conversationId: id,
			desc: e.target[0].value,
		});
		e.target[0].value = "";
	};

	return (
		<main className='padding py-2'>
			{/* BREADCRUMB */}
			<span className=''>
				<BreadCrumb breadcrumbs={[{ title: "Message", link: "#" }]} />
			</span>
			<section className='md:w-[70%] md:mx-auto'>
				{isLoading ? (
					"Loading..."
				) : error ? (
					"Something went wrong"
				) : (
					<div className='flex flex-col my-8 gap-8 overflow-auto h-[40vh] p-4 '>
						{data.map((m) => (
							<div
								className={m.userId === currentUser._id ? "owner item" : "item"}
								key={m._id}>
								<img
									src='https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600'
									alt=''
								/>
								<p>{m.desc}</p>
							</div>
						))}
					</div>
				)}
				<hr />
				<form
					className='flex mx-auto w-full px-4 justify-around items-center gap-1 my-4'
					onSubmit={handleSubmit}>
					<textarea
						type='text'
						placeholder='write a message'
						className='border p-2 focus:border-primary1 focus:outline-none rounded-lg text-sm md:text-base'
						cols='100'
						rows='3'
					/>

					<button type='submit' className='button px-4 py-2 animate'>
						<p>Send</p>
					</button>
				</form>
			</section>
		</main>
	);
};

export default Message;

import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import lottie from "lottie-web";
import success from "../success.json";

const Success = () => {
	//SCROLL TO TOP
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const container = useRef(null);

	const { search } = useLocation();
	const navigate = useNavigate();
	const params = new URLSearchParams(search);
	const payment_intent = params.get("payment_intent");

	useEffect(() => {
		const makeRequest = async () => {
			try {
				await newRequest.put("/orders", { payment_intent });

				setTimeout(() => {
					navigate("/orders");
				}, 5000);
			} catch (err) {
				console.log(err);
			}
		};
		makeRequest();
	}, []);

	useEffect(() => {
		const animation = lottie.loadAnimation({
			container: container.current,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: success,
		});

		return () => {
			animation.destroy();
		};
	}, []);

	return (
		<div className='my-8 w-[80%] md:w-[40%] mx-auto font-lato h-[50vh] flex flex-col gap-6'>
			<span ref={container} style={{ height: "5rem", display: "block" }}></span>

			<span className='text-center text-xs md:text-sm'>
				<p className='font-bold'>Payment successful. </p>
				<p className='mt-2'>
					You are being redirected to the orders page. Please do not close the
					page
				</p>
			</span>
		</div>
	);
};

export default Success;

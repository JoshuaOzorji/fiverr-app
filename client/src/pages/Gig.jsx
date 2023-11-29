import { Link, useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillStar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { LiaSyncSolid } from "react-icons/lia";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../components/Reviews";
import BreadCrumb from "../components/BreadCrumb";
// import { IoIosArrowBack } from "react-icons/io";

const Gig = () => {
	const { id } = useParams();

	console.log(id);

	const { isLoading, error, data } = useQuery({
		queryKey: ["gig"],
		queryFn: () =>
			newRequest.get(`/gigs/single/${id}`).then((res) => {
				return res.data;
			}),
	});

	const userId = data?.userId;

	const {
		isLoading: isLoadingUser,
		error: errorUser,
		data: dataUser,
	} = useQuery({
		queryKey: ["user"],
		queryFn: () =>
			newRequest.get(`/users/${userId}`).then((res) => {
				return res.data;
			}),
		enabled: !!userId,
	});

	return (
		<div className='padding py-2'>
			{/* BREADCRUMB */}
			<span className=''>
				<BreadCrumb
					breadcrumbs={[{ title: "Gigs", link: "/gigs" }]}
					dynamicTitle={data?.title}
				/>
			</span>

			{isLoading ? (
				"Loading..."
			) : error ? (
				"Something went wrong!"
			) : (
				<main className='py-6 flex flex-col md:flex-row gap-20 font-lato text-accent relative'>
					{/* LEFT */}
					<section className='md:w-[60%] border p-4'>
						<h1 className='font-bold text-xl md:text-3xl mb-4'>
							{data?.title}
						</h1>

						<div>
							{isLoadingUser ? (
								"Loading"
							) : errorUser ? (
								"Something went wrong"
							) : (
								<div className='flex items-center gap-2'>
									<img
										className='image rounded-full'
										src={dataUser.img || "/noavatar.jpg"}
										alt=''
									/>
									<div className='flex flex-col'>
										<p className='font-bold'>{dataUser.username}</p>
										{!isNaN(data.totalStars / data.starNumber) && (
											<div className='aside-cont mb-1'>
												{Array(Math.round(data?.totalStars / data?.starNumber))
													.fill()
													.map((item, i) => (
														<AiFillStar key={i} className='text-black star' />
													))}

												<span>
													{Math.round(data?.totalStars / data?.starNumber)}
												</span>
											</div>
										)}
									</div>
								</div>
							)}
						</div>

						<Swiper
							modules={[Navigation]}
							navigation={{
								nextEl: ".button-next-slide",
								prevEl: ".button-prev-slide",
							}}
							className='mySwiper my-4 max-h-[75vh]'>
							{data?.images?.map((img) => (
								<SwiperSlide key={img}>
									<img src={img} alt='slide images' />
								</SwiperSlide>
							))}

							<button className='swiper-button-prev button-prev-slide text-accent bg-zinc-50 rounded-full p-[14px] md:p-5 font-bold shadow-lg'></button>
							<button className='swiper-button-next button-next-slide text-accent bg-zinc-50 rounded-full p-[14px] md:p-5  font-bold shadow-lg'></button>
						</Swiper>

						<h2 className='text-xl font-bold'>About This Gig</h2>
						<h3 className='text-base leading-8 my-4'>{data?.desc}</h3>

						<div className=''>
							{isLoadingUser ? (
								"Loading"
							) : errorUser ? (
								"Something went wrong"
							) : (
								<div className='flex flex-col gap-3'>
									<h2 className='font-bold text-xl'>About The Seller</h2>
									<div className='flex flex-row gap-2'>
										<img
											src={dataUser?.img || "/noavatar.jpg"}
											alt=''
											className='image rounded-full'
										/>
										<div className='font-bold'>
											<span>{dataUser?.username}</span>
											{!isNaN(data.totalStars / data.starNumber) && (
												<div className='aside-cont mb-1'>
													{Array(Math.round(data.totalStars / data.starNumber))
														.fill()
														.map((item, i) => (
															<AiFillStar key={i} className='text-black star' />
														))}

													<span>
														{Math.round(data.totalStars / data.starNumber)}
													</span>
												</div>
											)}
										</div>
									</div>
									<span>
										<button className='font-bold border px-2 py-1 rounded-lg border-accent2'>
											Contact Me
										</button>
									</span>
								</div>
							)}

							<div className='flex flex-col gap-4 border my-6 p-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 text-base gap-6 '>
									<div className='flex flex-col gap-2'>
										<span className=''>From</span>
										<span className='font-bold'>{dataUser?.country}</span>
									</div>
									<div className='flex flex-col gap-2'>
										<span className=''>Member since</span>
										<span className='font-bold'>Aug 2022</span>
									</div>
									<div className='flex flex-col gap-2'>
										<span className=''>Avg. response time</span>
										<span className='font-bold'>4 hours</span>
									</div>
									<div className='flex flex-col gap-2'>
										<span className=''>Last delivery</span>
										<span className='font-bold'>1 day</span>
									</div>
									<div className='flex flex-col gap-2'>
										<span className=''>Languages</span>
										<span className='font-bold'>English</span>
									</div>
								</div>
								<hr />
								<p className='leading-8'>{dataUser?.desc}</p>
							</div>
						</div>

						{/* REVIEWS */}
						<Reviews gigId={id} />
					</section>

					<section className='md:w-[40%] '>
						<aside className='sticky top-32 border p-8 flex flex-col gap-4'>
							<div className='flex justify-between text-base'>
								<h3 className='font-bold'>{data.shortTitle}</h3>
								<h2>${data.price}</h2>
							</div>
							<p className=''>{data.shortDesc}</p>
							<div className='flex items-center justify-between'>
								{/* DELIVERY DAYS */}
								<div className='aside-cont'>
									<BiTime className='' />
									<span>{data.deliveryDate} Days delivery</span>
								</div>
								{/* REVISIONS */}
								<div className='aside-cont'>
									<LiaSyncSolid className='' />
									<span>{data.revisionNumber} Revisions</span>
								</div>
							</div>

							{/* FEATURES */}
							<div className='features'>
								{data.features.map((feature) => (
									<div className='aside-cont' key={feature}>
										<BsCheck className='aside-icon' />
										<span>{feature}</span>
									</div>
								))}
							</div>

							<button className='border p-2 text-white bg-black hover:bg-accent rounded-lg flex items-center justify-center animate'>
								<Link to={`/pay/${id}`}>
									<button>Continue</button>
								</Link>
							</button>
						</aside>
					</section>
				</main>
			)}
		</div>
	);
};

export default Gig;

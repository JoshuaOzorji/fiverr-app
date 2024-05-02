import { useEffect, useRef, useState } from "react";
import GigCard from "../components/GigCard.jsx";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { IoIosArrowDown } from "react-icons/io";
import BreadCrumb from "../components/BreadCrumb.jsx";

const Gigs = () => {
	//SCROLL TO TOP
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [sort, setSort] = useState("sales");
	const [open, setOpen] = useState(false);
	const minRef = useRef();
	const maxRef = useRef();

	const { search } = useLocation();

	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["gigs"],
		queryFn: () =>
			newRequest
				.get(
					`/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`,
				)
				.then((res) => {
					return res.data;
				}),
	});

	// const { isLoading, error, data, refetch } = useQuery({
	// 	queryKey: ["gigs"],
	// 	queryFn: () =>
	// 		newRequest
	// 			.get(
	// 				`/gigs${search ? `&search=${encodeURIComponent(search)}` : ""}&min=${
	// 					minRef.current.value
	// 				}&max=${maxRef.current.value}&sort=${sort}`,
	// 			)
	// 			.then((res) => res.data),
	// });

	console.log(data);

	const reSort = (type) => {
		setSort(type);
		setOpen(false);
	};

	useEffect(() => {
		console.log("Current URL:", window.location.href);
		console.log("Search Parameter:", search);
		console.log("Min Value:", minRef.current.value);
		console.log("Max Value:", maxRef.current.value);
		console.log("Sort Order:", sort);
		refetch();
	}, [sort, search]);

	const apply = () => {
		refetch();
	};

	return (
		<main className='padding py-2'>
			{/* BREADCRUMB */}
			<span className=''>
				<BreadCrumb breadcrumbs={[{ title: "Gigs", link: "/gigs" }]} />
			</span>

			<div className='font-lato my-4 md:my-8'>
				<section className='flex flex-col gap-2 md:gap-4 '>
					<p className='font-bold text-2xl md:text-4xl'>{`All Gigs`}</p>

					<div className='flex flex-col gap-4 text-sm border p-2'>
						<div className='left flex flex-col md:flex-row gap-2 border p-2'>
							<span className='font-light md:font-bold flex items-center '>
								Budget{" "}
							</span>
							<input
								ref={minRef}
								type='number'
								placeholder='min'
								className='form-focus rounded-md px-2 py-1'
							/>
							<input
								ref={maxRef}
								type='number'
								placeholder='max'
								className='form-focus rounded-md px-2 py-1'
							/>
							<button onClick={apply} className='button px-2 animate'>
								Apply
							</button>
						</div>
						<div className=''>
							<div className='flex items-center gap-1 border p-2'>
								<span className='font-light md:font-bold '>Sort by: </span>
								<span className='sortType'>
									{sort === "sales" ? "Best Selling" : "Newest"}
								</span>
								<span>
									<IoIosArrowDown
										onClick={() => setOpen(!open)}
										className='cursor-pointer'
									/>
								</span>
							</div>

							<div className='relative'>
								{open && (
									<div className='top-4 flex flex-col bg-white right-0 py-2 px-4 gap-1 text-left max-w-[8rem] border'>
										{sort === "sales" ? (
											<span
												onClick={() => reSort("createdAt")}
												className='cursor-pointer'>
												Newest
											</span>
										) : (
											<span
												onClick={() => reSort("sales")}
												className='cursor-pointer'>
												Best Selling
											</span>
										)}
										<span
											onClick={() => reSort("sales")}
											className='cursor-pointer'>
											Popular
										</span>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className='text-sm md:text-base'>
						<p>{data?.length} items found</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 border py-10'>
						{isLoading
							? "Loading"
							: error
							? "Something went wrong"
							: data && data.map((gig) => <GigCard key={gig._id} item={gig} />)}
					</div>
				</section>
			</div>
		</main>
	);
};

export default Gigs;

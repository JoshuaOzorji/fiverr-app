import { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer.js";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Add = () => {
	const [singleFile, setSingleFile] = useState(undefined);
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);

	const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

	const handleChange = (e) => {
		dispatch({
			type: "CHANGE_INPUT",
			payload: { name: e.target.name, value: e.target.value },
		});
	};

	const handleFeature = (e) => {
		e.preventDefault();
		dispatch({
			type: "ADD_FEATURE",
			payload: e.target[0].value,
		});
		e.target[0].value = "";
	};

	const handleUpload = async () => {
		setUploading(true);
		try {
			const cover = await upload(singleFile);
			const images = await Promise.all(
				[...files].map(async (file) => {
					const url = await upload(file);
					return url;
				}),
			);
			setUploading(false);
			dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
		} catch (err) {
			console.log(err);
		}
	};

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (gig) => {
			return newRequest.post("/gigs", gig);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["myGigs"]);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		mutation.mutate(state);
		navigate("/mygigs");
	};
	console.log(state);

	return (
		<main className='padding my-6 font-lato text-accent flex flex-col justify-center'>
			<h1 className='text-xl md:text-3xl font-bold text-center mb-2'>
				Add New Gig
			</h1>
			<section className='w-full md:w-[50%] mx-auto border p-6 rounded-lg flex flex-col gap-2'>
				{/* INPUTS */}

				{/* TITLE */}
				<div className='inputs'>
					<label htmlFor='' className='label'>
						Title
					</label>
					<input
						type='text'
						name='title'
						placeholder="e.g. I will do something I'm really good at"
						className='input'
						onChange={handleChange}
					/>
				</div>

				{/* CATEGORIES */}
				<div className='flex flex-col md:flex-row justify-between border p-1 rounded-lg md:items-center'>
					<label htmlFor='' className='label'>
						<p>Category</p>
					</label>
					<select
						name='cat'
						id='cat'
						onChange={handleChange}
						className='form-focus rounded-lg'>
						<option value='design'>Design</option>
						<option value='web'>Web Development</option>
						<option value='animation'>Animation</option>
						<option value='music'>Music</option>
					</select>
				</div>

				{/* COVER IMAGES*/}
				<div className='flex flex-col'>
					<div className='flex flex-col md:flex-row md:justify-between'>
						<label htmlFor='' className='label'>
							Cover Image
						</label>
						<input
							type='file'
							className='input'
							onChange={(e) => setSingleFile(e.target.files[0])}
						/>
					</div>

					{/* UPLOAD IMAGES*/}
					<div className='flex flex-col md:flex-row md:justify-between'>
						<label htmlFor='' className='label'>
							Upload Images
						</label>
						<input
							type='file'
							multiple
							onChange={(e) => setFiles(e.target.files)}
							className='input'
						/>
					</div>

					{/* UPLOAD BUTTON */}
					<span>
						<button onClick={handleUpload} className='button px-2 py-1 animate'>
							{uploading ? "Uploading..." : "Upload"}
						</button>
					</span>
				</div>

				{/* DESCRIPTION*/}
				<div className='inputs'>
					<label htmlFor='' className='label'>
						Description
					</label>
					<textarea
						name='desc'
						id=''
						cols='20'
						rows='5'
						placeholder='Brief descriptions to introduce your service to customers'
						onChange={handleChange}
						className='input'></textarea>
				</div>

				{/* SERVICE TITLE */}
				<div className='inputs'>
					<label htmlFor='' className='label'>
						Service Title
					</label>
					<input
						name='shortTitle'
						type='text'
						placeholder='e.g. One-page web design'
						className='input'
						onChange={handleChange}
					/>
				</div>

				{/* SHORT DESCRIPTION */}
				<div className='inputs'>
					<label htmlFor='' className='label'>
						Short Description
					</label>
					<textarea
						name='shortDesc'
						id=''
						cols='30'
						rows='5'
						placeholder='Short description of your service'
						className='input'
						onChange={handleChange}></textarea>
				</div>

				{/* DELIVERY TIME */}
				<div className='inputs'>
					<label htmlFor='' name='deliveryTime' className='label'>
						Delivery Time{" "}
						<span className='italic text-base'>(e.g. 3 days)</span>
					</label>
					<input type='number' className='input' onChange={handleChange} />
				</div>

				{/*REVISION NUMBER */}
				<div className='inputs'>
					<label htmlFor=''>Revision Number</label>
					<input
						type='number'
						name='revisionNumber'
						onChange={handleChange}
						className='input'
					/>
				</div>

				{/* ADD FEATURES */}
				<div className='inputs'>
					<label htmlFor='' className='label'>
						Add Features
					</label>
					<form
						action=''
						onSubmit={handleFeature}
						className='flex items-center'>
						<input
							type='text'
							placeholder='e.g. page design'
							className='input'
						/>
						<button type='submit' className=''>
							<p className='text-sm md:text-base button py-1 px-2 ml-4'>Add</p>
						</button>
					</form>
				</div>

				{/* ADDED FEATURES */}
				<div className=''>
					{state?.features?.map((f) => (
						<div key={f}>
							<button
								onClick={() => dispatch({ type: "REMOVE_FEATURE", payload: f })}
								className='flex items-center justify-between '>
								{f}{" "}
								<span className='pl-6'>
									<IoIosCloseCircleOutline />
								</span>
							</button>
						</div>
					))}
				</div>

				{/* PRICE */}
				<div className='inputs'>
					<label htmlFor='' className='label'>
						Price
					</label>
					<input
						type='number'
						name='price'
						className='input'
						onChange={handleChange}
						placeholder='$10'
					/>
				</div>
			</section>

			{/* BUTTON */}
			<div className='text-center w-full md:w-[50%] mx-auto my-6'>
				<button
					className='text-sm md:text-base px-4 py-2  text-zinc-50 bg-primary1 animate rounded-lg hover:bg-[#128f54]'
					onClick={handleSubmit}>
					Create
				</button>
			</div>
		</main>
	);
};

export default Add;

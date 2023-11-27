import facebook from "/gray-facebook.png";
import google from "/gray-google.png";
import netflix from "/gray-netflix.png";
import pandg from "/gray-pandg.png";
import paypal from "/gray-paypal.png";

const TrustedBy = () => {
	return (
		<main className='padding  flex items-center flex-wrap justify-center gap-2 font-lato bg-[#f3f3f5] py-4'>
			<h1 className='text-[#C2C2C5] text-lg font-bold hidden md:flex'>
				Trusted by:
			</h1>

			<div className='flex gap-x-4 px-4 items-center flex-wrap justify-center'>
				<img src={facebook} alt='facebook' className='trustedBy-img' />
				<img src={google} alt='google' className='trustedBy-img' />
				<img src={netflix} alt='netflix' className='trustedBy-img' />
				<img src={pandg} alt='pandg' className='trustedBy-img' />
				<img src={paypal} alt='paypal' className='trustedBy-img' />
			</div>
		</main>
	);
};

export default TrustedBy;

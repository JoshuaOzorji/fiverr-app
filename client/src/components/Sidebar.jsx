import { useState } from "react";

const Sidebar = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
		return (
			<div className='flex'>
				{isSidebarOpen && (
					<aside className='w-64 bg-gray-200 p-4'>Sidebar Content</aside>
				)}

				<main className='flex-1 p-4'>
					<button
						className='bg-blue-500 text-white px-4 py-2'
						onClick={toggleSidebar}>
						Toggle Sidebar
					</button>
					<p>Main Content</p>
				</main>
			</div>
		);
	};
};
export default Sidebar;

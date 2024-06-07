import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { DataContext } from "@/utils/context/ContextAPI";
import axios from "axios";
import { Pagination } from "@mui/material";

function AuthorDetails() {
	const { JournalistList, setBlogs, blogs } = useContext(DataContext);
	const searchParams = useSearchParams();
	const JournalistId = searchParams.get("id");
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [search, setSearch] = useState("");
	const [user, setUser] = useState();

	const getBlogs = async () => {
		await axios
			.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/get-all-by-journalist`, {
				params: {
					page: page,
					limit: 10,
					search: search,
					id: JournalistId,
				},
			})
			.then((res) => {
				console.log(res.data);
				setBlogs(res.data.data);
				setTotalPage(res.data.totalPage);
			})
			.catch((err) => toast.error(err.data.message));
	};
	useEffect(() => {
		if (JournalistId) {
			const user = JournalistList.filter((user) => user._id === JournalistId);
			setUser(user[0]);
			getBlogs();
		}
	}, [page, search, JournalistId]);

	return (
		<section className="author-section pt-100 pb-100">
			<div className="container">
				<div className="row gy-5">
					<div className="col-lg-8">
						<div className="author-details">
							<img
								className="image"
								width="100px"
								height="100px"
								src={user?.profilePic}
								alt="image"
							/>
							<div className="author-info">
								<h2>{user?.name}</h2>

								<p>{user?.intro}</p>
								<ul className="meta-list">
									<li>
										<img src="assets/images/icons/total-post.svg" alt="image" />
										Total Blogs: <span>{user?.blogCount}</span>
									</li>
								</ul>
							</div>
						</div>

						{blogs.map((item, i) => {
							const { _id, name, title, content, thumbnail, createdAt } = item;

							const date = new Date(createdAt);
							const day = date.getDate();
							const month = date.toLocaleDateString("en-US", { month: "long" });
							return (
								<div key={i} className="blog-list-2">
									<div className="date">
										<h3>{day}</h3>
										<p>{month}</p>
									</div>
									<div className="content">
										<ul>
											<li>
												<a>By &nbsp;{user?.name}</a>
											</li>
										</ul>
										<h4>
											<a>{title}</a>
										</h4>
										<div className="bottom-area">
											<Link legacyBehavior href={`/blog-details?id=${_id}`}>
												<a className=" eg-btn arrow-btn">
													View Details
													<i className="bi bi-arrow-right" />
												</a>
											</Link>
										</div>
									</div>

									<a className="image">
										<img src={thumbnail} alt="imgs" />
									</a>
								</div>
							);
						})}
						{/* pagiantion */}
						{totalPage > 1 && (
							<Pagination
								count={totalPage}
								variant="outlined"
								onChange={(e, page) => setPage(page)}
								sx={{
									mx: "auto",
									justifyContent: "center",
									display: "flex",
									color: "red",
								}}
							/>
						)}
					</div>
					<div className="col-lg-4">
						<div className="post-side-bar-1">
							<div className="sidebar-widget-1">
								<h6 className="title">Quick Search</h6>
								<div className="search-box-2">
									<form>
										<input
											type="text"
											onChange={(e) => setSearch(e.target.value)}
											placeholder="Search here..."
										/>
										<button>
											<i className="bi bi-search" />
										</button>
									</form>
								</div>
							</div>

							<div
								className="sidebar-widget-1"
								style={{
									display:
										user?.facebook == "" &&
										user?.twitter == "" &&
										user?.pinterest == "" &&
										user?.instagram == ""
											? "none"
											: "block",
								}}
							>
								<h6 className="title">Stay Conected</h6>
								<ul className="social-3">
									<li
										style={{
											display: user?.facebook == "" ? "none" : "block",
										}}
									>
										<a target="_blank" href={user?.facebook}>
											<span>
												<i className="bx bxl-facebook" />
												Facebook
											</span>
										</a>
									</li>
									<li
										style={{
											display: user?.twitter == "" ? "none" : "block",
										}}
									>
										<a target="_blank" href={user?.twitter}>
											<span>
												<i className="bx bxl-twitter" />
												&nbsp;Twitter
											</span>
										</a>
									</li>
									<li
										style={{
											display: user?.pinterest == "" ? "none" : "block",
										}}
									>
										<a target="_blank" href={user?.pinterest}>
											<span>
												<i className="bx bxl-pinterest-alt" />
												&nbsp;Pinterest
											</span>
										</a>
									</li>
									<li
										style={{
											display: user?.instagram == "" ? "none" : "block",
										}}
									>
										<a target="_blank" href={user?.instagram}>
											<span>
												<i className="bx bxl-instagram" />
												Instagram
											</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AuthorDetails;

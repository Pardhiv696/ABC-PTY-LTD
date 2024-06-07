import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, EffectFade } from "swiper";
import { useContext, useEffect, useMemo } from "react";
import Link from "next/link";
import { DataContext } from "@/utils/context/ContextAPI";
SwiperCore.use([Navigation, Autoplay, EffectFade]);

function AuthorFeature() {
	const { getJournalistList, JournalistList } = useContext(DataContext);
	useEffect(() => {
		getJournalistList();
	}, []);
	const slider = useMemo(() => {
		return {
			slidesPerView: "auto",
			speed: 1500,
			spaceBetween: 30,

			loop: false,
			autoplay: {
				delay: 3000, // Autoplay duration in milliseconds
			},
			navigation: {
				nextEl: ".author1-next",
				prevEl: ".author1-prev",
			},
			breakpoints: {
				280: {
					slidesPerView: 1,
				},
				386: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
				1400: {
					slidesPerView: 4,
				},
			},
		};
	}, []);
	return (
		<section className="author-section">
			<div className="author-bg bg-two for-padding">
				<div className="container">
					<div className="row align-items-center mb-40">
						<div className="col-lg-9">
							<div className="section-title-2">
								<div className="titel">
									<h4>Featured Author</h4>
									<div className="dash" />
								</div>
							</div>
						</div>
						<div className="col-lg-3 d-flex justify-content-end">
							<div className="slider-arrows arrow-style-2 text-center d-lg-flex d-none flex-row justify-content-center align-items-center gap-4">
								<div
									className="author1-next swiper-next-arrow"
									tabIndex={0}
									role="button"
									aria-label="Next slide"
								>
									<i className="bi bi-arrow-left" />
								</div>
								<div
									className="author1-prev swiper-prev-arrow"
									tabIndex={0}
									role="button"
									aria-label="Previous slide"
								>
									<i className="bi bi-arrow-right" />
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							{JournalistList?.length > 0 ? (
								<Swiper {...slider} className="swiper author-1-slider">
									<div className="swiper-wrapper">
										{JournalistList?.map((user) => {
											return (
												<SwiperSlide className="swiper-slide">
													<div className="author-2">
														<div className="image-area">
															<a style={{ height: "200px" }}>
																<img
																	src={user?.profilePic}
																	height={"100%"}
																	alt="image"
																/>
															</a>

															<div className="social-area">
																<ul>
																	<li>
																		<a
																			href={
																				user?.facebook
																					? user?.facebook
																					: "https://www.facebook.com/"
																			}
																		>
																			<i className="bx bxl-facebook" />
																		</a>
																	</li>
																	<li>
																		<a
																			href={
																				user?.twitter
																					? user?.twitter
																					: "https://www.twitter.com/"
																			}
																		>
																			<i className="bx bxl-twitter" />
																		</a>
																	</li>
																	<li>
																		<a
																			href={
																				user?.pinterest
																					? user?.pinterest
																					: "https://www.pinterest.com/"
																			}
																		>
																			<i className="bx bxl-pinterest-alt" />
																		</a>
																	</li>
																	<li>
																		<a
																			href={
																				user?.instagram
																					? user?.instagram
																					: "https://www.instagram.com/"
																			}
																		>
																			<i className="bx bxl-instagram" />
																		</a>
																	</li>
																</ul>
															</div>
														</div>
														<div className="info">
															<h4>
																<Link legacyBehavior href="/author-details">
																	<a>{user?.name}</a>
																</Link>
															</h4>
															<span>{user?.blogCount} Blogs</span>
														</div>
													</div>
												</SwiperSlide>
											);
										})}
									</div>
								</Swiper>
							) : (
								"No Author"
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AuthorFeature;

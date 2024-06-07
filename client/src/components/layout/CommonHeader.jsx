import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

function CommonHeader({ state, dispatch }) {
	const headerRef = useRef(null);
	const curerntRoute = useRouter().pathname;
	const toggleMenu = (menu) => {
		dispatch({ type: "TOGGLE_MENU", menu });
	};
	const handleRightSidebarToggle = () =>
		dispatch({ type: "TOGGLE_RIGHT_SIDEBAR" });
	const handleLeftSidebarToggle = () =>
		dispatch({ type: "TOGGLE_LEFT_SIDEBAR" });
	const handelSearchModal = () => dispatch({ type: "TOGGLE_SEARCH_MODAL" });
	const handleScroll = () => {
		const { scrollY } = window;
		dispatch({ type: "SET_SCROllY", payload: scrollY });
	};
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<>
			<div className={`mobile-search ${state.isModal ? "slide" : ""}`}>
				<div className="container">
					<div className="row d-flex justify-content-center gy-4">
						<div className="col-10">
							<label>What are you looking for?</label>
							<input type="text" placeholder="Search Blog, Magazin" />
						</div>
						<div className="col-2 d-flex justify-content-end align-items-sm-center align-items-end gap-2">
							<div className="search-cross-btn">
								<i className="bi bi-search" />
							</div>
							<div className="search-cross-btn" onClick={handelSearchModal}>
								<i className="bi bi-x-lg" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<header
				ref={headerRef}
				className={`header-area style-1 sibling-2 ${
					state.scrollY > 10 ? "sticky" : ""
				}`}
			>
				<div className="container d-flex justify-content-center align-items-center">
					{/* <div
            className="sidebar-button  mobile-menu-btn d-lg-flex d-none"
            onClick={handleRightSidebarToggle}
          >
            <span />
            <span />
            <span />
          </div> */}
					<div className="header-resp-logo d-lg-none d-flex">
						<Link legacyBehavior href="/">
							<a>
								<img
									alt="image"
									className="img-fluid"
									src="assets/images/logo/logo-2.svg"
								/>
							</a>
						</Link>
					</div>
					<div
						className={`main-nav ${state.isleftSidebarOpen ? "show-menu" : ""}`}
					>
						<div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
							<div className="mobile-logo-wrap">
								<Link legacyBehavior href="/">
									<a>
										<img
											alt="image"
											className="img-fluid"
											src="assets/images/logo/logo-2.svg"
										/>
									</a>
								</Link>
							</div>
							<div className="menu-close-btn" onClick={handleLeftSidebarToggle}>
								<i className="bi bi-x-lg text-dark" />
							</div>
						</div>
						<ul className="menu-list">
							<li className="menu-item-has-children">
								<Link legacyBehavior href="/">
									<a>Home</a>
								</Link>
							</li>
							<li className="menu-item-has-children">
								<Link legacyBehavior href="/about">
									<a className={curerntRoute === "/about" ? "active" : ""}>
										About
									</a>
								</Link>
							</li>
							<li className="menu-item-has-children">
								<Link legacyBehavior href="/blogs">
									<a className={curerntRoute === "/blogs" ? "active" : ""}>
										All Blogs
									</a>
								</Link>
							</li>

							<li className="menu-item-has-children">
								<Link legacyBehavior href="/author">
									<a className={curerntRoute === "/author" ? "active" : ""}>
										Authors
									</a>
								</Link>
							</li>
							<li>
								<Link legacyBehavior href="/contact">
									<a className={curerntRoute === "/contact" ? "active" : ""}>
										Contact
									</a>
								</Link>
							</li>
							<li>
								<Link legacyBehavior href="/verify">
									<a className={curerntRoute === "/verify" ? "active" : ""}>
										Verification
									</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</header>
		</>
	);
}

export default CommonHeader;

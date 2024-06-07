import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function CommonFooter() {
	return (
		<footer className="style-1">
			<div className="container">
				<div className="row justify-content-start align-items-start pt-90 pb-90 gy-5">
					<div className="col-xl-3 col-lg-3 col-md-6">
						<div className="footer-info">
							<Link legacyBehavior href="/">
								<Typography
									sx={{
										fontSize: "1.5rem",
										fontWeight: "bold",
										cursor: "pointer",
										textDecoration: "none",
										color: "black",
									}}
								>
									ABC PTY LTD
								</Typography>
							</Link>
							<h3>We Would Love to Hear From You.</h3>
						</div>
						<div className="footer-form">
							<p>Any question for us?</p>
							<form>
								<div className="form-inner">
									<input type="email" placeholder="Enter Your Email..." />
									<button type="text">Send</button>
								</div>
							</form>
						</div>
					</div>
					<div className="col-xl-4 col-lg-5 col-md-6"></div>
					<div className="col-xl-3 col-lg-2 col-md-6 col-sm-6 col-6">
						<h4 className="footer-title">Quick Link</h4>
						<ul className="footer-list">
							<li>
								<Link legacyBehavior href="/about">
									<a>About</a>
								</Link>
							</li>
							<li>
								<Link legacyBehavior href="/author">
									<a>Authors</a>
								</Link>
							</li>
							<li>
								<Link legacyBehavior href="/blogs">
									<a>Blog</a>
								</Link>
							</li>
							<li>
								<Link legacyBehavior href="/contact">
									<a>Contact</a>
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
						<h4 className="footer-title">Social Media</h4>
						<ul className="social-2">
							<li>
								<a href="https://www.facebook.com/">
									<div className="icon">
										<i className="bx bxl-facebook" />
										<span>5.5k</span>
									</div>
									<p>Facebook</p>
								</a>
							</li>
							<li>
								<a href="https://www.twitter.com/">
									<div className="icon">
										<i className="bx bxl-twitter" />
										<span>5.5k</span>
									</div>
									<p>Twitter</p>
								</a>
							</li>
							<li>
								<a href="https://www.pinterest.com/">
									<div className="icon">
										<i className="bx bxl-pinterest" />
										<span>5.5k</span>
									</div>
									<p>Pinterest</p>
								</a>
							</li>
							<li>
								<a href="https://www.instagram.com/">
									<div className="icon">
										<i className="bx bxl-instagram" />
										<span>5.5k</span>
									</div>
									<p>Instagram</p>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="help-center d-flex justify-content-md-between justify-content-center align-items-center">
					<h5>
						<Link legacyBehavior href="/contact">
							<a>Help Center</a>
						</Link>
					</h5>
					<ul className="help-list">
						<li>
							<a href="#">Privacy Policy</a>
						</li>
						<li>
							<a href="#">Terms &amp; Conditions</a>
						</li>
						<li>
							<a href="#">Services</a>
						</li>
						<li>
							<Link legacyBehavior href="/contact">
								<a>Help</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default CommonFooter;

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, EffectFade } from "swiper";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
SwiperCore.use([Navigation, Autoplay, EffectFade]);

function Hero() {
  const [featuredPost, setFeaturedPost] = useState([]);
  const getFeaturedPost = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/get-featured`)
      .then((res) => {
        console.log(res.data);
        setFeaturedPost(res.data.data);
      })
      .catch((err) => toast.error(err.data?.message));
  };
  useEffect(() => {
    getFeaturedPost();
  }, []);
  const slider = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 10,
      effect: "fade",
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
      },
    };
  }, []);
  return (
    <div className="hero2">
      {featuredPost?.length > 0 && (
        <Swiper {...slider} className="swiper hero2-slider">
          <div className="swiper-wrapper">
            {featuredPost?.map((user) => {
              return (
                <SwiperSlide className="swiper-slide">
                  <div className="banner-wrapper">
                    <div className="banner-img">
                      <img src={user?.thumbnail} alt="" />
                    </div>
                    <div className="banner-conntent">
                      {/* <div className="author-img">
                        <a className="author">
                          <img
                            src="assets/images/authors/author-3.jpg"
                            alt=""
                          />
                        </a>
                      </div> */}
                      <Link legacyBehavior href="/blog-standard">
                        <a>{new Date(user?.createdAt).toLocaleDateString()}</a>
                      </Link>
                      <h1>
                        <a>{user?.title}</a>
                      </h1>
                      <ul className="blog-meta">
                        <li>
                          <svg
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8 0C3.60594 0 0 3.60594 0 8C0 12.3941 3.60594 16 8 16C12.3941 16 16 12.3941 16 8C16 3.60594 12.3941 0 8 0ZM11.646 3.69106C11.8291 3.508 12.1259 3.508 12.3089 3.69106C12.492 3.87413 12.492 4.17091 12.3089 4.35397C12.1259 4.53703 11.8291 4.53703 11.646 4.35397C11.463 4.17091 11.463 3.87413 11.646 3.69106ZM7.53125 2.375C7.53125 2.11591 7.74091 1.90625 8 1.90625C8.25909 1.90625 8.46875 2.11591 8.46875 2.375V3.3125C8.46875 3.57159 8.25909 3.78125 8 3.78125C7.74091 3.78125 7.53125 3.57159 7.53125 3.3125V2.375ZM2.375 8.46875C2.11591 8.46875 1.90625 8.25909 1.90625 8C1.90625 7.74091 2.11591 7.53125 2.375 7.53125H3.3125C3.57159 7.53125 3.78125 7.74091 3.78125 8C3.78125 8.25909 3.57159 8.46875 3.3125 8.46875H2.375ZM4.35397 12.3089C4.17091 12.492 3.87413 12.492 3.69106 12.3089C3.508 12.1259 3.508 11.8291 3.69106 11.646C3.87413 11.4629 4.17091 11.4629 4.35397 11.646C4.53703 11.8291 4.53703 12.1259 4.35397 12.3089ZM4.35397 4.35397C4.17091 4.53703 3.87413 4.53703 3.69106 4.35397C3.508 4.17091 3.508 3.87413 3.69106 3.69106C3.87413 3.508 4.17091 3.508 4.35397 3.69106C4.53703 3.87413 4.53703 4.17091 4.35397 4.35397ZM8.46875 13.625C8.46875 13.8841 8.25909 14.0938 8 14.0938C7.74091 14.0938 7.53125 13.8841 7.53125 13.625V12.6875C7.53125 12.4284 7.74091 12.2188 8 12.2188C8.25909 12.2188 8.46875 12.4284 8.46875 12.6875V13.625ZM11.1439 11.1439C10.9608 11.327 10.6642 11.327 10.4811 11.1439L7.66856 8.33141C7.58069 8.24353 7.53125 8.1245 7.53125 8V5.1875C7.53125 4.92841 7.74091 4.71875 8 4.71875C8.25909 4.71875 8.46875 4.92841 8.46875 5.1875V7.80591L11.1439 10.4811C11.327 10.6642 11.327 10.9608 11.1439 11.1439ZM12.3089 12.3089C12.1259 12.492 11.8291 12.492 11.646 12.3089C11.463 12.1259 11.463 11.8291 11.646 11.646C11.8291 11.4629 12.1259 11.4629 12.3089 11.646C12.492 11.8291 12.492 12.1259 12.3089 12.3089ZM14.0938 8C14.0938 8.25909 13.8841 8.46875 13.625 8.46875H12.6875C12.4284 8.46875 12.2188 8.25909 12.2188 8C12.2188 7.74091 12.4284 7.53125 12.6875 7.53125H13.625C13.8841 7.53125 14.0938 7.74091 14.0938 8Z"></path>
                          </svg>
                          5 Min reads
                        </li>
                      </ul>
                      <div className="btn-and-social">
                        <Link
                          legacyBehavior
                          href={`/blog-details?id=${user?._id}`}
                        >
                          <a className="eg-btn btn--primary-2 btn--md">
                            View Details
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      )}
    </div>
  );
}

export default Hero;

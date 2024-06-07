import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, EffectFade } from "swiper";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
SwiperCore.use([Navigation, Autoplay, EffectFade]);

function TrandingArticle() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");

  const getAllBlogs = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/get-all`, {
        params: {
          page: page,
          limit: 10,
          search: search,
        },
      })
      .then((res) => {
        setTotalPage(res.data.totalPage);
        setBlogs(res.data.data);
      })
      .catch((err) => toast.error(err.data.message));
  };
  useEffect(() => {
    getAllBlogs();
  }, [search, page]);
  const slider = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 30,

      loop: true,
      autoplay: {
        delay: 3000, // Autoplay duration in milliseconds
      },
      navigation: {
        nextEl: ".entire-next",
        prevEl: ".entire-prev",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        386: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 3,
        },
      },
    };
  });
  return (
    <div className="home-two-trending-post">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 mb-40">
            <div className="section-title-2 three">
              <div className="titel text-center">
                <h4>Trending Article</h4>
                <div className="dash" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            {blogs?.length > 0 ? (
              <Swiper {...slider} className="swiper trending-article2">
                {blogs?.map(({ _id, thumbnail, title, createdAt }, i) => {
                  return (
                    <div className="swiper-wrapper">
                      <SwiperSlide className="swiper-slide">
                        <div className="trending-article-card-2">
                          <div className="article-img">
                            <a>
                              <img src={thumbnail} alt="" />
                            </a>
                          </div>
                          <div className="article-content">
                            <h5>
                              <a>{title}</a>
                            </h5>
                            <div className="publish-date">
                              <Link legacyBehavior href="/blog-standard">
                                <a>
                                  {new Date(createdAt).toLocaleDateString()}
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </div>
                  );
                })}
              </Swiper>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrandingArticle;

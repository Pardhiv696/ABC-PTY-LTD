import { Pagination } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Blogs() {
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

  return (
    <section className="blog-classic pt-100 pb-100">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-8">
            <div className="row g-4">
              {blogs?.length !== 0
                ? blogs?.map(({ _id, thumbnail, title, createdAt }, i) => {
                    return (
                      <div className="col-md-6">
                        <div className="blog-grid-1">
                          <a className="image">
                            <img src={thumbnail} alt="image" />
                          </a>

                          <div className="content">
                            <ul>
                              <li>
                                <Link legacyBehavior href="/blog-standard">
                                  <a>
                                    {new Date(createdAt).toLocaleDateString()}
                                  </a>
                                </Link>
                              </li>
                            </ul>
                            <h4>
                              <a>{title}</a>
                            </h4>
                            <div className="bottom-area">
                              <Link
                                legacyBehavior
                                href={`/blog-details?id=${_id}`}
                              >
                                <a className=" eg-btn arrow-btn">
                                  View Details
                                  <i className="bi bi-arrow-right" />
                                </a>
                              </Link>
                              <span>
                                {" "}
                                <svg
                                  width={9}
                                  height={12}
                                  viewBox="0 0 9 12"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M5.85726 11.3009C7.14547 9.08822 6.60613 6.30362 4.57475 4.68025C4.57356 4.67933 4.57238 4.67818 4.57143 4.6775L4.58021 4.69862L4.57878 4.71446C4.97457 5.72599 4.91905 6.83648 4.43285 7.78924L4.09022 8.461L3.9851 7.71876C3.91368 7.21529 3.71745 6.735 3.41515 6.32382H3.36745L3.3423 6.25495C3.34586 7.02428 3.17834 7.78213 2.8497 8.49704C2.41856 9.43259 2.48191 10.5114 3.01936 11.3833L3.39023 11.9853L2.72299 11.7126C1.62271 11.2628 0.743103 10.3964 0.309587 9.33547C-0.176131 8.15083 -0.0862008 6.77725 0.550429 5.66194C0.882388 5.08179 1.11493 4.46582 1.24187 3.8308L1.36597 3.2084L1.68251 3.76353C1.83366 4.02824 1.94494 4.31476 2.01399 4.61574L2.02111 4.62285L2.02847 4.67107L2.03535 4.669C2.98353 3.45015 3.55158 1.93354 3.6344 0.397865L3.65575 0L4.00076 0.217643C5.4088 1.10544 6.38664 2.52976 6.6887 4.13017L6.69558 4.163L6.69914 4.16805L6.71457 4.14693C6.99053 3.79429 7.13622 3.37485 7.13622 2.93336V2.24967L7.56261 2.7947C8.55398 4.06153 9.06224 5.63301 8.99391 7.21988C8.90991 9.08776 7.85708 10.7272 6.17736 11.6154L5.45008 12L5.85726 11.3009Z" />
                                </svg>
                                2 Min Read
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : "No Data Found"}
            </div>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blogs;

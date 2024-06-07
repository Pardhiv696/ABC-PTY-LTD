import { DataContext } from "@/utils/context/ContextAPI";
import { Pagination } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";

function Author() {
  const { JournalistList, setSearch, totalPage, setPage } =
    useContext(DataContext);
  return (
    <section className="author-section pt-100 pb-100">
      <div className="container">
        <div className="row gy-2 mb-60">
          <div className="col-lg-4">
            <div className="search-box">
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
        <div className="row g-4 mb-60">
          {JournalistList.length !== 0 ? (
            JournalistList?.map((user, i) => {
              return (
                <div key={i} className="col-lg-3 col-md-6 col-sm-6">
                  <div className="author-1">
                    <div className="author-front">
                      <Link legacyBehavior href="/author-details">
                        <a className="image">
                          <img src={user?.profilePic} alt="image" />
                        </a>
                      </Link>
                      <h4>{user?.name}</h4>
                      <ul>
                        <li>
                          <span>Email</span>
                          <span>{user?.email}</span>
                        </li>
                        <li>
                          <span>Wallet Address</span>
                          <span>
                            {user?.walletAddress.slice(0, 6)}
                            {"..."}
                            {user?.walletAddress.slice(-4)}
                          </span>
                        </li>
                        <li>
                          <span>Intro</span>
                          <span>{user?.intro}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="author-back">
                      <ul className="social-list">
                        <li>
                          <a href={user.facebook}>
                            <span>
                              <i className="bx bxl-facebook" />
                              Facebook
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href={user.twitter}>
                            <span>
                              <i className="bx bxl-twitter" />
                              Twitter
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href={user.pinterest}>
                            <span>
                              <i className="bx bxl-pinterest-alt" />
                              Pinterest
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href={user.instagram}>
                            <span>
                              <i className="bx bxl-instagram" />
                              Instagram
                            </span>
                          </a>
                        </li>
                      </ul>
                      <Link
                        legacyBehavior
                        href={`/author-details?id=${user._id}`}
                      >
                        <a className=" eg-btn arrow-btn four">
                          View Details
                          <i className="bi bi-arrow-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>Not Found</>
          )}
        </div>

        <div className="row text-center justify-content-center">
          <div className="col-md-6">
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
        </div>
      </div>
    </section>
  );
}

export default Author;

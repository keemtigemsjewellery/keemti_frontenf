import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

import { getAllBlogsAPI } from "../../utils/api/service/blogService";
import CustomPagination from "components/Common/CustomPagination";
import { useDebounce } from "utils/hooks/useDebounce";

import BlogLoader from "./Loader/BlogLoader";
import { BLOG_ROUTE } from "utils/api/routes/clientRoute";
import { standardDateToBlogDate } from "utils/helper/helper";

const Blog = () => {
  const navigate = useNavigate();
  const clean = (html: string) => DOMPurify.sanitize(html);
  const location = useLocation();

  const [blogListingData, setBlogListingData] = useState<any>();
  const [recentBlogData, setRecentBlogData] = useState<any>();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState("");
  const finalSearchQuery = useDebounce(searchText, 500);

  useEffect(() => {
    setSearchText("");
  }, [location]);

  const blogHandler = async (searchQuery: string) => {
    const params = {
      page: currentPage,
      limit: 10,
      filter: searchQuery ?? "",
    };

    setLoading(true);
    const blogData = await getAllBlogsAPI(params);
    setLoading(false);

    setBlogListingData(blogData?.data?.data);
    setRecentBlogData(blogData?.data?.recentBlogs);
  };

  useEffect(() => {
    blogHandler(finalSearchQuery!);
  }, [finalSearchQuery]);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <section className="inner-page graybg section-space blog-page">
        <div className="container">
          <div className="blog-head">
            <div className="input-group">
              <input
                placeholder="What're you searching for?"
                aria-describedby="button-addon1"
                className="form-control border-0"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText !== "" && (
                <i
                  className="fal fa-times close blog-search-close"
                  onClick={() => setSearchText("")}
                ></i>
              )}
              <div className="input-group-append">
                <button
                  id="button-addon1"
                  type="submit"
                  className="btn btn-link text-primary"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          {!loading ? (
            <div className="row">
              <div className="col-lg-8">
                <div className="row blog-list-row">
                  {blogListingData?.docs &&
                    blogListingData?.docs?.length > 0 && (
                      <>
                        {blogListingData?.docs?.map(
                          (blog: any, idx: number) => {
                            return (
                              <div
                                className="col-md-6 blog-block-wrap"
                                key={idx}
                                onClick={() =>
                                  navigate(
                                    `${BLOG_ROUTE.BLOG_DETAILS.replace(
                                      ":blogSlug",
                                      `${blog?.slug}`
                                    )}`
                                  )
                                }
                              >
                                <div className="blog-block">
                                  <div className="post-img">
                                    <img
                                      src={blog?.blogImage}
                                      alt="Budget-Friendly Diamonds Under 20k!"
                                    />
                                    <div className="overlay">
                                      <div className="overlay-content">
                                        <a>
                                          <i className="fal fa-link"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="post-content">
                                    <div className="post-author">
                                      <a>
                                        {blog?.createdBy?.firstName +
                                          " " +
                                          blog?.createdBy?.lastName}
                                      </a>
                                      <div>
                                        {" "}
                                        {blog?.createdAt &&
                                          standardDateToBlogDate(
                                            blog?.createdAt
                                          )}
                                      </div>
                                    </div>

                                    <a className="post-title">
                                      <h2>{blog?.title}</h2>
                                    </a>

                                    <div className="post-content-detail">
                                      {blog && parse(clean(blog?.description))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </>
                    )}
                </div>
                {blogListingData?.totalPages > 1 && (
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center mt-0 mb-3 mb-lg-0 mt-lg-3">
                      <CustomPagination
                        currentPage={currentPage}
                        totalPages={blogListingData?.totalPages}
                        onPageChange={handlePageChange}
                      />
                    </ul>
                  </nav>
                )}
              </div>
              <div className="col-lg-4 ps-xl-5 ps-lg-3 mt-4 mt-lg-0">
                <div className="blog-sidebar">
                  <div className="recent-blogs mb-5">
                    {recentBlogData && recentBlogData?.length > 0 && (
                      <>
                        <h3 className="widget-title">Related Blogs</h3>
                        <ul>
                          {recentBlogData?.map((blog: any, idx: number) => {
                            return (
                              <li
                                key={idx}
                                onClick={() =>
                                  navigate(
                                    `${BLOG_ROUTE.BLOG_DETAILS.replace(
                                      ":blogSlug",
                                      `${blog?.slug}`
                                    )}`
                                  )
                                }
                              >
                                <div className="blog-thumb">
                                  <div>
                                    <img
                                      src={blog?.blogImage}
                                      alt="Budget-Friendly Diamonds Under 20k!"
                                    />
                                    <div className="overlay">
                                      <div className="overlay-content">
                                        <i className="fal fa-link"></i>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="blog-content">
                                  <span className="post-category">
                                    <a>jewellery</a>
                                  </span>
                                  <a className="post-title">
                                    <h6>{blog?.title}</h6>
                                  </a>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <BlogLoader />
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;

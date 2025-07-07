import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import { getBlogDetailsBySlugAPI } from "../../utils/api/service/blogService";

import { BLOG_ROUTE } from "utils/api/routes/clientRoute";
import { standardDateToBlogDate } from "utils/helper/helper";

const BlogDetails = () => {
  const { blogSlug } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const clean = (html: string) => DOMPurify.sanitize(html);

  const [blogDetailsData, setBlogDetailsData] = useState<any>();

  const blogDetailsHandler = async () => {
    const { data } = await getBlogDetailsBySlugAPI(blogSlug);
    setBlogDetailsData(data?.data);
  };

  useEffect(() => {
    blogDetailsHandler();
  }, [blogSlug, pathname]);

  return (
    <>
      <section className="inner-page graybg section-space blog-page blog-detail-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-detail">
                <article className="post-item">
                  <div className="post-thumb">
                    <img
                      src={blogDetailsData?.blogImage}
                      alt="Podcast: Creating a better CX Community"
                    />
                  </div>
                  <h2 className="post-title">
                    Podcast: {blogDetailsData?.title}
                  </h2>
                  <div className="post-meta-data">
                    <div className="post-author">
                      {/* <a>
                        {blogDetailsData?.createdBy?.firstName +
                          " " +
                          blogDetailsData?.createdBy?.lastName}
                      </a> */}
                      <a>
                        {blogDetailsData?.createdAt &&
                          standardDateToBlogDate(blogDetailsData?.createdAt)}
                      </a>
                    </div>
                    <div className="post-meta-right">
                      {blogDetailsData?.tags?.length > 0 &&
                        typeof blogDetailsData?.tags !== "string" &&
                        blogDetailsData?.tags?.map((item: any, idx: number) => {
                          return (
                            <span className="categories" key={idx}>
                              <a>{item}</a>
                            </span>
                          );
                        })}
                      {/* <a className="post-comment">
                        <i className="fal fa-comment-lines"></i>0
                      </a> */}
                    </div>
                  </div>
                  <div className="post-content">
                    <div>
                      {blogDetailsData &&
                        parse(clean(blogDetailsData?.description))}
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div className="col-lg-4 ps-xl-5 ps-lg-3 mt-4 mt-lg-0">
              <div className="blog-sidebar">
                <div
                  className={`recent-blogs ${
                    blogDetailsData?.relatedBlogs?.length > 0 && "mb-5"
                  }`}
                >
                  <ul>
                    {blogDetailsData?.relatedBlogs &&
                      blogDetailsData?.relatedBlogs?.length > 0 && (
                        <>
                          <h3 className="widget-title">Related Blogs</h3>
                          {blogDetailsData?.relatedBlogs?.map(
                            (relatedBlog: any, idx: number) => {
                              return (
                                <li key={idx}>
                                  <div className="blog-thumb">
                                    <div>
                                      <img
                                        src={relatedBlog?.blogImage}
                                        alt="How collaboration makes us better designers"
                                      />
                                      <div className="overlay">
                                        <div className="overlay-content">
                                          <a>
                                            <i className="fal fa-link"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="blog-content">
                                    <span className="post-category">
                                      <a>jewellery</a>
                                    </span>
                                    <a
                                      className="post-title"
                                      onClick={() =>
                                        navigate(
                                          `${BLOG_ROUTE.BLOG_DETAILS.replace(
                                            ":blogSlug",
                                            `${relatedBlog?.slug}`
                                          )}`
                                        )
                                      }
                                    >
                                      <h6>{relatedBlog?.title}</h6>
                                    </a>
                                  </div>
                                </li>
                              );
                            }
                          )}
                        </>
                      )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;

import React from "react";
import styles from "./Blogs.module.css";
import Blog from "../blog/Blog";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../shared-components/Loader/Loader";
import { blogsActions } from "../../../store/blogsSlice";
const Blogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const blogs = useSelector((store) => store.blogs);
  useEffect(() => {
    fetch("https://localhost:7254/api/blogs/get-all-blogs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const blogsData = data.result;
        dispatch(blogsActions.addBlogs(blogsData));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className="mt-4 pe-5"
      style={{
        maxHeight: "100vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <h1 className={`${styles.card} ${styles.dsmGradientText}`}>
        Mental Health Blogs - Get the latest Insights and Advice from the Best
        Psychologists and Counselors
      </h1>
      <div>
        {blogs.length == 0 && <h1>Sorry. No blogs yet...</h1>}
        {blogs.length > 0 &&
          blogs.map((blog) => (
            <div>
              <Blog key={blog.id} blog={blog} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blogs;

import React, { useEffect, useState } from "react";
import styles from "./PersonalBlogs.module.css";
import PersonalBlog from "../personal-blog/PersonalBlog";
import CreateBlog from "../create-blog/CreateBlog";
import { useSelector } from "react-redux";
function PersonalBlogs() {
  const [isPosted, setIsPosted] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const storeAuthUser = useSelector((store) => store.authUser);
  const handleIsPosted = () => {
    setIsPosted(!isPosted);
  };
  useEffect(() => {
    fetch(
      `https://localhost:7254/api/blogs/get-individuals-blog/${storeAuthUser.userId}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.result != null) {
          setBlogs(data.result);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    
  }, [isPosted, blogs, storeAuthUser]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center mt-3 pe-5"
      style={{ height: "100vh" }}
    >
      <CreateBlog handleIsPosted={handleIsPosted} />

      <div
        className="overflow-auto w-100 d-flex flex-column align-items-center pt-3"
        style={{
          maxHeight: "100%",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {blogs.length == 0 && (
          <h1 className="text-center">Sorry. No blogs yet...</h1>
        )}
        {blogs !== null &&
          blogs.length > 0 &&
          blogs.map((blog) => (
            <div key={blog.id} className="mb-4" style={{ width: "70%" }}>
              <PersonalBlog blog={blog} handleIsPosted={handleIsPosted}/>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PersonalBlogs;

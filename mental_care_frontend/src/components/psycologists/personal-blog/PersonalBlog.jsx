import React from "react";
import styles from "./PersonalBlog.module.css";
import { Link } from "react-router-dom";
function PersonalBlog({ blog }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <div className={`${styles.card}`}>
      <div className="row">
        <div className="col-1">
          <img
            src={blog.profilePicture}
            className="rounded-circle w-75 h-75"
            alt="Profile"
          />
        </div>
        <div className="col-11">
          <div className="row">
            <div className="col-8">
              <h3>{blog.title}</h3>
              <span>
                <button className="btn btn-primary me-2">Edit</button>
                <button className="btn btn-danger">Delete</button>
                <br />
                <br />
              </span>
            </div>
            <div className="col-4 d-flex justify-content-end">
              {formatDate(blog.createdDate)}
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className="row">
        {blog.description != null && (
          <div className="p-3">{blog.description}</div>
        )}
        {blog.image != null && (
          <div className="col d-flex justify-content-center ">
            <img className="w-75 h-75" src={blog.image} />{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalBlog;

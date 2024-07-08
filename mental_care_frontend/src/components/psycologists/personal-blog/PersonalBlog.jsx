import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div
      className="card p-3 mb-4 border rounded"
      style={{ height: "100%", width: "100%" }} // Set width to 100% to match the parent
    >
      <div className="row">
        <div className="col-2 col-md-1">
          <img
            src={blog.profilePicture}
            className="rounded-circle img-fluid"
            alt="Profile"
          />
        </div>
        <div className="col-10 col-md-11">
          <div className="row">
            <div className="col-12 col-md-8">
              <h3>{blog.title}</h3>
              <span>
                <button className="btn btn-primary me-2">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </span>
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-end align-items-start">
              {formatDate(blog.createdDate)}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        {blog.description && (
          <div className="col-12 p-3">{blog.description}</div>
        )}
        {blog.image && (
          <div className="col-12 d-flex justify-content-center">
            <img
              className="img-fluid"
              src={blog.image}
              alt="Blog"
              style={{ maxHeight: "200px" }} // Adjust maxHeight as needed
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalBlog;

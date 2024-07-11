import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
function PersonalBlog({ blog, handleIsPosted }) {
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://localhost:7254/api/blogs/delete-blog/${id}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            // Handle success,
            const data = await response.json();
            if (data.isSuccess) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your blog has been deleted.",
                showConfirmButton: false,
                timer: 1500,
              });
              handleIsPosted();
            } else {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to delete the blog. Please try again!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Failed to delete the blog. Please try again!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to delete the blog. Please try again!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div
      className="card p-3 mb-4 border rounded"
      style={{ height: "100%", width: "100%" }}
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
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
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
              style={{ maxHeight: "200px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalBlog;

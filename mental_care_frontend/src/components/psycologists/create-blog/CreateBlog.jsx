import React from "react";

function CreateBlog() {
  return (
    <div className="card" style={{ width: "70%" }}>
      <div className="card-header d-flex justify-content-center">
        <h3>CREATE BLOG</h3>
      </div>
      <div className="card-body">
        <div className="row pb-2">
          <div class="form-group col-md-6">
            <label for="title">
              <b>TITLE</b>
            </label>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="Type your title here..."
            />
          </div>
          <div class="form-group col-md-6">
            <label for="blogImage">
              <b>UPLOAD IMAGE</b>
            </label>
            <input type="file" class="form-control" id="blogImage" />
          </div>
        </div>
        <div className="row">
          <div class="form-group col-md-10">
            <label for="description">
              <b>DESCRIPTION</b>
            </label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              placeholder="Provide description here..."
            />
          </div>
          <div className="col-md-2">
            <div className="pt-4 d-flex justify-content-start ">
              {" "}
              <button
                className="btn btn-primary"
                style={{ width: "150px", height: "50px" }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;

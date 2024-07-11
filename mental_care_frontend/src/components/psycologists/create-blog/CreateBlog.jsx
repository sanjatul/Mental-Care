import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
function CreateBlog({ handleIsPosted }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const storeAuthUser = useSelector((store) => store.authUser);
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    setAuthUser(storeAuthUser);
  }, [storeAuthUser]);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile);
    formData.append("userId", storeAuthUser.userId);

    try {
      const response = await fetch(
        "https://localhost:7254/api/blogs/Create-blog",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        // Handle success,
        const data = await response.json();
        if (data.isSuccess == false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Try again!",
          });
        } else if (data.isSuccess == true) {
          handleIsPosted();
          Swal.fire({
            title: "Good job!",
            text: "Blog Created Sucessfully",
            icon: "success",
          });
          setDescription("");
          setImageFile(null);
          setTitle("");
        }
      } else {
        console.log("api not hit");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Try again!",
        });
      }
    } catch (error) {
      console.error("Error during blog creation:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  return (
    <form style={{ width: "70%" }} onSubmit={handleSubmit}>
      <div className="card">
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
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type your title here..."
              />
            </div>
            <div class="form-group col-md-6">
              <label for="blogImage">
                <b>UPLOAD IMAGE</b>
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                class="form-control"
                id="blogImage"
              />
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
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide description here..."
              />
            </div>
            <div className="col-md-2">
              <div className="pt-4 d-flex justify-content-start ">
                {" "}
                <button
                  className="btn btn-primary"
                  style={{ width: "150px", height: "50px" }}
                  type="submit"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateBlog;

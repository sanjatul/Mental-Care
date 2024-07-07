import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { generalUsersDetailsActions } from "../../../store/generalUsersDetailsSlice";
function UsersList() {
  const disPatch = useDispatch();
  const generalUsers = useSelector((store) => store.generalUsersDetails);
  const [generalUsersDetails, setGeneralUsersDetails] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (generalUsers.length !== 0) {
      setGeneralUsersDetails(generalUsers);
    }
  }, [generalUsers]);
  const column = [
    {
      name: "Profile",
      selector: (row) => (
        <img
          width={70}
          height={70}
          style={{ borderRadius: "50%" }}
          src={row.profilePicture}
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },

    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            onClick={() => handleViewUser(row.id)}
            type="button"
            className="btn btn-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            View Details
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleRemoveUser(row.id)}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];
  const handleViewUser = (userId) => {
    const user = generalUsersDetails.filter((user) => user.id === userId);
    setUser(user);
  };
  const handleRemoveUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7254/api/users/delete-general-user/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to remove user");
            }
            return res.json();
          })
          .then((data) => {
            disPatch(generalUsersDetailsActions.removeGeneralUser({ id: id }));
            Swal.fire({
              title: "Removed!",
              text: "User has been removed.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to remove user");
          });
      }
    });
  };

  return (
    <div>
      <DataTable
        title={<span style={{ fontWeight: "bold" }}>USERS LIST</span>}
        fixedHeader
        fixedHeaderScrollHeight="400px"
        columns={column}
        data={generalUsersDetails}
        highlightOnHover
        pagination
      />
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLabel">
                USER'S DETAILS
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card text-center">
                {user.length > 0 && user[0].profilePicture ? (
                  <img
                    src={user[0].profilePicture}
                    className="card-img-top"
                    style={{ height: "370px" }}
                    alt="..."
                  />
                ) : (
                  <div>No profile picture available</div>
                )}
                <div className="card-body">
                  <diV className="row">
                    <></>
                  </diV>
                  <h4 className="card-title">
                    Name:{" "}
                    {user.length > 0 && user[0].name ? user[0].name : "Name"}
                  </h4>
                  <h5>
                    Email:{" "}
                    {user.length > 0 && user[0].email ? user[0].email : "Email"}
                  </h5>
                  <h5>
                    Contact Number:{" "}
                    {user.length > 0 && user[0].phoneNumber
                      ? user[0].phoneNumber
                      : "Contact Number"}
                  </h5>
                  <h5>
                    Gender:{" "}
                    {user.length > 0 && user[0].gender
                      ? user[0].gender
                      : "Gender"}
                  </h5>
                  <h5>
                    Age: {user.length > 0 && user[0].age ? user[0].age : "Age"}
                  </h5>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersList;

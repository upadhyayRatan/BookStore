import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import getAxiosWithTokenObj from '../AuthorizedRequest/AxiosRequestWithToken'

function AddAuthor() {
  const axiosReqWithToken=getAxiosWithTokenObj()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onAuthorFormSubmit = async(authorObj) => {
    console.log("Author submitted", authorObj);
    let response = await axiosReqWithToken.post("/authors/add-author", authorObj);
    console.log("Add author response",response)
    if (response.data.message === "Author added succesfully") {
      alert(response.data.message);
    } else {
      alert(response.data.message);
    }
  };
  return (
    <div className="row mt-5">
      <h2 className="mx-auto text-center text-dark registerHeading">
        Add Author
      </h2>
      <form className="mx-auto" onSubmit={handleSubmit(onAuthorFormSubmit)}>
        {/* name */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="name@example.com"
            {...register("name", { required: true, minLength: 5 })}
          />
          <label htmlFor="name">Name*</label>
        </div>
        {errors.name?.type === "required" && (
          <p className="">*Name is required</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="">*Minimum length should be 5</p>
        )}

        {/* age*/}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="age"
            placeholder="age@example.com"
            {...register("age", { required: true })}
          />
          <label htmlFor="username">Age*</label>
        </div>
        {errors.age?.type === "required" && (
          <p className="">*Age is required</p>
        )}

        {/* DOB */}
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="dob"
            placeholder="dob@example.com"
            {...register("dob", { required: true })}
          />
          <label htmlFor="email">DOB*</label>
        </div>
        {errors.dob?.type === "required" && (
          <p className="">*DOB is required</p>
        )}

        <button className="btn btn-primary mx-auto">Add Author</button>
      </form>
    </div>
  );
}

export default AddAuthor;

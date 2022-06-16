import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onRegisterFormSubmit = async (userObj) => {
    console.log("Form submitted", userObj);
    // navigate("/userlogin");
    let response = await axios.post("/users/register", userObj);
    console.log("response is", response);
    let payload = response.data;
    console.log("payload is", payload);
    if (payload.message === "User registered succesfully") {
      alert("User registered succesfully");
      //redirect login
      
    } else {
      alert(payload.message);
    }
    navigate("/userlogin");
  };

  return (
    <div className="row mt-5">
      <h2 className="mx-auto text-center text-dark registerHeading">
        Register
      </h2>
      <form
        className="col-11 col-sm-8 col-md-6 mx-auto"
        onSubmit={handleSubmit(onRegisterFormSubmit)}
      >
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

        {/* username */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="username@example.com"
            {...register("username", { required: true, minLength: 6 })}
          />
          <label htmlFor="username">Username*</label>
        </div>
        {errors.username?.type === "required" && (
          <p className="">*Username is required</p>
        )}
        {errors.username?.type === "minLength" && (
          <p className="">*Minimum length should be 6</p>
        )}

        {/* email */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="email@example.com"
            {...register("email", { required: true })}
          />
          <label htmlFor="email">Email*</label>
        </div>
        {errors.name?.type === "required" && (
          <p className="">*email is required</p>
        )}

        {/* Address */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="address@example.com"
            {...register("address", { required: false, minLength: 10 })}
          />
          <label htmlFor="address">Address(optional)</label>
        </div>
        {errors.address?.type === "minLength" && (
          <p className="">*Minimum length should be 10</p>
        )}

        {/* password */}
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="pwd"
            placeholder="pwd@example.com"
            {...register("pwd", { required: true, minLength: 6 })}
          />
          <label htmlFor="pwd">Password*</label>
        </div>
        {errors.pwd?.type === "required" && (
          <p className="">*Password is required</p>
        )}
        {errors.pwd?.type === "minLength" && (
          <p className="">*Password minimum length should be 6</p>
        )}

        {console.log("Erros is", errors)}
        <button className="btn btn-primary mx-auto">SignUp</button>
      </form>
    </div>
  );
}

export default Register;

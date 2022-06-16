import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getAxiosWithTokenObj from "../AuthorizedRequest/AxiosRequestWithToken";
import { useDispatch } from "react-redux";
import ViewBooks from "./ViewBooks";
import { addAuthor ,setAuthors} from "../store/authorSlice";
function AddBooks() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosReqWithToken = getAxiosWithTokenObj();
  // const [count,setCount]=useState(0)
  let dispatch=useDispatch()

  const onBookFormSubmit = async (bookObj) => {
    const bookResponse = await axiosReqWithToken.post(
      "/authors/add-books",
      bookObj
    );
    alert(bookResponse.data.message);
    dispatch(addAuthor())
    //get the books
    let getAllBooks = await axiosReqWithToken.get("/authors/get-authors");
    const books = getAllBooks.data.payload;
    dispatch(setAuthors(books))

    // setCount(count+1)
    // console.log("Count in add book",count)
  };

  return (
    <div className="row mt-5">
      <h2 className="mx-auto text-center text-dark registerHeading">
        Add Books
      </h2>
      <form className="mx-auto" onSubmit={handleSubmit(onBookFormSubmit)}>
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

        {/* Price*/}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="price@example.com"
            {...register("price", { required: true })}
          />
          <label htmlFor="price">Price*</label>
        </div>
        {errors.price?.type === "required" && (
          <p className="">*Price is required</p>
        )}

        {/* Published date */}
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="publishDate"
            placeholder="publishDate@example.com"
            {...register("publishDate", { required: true })}
          />
          <label htmlFor="publishDate">Published On*</label>
        </div>
        {errors.publishDate?.type === "required" && (
          <p className="">*Published date is required</p>
        )}

        {/* author */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="authorName"
            placeholder="authorName@example.com"
            {...register("authorName", { required: true, minLength: 5 })}
          />
          <label htmlFor="authorName">Author Name*</label>
        </div>
        {errors.authorName?.type === "required" && (
          <p className="">*Author Name is required</p>
        )}
        {errors.authorName?.type === "minLength" && (
          <p className="">*Minimum length should be 5</p>
        )}

        <button className="btn btn-primary mx-auto">Add Book</button>
      </form>
    </div>
  );
}

export default AddBooks;

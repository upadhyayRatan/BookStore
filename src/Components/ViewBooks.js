import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import getAxiosWithTokenObj from "../AuthorizedRequest/AxiosRequestWithToken";
import { useSelector, useDispatch } from "react-redux";
import {setAuthors,updateAuthorDelete} from '../store/authorSlice'
function ViewBooks(props) {
  const axiosReqWithToken = getAxiosWithTokenObj();
  let dispatch = useDispatch();
  let {authors}=useSelector(state=>state.author)
  console.log("authors from slice",authors)

  useEffect(async () => {
    let getAllBooks = await axiosReqWithToken.get("/authors/get-authors");
    const books = getAllBooks.data.payload;
    dispatch(setAuthors(books))
  }, []);

  const deleteBook = async(book, author) => {
    const deleteObj={
      book:book,
      author:author
    }
    console.log("DeleteObj",deleteObj)
    let deleteResponse=await axiosReqWithToken.post('/authors/delete-book',deleteObj)
    let updatedAuthor=deleteResponse.data.payload;
    dispatch(updateAuthorDelete(updatedAuthor))
  };
  return (
    <div>
      <table className="table">
        <thead className="tableHead">
          <tr>
            <td>Book name</td>
            <td>Book price</td>
            <td>Published On</td>
            <td>Author name</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {authors.length > 0 ? (
            authors.map((author) => {
              return( author.books !== undefined ? (
                author.books.map((book) => {
                  {
                    console.log("book is", book);
                  }
                  return (
                    <tr>
                      <td>{book.name}</td>
                      <td>{book.price}</td>
                      <td>{book.publishDate}</td>
                      <td>{author.name}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => deleteBook(book, author.name)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              ));
            })
          ) : (
            <>
              <div>
                <h2>No books added</h2>
              </div>
            </>
          )}
        </tbody>
      </table>
      
    </div>
  );
}

export default ViewBooks;


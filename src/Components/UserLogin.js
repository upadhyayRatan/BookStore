import React from 'react'
import {useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { userLogin } from '../store/userSlice';

function UserLogin() {
    let {register,handleSubmit,formState:{errors}}=useForm();
    let navigate=useNavigate();
    const dispatch=useDispatch()
  
    //on Login form submit
    const onLoginFormSubmit=async(userCredentialsObj) =>{
        console.log("user credentials are",userCredentialsObj)
        let response = await axios.get('/users/userlogin',{params :{userObj:userCredentialsObj}})
        alert(response.data.message)
        if(response.data.message === "success"){
            dispatch(userLogin(response.data))
          navigate('/loggedUser')
        }
        else{
          alert("Invalid login")
        }
    }

    return (
        <div className="row mt-5 mx-auto">
            <h1 class="text-dark text-center loginHeading">Login</h1>

            <form  className="col-11 col-sm-8 col-md-6 mx-auto" onSubmit={handleSubmit(onLoginFormSubmit)}>
                
                {/* username */}
                <div className="form-floating mb-3">
                    <input type="text"
                    className="form-control"
                    id="username"
                    placeholder="username@example.com"
                    {...register("username",{required:true,minLength:6})} />
                    <label for="username">Username</label>
                </div>
                {errors.username?.type==='required' && <p className="alert alert-danger">*Username is required</p>}
                {errors.username?.type==='minLength' && <p className="alert alert-danger">*Minimum length should be 6</p>}

                             
                {/* password */}
                <div className="form-floating mb-3">
                    <input type="password"
                    className="form-control"
                    id="pwd"
                    placeholder="pwd@example.com"
                    {...register("pwd",{required:true,minLength:6})} />
                    <label for="pwd">Password</label>
                </div>
                {errors.pwd?.type==='required' && <p className="alert alert-danger">*Password is required</p>}
                {errors.pwd?.type==='minLength' && <p className="alert alert-danger">*Minimum length should be 6</p>}

                <button className="btn btn-primary loginButton mx-auto">Login</button>
            </form>
            
        </div>
    )
}

export default UserLogin

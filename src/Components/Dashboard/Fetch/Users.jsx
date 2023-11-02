import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../Tours.css'
import { useEffect } from 'react';
import {BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState([]);
    const Navigate = useNavigate();
    
    console.log(users)
    useEffect(()=>{
        const fettchUsers = ()=>{
            axios({
                method: 'GET',
                url: "https://holiday-planner-4lnj.onrender.com/api/v1/auth/users",
                headers: {
                    "Content-Type": "Application/json",
                }
            })
            .then((response) =>{
                console.log(response);
                setUsers(response.data);
                setTimeout(() => {
                    window.location.reload
                }, 3000);
            })
            .catch((error) =>{
                console.log(error);
                toast.error(error.response.data.message);
                toast.error('Fetch  user failed')
              })
        }
        fettchUsers();
    }, []);

    // Delete
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
          let token = localStorage.getItem("token")
          axios({
            url: `https://holiday-planner-4lnj.onrender.com/api/v1/users/auth/delete${id}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            },
          }).then((response) => {
            toast.success("Item deleted successfully")
            console.log(response, "Response")
            Navigate('Dashboard/Users/Editusers')
          }).catch((error) => {
            toast.error(error.response.data.message)
            console.log(error, "Error")
          })
        }
      }
  return (
    <div className="table-wrapper">
                <h1>Users</h1>
            <div className="table">

                <table>
                    <thead>
                        <tr>
                            <th>User email</th>
                            <th>User name</th>
                            <th>User Phone</th>
                            <th>User Location</th>
                            <th>Role</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((item, idx) =>{
                                return <tr key={idx}>
                                    <td>{item.email}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.location}</td>
                                    <td >{item.role}</td>
                                    <td >
                                    <span className='actions'>
                                        <BsFillTrashFill onClick={() => handleDelete(item._id)} className='delete-btn'/>
                                        <Link to={`Useredit/${item._id}`}> <BsFillPencilFill /></Link>
                                    </span>
                                </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                
            </div>
            <ToastContainer/>
            </div>
  )
}

export default Users

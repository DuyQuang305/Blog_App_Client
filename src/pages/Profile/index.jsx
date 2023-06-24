import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';

import logo from '../../assets/img/Logo.svg'

const apiUrl = process.env.REACT_APP_SERVER_URL;

const Profile = () => {
    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState([])
    const [accessToken, setAccessToken] = useState('')

    useEffect(() => {
        const getCurrentUser = async () => {
            if (!localStorage.getItem('blog-app-accessToken')) {
                navigate('/login')
            } else {
                const accessToken = await JSON.parse(localStorage.getItem('blog-app-accessToken'))

                setAccessToken(accessToken)
            }
        }

        getCurrentUser()
    }, [navigate])

    useEffect(() => {
        if (accessToken) {
            const getProfile = async () => {
                const { data } = await axios.get(`${apiUrl}/profile`, {
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    }
                })

                setCurrentUser(data.user)
            }

            getProfile()
        }
    }, [accessToken])
    return (
        currentUser && accessToken && (
            <>
                <div className="navbar-top">

                    <div className="navbar_profile">
                        <div>
                            <Link to='/'>
                                <img className='logo-img' src={logo} alt="logo" />
                            </Link>
                        </div>
                        <div className="title-profile">
                            <h1>Profile</h1>
                        </div>
                    </div>
                </div>

                <div className="sidenav">
                    <div className="profile">
                        <img src={"https://imdezcode.files.wordpress.com/2020/02/imdezcode-logo.png"} alt="" width="100" height="100" />

                        <div className="name">
                            {currentUser.username}
                        </div>
                        <div className="job">
                            Web Developer
                        </div>
                    </div>

                    <div className="sidenav-url">
                        <div className="url">
                            <Link to='#' className="active">Profile</Link>
                        </div>
                        <div className="url">
                            <Link to='#' href="#">Settings</Link>
                        </div>
                    </div>
                </div>

                <div className="main">
                    <h2>IDENTITY</h2>
                    <div className="card">
                        <div className="card-body">
                            <i className="fa fa-pen fa-xs edit"></i>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>:</td>
                                        <td>{currentUser.username}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>:</td>
                                        <td>{currentUser.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>:</td>
                                        <td>{currentUser.address}</td>
                                    </tr>
                                    <tr>
                                        <td>Hobbies</td>
                                        <td>:</td>
                                        <td>{currentUser.interest}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export default Profile
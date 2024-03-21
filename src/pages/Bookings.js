import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { ToastContainer } from 'react-toast';
import DataService from '../services/Data';
import { FaHeart } from 'react-icons/fa';

function Bookings() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        async function getFavs() {
            const response = await DataService.getBookings();
            setBookings(response?.data?.data);
            console.log(response);
        }
        getFavs();
    }, []);

    useEffect(() => {
        const email = localStorage.getItem("email");
        const userType = localStorage.getItem("userType");
        if (email === null || email === undefined) {
            navigate('/');
        } else {
            if (userType === 'admin') {
                navigate('/dash');
                return;
            }
        }
    }, [navigate]);

    function logout() {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="main-home">
            <div className="home-nav">
                <Link to={"/home"}><p>Eatify</p></Link>
                <div className='nav-links'>
                    <p onClick={() => navigate("/bookings")} className='reservations'>Reservations</p>
                    <FaHeart onClick={() => navigate("/favorites")} className="favourite"></FaHeart>
                    <MdLogout onClick={() => logout()} className="favourite"></MdLogout>
                </div>
            </div>
            <br></br>
            <h2>Reservations</h2>
            <div className="booking-box">
                {bookings.map(booking => {
                    return <div className='booking-card'>
                        <div>
                            <p>Restaurant name : {booking.name}</p>
                            <p>Restaurant location : {booking.location}</p>
                            <p>Date : {booking.timestamp.split("T")[0]}</p>
                            <p>Time : {booking.timestamp.split("T")[1]?.slice(0, 8)}</p>
                        </div>
                        <button>Booked</button>
                    </div>
                })}

            </div>
            <ToastContainer position='bottom-center' delay={1000} />
        </div>
    );
}


export default Bookings;

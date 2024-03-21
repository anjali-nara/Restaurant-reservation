import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { ToastContainer } from 'react-toast';
import DataService from '../services/Data';
import FavoriteCard from '../components/FCard';

function Favorites() {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        async function getFavs() {
            const response = await DataService.getFav();
            setRestaurants(response?.data?.data);
            console.log(response);
        }
        getFavs();
    }, [])

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
                    <MdLogout onClick={() => logout()} className="favourite"></MdLogout>
                </div>
            </div>

            <br />
            <h2>Favorites</h2>
            <div className="home-box">
                {restaurants.map(restaurant => {
                    return <FavoriteCard key={restaurant.id} id={restaurant.id} restaurantId={restaurant.restaurantId} imageUrl={restaurant.imageUrl} name={restaurant.name} location={restaurant.location} rating={restaurant.rating}></FavoriteCard>
                })}

            </div>
            <ToastContainer position='bottom-center' delay={1000} />
        </div>
    );
}


export default Favorites;

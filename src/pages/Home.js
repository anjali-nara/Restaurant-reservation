import '../App.css';
import { FaHeart } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Card from '../components/RestCard';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toast';
import DataService from '../services/Data';


function Home() {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [search, setSearch] = useState("");

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

    useEffect(() => {
        async function getRestaurants() {
            const response = await DataService.getRestaurants();
            setRestaurants(response?.data?.data);
            setFilteredRestaurants(response?.data?.data);
            console.log(response);
        }
        getRestaurants();
    }, [])

    function filterRest(search) {

        setSearch(search);
        let frestaurants = [];

        restaurants.forEach(restaurant => {
            if (restaurant?.name.toLowerCase().includes(search.toLowerCase()) || restaurant?.location.toLowerCase().includes(search.toLowerCase())) {
                frestaurants.push(restaurant);
            }
        })

        if (frestaurants.length > 0) {
            setFilteredRestaurants(frestaurants);
        } else {
            setFilteredRestaurants(restaurants);
        }

    }

    function logout() {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="main-home">
            <div className="home-nav">
                <Link to={"/home"}><p>Eatify</p></Link>
                <input type="text" value={search} placeholder="Search" onChange={(evt) => filterRest(evt.target.value)} />

                <div className='nav-links'>
                    <p onClick={() => navigate("/bookings")} className='reservations'>Reservations</p>
                    <FaHeart onClick={() => navigate("/favorites")} className="favourite"></FaHeart>
                    <MdLogout onClick={() => logout()} className="favourite"></MdLogout>
                </div>

            </div>

            <div className="home-box">

                {filteredRestaurants.map(restaurant => {
                    return <Card key={restaurant.id} id={restaurant.id} imageUrl={restaurant.imageUrl} name={restaurant.name} location={restaurant.location} rating={restaurant.rating}></Card>
                })}
            </div>
            <ToastContainer position='bottom-center' delay={1000} />
        </div>
    );
}


export default Home;

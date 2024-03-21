import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { ToastContainer } from 'react-toast';
import DataService from '../services/Data';
import AdminCard from '../components/ACard';
import { toast } from 'react-toast';

function Dashboard() {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [restaurants, setRestaurants] = useState([]);

    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    useEffect(() => {
        async function getFavs() {
            const response = await DataService.getRestaurants();
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

    async function addRest() {
        const res = await DataService.addRest(name, place, imageUrl);
        // window.location.reload();
        setModal(false);
        console.log(res);
    }

    function logout() {
        localStorage.clear();
        navigate("/");
    }


    return (
        <div className="main-home">
            <div className="home-nav">
                <Link to={"/home"}><p>Eatify</p></Link>
                <div className='nav-links'>
                    <p className='reservations'>Restaurants</p>
                    <MdLogout onClick={() => logout()} className="favourite"></MdLogout>
                </div>
            </div>
            <br></br>
            <p className='reservations' onClick={() => setModal(true)}> + Add Restaurant</p>
            <div className="home-box">
                {restaurants.map(restaurant => {
                    return <AdminCard key={restaurant.id} id={restaurant.id} imageUrl={restaurant.imageUrl} name={restaurant.name} location={restaurant.location} rating={restaurant.rating}></AdminCard>
                })}

            </div>
            <ToastContainer position='bottom-center' delay={1000} />

            {modal && <div className='modal'>
                <div className='modal-box'>
                    <h1 className='m-title'>Add Restaurant</h1>
                    <input type='text' value={name} onChange={(evt) => setName(evt?.target?.value)} placeholder='Name' className='m-input' />
                    <input type='text' value={place} onChange={(evt) => setPlace(evt?.target?.value)} placeholder='Location' className='m-input' />
                    <input type='text' value={imageUrl} onChange={(evt) => setImageUrl(evt?.target?.value)} placeholder='Image URL' className='m-input' />
                    <button onClick={() => addRest()}>Submit</button>
                    <p className='review-link' onClick={() => setModal(false)}>Close</p>
                </div>
            </div>}
        </div>
    );
}


export default Dashboard;
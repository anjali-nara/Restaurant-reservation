import '../App.css';
import { FaHeart, FaStar } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DataService from '../services/Data';
import { ToastContainer, toast } from 'react-toast';

function Reserve() {

    const navigate = useNavigate();
    const location = useLocation();

    const [dateTime, setDateTime] = useState("");

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [imageUrl, setImageUrl] = useState('https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg');
    const [rating, setRating] = useState('');

    const [menu, setMenu] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [addRating, setAddRating] = useState("");
    const [review, setReview] = useState("");

    const [modal, setModal] = useState(false);

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
        const params = new URLSearchParams(location.search);
        setId(params.get('id'));
        setName(params.get('name'));
        setPlace(params.get('location'));
        setRating(params.get('rating'));
        setImageUrl(params.get('imageUrl'));

        async function getMenu() {
            const response = await DataService.getMenu(params.get('id'));
            setMenu(response?.data?.data);
            console.log(response?.data?.data);
        }
        getMenu();

        async function getReviews() {
            const response = await DataService.getReviews(params.get('id'));
            setReviews(response?.data?.data);
            console.log(response?.data?.data);
        }
        getReviews();

        console.log(params.get('id')); // "bar"
        console.log(params.get('name'));
    }, [location.search]);

    const addReview = async (event) => {
        event.preventDefault();
        const res = await DataService.addReview(id, addRating, review);
        console.log(res?.data?.data);

        if (res?.data?.message) {
            setAddRating("");
            setReview("");
            setModal(false);
            toast.success(res?.data?.message, {
                backgroundColor: '#49c300',
                color: '#ffffff',
            });
        }

        async function getReviews() {
            const response = await DataService.getReviews(id);
            setReviews(response?.data?.data);
            console.log(response?.data?.data);
        }
        getReviews();
    }

    const bookTable = async () => {
        if (dateTime.length > 0) {
            const formatDate = dateTime.split("T")[0] + ' ' + dateTime.split("T")[1] + ':00';
            console.log(formatDate);
            await DataService.bookTable(id, formatDate);
        } else {
            toast.warn("Select Date", {
                backgroundColor: '#ffb100',
                color: '#ffffff',
            });
        }

    }

    function logout() {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="main-reserve">

            <div className="reserve-nav">
                <Link to={"/home"}><p>Eatify</p></Link>
                <div className='nav-links'>
                    <p onClick={() => navigate("/bookings")} className='reservations'>Reservations</p>
                    <FaHeart onClick={() => navigate("/favorites")} className="favourite"></FaHeart>
                    <MdLogout onClick={() => logout()} className="favourite"></MdLogout>
                </div>
            </div>

            <div className="reserve-box">

                <div className="reverve-book-box">
                    <img src={imageUrl} alt='book' onError={() => setImageUrl("https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg")} />
                    <div className="book-box">

                        <h2>{name}</h2>
                        <br></br>
                        <h4>{place}</h4>
                        <br></br>
                        <div className="rating-box">
                            <FaStar className="rstar"></FaStar>
                            <p>{rating} / 5</p>
                        </div>
                        <br></br>
                        <input type="datetime-local" value={dateTime} onChange={(evt) => setDateTime(evt.target.value)} />
                        <button onClick={() => bookTable()}>Book table</button>

                        <p onClick={() => setModal(true)} className='review-link'>Add Review</p>
                    </div>
                </div>


                <div className="menu-box">
                    <h1>Menu</h1>
                    <div className="menu">
                        {menu.length === 0 && <p>NO ITEMS ADDED</p>}
                        {
                            menu?.map(item => {
                                return <div key={item?.id} className="menu-card">
                                    <h4>{item?.item}</h4>
                                    <h3>$ {item?.price}</h3>
                                </div>
                            })
                        }

                    </div>
                </div>

                <div className="menu-box">
                    <h1>Reviews</h1>
                    <div className="menu">
                        {reviews.length === 0 && <p>NO REVIEWS</p>}
                        {
                            reviews?.map(item => {
                                return <div key={item?.id} className="menu-card">
                                    <h4>{item?.message}</h4>
                                    <div className="rating-box">
                                        <FaStar className="rstar"></FaStar>
                                        <p>{item?.rating} / 5</p>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                </div>
            </div>


            {modal && <div className='modal'>
                <form onSubmit={(evt) => addReview(evt)} className='modal-box'>
                    <h1>Add your Review</h1>
                    <input required type='text' maxLength={1} value={addRating} onChange={(evt) => setAddRating(evt?.target?.value)} placeholder='Your Rating ( 1 to 5 )' className='rate-input' />
                    <textarea required rows={6} placeholder='Review' value={review} onChange={(evt) => setReview(evt?.target?.value)}></textarea>
                    <button >Submit</button>
                    <p className='review-link' onClick={() => setModal(false)}>Close</p>
                </form>
            </div>}

            <ToastContainer position='bottom-center' delay={1000} />
        </div>
    );
}

export default Reserve;
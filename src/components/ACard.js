import '../App.css';
import React, { useEffect, useState } from 'react';
import DataService from '../services/Data';
import { toast } from 'react-toast';

function AdminCard(props) {
    const [modal, setModal] = useState(false);
    const [itemModal, setItemModal] = useState(false);
    const [updateItemModal, setUpdateItemModal] = useState(false);
    const [bookingsModal, setBookingsModal] = useState(false);
    const [addMenuItemModal, setAddMenuItemModal] = useState(false);


    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [menu, setMenu] = useState([]);
    const [bookings, setBookings] = useState([]);

    const [itemId, setItemId] = useState(null);
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");

    useEffect(() => {
        setName(props?.name);
        setPlace(props?.location);
        setImageUrl(props?.imageUrl);
    }, [props?.imageUrl, props?.location, props?.name])

    async function update() {
        const res = await DataService.updateRest(props?.id, name, place, imageUrl);
        window.location.reload()
        console.log(res);
    }

    async function deleteRest() {
        const res = await DataService.deleteRest(props?.id);
        window.location.reload()
        console.log(res);
    }

    async function deleteItem(id) {
        const res = await DataService.deleteMenuItem(id);
        showMenuModal();
        console.log(res);
    }

    async function addMenuItem() {
        if (itemName.length > 0 && itemPrice > 0) {
            const res = await DataService.addMenuItem(itemName, itemPrice, props?.id);
            setAddMenuItemModal(false);
            showMenuModal();
            console.log(res);
        } else {
            toast.warn("Fill all the fields", {
                backgroundColor: '#ffb100',
                color: '#ffffff',
            });
        }
    }

    async function updateMenuItem() {
        if (itemName.length > 0 && itemPrice > 0) {
            const res = await DataService.updateMenuItem(itemName, itemPrice, itemId);
            toast.success(res?.data?.message, {
                backgroundColor: '#49c300',
                color: '#ffffff',
            });
            setUpdateItemModal(false);
            showMenuModal();
            console.log(res);
        } else {
            toast.warn("Fill all the fields", {
                backgroundColor: '#ffb100',
                color: '#ffffff',
            });
        }
    }


    async function showMenuModal() {
        const response = await DataService.getMenu(props?.id);
        setMenu(response?.data?.data);
        console.log(response?.data?.data);

        setItemModal(true);
    }

    async function showBookingsModal() {
        const response = await DataService.getBookingsByRest(props?.id);
        setBookings(response?.data?.data);
        console.log(response?.data?.data);

        setBookingsModal(true);
    }

    async function showUdateMenuModal(item) {
        setItemId(item.id);
        setItemName(item.item);
        setItemPrice(item.price);
        setUpdateItemModal(true);
    }

    return (
        <div className='admin-card'>
            <img src={props?.imageUrl} alt="rest" />


            <div className='admin-card-body'>
                <h2>{props?.name}</h2>
                <p>{props?.location}</p>
                <p>Rating: {props?.rating}/5</p>
                <div>
                    <p className='update' onClick={() => setModal(true)} >Update</p>
                    <p className='delete' onClick={(event) => // Stop the event from bubbling up
                        deleteRest()
                    } >Delete</p>
                </div>
                <br></br>
                <br></br>
                <p className='review-link' onClick={() => // Stop the event from bubbling up
                    showMenuModal()
                } >View Menu</p>
                <br></br>
                <p className='review-link' onClick={() => // Stop the event from bubbling up
                    showBookingsModal()
                } >View Bookings</p>
            </div>

            {modal && <div className='modal'>
                <div className='modal-box'>
                    <h1 className='m-title'>Update Restaurant</h1>
                    <input type='text' value={name} onChange={(evt) => setName(evt?.target?.value)} placeholder='Name' className='m-input' />
                    <input type='text' value={place} onChange={(evt) => setPlace(evt?.target?.value)} placeholder='Location' className='m-input' />
                    <input type='text' value={imageUrl} onChange={(evt) => setImageUrl(evt?.target?.value)} placeholder='Image URL' className='m-input' />
                    <button onClick={() => update()}>Submit</button>
                    <p className='review-link' onClick={() => setModal(false)}>Close</p>
                </div>
            </div>}

            {itemModal && <div className='modal'>
                <div className='modal-box'>
                    <div className='m-title'>
                        <h1 >Menu</h1>
                        <p className='add-form-btn' onClick={() => { setItemModal(false); setAddMenuItemModal(true) }}>+ Add</p>
                    </div>
                    <div className='m-main'>
                        {menu.length === 0 && <p>NO ITEMS ADDED</p>}
                        {menu?.map(item => {
                            return <div key={item?.id} className="m-menu-card">
                                <h4 style={{ width: '150px' }}>{item?.item}</h4>
                                <h3 style={{ width: '100px' }}>$ {item?.price}</h3>
                                <p className='update' style={{ width: '80px' }} onClick={() => showUdateMenuModal(item)}>Update</p>
                                <p className='delete' style={{ width: '80px' }} onClick={() => deleteItem(item?.id)}>Delete</p>
                            </div>
                        })}
                    </div>
                    <div className='m-footer'>
                        <p className='review-link' onClick={() => setItemModal(false)}>Close</p>
                    </div>
                </div>
            </div>}

            {updateItemModal && <div className='modal'>
                <div className='modal-box'>
                    <h1 className='m-title'>Update Menu Item</h1>

                    <div className='m-main'>
                        <div className='add-form'>
                            <input type='text' value={itemName} onChange={(evt) => setItemName(evt?.target?.value)} placeholder='Item Name' className='m-input' />
                            <input type='number' value={itemPrice} onChange={(evt) => setItemPrice(evt?.target?.value)} placeholder='Item Price' className='m-input' />
                            <p className='update' onClick={() => updateMenuItem()}>Update</p>
                        </div>
                    </div>

                    <div className='m-footer'>
                        <p className='review-link' onClick={() => { setUpdateItemModal(false); setItemName(""); setItemPrice(0) }}>Close</p>
                    </div>
                </div>
            </div>}

            {addMenuItemModal && <div className='modal'>
                <div className='modal-box'>
                    <h1 className='m-title'>Add Menu Item</h1>

                    <div className='m-main'>
                        <div className='add-form'>
                            <input type='text' value={itemName} onChange={(evt) => setItemName(evt?.target?.value)} placeholder='Item Name' className='m-input' />
                            <input type='number' value={itemPrice} onChange={(evt) => setItemPrice(evt?.target?.value)} placeholder='Item Price' className='m-input' />
                            <p className='add-form-btn' onClick={() => addMenuItem()}>+ Add</p>
                        </div>
                    </div>

                    <div className='m-footer'>
                        <p className='review-link' onClick={() => { setAddMenuItemModal(false); setItemName(""); setItemPrice(0); setItemModal(true); }}>Close</p>
                    </div>
                </div>
            </div>}

            {bookingsModal && <div className='modal'>
                <div className='modal-box'>

                    <h1 className='m-title'>Bookings</h1>
                    <div className='m-main'>
                        {bookings.map(booking => {
                            return <div className='booking-card'>
                                <div>
                                    <p>User name : {booking.userName}</p>
                                    <p>Date : {booking.timestamp.split("T")[0]}</p>
                                    <p>Time : {booking.timestamp.split("T")[1]?.slice(0, 8)}</p>
                                </div>


                                <button>Booked</button>
                            </div>
                        })}
                    </div>

                    <div className='m-footer'>
                        <p className=' review-link' onClick={() => { setBookingsModal(false); }}>Close</p>
                    </div>

                </div>
            </div>}


        </div>
    );
}


export default AdminCard;
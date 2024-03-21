import '../App.css';
import { useNavigate } from 'react-router-dom';
import DataService from '../services/Data';
import { toast } from 'react-toast';

function FavoriteCard(props) {

    const navigate = useNavigate();

    function routeToReserve() {
        navigate({
            pathname: '/reserve',
            search: `?id=${props?.restaurantId}&name=${props.name}&location=${props.location}&rating=${props.rating}&imageUrl=${props.imageUrl}`,
        });
    }

    async function deleteFav() {
        const res = await DataService.deleteFav(props?.id);
        window.location.reload()
        console.log(res);
    }

    return (
        <div onClick={routeToReserve} className="rest-card" >
            <img src={props?.imageUrl} alt='rest' />
            <div className="overlay">
                <div>
                    <h2>{props?.name}</h2>
                    <p>{props?.location}</p>
                    <p>Rating: {props?.rating}/5</p>
                </div>


                <p onClick={(event) => {
                    event.stopPropagation(); // Stop the event from bubbling up
                    deleteFav();
                }} className='favorite-btn'>Remove Favorite</p>
            </div>
        </div>
    );
}


export default FavoriteCard;
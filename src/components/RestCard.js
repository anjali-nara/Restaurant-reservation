import '../App.css';
import { useNavigate } from 'react-router-dom';
import DataService from '../services/Data';
import { toast } from 'react-toast';

function Card(props) {

    const navigate = useNavigate();

    function routeToReserve() {
        navigate({
            pathname: '/reserve',
            search: `?id=${props?.id}&name=${props.name}&location=${props.location}&rating=${props.rating}&imageUrl=${props.imageUrl}`,
        });
    }

    async function addToFav() {
        const res = await DataService.addToFav(props?.id);
        toast.success(res?.data?.message, {
            backgroundColor: '#49c300',
            color: '#ffffff',
        });
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
                    addToFav();
                }} className='favorite-btn'>Add to Favorites</p>
            </div>
        </div>
    );
}


export default Card;
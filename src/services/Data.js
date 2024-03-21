import axios from "axios";
import { toast } from 'react-toast';
const BASE_URL = "http://localhost:5000/"


class DataService {


    async loginService(email, password, type) {
        const response = await axios.post(`${BASE_URL}login/${type}`, {
            "email": email,
            "password": password
        }).then(response => {

            console.log(response);
            if (response.status === 200) {
                toast.success(response?.data?.message, {
                    backgroundColor: '#49c300',
                    color: '#ffffff',
                });
                localStorage.setItem("userType", type)
                localStorage.setItem("email", response?.data?.data?.email)
                localStorage.setItem("id", response?.data?.data?.id)
            }

            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }

        })

        return response;
    }


    async registerService(firstName, lastName, email, password) {
        const response = await axios.post(`${BASE_URL}register`, {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                toast.success(response?.data?.message, {
                    backgroundColor: '#49c300',
                    color: '#ffffff',
                });
            }
            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })


        return response;
    }


    async getRestaurants() {
        const response = await axios.get(`${BASE_URL}restaurant/`).then(response => {
            console.log(response);
            return response;
        }).catch(err => {
            console.log(err);
            toast.error(err.response.data.message);
        })
        return response;
    }

    async getMenu(restId) {
        const response = await axios.get(`${BASE_URL}menu/${restId}`).then(response => {
            console.log(response);
            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
        return response;
    }

    async addToFav(restId) {
        const userId = localStorage.getItem("id");

        try {
            const response = await axios.post(`${BASE_URL}favourite/${userId}/${restId}`);
            return response;
        } catch (err) {
            return { data: { message: "Already in favorites" } }
        }

    }

    async deleteFav(favId) {
        try {
            const response = await axios.delete(`${BASE_URL}favourite/${favId}`);
            return response;
        } catch (err) {
            return { data: { message: "Restaurant Added To Favourites!" } }
        }

    }

    async getFav() {
        const userId = localStorage.getItem("id");
        const response = await axios.get(`${BASE_URL}favourite/${userId}`).then(response => {
            console.log(response);
            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
        return response;
    }

    async addReview(restId, rating, review) {
        const userId = localStorage.getItem("id");
        try {
            const response = await axios.post(`${BASE_URL}review/${userId}/${restId}`, {
                "rating": rating,
                "message": review
            });
            return response;
        } catch (err) {
            console.log(err);
            return { data: { message: err.response.data.message } };
        }
    }

    async getReviews(restId) {
        const response = await axios.get(`${BASE_URL}review/${restId}`).then(response => {
            console.log(response);
            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
        return response;
    }

    async deleteRest(restId) {
        const response = await axios.delete(`${BASE_URL}restaurant/${restId}`).then(response => {
            console.log(response);
            if (response.status === 200) {
                toast.success(response?.data?.message, {
                    backgroundColor: '#49c300',
                    color: '#ffffff',
                });
            }
            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
        return response;
    }

    async updateRest(restId, name, place, imageUrl) {
        const response = await axios.put(`${BASE_URL}restaurant/${restId}`, {
            "name": name,
            "location": place,
            "imageUrl": imageUrl
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                toast.success(response?.data?.message, {
                    backgroundColor: '#49c300',
                    color: '#ffffff',
                });
            }
            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
        return response;
    }

    async addRest(name, place, imageUrl) {
        const response = await axios.post(`${BASE_URL}restaurant`, {
            "name": name,
            "location": place,
            "imageUrl": imageUrl
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                toast.success(response?.data?.message, {
                    backgroundColor: '#49c300',
                    color: '#ffffff',
                });
            }
            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
        return response;
    }

    async deleteMenuItem(itemId) {
        const response = await axios.delete(`${BASE_URL}menu/${itemId}`).then(response => {
            console.log(response);
            if (response.status === 200) {
                toast.success(response?.data?.message, {
                    backgroundColor: '#49c300',
                    color: '#ffffff',
                });
            }
            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
        return response;
    }

    async addMenuItem(itemName, itemPrice, restId) {
        const response = await axios.post(`${BASE_URL}menu/${restId}`, {
            "item": itemName,
            "price": itemPrice
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                toast.success(response?.data?.message, {
                    backgroundColor: '#49c300',
                    color: '#ffffff',
                });
            }
            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
        return response;
    }

    async updateMenuItem(itemName, itemPrice, itemId) {
        const response = await axios.put(`${BASE_URL}menu/${itemId}`, {
            "item": itemName,
            "price": itemPrice
        });
        return response;
    }


    async bookTable(restId, dateTime) {
        const userId = localStorage.getItem("id");
        const response = await axios.post(`${BASE_URL}booking`, {
            "restaurantId": restId,
            "userId": userId,
            "timestamp": dateTime
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                toast.success(response?.data?.message, {
                    backgroundColor: '#49c300',
                    color: '#ffffff',
                });
            }
            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
        return response;
    }

    async getBookings() {
        const userType = localStorage.getItem("userType");
        const userId = localStorage.getItem("id");
        const response = await axios.get(`${BASE_URL}booking/${userType}/${userId}`).then(response => {
            console.log(response);
            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
        return response;
    }

    async getBookingsByRest(restId) {
        const userType = localStorage.getItem("userType");
        const response = await axios.get(`${BASE_URL}booking/${userType}/${restId}`).then(response => {
            console.log(response);
            return response;
        }).catch(err => {
            console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
        return response;
    }
}

let dataService = new DataService();

export default dataService;
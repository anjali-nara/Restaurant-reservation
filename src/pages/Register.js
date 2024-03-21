import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DataService from '../services/Data';
import { ToastContainer, toast } from 'react-toast';

function Register() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const email = localStorage.getItem("email");

        if (email !== null && email !== undefined) {
            navigate('/home');
        }
    }, [navigate]);

    const register = async () => {
        if (firstName.length > 0 && email.length > 0 && password.length > 0) {
            await DataService.registerService(firstName, lastName, email, password);
        } else {
            toast.warn("Fill all the fields", {
                backgroundColor: '#ffb100',
                color: '#ffffff',
            });
        }
    }

    return (
        <div className="main-register">
            <div className="register-box">
                <p>Register</p>
                <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => register()}>Register</button>
                <Link to="/"><h3>Already have an account? Login</h3></Link>
            </div>
            <ToastContainer position='bottom-center' delay={1000} />
        </div>
    );
}

export default Register;

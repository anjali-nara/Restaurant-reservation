import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DataService from '../services/Data';
import { ToastContainer, toast } from 'react-toast';


function Login() {
    const navigate = useNavigate();

    const [userType, setUserType] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const email = localStorage.getItem("email");

        if (email !== null && email !== undefined) {
            navigate('/home');
        }
    }, [navigate]);


    const login = async () => {
        if (email.length > 0 && password.length > 0) {
            const res = await DataService.loginService(email, password, userType);
            if (res.status === 200) {
                navigate('/home');
            }
        } else {
            toast.warn("Fill all the fields", {
                backgroundColor: '#ffb100',
                color: '#ffffff',
            });
        }
    }


    return (
        <div className="main-login">
            <div className="login-box">
                <p>Login</p>

                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => login()}>Login</button>
                <div className='select-user'>
                    <p onClick={() => setUserType('user')} className={userType === 'user' ? 'active-user' : ""}>User</p>
                    <p onClick={() => setUserType('admin')} className={userType === 'admin' ? 'active-user' : ""}>Admin</p>
                </div>
                <Link to="/register"><h3>Don't have an account? Sign up</h3></Link>
            </div>
            <ToastContainer position='bottom-center' delay={1000} />
        </div>
    );
}


export default Login;

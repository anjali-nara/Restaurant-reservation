import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Reserve from './pages/Reserve';
import Favorites from './pages/Favorites';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;





// import { useState } from "react";
// import { FaHeart, FaStar } from 'react-icons/fa';
// import './App.css';

// function App() {

//   const [screen, setScreen] = useState(1);

//   return (
//     <>
//       {screen === 1 && <div className="main-login">
//         <div className="login-box">
//           <p>Login</p>
//           <input type="text" placeholder="Username" />
//           <input type="text" placeholder="Password" />
//           <button onClick={() => setScreen(3)} >Login</button>
//           <h3 onClick={() => setScreen(2)}>Don't have an account? Sign up</h3>
//         </div>
//       </div>}


//       {screen === 2 && <div className="main-register">
//         <div className="register-box">
//           <p>Register</p>
//           <input type="text" placeholder="Username" />
//           <input type="text" placeholder="Password" />
//           <input type="text" placeholder="Confirm Password" />
//           <button>Register</button>
//           <h3 onClick={() => setScreen(1)}>Already have an account? Register</h3>
//         </div>
//       </div>}

//       {screen === 3 && }

//       {screen === 4 &&
//         <div className="main-reserve">

//           <div className="reserve-nav">
//             <p onClick={() => setScreen(3)}>Eatify</p>
//             <FaHeart onClick={() => setScreen(5)} className="favourite"></FaHeart>
//           </div>

//           <div className="reserve-box">

//             <div className="reverve-book-box">
//               <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" />
//               <div className="book-box">

//                 <h2>Smoor Restaurant</h2>
//                 <h4>Nagavara</h4>

//                 <div className="rating-box">
//                   <FaStar className="rstar"></FaStar>
//                   <FaStar className="rstar"></FaStar>
//                   <FaStar className="rstar"></FaStar>
//                   <FaStar className="rstar"></FaStar>
//                   <FaStar></FaStar>
//                 </div>

//                 <input type="datetime-local" />
//                 <button>Book a table</button>
//               </div>
//             </div>


//             <div className="menu-box">
//               <h1>Menu</h1>
//               <div className="menu">
//                 <div className="menu-card">
//                   <h4>Paneer Pizza</h4>
//                   <h3>$ 120</h3>
//                 </div>
//                 <div className="menu-card">
//                   <h4>Paneer Pizza</h4>
//                   <h3>$ 120</h3>
//                 </div>
//                 <div className="menu-card">
//                   <h4>Paneer Pizza</h4>
//                   <h3>$ 120</h3>
//                 </div>
//                 <div className="menu-card">
//                   <h4>Paneer Pizza</h4>
//                   <h3>$ 120</h3>
//                 </div>
//                 <div className="menu-card">
//                   <h4>Paneer Pizza</h4>
//                   <h3>$ 120</h3>
//                 </div>
//                 <div className="menu-card">
//                   <h4>Paneer Pizza</h4>
//                   <h3>$ 120</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>}

//       {screen === 5 && <div className="main-home">
//         <div className="home-nav">
//           <p>Eatify</p>
//         </div>

//         <div className="home-box">
//           <div className="rest-card" onClick={() => setScreen(4)}>
//             <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" />
//             <div className="overlay">
//               <div>
//                 <h2>Smoor</h2>
//                 <p>Nagavara</p>
//               </div>

//               <h3>$ 350 / person</h3>
//             </div>
//           </div>
//           <div className="rest-card">
//             <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" />
//             <div className="overlay">
//               <div>
//                 <h2>Meghana</h2>
//                 <p>Nagavara</p>
//               </div>

//               <h3>$ 350 / person</h3>
//             </div>
//           </div>

//           <div className="rest-card">
//             <img src="https://images.unsplash.com/photo-1637851682487-fa13fce5150f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1127&q=80" />
//             <div className="overlay">
//               <div>
//                 <h2>KFC</h2>
//                 <p>Nagavara</p>
//               </div>

//               <h3>$ 350 / person</h3>
//             </div>
//           </div>
//           <div className="rest-card">
//             <img src="https://images.unsplash.com/photo-1606720335177-3d04e70fb13b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80" />
//             <div className="overlay">
//               <div>
//                 <h2>McDonalds</h2>
//                 <p>Nagavara</p>
//               </div>

//               <h3>$ 350 / person</h3>
//             </div>
//           </div>
//         </div>
//       </div>}
//     </>
//   );
// }

// export default App;



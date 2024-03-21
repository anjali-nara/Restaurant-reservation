const cors = require("cors");
const express = require("express");

const authRoutes = require("./src/routes/auth");
const restaurantRoutes = require("./src/routes/restaurant");
const menuRoutes = require("./src/routes/menu");
const favouriteRoutes = require('./src/routes/favourite');
const reviewRoutes = require('./src/routes/review');
const bookingRoutes = require('./src/routes/booking');

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/menu', menuRoutes);
app.use('/favourite', favouriteRoutes);
app.use('/review', reviewRoutes);
app.use('/booking', bookingRoutes);

app.listen(5000, () => {
    console.log(`Server listening to port: 5000`);
});

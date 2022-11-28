require('dotenv').config();

const express = require('express');
const path = require('path');
const http = require('http');
require('express-async-errors');

const ConsumerRoute = require('./routers/consumer.router');
const ProductRoute = require('./routers/product.router');
const ProviderRoute = require('./routers/provider.router');
const OrderRoute = require('./routers/order.router');
const OrderDetailRoute = require('./routers/orderdetail.router');
const StaffRoute = require('./routers/staff.router');
const UserRoute = require('./routers/user.router');
const RoleRoute = require('./routers/role.router');
const StaffConsumerRoute = require('./routers/staffConsumer.router');

const cors = require('./middleware/cors');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// use static file
app.use('/', express.static(path.join(__dirname, '/public')));

// use cors
app.use(cors);

app.use('/consumer', ConsumerRoute);
app.use('/product', ProductRoute);
app.use('/provider', ProviderRoute);
app.use('/order', OrderRoute);
app.use('/orderdetail', OrderDetailRoute);
app.use('/user', UserRoute);
app.use('/staff', StaffRoute);
app.use('/role', RoleRoute);
app.use('/staffconsumer', StaffConsumerRoute);

app.get('/', (req, res) => {
    res.json({ username: 'tranquoctrung' });
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

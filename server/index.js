import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'

/* DATA IMPORT */
import User from './models/User.js'
import { dataUser } from './data/index.js'


/* CONFIGUARTION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// allows us to make cross origin sharing requests
// that something you need to make API calls from another server
app.use(morgan("common")); //  logs  ข้อมูล
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
// CORS เป็นกลไกที่ web browser ใช้เวลาที่ client ส่ง request ไปยัง server ที่มี domain ต่างกัน


/* ROUTES */
app.use("/client", clientRoutes)
app.use("/general", generalRoutes)
app.use("/management", managementRoutes)
app.use("/sales", salesRoutes)


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ONLY ADD DATA ONE TIME */
        User.insertMany(dataUser)
    })
    .catch((error) => console.log(`${error} did not connect`));

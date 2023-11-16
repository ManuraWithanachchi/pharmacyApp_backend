const express = require("express");
const app = express();
const connectToDb = require("./config/db");
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());

//connect TO Database
connectToDb();

//Importing Routes
const userRoute = require("./routes/api/user")
const medItemRoute = require("./routes/api/medItem");
const doctorCategoryRoute = require("./routes/api/doctorCategory");
const receiptRoute = require("./routes/api/receipt");
const issueRoute = require("./routes/api/issues")
const stockRoute = require("./routes/api/stock")

//Using Routes
app.use("/api/users", userRoute);
app.use("/api/medItems", medItemRoute);
app.use("/api/receipts", receiptRoute);
app.use("/api/doctorcategory", doctorCategoryRoute);
app.use("/api/issues",issueRoute)
app.use("/api/stocks/",stockRoute)

//Setting Port for the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

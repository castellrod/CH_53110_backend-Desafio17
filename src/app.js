const express = require("express");
const path = require("path")
const mongoose = require("mongoose")
const http = require("http")
const handlebars = require("express-handlebars")
const productRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/cart.router")
const {viewsRouter, handleRealTimeProductsSocket} = require("./routes/views.router");
const sessionsRouter = require("./routes/sessions.router.js")
const socketIO = require("socket.io");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./config/passport.config");
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');
const connectMongo = require("connect-mongo");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


const PORT = 3000;
const app = express();
const server = http.createServer(app)


app.use((req, res, next) =>{
    logger.http(`${req.method} - ${req.url}`);
    next();
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
    store: connectMongo.create({mongoUrl: "mongodb+srv://jpcastell:cursoCoder@backend-db.g9wu9xl.mongodb.net/?retryWrites=true&w=majority&appName=backend-db&dbName=curso-coderhouse"})
}))


passportConfig()
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, "public")))

app.engine("handlebars", handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use("/", viewsRouter)
app.use("/api/products", productRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/api/carts", cartRouter)

const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "API de Coderhousse",
            version: "1.0.0",
            description: "API de Backend para el curso de Coderhouse"
        },
    },
        apis: ["./docs/Products.yaml"]
}
    
const spec = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));



server.listen(PORT, () => {
    logger.info(`Servidor escuchando en http://localhost:${PORT}`);
    });

const connect = async()=>{
    try{
        await mongoose.connect("mongodb+srv://jpcastell:cursoCoder@backend-db.g9wu9xl.mongodb.net/?retryWrites=true&w=majority&appName=backend-db&dbName=curso-coderhouse")
        logger.info("Conectado a MongoDB");
    }catch(error){
        logger.error(`Error al conectar a MongoDB: ${error.message}`);
    }
}

connect()

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const hbs = require("express-handlebars");
const app = express();
const port = 3000;
const session = require("express-session");

const route = require("./routes");
const db = require("./config/db");

// Connect to database
db.connect();
// Đọc ảnh
app.use(express.static(path.join(__dirname, "public")));

// Add middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

// HTTP logger
// app.use(morgan("combined"));

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "'keyboard cat'",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Template engine
app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    encoding: "utf8",
    helpers: {
      sum: (a, b) => a + b,
      count: (a) => {
        let counter = 0;
        for (let i = 0; i < a.length; i++) {
          counter++;
        }
        return counter;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// function(req,res){res.send("Hello World!")};

// Routes init
route(app);

// 127.0.0.1 : localhost

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/log-in`);
});

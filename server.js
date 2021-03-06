const path = require('path');
const express = require('express');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const validator = require("validator");
const session = require('./utils/sessions')
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const logger = morgan('dev');


const app = express();
const PORT = process.env.PORT || 3001;


// create a handlebars template instance with the default options from the library
const hbs = exphbs.create({helpers});

// the express app will have the engine from the handlebars instance
app.engine('handlebars', hbs.engine);
// start using engine
app.set('view engine', 'handlebars');

app.use(logger);

app.use(session);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

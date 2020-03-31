// Require Libraries
const express = require('express');
const exphbs  = require('express-handlebars');
const Tenor = require("tenorjs").client({
    // Replace with your own key
    "Key": "6DMLIOXPLKDK", // https://tenor.com/developer/keyregistration
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});

// App Setup
const app = express();

// Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get("/", (req,res)=>{
    term = ""

    if (req.query.term) {
        term = req.query.term
    }

    Tenor.Search.Query(term, 10).then((response)=>{
        const gifs = response
        res.render("home", {gifs})
    }).catch(console.error)

})

app.get('/greetings/:name', (req, res) => {
    // grab the name from the path provided
    const name = req.params.name;
    // render the greetings view, passing along the name
    res.render('greetings', { name });
  })

// Start Server
app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});
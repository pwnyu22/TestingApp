const express = require('express'); //Imports the express package and initialize it
const app = express();
const cors = require('cors');
const PORT = 8080;  //Port to run on

app.use(cors({ origin: 'http://localhost:3000'}))
app.use(express.json());  //middleware for parsing json data


app.listen(   //starts the app
    PORT,     //listne on defined port
    () => console.log(`It's alive on http://localhost"${PORT}`)  //Prints to the console for debugging
);

//Sets up a ROUTE. exampl--> localhost:8080/testing
app.get('/testing', (req, res) => {   //parameter 2 is a callback function - (req, res)
    console.log("HERE")
    res.status(200).send({
        testing: '<b>Testing Complete!</b>'
    })
});

app.get('/testing2', (req, res) => {   //parameter 2 is a callback function - (req, res)
    console.log("HERE")
    timestamp = new Date().valueOf();
    res.status(200).send({
        testing: 'testing complete',
        temp: 'some other data',
        time: timestamp
    })
});

app.post('/testing/:id', (req, res) => {   //parameter 2 is a callback function - (req, res)
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo){
        res.status(418).send({message: 'Logo Needed!'})
    }

    res.send({
        testing: `<b>Sending over HTML<b>`
    })
});

const path = require('path');

const express = require('express');
const bp = require('body-parser');

const app = express();

/////////////////////////////////////////////////////////
//                     Settings                        //
/////////////////////////////////////////////////////////

app.set('view engine','pug');
app.set('views',path.resolve(__dirname,'interface'));

/////////////////////////////////////////////////////////
//                    Basic stuff                      //
/////////////////////////////////////////////////////////

app.use(bp.json());
app.use(express.static(path.resolve(__dirname,'public')));

/////////////////////////////////////////////////////////
//                    Routes                           //
/////////////////////////////////////////////////////////

app.get('/', async (req,res) => {
    res.render('page');
});

/////////////////////////////////////////////////////////
//                    Listen                           //
/////////////////////////////////////////////////////////

app.listen(2030,() => { console.log('2.0'); });
const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
var cors = require('cors')


const app = express()
app.use(cors());
const port = 5000

app.use(express.json());
app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNoteBook app listening on port http://localhost:${port}`)
})
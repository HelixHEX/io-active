const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('pusher-chatkit-server');

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:7379ed0f-94d3-4314-8c68-9d5724b05d90',
  key:  '1ec0b2b5-d118-4969-b69f-9ed98e3a7b87:YoNTOCaRmF0uu677YVD59PAbDBFIyUZPo+s0Ehy6MMY='
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/users', (req, res) => {
  const { username } = req.body;
  chatkit
    .createUser({ 
	id: username, 
	name: username 
     })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

app.post('/authenticate', (req, res) => {
  const {  grant_type } =  req.body;
  res.json(chatkit.authenticate({ grant_type }, req.query.uer_id));
});

const PORT = 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});

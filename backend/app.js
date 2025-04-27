const express = require("express");
const app = express();
const cors = require('cors'); // Allow cross-origin if frontend runs on a different port
const workouts = require('./workouts.json');

app.use(cors()); // Very important for local dev!
app.use(express.json());

app.get('/connect', (res) => {
  console.log("Frontend connected to backend!");
  res.send('Backend connection successful!');
});

app.get('/data', (req, res) => {
    res.json(data);
})

app.post('/getWorkout', (req, res) => {
    const { type } = req.body;
    console.log("User selected: ", type);
    
    const selectedWorkout = workouts.find(workout => workout.type === type); // filter based on type

    if (selectedWorkout) {
        res.json(selectedWorkout);
    } else {
        res.status(404).json({ error: 'Not found'});
    }
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
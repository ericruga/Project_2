const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Festival = require('./models/Festival.model');
const User = require('./models/User.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/Proyecto-modelo';

// Connection to the database "Proyecto-modelo"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
   //return Festival.deleteMany()
  })
//   .then((response) => {
//       return Festival.create({
//         name:'Pizza Catalana',
//         date:'UltraPro Chef',
//         location: ["pà", "tomàquet", "oli"],
//         station: 'Mediterranian',
//         image: "https://www.eliris.cat/wp-content/uploads/2018/08/IMG_2198-copia-1024x730.jpg",
//         price: "other",
//         description: '20',

//       })
//     })
  .then((response) => {
    console.log(response.title)
  })

  .then((response) => {
      return Festival.insertMany(data);
  })
  
  .then((response) => {
    response.forEach  ( (item) => {
  console.log(item.title)
  })
})


//   .then((response) => {
//       return Recipe.findOneAndUpdate(
//         { title: "Rigatoni alla Genovese" }, 
//         { duration: 100 },
//         { new: true } 
//       );
//   })
    
//   .then((response) => {
//       return Recipe.findOneAndDelete({ title: "Carrot Cake" });
//   })

  .then((response) => {
  mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
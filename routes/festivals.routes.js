const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Festival = require("../models/Festival.model");
const User = require("../models/User.model");
// const Api = require("../services/ApiHandler");
//const CharactersAPI = new Api()

router.get("/festivals", (req, res, next) => {
  Festival.find()
    .then((allFestivals) => {
      res.render(`festivals/list.hbs`, { allFestivals });
    })
    .catch((err) => console.log(err));
});

router.get("/festivals/winter", (req, res) => {
  Festival.find({ station: "Winter" })
    .then((festivalsWinter) => {
     // console.log(festivalsWinter);
      res.render("festivals/winter.hbs", { festivalsWinter });
    })
    .catch((err) => console.log(err));
});

router.get("/festivals/summer", (req, res) => {
  Festival.find({ station: "Summer" })
    .then((festivalsSummer) => {
     // console.log(festivalsSummer);
      res.render("festivals/summer.hbs", { festivalsSummer });
    })
    .catch((err) => console.log(err));
});

router.get("/festivals/spring", (req, res) => {
  Festival.find({ station: "Spring" })
    .then((festivalsSpring) => {
      //console.log(festivalsSpring);
      res.render("festivals/spring.hbs", { festivalsSpring });
    })
    .catch((err) => console.log(err));
});

router.get("/festivals/autumn", (req, res) => {
  Festival.find({ station: "Autumn" })
    .then((festivalsAutumn) => {
      console.log(festivalsAutumn);
      res.render("festivals/autumn.hbs", { festivalsAutumn });
    })
    .catch((err) => console.log(err));
});

router.get("/AboutUs", (req, res, next) => res.render("aboutus.hbs"));

router.post("/add-favorite", isLoggedIn, (req, res) => {
  const query = ({ name, date, location, station, image, price, description } =
    req.body);
    const userId = req.session.user._id
  const idToCheck = req.body.apiId;
  console.log(idToCheck, "holaaaaaaaaaaaaa")
  Festival.find({_id: idToCheck }).then((festArray) => {
    //comprobar si ese apiId ya esta en db characters
    if (festArray.length === 0) {
      Festival.create(query)
        .then((result) => {
          User.findByIdAndUpdate(userId, {
            $push: { favorites: result.id },
          }).then(() => {
            res.redirect("/festivals");
          });
        })
        .catch((err) => console.log(err));
    } else {
      User.findById(userId)
        .then((user) => {
          if (!user.favorites.includes(festArray[0]._id)) {
            User.findByIdAndUpdate(userId, {
              $push: { favorites: festArray[0]._id },
            }).then(() => {
              res.redirect("/festivals");
            });
          } else {
            res.redirect("/festivals");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

router.post("/delete-favorite", isLoggedIn, (req, res) => {
  const { id } = req.body;
  User.findByIdAndUpdate(req.user._id, { $pull: { favorites: id } })
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => console.log(err));
});

/**
 * ---arrays
{ field: { $in: [ value1, value2, ..... , valueN ] } }
{ field: { $nin: [ value1, value2, ..... , valueN ] } }
{ field: { $all: [ value1, value2, ..... , valueN ] } }
 */

module.exports = router;

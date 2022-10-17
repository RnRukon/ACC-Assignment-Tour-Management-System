const express = require('express');
const toursController = require('../Controllers/tour.controller');
const router = express.Router();

router.route("/trending")
    .get(toursController.getToursTrendingView)
router.route("/cheapest")
    .get(toursController.getToursCheapestView)

router.route('/')
    .get(toursController.getTours)

    .post(toursController.createTours)


router.route("/:id")
    .get(toursController.getToursDetailsById)
    .patch(toursController.updateTours)
    .delete(toursController.deleteToursById)


module.exports = router;
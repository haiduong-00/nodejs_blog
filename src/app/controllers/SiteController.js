const Course = require('../models/Course')

class SiteController {

    // [GET] /news
    index(req, res, next) {
        Course.find({}).lean()
            .then(courses => res.render('home', {courses}))
            .catch(err => next(err))


        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController;
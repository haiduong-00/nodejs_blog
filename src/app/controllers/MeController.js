const Course = require('../models/Course')

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({}).lean();

        if(req.query.hasOwnProperty('_sort')) {
            const isValidtype = ['asc', 'desc'].includes(req.query.type);
            courseQuery = courseQuery.sort({ 
                [req.query.column]: isValidtype ? req.query.type : 'desc'
             })
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted({}).lean()])
            .then(([courses, deletedCount]) => 
                res.render('me/stored-courses', {
                    courses, 
                    deletedCount
                })
            )
            .catch(next);
            


        // Course.find({}).lean()
        //     .then(courses => res.render('me/stored-courses', {courses}))
        //     .catch(err => next(err));

        // Course.countDocumentsDeleted({}).lean()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => {});
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true }).lean()
            .then(courses => res.render('me/trash-courses', {courses}))
            .catch(err => next(err));
        // findWithDeleted()` trả về tất cả các bản ghi, bao gồm cả bản ghi đã bị xóa, trong khi `findDeleted()` chỉ trả về các bản ghi đã bị xóa.
    }


}

module.exports = new MeController;
const Course = require('../models/Course')

class CourseController {
    // [GET] /courses/:slug
    show(req, res, err) {
        Course.findOne({ slug: req.params.slug }).lean()
            .then(course => res.render('./courses/show', { course }))
            .catch(err => next(err))

            // res.send('COURSE DETAIL !!!' + req.params.slug);
    }

    // [GET] /courses/create
    create(req, res) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(err => {
 
            })
    }

    // [GET] /courses/:id/edit
    edit(req, res) {
        Course.findById(req.params.id).lean()
            .then(course => res.render('courses/edit', {course}))
            .catch(err => next(err))
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }


     // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }


    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // using deleteOne() xóa vĩnh viên còn deleteById() thì không


    // [POST] /course/handle-form-actions-delete
    handleFormActionDelete(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds }})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({ message: 'Action invalid!'});
        }
        // res.json(req.body);
    }

    // [POST] /course/handle-form-actions-restore
    handleFormActionRestore(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
        
            default:
                res.json({ message: 'Action invalid!'});

        }
    }
}

module.exports = new CourseController;
const newsRouter = require('./news')
const meRouter = require('./me')
const siteRouter = require('./site')
const coursesRouter = require('./courses')

function route(app) {

    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter)

    app.use('/', siteRouter);
      
    // Action --- Dispatcher --> Function Handler
}

module.exports = route;
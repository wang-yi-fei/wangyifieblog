exports.mustNotLogin = function (req, res, next) {
    if (req.session.user) {
        req.flash('error', '此页面需要未登陆才能访问，你已经登录过了');
        res.redirect('/');
    } else {
        next();
    }
};
//此中间件要求登陆之后才能访问
exports.mustLogin = function (req, res, next) {

    if (req.session.user) {
        next();
    } else {
        req.flash('error', '此页面需要登陆后才能访问，你尚未登录，请登陆');
        res.redirect('/user/login');
    }
};
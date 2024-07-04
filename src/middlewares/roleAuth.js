function isAdmin (req, res, next){
    if(req.session.user && req.session.user.role === 'admin'){
        return next()
    }
    return res.status(403).json({error: 'No autorizado. Solo los administradores pueden hacer esta acción'})
}

function isUser (req, res, next){
    if(req.session.user && req.session.user.role === 'user'){
        return next()
    }
    return res.status(403).json({error: 'No autorizado. Solo los usuarios pueden hacer esta acción'})
}

module.exports = {isAdmin, isUser}
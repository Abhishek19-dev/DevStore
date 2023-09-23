module.exports = (theFunc) => (eq,res,next)=>{
    Promise.resolve(theFunc(eq,res,next)).catch(next);
}
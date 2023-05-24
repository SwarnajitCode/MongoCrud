const router = require('express').Router();
const {getUsers,createUser, getOneUser, updateUser, deleteUser, findMaxAge,findMinAge, login}  = require("../controllers/user.controller");
const{createBook,getAllBooks,getOneBook} = require('../controllers/book.controller')
const {checkToken} = require("../middlewares/token_validation")

router.get('/',checkToken,getUsers);
router.post('/users',createUser);
router.get('/users/:id',getOneUser);
router.patch('/users/:id',updateUser);
router.delete('/delete/:id',deleteUser);
router.get('/maxage',findMaxAge);
router.get('/minage',findMinAge);
router.post('/login',login);


router.post('/book',createBook);
router.get('/book',getAllBooks);
router.get('/book/:id',getOneBook);
module.exports = router;
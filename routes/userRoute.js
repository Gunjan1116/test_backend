const express = require('express');
// const multer = require('multer');
const router = express.Router();
const { submitForm, getRegistrationForm, loginUserRegistration, getCurrentUser, updateUser, applyFilter } = require('../controllers/userController');


// const singleStorage = multer.memoryStorage()

// const upload = multer({ dest: "uploads/" });
// const singleUpload = multer({ storage: singleStorage })

router.patch('/update-registration-form/:userId' ,updateUser);

router.post('/submit-registration-form', submitForm);
router.get('/registration-form', getRegistrationForm);
router.get('/registration-form/:id', getCurrentUser)
router.post('/login', loginUserRegistration);
router.post('/apply-filter', applyFilter);

module.exports = router;

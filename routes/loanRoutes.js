const express = require('express');
const router = express.Router();
const {
    calculateLoan,
    submitLoanRequest,
    getMyLoans,
    getAllLoans,
    updateLoanStatus
} = require('../controllers/loanController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/calculate', calculateLoan);
router.route('/')
    .post(protect, submitLoanRequest)
    .get(protect, admin, getAllLoans);
router.get('/my-loans', protect, getMyLoans);
router.put('/:id', protect, admin, updateLoanStatus);

module.exports = router;
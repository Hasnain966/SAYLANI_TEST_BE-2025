const Loan = require('../models/loanModel');
const User = require('../models/userModel');

// @desc    Calculate loan details
// @route   POST /api/loans/calculate
// @access  Public
const calculateLoan = async (req, res) => {
    try {
        const { initialDeposit, loanPeriod, category } = req.body;

        const totalLoan = initialDeposit * 2;
        const monthlyPayment = totalLoan / (loanPeriod * 12);
        const interestRate = 5;
        const totalInterest = (totalLoan * interestRate * loanPeriod) / 100;
        const totalPayable = totalLoan + totalInterest;

        res.json({
            totalLoan,
            monthlyPayment,
            totalInterest,
            totalPayable,
            period: loanPeriod
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Submit loan request
// @route   POST /api/loans
// @access  Private
const submitLoanRequest = async (req, res) => {
    try {
        const {
            amount,
            purpose,
            duration,
            monthlyIncome,
            guarantor1,
            guarantor2,
            category,
            subcategory
        } = req.body;

        // Calculate loan details
        const interestRate = 5;
        const totalInterest = (amount * interestRate * duration) / 100;
        const totalPayable = amount + totalInterest;
        const monthlyPayment = totalPayable / (duration * 12);

        const loan = await Loan.create({
            user: req.user._id,
            amount,
            purpose,
            duration,
            monthlyIncome,
            guarantor1,
            guarantor2,
            category,
            subcategory,
            monthlyPayment,
            totalInterest,
            totalPayable,
            appointmentDate: new Date(Date.now() + 86400000) // Next day
        });
        await loan.save()
        res.status(201).json(loan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get user's loans
// @route   GET /api/loans/my-loans
// @access  Private
const getMyLoans = async (req, res) => {
    try {
        const loans = await Loan.find({ user: req.user._id });
        res.json(loans);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all loans (admin)
// @route   GET /api/loans
// @access  Private/Admin
const getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.find({}).populate('user', 'name email');
        res.json(loans);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update loan status
// @route   PUT /api/loans/:id
// @access  Private/Admin
const updateLoanStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const loan = await Loan.findById(req.params.id);

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        loan.status = status;
        await loan.save();

        res.json(loan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    calculateLoan,
    submitLoanRequest,
    getMyLoans,
    getAllLoans,
    updateLoanStatus
};
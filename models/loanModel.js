const mongoose = require('mongoose');

const guarantorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const loanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true,
        enum: ['wedding', 'education', 'business', 'home']
    },
    duration: {
        type: Number,
        required: true
    },
    monthlyIncome: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Under Review'],
        default: 'Pending'
    },
    guarantor1: guarantorSchema,
    guarantor2: guarantorSchema,
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    monthlyPayment: {
        type: Number,
        required: true
    },
    totalInterest: {
        type: Number,
        required: true
    },
    totalPayable: {
        type: Number,
        required: true
    },
    appointmentDate: {
        type: Date
    }
}, {
    timestamps: true
});

const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan;
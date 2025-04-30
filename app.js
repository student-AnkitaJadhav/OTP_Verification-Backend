// const inputs = document.querySelectorAll(".input-field input");
// const emailInput = document.getElementById("email");
// const sendBtn = document.getElementById("send-otp");
// const verifyBtn = document.getElementById("verify-otp");
// const message = document.getElementById("message");
// const timerDisplay = document.getElementById("resend-timer");

// let resendTimeout;

// window.addEventListener("load", () => {
//     inputs[0].disabled = false;
//     inputs[0].focus();
// });

// function isValidEmail(email) {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// inputs.forEach((input, idx) => {
//     input.addEventListener("keyup", (e) => {
//         if (input.value.length > 1) {
//             input.value = "";
//             return;
//         }

//         const nextInput = input.nextElementSibling;
//         const prevInput = input.previousElementSibling;

//         if (nextInput && nextInput.disabled && input.value) {
//             nextInput.disabled = false;
//             nextInput.focus();
//         }

//         if (e.key === "Backspace" && prevInput) {
//             inputs.forEach((inp, j) => {
//                 if (j >= idx) {
//                     inp.disabled = true;
//                     inp.value = "";
//                 }
//             });
//             prevInput.focus();
//         }
//     });
// });

// sendBtn.addEventListener("click", async () => {
//     const email = emailInput.value.trim();
//     if (!isValidEmail(email)) {
//         message.textContent = "Please enter a valid email address.";
//         return;
//     }

//     try {
//         const res = await fetch("http://localhost:5000/api/otp/send", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email })
//         });
//         const data = await res.json();
//         message.textContent = data.message || "OTP sent!";

//         inputs[0].disabled = false;
//         inputs[0].focus();
//         inputs.forEach((inp, i) => {
//             if (i > 0) inp.disabled = true;
//             inp.value = "";
//         });

//         startTimer();
//     } catch (err) {
//         message.textContent = "Failed to send OTP.";
//     }
// });

// verifyBtn.addEventListener("click", async (e) => {
//     e.preventDefault();
//     const otp = Array.from(inputs).map(input => input.value).join("");
//     const email = emailInput.value.trim();

//     if (!isValidEmail(email)) {
//         message.textContent = "Invalid email format.";
//         return;
//     }

//     if (otp.length < 4) {
//         message.textContent = "Enter complete OTP";
//         return;
//     }

//     try {
//         const res = await fetch("http://localhost:5000/api/otp/verify", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, otp })
//         });
//         const data = await res.json();
//         message.textContent = data.message;
//     } catch (err) {
//         message.textContent = "OTP verification failed";
//     }
// });

// function startTimer() {
//     let time = 60;
//     sendBtn.disabled = true;

//     resendTimeout = setInterval(() => {
//         time--;
//         timerDisplay.textContent = `Resend OTP in ${time}s`;

//         if (time === 0) {
//             clearInterval(resendTimeout);
//             timerDisplay.textContent = "";
//             sendBtn.disabled = false;
//         }
//     }, 1000);
// }


const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json()); // Middleware to parse JSON


app.use(session({
        secret: 'supersecretkey',
        resave: false,
        saveUninitialized: true,
        cookie: {secure:false}
}));

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth',authRoutes);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
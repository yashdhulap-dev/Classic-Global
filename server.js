const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Website files serve karega
app.use(express.static(__dirname));

// Gmail transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact Form API
app.post("/api/sendMail", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            message
        } = req.body;

        if (!name || !email || !message) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });

        }

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: "cclassicglobalwebsite@gmail.com",

            replyTo: email,

            subject: `New Contact Message - ${name}`,

            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">

                    <h2>New Contact Form Message</h2>

                    <p>
                        <strong>Name:</strong>
                        ${name}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${email}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${phone || "Not provided"}
                    </p>

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <p>
                        ${message}
                    </p>

                    <hr>

                    <p>
                        Sent from Classic Global Website
                    </p>

                </div>
            `
        });

        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {

        console.error("EMAIL ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send message."
        });

    }

});

// Server start
app.listen(PORT, () => {

    console.log(
        `Classic Global running at http://localhost:${PORT}`
    );

});
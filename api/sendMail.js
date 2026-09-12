const nodemailer = require("nodemailer");

module.exports = async (req, res) => {

    // Only POST request allowed
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {

        const {
            name,
            email,
            phone,
            message
        } = req.body;

        // Required fields check
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Gmail transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send email
        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: "cclassicglobalwebsite@gmail.com",

            replyTo: email,

            subject: `New Contact Message - ${name}`,

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background: #f5f5f5;
                ">

                    <div style="
                        background: white;
                        padding: 25px;
                        border-radius: 10px;
                    ">

                        <h2 style="color: #0f766e;">
                            New Contact Form Message
                        </h2>

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

                </div>
            `
        });

        // Success response
        return res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {

        console.error("EMAIL ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to send message."
        });

    }
};
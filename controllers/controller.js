const validator = require('express-validator');
const nodemailer = require('nodemailer');

const { check, validationResult, matchedData } = require('express-validator');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PSSW
    }
});


// renderizar la pagina home
exports.index = function(req, res) {
    res.render('index');
};

// renderizar la pagina generic
exports.generic = function(req, res) {
    res.render('generic');
};

// renderizar la pagina elements
exports.elements = function(req, res) {
    res.render('elements');
};

// metodo para enviar correo
exports.send_email = [
    check('name')
    .isLength({ min: 1 })
    .withMessage('Nombre es Requerido')
    .trim(),
    check('email')
    .isEmail()
    .withMessage('El correo no es correcto')
    .bail()
    .trim()
    .normalizeEmail(),
    check('message')
    .isLength({ min: 1 })
    .withMessage('Mensaje es Requerido'),
    check('phone')
    .isLength({ min: 1 })
    .withMessage('Teléfono es Requerido')
    .trim(),
    (req, res, next) => {

        const { name, email, phone, message } = req.body;
        const contentHTML = `
            <h1>User Information</h1>
            <ul>
                <li>Nombres: ${ name } </li>
                <li>Correo: ${ email } </li>
                <li>Teléfono: ${ phone } </li>
            </ul>
            <p> ${ message } </p>
        `;

        const mailOptions = {
            from: `'<Finsolred Server>', <edisson1407.test@gmail.com>`,
            to: `<${ email }>, <edisson1407.test@gmail.com>`,
            subject: "Website Contact Form",
            html: contentHTML
        };

        console.log('Sending email...');
        transporter.sendMail(mailOptions).then((resp) => {
            console.log('Email sended: ', resp);
            res.status(200).send({ status: 'success', message: 'Correo enviado con exito' });
        }, (error) => {
            console.log('Hubo un error: ', error);
            res.status(500).send({ status: 'failed', message: 'No se pudo enviar el correo' });
        });
    }
];
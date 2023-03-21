var email = require("emailjs/email");
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

module.exports = (formulario: any) => {
	const token: string = jwt.sign(formulario.email, process.env.TOKEN_SECRET || 'prueba');
	console.log(formulario.email)
	var server = email.server.connect({
		user: "prueba@.com",
		password: "*****",
		host: "smtp.hostinger.com",
		ssl: true,
	});

	var message: any = {};

	message =
	{
		from: "Desarrollo prueba <prueba@.com>",
		to: formulario.email,
		bcc: "",
		subject: "Cambio de contraseña",
		attachment: [
			{
				data: `
						En la siguiente liga podrás cambiar tu contraseña:
						<a href="http://localhost:4200/cambiarContrasena/${token}" >RECUPERAR</a>
						`,
				alternative: true
			}
		]
	};
	server.send(message, function (err: any, message: any) { 
		console.log(1);
		console.log('Error:', err)
		console.log('Respuesta', message)
	});
}

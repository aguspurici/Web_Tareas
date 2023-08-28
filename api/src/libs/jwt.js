import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

// Función para crear un token de acceso
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    // Firmar el token utilizando el payload, la clave secreta y una fecha de expiración de 1 día
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        reject(err); // Si hay un error al firmar el token, rechazar la promesa con el error
      } else {
        resolve(token); // Si se firma correctamente, resolver la promesa con el token generado
      }
    });
  });
}
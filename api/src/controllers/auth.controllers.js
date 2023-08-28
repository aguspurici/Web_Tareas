import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

// Función para registrar un nuevo usuario
export const register = async (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return res
        .status(400)
        .json(["The email is already in use"]);
    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear una nueva instancia de usuario
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // Guardar el nuevo usuario en la base de datos
    const userSaved = await newUser.save();

    // Crear un token de acceso para el usuario registrado
    const token = await createAccessToken({ id: userSaved._id });

    // Establecer la cookie de token en la respuesta
    res.cookie("token", token);

    // Responder con los detalles del usuario registrado
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      creartedAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

// Función para iniciar sesión
export const login = async (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const { email, password } = req.body;

  try {
    // Buscar al usuario por su dirección de correo electrónico en la base de datos
    const userFound = await User.findOne({ email });

    // Verificar si el usuario no existe
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, userFound.password);

    // Verificar si la contraseña es incorrecta
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    // Crear un token de acceso para el usuario autenticado
    const token = await createAccessToken({ id: userFound._id });

    // Establecer la cookie de token en la respuesta
    res.cookie("token", token);

    // Responder con los detalles del usuario autenticado
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      creartedAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

// Función para cerrar sesión
export const logout = (req, res) => {
  // Establecer la cookie de token vacía y con una fecha de expiración en el pasado
  res.cookie("token", "", {
    expires: new Date(0),
  });

  // Enviar una respuesta con el código de estado 200 (OK)
  return res.sendStatus(200);
};

// Función para obtener el perfil del usuario
export const profile = async (req, res) => {
  // Buscar al usuario por su ID en la base de datos
  const userFound = await User.findById(req.user.id);

  // Verificar si el usuario no existe
  if (!userFound) return res.status(400).json({ message: "User not found" });

  // Responder con los detalles del perfil del usuario encontrado
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    creartedAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

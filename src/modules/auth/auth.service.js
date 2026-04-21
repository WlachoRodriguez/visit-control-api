import { prisma } from "../../config/prisma.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

export const register = async (
  email,
  password,
  name,
  lastName,
  role,
  isActive,
) => {
  const hashed = await hashPassword(password);

  return prisma.user.create({
    data: { email, password: hashed, name, lastName, role, isActive },
  });
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("Email incorrecto");
  if (!user.isActive) throw new Error("Usuario no activo");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Contraseña incorrecta");

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
    },
  };
};

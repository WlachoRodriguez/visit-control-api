import { prisma } from "../../config/prisma.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

export const register = async (email, password) => {
  const hashed = await hashPassword(password);

  return prisma.user.create({
    data: { email, password: hashed },
  });
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("Email incorrecto");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Contraseña incorrecta");

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });

  return { token };
};

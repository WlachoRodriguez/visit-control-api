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
  districtId,
) => {
  const hashed = await hashPassword(password);

  return prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      lastName,
      role,
      isActive,
      districtId,
    },
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
      districtId: user.districtId,
    },
  };
};

export const changePassword = async (
  userId,
  currentPassword,
  newPassword,
  confirmPassword,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("Usuario no encontrado");

  const valid = await comparePassword(currentPassword, user.password);
  if (!valid) throw new Error("Contraseña actual incorrecta");

  if (newPassword !== confirmPassword)
    throw new Error("Las contraseñas no coinciden");

  const hashed = await hashPassword(newPassword);

  return await prisma.user.update({
    where: { id: userId },
    data: { password: hashed },
  });
};

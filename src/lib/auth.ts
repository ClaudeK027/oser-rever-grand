import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

/**
 * ═══════════════════════════════════════════════════
 * AUTH — Système d'authentification minimal
 * ═══════════════════════════════════════════════════
 *
 * Gestion JWT + rôles pour l'espace admin ORG.
 * Prêt pour la multi-utilisateur.
 */

/* ── Rôles disponibles ── */
export type UserRole = "super_admin" | "admin" | "editor" | "viewer";

export interface AdminUser {
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
}

/* ── Utilisateurs autorisés ── */
// Les mots de passe sont hashés avec bcrypt (10 rounds)
// Pour ajouter un utilisateur, générer un hash via : bcrypt.hashSync("motdepasse", 10)
const ADMIN_USERS: AdminUser[] = [
  {
    email: "conference.oserrevergrand@gmail.com",
    passwordHash: bcrypt.hashSync("OrgAdmin2026!", 10),
    name: "Admin ORG",
    role: "super_admin",
  },
];

/* ── Secret JWT ── */
const JWT_SECRET = new TextEncoder().encode(
  "org-admin-secret-key-2026-do-not-share"
);
const TOKEN_EXPIRY = "24h";
export const COOKIE_NAME = "org-admin-token";

/* ── Vérifier les identifiants ── */
export async function verifyCredentials(
  email: string,
  password: string
): Promise<AdminUser | null> {
  const user = ADMIN_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;

  return user;
}

/* ── Générer un token JWT ── */
export async function createToken(user: AdminUser): Promise<string> {
  return new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

/* ── Vérifier un token JWT ── */
export async function verifyToken(
  token: string
): Promise<{ email: string; name: string; role: UserRole } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { email: string; name: string; role: UserRole };
  } catch {
    return null;
  }
}

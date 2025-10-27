const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../../config/jwt");
const AuthRepository = require("../repositories/auth.repository");
const ProfileRepository = require("../repositories/profile.repository");
const { sequelize } = require("../../database/models");

/**
 * Register user baru
 * @param {object} userData - { name, email, password, passwordConfirmation }
 * @returns {Promise<{ user, token }>}
 */
exports.register = async (userData) => {
  const { name, email, password, passwordConfirmation } = userData;

  // Validasi password confirmation di service layer
  if (password !== passwordConfirmation) {
    throw new Error("Password confirmation does not match password");
  }
  const existingUser = await AuthRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Gunakan transaksi untuk memastikan konsistensi
  const transaction = await sequelize.transaction();

  try {
    // Buat user
    const user = await AuthRepository.create(
      {
        name,
        email,
        password: hashedPassword,
      },
      { transaction }
    );

    // Buat profile otomatis
    console.log("👤 Creating profile for user:", user.id);
    const profile = await ProfileRepository.create(
      {
        userId: user.id,
        displayName: name,
      },
      { transaction }
    );
    console.log("✅ Profile created:", profile ? "YES" : "NO");

    // Commit transaksi
    await transaction.commit();

    // Generate token
    const token = generateAccessToken({ id: user.id, email: user.email });

    return { user: { name: user.name }, token };
  } catch (error) {
    // Rollback jika ada error
    await transaction.rollback();
    console.error("❌ Error during registration:", error);
    throw new Error("Registrasi gagal: " + error.message);
  }
};

/**
 * Login user
 * @param {object} credentials - { email, password }
 * @returns {Promise<{ user, token }>}
 */
exports.login = async (credentials) => {
  const { email, password } = credentials;

  // Cari user berdasarkan email
  const user = await AuthRepository.findByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Verifikasi password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate token
  const token = generateAccessToken({ id: user.id, email: user.email });

  return { user: { name: user.name }, token };
};

/**
 * Delete account
 * @param {string} userId
 * @returns {Promise<{ message: string }>}
 */
exports.deleteAccount = async (userId) => {
  // Hapus user (profile otomatis terhapus karena CASCADE)
  const deleted = await AuthRepository.deleteById(userId);
  if (!deleted) {
    throw new Error("User not found");
  }
  return { message: "Account deleted successfully" };
};

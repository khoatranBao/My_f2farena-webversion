module.exports = {
  env: {
    commonjs: true, // <-- Quan trọng: Cho phép dùng module.exports
    es2021: true,
    node: true,     // <-- Quan trọng: Cho phép dùng các biến toàn cục của Node.js như 'require'
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // Bạn có thể thêm các rule tùy chỉnh ở đây nếu muốn
  },
};
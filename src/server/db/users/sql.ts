export const REGISTER_SQL = `
  INSERT INTO users (username, email, password)
  VALUES ($1, $2, $3)
  RETURNING username, email, password;
`;

export const FIND_BY_EMAIL_SQL = 'SELECT * FROM users WHERE email = $1';

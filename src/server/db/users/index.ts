import bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import db from '../connection';
import { REGISTER_SQL, FIND_BY_EMAIL_SQL } from './sql';

const register = async (username:string, email:string, password:string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const gravatar = createHash('sha256').update(email).digest('hex');
  return db.one(REGISTER_SQL, [username, email, hashedPassword, gravatar]);
};

const login = async (email: string, password: string) => {
  try {
    const user = await db.one(FIND_BY_EMAIL_SQL, [email]);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');
    return user;
  } catch (error: unknown) {  
    if (error instanceof Error) {  
      console.error("Error during login:", error.message); // Access error message
    } else {
      console.error("An unknown error occurred during login");
    }
    throw new Error('Error during login: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }  
};


export default { register, login };

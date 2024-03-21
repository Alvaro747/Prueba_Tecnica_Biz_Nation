import * as bcrypt from 'bcrypt';

/**
 * Function to asynchronously encrypt a password.
 * @param password The password to encrypt.
 * @param saltRounds The number of salt rounds to be used to generate the hash.
 * @returns A promise resolving to the generated hash for the password.
 */
export async function encryptPassword(password: string): Promise<string> {
  const saltRounds: number = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Function to compare a plain text password with a password hash.
 * @param plainTextPassword The plain text password to compare.
 * @param hashedPassword The password hash to compare the plain text password against.
 * @returns True if passwords match, False otherwise.
 */
export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  if (!plainTextPassword || !hashedPassword) {
    return false;
  }
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}

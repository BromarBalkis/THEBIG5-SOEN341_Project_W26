import bcrypt from 'bcrypt'
import { start } from 'node:repl';
const saltRounds = 10;
const plainPassword = 'mySuperSecurePassword123';



const encryptPassword = (password) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            // Handle error
            console.error(err);
            return;
        }
        // Store the resulting 'hash' in your database
        console.log('Hashed password:', hash);
        return hash
    });
}

const decryptPassword = (userProvidedPassword) => {
    console.log(userProvidedPassword)
    const storedHash = "$2b$10$VMvX70v.g.KL.gP9M/4fjeQ3fdieG.w.2.oUPABNxvxNjf05bcA66"
    bcrypt.compare(userProvidedPassword, storedHash, function(err, result) {
    if (err) {
        // Handle error
        console.error(err);
        return;
    }
    console.log(result)
    if (result === true) {
        // Passwords match, grant access (authentication successful)
        console.log('Password is correct!');
    } else {
        // Passwords do not match (authentication failed)
        console.log('Password is incorrect!');
    }
    return result
});
}



export {encryptPassword, decryptPassword}

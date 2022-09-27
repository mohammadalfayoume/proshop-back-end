import bcrypt from 'bcryptjs' // decrypt library: we use it to hash or encrypt the password
// we will use hash sync method to encrypt the password
const users= [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456',10),
    },
    {
        name: 'Jane User',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456',10),
    },
]

export default users
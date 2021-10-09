import express, { Request, Response, Application } from 'express'
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080

const { User } = require('./models')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


// GET ALL USERS
app.get('/users', async(req: Request,res: Response) => {
    const users = await User.findAll()
    return res.status(200).json(users)
})

// POST A NEW USER
app.post('/users', (req: Request,res: Response) => {
    const { firstName, lastName, email } = req.body
    User.create({
        firstName,
        lastName,
        email
    })
     .then(() => res.status(200).send('User data inserted successfully'))
     .catch((err: void) => console.log(err)) 
})

app.listen(PORT, () => console.log(`Server listening to port ${PORT}...`))
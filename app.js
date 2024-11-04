const express = require('express');
const sequelize = require('./config');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Rodando');
});


const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
});

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};


app.post('/signup', async (req, res) => {
  try {
    const userData = userSchema.parse(req.body);
    const hashedPassword = await encryptPassword(userData.password);
    const user = await User.create({
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
    });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`Servidor rodando na porta ${PORT}`);
});


app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'name'], 
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  });
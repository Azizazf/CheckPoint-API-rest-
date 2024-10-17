const express = require('express'); // importation du module express

const dotenv = require('dotenv');// importation du module dotenv

const mongoose = require('mongoose');// importation du module mongoose

const User = require('./models/User'); // import du modele utilisateur 

const router = express.Router();// importation du module router

dotenv.config();// configuration du module dotenv

const app = express();// initialisation de l'application express

app.use(express.json());// utilisation de json



mongoose
    .connect(process.env.MONGO_URI, { // connexion à la base de données
    })
    .then(() => {
        console.log('Connected to MongoDB');
        
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000'); //
        });
    })
    .catch(err => console.error('Could not connect to MongoDB', err));

module.exports = router; // exportation du module router


//ROUTES

// 1 GET : Retournons les utilisateurs 

app.get('/users', async (req, res) => {
    try {
        const users = await user.find(); // récupérer tous les utilisateurs
        res.send('liste des utilisateurs'); // afficher un message
        res.json(users); // afficher les utilisateurs
    } catch (err) {
        res.json({ message: err }); // afficher un message d'erreur
    }
});

// 2 POST : Ajoutons un utilisateur
app.post('/user', async (req, res) => { // ajouter un utilisateur
    try {
        const newUser = new User(req.body); // créer un nouvel utilisateur
        await newUser.save(); // sauvegarder l'utilisateur
        res.status(201).json(newUser);// afficher un message
        res.send('Utilisateur ajouté avec succès');// afficher un message

    } catch (error) {
        res.status(400).json({ message: error }); // afficher un message d'erreur

    }
});

// 3 PUt : Mettons à jour un utilisateur par id

app.put('/user/:id', async (req, res) => {
    try {

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // mettre à jour l'utilisateur
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: 'Erreur lors de la mise a jour de l\'utilisateur' });
    }
});


// 4 DELETE : Supprimons un utilisateur par id

app.delete('/user/:id', async (req, res) => { // supprimer un utilisateur
    try {

        await User.findByIdAndDelete(req.params.id); // supprimer l'utilisateur
        res.json({ message: 'Utilisateur supprimé avec succès' }); // afficher un message
    } catch (error) {
        res.status(400).json({ message: error });
    }
});
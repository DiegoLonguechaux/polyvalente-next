# Asso Polyvalente

Site internet pour l'association polyvalente, réalisé avec Next.js, Tailwind CSS et MongoDB.

## Fonctionnalités

- **Partie Publique** :
  - Page d'accueil
  - Liste des évènements
  - Détail d'un évènement
- **Partie Admin** (`/admin`) :
  - Authentification sécurisée
  - Gestion des évènements (CRUD)
  - Gestion des utilisateurs (Création d'admins)

## Prérequis

- Node.js
- MongoDB

## Installation

1.  Cloner le projet
2.  Installer les dépendances :
    ```bash
    npm install
    ```
3.  Configurer les variables d'environnement :
    Créer un fichier `.env.local` à la racine avec :
    ```env
    MONGODB_URI=mongodb://localhost:27017/polyvalente
    NEXTAUTH_SECRET=votre_secret_super_securise
    NEXTAUTH_URL=http://localhost:3000
    ```
4.  Lancer le serveur de développement :
    ```bash
    npm run dev
    ```

## Premier Démarrage

Pour créer le premier administrateur, vous pouvez utiliser l'API directement ou modifier temporairement le code pour autoriser la création sans authentification si aucun utilisateur n'existe (déjà implémenté dans `/api/users`).

Utilisez Postman ou curl pour créer le premier admin :
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Admin", "email": "admin@example.com", "password": "admin", "role": "admin"}'
```

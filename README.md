# Planning WEI

Page unique servant de planning de shifts pour un week-end d'intégration
multi-BDE. Les participants trouvent leur nom, voient les shifts du jour
en cours et ouvrent la fiche de poste de chaque créneau. L'orga modifie
tout depuis la même page, derrière un mot de passe.

## Fichiers

- `index.html` — toute l'application (HTML, CSS, JS, données de départ)
- `config.js` — la seule chose à remplir : la configuration Firebase
- `plan.jpg` — le plan du camping Lou Broustaricq (2200 px, 677 Ko),
  affiché par le bouton **Plan**. Pour le remplacer, déposer un nouveau
  fichier et corriger son nom et sa largeur dans
  Admin > Personnes, BDE et données > Plan du camping.

## Mise en ligne sur GitHub Pages

1. Nouveau dépôt **public**, par exemple `wei-planning`.
2. Déposer `index.html`, `config.js` et ce fichier à la racine.
3. Onglet **Settings > Pages**, source **Deploy from a branch**,
   branche `main`, dossier `/ (root)`, **Save**.
4. Une à deux minutes plus tard, l'adresse est
   `https://<compte>.github.io/wei-planning/`.

En l'état, la page fonctionne déjà : données fictives, mode local.

## Passer en temps réel (Firebase Firestore)

1. Créer un projet sur <https://console.firebase.google.com> (gratuit).
2. **Build > Firestore Database > Créer une base**, mode production,
   région `eur3` (Europe).
3. Onglet **Règles**, remplacer par :

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /wei/planning {
         allow read: if true;
         allow write: if true;
       }
     }
   }
   ```

   Après le week-end, repasser `write` à `if false;` pour figer le planning.

4. **Paramètres du projet > Tes applications > Web (`</>`)**, déclarer
   l'application, copier l'objet de configuration.
5. Coller les valeurs dans `config.js`, commit, push.
6. Recharger la page : la pastille en haut à droite passe de `LOCAL` à
   `EN DIRECT`. Toute modification faite dans l'admin arrive chez les
   autres en quelques secondes, sans rafraîchir.

## Fonctionnement de la synchronisation

L'état complet (BDE, personnes, jours, shifts, fiches de poste) tient
dans un seul document Firestore, `wei/planning`, stocké sous forme de
chaîne JSON dans le champ `json`. La page s'y abonne au chargement et
republie le document à chaque modification de l'orga, avec un délai de
500 ms pour regrouper les frappes clavier. Dernière écriture gagnante :
à deux personnes qui modifient le même shift en même temps, c'est la
dernière qui compte.

## Mot de passe orga

`wei2026` par défaut, modifiable dans l'admin (Personnes, BDE et données
> L'événement). La vérification est faite dans le navigateur : elle
écarte les curieux, elle n'arrête pas quelqu'un de déterminé.

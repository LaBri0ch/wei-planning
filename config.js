/* ------------------------------------------------------------------
   Configuration du planning WEI.
   Tant que apiKey est vide, la page tourne en mode local (démo) :
   chacun voit les mêmes données de départ et ses modifications ne
   sortent pas de son navigateur.

   Pour activer le temps réel, colle ici la configuration Firebase
   donnée par la console : Paramètres du projet > Tes applications >
   Configuration du SDK. Ces valeurs sont publiques par conception,
   elles identifient le projet, elles ne donnent aucun droit en soi.
------------------------------------------------------------------ */
window.WEI_CONFIG = {
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },

  // Emplacement du planning dans Firestore. À ne changer que si tu veux
  // faire tourner deux plannings sur le même projet Firebase.
  collection: "wei",
  document: "planning"
};

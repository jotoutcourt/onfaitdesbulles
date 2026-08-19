// Config Firebase pour jouer à deux sur deux téléphones différents.
// 1. Crée un projet gratuit sur https://console.firebase.google.com
//    (tu peux réutiliser le même projet que vlog-colo si tu en as déjà un).
// 2. Ajoute une app Web, active Firestore (mode production), colle la config ci-dessous.
// 3. Dans Firestore > Règles, colle par exemple :
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /instinctSessions/{code} {
//          allow read, write: if true;
//        }
//      }
//    }
//
//    (accès ouvert volontairement : pas d'auth, juste un code de partie à 5 caractères,
//    dans l'esprit d'un petit jeu privé entre deux personnes.)
//
// Tant que apiKey n'est pas renseignée, la page fonctionne quand même :
// le mode "deux téléphones" est masqué et on bascule automatiquement
// sur "jouer à deux sur le même téléphone".

var FIREBASE_CONFIG = {
  apiKey: "AIzaSyAmjCR63umfZ_o5xQ6p9AGKoDgpTtyRV9Q",
  authDomain: "instinct-4c291.firebaseapp.com",
  projectId: "instinct-4c291",
  storageBucket: "instinct-4c291.firebasestorage.app",
  messagingSenderId: "620674446375",
  appId: "1:620674446375:web:aa46919db1a59175950a02"
};

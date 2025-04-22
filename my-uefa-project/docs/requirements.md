🎯 Objectif du Projet
Développer une application frontend qui affiche les résultats des 4 matchs de la Journée Quart Finale de Champions League 2024/2025, avec une UX fluide et moderne.

🧰 Stack technique
Framework au choix : nextjs

Consommer l'API :
https://api.sofascore.com/api/v1/sport/football/scheduled-events/2025-04-15

🧑‍💻 Fonctionnalités attendues (User Stories)
⚽ Afficher les 4 matchs de Quart Finale

Afficher nom des équipes, score, heure, date.

Extraire seulement les matchs de Champions League de la journée.

Utiliser un design propre et responsive.

📃 Pagination

2 matchs par page.

Boutons Suivant / Précédent pour naviguer.

📌 Détails d’un match (clic sur un match)

Afficher les détails : buteurs, minute, stade, arbitre, etc.

Utiliser les données disponibles dans l’API.

🏆 "Man of the Match"

Afficher le joueur désigné comme meilleur du match.

Si l'API ne le fournit pas, afficher un message "Non disponible".

📦 Gestion d’état
Vue.js : VueX ou Pinia

React.js : Context API ou Zustand (au choix)

Objectif : stocker les données de matchs pour éviter les appels API redondants.

📱 Design attendu
Responsive mobile & desktop

Simple, clair, moderne

Bonus : animation légère, transitions fluides

🧪 Critères de Qualité
Code clair, structuré, commenté

UX fluide

Affichage rapide

Pagination fonctionnelle

Données filtrées correctement
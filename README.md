# Architect Toolbox Pro

Architect Toolbox Pro est une extension gratuite conçue pour aider les architectes dans leurs projets. Elle regroupe plusieurs outils indispensables :

- **Conversion de pentes** : Convertissez des pourcentages en degrés et vice versa ([`tools/slope/slope.js`](tools/slope/slope.js)).
- **Conversion TVA** : Transformez des montants HT en TTC et inversement ([`tools/ttcHt/ttcHt.js`](tools/ttcHt/ttcHt.js)).
- **Estimation du prix au m²** : Estimez le coût du m² en fonction du type de projet et du niveau de finition ([`tools/estimation/estimation.js`](tools/estimation/estimation.js)).
- **Calcul des cotisations assurance** : Calculez vos cotisations d'assurance en quelques clics ([`tools/insurance/insurance.js`](tools/insurance/insurance.js)).
- **Calcul des pénalités de retard** : Estimez les pénalités encourues en cas de retard sur facturation ([`tools/retard/retard.js`](tools/retard/retard.js)).

## Structure du projet

- **core/**  
  Contient les utilitaires et la configuration utilisateur ([`core/config.js`](core/config.js), [`core/constants.js`](core/constants.js), [`core/utils.js`](core/utils.js)).

- **css/**  
  Styles de l'extension ([`css/styles.css`](css/styles.css)).

- **fonts/** et **icons/**  
  Ressources graphiques et typographiques.

- **popup/**  
  Interface principale de l'extension ([`popup/popup.html`](popup/popup.html), [`popup/popup.js`](popup/popup.js)).

- **tools/**  
  Regroupe les différents outils (estimation, TVA, assurance, retard, pente) avec leurs fichiers HTML et JS respectifs.

- **manifest.json**  
  Déclaration de l'extension pour Chrome/Chromium ([`manifest.json`](manifest.json)).

## Installation

1. Clonez le dépôt :
   ```sh
   git clone <url-du-depot>

// core/utils.js

// Fonction pour afficher l'animation de chargement
export const showLoader = (container) => {
    container.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        Chargement en cours...
      </div>
    `;
  };
  
  // Fonction pour masquer le loader
  export const hideLoader = () => {
    const loader = document.querySelector('.loading');
    if (loader) loader.remove();
  };
  
  // Formate les montants en euros
  export const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Optionnel : Fonction pour afficher les erreurs
  export const showError = (message, container) => {
    container.innerHTML = `
      <div class="error">
        ❌ ${message}
        <small>Veuillez réessayer</small>
      </div>
    `;
  };
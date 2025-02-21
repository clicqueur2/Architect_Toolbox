import { COUTS_TRAVAUX } from '../../core/constants.js';
import { formatCurrency } from '../../core/utils.js';

const SOUS_CATEGORIES = {
  habitats_isoles: ['Surfaces < 100 m²', 'entre 100 et 200 m²', 'Surfaces > 200 m²'],
  habitats_groupes: ['Collectifs privatifs', 'Collectifs locatifs', 'Maisons groupées'],
  activites_services: ['Culture et loisirs', 'Bureaux', 'Commerce et tourisme'],
  equipements_publics: ["Etab. D'enseignements", 'Etablissements de santé', 'Justice sécurité'],
  locaux_production: ['Locaux industriels', 'Locaux de stockage', 'Locaux agricoles'],
  divers_autres: ['Aménagements urbains', 'Ouvrages spéciaux', 'Divers autres']
};

export default class EstimationTool {
  constructor(userConfig) {
    this.user = userConfig;
    this.couts = COUTS_TRAVAUX;
  }

  init() {
    this.typeSelect = document.getElementById('typeProjet');
    this.sousCatGroup = document.getElementById('sousCatGroup');
    this.sousCatSelect = document.getElementById('sousCategorie');
    this.btnCalculer = document.getElementById('btnCalculer');
    this.resultDiv = document.getElementById('resultEstimation');

    this.setupPremiumUI();
    this.setupEventListeners();
  }

  setupPremiumUI() {
    document.querySelectorAll('.premium-feature').forEach(el => {
      el.style.display = this.user.isPremium ? 'block' : 'none';
    });
  }

  setupEventListeners() {
    this.typeSelect.addEventListener('change', () => this.updateSousCategories());
    this.btnCalculer.addEventListener('click', () => this.calculateEstimation());
  }

  updateSousCategories() {
    const type = this.typeSelect.value;
    
    if(this.user.isPremium && SOUS_CATEGORIES[type]) {
      this.sousCatGroup.style.display = 'block';
      this.sousCatSelect.innerHTML = SOUS_CATEGORIES[type]
        .map(sc => `<option value="${sc.replace(/ /g, '_').toLowerCase()}">${sc}</option>`)
        .join('');
    } else {
      this.sousCatGroup.style.display = 'none';
    }
  }

  calculateEstimation() {
    let type = this.typeSelect.value;
    let sousCat = 'global';
    const finition = document.getElementById('finition').value;
    const surface = parseFloat(document.getElementById('surface').value);

    // Gestion version gratuite
    if(!this.user.isPremium) {
      type = 'global';
      this.typeSelect.value = 'global';
    } else {
      sousCat = this.sousCatSelect.value || 'global';
    }

    let prixM2;
    
    if(this.user.isPremium && this.couts.premium[type]?.[sousCat]?.[finition]) {
      prixM2 = this.couts.premium[type][sousCat][finition];
    } else {
      prixM2 = this.couts.gratuit.global[finition];
    }

    if(isNaN(surface) || !prixM2) {
      this.resultDiv.innerHTML = `<div class="error">Veuillez remplir tous les champs correctement</div>`;
      return;
    }

    const total = surface * prixM2;
    
    this.resultDiv.innerHTML = `
      <div class="result-line">
        <span>Type de projet :</span>
        <strong>${this.typeSelect.options[this.typeSelect.selectedIndex].text}</strong>
      </div>
      ${this.user.isPremium ? `<div class="result-line">
        <span>Sous-catégorie :</span>
        <strong>${this.sousCatSelect.options[this.sousCatSelect.selectedIndex].text}</strong>
      </div>` : ''}
      <div class="result-line">
        <span>Prix au m² (${finition}) :</span>
        <strong>${formatCurrency(prixM2)}</strong>
      </div>
      <div class="result-line">
        <span>Surface totale :</span>
        <strong>${surface.toLocaleString('fr-FR')} m²</strong>
      </div>
      <div class="result-total">
        Estimation totale : <strong>${formatCurrency(total)} HT</strong>
      </div>
    `;
  }
}
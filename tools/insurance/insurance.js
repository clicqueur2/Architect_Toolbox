export default class InsuranceTool {
  constructor(userConfig) {
    this.user = userConfig;
    this.taux = {
      base: 0.005772,
      protection: 0.00165,
      rc: 0.00011
    };
  }

  init() {
    this.montantInput = document.getElementById('montant');
    this.tauxSelect = document.getElementById('taux');
    this.cotraitantsInput = document.getElementById('cotraitants');
    this.protectionCheckbox = document.getElementById('protectionCheckbox');
    this.calcBtn = document.getElementById('calcInsurance');
    this.protectionRow = document.getElementById('protectionRow');

    this.calcBtn.addEventListener('click', () => this.calculate());
  }

  calculate() {
    const montant = parseFloat(this.montantInput.value);
    const taux = parseFloat(this.tauxSelect.value) / 100;
    const nombreCotraitants = parseFloat(this.cotraitantsInput.value);
    const part = 100 / nombreCotraitants / 100;
    const includeProtection = this.protectionCheckbox.checked;
    
    const base = montant * taux * part;
    
    // Calcul des composants
    const cotisation = base * this.taux.base;
    const protection = includeProtection ? base * this.taux.protection : 0;
    const rc = base * this.taux.rc;
    
    // Affichage des résultats
    document.getElementById('base').textContent = base.toFixed(2) + ' €';
    document.getElementById('cotisation').textContent = cotisation.toFixed(2) + ' €';
    document.getElementById('protection').textContent = protection.toFixed(2) + ' €';
    document.getElementById('rc').textContent = rc.toFixed(2) + ' €';
    
    // Gestion de la visibilité de la protection
    this.protectionRow.style.display = includeProtection ? 'table-row' : 'none';
    
    // Calcul du total
    const total = cotisation + protection + rc;
    document.getElementById('total').textContent = total.toFixed(2) + ' €';
  }
}
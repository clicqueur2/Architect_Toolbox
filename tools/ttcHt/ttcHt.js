export default class TtcHtTool {
  constructor(userConfig) {
    this.user = userConfig;
    this.countryRates = {
      FR: {
        new: 0.20,
        reno: 0.10,
        energy: 0.055
      },
      BE: {
        default: 0.21
      }
    };
  }

  init() {
    this.countrySelect = document.getElementById('countrySelect');
    this.conversionType = document.getElementById('conversionType');
    this.workType = document.getElementById('workType');
    this.tvaRate = document.getElementById('tvaRate');
    this.amountInput = document.getElementById('amount');
    this.calcBtn = document.getElementById('calcTVA');
    
    this.htAmount = document.getElementById('htAmount');
    this.ttcAmount = document.getElementById('ttcAmount');
    this.tvaAmount = document.getElementById('tvaAmount');

    this.legalTextFR = document.getElementById('legalTextFR');
    this.legalTextBE = document.getElementById('legalTextBE');

    this.countrySelect.addEventListener('change', () => this.updateInterface());
    this.conversionType.addEventListener('change', () => this.updateLabels());
    this.workType.addEventListener('change', () => this.updateTvaOptions());
    this.calcBtn.addEventListener('click', () => this.calculate());
    this.amountInput.addEventListener('input', () => this.calculate());

    this.updateInterface();
  }

  updateInterface() {
    const country = this.countrySelect.value;
    const isBelgium = country === 'BE';

    // Masquer/afficher les éléments
    document.getElementById('workTypeGroup').style.display = isBelgium ? 'none' : 'block';
    this.tvaRate.disabled = isBelgium;

    // Mettre à jour les taux
    this.updateTvaOptions();

    // Mettre à jour les mentions légales
    this.legalTextFR.style.display = isBelgium ? 'none' : 'inline';
    this.legalTextBE.style.display = isBelgium ? 'inline' : 'none';

    this.updateLabels();
  }

  updateTvaOptions() {
    const country = this.countrySelect.value;
    const workType = this.workType.value;
    const rate = country === 'BE' ? 0.21 : this.countryRates[country][workType];
    
    this.tvaRate.innerHTML = `
      <option value="${rate}">${(rate * 100).toFixed(country === 'BE' ? 0 : 1)}%</option>
    `;
  }

  updateLabels() {
    const isHtToTtc = this.conversionType.value === 'htToTtc';
    this.amountInput.placeholder = isHtToTtc ? 'Montant HT (ex: 100000)' : 'Montant TTC (ex: 120000)';
  }

  calculate() {
    const country = this.countrySelect.value;
    const workType = this.workType.value;
    const rate = country === 'BE' ? 0.21 : this.countryRates[country][workType];
    const amount = parseFloat(this.amountInput.value);

    if (!amount || isNaN(amount)) {
      this.clearResults();
      return;
    }

    let ht, ttc, tva;
    const isHtToTtc = this.conversionType.value === 'htToTtc';

    if (isHtToTtc) {
      ht = amount;
      tva = ht * rate;
      ttc = ht + tva;
    } else {
      ttc = amount;
      ht = ttc / (1 + rate);
      tva = ttc - ht;
    }

    this.displayResults(ht, ttc, tva, isHtToTtc);
  }

  displayResults(ht, ttc, tva, isHtToTtc) {
    if (isHtToTtc) {
      this.htAmount.textContent = this.formatCurrency(ht);
      this.ttcAmount.textContent = this.formatCurrency(ttc);
    } else {
      this.ttcAmount.textContent = this.formatCurrency(ttc);
      this.htAmount.textContent = this.formatCurrency(ht);
    }
    this.tvaAmount.textContent = this.formatCurrency(tva);
  }

  clearResults() {
    this.htAmount.textContent = '0.00 €';
    this.ttcAmount.textContent = '0.00 €';
    this.tvaAmount.textContent = '0.00 €';
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
}
export default class RetardCalculator {
    constructor(config) {
      this.config = config;
    }
  
    init() {
      document.getElementById('calculateBtn').addEventListener('click', () => this.calculate());
    }
  
    calculate() {
      const dueDate = new Date(document.getElementById('dueDate').value);
      const amount = parseFloat(document.getElementById('amount').value);
      const penaltyRate = parseFloat(document.getElementById('penaltyRate').value);
      const isProfessional = document.getElementById('isProfessional').checked;
      const paymentDate = new Date(); // Date actuelle
  
      if (!dueDate || isNaN(amount) || isNaN(penaltyRate)) {
        this.showError("Tous les champs doivent être remplis");
        return;
      }
  
      if (dueDate > paymentDate) {
        this.showError("La date d'échéance est dans le futur");
        return;
      }
  
      const daysLate = this.calculateDaysLate(dueDate, paymentDate);
      const penalties = this.calculatePenalties(amount, penaltyRate, daysLate, isProfessional);
      
      this.displayResults(penalties, daysLate);
    }
  
    calculateDaysLate(dueDate, paymentDate) {
      const timeDiff = paymentDate.getTime() - dueDate.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
  
    calculatePenalties(amount, rate, days, isProfessional) {
      const interest = (amount * rate * days) / (365 * 100);
      return interest + (isProfessional ? 40 : 0);
    }
  
    displayResults(total, days) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = `
        <h3>Résultats (${days} jours de retard)</h3>
        <h3 class="result-line">
          <span class="result-label">Intérêts de retard :</span>
          <span class="result-value">${total.toFixed(2)} €</span>
        </h3>
        ${document.getElementById('isProfessional').checked ? 
          `<h3 class="result-line">
            <span class="result-label">Dont indemnité forfaitaire :</span>
            <span class="result-value">40.00 €</span>
          </h3>` : ''}
      `;
    }
  
    showError(message) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = `<div class="error">❌ ${message}</div>`;
    }
  }
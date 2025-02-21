export default class SlopeTool {
    constructor(userConfig) {
      this.user = userConfig;
    }
  
    init() {
      this.percentInput = document.getElementById('percentInput');
      this.degreesInput = document.getElementById('degreesInput');
      this.slopeResult = document.getElementById('slopeResult');
      this.percentResult = document.getElementById('percentResult');
  
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      document.getElementById('convertPercent').addEventListener('click', () => {
        const percent = parseFloat(this.percentInput.value);
        if (!isNaN(percent)) {
          const degrees = this.percentToDegrees(percent);
          this.slopeResult.textContent = `${degrees.toFixed(2)}°`;
        }
      });
  
      document.getElementById('convertDegrees').addEventListener('click', () => {
        const degrees = parseFloat(this.degreesInput.value);
        if (!isNaN(degrees)) {
          const percent = this.degreesToPercent(degrees);
          this.percentResult.textContent = `${percent.toFixed(2)}%`;
        }
      });
    }
  
    percentToDegrees(percent) {
      return Math.atan(percent / 100) * (180 / Math.PI);
    }
  
    degreesToPercent(degrees) {
      return Math.tan(degrees * (Math.PI / 180)) * 100;
    }
  }
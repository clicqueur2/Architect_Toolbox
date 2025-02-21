export class UserConfig {
    static isPremium = true;
    
    static setPremiumStatus(status) {
      this.isPremium = status;
    }
  }
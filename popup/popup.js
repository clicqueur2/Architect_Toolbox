import { UserConfig } from '../core/config.js';
import { showLoader, hideLoader } from '../core/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const toolSelector = document.getElementById('toolSelector');
  const toolContent = document.getElementById('toolContent');

  toolSelector.addEventListener('change', async (e) => {
    const toolId = e.target.value;
    if (!toolId) return;

    showLoader(toolContent);
    
    try {
      // Chargement du JS
      const { default: ToolClass } = await import(`/tools/${toolId}/${toolId}.js`);
      const toolInstance = new ToolClass(UserConfig);
      
      // Chargement du HTML
      const response = await fetch(`/tools/${toolId}/${toolId}.html`);
      if (!response.ok) throw new Error('Fichier introuvable');
      toolContent.innerHTML = await response.text();
      
      // Initialisation avec timeout
      setTimeout(() => {
        try {
          toolInstance.init();
        } catch (initError) {
          throw new Error(`Erreur d'initialisation: ${initError.message}`);
        }
      }, 50);
      
    } catch (error) {
      toolContent.innerHTML = `
        <div class="error">
          ❌ Échec du chargement : ${error.message}
          <br><small>Vérifiez la console pour plus de détails</small>
        </div>
      `;
      console.error('Erreur:', error);
    } finally {
      hideLoader();
    }
  });
});
// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  baseURL: API_BASE_URL,
  
  // Helper pour faire des requêtes
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('auth_token');
    
    console.log("🌐 Requête API:", url, options.method || 'GET');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });
      
      console.log("📡 Réponse API:", response.status, response.statusText);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Erreur serveur' }));
        console.error("❌ Erreur API:", response.status, error);
        throw new Error(error.error || 'Erreur lors de la requête');
      }
      
      const data = await response.json();
      console.log("✅ Données reçues:", data);
      return data;
    } catch (error: any) {
      console.error("💥 Erreur fetch:", error);
      throw error;
    }
  },
  
  // Méthodes HTTP
  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  },
  
  post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  },
};

export default api;


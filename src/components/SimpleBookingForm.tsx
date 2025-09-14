// Simple booking form for testing
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SimpleBookingForm = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Simple form submitted:', { checkIn, checkOut, guests });
    
    // Store data and navigate
    localStorage.setItem('quickBookingData', JSON.stringify({ checkIn, checkOut, guests }));
    navigate('/booking');
  };

  return (
    <div style={{ 
      background: 'white', 
      padding: '20px', 
      margin: '20px', 
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4F46E5' }}>
        Formulaire de Réservation Simple
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div>
          <label>Arrivée:</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
            style={{ marginLeft: '5px', padding: '5px' }}
          />
        </div>
        
        <div>
          <label>Départ:</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            style={{ marginLeft: '5px', padding: '5px' }}
          />
        </div>
        
        <div>
          <label>Hôtes:</label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            style={{ marginLeft: '5px', padding: '5px' }}
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'personne' : 'personnes'}</option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          style={{
            background: '#4F46E5',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Vérifier Disponibilité
        </button>
      </form>
    </div>
  );
};

export default SimpleBookingForm;

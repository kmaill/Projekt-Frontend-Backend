import { mockWorkspaces } from '../mockData';

export const Register = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dostępne przestrzenie SpaceSync</h1>
      <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        
        {mockWorkspaces.map((space) => (
          <div key={space.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{space.name}</h3>
            <p><strong>Typ:</strong> {space.type === 'DESK' ? 'Biurko' : 'Sala'}</p>
            <p><strong>Cena:</strong> {space.pricePerHour} PLN / h</p>
            <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Rezerwuj</button>
          </div>
        ))}
        
      </div>
    </div>
  );
};
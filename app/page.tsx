export default function DashboardPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Lehleka App</h1>
      <p>Your pregnancy tracking companion</p>
      <div style={{ marginTop: '2rem' }}>
        <a href="/profile" style={{ 
          display: 'inline-block', 
          padding: '0.5rem 1rem', 
          backgroundColor: '#007bff', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '4px' 
        }}>
          Go to Profile
        </a>
      </div>
    </div>
  );
}

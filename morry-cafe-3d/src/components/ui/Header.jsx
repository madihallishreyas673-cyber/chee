import { useAppStore } from '../../store/appStore'

function Header({ onStaffClick }) {
  const { cart, orders } = useAppStore()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const pendingOrders = orders.filter(o => o.status === 'pending').length

  return (
    <header className="header">
      <a href="/" className="logo" title="Morry's Cafe">
        <div className="logo-icon">M</div>
        <span className="logo-text">Morry's Cafe</span>
      </a>

      <nav className="header-actions">
        <a href="#menu" className="nav-link">Menu</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact</a>

        <button className="btn-secondary" onClick={onStaffClick}>
          👨‍🍳 Staff Dashboard
          {pendingOrders > 0 && (
            <span style={{
              marginLeft: 8,
              padding: '2px 8px',
              background: '#fbbf24',
              color: '#1a1a2e',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: 700
            }}>
              {pendingOrders}
            </span>
          )}
        </button>

        <button className="btn-primary" style={{ position: 'relative' }}>
          🛒 Cart
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              background: '#e86c5a',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 700,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  )
}

export default Header
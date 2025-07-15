import './LandingPage.css'
import { Link } from "react-router";

function LandingPage() {
  const handleLoginBtn = () => {
    alert("Signin Button Clicked")
  }
  const handleRegistrationBtn = () => {
    alert("create account button clicked")
  }
  return (
      <div className="landing-container">
        <div className="hero-section">
            <div className="hero-content">
                <div className="brand-logo">Kayarents</div>
                <h1 className="hero-title">Find Your Perfect Backroom Stay</h1>
                <p className="hero-subtitle">
                    Discover affordable, safe, and verified backroom accommodations in your community. 
                    Join thousands of satisfied guests and hosts.
                </p>
                
                <ul className="feature-list">
                    <li className="feature-item">
                        <div className="feature-icon">🏠</div>
                        <span>Verified accommodations</span>
                    </li>
                    <li className="feature-item">
                        <div className="feature-icon">🔒</div>
                        <span>Safe and secure bookings</span>
                    </li>
                    <li className="feature-item">
                        <div className="feature-icon">💰</div>
                        <span>Affordable pricing</span>
                    </li>
                    <li className="feature-item">
                        <div className="feature-icon">⭐</div>
                        <span>Trusted by community</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <div className="auth-section">
            <div className="auth-header">
                <h2>Get Started</h2>
                <p>Join our community of travelers and hosts</p>
            </div>
            
            <div className="auth-options">
                <Link to="/login" className="auth-btn login-btn" onClick={handleLoginBtn}>
                    <span className="btn-icon">🔑</span>
                    <span>Sign In</span>
                </Link>
                
                <a href="#" className="auth-btn register-btn" onClick={handleRegistrationBtn}>
                    <span className="btn-icon">✨</span>
                    <span>Create Account</span>
                </a>
            </div> 
            <div className="footer-text">
                By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </div>
        </div>
    </div>
  )
}

export default LandingPage
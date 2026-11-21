import { Play, Search } from "lucide-react";
import "./LandingPage.css";

interface LandingPageProps {
  onStartGame: (gameName: string) => void;
}

export default function LandingPage({ onStartGame }: LandingPageProps) {
  return (
    <div className="mfe-template__landing">
      <div className="mfe-template__landing-container">
        <div className="mfe-template__landing-header">
          <h1 className="mfe-template__landing-title">
            Data Literacy Learning Games
          </h1>
          <p className="mfe-template__landing-subtitle">
            Interactive games to develop critical thinking with education data
          </p>
        </div>

        <div className="mfe-template__games-grid">
          <button
            type="button"
            className="mfe-template__game-card"
            onClick={() => onStartGame("evidence")}
          >
            <div className="mfe-template__game-card-icon">
              <Search size={40} />
            </div>
            <h2 className="mfe-template__game-card-title">The Missing Context</h2>
            <p className="mfe-template__game-card-description">
              Discover why data without context cannot be meaningfully compared.
            </p>
            <div className="mfe-template__game-card-action">
              <Play size={20} />
              <span>Start Game</span>
            </div>
          </button>
        </div>

        <div className="mfe-template__landing-footer">
          <p className="mfe-template__footer-text">
            More challenges coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}

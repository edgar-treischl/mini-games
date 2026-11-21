import { useState } from 'react'
import LandingPage from './LandingPage'
import EvidenceGame from './EvidenceGame'
import './App.css'

type GameState = 'landing' | 'evidence'

function App() {
  const [gameState, setGameState] = useState<GameState>('landing')

  const handleStartGame = (gameName: string) => {
    if (gameName === 'evidence') {
      setGameState('evidence')
    }
  }

  const handleBackToLanding = () => {
    setGameState('landing')
  }

  return (
    <div className="mfe-template">
      {gameState === 'landing' && <LandingPage onStartGame={handleStartGame} />}
      {gameState === 'evidence' && <EvidenceGame onBack={handleBackToLanding} />}
    </div>
  )
}

export default App

import logo from './logo.svg';
import './App.css';

import VerticalContainer from './VerticalContainer';
import GameLayout from './GameLayout';

function App() {
  return (
    <>
    <VerticalContainer>
    <div className="flex flex-col items-center justify-center min-h-screen">
      <GameLayout />
    </div>

    </VerticalContainer>
    </>
  );
}

export default App;

import './styles/App.css';
import Card from './components/Card';
import { SocketProvider } from './components/SocketContext';
import { ResultProvider } from './components/ResultContext';



function App() {
  
  return (
      <div className="App">
        <SocketProvider>
          <ResultProvider>
              <Card/>
          </ResultProvider>
        </SocketProvider>
      </div>
  );
}

export default App;

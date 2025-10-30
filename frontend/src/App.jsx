import { ReactFlowProvider } from 'reactflow';
import FlowComponent from './components/FlowComponent';

function App() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <ReactFlowProvider>
        <FlowComponent />
      </ReactFlowProvider>
    </div>
  );
}

export default App;

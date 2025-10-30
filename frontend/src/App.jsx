import { ReactFlowProvider } from 'reactflow';
import FlowComponent from './components/FlowComponent';

function App() {
  return (
    <ReactFlowProvider>
      <FlowComponent />
    </ReactFlowProvider>
  );
}

export default App;

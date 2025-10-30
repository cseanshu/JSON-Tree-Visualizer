import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

function TreeVisualization({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onNodeClick,
}) {
  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <svg
            className="mx-auto h-16 w-16 mb-4 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg font-medium">Enter JSON and click "Generate Tree"</p>
        </div>
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      fitView
      attributionPosition="bottom-left"
      className="bg-gray-100"
    >
      <Background color="#d1d5db" gap={20} size={1} />
      <Controls className="bg-white border-gray-300 rounded-lg shadow-lg" />
    </ReactFlow>
  );
}

export default TreeVisualization;

import JsonInputPanel from './JsonInputPanel';
import SearchBar from './SearchBar';
import TreeVisualization from './TreeVisualization';
function FlowPresentation({
  jsonInput,
  setJsonInput,
  error,
  handleGenerateTree,
  handleClearJSON,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleClearSearch,
  searchMessage,
  copyMessage,
  nodes,
  handleDownloadImage,
  handleClearTree,
  edges,
  onNodesChange,
  onEdgesChange,
  handleNodeClick,
}) {
  return (
      <div className="w-full max-w-[95%] h-[95vh] flex flex-col">
        <div className="rounded-2xl shadow-2xl overflow-hidden bg-white flex flex-col h-full">
          <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              JSON Tree Visualizer
            </h1>
          </div>
          <div className="flex flex-1 overflow-hidden">
            <JsonInputPanel
              jsonInput={jsonInput}
              setJsonInput={setJsonInput}
              error={error}
              handleGenerateTree={handleGenerateTree}
              handleClearJSON={handleClearJSON}
            />
            <div className="flex-1 flex flex-col">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                handleClearSearch={handleClearSearch}
                searchMessage={searchMessage}
                copyMessage={copyMessage}
                nodes={nodes}
                handleDownloadImage={handleDownloadImage}
                handleClearTree={handleClearTree}
              />
              <div className="flex-1 bg-gray-100 overflow-hidden">
                <TreeVisualization
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onNodeClick={handleNodeClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default FlowPresentation;

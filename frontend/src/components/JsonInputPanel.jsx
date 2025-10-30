function JsonInputPanel({ jsonInput, setJsonInput, error, handleGenerateTree, handleClearJSON }) {
  return (
    <div className="w-[400px] p-6 flex flex-col border-r border-gray-200 bg-gray-50">
      <label className="block text-sm text-center font-medium mb-3 text-gray-700">
        Paste or type JSON data
      </label>

      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        className="flex-1 w-full p-4 rounded-lg font-mono text-sm resize-none border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter JSON here..."
      />

      {error && (
        <div className="mt-3 p-3 rounded-lg text-sm border bg-red-100 border-red-400 text-red-700">
          {error}
        </div>
      )}

      <div className="flex gap-2 mt-8">
        <button
          onClick={handleGenerateTree}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Generate Tree
        </button>
        <button
          onClick={handleClearJSON}
          className="px-4 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default JsonInputPanel;

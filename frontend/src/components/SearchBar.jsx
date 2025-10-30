function SearchBar({
  searchQuery,
  setSearchQuery,
  handleSearch,
  searchMessage,
  copyMessage,
  nodes,
  handleDownloadImage,
  handleClearTree
}) {
  return (
    <div className="px-6 py-4 bg-white">
      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="$.user.address.city"
          className="flex-1 px-4 py-2.5 rounded-lg text-sm border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Search
        </button>

        {nodes.length > 0 && (
          <>
            <button
              onClick={handleDownloadImage}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
            <button
              onClick={handleClearTree}
              className="py-2.5 px-6 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              Clear Tree
            </button>
          </>
        )}
      </div>

      {copyMessage && (
        <div className="flex justify-end mt-2">
          <div
            className="px-3 py-2 mt-2 rounded-md text-xs font-small bg-green-600 text-white shadow-md flex items-center gap-1.5"
          >
            <span>✔️{copyMessage}</span>
          </div>
        </div>
      )}
      {searchMessage && (
        <div
          className={`mt-3 px-3 py-2 rounded-lg text-sm font-medium ${
            searchMessage.includes('No match')
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {searchMessage}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

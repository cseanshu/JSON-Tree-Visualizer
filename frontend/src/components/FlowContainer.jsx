import { useState, useCallback } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';
import { jsonToFlow, searchByPath } from '../utils/jsonParser';
import { toPng } from 'html-to-image';
import FlowPresentation from './FlowPresentation';

const sampleJSON = `{
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": {
      "city": "New York",
      "country": "USA"
    },
    "items": [
      {
        "name": "item1"
      },
      {
        "name": "item2"
      }
    ]
  }
}`;

function FlowContainer() {
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [jsonInput, setJsonInput] = useState(sampleJSON);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const [originalNodeStyles, setOriginalNodeStyles] = useState(new Map());

  const handleGenerateTree = useCallback(() => {
    setSearchMessage('');
    setSearchQuery('');
    setCopyMessage('');

    const result = jsonToFlow(jsonInput);

    if (result.error) {
      setError(`Invalid JSON: ${result.error}`);
      setNodes([]);
      setEdges([]);
    } else {
      setError('');
      setNodes(result.nodes);
      setEdges(result.edges);

      const styleMap = new Map();
      result.nodes.forEach(node => {
        styleMap.set(node.id, { ...node.style });
      });
      setOriginalNodeStyles(styleMap);
    }
  }, [jsonInput, setNodes, setEdges]);

  const handleClearJSON = useCallback(() => {
    setJsonInput('');
    setError('');
  }, []);

  const handleClearTree = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSearchMessage('');
    setSearchQuery('');
    setCopyMessage('');
    setOriginalNodeStyles(new Map());
  }, [setNodes, setEdges]);

  const handleDownloadImage = useCallback(() => {
    const nodesBounds = document.querySelector('.react-flow__viewport');

    if (nodesBounds) {
      toPng(nodesBounds, {
        backgroundColor: '#f3f4f6',
        width: nodesBounds.offsetWidth,
        height: nodesBounds.offsetHeight,
        style: {
          width: nodesBounds.offsetWidth,
          height: nodesBounds.offsetHeight,
        },
      })
        .then((dataUrl) => {
          const a = document.createElement('a');
          a.setAttribute('download', 'json-tree.png');
          a.setAttribute('href', dataUrl);
          a.click();
        })
        .catch((err) => {
          console.error('Error generating image:', err);
        });
    }
  }, []);

  const handleNodeClick = useCallback((event, node) => {
    const path = node.data.path;

    navigator.clipboard
      .writeText(path)
      .then(() => {
        setCopyMessage(`Copied: ${path}`);
        setTimeout(() => {
          setCopyMessage('');
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy path:', err);
        setCopyMessage('Failed to copy path');
        setTimeout(() => {
          setCopyMessage('');
        }, 2000);
      });
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSearchMessage('');
      setNodes(nds =>
        nds.map(node => ({
          ...node,
          style: originalNodeStyles.get(node.id) || node.style,
        }))
      );
      return;
    }

    const matches = searchByPath(nodes, searchQuery);

    if (matches.length === 0) {
      setSearchMessage('No match found');
      setNodes(nds =>
        nds.map(node => ({
          ...node,
          style: originalNodeStyles.get(node.id) || node.style,
        }))
      );
    } else {
      setSearchMessage(`Match found: ${matches.length} result(s)`);

      const matchedIds = new Set(matches.map(m => m.id));
      setNodes(nds =>
        nds.map(node => {
          if (matchedIds.has(node.id)) {
            return {
              ...node,
              style: {
                ...node.style,
                background: '#ef4444',
                border: '3px solid #dc2626',
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
                transform: 'scale(1.1)',
              },
            };
          } else {
            return {
              ...node,
              style: originalNodeStyles.get(node.id) || node.style,
            };
          }
        })
      );
    }
  }, [searchQuery, nodes, setNodes, originalNodeStyles]);

  return (
    <FlowPresentation
      jsonInput={jsonInput}
      setJsonInput={setJsonInput}
      error={error}
      handleGenerateTree={handleGenerateTree}
      handleClearJSON={handleClearJSON}

      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handleSearch={handleSearch}
      searchMessage={searchMessage}
      copyMessage={copyMessage}
      nodes={nodes}
      handleDownloadImage={handleDownloadImage}
      handleClearTree={handleClearTree}

      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      handleNodeClick={handleNodeClick}
    />
  );
}

export default FlowContainer;

let nodeId = 0;

const getNodeId = () => `node-${nodeId++}`;

const getNodeColor = (type) => {
  switch (type) {
    case "object":
      return { bg: "#818cf8", border: "#6366f1", text: "#1e1b4b" }; // Purple/Indigo
    case "array":
      return { bg: "#34d399", border: "#10b981", text: "#064e3b" }; // Green
    case "primitive":
      return { bg: "#fbbf24", border: "#f59e0b", text: "#78350f" }; // Yellow/Orange
    default:
      return { bg: "#94a3b8", border: "#64748b", text: "#1e293b" }; // Gray
  }
};

const createNode = (id, label, type, path, value = null) => {
  const colors = getNodeColor(type);
  return {
    id,
    type: "default",
    data: {
      label,
      nodeType: type,
      path,
      value,
      colors,
    },
    position: { x: 0, y: 0 },
    style: {
      background: colors.bg,
      color: colors.text,
      border: `2px solid ${colors.border}`,
      borderRadius: "8px",
      padding: "10px",
      fontSize: "14px",
      fontWeight: "500",
      minWidth: "80px",
      textAlign: "center",
    },
  };
};

const createEdge = (source, target) => ({
  id: `edge-${source}-${target}`,
  source,
  target,
  type: "smoothstep",
  animated: false,
  style: { stroke: "#64748b", strokeWidth: 2 },
});

const parseJSON = (data, parentId = null, key = "root", path = "$") => {
  const nodes = [];
  const edges = [];
  const currentId = getNodeId();

  if (data === null) {
    nodes.push(createNode(currentId, `${key}: null`, "primitive", path, null));
  } else if (Array.isArray(data)) {
    // Array node
    nodes.push(createNode(currentId, key, "array", path));

    data.forEach((item, index) => {
      const childPath = `${path}[${index}]`;
      const { nodes: childNodes, edges: childEdges } = parseJSON(
        item,
        currentId,
        String(index),
        childPath
      );
      nodes.push(...childNodes);
      edges.push(...childEdges);
    });
  } else if (typeof data === "object") {
    // Object node
    nodes.push(createNode(currentId, key, "object", path));

    Object.entries(data).forEach(([objKey, value]) => {
      const childPath = `${path}.${objKey}`;
      const { nodes: childNodes, edges: childEdges } = parseJSON(
        value,
        currentId,
        objKey,
        childPath
      );
      nodes.push(...childNodes);
      edges.push(...childEdges);
    });
  } else {
    if (key === "root") {
      const displayValue = typeof data === "string" ? `"${data}"` : String(data);
      nodes.push(createNode(currentId, displayValue, "primitive", path, data));
    } else {
      nodes.push(createNode(currentId, key, "object", path));

      const valueId = getNodeId();
      const displayValue = typeof data === "string" ? `"${data}"` : String(data);
      nodes.push(createNode(valueId, displayValue, "primitive", path, data));
      edges.push(createEdge(currentId, valueId));
    }
  }

  if (parentId !== null) {
    edges.push(createEdge(parentId, currentId));
  }

  return { nodes, edges };
};

const calculateLayout = (nodes, edges) => {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const childrenMap = new Map();

  edges.forEach((edge) => {
    if (!childrenMap.has(edge.source)) {
      childrenMap.set(edge.source, []);
    }
    childrenMap.get(edge.source).push(edge.target);
  });

  const targetIds = new Set(edges.map((e) => e.target));
  const rootNode = nodes.find((node) => !targetIds.has(node.id));

  if (!rootNode) return nodes;

  const levelWidth = 150;
  const levelHeight = 100;
  const positioned = new Set();

  const positionNode = (nodeId, x, y, level = 0) => {
    const node = nodeMap.get(nodeId);
    if (!node || positioned.has(nodeId)) return 0;

    node.position = { x, y };
    positioned.add(nodeId);

    const children = childrenMap.get(nodeId) || [];
    if (children.length === 0) return 1;

    let currentX = x;
    let totalWidth = 0;

    children.forEach((childId) => {
      const childWidth = positionNode(
        childId,
        currentX,
        y + levelHeight,
        level + 1
      );
      currentX += childWidth * levelWidth;
      totalWidth += childWidth;
    });

    if (totalWidth > 1) {
      node.position.x = x + ((totalWidth - 1) * levelWidth) / 2;
    }

    return totalWidth;
  };

  positionNode(rootNode.id, 0, 0);

  return nodes;
};

export const jsonToFlow = (jsonString) => {
  try {
    nodeId = 0;
    const data = JSON.parse(jsonString);
    const { nodes, edges } = parseJSON(data);
    const layoutedNodes = calculateLayout(nodes, edges);

    return {
      nodes: layoutedNodes,
      edges,
      error: null,
    };
  } catch (error) {
    return {
      nodes: [],
      edges: [],
      error: error.message,
    };
  }
};

export const searchByPath = (nodes, searchPath) => {
  if (!searchPath || searchPath.trim() === "") {
    return [];
  }

  const normalizedSearch = searchPath.trim().toLowerCase();

  const matches = nodes.filter((node) => {
    const nodePath = node.data.path.toLowerCase();

    if (nodePath === normalizedSearch) {
      return true;
    }

    if (
      nodePath.includes(normalizedSearch.replace("$.", "").replace("$", ""))
    ) {
      return true;
    }

    return false;
  });

  return matches;
};

import React, { useState, useEffect } from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';
import axios from 'axios';
import './App.css'; // Import your CSS as needed

function App() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Fetch Mermaid data from FastAPI backend
    axios.post('http://localhost:8000/diagram/', {
      diagram: `flowchart TD;
        Start --> Process1;
        Process1 --> Decision1;
        Decision1 -->|Yes| Subprocess1;
        Decision1 -->|No| End;
        Subprocess1 --> End;
      `
    })
    .then(response => {
      const diagram = response.data.diagram;
      const elements = convertFlowchartToReactFlow(diagram);
      setElements(elements);
    })
    .catch(error => {
      console.error('Error fetching diagram data:', error);
    });
  }, []);

  // Function to convert a flowchart string to React Flow elements
  const convertFlowchartToReactFlow = (diagram) => {
    const nodes = [];
    const edges = [];
    
    // Parse the flowchart into components (this is a simple parser for demo purposes)
    const relations = diagram.match(/(\w+)\s*-->\|?\w*?\|?\s*(\w+)/g);

    const nodeTypes = {
      'Start': 'start',
      'Process': 'process',
      'Subprocess': 'subprocess',
      'Decision': 'decision',
      'End': 'end',
    };

    relations.forEach((relation, index) => {
      const [source, target] = relation.split('-->');
      const sourceNode = source.trim().replace(/\|\w*\|/, '').split(/(\d+)/)[0];
      const targetNode = target.trim().replace(/\|\w*\|/, '').split(/(\d+)/)[0];
      
      // Create nodes if they don't already exist
      if (!nodes.find(node => node.id === sourceNode)) {
        nodes.push(createNode(sourceNode, nodeTypes[sourceNode]));
      }
      if (!nodes.find(node => node.id === targetNode)) {
        nodes.push(createNode(targetNode, nodeTypes[targetNode]));
      }

      // Create edge between nodes
      edges.push({
        id: `e${sourceNode}-${targetNode}`,
        source: sourceNode,
        target: targetNode,
        label: relation.includes('|') ? relation.match(/\|(\w+)\|/)[1] : '',
      });
    });

    return [...nodes, ...edges];
  };

  // Create a node based on its type
  const createNode = (id, type) => {
    const baseNode = {
      id,
      data: { label: id },
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random positions for simplicity
    };

    switch (type) {
      case 'start':
        return { ...baseNode, data: { label: 'Start' }, style: { backgroundColor: '#d4edda', border: '2px solid #28a745' } };
      case 'process':
        return { ...baseNode, data: { label: 'Process' }, style: { backgroundColor: '#cce5ff', border: '2px solid #007bff' } };
      case 'subprocess':
        return { ...baseNode, data: { label: 'Subprocess' }, style: { backgroundColor: '#fff3cd', border: '2px solid #ffc107' } };
      case 'decision':
        return { ...baseNode, data: { label: 'Decision' }, style: { backgroundColor: '#f8d7da', border: '2px solid #dc3545' }, shape: 'diamond' };
      case 'end':
        return { ...baseNode, data: { label: 'End' }, style: { backgroundColor: '#f5c6cb', border: '2px solid #dc3545' } };
      default:
        return baseNode;
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow elements={elements}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;

// src/components/MindMapTab.jsx
import React, { useRef, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

// Wraps node.name in a multi-line HTML box
function NodeLabel({ nodeData }) {
  return (
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      style={{
        width: '280px',        // must match nodeSize.x
        textAlign: 'center',
        whiteSpace: 'normal',
        fontSize: '0.85rem',
        lineHeight: '1.2rem',
        color: nodeData.__rd3t ? '#1F2937' : '#111827'
      }}
    >
      {nodeData.name}
    </div>
  );
}

export default function MindMapTab({ summary = [], onNodeClick }) {
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [fullScreen, setFullScreen] = useState(false);

  // 1) Always call hooks
  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        setDims({
          width:  containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [fullScreen]);

  if (!summary.length) {
    return <p className="text-center text-neutral-500">No summary yet.</p>;
  }

  // 2) Build data
  const treeData = {
    name: 'Summary',
    children: summary.map((b, i) => ({
      name: b,
      attributes: { idx: i },
    })),
  };

  // 3) Wrapper to size the Tree
  const TreeContainer = () => (
    <div
      ref={containerRef}
      className={fullScreen ? 'w-full h-full' : 'w-full h-64'}
    >
      <Tree
        data={treeData}
        orientation="horizontal"               // horizontal tree
        collapsible={false}
        zoomable
        translate={{ x: 50, y: dims.height / 2 }}
        nodeSize={{ x: 300, y: 120 }}         // more room horizontally
        separation={{ siblings: 1.2, nonSiblings: 1.8 }}
        pathFunc="elbow"
        // Wrap labels using our NodeLabel
        nodeLabelComponent={{
          render: <NodeLabel />,
          foreignObjectWrapper: {
            x: -150,                          // center around node
            y: -60,
            width: 300,
            height: 120,
          }
        }}
        styles={{
          links: {
            stroke: '#9CA3AF',
            strokeWidth: 1.5,
          },
          nodes: {
            node: {
              circle: { r: 6, fill: '#3B82F6' },
              name:   { display: 'none' },    // hide default name
              attributes: { display: 'none' },// hide idx
            },
            leafNode: {
              circle: { r: 6, fill: '#10B981' },
              name:   { display: 'none' },
              attributes: { display: 'none' },
            },
          },
        }}
        onNodeClick={node => {
          const idx = node.attributes?.idx;
          if (typeof idx === 'number') onNodeClick(idx);
        }}
      />
    </div>
  );

  return (
    <>
      {/* Expand button */}
      <div className="mb-2 flex justify-end">
        <button
          onClick={() => setFullScreen(true)}
          className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-light transition"
        >
          Expand
        </button>
      </div>

      {/* Sidebar view */}
      <div className="bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-100">
          Mind Map
        </h3>
        <TreeContainer />
      </div>

      {/* Full-screen view */}
      {fullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl h-[80vh] bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden flex flex-col">
            <button
              onClick={() => setFullScreen(false)}
              className="absolute top-4 right-4 p-2 bg-neutral-200 dark:bg-neutral-700 rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
            >
              ✕
            </button>
            <div className="flex-1">
              <TreeContainer />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

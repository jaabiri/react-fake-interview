import "./styles.css";

import { useState } from "react";
import data from "./data-nested.json";
import type { NestedFile } from "./types";

function Folder({ node }: { node: NestedFile }) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <li>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {node.fileName}
      </button>
      {isExpanded && (
        <ul>
          {node.children.map((child: NestedFile) => (
            <Node key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

function File({ node }: { node: NestedFile }) {
  let color = "blue";
  if (node.fileName.endsWith(".server.tsx")) {
    color = "yellow";
  }
  return <li style={{ color }}>{node.fileName}</li>;
}

function Node({ node }: { node: NestedFile }) {
  if (node.children === null) {
    return <File node={node} />;
  } else {
    return <Folder node={node} />;
  }
}

export default function App() {
  return (
    <ul>
      <Node node={data} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </ul>
  );
}

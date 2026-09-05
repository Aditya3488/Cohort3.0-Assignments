import { useState } from "react";
import { Code } from "lucide-react";
import CodeBlock from "@/components/Personal/CodeBlock";

interface ComponentDemoProps {
  children?: React.ReactNode;
  code: string;
  showCode?: boolean;
}

const ComponentDemo = ({ children, code }: ComponentDemoProps) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-sm bg-gray-200 dark:bg-zinc-800">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900">
        <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">Preview</span>
        <button
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 rounded transition-colors"
        >
          <Code size={14} />
          {isCodeVisible ? "Hide Code" : "View Code"}
        </button>
      </div>

      <div className="py-20 px-4 flex items-center justify-center">{children}</div>

      {isCodeVisible && (
        <div className="border-t border-gray-200 dark:border-zinc-700">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
};

export default ComponentDemo;

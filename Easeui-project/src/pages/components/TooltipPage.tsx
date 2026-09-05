import { useState } from "react";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Button } from "@/components/Button/Button";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Info } from "lucide-react";

const TooltipPage = () => {
  const [pinned, setPinned] = useState(false);

  const usageCode = `import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";

<Tooltip content="Saves your changes">
  <Button variant="primary">Save</Button>
</Tooltip>`;

  const sideCode = `<Tooltip side="top" content="Top">
  <Button variant="outline">Top</Button>
</Tooltip>

<Tooltip side="right" content="Right">
  <Button variant="outline">Right</Button>
</Tooltip>

<Tooltip side="bottom" content="Bottom">
  <Button variant="outline">Bottom</Button>
</Tooltip>

<Tooltip side="left" content="Left">
  <Button variant="outline">Left</Button>
</Tooltip>`;

  const variantCode = `<Tooltip variant="dark" content="Dark tooltip">
  <Button variant="dark">Dark</Button>
</Tooltip>

<Tooltip variant="light" content="Light tooltip">
  <Button variant="secondary">Light</Button>
</Tooltip>

<Tooltip variant="outline" content="Outline tooltip">
  <Button variant="outline">Outline</Button>
</Tooltip>`;

  const sizeCode = `<Tooltip size="sm" content="Small">
  <Button size="sm" variant="outline">sm</Button>
</Tooltip>

<Tooltip size="md" content="Medium">
  <Button variant="outline">md</Button>
</Tooltip>

<Tooltip size="lg" content="Large tooltip with more room">
  <Button variant="outline">lg</Button>
</Tooltip>`;

  const controlledCode = `const [pinned, setPinned] = useState(false);

<Tooltip open={pinned} content="This one stays open" side="right">
  <Button variant="primary" onClick={() => setPinned(!pinned)}>
    {pinned ? "Hide" : "Show"} tooltip
  </Button>
</Tooltip>`;

  const richCode = `<Tooltip
  variant="light"
  side="bottom"
  arrow={false}
  delay={0}
  content={
    <span className="flex items-center gap-2">
      <Info size={14} className="text-indigo-600" />
      No arrow, no delay
    </span>
  }
>
  <Button variant="ghost">Hover me</Button>
</Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "ReactNode",
      default: "-",
      description: "What gets rendered inside the tooltip",
    },
    {
      prop: "side",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Which side of the trigger the tooltip sits on",
    },
    {
      prop: "variant",
      type: '"dark" | "light" | "outline"',
      default: '"dark"',
      description: "The visual style variant of the tooltip",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Padding and text size of the tooltip",
    },
    {
      prop: "delay",
      type: "number",
      default: "120",
      description: "Delay in ms before the tooltip opens on hover",
    },
    {
      prop: "arrow",
      type: "boolean",
      default: "true",
      description: "Shows the small pointer arrow",
    },
    {
      prop: "open",
      type: "boolean",
      default: "-",
      description: "Controls the tooltip yourself, hover is ignored",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Stops the tooltip from opening on hover",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Tooltip</h1>
        <p className="text-xl text-gray-600 dark:text-zinc-400">
          Shows a short label next to an element when you hover or focus it.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={usageCode}>
          <Tooltip content="Saves your changes">
            <Button variant="primary">Save</Button>
          </Tooltip>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <h3 className="text-lg font-medium">Sides</h3>
        <ComponentDemo code={sideCode}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Tooltip side="top" content="Top">
              <Button variant="outline">Top</Button>
            </Tooltip>

            <Tooltip side="right" content="Right">
              <Button variant="outline">Right</Button>
            </Tooltip>

            <Tooltip side="bottom" content="Bottom">
              <Button variant="outline">Bottom</Button>
            </Tooltip>

            <Tooltip side="left" content="Left">
              <Button variant="outline">Left</Button>
            </Tooltip>
          </div>
        </ComponentDemo>

        <h3 className="text-lg font-medium">Variants</h3>
        <ComponentDemo code={variantCode}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Tooltip variant="dark" content="Dark tooltip">
              <Button variant="dark">Dark</Button>
            </Tooltip>

            <Tooltip variant="light" content="Light tooltip">
              <Button variant="secondary">Light</Button>
            </Tooltip>

            <Tooltip variant="outline" content="Outline tooltip">
              <Button variant="outline">Outline</Button>
            </Tooltip>
          </div>
        </ComponentDemo>

        <h3 className="text-lg font-medium">Sizes</h3>
        <ComponentDemo code={sizeCode}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Tooltip size="sm" content="Small">
              <Button size="sm" variant="outline">
                sm
              </Button>
            </Tooltip>

            <Tooltip size="md" content="Medium">
              <Button variant="outline">md</Button>
            </Tooltip>

            <Tooltip size="lg" content="Large tooltip with more room">
              <Button variant="outline">lg</Button>
            </Tooltip>
          </div>
        </ComponentDemo>

        <h3 className="text-lg font-medium">Controlled</h3>
        <ComponentDemo code={controlledCode}>
          <Tooltip open={pinned} content="This one stays open" side="right">
            <Button variant="primary" onClick={() => setPinned(!pinned)}>
              {pinned ? "Hide" : "Show"} tooltip
            </Button>
          </Tooltip>
        </ComponentDemo>

        <h3 className="text-lg font-medium">Custom content</h3>
        <ComponentDemo code={richCode}>
          <Tooltip
            variant="light"
            side="bottom"
            arrow={false}
            delay={0}
            content={
              <span className="flex items-center gap-2">
                <Info size={14} className="text-indigo-600" />
                No arrow, no delay
              </span>
            }
          >
            <Button variant="ghost">Hover me</Button>
          </Tooltip>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default TooltipPage;

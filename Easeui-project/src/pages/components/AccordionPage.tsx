import { useState } from "react";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Accordion, type AccordionItem } from "@/components/Accordion/Accordion";

const faq: AccordionItem[] = [
  {
    value: "install",
    title: "How do I install EaseUi?",
    content: "Run npm install dev-ease-ui and import the stylesheet once in your entry file.",
  },
  {
    value: "tailwind",
    title: "Do I need Tailwind?",
    content: "No. The published stylesheet already carries every class the components use.",
  },
  {
    value: "theme",
    title: "How does dark mode work?",
    content: 'Set data-theme="dark" on the html element and the components follow along.',
  },
];

const AccordionPage = () => {
  const [open, setOpen] = useState<string[]>(["shipping"]);

  const usageCode = `import { Accordion, type AccordionItem } from "@/components/Accordion/Accordion";

const faq: AccordionItem[] = [
  { value: "install", title: "How do I install EaseUi?", content: "Run npm install dev-ease-ui..." },
  { value: "tailwind", title: "Do I need Tailwind?", content: "No. The published stylesheet..." },
  { value: "theme", title: "How does dark mode work?", content: "Set data-theme=\\"dark\\"..." },
];

<Accordion items={faq} defaultValue="install" />`;

  const multipleCode = `<Accordion type="multiple" items={faq} defaultValue={["install", "theme"]} />`;

  const variantCode = `<Accordion variant="light" items={faq} defaultValue="install" />
<Accordion variant="dark" items={faq} defaultValue="install" />
<Accordion variant="outline" items={faq} defaultValue="install" />`;

  const sizeCode = `<Accordion size="sm" items={faq} />
<Accordion size="md" items={faq} />
<Accordion size="lg" items={faq} />`;

  const disabledCode = `<Accordion
  items={[
    { value: "one", title: "Open me", content: "Works as usual." },
    { value: "two", title: "Not available yet", content: "Never shown.", disabled: true },
  ]}
/>`;

  const controlledCode = `const [open, setOpen] = useState<string[]>(["shipping"]);

<Accordion
  type="multiple"
  value={open}
  onValueChange={setOpen}
  items={[
    { value: "shipping", title: "Shipping", content: "Ships in 2-3 working days." },
    { value: "returns", title: "Returns", content: "30 days, no questions asked." },
  ]}
/>

<p>Open: {open.join(", ") || "nothing"}</p>`;

  const propsData = [
    {
      prop: "items",
      type: "{ value, title, content, disabled? }[]",
      default: "-",
      description: "The rows the accordion renders",
    },
    {
      prop: "type",
      type: '"single" | "multiple"',
      default: '"single"',
      description: "Whether more than one row can stay open",
    },
    {
      prop: "variant",
      type: '"light" | "dark" | "outline"',
      default: '"light"',
      description: "The visual style variant of the accordion",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Row padding and text size",
    },
    {
      prop: "defaultValue",
      type: "string | string[]",
      default: "-",
      description: "Rows open on first render, uncontrolled",
    },
    {
      prop: "value",
      type: "string | string[]",
      default: "-",
      description: "Controls the open rows yourself",
    },
    {
      prop: "onValueChange",
      type: "(open: string[]) => void",
      default: "-",
      description: "Fires with the new open rows on every toggle",
    },
    {
      prop: "collapsible",
      type: "boolean",
      default: "true",
      description: "In single mode, lets you close the open row",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"none"',
      description: "Animation when mounting",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Accordion</h1>
        <p className="text-xl text-gray-600 dark:text-zinc-400">
          Stacked rows that expand one section of content at a time.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={usageCode}>
          <div className="w-full max-w-xl">
            <Accordion items={faq} defaultValue="install" />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <h3 className="text-lg font-medium">Multiple open at once</h3>
        <ComponentDemo code={multipleCode}>
          <div className="w-full max-w-xl">
            <Accordion
              type="multiple"
              items={faq}
              defaultValue={["install", "theme"]}
            />
          </div>
        </ComponentDemo>

        <h3 className="text-lg font-medium">Variants</h3>
        <ComponentDemo code={variantCode}>
          <div className="w-full max-w-xl space-y-4">
            <Accordion variant="light" items={faq} defaultValue="install" />
            <Accordion variant="dark" items={faq} defaultValue="install" />
            <Accordion variant="outline" items={faq} defaultValue="install" />
          </div>
        </ComponentDemo>

        <h3 className="text-lg font-medium">Sizes</h3>
        <ComponentDemo code={sizeCode}>
          <div className="w-full max-w-xl space-y-4">
            <Accordion size="sm" items={faq} />
            <Accordion size="md" items={faq} />
            <Accordion size="lg" items={faq} />
          </div>
        </ComponentDemo>

        <h3 className="text-lg font-medium">Disabled row</h3>
        <ComponentDemo code={disabledCode}>
          <div className="w-full max-w-xl">
            <Accordion
              items={[
                {
                  value: "one",
                  title: "Open me",
                  content: "Works as usual.",
                },
                {
                  value: "two",
                  title: "Not available yet",
                  content: "Never shown.",
                  disabled: true,
                },
              ]}
            />
          </div>
        </ComponentDemo>

        <h3 className="text-lg font-medium">Controlled</h3>
        <ComponentDemo code={controlledCode}>
          <div className="w-full max-w-xl space-y-3">
            <Accordion
              type="multiple"
              value={open}
              onValueChange={setOpen}
              items={[
                {
                  value: "shipping",
                  title: "Shipping",
                  content: "Ships in 2-3 working days.",
                },
                {
                  value: "returns",
                  title: "Returns",
                  content: "30 days, no questions asked.",
                },
              ]}
            />
            <p className="text-sm text-gray-600 dark:text-zinc-400">
              Open: {open.join(", ") || "nothing"}
            </p>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default AccordionPage;

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/Button/Button";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Glasses } from "lucide-react";

const NavbarPage = () => {
  const usageCode = `import { Navbar } from "@/components/navbar";

<Navbar />`;

  const variantCode = `<Navbar variant="light" />
<Navbar variant="dark" />
<Navbar variant="primary" />

{/* glass needs a coloured surface behind it to show through */}
<div className="w-full rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
  <Navbar variant="glass" />
</div>`;

  const sizeCode = `<Navbar size="sm" />
<Navbar size="default" />
<Navbar size="lg" />
<Navbar size="xl" />`;

  const animationCode = `<Navbar variant="dark" animation="slideUp" />
<Navbar variant="primary" animation="scaleIn" hoverAnimation="scale" />
<Navbar variant="light" animation="none" />`;

  const contentCode = `<Navbar
  variant="dark"
  logo={
    <span className="flex items-center gap-2">
      <Glasses size={20} /> EaseUi
    </span>
  }
  links={[
    { label: "Docs", href: "/components/button" },
    { label: "Pricing", href: "#" },
    { label: "Blog", onClick: () => console.log("blog") },
  ]}
  action={<Button variant="ok" size="sm">Sign up</Button>}
/>`;

  const propsData = [
    {
      prop: "variant",
      type: '"light" | "dark" | "primary" | "glass"',
      default: '"light"',
      description: "The visual style variant of the navbar",
    },
    {
      prop: "size",
      type: '"sm" | "default" | "lg" | "xl"',
      default: '"default"',
      description: "The height of the navbar",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"fadeIn"',
      description: "Animation when mounting",
    },
    {
      prop: "hoverAnimation",
      type: '"jiggle" | "scale" | "bounce" | "none"',
      default: '"none"',
      description: "hovering on element animation",
    },
    {
      prop: "logo",
      type: "ReactNode",
      default: '"Logo"',
      description: "What shows on the left, text or your own markup",
    },
    {
      prop: "links",
      type: "{ label, href?, onClick? }[]",
      default: "Home, About, Customer",
      description: "The links rendered in the middle",
    },
    {
      prop: "action",
      type: "ReactNode",
      default: "Profile button",
      description: "The element on the right, replaces the default button",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Renders your own element instead of a nav tag",
    },
    {
      prop: "className",
      type: "string",
      default: "-",
      description: "Extra classes merged onto the navbar",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Navbar</h1>
        <p className="text-xl text-gray-600 dark:text-zinc-400">
          A top navigation bar with a logo, links and an action button.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={usageCode}>
          <Navbar />
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <h3 className="text-lg font-medium">Variants</h3>
        <ComponentDemo code={variantCode}>
          <div className="w-full space-y-4">
            <Navbar variant="light" />
            <Navbar variant="dark" />
            <Navbar variant="primary" />
            <div className="w-full rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <Navbar variant="glass" />
            </div>
          </div>
        </ComponentDemo>

        <h3 className="text-lg font-medium">Sizes</h3>
        <ComponentDemo code={sizeCode}>
          <div className="w-full space-y-4">
            <Navbar size="sm" />
            <Navbar size="default" />
            <Navbar size="lg" />
            <Navbar size="xl" />
          </div>
        </ComponentDemo>

        <h3 className="text-lg font-medium">Animations</h3>
        <ComponentDemo code={animationCode}>
          <div className="w-full space-y-4">
            <Navbar variant="dark" animation="slideUp" />
            <Navbar variant="primary" animation="scaleIn" hoverAnimation="scale" />
            <Navbar variant="light" animation="none" />
          </div>
        </ComponentDemo>
        <h3 className="text-lg font-medium">Custom content</h3>
        <ComponentDemo code={contentCode}>
          <Navbar
            variant="dark"
            logo={
              <span className="flex items-center gap-2">
                <Glasses size={20} /> EaseUi
              </span>
            }
            links={[
              { label: "Docs", href: "/components/button" },
              { label: "Pricing", href: "#" },
              { label: "Blog", onClick: () => console.log("blog") },
            ]}
            action={
              <Button variant="ok" size="sm">
                Sign up
              </Button>
            }
          />
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default NavbarPage;

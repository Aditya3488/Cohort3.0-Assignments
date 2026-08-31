import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiBootstrap,
  SiShopify, SiWordpress, SiNodedotjs, SiFirebase, SiStrapi, SiStoryblok,
  SiMysql, SiMongodb, SiGithub, SiPostman,
} from 'react-icons/si'
import { Code2, Palette } from 'lucide-react'

// react-icons/si mein Canva aur VS Code ke icons available nahi hain is
// version mein — unke liye lucide ke generic icons use kiye.
export const techIcons = [
  { label: 'HTML', icon: SiHtml5 },
  { label: 'CSS', icon: SiCss },
  { label: 'JavaScript', icon: SiJavascript },
  { label: 'React', icon: SiReact },
  { label: 'Next.js', icon: SiNextdotjs },
  { label: 'Tailwind CSS', icon: SiTailwindcss },
  { label: 'Bootstrap', icon: SiBootstrap },
  { label: 'React Native', icon: SiReact },
  { label: 'Shopify', icon: SiShopify },
  { label: 'WordPress', icon: SiWordpress },
  { label: 'Node.js', icon: SiNodedotjs },
  { label: 'Firebase', icon: SiFirebase },
  { label: 'Strapi', icon: SiStrapi },
  { label: 'Storyblok', icon: SiStoryblok },
  { label: 'MySQL', icon: SiMysql },
  { label: 'MongoDB', icon: SiMongodb },
  { label: 'GitHub', icon: SiGithub },
  { label: 'Postman', icon: SiPostman },
  { label: 'VS Code', icon: Code2 },
  { label: 'Canva', icon: Palette },
]
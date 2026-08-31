import dcrayonsLogo from '../assets/experience/dcrayons.jpg'
import hashtagLogo from '../assets/experience/hashtageyewears.jpg'
import jamiaLogo from '../assets/experience/jamiahamdard.png'
import nuncLogo from '../assets/experience/nunc.jpg'
import softwareStudyLogo from '../assets/experience/software-study-center.jpg'

export const education = {
  school: 'Jamia Hamdard University, New Delhi',
  degree: 'Bachelor of Computer Applications',
  period: 'Sep 2018 — Sep 2021',
  detail: 'CGPA 7.4',
  logo: jamiaLogo,
}

export const experience = [
  {
    company: 'Nunc System Pvt Ltd',
    role: 'Junior Software Engineer',
    period: 'Feb 2023 — May 2023',
    location: 'Hyderabad, Telangana',
    logo: nuncLogo,
    points: [
      'Built cross-platform mobile features using React Native.',
      'Collaborated with senior engineers on UI components and backend integration.',
    ],
  },
  {
    company: 'Software Study Center',
    role: 'Computer Teacher cum Lab Instructor',
    period: 'Jul 2023 — Dec 2023',
    location: 'Giridih, Jharkhand',
    logo: softwareStudyLogo,
    points: [
      'Taught HTML, CSS, and JavaScript fundamentals to students.',
      'Designed curriculum tailored to different learning styles and backgrounds.',
    ],
  },
  {
    company: 'Dcrayons Consultancy',
    role: 'Web Developer Intern',
    period: 'Jan 2024 — Dec 2024',
    location: 'New Delhi',
    logo: dcrayonsLogo,
    points: [
      'Built and customized websites using Shopify, WordPress, and Next.js.',
      'Designed custom WordPress themes and plugins tailored to client requirements.',
    ],
  },
  {
    company: 'Hashtag Eyewears',
    role: 'Web Developer',
    period: 'Feb 2024 — Present',
    location: 'On-site',
    current: true,
    logo: hashtagLogo,
    points: [
      'Redesigned Shopify PDP/PLP pages, increasing conversion rate from 1.6% to 2.4%.',
      'Improved Core Web Vitals — moved LCP, CLS, and INP from Fail to Pass.',
      'Boosted average mobile session duration from ~15s to ~2 minutes.',
      'Optimized Liquid templates and reduced render-blocking resources for faster loads and better SEO.',
    ],
  },
]
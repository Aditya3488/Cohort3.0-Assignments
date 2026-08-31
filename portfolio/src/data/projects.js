import teaCloneImg from '../assets/projects/tea-clone.png'
import taskflowImg from '../assets/projects/taskflow.png'
import fintrackImg from '../assets/projects/fintrack.png'
import daybookImg from '../assets/projects/daybook.png'
import skymartImg from '../assets/projects/skymart.png'

export const projects = [
  {
    id: 1,
    title: 'Two Leaves Tea — Clone',
    description: 'Fully responsive clone of the Two Leaves and a Bud tea eCommerce site, rebuilt mobile-first from a desktop-only original.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    liveUrl: 'https://cohort3-0-assignments-2mc5.vercel.app/',
    image: teaCloneImg,
  },
  {
    id: 2,
    title: 'TaskFlow — Task Manager',
    description: 'Task management app with categories, search & filter, and live pending/completed counters.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://cohort3-0-assignments-oxfb.vercel.app/',
    image: taskflowImg,
  },
  {
    id: 3,
    title: 'FinTrack Pro',
    description: 'Personal finance tracker with income/expense charts, transaction history, and category-wise filtering.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Charts', 'Auth'],
    liveUrl: 'https://cohort3-0-assignments-qawx.vercel.app/',
    image: fintrackImg,
  },
  {
    id: 4,
    title: 'Daybook — Productivity Dashboard',
    description: 'All-in-one daily dashboard: to-do list, daily planner, goals, Pomodoro timer, motivational quotes, live weather, and a background that shifts with the time of day.',
    tags: ['HTML', 'CSS', 'JavaScript', 'API Integration'],
    liveUrl: 'https://cohort3-0-assignments-zwwa.vercel.app/',
    image: daybookImg,
  },
  {
    id: 5,
    title: 'SkyMart — eCommerce',
    description: 'Full eCommerce storefront with product listings, cart, ratings, and a featured-products homepage.',
    tags: ['React', 'eCommerce'],
    liveUrl: 'https://cohort3-0-assignments-2jil.vercel.app/',
    image: skymartImg,
  },
]
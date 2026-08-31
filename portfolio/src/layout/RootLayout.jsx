import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Preloader from '../components/Preloader'
import { selectIsLoading } from '../features/ui/uiSlice'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

export default function RootLayout() {
  const isLoading = useSelector(selectIsLoading)
  useSmoothScroll(isLoading)

  return (
    <div className="bg-ink text-paper min-h-screen">
      {isLoading && <Preloader />}
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
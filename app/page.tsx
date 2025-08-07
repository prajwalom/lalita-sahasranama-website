import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, BookOpen, Sun, Moon, Sparkles, NotebookIcon as Lotus } from 'lucide-react'
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageLoader } from "@/components/page-loader"
import { HomeContent } from "@/components/home-content"

export default function HomePage() {
  return (
    <>
      <PageLoader isLoading={false} />
      <HomeContent />
    </>
  )
}

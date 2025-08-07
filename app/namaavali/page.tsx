import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NotebookIcon as Lotus, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Sample data for public viewing
const publicNames = [
  {
    id: 1,
    number: 1,
    sanskrit: "श्री माता",
    transliteration: "Shri Mata",
    english: "The Divine Mother",
    hindi: "दिव्य माता",
    category: "Divine Attributes"
  },
  {
    id: 2,
    number: 2,
    sanskrit: "श्री महाराज्ञी",
    transliteration: "Shri Maharajni",
    english: "The Great Queen",
    hindi: "महान रानी",
    category: "Royal Titles"
  },
  {
    id: 3,
    number: 3,
    sanskrit: "श्रीमत्सिंहासनेश्वरी",
    transliteration: "Shrimat Simhasaneshwari",
    english: "The Goddess of the Lion Throne",
    hindi: "सिंहासन की देवी",
    category: "Divine Throne"
  }
]

export default function NamaavaliPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Lotus className="h-8 w-8 text-rose-600 dark:text-rose-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Namaavali Preview
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Sacred Names Preview
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Experience a glimpse of the divine names. Sign up to access all 1000 names with detailed meanings.
          </p>
          <Link href="/auth/signup">
            <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
              Sign Up for Full Access
            </Button>
          </Link>
        </div>

        {/* Preview Names */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {publicNames.map((name) => (
            <Card key={name.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-rose-200 dark:border-rose-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    #{name.number}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {name.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-rose-800 dark:text-rose-200 font-sanskrit">
                  {name.sanskrit}
                </CardTitle>
                <CardDescription className="text-base font-medium text-gray-700 dark:text-gray-300">
                  {name.transliteration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">English:</p>
                    <p className="text-gray-800 dark:text-gray-200">{name.english}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Hindi:</p>
                    <p className="text-gray-800 dark:text-gray-200">{name.hindi}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 border-rose-300 dark:border-rose-700">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Unlock All 1000 Sacred Names
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Join thousands of devotees in their spiritual journey. Get access to:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">1000</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Sacred Names</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">2</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">∞</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Spiritual Growth</div>
              </div>
            </div>
            <Link href="/auth/signup">
              <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                Start Your Journey Today
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

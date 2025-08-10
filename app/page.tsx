'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Settings, Search, Heart, Shuffle, Sun, Moon, Star, Bot as Lotus, Timer, Zap, BookOpen, Headphones, Palette } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { sahasranamData, meanings, namavaliData, spiritualQuotes, meditationGuides, festivals } from '@/data/sahasranamData';
import BackgroundEffects from '@/components/BackgroundEffects';
import SacredLoader from '@/components/SacredLoader';
import MeditationTimer from '@/components/MeditationTimer';
import ChakraVisualization from '@/components/ChakraVisualization';
import SpiritualQuotes from '@/components/SpiritualQuotes';
import AudioPlayer from '@/components/AudioPlayer';

interface Settings {
  autoScroll: boolean;
  scrollSpeed: number;
  scrollDirection: 'vertical' | 'horizontal' | 'circular' | 'fade';
  displayMode: 'simple' | 'with-meaning' | 'detailed';
  readingMode: 'single' | 'continuous' | 'page';
  fontSize: number;
  fontFamily: string;
  background: 'sri-yantra' | 'temple' | 'lotus' | 'cosmic';
  timeTheme: 'dawn' | 'noon' | 'dusk' | 'night' | 'auto';
  showParticles: boolean;
  reducedMotion: boolean;
  darkMode: boolean;
  notifications: boolean;
  dailyReminder: boolean;
  soundEffects: boolean;
}

export default function LalitaSahasranama() {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<'sahasranama' | 'meanings' | 'namavali' | 'meditation' | 'wisdom'>('sahasranama');
  const [currentVerse, setCurrentVerse] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [shuffle, setShuffle] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [dailyVerse, setDailyVerse] = useState(0);
  const [readingStreak, setReadingStreak] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [settings, setSettings] = useState<Settings>({
    autoScroll: false,
    scrollSpeed: 5,
    scrollDirection: 'vertical',
    displayMode: 'with-meaning',
    readingMode: 'single',
    fontSize: 18,
    fontFamily: 'sanskrit',
    background: 'sri-yantra',
    timeTheme: 'auto',
    showParticles: true,
    reducedMotion: false,
    darkMode: true,
    notifications: true,
    dailyReminder: true,
    soundEffects: true,
  });

  // Time-based theme detection
  useEffect(() => {
    if (settings.timeTheme === 'auto') {
      const hour = new Date().getHours();
      let newTheme: 'dawn' | 'noon' | 'dusk' | 'night';
      if (hour >= 5 && hour < 10) newTheme = 'dawn';
      else if (hour >= 10 && hour < 16) newTheme = 'noon';
      else if (hour >= 16 && hour < 20) newTheme = 'dusk';
      else newTheme = 'night';
      
      setSettings(prev => ({ ...prev, timeTheme: newTheme }));
    }
  }, [settings.timeTheme]);

  // Daily verse selection
  useEffect(() => {
    const today = new Date().getDate();
    setDailyVerse(today % sahasranamData.length);
  }, []);

  // Load user progress from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('readingStreak');
    const savedSessions = localStorage.getItem('completedSessions');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedStreak) setReadingStreak(parseInt(savedStreak));
    if (savedSessions) setCompletedSessions(parseInt(savedSessions));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Auto-scroll functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (settings.autoScroll && isPlaying) {
      interval = setInterval(() => {
        setCurrentVerse(prev => {
          if (shuffle) {
            return Math.floor(Math.random() * sahasranamData.length);
          }
          return (prev + 1) % sahasranamData.length;
        });
      }, settings.scrollSpeed * 1000);
    }
    return () => clearInterval(interval);
  }, [settings.autoScroll, isPlaying, settings.scrollSpeed, shuffle]);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Search functionality
  const filteredData = sahasranamData.filter(item =>
    item.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (index: number) => {
    setFavorites(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const onMeditationComplete = () => {
    const newSessions = completedSessions + 1;
    setCompletedSessions(newSessions);
    localStorage.setItem('completedSessions', newSessions.toString());
    
    // Update reading streak
    const newStreak = readingStreak + 1;
    setReadingStreak(newStreak);
    localStorage.setItem('readingStreak', newStreak.toString());
  };
  const nextVerse = () => {
    if (shuffle) {
      setCurrentVerse(Math.floor(Math.random() * sahasranamData.length));
    } else {
      setCurrentVerse(prev => (prev + 1) % sahasranamData.length);
    }
  };

  const prevVerse = () => {
    if (shuffle) {
      setCurrentVerse(Math.floor(Math.random() * sahasranamData.length));
    } else {
      setCurrentVerse(prev => (prev - 1 + sahasranamData.length) % sahasranamData.length);
    }
  };

  if (loading) {
    return <SacredLoader />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundEffects 
        theme={settings.background} 
        timeTheme={settings.timeTheme} 
        showParticles={settings.showParticles}
        reducedMotion={settings.reducedMotion}
      />
      
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="backdrop-blur-lg bg-white/10 dark:bg-black/20 border-b border-white/20 p-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ॐ श्री ललिता सहस्रनाम
              </motion.div>
              <Badge variant="secondary" className="hidden md:block">
                Lalita Sahasranama
              </Badge>
              <div className="hidden lg:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">{readingStreak} day streak</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Timer className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">{completedSessions} sessions</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                variant="ghost"
                size="icon"
                className="backdrop-blur-lg bg-white/10"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <Button
                onClick={() => setShowAudioPlayer(!showAudioPlayer)}
                variant="ghost"
                size="icon"
                className="backdrop-blur-lg bg-white/10"
              >
                <Headphones className="w-4 h-4" />
              </Button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search verses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 backdrop-blur-lg bg-white/10 dark:bg-black/20 border-white/20"
                />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="ghost" className="backdrop-blur-lg bg-white/10">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="backdrop-blur-lg bg-white/90 dark:bg-black/80 border-white/20 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-black dark:text-white">Settings & Customization</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 max-h-96 overflow-y-auto">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-black dark:text-white">Display</h3>
                      
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-300">Font Size</label>
                        <Slider
                          value={[settings.fontSize]}
                          onValueChange={([value]) => setSettings(prev => ({ ...prev, fontSize: value }))}
                          max={32}
                          min={12}
                          step={1}
                          className="mt-2"
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{settings.fontSize}px</span>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-300">Display Mode</label>
                        <Select value={settings.displayMode} onValueChange={(value: any) => setSettings(prev => ({ ...prev, displayMode: value }))}>
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="simple">Simple</SelectItem>
                            <SelectItem value="with-meaning">With Meaning</SelectItem>
                            <SelectItem value="detailed">Detailed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-300">Font Style</label>
                        <Select value={settings.fontFamily} onValueChange={(value: any) => setSettings(prev => ({ ...prev, fontFamily: value }))}>
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sanskrit">Sanskrit</SelectItem>
                            <SelectItem value="elegant">Elegant</SelectItem>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="traditional">Traditional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600 dark:text-gray-300">Dark Mode</label>
                        <Switch
                          checked={theme === 'dark'}
                          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-black dark:text-white">Behavior</h3>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600 dark:text-gray-300">Auto Scroll</label>
                        <Switch
                          checked={settings.autoScroll}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoScroll: checked }))}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-300">Scroll Speed</label>
                        <Slider
                          value={[settings.scrollSpeed]}
                          onValueChange={([value]) => setSettings(prev => ({ ...prev, scrollSpeed: value }))}
                          max={30}
                          min={2}
                          step={1}
                          className="mt-2"
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{settings.scrollSpeed}s</span>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-300">Background Theme</label>
                        <Select value={settings.background} onValueChange={(value: any) => setSettings(prev => ({ ...prev, background: value }))}>
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sri-yantra">Sri Yantra</SelectItem>
                            <SelectItem value="temple">Temple</SelectItem>
                            <SelectItem value="lotus">Lotus</SelectItem>
                            <SelectItem value="cosmic">Cosmic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600 dark:text-gray-300">Show Particles</label>
                        <Switch
                          checked={settings.showParticles}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showParticles: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600 dark:text-gray-300">Notifications</label>
                        <Switch
                          checked={settings.notifications}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifications: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600 dark:text-gray-300">Daily Reminder</label>
                        <Switch
                          checked={settings.dailyReminder}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, dailyReminder: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600 dark:text-gray-300">Sound Effects</label>
                        <Switch
                          checked={settings.soundEffects}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, soundEffects: checked }))}
                        />
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.header>

        {/* Audio Player */}
        <AnimatePresence>
          {showAudioPlayer && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="max-w-7xl mx-auto p-4"
            >
              <AudioPlayer
                currentVerse={currentVerse}
                onVerseChange={setCurrentVerse}
                totalVerses={sahasranamData.length}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto p-4">
          <Tabs value={currentSection} onValueChange={(value: any) => setCurrentSection(value)}>
            <TabsList className="grid w-full grid-cols-5 backdrop-blur-lg bg-white/10 dark:bg-black/20 border-white/20">
              <TabsTrigger value="sahasranama" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-600">
                Sahasranama
              </TabsTrigger>
              <TabsTrigger value="meanings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-600">
                Meanings
              </TabsTrigger>
              <TabsTrigger value="namavali" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-600">
                Namavali
              </TabsTrigger>
              <TabsTrigger value="meditation" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-600">
                Meditation
              </TabsTrigger>
              <TabsTrigger value="wisdom" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-600">
                Wisdom
              </TabsTrigger>
            </TabsList>

            {/* Daily Verse Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 mb-6"
            >
              <Card className="backdrop-blur-lg bg-gradient-to-r from-yellow-400/20 to-orange-600/20 border-yellow-400/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-yellow-400">Today's Divine Name</h3>
                    <p className="text-white font-semibold">{sahasranamData[dailyVerse].sanskrit}</p>
                    <p className="text-gray-300 text-sm">{sahasranamData[dailyVerse].transliteration}</p>
                  </div>
                  <Button
                    onClick={() => setCurrentVerse(dailyVerse)}
                    variant="outline"
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    Explore
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Sahasranama Section */}
            <TabsContent value="sahasranama" className="mt-6">
              <div className="text-center mb-6">
                <div className="flex justify-center space-x-4 mb-4">
                  <Button
                    onClick={prevVerse}
                    size="icon"
                    variant="ghost"
                    className="backdrop-blur-lg bg-white/10 hover:bg-white/20"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    size="icon"
                    className="backdrop-blur-lg bg-gradient-to-r from-yellow-400 to-orange-600 hover:from-yellow-500 hover:to-orange-700"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    onClick={nextVerse}
                    size="icon"
                    variant="ghost"
                    className="backdrop-blur-lg bg-white/10 hover:bg-white/20"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={() => setShuffle(!shuffle)}
                    size="icon"
                    variant={shuffle ? "default" : "ghost"}
                    className="backdrop-blur-lg bg-white/10 hover:bg-white/20"
                  >
                    <Shuffle className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-sm text-gray-300 mb-2">
                  Verse {currentVerse + 1} of {sahasranamData.length}
                </div>
              </div>

              <motion.div
                key={currentVerse}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <Card className="backdrop-blur-lg bg-white/10 dark:bg-black/20 border-white/20 p-8">
                  <div className="text-center space-y-6">
                    <div 
                      className="text-3xl font-bold text-yellow-400 leading-relaxed"
                      style={{ 
                        fontSize: `${settings.fontSize + 8}px`,
                        fontFamily: settings.fontFamily === 'sanskrit' ? 'serif' : settings.fontFamily 
                      }}
                    >
                      {sahasranamData[currentVerse].sanskrit}
                    </div>
                    
                    <div 
                      className="text-xl text-gray-300 italic"
                      style={{ fontSize: `${settings.fontSize}px` }}
                    >
                      {sahasranamData[currentVerse].transliteration}
                    </div>
                    
                    {settings.displayMode !== 'simple' && (
                      <div 
                        className="text-lg text-gray-100 leading-relaxed max-w-2xl mx-auto"
                        style={{ fontSize: `${settings.fontSize - 2}px` }}
                      >
                        {sahasranamData[currentVerse].meaning}
                      </div>
                    )}
                    
                    <Button
                      onClick={() => toggleFavorite(currentVerse)}
                      variant="ghost"
                      size="icon"
                      className={`transition-colors ${
                        favorites.includes(currentVerse) 
                          ? 'text-red-400 hover:text-red-300' 
                          : 'text-gray-400 hover:text-red-400'
                      }`}
                    >
                      <Heart className="w-5 h-5" fill={favorites.includes(currentVerse) ? 'currentColor' : 'none'} />
                    </Button>

                    {/* Progress indicator */}
                    <div className="mt-6 w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentVerse + 1) / sahasranamData.length) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Progress: {Math.round(((currentVerse + 1) / sahasranamData.length) * 100)}% complete
                    </p>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Meanings Section */}
            <TabsContent value="meanings" className="mt-6">
              <div className="grid gap-6">
                {filteredData.slice(0, 10).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="backdrop-blur-lg bg-white/10 dark:bg-black/20 border-white/20 p-6 hover:bg-white/20 dark:hover:bg-black/30 transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="text-2xl font-bold text-yellow-400 mb-2">
                            {item.sanskrit}
                          </div>
                          <div className="text-lg text-gray-300 italic mb-3">
                            {item.transliteration}
                          </div>
                          <div className="text-gray-100 leading-relaxed">
                            {item.meaning}
                          </div>
                          <div className="text-sm text-gray-400 mt-3">
                            Verse #{index + 1}
                          </div>
                        </div>
                        <Button
                          onClick={() => toggleFavorite(index)}
                          variant="ghost"
                          size="icon"
                          className={`ml-4 ${
                            favorites.includes(index) 
                              ? 'text-red-400' 
                              : 'text-gray-400 hover:text-red-400'
                          }`}
                        >
                          <Heart className="w-4 h-4" fill={favorites.includes(index) ? 'currentColor' : 'none'} />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Namavali Section */}
            <TabsContent value="namavali" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {namavaliData.slice(0, 50).map((name, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="backdrop-blur-lg bg-white/10 dark:bg-black/20 border-white/20 p-4 hover:bg-white/20 dark:hover:bg-black/30 transition-all cursor-pointer">
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-400 mb-1">
                          {name.sanskrit}
                        </div>
                        <div className="text-sm text-gray-300 italic mb-2">
                          {name.transliteration}
                        </div>
                        <div className="text-xs text-gray-400">
                          #{index + 1}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Meditation Section */}
            <TabsContent value="meditation" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MeditationTimer onComplete={onMeditationComplete} />
                <ChakraVisualization />
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {meditationGuides.map((guide, index) => (
                  <Card key={index} className="backdrop-blur-lg bg-white/10 dark:bg-black/20 border-white/20 p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-yellow-400">{guide.title}</h3>
                        <Badge variant="secondary">{guide.duration}</Badge>
                      </div>
                      <p className="text-gray-300">{guide.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-white">Steps:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                          {guide.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Wisdom Section */}
            <TabsContent value="wisdom" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SpiritualQuotes />
                
                <Card className="backdrop-blur-lg bg-white/10 dark:bg-black/20 border-white/20 p-6">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Sacred Festivals</h3>
                  <div className="space-y-4">
                    {festivals.map((festival, index) => (
                      <div key={index} className="border-l-4 border-yellow-400 pl-4">
                        <h4 className="font-bold text-white">{festival.name}</h4>
                        <p className="text-sm text-gray-400 mb-2">{festival.date}</p>
                        <p className="text-gray-300 text-sm mb-2">{festival.description}</p>
                        <p className="text-yellow-300 text-sm italic">{festival.significance}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              
              <div className="mt-6">
                <Card className="backdrop-blur-lg bg-white/10 dark:bg-black/20 border-white/20 p-6">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Your Spiritual Journey</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">{readingStreak}</div>
                      <div className="text-sm text-gray-300">Day Streak</div>
                      <div className="text-xs text-gray-400 mt-1">Keep up the daily practice!</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">{completedSessions}</div>
                      <div className="text-sm text-gray-300">Meditation Sessions</div>
                      <div className="text-xs text-gray-400 mt-1">Hours of inner peace</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-400">{favorites.length}</div>
                      <div className="text-sm text-gray-300">Favorite Verses</div>
                      <div className="text-xs text-gray-400 mt-1">Sacred names close to heart</div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

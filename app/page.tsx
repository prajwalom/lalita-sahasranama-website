'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Settings, Search, Heart, Shuffle, Sun, Moon, Star, Timer, Zap, BookOpen, Headphones, Palette, Volume2, VolumeX } from 'lucide-react';
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
import { sahasranamData, meanings, namavaliData, spiritualQuotes, festivals } from '@/data/sahasranamData';
import BackgroundEffects from '@/components/BackgroundEffects';
import SacredLoader from '@/components/SacredLoader';
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
  notifications: boolean;
  dailyReminder: boolean;
  soundEffects: boolean;
  volume: number;
}

export default function LalitaSahasranama() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<'sahasranama' | 'meanings' | 'namavali' | 'wisdom'>('sahasranama');
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
    autoScroll: true, // Default to true
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
    notifications: true,
    dailyReminder: true,
    soundEffects: true,
    volume: 70,
  });

  // Handle mounting to prevent hydration errors
  useEffect(() => {
    setMounted(true);
    
    // Set daily verse based on current date (client-side only)
    const today = new Date().getDate();
    setDailyVerse(today % sahasranamData.length);
    
    // Load user progress from localStorage
    const savedStreak = localStorage.getItem('readingStreak');
    const savedSessions = localStorage.getItem('completedSessions');
    const savedFavorites = localStorage.getItem('favorites');
    const savedSettings = localStorage.getItem('settings');
    
    if (savedStreak) setReadingStreak(parseInt(savedStreak));
    if (savedSessions) setCompletedSessions(parseInt(savedSessions));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(prev => ({ ...prev, ...parsedSettings }));
    }
    
    // Loading simulation
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Time-based theme detection (client-side only)
  useEffect(() => {
    if (!mounted) return;
    
    if (settings.timeTheme === 'auto') {
      const hour = new Date().getHours();
      let newTheme: 'dawn' | 'noon' | 'dusk' | 'night';
      if (hour >= 5 && hour < 10) newTheme = 'dawn';
      else if (hour >= 10 && hour < 16) newTheme = 'noon';
      else if (hour >= 16 && hour < 20) newTheme = 'dusk';
      else newTheme = 'night';
      
      setSettings(prev => ({ ...prev, timeTheme: newTheme }));
    }
  }, [settings.timeTheme, mounted]);

  // Save favorites to localStorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites, mounted]);

  // Save settings to localStorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings, mounted]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!mounted) return;
    
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
  }, [settings.autoScroll, isPlaying, settings.scrollSpeed, shuffle, mounted]);

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

  const updateSettings = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Don't render until mounted to prevent hydration errors
  if (!mounted) {
    return null;
  }

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
          className="backdrop-blur-lg bg-white/20 dark:bg-black/20 border-b border-white/20 dark:border-gray-700/30 p-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-yellow-400 dark:to-orange-600 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ॐ श्री ललिता सहस्रनाम
              </motion.div>
              <Badge variant="secondary" className="hidden md:block bg-white/20 dark:bg-black/20 text-gray-800 dark:text-gray-200">
                Lalita Sahasranama
              </Badge>
              <div className="hidden lg:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-600 dark:text-yellow-400" />
                  <span className="text-gray-700 dark:text-gray-300">{readingStreak} day streak</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Timer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">{completedSessions} sessions</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                variant="ghost"
                size="icon"
                className="backdrop-blur-lg bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <Button
                onClick={() => setShowAudioPlayer(!showAudioPlayer)}
                variant="ghost"
                size="icon"
                className="backdrop-blur-lg bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20"
              >
                <Headphones className="w-4 h-4" />
              </Button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search verses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 backdrop-blur-lg bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/20 text-gray-800 dark:text-gray-200 placeholder:text-gray-600 dark:placeholder:text-gray-400"
                />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="ghost" className="backdrop-blur-lg bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="backdrop-blur-lg bg-white/95 dark:bg-black/80 border-white/20 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-gray-800 dark:text-white">Settings & Customization</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 max-h-96 overflow-y-auto">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Display</h3>
                      
                      <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">Font Size</label>
                        <Slider
                          value={[settings.fontSize]}
                          onValueChange={([value]) => updateSettings('fontSize', value)}
                          max={32}
                          min={12}
                          step={1}
                          className="mt-2"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{settings.fontSize}px</span>
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">Display Mode</label>
                        <Select value={settings.displayMode} onValueChange={(value: any) => updateSettings('displayMode', value)}>
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
                        <label className="text-sm text-gray-700 dark:text-gray-300">Background Theme</label>
                        <Select value={settings.background} onValueChange={(value: any) => updateSettings('background', value)}>
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
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Behavior</h3>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">Show Particles</label>
                        <Switch
                          checked={settings.showParticles}
                          onCheckedChange={(checked) => updateSettings('showParticles', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">Notifications</label>
                        <Switch
                          checked={settings.notifications}
                          onCheckedChange={(checked) => updateSettings('notifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">Sound Effects</label>
                        <Switch
                          checked={settings.soundEffects}
                          onCheckedChange={(checked) => updateSettings('soundEffects', checked)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">Volume</label>
                        <Slider
                          value={[settings.volume]}
                          onValueChange={([value]) => updateSettings('volume', value)}
                          max={100}
                          min={0}
                          step={1}
                          className="mt-2"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{settings.volume}%</span>
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
                volume={settings.volume}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Control Panel */}
            <div className="lg:col-span-1">
              <Card className="backdrop-blur-lg bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/20 p-4 sticky top-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-yellow-400 mb-4">Controls</h3>
                
                <div className="space-y-4">
                  {/* Playback Controls */}
                  <div className="flex justify-center space-x-2">
                    <Button
                      onClick={prevVerse}
                      size="sm"
                      variant="ghost"
                      className="bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20"
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      onClick={() => setIsPlaying(!isPlaying)}
                      size="sm"
                      className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-yellow-400 dark:to-orange-600 hover:from-amber-600 hover:to-orange-700"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      onClick={nextVerse}
                      size="sm"
                      variant="ghost"
                      className="bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20"
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Auto Scroll Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700 dark:text-gray-300">Auto Scroll</label>
                    <Switch
                      checked={settings.autoScroll}
                      onCheckedChange={(checked) => updateSettings('autoScroll', checked)}
                    />
                  </div>

                  {/* Scroll Speed */}
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300">Speed: {settings.scrollSpeed}s</label>
                    <Slider
                      value={[settings.scrollSpeed]}
                      onValueChange={([value]) => updateSettings('scrollSpeed', value)}
                      max={30}
                      min={2}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  {/* Shuffle */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700 dark:text-gray-300">Shuffle</label>
                    <Switch
                      checked={shuffle}
                      onCheckedChange={setShuffle}
                    />
                  </div>

                  {/* Progress */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Verse {currentVerse + 1} of {sahasranamData.length}
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-yellow-400 dark:to-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentVerse + 1) / sahasranamData.length) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {Math.round(((currentVerse + 1) / sahasranamData.length) * 100)}% complete
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 pt-4 border-t border-white/20 dark:border-gray-700/30">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Streak:</span>
                      <span className="text-gray-800 dark:text-white font-semibold">{readingStreak} days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Favorites:</span>
                      <span className="text-gray-800 dark:text-white font-semibold">{favorites.length}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Navigation Tabs */}
              <Tabs value={currentSection} onValueChange={(value: any) => setCurrentSection(value)}>
                <TabsList className="grid w-full grid-cols-4 backdrop-blur-lg bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/20 mb-6">
                  <TabsTrigger 
                    value="sahasranama" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
                  >
                    Sahasranama
                  </TabsTrigger>
                  <TabsTrigger 
                    value="meanings" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
                  >
                    Meanings
                  </TabsTrigger>
                  <TabsTrigger 
                    value="namavali" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
                  >
                    Namavali
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wisdom" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
                  >
                    Wisdom
                  </TabsTrigger>
                </TabsList>

                {/* Daily Verse Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <Card className="backdrop-blur-lg bg-gradient-to-r from-amber-400/30 to-orange-600/30 dark:from-yellow-400/20 dark:to-orange-600/20 border-amber-400/50 dark:border-yellow-400/30 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-amber-700 dark:text-yellow-400">Today's Divine Name</h3>
                        <p className="text-gray-800 dark:text-white font-semibold">{sahasranamData[dailyVerse].sanskrit}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{sahasranamData[dailyVerse].transliteration}</p>
                      </div>
                      <Button
                        onClick={() => setCurrentVerse(dailyVerse)}
                        variant="outline"
                        className="border-amber-600 dark:border-yellow-400 text-amber-700 dark:text-yellow-400 hover:bg-amber-100 dark:hover:bg-yellow-400/10"
                      >
                        Explore
                      </Button>
                    </div>
                  </Card>
                </motion.div>

                {/* Sahasranama Section */}
                <TabsContent value="sahasranama">
                  <motion.div
                    key={currentVerse}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="backdrop-blur-lg bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/20 p-8">
                      <div className="text-center space-y-6">
                        <div 
                          className="text-3xl font-bold text-amber-700 dark:text-yellow-400 leading-relaxed"
                          style={{ 
                            fontSize: `${settings.fontSize + 8}px`,
                            fontFamily: settings.fontFamily === 'sanskrit' ? 'serif' : settings.fontFamily 
                          }}
                        >
                          {sahasranamData[currentVerse].sanskrit}
                        </div>
                        
                        <div 
                          className="text-xl text-gray-700 dark:text-gray-300 italic"
                          style={{ fontSize: `${settings.fontSize}px` }}
                        >
                          {sahasranamData[currentVerse].transliteration}
                        </div>
                        
                        {settings.displayMode !== 'simple' && (
                          <div 
                            className="text-lg text-gray-800 dark:text-gray-100 leading-relaxed max-w-2xl mx-auto"
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
                              ? 'text-red-500 hover:text-red-400' 
                              : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <Heart className="w-5 h-5" fill={favorites.includes(currentVerse) ? 'currentColor' : 'none'} />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Meanings Section */}
                <TabsContent value="meanings">
                  <div className="grid gap-6">
                    {filteredData.slice(0, 10).map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="backdrop-blur-lg bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/20 p-6 hover:bg-white/30 dark:hover:bg-black/30 transition-all">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="text-2xl font-bold text-amber-700 dark:text-yellow-400 mb-2">
                                {item.sanskrit}
                              </div>
                              <div className="text-lg text-gray-700 dark:text-gray-300 italic mb-3">
                                {item.transliteration}
                              </div>
                              <div className="text-gray-800 dark:text-gray-100 leading-relaxed">
                                {item.meaning}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                                Verse #{index + 1}
                              </div>
                            </div>
                            <Button
                              onClick={() => toggleFavorite(index)}
                              variant="ghost"
                              size="icon"
                              className={`ml-4 ${
                                favorites.includes(index) 
                                  ? 'text-red-500' 
                                  : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
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
                <TabsContent value="namavali">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {namavaliData.slice(0, 50).map((name, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="backdrop-blur-lg bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/20 p-4 hover:bg-white/30 dark:hover:bg-black/30 transition-all cursor-pointer">
                          <div className="text-center">
                            <div className="text-lg font-bold text-amber-700 dark:text-yellow-400 mb-1">
                              {name.sanskrit}
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300 italic mb-2">
                              {name.transliteration}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              #{index + 1}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Wisdom Section */}
                <TabsContent value="wisdom">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SpiritualQuotes />
                    
                    <Card className="backdrop-blur-lg bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/20 p-6">
                      <h3 className="text-2xl font-bold text-amber-700 dark:text-yellow-400 mb-4">Sacred Festivals</h3>
                      <div className="space-y-4">
                        {festivals.map((festival, index) => (
                          <div key={index} className="border-l-4 border-amber-600 dark:border-yellow-400 pl-4">
                            <h4 className="font-bold text-gray-800 dark:text-white">{festival.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{festival.date}</p>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{festival.description}</p>
                            <p className="text-amber-700 dark:text-yellow-300 text-sm italic">{festival.significance}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <Card className="backdrop-blur-lg bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/20 p-6">
                      <h3 className="text-2xl font-bold text-amber-700 dark:text-yellow-400 mb-4">Your Spiritual Journey</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-amber-700 dark:text-yellow-400">{readingStreak}</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">Day Streak</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Keep up the daily practice!</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{completedSessions}</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">Reading Sessions</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Hours of divine connection</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{favorites.length}</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">Favorite Verses</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Sacred names close to heart</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Type, Minus, Plus } from 'lucide-react'

interface FontControlsProps {
  fontSize: number
  onFontSizeChange: (size: number) => void
  lineHeight: number
  onLineHeightChange: (height: number) => void
}

export function FontControls({ 
  fontSize, 
  onFontSizeChange, 
  lineHeight, 
  onLineHeightChange 
}: FontControlsProps) {
  const fontSizeOptions = [
    { label: 'XS', value: 12 },
    { label: 'S', value: 14 },
    { label: 'M', value: 16 },
    { label: 'L', value: 18 },
    { label: 'XL', value: 20 },
    { label: 'XXL', value: 24 }
  ]

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <Type className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Font Controls</span>
        </div>

        {/* Font Size Buttons */}
        <div className="space-y-2">
          <label className="text-xs text-amber-600 dark:text-amber-400">Font Size</label>
          <div className="flex space-x-1">
            {fontSizeOptions.map((option) => (
              <Button
                key={option.value}
                variant={fontSize === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onFontSizeChange(option.value)}
                className={`text-xs flex-1 ${
                  fontSize === option.value 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                    : 'border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Font Size Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-amber-600 dark:text-amber-400">Size: {fontSize}px</label>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFontSizeChange(Math.max(10, fontSize - 1))}
                className="h-6 w-6 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFontSizeChange(Math.min(32, fontSize + 1))}
                className="h-6 w-6 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Slider
            value={[fontSize]}
            onValueChange={(value) => onFontSizeChange(value[0])}
            min={10}
            max={32}
            step={1}
            className="w-full"
          />
        </div>

        {/* Line Height */}
        <div className="space-y-2">
          <label className="text-xs text-amber-600 dark:text-amber-400">Line Height: {lineHeight}</label>
          <Slider
            value={[lineHeight]}
            onValueChange={(value) => onLineHeightChange(value[0])}
            min={1.2}
            max={2.5}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Preview */}
        <div className="p-3 bg-white dark:bg-amber-950/30 rounded border border-amber-200 dark:border-amber-800">
          <p 
            className="font-sanskrit text-amber-800 dark:text-amber-200"
            style={{ 
              fontSize: `${fontSize}px`, 
              lineHeight: lineHeight 
            }}
          >
            श्री माता श्री महाराज्ञी
          </p>
          <p 
            className="text-amber-600 dark:text-amber-400 mt-1"
            style={{ 
              fontSize: `${fontSize * 0.9}px`, 
              lineHeight: lineHeight 
            }}
          >
            The Divine Mother, The Great Queen
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Plus, Edit3, Trash2, Save, X } from 'lucide-react'

interface VerseBookmarksProps {
  bookmarks: {[key: number]: string}
  studyNotes: {[key: number]: string}
  onBookmarkAdd: (verseId: number, name: string) => void
  onBookmarkRemove: (verseId: number) => void
  onNoteAdd: (verseId: number, note: string) => void
  verses: Array<{id: number, verseNumber: number, sanskrit: string}>
}

export function VerseBookmarks({ 
  bookmarks, 
  studyNotes, 
  onBookmarkAdd, 
  onBookmarkRemove, 
  onNoteAdd,
  verses 
}: VerseBookmarksProps) {
  const [showAddBookmark, setShowAddBookmark] = useState(false)
  const [newBookmarkName, setNewBookmarkName] = useState("")
  const [selectedVerseForBookmark, setSelectedVerseForBookmark] = useState<number | null>(null)
  const [editingNote, setEditingNote] = useState<number | null>(null)
  const [noteText, setNoteText] = useState("")

  const handleAddBookmark = () => {
    if (selectedVerseForBookmark && newBookmarkName.trim()) {
      onBookmarkAdd(selectedVerseForBookmark, newBookmarkName.trim())
      setNewBookmarkName("")
      setSelectedVerseForBookmark(null)
      setShowAddBookmark(false)
    }
  }

  const handleEditNote = (verseId: number) => {
    setEditingNote(verseId)
    setNoteText(studyNotes[verseId] || "")
  }

  const handleSaveNote = () => {
    if (editingNote) {
      onNoteAdd(editingNote, noteText)
      setEditingNote(null)
      setNoteText("")
    }
  }

  const bookmarkedVerses = Object.entries(bookmarks).map(([verseId, name]) => ({
    id: parseInt(verseId),
    name,
    verse: verses.find(v => v.id === parseInt(verseId))
  }))

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/40 dark:to-orange-900/40 border-amber-200 dark:border-amber-800 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-amber-800 dark:text-amber-200 flex items-center">
            <Bookmark className="h-5 w-5 mr-2" />
            Bookmarks & Notes
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddBookmark(!showAddBookmark)}
            className="border-amber-300 dark:border-amber-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Bookmark Form */}
        {showAddBookmark && (
          <div className="space-y-3 p-3 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="space-y-2">
              <label className="text-xs text-amber-600 dark:text-amber-400">Select Verse:</label>
              <select 
                className="w-full p-2 rounded border border-amber-300 dark:border-amber-700 bg-white dark:bg-amber-950/50 text-sm"
                value={selectedVerseForBookmark || ""}
                onChange={(e) => setSelectedVerseForBookmark(parseInt(e.target.value))}
              >
                <option value="">Choose a verse...</option>
                {verses.map((verse) => (
                  <option key={verse.id} value={verse.id}>
                    Verse {verse.verseNumber}: {verse.sanskrit.split('\n')[0].substring(0, 30)}...
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-amber-600 dark:text-amber-400">Bookmark Name:</label>
              <Input
                placeholder="e.g., 'Divine Mother's Grace'"
                value={newBookmarkName}
                onChange={(e) => setNewBookmarkName(e.target.value)}
                className="border-amber-300 dark:border-amber-700"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={handleAddBookmark}
                disabled={!selectedVerseForBookmark || !newBookmarkName.trim()}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddBookmark(false)}
                className="border-amber-300 dark:border-amber-700"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Bookmarked Verses */}
        <div className="space-y-3">
          {bookmarkedVerses.length === 0 ? (
            <div className="text-center py-6 text-amber-600 dark:text-amber-400">
              <Bookmark className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No bookmarks yet. Add your favorite verses!</p>
            </div>
          ) : (
            bookmarkedVerses.map(({ id, name, verse }) => (
              <div key={id} className="p-3 bg-white dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline" className="text-xs">Verse {verse?.verseNumber}</Badge>
                      <span className="text-sm font-medium text-amber-800 dark:text-amber-200">{name}</span>
                    </div>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-sanskrit">
                      {verse?.sanskrit.split('\n')[0].substring(0, 50)}...
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditNote(id)}
                      className="h-6 w-6 p-0 text-amber-600 dark:text-amber-400"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onBookmarkRemove(id)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {/* Study Notes */}
                {editingNote === id ? (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add your study notes, insights, or personal reflections..."
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="text-sm border-amber-300 dark:border-amber-700"
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSaveNote} className="text-xs">
                        <Save className="h-3 w-3 mr-1" />
                        Save Note
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setEditingNote(null)} className="text-xs">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : studyNotes[id] ? (
                  <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded text-xs text-amber-700 dark:text-amber-300">
                    <strong>Note:</strong> {studyNotes[id]}
                  </div>
                ) : (
                  <div className="mt-2 text-xs text-amber-500 dark:text-amber-500 italic">
                    Click edit to add study notes
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

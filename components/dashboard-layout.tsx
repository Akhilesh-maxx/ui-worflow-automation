"use client"

import React, { useState, useEffect } from "react"
import {
  Bell,
  Mail,
  Settings,
  ChevronDown,
  ChevronUp,
  Edit3,
  ImageIcon,
  Paperclip,
  Mic,
  Send,
  Layers,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isPlanningOpen, setIsPlanningOpen] = useState(false)
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [companyName, setCompanyName] = useState("Suchama.ai")
  const [messages, setMessages] = useState<Array<{ id: number, text: string, isBot: boolean, timestamp: Date }>>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken')
    sessionStorage.clear()

    // Redirect to login page
    window.location.href = '/login'
  }

  // Initialize with typing animation and then show welcome message
  useEffect(() => {
    setIsTyping(true)
    const timer = setTimeout(() => {
      setIsTyping(false)
      setMessages([{
        id: 1,
        text: "Hi! I am SAI, your production planning assistant. How may I assist you?",
        isBot: true,
        timestamp: new Date()
      }])
    }, 1000) // Show typing for 1 second

    return () => clearTimeout(timer)
  }, [])

  // Prevent scroll bounce with JavaScript
  useEffect(() => {
    const preventBounce = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      const scrollContainer = target.closest('.prevent-bounce')
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer
        if (scrollTop === 0 && e.touches[0].clientY > e.touches[0].clientY) {
          e.preventDefault()
        }
        if (scrollTop + clientHeight >= scrollHeight && e.touches[0].clientY < e.touches[0].clientY) {
          e.preventDefault()
        }
      }
    }

    document.addEventListener('touchmove', preventBounce, { passive: false })
    return () => document.removeEventListener('touchmove', preventBounce)
  }, [])

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-[268px] bg-[#5E50E8] flex flex-col h-screen">
        {/* Fixed Top Section */}
        <div className="flex flex-col items-center py-10 px-4 gap-7 flex-shrink-0">
          {/* Main Logo */}
          <div className="w-[105px] h-[93px] flex-shrink-0">
            <Image
              src="/suchama-logo-main.png"
              alt="Suchama.ai"
              width={105}
              height={93}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Menu Separator */}
          <div className="w-full flex justify-center items-center py-2 px-4">
            <div className="w-[196px] h-[1px] bg-[#D9D9D9]"></div>
          </div>

          {/* Suchama.ai Section */}
          <div className="w-[199px] h-[50px] border border-white/10 rounded-lg py-3 px-3 flex items-center hover:bg-white/5 transition-colors">
            <div className="w-[41px] h-[26px] flex-shrink-0 mr-3">
              <Image
                src="/suchama-logo-main.png"
                alt="Suchama.ai"
                width={41}
                height={26}
                className="w-full h-full object-contain"
              />
            </div>
            {isEditing ? (
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditing(false)
                  }
                }}
                className="flex-1 bg-transparent border-none text-[#F3F3F3] font-semibold text-base p-0 h-auto focus-visible:ring-0 mr-3"
                autoFocus
              />
            ) : (
              <a
                href="http://suchama.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F3F3F3] font-semibold text-base flex-1 hover:underline mr-3"
              >
                {companyName}
              </a>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="hover:bg-white/10 p-1 rounded transition-colors flex-shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#F3F3F3]" />
            </button>
          </div>
        </div>

        {/* Scrollable Middle Section */}
        <div
          className="flex-1 overflow-y-auto px-4 scrollbar-hide prevent-bounce"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            overscrollBehavior: 'none',
            overscrollBehaviorY: 'none',
          } as React.CSSProperties}
        >
          <div className="flex flex-col gap-7">
            {/* Planning Section */}
            <div className="w-full flex flex-col gap-3">
              <Collapsible open={isPlanningOpen} onOpenChange={setIsPlanningOpen}>
                <CollapsibleTrigger className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    {isPlanningOpen ? (
                      <ChevronDown className="w-5 h-5 text-[#B3B3B3]" />
                    ) : (
                      <ChevronUp className="w-5 h-5 text-[#B3B3B3]" />
                    )}
                    <span className="text-[#F5F5F5] font-semibold text-base">Planning</span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-10 flex flex-col gap-3">
                  <div className="p-3 text-[#F5F5F5] font-semibold text-base hover:bg-white/5 rounded-lg cursor-pointer">
                    July Week 4
                  </div>
                  <div className="p-3 text-[#F5F5F5] font-semibold text-base hover:bg-white/5 rounded-lg cursor-pointer">
                    RM Visibility
                  </div>
                  <div className="flex items-center gap-3 p-3 text-[#F5F5F5] font-semibold text-base hover:bg-white/5 rounded-lg cursor-pointer border border-white/10">
                    <Layers className="w-5 h-5 text-[#F5F5F5]" />
                    <span>Planning SOP</span>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Menu Separator */}
            <div className="w-full flex justify-center items-center py-2 px-4">
              <div className="w-[196px] h-[1px] bg-[#D9D9D9]"></div>
            </div>

            {/* Scheduling Section */}
            <div className="w-full flex flex-col gap-3">
              <Collapsible open={isSchedulingOpen} onOpenChange={setIsSchedulingOpen}>
                <CollapsibleTrigger className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    {isSchedulingOpen ? (
                      <ChevronDown className="w-5 h-5 text-[#B3B3B3]" />
                    ) : (
                      <ChevronUp className="w-5 h-5 text-[#B3B3B3]" />
                    )}
                    <span className="text-[#F5F5F5] font-semibold text-base">Scheduling</span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-10 flex flex-col gap-3">
                  <div className="p-3 text-[#F5F5F5] font-semibold text-base hover:bg-white/5 rounded-lg cursor-pointer">
                    July Week 4
                  </div>
                  <div className="p-3 text-[#F5F5F5] font-semibold text-base hover:bg-white/5 rounded-lg cursor-pointer">
                    Machine AV
                  </div>
                  <div className="p-3 text-[#F5F5F5] font-semibold text-base hover:bg-white/5 rounded-lg cursor-pointer">
                    Store Inventory
                  </div>
                  <div className="flex items-center gap-3 p-3 text-[#F5F5F5] font-semibold text-base hover:bg-white/5 rounded-lg cursor-pointer border border-white/10">
                    <Layers className="w-5 h-5 text-[#F5F5F5]" />
                    <span>Scheduling SOP</span>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Section */}
        <div className="flex-shrink-0 p-4">
          <div className="w-full">
            <div className="flex items-center gap-3 text-[#F3F3F3] hover:bg-white/5 cursor-pointer p-3 rounded-lg">
              <Settings className="w-5 h-5" />
              <span className="font-semibold text-base">Settings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="h-16 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 flex items-center justify-end px-6 gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="w-5 h-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full hover:ring-2 hover:ring-gray-300 transition-all">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">U</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-gray-50">
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 relative z-10">
            <div className="max-w-4xl mx-auto space-y-6">
              {children}
            </div>
          </div>

          {/* Chat Messages positioned above toolbox */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6 z-10">
            <div className="space-y-4">
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0">
                    <div className="overflow-hidden" style={{ width: '31px', height: '17px', opacity: 1 }}>
                      <Image
                        src="/ai-chat-avatar.jpeg"
                        alt="Suchama AI"
                        width={31}
                        height={17}
                        className="w-full h-full object-cover"
                        style={{ transform: 'rotate(0deg)' }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '8px 12px',
                      width: '80px',
                      height: '42px',
                      background: '#5E50E8',
                      borderRadius: '0px 16px 16px 16px',
                    }}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  {message.isBot && (
                    <div className="flex-shrink-0">
                      <div className="overflow-hidden" style={{ width: '31px', height: '17px', opacity: 1 }}>
                        <Image
                          src="/ai-chat-avatar.jpeg"
                          alt="Suchama AI"
                          width={31}
                          height={17}
                          className="w-full h-full object-cover"
                          style={{ transform: 'rotate(0deg)' }}
                        />
                      </div>
                    </div>
                  )}

                  {message.isBot ? (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '8px 12px',
                        width: '561px',
                        height: '42px',
                        background: '#5E50E8',
                        borderRadius: '0px 16px 16px 16px',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '140%',
                        color: '#FFFFFF',
                        flex: 'none',
                        order: 0,
                        flexGrow: 0,
                      }}
                    >
                      <span style={{ width: '537px', height: '22px' }}>{message.text}</span>
                    </div>
                  ) : (
                    <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-white text-gray-800 shadow-sm border border-gray-200">
                      <p className="text-sm">{message.text}</p>
                    </div>
                  )}

                  {!message.isBot && (
                    <div className="flex-shrink-0">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">U</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Elegant Chat Input */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6 z-20">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50">
            {/* Main Input Area */}
            <div className="flex items-center gap-4 p-4">
              {/* Left Icons */}
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ImageIcon className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Input Field */}
              <div className="flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && inputValue.trim()) {
                      const newMessage = {
                        id: messages.length + 1,
                        text: inputValue.trim(),
                        isBot: false,
                        timestamp: new Date()
                      }
                      setMessages([...messages, newMessage])
                      setInputValue("")
                    }
                  }}
                  placeholder="Ask me anything ..."
                  className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-base"
                />
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors">
                  <Mic className="w-5 h-5 text-purple-600" />
                </button>
                <button
                  onClick={() => {
                    if (inputValue.trim()) {
                      const newMessage = {
                        id: messages.length + 1,
                        text: inputValue.trim(),
                        isBot: false,
                        timestamp: new Date()
                      }
                      setMessages([...messages, newMessage])
                      setInputValue("")
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

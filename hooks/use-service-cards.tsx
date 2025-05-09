"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"

interface ServiceCardsContextType {
  activeServiceIndex: number
  setActiveServiceIndex: (index: number) => void
  totalCards: number
}

const ServiceCardsContext = createContext<ServiceCardsContextType>({
  activeServiceIndex: 0,
  setActiveServiceIndex: () => {},
  totalCards: 5,
})

export function ServiceCardsProvider({ children, totalCards = 5 }: { children: React.ReactNode; totalCards?: number }) {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)

  return (
    <ServiceCardsContext.Provider value={{ activeServiceIndex, setActiveServiceIndex, totalCards }}>
      {children}
    </ServiceCardsContext.Provider>
  )
}

export function useServiceCards() {
  return useContext(ServiceCardsContext)
}

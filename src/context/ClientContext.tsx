'use client'

import { ReceiptTurkishLira } from "lucide-react"
import { useContext, createContext, useState, ReactNode } from "react"

interface Iclient {

}

const clientcontext = createContext<Iclient | null>(null)

interface IApp {
    children:ReactNode
}

export const ClientProvider = ({ children }:IApp) => {
    return (
        <clientcontext.Provider value={{ name: "siddu" }}>
            {children}
        </clientcontext.Provider>
    )
}


export const useClientContent = () => {
    const context = useContext(clientcontext)
    if (!context) {
        throw new Error("useAppContext must be used within AppProvider");
    }
    return context;
}

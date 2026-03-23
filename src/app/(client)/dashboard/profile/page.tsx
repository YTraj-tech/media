'use client'

import { PORT } from '@/lib/Port'
import React, { useState } from 'react'
import { useUser, useAuth } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'

export interface Iprofile {
  clientId: string
  companyName: string
  companyType: string
  purpose: string
  name: string
  Employes: number
  completedTask: number
}

const COMPANY_TYPES = [
  'Startup',
  'SME',
  'Enterprise',
  'Non-Profit',
  'Government',
  'Freelance',
  'Agency',
  'Other',
]

const Profilepage = () => {
  const { user } = useUser()
  const { getToken } = useAuth()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [userData, setUserData] = useState({
    companyName: '',
    companyType: '',
    purpose: '',
    name: '',
    Employes: 0,
  })

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: name === 'Employes' ? Number(value) : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setUserData((prev) => ({ ...prev, companyType: value }))
  }

  const completionCount = Object.entries(userData).filter(([k, v]) =>
    k === 'Employes' ? Number(v) > 0 : String(v).trim() !== ''
  ).length
  const totalFields = Object.keys(userData).length
  const completionPct = Math.round((completionCount / totalFields) * 100)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setSuccess(false)

    try {
      const token = await getToken()

      if (!token) {
        throw new Error('Could not get authentication token')
      }

      const response = await fetch(`${PORT}/api/clientprofile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userData }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data?.message || 'Something went wrong')
      }

      setSuccess(true)
    } catch (err: any) {
      setErrorMsg(err.message || 'Unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full  px-4 py-16 dark:from-purple-950/20 dark:to-background">
      <Card className="w-full border-purple-500 shadow-lg shadow-purple-100/50 dark:border-purple-900/50 dark:shadow-purple-900/20 md:p-40">
        <CardHeader className="pb-4">
          <Badge 
            variant="secondary" 
            className="mb-2 w-fit bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 text-xs uppercase tracking-widest"
          >
            Client Setup
          </Badge>
          <CardTitle className="text-3xl font-normal leading-tight">
            Build your <span className="bg-linear-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">profile</span>
          </CardTitle>
          <CardDescription className="text-purple-600/70 dark:text-purple-400/70">
            Tell us about yourself and your company to get started.
          </CardDescription>

          {/* Progress bar with purple theme */}
          <div className="mt-4 flex items-center gap-3">
            <Progress 
              value={completionPct} 
              className="flex-1 [&>div]:bg-linear-to-r [&>div]:from-purple-600 [&>div]:to-purple-400" 
            />
            <span className="min-w-9 text-right text-xs font-medium text-purple-600 dark:text-purple-400">
              {completionPct}%
            </span>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-purple-700 dark:text-purple-300">
                Your Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Arjun Mehta"
                value={userData.name}
                onChange={handleOnChange}
                required
                className="border-purple-200 focus-visible:ring-purple-500 dark:border-purple-800 dark:focus-visible:ring-purple-400"
              />
            </div>

            {/* Company Name + Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="companyName" className="text-purple-700 dark:text-purple-300">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Acme Corp"
                  value={userData.companyName}
                  onChange={handleOnChange}
                  required
                  className="border-purple-200 focus-visible:ring-purple-500 dark:border-purple-800 dark:focus-visible:ring-purple-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="companyType" className="text-purple-700 dark:text-purple-300">
                  Company Type
                </Label>
                <Select
                  value={userData.companyType}
                  onValueChange={handleSelectChange}
                  required
                >
                  <SelectTrigger 
                    id="companyType"
                    className="border-purple-200 focus:ring-purple-500 dark:border-purple-800 dark:focus:ring-purple-400"
                  >
                    <SelectValue placeholder="Select type…" />
                  </SelectTrigger>
                  <SelectContent className="border-purple-200 dark:border-purple-800">
                    {COMPANY_TYPES.map((t) => (
                      <SelectItem 
                        key={t} 
                        value={t}
                        className="focus:bg-purple-100 focus:text-purple-900 dark:focus:bg-purple-900/50 dark:focus:text-purple-100"
                      >
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Employees */}
            <div className="space-y-1.5">
              <Label htmlFor="Employes" className="text-purple-700 dark:text-purple-300">
                Number of Employees
              </Label>
              <Input
                id="Employes"
                name="Employes"
                type="number"
                min={1}
                placeholder="e.g. 25"
                value={userData.Employes === 0 ? '' : userData.Employes}
                onChange={handleOnChange}
                required
                className="border-purple-200 focus-visible:ring-purple-500 dark:border-purple-800 dark:focus-visible:ring-purple-400"
              />
              <p className="text-xs text-purple-500/70 dark:text-purple-400/70">
                Approximate headcount is fine.
              </p>
            </div>

            {/* Purpose */}
            <div className="space-y-1.5">
              <Label htmlFor="purpose" className="text-purple-700 dark:text-purple-300">
                Purpose / Goal
              </Label>
              <Textarea
                id="purpose"
                name="purpose"
                rows={3}
                placeholder="Briefly describe what you're looking to achieve…"
                value={userData.purpose}
                onChange={handleOnChange}
                className="resize-none border-purple-200 leading-relaxed focus-visible:ring-purple-500 dark:border-purple-800 dark:focus-visible:ring-purple-400"
                required
              />
            </div>

            {/* Alerts */}
            {success && (
              <Alert variant="default" className="border-purple-500/30 bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300">
                <CheckCircle2 className="h-4 w-4 text-purple-500" />
                <AlertDescription>Profile saved successfully!</AlertDescription>
              </Alert>
            )}
            {errorMsg && (
              <Alert variant="destructive" className="border-red-500/30 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300">
                <XCircle className="h-4 w-4 text-red-500" />
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button - Enhanced Purple */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 disabled:from-purple-300 disabled:to-purple-300 dark:from-purple-500 dark:to-purple-400 dark:hover:from-purple-600 dark:hover:to-purple-500"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                'Save Profile'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profilepage
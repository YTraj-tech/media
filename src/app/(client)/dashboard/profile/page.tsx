// 'use client'

// import { UseClientContext } from '@/context/ClientContext';
// import React, { useState } from 'react';

// const Profilepage = () => {

//   const [formData, setFormData] = useState({
//     companyName: '',
//     companyType: '',
//     purpose: '',
//     name: '',
//     employees: '',
  
//   });


//   const { CreateProfile, loading } = UseClientContext()



// const handleChange = (e:any) => {
//    const {name,value} = e.target 
//    setFormData({
//     ...formData,
//     [name]:value
//    })
//   }


// const handelSubmit = async (e: any) => {
//     e.preventDefault();
//     await CreateProfile(formData.companyName, formData.companyType, formData.purpose, formData.name, formData.employees)
//     setFormData({
//       companyName: '',
//       companyType: '',
//       purpose: '',
//       name: '',
//       employees: ''
//     })
//     alert("updated succesfully")
//   };



//   const handleReset = () => {
//     setFormData({
//       companyName: '',
//       companyType: '',
//       purpose: '',
//       name: '',
//       employees: ''
//     });
//   };

//   return (
//     <div className=" w-full h-screen mx-auto border-l-2 border-gray-300 p-6">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
//         Company Information Form
//       </h2>

//       <form onSubmit={handelSubmit} className="bg-white rounded-lg shadow-md p-6">
//         {/* Company Name Field */}
//         <div className="mb-5">
//           <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
//             Company Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             id="companyName"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//             placeholder="Enter company name"
//             required
//             className="w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         {/* Company Type Field */}
//         <div className="mb-5">
//           <label htmlFor="companyType" className="block text-sm font-semibold text-gray-700 mb-2">
//             Company Type <span className="text-red-500">*</span>
//           </label>
//           <select
//             id="companyType"
//             name="companyType"
//             value={formData.companyType}
//             onChange={handleChange}
//             required
//             className="w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//           >
//             <option value="">Select company type</option>
//             <option value="Private">Private</option>
//             <option value="Public">Public</option>
//             <option value="Non-Profit">Non-Profit</option>
//             <option value="Government">Government</option>
//             <option value="Startup">Startup</option>
//           </select>
//         </div>



//         {/* Name Field */}
//         <div className="mb-5">
//           <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
//             Contact Person Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter contact person name"
//             required
//             className="w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         {/* Employees Field */}
//         <div className="mb-6">
//           <label htmlFor="employees" className="block text-sm font-semibold text-gray-700 mb-2">
//             Number of Employees <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             id="employees"
//             name="employees"
//             value={formData.employees}
//             onChange={handleChange}
//             placeholder="Enter number of employees"
//             min="0"
//             required
//             className="w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         {/* Purpose Field */}
//         <div className="mb-5">
//           <label htmlFor="purpose" className="block text-sm font-semibold text-gray-700 mb-2">
//             Purpose <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             id="purpose"
//             name="purpose"
//             value={formData.purpose}
//             onChange={handleChange}
//             placeholder="Enter company purpose or mission"
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
//           />
//         </div>

//         {/* Form Actions */}
//         <div className="flex gap-3">
//           <button
//             disabled={loading}
//             type="submit"
//             className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
//           >
//             Submit
//           </button>
//           <button
//             type="button"
//             onClick={handleReset}
//             className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
//           >
//             Reset
//           </button>
//         </div>
//       </form>


//     </div>
//   );
// };

// export default Profilepage;


'use client'

import { UseClientContext } from '@/context/ClientContext'
import { useState } from 'react'

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const Profilepage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    purpose: '',
    name: '',
    employees: '',
  })

  const { CreateProfile, loading } = UseClientContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await CreateProfile(
      formData.companyName,
      formData.companyType,
      formData.purpose,
      formData.name,
      formData.employees
    )
    handleReset()
    alert('Updated successfully')
  }

  const handleReset = () => {
    setFormData({ companyName: '', companyType: '', purpose: '', name: '', employees: '' })
  }

  return (
    <div className="  border-l-2 border-gray-300  h-full p-6">
      <Card className='h-fit'>
        <CardHeader>
          <Badge variant="secondary" className="w-fit mb-1">Company setup</Badge>
          <CardTitle>Company information</CardTitle>
          <CardDescription>Fill in your organization details to get started.</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">
                  Company name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Acme Inc."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyType">
                  Company type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.companyType}
                  onValueChange={val => setFormData(prev => ({ ...prev, companyType: val }))}
                  required
                >
                  <SelectTrigger id="companyType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private">Private</SelectItem>
                    <SelectItem value="Public">Public</SelectItem>
                    <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                    <SelectItem value="Government">Government</SelectItem>
                    <SelectItem value="Startup">Startup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Contact person <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employees">
                  Employees <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="employees"
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  required
                />
                <p className="text-xs text-muted-foreground">Approximate headcount</p>
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-2">
              <Label htmlFor="purpose">
                Purpose / mission <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Describe your company's purpose or mission statement..."
                required
                className="resize-y min-h-[90px]"
              />
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button type="submit" disabled={loading} className="flex-1">
                Save profile
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profilepage
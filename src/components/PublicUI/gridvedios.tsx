// import React from 'react'
// import { Card } from '../ui/card'

// const GridVedios = () => {
//     return (
//         <section className='flex flex-col absolute -right-20 '>
//             <div className='flex gap-x-10 my-10'>
//                 <Card className='h-52 w-96 rounded-4xl bg-red-200' />
//                 <Card className='h-52 w-96 rounded-4xl bg-red-200' />
//             </div>
//             <div className='flex gap-x-10 -m-12 my-10'>
//                 <Card className='h-52 w-96 rounded-4xl bg-red-200' />
//                 <Card className='h-52 w-96 rounded-4xl bg-red-200' />
//             </div>
//             <div className='flex gap-x-10 my-10'>
//                 <Card className='h-52 w-96 rounded-4xl bg-red-200' />
//                 <Card className='h-52 w-96 rounded-4xl bg-red-200' />
//             </div>
//         </section>
//     )
// }

// export default GridVedios


import React from 'react'
import { Card } from '../ui/card'

const GridVedios = () => {
    return (
        <section className='flex mx-5 md:mx-0 md:absolute -right-5 my-6 flex-col'>
            <div className='flex gap-x-10 my-2 md:my-10'>
                <Card className='h-20 w-24 md:h-52 md:w-96 md:rounded-4xl bg-red-200' />
                <Card className='h-20 w-24   md:h-52 md:w-96 md:rounded-4xl bg-red-200' />
            </div>
            <div className='flex  gap-x-10 my-2 md:-ml-20'>
                <Card className='h-20 w-24 md:h-52 md:w-96 md:rounded-4xl bg-red-200' />
                <Card className='h-20 w-24 md:h-52 md:w-96 md:rounded-4xl bg-red-200' />
            </div>
            <div className='flex  gap-x-10 my-2 md:my-12'>
                <Card className='h-20 w-24 md:h-52 md:w-96 md:rounded-4xl bg-red-200' />
                <Card className='h-20 w-24 md:h-52 md:w-96 md:rounded-4xl bg-red-200' />
            </div>
        </section>
    )
}

export default GridVedios
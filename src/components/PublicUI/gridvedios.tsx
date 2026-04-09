import React from 'react'
import { Card } from '../ui/card'

const GridVedios = () => {
    return (
        <section className='flex-col absolute my-32 h-fit  -m-28 right-0  '>
            <div className='flex gap-x-10 my-10'>
                <Card className='h-52 w-96 rounded-4xl bg-red-200' />
                <Card className='h-52 w-96 rounded-4xl bg-red-200' />
            </div>
            <div className='flex gap-x-10 -m-12 my-10'>
                <Card className='h-52 w-96 rounded-4xl bg-red-200' />
                <Card className='h-52 w-96 rounded-4xl bg-red-200' />
            </div>
            <div className='flex gap-x-10 my-10'>
                <Card className='h-52 w-96 rounded-4xl bg-red-200' />
                <Card className='h-52 w-96 rounded-4xl bg-red-200' />
            </div>
        </section>
    )
}

export default GridVedios
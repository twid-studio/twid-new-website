import React from 'react'
import WorksHero from './WorksHero/WorksHero'

import './WorkDetails.scss'
import Categories from './Categories/Categories'
import Sections from './Sections/Sections'
import MoreWorks from './MoreWorks/MoreWorks'

export default function WorkDetails() {
  return (
    <main className='work-details'>
      <WorksHero />
      <Categories />
      <Sections />
      <MoreWorks />
    </main>
  )
}

// Importing homepage sections/components
import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import Testimonials from '../../components/student/Testimonials'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'

// Home component (main landing page)
const Home = () => {
  return (
    // Layout container
    <div className='flex flex-col items-center space-y-7 text-center'>

      {/* Hero section */}
      <Hero/>

      {/* Partner companies */}
      <Companies/>

      {/* Courses preview */}
      <CoursesSection/>

      {/* User testimonials */}
      <Testimonials/>

      {/* CTA section */}
      <CallToAction/>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

// Exporting component
export default Home
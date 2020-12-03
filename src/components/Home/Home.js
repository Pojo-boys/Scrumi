import React, { Fragment } from 'react'
import banner from './scrumitext.png'
const Home = () => (
  <Fragment>
    <img src={banner} className='theBanner' alt='Scrumi, in a green, purple and blue stylized font.' />
    <h1>About</h1>
    <p>
        Scrumi is a productivity app for developers. Designed by developers, we know what you are looking for in a scrum focused to do list. Set a sprint, create tasks for that sprint and see your progress throughout the product lifecycle.
        If you are a first time user... Welcome!
        If you are returning... Welcome Back!
        Have fun setting your tasks and happy coding!
        |The Scrumi team|
    </p>
  </Fragment>
)

export default Home

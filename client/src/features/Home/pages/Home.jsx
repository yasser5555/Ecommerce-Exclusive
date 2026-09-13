import React from 'react'
import { useChangeTitle } from '../../../shared/Utils/useChangeTitle'

export default function Homepage() {
  useChangeTitle({title:"Home"})
  return (
    <h1>Homepage</h1>
  )
}

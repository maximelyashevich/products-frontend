import React from 'react'
import ContentLoader from 'react-content-loader'

const CardLoading = (props) => {
  return (
    <>
      <ContentLoader 
    speed={1}
    width={250}
    height={500}
    viewBox="0 0 400 460"
    backgroundColor="#e8e8e8"
    foregroundColor="#f2f2f2"
    {...props}
  >
    <circle cx="50" cy="435" r="24" /> 
    <rect x="130" y="415" rx="5" ry="5" width="140" height="10" /> 
    <rect x="0" y="0" rx="20" ry="20" width="400" height="400" /> 
    <circle cx="350" cy="435" r="25" /> 
    <rect x="78.5" y="430" rx="10" ry="10" width="241" height="24" />
  </ContentLoader>
    </>

  )
}

export default CardLoading
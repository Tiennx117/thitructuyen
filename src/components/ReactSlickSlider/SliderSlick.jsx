import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

const SliderSlick = React.forwardRef((props, ref) => {
  const [swiped, setSwiped] = useState(false)

  const handleSwiped = useCallback(() => {
    setSwiped(true)
  }, [setSwiped])

  const handleOnItemClick = useCallback(
    (e) => {
      if (swiped) {
        e.stopPropagation()
        e.preventDefault()
        setSwiped(false)
      }
    },
    [swiped],
  )

  return (
    <Slider
      onSwipe={handleSwiped}
      {...props}
     ref={ref}
    >
      {props.children.map((child, index) => (
        <div key={index} onClickCapture={handleOnItemClick}>{child}</div>
      ))}
    </Slider>
  )
});
export { SliderSlick }
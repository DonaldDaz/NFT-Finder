import React from 'react'
import { useGlobalContext } from '../context'
import ReactSlider from "react-slider";


const SearchForm = () => {
  const { nrNft, setNrNft, nftInput, setNftInput, searchPressed, setSearchPressed, slider, setSlider } = useGlobalContext()
  var sliderValue=0

  const handleChange = (e) => {
    e.preventDefault()
    setNftInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchPressed(!searchPressed)
    console.log(sliderValue)
  }

  const handleSliderChange = (e) =>{
    setSlider(e)
  }

  const handleNrNftChange = (e) =>{
    setNrNft(e.target.value)
  }

  return (
    <div>
      <section className="section search">
        <form className="search-form">
          <div className="form-control" >
            <label htmlFor="name">Insert your nft description</label>
            <div style={{display: 'flex', flexDirection:'row'}}>
            <input type="text" id="name" name="name" value={nftInput} onChange={handleChange} />
            <input type="number" id="nrNft" name="nrNftToShow" value={nrNft} onChange={handleNrNftChange} style={{width: "75px", marginLeft: "1.5rem"}}/>
            <button type="button" name="submit" style={{width: "75px", marginLeft: "1.5rem", background: "#390cdc", color:"#fff"}} onClick={handleSubmit} > {'>'} </button>
            </div>
          </div>
        </form>
      </section >

      <div class="slider-label">Accuracy</div>
      
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        renderThumb={(sliderProps, sliderState) => <div {...sliderProps}>{sliderState.valueNow}</div>}
        onChange={handleSliderChange}
      />
    </div>
  )
}

export default SearchForm

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

const ImageSlider = (props) => {
    const nftsList = props.list
    const showedNfts = props.showed
    const updateShowed = props.updateShowed
    const indexes = props.indexes
    const updateIndexes = props.updateIndexes

    let next = (list) => {
        if (indexes[1] < list.length - 4) {
            indexes[0] += 4
            indexes[1] += 4
        } else {
            indexes[0] = nftsList.length-4
            indexes[1] = nftsList.length
        }
        updateShowed(nftsList.slice(indexes[0], indexes[1]))
        updateIndexes([indexes[0], indexes[1]])
        console.log([indexes[0], indexes[1]])
    }

    let prev = (list) => {
        if (indexes[0] > 4) {
            indexes[0] -= 4
            indexes[1] -= 4
        } else {
            indexes[0] = 0
            indexes[1] = 4
        }
        updateShowed(nftsList.slice(indexes[0], indexes[1]))
        updateIndexes([indexes[0], indexes[1]])
        console.log([indexes[0], indexes[1]])
    }

    return (
        <div className="similar-wrapper">
            <a className="similar-prev" onClick={() => { prev(nftsList) }}>&#10094;</a>
            <div className="similar-image-container">
                {showedNfts.map((item, index) => (
                    <div key={index} style={{display: "inline-block"}} className="similar-image">
                    <img src={`data:image/jpeg;base64,${item.base64Img}`}/>
                    <Link className='btn btn-primary btn-details' to={'/nft/'+item.id} 
                    onClick={window.location.reload} style={{fontSize: "large"}}>Go</Link>
                    </div>
                ))}
            </div>
            <a className="similar-next" onClick={() => { next(nftsList) }}>&#10095;</a>
        </div>)
}

export default ImageSlider
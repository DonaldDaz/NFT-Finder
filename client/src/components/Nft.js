import React from 'react'
import {Link } from 'react-router-dom'

const Nft = ({nft}) => {
  const { similarityScore, base64Img, category,nft_name, coco_url, collection, date_captured, file_name,
    file_path, flickr_url, generated_caption, height, id, license, 
    original_caption, similarity, width } = nft

const similarityScoreView = similarityScore==-1? <p></p> : <p>Similarity Score = {similarityScore}</p>
const originalCaptionView = original_caption.length > 250? <p>{original_caption.substring(0, 249)} ...</p>:<p>{original_caption}</p>

  return (
<article className="nft">
  <div className="img-container">
    <img src={`data:image/jpeg;base64,${base64Img}`} />
  </div>
  <div className="nft-footer">
    <h4>{collection}</h4>
    <h5>{generated_caption}</h5>
    <p></p>
    {originalCaptionView}
    <p></p>
    {similarityScoreView}
    </div>
    <Link className='btn btn-primary btn-details' to={'/nft/'+id}>Details</Link>
</article>
  )
  }
export default Nft


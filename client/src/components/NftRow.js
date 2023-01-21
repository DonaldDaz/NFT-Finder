import React from 'react'
import { Link } from 'react-router-dom'

const NftRow = ({ nft }) => {
    const { similarityScore, base64Img, category, coco_url, collection, date_captured, file_name,
        file_path, flickr_url, generated_caption, height, id, license,
        original_caption, similarity, width } = nft

    const similarityScoreView = similarityScore == -1 ?
        <p></p> : <p>Similarity Score = {similarityScore}</p>
    const generated_captionView = String(generated_caption).length > 50 ?
        <i>{String(generated_caption).substring(0, 49)} ...</i> : <i>{generated_caption}</i>

    return (
        <div className="nft-row">
            <img className='img-row' src={`data:image/jpeg;base64,${base64Img}`} />
            <div className='vertical-center' style={{ marginLeft: "100px" }}>
                <div style={{ display:"inline-block", position:"relative", marginRight: "10px" }}><b>Collection:</b> {collection}</div> 
                <div style={{ display:"inline-block", position:"absolute", left:"275px",width:"1000px",marginRight: "10px"  }}><b>Description: </b> {generated_captionView}</div>
            </div>
            <Link className='btn-row' to={'/nft/' + id} style={{ display: "inline-block", marginLeft: "5rem" }} >Details</Link>
        </div>

    )
}
export default NftRow
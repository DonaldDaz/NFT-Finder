import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ImageSlider from "../components/ImageSlider"
import { useParams, Link } from "react-router-dom";


const url = "http://127.0.0.1:5000/nftDetails?id=";

const SingleNft = () => {
  const { Id } = useParams();

  const [singleNft, setSingleNft] = useState(null);
  const [similarNfts, setSimilarNfts] = useState([]);
  const [showedNfts, setShowedNfts] = useState([]);
  const [indexes, setIndexes] = useState([])

  const getSingleNft = async () => {
    const response = await fetch(url + Id);
    const data = await response.json();
    setSingleNft(data["nft"]);
    setSimilarNfts(data["similars"])
    setShowedNfts(data["similars"].slice(0,4))
    setIndexes([0,4])
  };

  useEffect(() => {
    getSingleNft();
  }, []);
  if (!singleNft) {
    return <Loading />;
  }

  const { similarityScore, base64Img, category, coco_url, collection, date_captured, file_name,
    file_path, flickr_url, generated_caption, height, id, license,
    original_caption, similarity, width } = singleNft

  const originalCaptionView = original_caption.length > 500? <p>{original_caption.substring(0, 499)} ...</p>:<p>{original_caption}</p>


  return (
    <>
      {singleNft && (
        <div>
          <div className="tab-back">
            <Link to={"/"} className="btn btn-primary">
              back home
            </Link>
          </div  >
          <section className="section nftDetails-section">
            <h2></h2>
            <div className="nftDetails">
              <img src={`data:image/jpeg;base64,${base64Img}`} />
              <div className="nft-info">
                <p>
                  <span className="nftDetails-data">Description :</span>
                  {generated_caption}
                </p>
                <p>
                  <span className="nftDetails-data">Category :</span>
                  {category}
                </p>
                <p>
                  <span className="nftDetails-data">Collection :</span>
                  {collection}
                </p>
                <p>
                  <span className="nftDetails-data">Original Caption :</span>
                  {originalCaptionView}
                </p>
                <p>
                  <span className="nftDetails-data">Size :</span>
                  {height} x {width} Pixels
                </p>
                <p>
                  <span className="nftDetails-data">License Type:</span>
                  {license}
                </p>
              </div>
            </div>
          </section>

          <div className="similar-title">Similar NFTs</div>
          <ImageSlider list={similarNfts} showed={showedNfts} updateShowed={setShowedNfts} 
          indexes={indexes} updateIndexes={setIndexes}/>

        </div>
      )}
    </>
  );
};

export default SingleNft;

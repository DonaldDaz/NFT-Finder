import React from "react";
import Nft from "./Nft";
import NftRow from "./NftRow";
import Loading from "./Loading";
import { useGlobalContext } from "../context";
import { useState, useEffect } from "react";

const NftList = () => {
  const { nfts, isLoading } = useGlobalContext();
  const [detailView, setDetailView] = useState(true)

  const renderCardView = (nfts) => {
    return (
      <div className="nfts-center">
        {nfts.map((nft, index) => {
          return <Nft key={index} nft={nft} />;
        })}
      </div>)
  }

  const renderListView = (nfts) => {
    return (
      <div className="nfts-list">
        {nfts.map((nft, index) => {
          return <NftRow key={index} nft={nft} />;
        })}
      </div>)
  }

  var toShow
  if (detailView) {
    toShow = renderCardView
  } else {
    toShow = renderListView
  }



  if (isLoading === true) {
    return <Loading />;
  }
  if (nfts === null || nfts.length == 0) {
    return (
      <h2 className="section-title">no nfts matched your search criteria</h2>
    )
  }
  return (
    <section className="section">
      <h2 className="section-title">nfts</h2>
      <div className="btn-block-switchView" style={{ display: "inline-block", alignContent: "center" }}>
        <button className={detailView? "btn btn-primary-switchView-selected":"btn btn-primary-switchView"}
          onClick={() => {
            setDetailView(true);
          }}>
          Card View</button>
        <button className={!detailView? "btn btn-primary-switchView-selected":"btn btn-primary-switchView"}
          onClick={() => {
            setDetailView(false);
          }}>
          List View</button>
      </div>
      {toShow(nfts)}
    </section>
  );
};

export default NftList;

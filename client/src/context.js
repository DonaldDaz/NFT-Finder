import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "http://127.0.0.1:5000/nft";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [nfts, setNfts] = useState([]);
  const [nrNft, setNrNft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [nftInput, setNftInput] = useState("");
  const [searchPressed, setSearchPressed] = useState(false);
  const [slider, setSlider] = useState(0);

  const getNewNfts = async () => {
    try {
      console.log(slider)
      console.log(nrNft)
      const response = await fetch(url + "?description="+nftInput+"&similarity="+slider+"&number="+nrNft);
      const data = await response.json();
      // console.log(data.drinks);
      setIsLoading(false);
      setNfts(data.elements);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getNewNfts();
  }, [searchPressed]);


  return (
    <AppContext.Provider
      value={{
        nfts,
        setNftInput,
        isLoading,
        nftInput,
        setSearchPressed,
        searchPressed,
        slider,
        setSlider,
        nrNft,
        setNrNft,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

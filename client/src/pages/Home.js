import React from "react";
import NftList from "../components/NftList";
import SearchForm from "../components/SearchForm";

const Home = () => {
  return (
    <main>
      <SearchForm />
      <NftList />
    </main>
  );
};

export default Home;

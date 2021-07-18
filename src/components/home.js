import React, {useState, useEffect} from "react"
import atmosmed from "../images/atmosmed.png";
import styled from 'styled-components'
import {findDrugs} from "../repository/DrugRepository";
import Scanner from "./scanner";

function Home() {
  const [query, setQuery] = useState("");
  const [drugs, setDrugs] = useState(null);
  const [camera, setCamera] = useState(false);

  const onDetected = result => {
    setQuery(result);
    setCamera(false);
  };

  useEffect(async () => {
    if (!query) {
      setDrugs(null);
      return;
    }
    const drugs = await findDrugs(query);
    setDrugs(drugs);
  }, [query]);

  const cheapest = drugs && drugs.map(d => d.price).reduce((p1, p2) => Math.min(p1, p2), 99999);

  return (
    <SuperContainer>
      <Container>
        <Logo src={atmosmed} alt={"AtmosMed Pharmacy"} onClick={() => setQuery("")}/>
        <div style={{display: "flex", flexDirection: "row"}}>
          <SearchBar value={query} onChange={e => setQuery(e.target.value)}/>
          <BarcodeIcon onClick={() => setCamera(!camera)} active={camera}>!i||!</BarcodeIcon>
        </div>
        {camera && <Scanner onDetected={onDetected} />}
        <DrugsContainer>
          {drugs === null ? (
            <div>Waiting...</div>
          ) : (drugs.length ? (
            drugs.map(drug => (
              <DrugContainer
                key={drug._id}
                onClick={()=> setQuery(drug.genericName.genericName)}
                cheapest={drug.price === cheapest}
              >
                <DrugBrandName>{drug.brandName}</DrugBrandName>
                <DrugDescription>{drug.genericName.genericName} {drug.dosage}</DrugDescription>
                <DrugPrice>Php {drug.price.toFixed(2)}</DrugPrice>
              </DrugContainer>
            ))
          ) : (
            <div>No products found.</div>
          ))}
        </DrugsContainer>
      </Container>
    </SuperContainer>
  );
}

const SuperContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Container = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: space-around;
max-width: 567px;
margin: 8px;
`;

const Logo = styled.img`
border-radius: 8px;
`;

const SearchBar = styled.input`
margin: 16px 0;
padding: 8px;
border: 2px solid #333;
border-radius: 8px;
flex: 1;
`;

const BarcodeIcon = styled.div`
margin: 16px 0;
margin-left: 16px;
padding: 8px;
background-color: black;
color: white;
flex: 0;
border-radius: 8px;
cursor: pointer;

${props => props.active && `
background-color: #00A2FF;
`}
`;

const DrugsContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
flex-wrap: wrap;
`;

const DrugContainer = styled.div`
flex: 1;
margin: 8px;
padding: 32px;
border: 2px solid #333;
border-radius: 8px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
text-align: center;

${props => props.cheapest && `
background-color: #00A2FF;
color: white;
`}
`;

const DrugBrandName = styled.div`
font-size: 2em;
font-weight: bold;
`;

const DrugDescription = styled.div`
font-size: 1em;
`;

const DrugPrice = styled.div`
font-size: 2em;
font-weight: bold;
`;

export default Home;

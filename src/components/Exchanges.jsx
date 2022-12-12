import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { server } from '../index'
import { Button,Container, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from "./ErrorComponent"
function Exchanges() {

  const [exchanges,setExchanges] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [page,setPage] = useState(1);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }
  const btns = new Array(5).fill(1)

  useEffect(() => {
      const fetchExchanges = async() =>{
        try {
          const {data} = await axios.get(`${server}/exchanges?per_page=100&page=${page}`);
          console.log(data);
          setExchanges(data);
          setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
      }
      fetchExchanges();
  },[page]);

  if(error){
    return <ErrorComponent message={"We occured an error while fetching the exchanges Hang on tight while we fix this :)"}/>
  }

  const ExchangeCard = ({name,img,rank,url}) => (
    <a href={url} target={"blank"} >
      <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"} m={"4"} 
      css={
        {
          "&:hover":{
            transform:"scale(1.1)"
          }
        }
      }
      >

        <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchange"} />

        <Heading size={"md"} noOfLines={1} >
          {rank}
        </Heading>

        <Text noOfLines={1}>
          {name}
        </Text>

      </VStack>
    </a>
  );
  
  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? <Loader />:<>
        
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>

          {
            exchanges.map( (i) => (
              <ExchangeCard name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} key={i.id} />
            ) )
          }

        </HStack>

        <HStack w={"full"} overflow={"auto"} p={"8"} justifyContent={"space-evenly"} >
          {
            btns.map((item,index) =>(
              <Button key={index} bgColor={"blackAlpha.900"} color={"whitesmoke"} onClick={ () => changePage(index+1) } >{index+1}</Button>

            ))
          }
        </HStack>
        
        
        </>}
      </Container>
    </>
  )
}

export default Exchanges




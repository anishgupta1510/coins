import { Box, Container,HStack,RadioGroup,Radio, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import {useParams} from 'react-router-dom'
import ErrorComponent from './ErrorComponent';

function CoinDetails() {

  const [coin,setCoin] = useState({});
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [currency,setCurrency] = useState("inr");

  const params = useParams()

  const currencySymbol = currency==="inr"?"₹":"$";

  useEffect(() => {
    const fetchCoin = async() =>{
      try {
        const {data} = await axios.get(`${server}/coins/${params.id}`);
        console.log(data);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
          setLoading(false);
          setError(true);
      }
    }
    fetchCoin();
},[params.id]);

if(error){
  return <ErrorComponent message={"We occured an error while fetching the Coins Hang on tight while we fix this :)"}/>
}


  return (
    <>
    <Container maxW={"container.xl"}>
      {
        loading?<Loader/>:(
          <>
            <Box width={"full"} borderWidth={1}>
              aws
            </Box>



            <RadioGroup value={currency} onChange={setCurrency} p={"6"}>

              <HStack spacing={"10"}>
                <Radio value={"inr"}>INR("₹")</Radio>
                <Radio value={"usd"}>USD("$")</Radio>
              </HStack>

            </RadioGroup>

            <VStack spacing={"4"} padding="16" alignItems={"flex-start"}>

                <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
                  Last updated on {Date().split("G")}
                </Text>

                <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"} ></Image>

                <Stat>

                  <StatLabel>{coin.name}</StatLabel>
                  <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                  <StatHelpText>
                    <StatArrow type={
                      coin.market_data.price_change_percentage_24h>0?"increase":'decrease'
                      } />
                    {coin.market_data.price_change_percentage_24h}%
                  </StatHelpText>

                </Stat>

                <Badge fontSize={"2x1"} bgColor={"blackAlpha.900"} color={"whiteAlpha.900"} >
                    {`#${coin.market_cap_rank}`}
                </Badge>

                <CustomBar high={232} low={40}/>

            </VStack>

          </>
        )
      }
    </Container>
    </>
  )
}

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

export default CoinDetails
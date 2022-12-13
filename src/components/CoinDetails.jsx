import { Box, Container,HStack,RadioGroup,Radio, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import {useParams} from 'react-router-dom'
import ErrorComponent from './ErrorComponent';
import Chart from './Chart.jsx'

function CoinDetails() {

  const [coin,setCoin] = useState({});
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [currency,setCurrency] = useState("inr");
  const [days,setDays] = useState("24h");
  const [chartArray,setChartArray] = useState([]);

  const params = useParams()

  const currencySymbol = currency==="inr"?"₹":"$";

  const btns=["24h","7d","14d","30d","60d","200d","1y","max"];

  const switchChartStats = (key) =>{
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  }

  useEffect(() => {
    const fetchCoin = async() =>{
      try {
        const {data} = await axios.get(`${server}/coins/${params.id}`);
        console.log(data);

        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        console.log(chartData);

        setCoin(data);
        setLoading(false);
        setChartArray(chartData.prices);
      } catch (error) {
          setLoading(false);
          setError(true);
      }
    }
    fetchCoin();
},[params.id,currency,days]);

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
              <Chart arr={chartArray} currency={currencySymbol} days={days} />
            </Box>

            <HStack p={"4"} wrap={"wrap"} >
              {
                btns.map((i) => (
                  <Button key={i} onClick={()=>switchChartStats(i)} >{i}</Button>
                ) )
              }
            </HStack>

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

                <CustomBar high={`${coin.market_data.high_24h[currency]}`} low={`${coin.market_data.high_24h[currency]}`}/>

                <Box>

                      <Item title={"Max Supply"} value={coin.market_data.max_supply} />
                      <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
                      <Item title={"All time low"} value={`${coin.market_data.atl[currency]}`} />
                      <Item title={"All time High"} value={`${coin.market_data.ath[currency]}`} />

                </Box>

            </VStack>

          </>
        )
      }
    </Container>
    </>
  )
}

const Item = ({title,value}) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"} >

    <Text fontFamily={"revert-layer"} fontWeight={"bold"} >{title}</Text>
    <Text>{value}</Text>

  </HStack>
);

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
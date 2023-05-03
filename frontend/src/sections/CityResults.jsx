import { Badge, Box, Center, Flex, Grid, GridItem, Image, Text, Link, } from '@chakra-ui/react'
import {ExternalLinkIcon} from '@chakra-ui/icons'
import React, {useMemo, useState, useRef, useCallback, useEffect} from 'react'
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import { useInstantLayoutTransition } from 'framer-motion';



function Map({ lat, lng, latLngArray }) {
  const center = useMemo(() => ({ lat, lng }), [lat, lng]);
  const [selected, setSelected] = useState(null);

  const mapRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (selected) {
      mapRef.current.panTo(selected);
    }
  }, [selected]);
  console.log("here")
  latLngArray?.forEach((latitude, longitude) => (
  console.log("lat: " + latitude + "long: " + longitude)));
  console.log("here2")
  return (
    <GoogleMap
      zoom={7}
      center={center}
      onLoad={onMapLoad}
      mapContainerClassName="map-container"
    >
      {latLngArray?.map(elt => (
        <Marker
          position={{lat: elt.lat, lng: elt.lng}}
          key={elt.title}
          label={elt.title}
          onClick={()=> {setSelected({lat: elt.lat, lng: elt.lng})}}
        /> 
      ))}
      {/* {selected && <Marker position={selected} />} */}
    </GoogleMap>
  );
}







// const PlacesAutocomplete = ({ setSelected }) => {
    //     const {
        //         ready,
        //         value,
        //         setValue,
        //         suggestions: {status, data},
        //         clearSuggestions
        //     } = usePlacesAutocomplete();
        //     return <Combobox>
        //         <ComboboxInput value =  />
        //     </Combobox>;
        // }
        
export default function CityResults({results}) {
    const [latLngArray, setLatLngArray] = useState([]);

    useEffect(() => {
        const array = results ? results.map(location => ({
            lat: parseFloat(location.latitude),
            lng: parseFloat(location.longitude),
            title: location.title
        })) : [];
        console.log(array)
        setLatLngArray(array);
    }, [results]);
            
    const colors = {
        "sleep": "purple",
        "eat": "orange",
        "other": "gray",
        "see": "green",
        "drink": "blue"
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDWfYamWnuZZy7ioCmHxgnH82XxLNUvR3A',
        libraries: ["places"],
    });

    if (!isLoaded || results == null) return (<div><center><b>Loading...</b></center></div>) 
  return (
    <div>
        {latLngArray?.length > 0 && <Map lat={40.6446} lng={-73.7858} latLngArray={latLngArray}/>}
        <br/>
        <Center>
        <Grid templateColumns='repeat(4, 1fr)' gap={6} maxW={'80%'}>
            {
                results.map(res => {
                    return <GridItem p="5" maxW="320px" borderWidth="1px">
                        {/* <Image borderRadius="md" src="https://bit.ly/2k1H1t6" /> */}
                        <Flex align="baseline" mt={2}>
                        <Badge colorScheme={colors[res.type]}>{res.type}</Badge>
                        <Text
                            ml={2}
                            textTransform="uppercase"
                            fontSize="sm"
                            fontWeight="bold"
                            color={`${colors[res.type]}.400`}
                        >
                            {res.article}
                        </Text>
                        </Flex>
                        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                        {res.title}
                        </Text>
                        <Text mt={2}>{res.description}</Text>
                        <Flex mt={2} align="center">
                        {/* <Box as={MdStar} color="orange.400" /> */}
                        <Text ml={1} fontSize="sm">
                            <b>4.84</b> (190)
                        </Text>
                        </Flex>
                        {
                            res.url && <Link href={res.url} color="teal" isExternal>
                                Visit page <ExternalLinkIcon mx='2px' />
                            </Link>
                        }
                    </GridItem>
                })
            }
        </Grid>

        </Center>
    </div>
  )
}


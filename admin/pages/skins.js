import {
  Input,
  Center,
  Text,
  Textarea,
  Button,
  Image,
  Box,
  Flex,
  SimpleGrid,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Head from "next/head";

export default function Skins() {
  const sprits = ["identicon", "initials", "bottts", "jdenticon", "gridy"];
  const [skins, setSkins] = useState([]);
  const [values, setValues] = useState({
    name: "",
    desc: "",
    url: "",
  });

  useEffect(() => {
    setValues({ ...values, url: getRandomSkin() });
  }, []);

  const toast = useToast();

  const handleOnChange = (e) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: [e.target.value],
      };
    });
  };

  // const handleImgChange = (e) => {
  //   if (!e.target.files[0]) {
  //     toast({
  //       title: "Please Select a Image!",
  //       status: "error",
  //     });
  //     return;
  //   }
  //   setValues((prevValues) => {
  //     return {
  //       ...prevValues,
  //       file: e.target.files[0],
  //       image: URL.createObjectURL(e.target.files[0]),
  //     };
  //   });
  // };

  const getRandomSkin = () => {
    let seed = Math.floor(Math.random() * 1000000000000) + 1;
    let sprit = Math.floor(Math.random() * (sprits.length - 1));

    return `https://avatars.dicebear.com/api/${sprits[sprit]}/${seed}.svg`;
  };

  const handleShuffle = () => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        url: getRandomSkin(),
      };
    });
  };
  useEffect(() => console.log(values), [values]);

  const handleAdd = () => {
    if (!values.name || !values.desc || !values.url) {
      toast({
        title: "Please fill all the Details!",
        status: "error",
      });
      return;
    }
    setSkins([...skins, values]);
    setValues({
      name: "",
      desc: "",
      url: getRandomSkin(),
    });
  };

  return (
    <>
      <Head>
        <title>Add Skins</title>
      </Head>
      {/* Skin add part */}
      <Center marginBottom="50px" gridGap="5" flexDirection="column">
        <Text fontSize="2xl" fontWeight="bold">
          Add Skins
        </Text>
        <Center w="80%" gridGap="5" flexDirection="column">
          <Input
            placeholder="Skin Name"
            value={values.name}
            name="name"
            onChange={handleOnChange}
          />
          <Textarea
            resize="none"
            placeholder="Skin Description"
            name="desc"
            value={values.desc}
            onChange={handleOnChange}
          />
          <Flex w="100%">
            <Input
              placeholder="Skin Image"
              name="url"
              value={values.url}
              onChange={handleOnChange}
            />
            <Button onClick={handleShuffle}>Shuffle</Button>
          </Flex>
          <Image src={values.url} borderRadius="full" height="200px" />
          <Button onClick={handleAdd}>Add Skin</Button>
        </Center>
      </Center>
      {/* Skin list part */}
      <Flex
        bg="whatsapp.100"
        minH="100vh"
        alignItems="center"
        flexDirection="column"
        gridGap="10"
        overflowY="scroll"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Skins List
        </Text>
        <SimpleGrid w="80%" columns={[1, 1, 2, 3]} spacing="10">
          {skins.map((skin, key) => (
            <Center
              flexDirection="column"
              key={key}
              borderRadius="10px"
              bg="gray.100"
              p="10px"
            >
              <Image src={skin.url} borderRadius="full" />
              <Text textAlign="center" fontSize="xl" fontWeight="bold">
                {skin.name}
              </Text>
              <Text textAlign="center" fontSize="xl" fontWeight="bold">
                {skin.desc}
              </Text>
            </Center>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
}

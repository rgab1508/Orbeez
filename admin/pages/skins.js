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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Head from "next/head";

export default function Skins() {
  const [skins, setSkins] = useState([]);
  const [values, setValues] = useState({
    name: "",
    desc: "",
    file: null,
    url: "",
  });

  const toast = useToast();

  const handleOnChange = (e) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: [e.target.value],
      };
    });
  };

  const handleImgChange = (e) => {
    if (!e.target.files[0]) {
      toast({
        title: "Please Select a Image!",
        status: "error",
      });
      return;
    }
    setValues((prevValues) => {
      return {
        ...prevValues,
        file: e.target.files[0],
        image: URL.createObjectURL(e.target.files[0]),
      };
    });
  };

  const handleAdd = () => {
    if (!values.name || !values.desc || !values.file) {
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
      file: null,
      url: "",
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
          <Input
            type="file"
            placeholder="Skin Image"
            name="file"
            onChange={handleImgChange}
          />
          <Image src={values.image} borderRadius="full" width="200px" />
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
              <Image src={skin.image} borderRadius="full" />
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

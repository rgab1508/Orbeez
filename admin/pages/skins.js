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
} from "@chakra-ui/react";
import Head from "next/head";

export default function Skins() {
  const skins = [
    {
      name: "Skin1",
      image: "https://via.placeholder.com/200",
      desc: "This is a skin",
    },
    {
      name: "Skin1",
      image: "https://via.placeholder.com/200",
      desc: "This is a skin",
    },
    {
      name: "Skin1",
      image: "https://via.placeholder.com/200",
      desc: "This is a skin",
    },
    {
      name: "Skin1",
      image: "https://via.placeholder.com/200",
      desc: "This is a skin",
    },
    {
      name: "Skin1",
      image: "https://via.placeholder.com/200",
      desc: "This is a skin",
    },
  ];

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
          <Input placeholder="Skin Name" />
          <Textarea resize="none" placeholder="Skin Description" />
          <Input type="file" placeholder="Skin Image" />
          <Image src="https://via.placeholder.com/200" borderRadius="full" />
          <Button>Add Skin</Button>
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

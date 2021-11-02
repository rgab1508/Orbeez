import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Text,
  Box,
  CircularProgress,
  Spinner,
  Table,
  Thead,
  Th,
  Td,
  Tr,
  Tbody,
  Button,
} from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/navbar/Sidebar";
import { useEffect, useState } from "react";
import Minimap from "../components/Minimap";

export default function Home() {
  const [lobbies, setLobbies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uiState, setUiState] = useState("LIST");
  const [selectedLobby, setSelectedLobby] = useState(null);

  useEffect(() => {
    setLobbies([
      {
        name: "Bruh",
        id: "1",
        players: [
          {
            id: "1",
            name: "Abhishek",
            mass: 50,
            x: 0.5,
            y: 0.2,
          },
          {
            id: "2",

            name: "Aditya",
            mass: 60,
            x: 0.3,
            y: 0.7,
          },
          {
            id: "3",

            name: "Gregory",
            mass: 20,
            x: 0.5,
            y: 0.5,
          },
          {
            id: "3",

            name: "Gabriel",
            mass: 20,
            x: 0.3,
            y: 0.1,
          },
        ],
      },
      {
        name: "Asia",
        id: "2",
        players: [
          {
            id: "1",
            level: 50,

            name: "Bruh 1",
            mass: 500,
            x: 0.5,
            y: 0.2,
          },
          {
            id: "2",
            level: 50,

            name: "Bruh 1",
            mass: 60,
            x: 0.3,
            y: 0.7,
          },
          {
            id: "3",
            level: 50,
            name: "Bruh 1",
            mass: 20,
            x: 0.5,
            y: 0.5,
          },
        ],
      },
    ]);
    setIsLoading(false);
  }, []);

  const onBack = () => {
    setUiState("LIST");
    setSelectedLobby(null);
  };

  const handleBan = (pid) => {
    // do ban
  };

  const handleKick = (pid) => {
    // do kick
  };

  return (
    <>
      <Head>
        <title>Orbeez | Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex h="100%" flexDirection="column">
        {isLoading ? (
          <Flex alignItems="center" justifyContent="center" h="100%">
            <CircularProgress isIndeterminate color="green.300" />{" "}
          </Flex>
        ) : (
          <Flex w="80%" mx="auto" flexDir={"column"}>
            {uiState == "LIST" && (
              <>
                <Text
                  textAlign="center"
                  my={5}
                  textTransform="uppercase"
                  fontSize="xx-large"
                  fontWeight="bold"
                >
                  Live Lobbbies
                </Text>
                {lobbies.map((l) => {
                  return (
                    <Flex
                      my={7}
                      borderRadius="xl"
                      bgColor="red.50"
                      key={l.id}
                      w="100%"
                      height="400px"
                      onClick={() => {
                        setUiState("LOBBY");
                        setSelectedLobby(l);
                      }}
                      _hover={{
                        cursor: "pointer",
                        boxShadow: "0px 0px 4px 0px #ffa8a8",
                      }}
                      position="relative"
                    >
                      <Text position="absolute" top="1" right="10">
                        #{l.id}
                      </Text>
                      <Text
                        textTransform="uppercase"
                        position="absolute"
                        top="1"
                        left="7"
                      >
                        {l.name}
                      </Text>
                      <Flex flexGrow="1">
                        <Minimap isMain lobby={l} />
                      </Flex>
                    </Flex>
                  );
                })}
              </>
            )}
            {uiState == "LOBBY" && (
              <>
                <Flex flexDir="column">
                  <Box my={3}>
                    <Button onClick={onBack}>Back</Button>
                  </Box>
                  <Text
                    textAlign="center"
                    my={5}
                    textTransform="uppercase"
                    fontSize="xx-large"
                    fontWeight="bold"
                  >
                    Lobby: {selectedLobby.name}
                  </Text>
                  <Flex>
                    <Flex
                      gridGap={3}
                      flex="0.4"
                      fontSize="x-large"
                      flexDir="column"
                      textAlign="center"
                    >
                      <Text>
                        <Box as="span" fontWeight="bold">
                          Lobby ID:{" "}
                        </Box>
                        {selectedLobby.id}
                      </Text>
                      <Text>
                        <Box as="span" fontWeight="bold">
                          No Of Players:{" "}
                        </Box>
                        {selectedLobby.players.length}
                      </Text>
                    </Flex>
                    <Flex
                      flex="0.6"
                      borderRadius="xl"
                      bgColor="red.50"
                      w="100%"
                      height="230px"
                    >
                      <Minimap lobby={selectedLobby} />
                    </Flex>
                  </Flex>

                  <Table w="90%" mx="auto" mt={10}>
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Level</Th>
                        <Th>Mass</Th>
                        <Th></Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedLobby.players.map((p) => {
                        return (
                          <Tr
                            key={p.id}
                            bgColor={p.isBanned ? "red" : "white"}
                            color={p.isBanned ? "white" : "black"}
                          >
                            <Td>{p.id}</Td>
                            <Td>{p.name}</Td>
                            <Td>{p.level}</Td>
                            <Td>{p.mass}</Td>

                            <Td>
                              <Button
                                colorScheme="blue"
                                onClick={() => handleKick(p.id)}
                              >
                                Kick
                              </Button>
                            </Td>
                            <Td>
                              <Button
                                colorScheme="red"
                                onClick={() => handleBan(p.id)}
                              >
                                Ban
                              </Button>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </Flex>
              </>
            )}
          </Flex>
        )}
      </Flex>
    </>
  );
}

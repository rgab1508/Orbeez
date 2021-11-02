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
  Tooltip,
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
  const IPS = [
    "127.0.0.1",
    "10.0.0.1",
    "488.123.12.111",
    "192.168.1.1",
    "192.168.255.255",
    "172.16.0.0",
    "10.255.255.255",
  ];

  useEffect(() => {
    fetch("/api/lobby")
      .then((res) => res.json())
      .then((res) => {
        res.map((l) => {
          l.players.map((p) => {
            let ipx = Math.floor(Math.random() * (IPS.length - 1));
            p.ip = IPS[ipx];
            return p;
          });
          return l;
        });
        setLobbies(res);
      });

    setIsLoading(false);
  }, []);

  const onBack = () => {
    setUiState("LIST");
    setSelectedLobby(null);
  };

  const handleBan = async (p) => {
    // do ban

    await fetch("/api/ips/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip: p.ip,
        isBanned: true,
        level: p.level,
      }),
    });
    handleKick(p);
  };

  const handleKick = async (p) => {
    // do kick
    await fetch("/api/players/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player_id: p.player_id,
      }),
    }).then((res) => {
      setLobbies((prevL) =>
        prevL.map((l) => {
          if (l.lobby_id != p.lobby_id) return l;
          l.players.filter((pl) => pl.player_id != p.player_id);
          return l;
        })
      );
    });
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
                      key={l.lobby_id}
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
                      <Text position="absolute" top="1" right="15">
                        #{l.lobby_id}
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
                          <Tooltip label={p.ip}>
                            <Tr
                              key={p.player_id}
                              bgColor={p.isBanned ? "red" : "white"}
                              color={p.isBanned ? "white" : "black"}
                            >
                              <Td>{p.player_id}</Td>
                              <Td>{p.name}</Td>
                              <Td>{p.level}</Td>
                              <Td>{p.mass}</Td>

                              <Td>
                                <Button
                                  colorScheme="blue"
                                  onClick={() => handleKick(p)}
                                >
                                  Kick
                                </Button>
                              </Td>
                              <Td>
                                <Button
                                  colorScheme="red"
                                  onClick={() => handleBan(p)}
                                >
                                  Ban
                                </Button>
                              </Td>
                            </Tr>
                          </Tooltip>
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

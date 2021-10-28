import {
  Flex,
  Table,
  Thead,
  Th,
  Td,
  Tr,
  Text,
  Tbody,
  Menu,
  MenuButton,
  MenuIcon,
  MenuItem,
  MenuList,
  Switch,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

export default function BanList() {
  const [ips, setIps] = useState([]);
  const [values, setValues] = useState({
    ip: "",
    isBanned: false,
    level: 0,
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

  const handleAdd = () => {
    if (!values.ip) {
      toast({
        title: "Please add a valid IP Address",
        status: "error",
      });
      return;
    }
    if (
      !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        values.ip
      )
    ) {
      toast({
        title: "Please add a valid IP Address",
        status: "error",
      });
      return;
    }
    setIps([...ips, values]);
    setValues({
      ip: "",
      isBanned: false,
      level: 0,
    });
  };

  const updateBan = (e, ip) => {
    setIps((prevIps) => {
      return prevIps.map((i) => {
        if (i.ip != ip) return i;
        i.isBanned = e.target.checked;
        return i;
      });
    });
  };

  const handleDelete = (ip) => {
    setIps((prevIps) => {
      return prevIps.filter((i) => i.ip != ip);
    });
  };

  return (
    <>
      <Head>
        <title>Ban List</title>
      </Head>
      <Flex flexDirection="column" p="5px" mt={10}>
        <Text fontWeight="bold" fontSize="2xl" textAlign="center">
          BAN LIST
        </Text>
        <Flex alignItems="center" justifyContent="center" my={10}>
          <Flex w="60%" gridGap={5}>
            <Input
              placeholder="IP Address (eg: 192.168.0.1)"
              name="ip"
              onChange={handleOnChange}
              value={values.ip}
            />
            <Input
              placeholder="Level"
              name="level"
              value={value.level}
              onChange={handleOnChange}
            />
            <Button colorScheme="blue" onClick={handleAdd}>
              Add
            </Button>
          </Flex>
        </Flex>
        <Table w="90%" mx="auto" mt={10}>
          <Thead>
            <Tr>
              <Th>IP</Th>
              <Th>Level</Th>
              <Th>Banned?</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {ips.map((i) => {
              return (
                <Tr
                  key={i.ip}
                  bgColor={i.isBanned ? "red" : "white"}
                  color={i.isBanned ? "white" : "black"}
                >
                  <Td>{i.ip}</Td>
                  <Td>{i.level}</Td>
                  <Td>
                    <Switch
                      isChecked={i.isBanned}
                      onChange={(e) => updateBan(e, i.ip)}
                    />
                  </Td>
                  <Td>
                    <Button
                      colorScheme="blackAlpha"
                      onClick={() => handleDelete(i.ip)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

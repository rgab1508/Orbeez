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
import { useEffect, useState } from "react";

export default function BanList() {
  const [refresh, setRefresh] = useState(false);
  const [ips, setIps] = useState([]);
  const [values, setValues] = useState({
    ip: "",
    isbanned: false,
    level: 0,
  });

  const toast = useToast();

  useEffect(() => {
    fetch("/api/ips")
      .then((res) => res.json())
      .then((res) => {
        setIps(res);
      });
  }, [refresh])

  const handleOnChange = (e) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAdd = async () => {
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
    await fetch("/api/ips/add", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ip: values.ip, isbanned: values.isbanned, level: values.level })
    });
    setIps([...ips, values]);
    setValues({
      ip: "",
      isbanned: false,
      level: 0,
    });
  };

  const updateBan = async (e, ip) => {
    const _ip = ips.filter((i) => i.ip === ip)[0];
    await fetch("/api/ips/edit", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ..._ip, isbanned: e.target.checked })
    });
    setIps((prevIps) => {
      return prevIps.map((i) => {
        if (i.ip != ip) return i;
        i.isbanned = e.target.checked;
        return i;
      });
    });
  };

  const handleDelete = async (ip) => {
    await fetch("/api/ips/delete", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ip })
    });
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
              value={values.level}
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
                  bgColor={i.isbanned ? "red" : "white"}
                  color={i.isbanned ? "white" : "black"}
                >
                  <Td>{i.ip}</Td>
                  <Td>{i.level}</Td>
                  <Td>
                    <Switch
                      isChecked={i.isbanned}
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

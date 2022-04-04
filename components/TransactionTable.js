import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const TransactionTable = ({allRounds}) => {
  return (
    <>
      {allRounds && allRounds.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Previous Rounds Results</TableCaption>
            <Thead>
              <Tr>
                <Th>Round ID</Th>
                <Th>Txn Hash</Th>
                <Th>Player</Th>
                <Th>Amount</Th>
                <Th>Choice</Th>
                <Th>Result</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allRounds.slice(0).reverse().map((round, i) => (
                <Tr key={i} color={round.player2BetChoice !== round.winningPosition ? "red.400" : "green.400"}>
                  <Td>{i+1}</Td>
                  <Td textDecoration={"underline"} cursor={"pointer"} onClick={() => window.open(`https://testnet.bscscan.com/tx/${round.txnHash}`, "_blank")}>{round.txnHash.substring(0, 7) + " ... " + round.txnHash.slice(-6)}</Td>
                  <Td>{round.player2Address.substring(0, 5) + " ... " + round.player2Address.slice(-4)}</Td>
                  <Td>{round.player2BetAmount}</Td>
                  <Td>{round.player2BetChoice}</Td>
                  <Td>{round.winningPosition}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        "No result to Show"
      )}
    </>
  );
};

export default TransactionTable;

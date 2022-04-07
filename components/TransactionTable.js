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

  function openLink(_txnHash){
    window.open(`https://testnet.bscscan.com/tx/`+_txnHash);
  }
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
                  <Td cursor={"pointer"} onClick={() => openLink(round.txnHash)}>{round.txnHash}</Td>
                  <Td>{round.player2Address}</Td>
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

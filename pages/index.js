import { ethers } from "ethers";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const startPayment = async ({ ether, addr }) => {
  try {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => console.log(accounts))
      .catch((error) => console.error(error));
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const transaction = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });
    console.log({ ether, addr });
    console.log("transaction", transaction);
    alert('Success!!');
  } catch (err) {
    console.log(err.message);
    alert(err.message);
  }
};

export default function App() {
  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await startPayment({
      ether: data.get("ether"),
      addr: data.get("addr"),
    });
  };

  return (
    <form onSubmit={submit}>
      <Container className="p-5">
        <Row className="justify-content-center text-center">
          <Col xs={12} md={6}>
            <h1>Send ETH</h1>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Recipient Address"
                aria-label="Recipient Address"
                aria-describedby="basic-addon1"
                name="addr"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Amount in ETH"
                aria-label="Amount in ETH"
                aria-describedby="basic-addon1"
                name="ether"
              />
            </InputGroup>

            <Button variant="primary" type="submit">
              Send
            </Button>
          </Col>
        </Row>
      </Container>
    </form>
  );
}

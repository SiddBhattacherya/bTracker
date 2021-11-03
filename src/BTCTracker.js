import React from 'react';

import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Navbar, Row, Card, Button } from 'react-bootstrap';
import axios from "axios"

export default class BTCTracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinbase_sell: 0.00,
      
      blockchain_sell: 0.0,

      coinbase_btc: 0.0,

      blockchain_btc: 0.0
    }
  }

  componentDidMount() {
    this.fetch();
  }


  async fetch(){
      
        let coinbaseres = await axios.get("https://api.coinbase.com/v2/prices/BTC-USD/buy");
        let coinbaseres_sell = await axios.get("https://api.coinbase.com/v2/prices/BTC-USD/sell");
        console.log(coinbaseres);

        let blockchainres = await axios.get("https://blockchain.info/ticker");
        console.log(blockchainres);

        this.setState({coinbase_btc: coinbaseres.data.data.amount});
        this.setState({coinbase_sell: coinbaseres_sell.data.data.amount});

        this.setState({blockchain_btc: blockchainres.data.USD.buy});
        this.setState({blockchain_sell: blockchainres.data.USD.sell})

       
  }

  render() {
    return (
      <div>
           <Navbar bg="dark">
                <Container>
                    <h1 style={{color:"white"}}>BITCOIN TRACKER</h1>
                </Container>
            </Navbar>

            <Container>
                <Row>
                    <Col>

                    <Card style={{ width: '18rem' }}>
                       
                       <Card.Body>
                           <Card.Title>BlockChain:</Card.Title>
                           <Card.Text>

                               <text> 
                                   <p>

                                   BUY PRICE:
                                   <text>  {this.state.blockchain_btc}</text>
                                   </p>
                                    <p>
                                   SELL PRICE:
                                   <text>  {this.state.blockchain_sell}</text>
                                   </p>

                                  
                        
                               </text>
      
                           </Card.Text>

                           {this.state.blockchain_sell - this.state.blockchain_btc > this.state.coinbase_sell - this.state.coinbase_btc &&
                              <Button variant="primary">Recommended</Button>
                            }
                           
                       </Card.Body>
                       </Card>
                    
                    </Col>
                    <Col>
                    
                    <Card style={{ width: '18rem' }}>
                       
                        <Card.Body>
                            <Card.Title>COINBASE:</Card.Title>
                            <Card.Text>

                                <text> 
                                    <p>

                                    BUY PRICE:  
                                    <text>  {this.state.coinbase_btc}</text>
                                    </p>

                                    <p>

                                    SELL PRICE:  
                                    <text>  {this.state.coinbase_sell}</text>
                                    </p>

                              
                                </text>
                
                            </Card.Text>
                            {this.state.blockchain_sell - this.state.blockchain_btc < this.state.coinbase_sell - this.state.coinbase_btc &&
                              <Button variant="primary">Recommended</Button>
                            }
                            
                           
                        </Card.Body>
                        </Card>
              
                    </Col>
                </Row>

            </Container>

      </div>
    );
  }
}
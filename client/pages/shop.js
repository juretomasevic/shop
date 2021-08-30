import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../context";
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useRouter } from "next/router";

const Shop = () => {
  const [products, setProducts] = useState();
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/shop");

      setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Row xs={1} sm={2} lg={3}>
        {products &&
          products.map((product) => (
            <div key={product.id} className="mt-3">
              <Col key={product.id} className="mt-4 h-100">
                <Card className="h-100">
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div className="mb-4">
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                    </div>
                    <div className="w-100">
                      <Card.Title>{product.price} HRK</Card.Title>
                      <Button
                        className="add-cart"
                        onClick={() =>
                          dispatch({
                            type: "CART_ADD",
                            payload: product,
                          })
                        }
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          ))}
      </Row>
    </Container>
  );
};
export default Shop;

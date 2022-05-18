import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;

function Home() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const onFinish = (values) => {
    setLoading(true);
    const { word } = values;
    axios
      .post(`https://api.color.pizza/v1/names/?name=${word}`)
      .then((res) => {
        setLoading(false);
        setData(res.data.colors);
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ margin: "40px 100px" }}>
      <Title level={1} style={{ textAlign: "center" }}>
        Fleet Studio Assesment
      </Title>
      <Title level={3}>Enter the color</Title>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Row gutter={16}>
          <Col>
            <Form.Item
              name="word"
              rules={[{ required: true, message: "Please enter the word!" }]}
            >
              <Input style={{ width: 400, height: 48 }} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: 220, height: 48 }}
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Title level={3}>Results</Title>
      {loading && "Loading"}

      {!loading && (
        <Row gutter={[16, 16]}>
          {data && data.length > 0
            ? data.map((item) => {
                return (
                  <Col span>
                    <div
                      style={{
                        background: `${item.hex}`,
                        width: 300,
                        height: 300,
                        borderRadius: 5,
                        padding: 8,
                      }}
                      key={item.hex}
                    >
                      <Title level={5}>{item.hex}</Title>
                    </div>
                  </Col>
                );
              })
            : ""}
          {data && data.length === 0 && (
            <Title level={5}>Invalid Input. Please try other word</Title>
          )}
        </Row>
      )}
    </div>
  );
}

export default Home;

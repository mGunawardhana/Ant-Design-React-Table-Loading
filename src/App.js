import "./App.css";
import React, { ChangeEvent, useEffect, useState } from "react";

import {
  Image,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Upload,
  Button,
  Radio,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleFilled,
  SearchOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;
function App() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [dataSource, setCustomerList] = useState([]);

  const getAllCustomers = async () => {
    try {
      const response = await axios.get("employees");
      const newStudent = {
        // Add the properties of a new student object here
        customer_code: response.data.customer_code,
        customer_type: "",
        company_name: "",
        mobile_number: "",
        country: "",
        city: "",
        gender: "",
      };
      const customers = response.data.customers;

      setCustomerList(response.data.customers);

      console.log(customers);
    } catch (error) {
      console.log(error);
    }
  };

  // const onAddStudent = () => {

  //   setCustomerList((prev) => [...prev, newStudent]);

  //   // const randomNumber = parseInt(Math.random() * 1000);
  //   // const newStudent = {
  //   //   id: randomNumber,
  //   //   name: "Name " + randomNumber,
  //   //   email: randomNumber + "@gmail.com",
  //   //   address: "Address " + randomNumber,
  //   // };
  //   // setCustomerList((pre) => {
  //   //   return [...pre, newStudent];
  //   // });
  // };

  useEffect(() => {
    getAllCustomers().then((r) => {
      console.log(dataSource);
    });
  }, []);
  const columns = [
    {
      key: "customer_code",
      title: "Code",
      dataIndex: "customer_code",
    },
    {
      key: "customer_type",
      title: "Type",
      dataIndex: "customer_type",
    },
    {
      key: "company_name",
      title: "Name",
      dataIndex: "company_name",
    },
    {
      key: "mobile_number",
      title: "Mobile",
      dataIndex: "mobile_number",
    },
    {
      key: "country",
      title: "Country",
      dataIndex: "country",
    },
    {
      key: "city",
      title: "City",
      dataIndex: "city",
    },
    {
      key: "",
      title: "Gender",
      dataIndex: "gender",
    },
    {
      key: "8",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EyeOutlined
              onClick={() => {
                // onEditStudent(record);
              }}
              style={{ color: "green", marginLeft: 12 }}
            />
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
              style={{ marginLeft: 12 }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const columns2 = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "designation",
      title: "Designation",
      dataIndex: "designation",
    },
    {
      key: "mobile",
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "8",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                // onEditStudent(record);
              }}
              style={{ marginLeft: 12 }}
            />
            <DeleteOutlined
              onClick={() => {
                // onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setCustomerList((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  return (
    <div className="App">
      <header className="App-header" style={{ color: "#fff" }}>
        {/* <Button onClick={onAddStudent}>Add a new Student</Button> */}
        <div style={{ display: "flex", marginBottom: 3 }}>
          <Input
            placeholder="search"
            suffix={<SearchOutlined />}
            style={{ borderRadius: 10, marginBottom: 3 }}
          />
          <PlusCircleFilled
            onClick={onEditStudent}
            style={{ color: "green", marginLeft: 470, marginBottom: 3 }}
          />
          <VerticalAlignBottomOutlined
            style={{ color: "green", marginLeft: 5 }}
          />
        </div>
        <Table
          columns={columns}
          pagination={true}
          dataSource={dataSource}
        ></Table>

        {/* //TODO Model starting ----------------------------------------------------------*/}
        <Modal
          title="CUSTOMER DETAILS"
          visible={isEditing}
          okText="Save"
          onCancel={resetEditing}
          width={900}
          height={800}
          onOk={() => {
            setCustomerList((prev) => {
              return prev.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
          okButtonProps={{
            style: { backgroundColor: "green", borderColor: "green" },
          }}
        >
          <Divider />
          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            onFinishFailed={(error) => {
              console.log({ error });
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Row gutter={[24, 16]} justify="center" align="middle">
              <Col span={16}>
                <Row
                  gutter={[18, 0]}
                  justify="center"
                  align="middle"
                  style={{ marginTop: -20 }}
                >
                  <Col span={8}>
                    {/*<label>Code:*</label>*/}
                    <Form.Item
                      label="Code"
                      name="code"
                      gutter={[0, 0]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the code",
                        },
                        { whitespace: false },
                      ]}
                      hasFeedback
                      labelAlign="top"
                    >
                      <Input placeholder="Type the code" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    {/*<label>Reference Name</label>*/}
                    <Form.Item
                      label="Reference Number"
                      name="reference_number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the reference number",
                        },
                        { whitespace: false },
                      ]}
                      hasFeedback
                    >
                      <Input placeholder="Reference Number" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    {/*<label>Customer Type:*</label>*/}
                    <Form.Item
                      name="customer_type"
                      label="Customer Type"
                      rules={[
                        {
                          required: true,
                          message: "Please select the customer type",
                        },
                      ]}
                      hasFeedback
                    >
                      <Select placeholder="Select customer type">
                        <Select.Option value="type1">Cash Pay</Select.Option>
                        <Select.Option value="type2">Card Pay</Select.Option>
                        <Select.Option value="type3">Crypto pay</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8} style={{ marginTop: -20, marginBottom: -20 }}>
                    {/*<label>Customer Name: *</label>*/}
                    <Form.Item
                      name="customer_name"
                      label="Customer Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the customer name",
                        },
                        { whitespace: false },
                      ]}
                      hasFeedback
                    >
                      <Input placeholder="Type the customer name" />
                    </Form.Item>
                  </Col>
                  <Col span={8} style={{ marginTop: -20, marginBottom: -20 }}>
                    {/*<label>Company Name</label>*/}
                    <Form.Item
                      name="company_name"
                      label="Company Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the company name",
                        },
                        { whitespace: false },
                      ]}
                      hasFeedback
                    >
                      <Input placeholder="Company Name" />
                    </Form.Item>
                  </Col>
                  <Col span={8} style={{ marginTop: -20, marginBottom: -20 }}>
                    {/*<label>NIC/Passport/Driver's Licence: *</label>*/}
                    <Form.Item
                      name="idType"
                      label="NIC/Passport"
                      height={100}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the ID type",
                        },
                        { whitespace: false },
                      ]}
                      hasFeedback
                    >
                      <Input placeholder="ID Type" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Image
                  height={100}
                  width={150}
                  style={{ borderRadius: 5, marginLeft: 110 }}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </Col>
              {/* //TODO starting second raw --------------------------*/}
              <Col
                span={12}
                style={{ alignItems: "left", content: "left", marginTop: 0 }}
              >
                <Form.Item
                  name="billing_address"
                  label="Billing Address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the company name",
                    },
                    { whitespace: false },
                  ]}
                  hasFeedback
                >
                  <Input.TextArea
                    placeholder="Billing Address"
                    autoSize={{ minRows: 5, maxRows: 5 }}
                  />
                </Form.Item>
              </Col>
              <Row span={24}>
                <Col
                  span={11}
                  style={{ marginTop: -80, marginBottom: -20, marginRight: 18 }}
                >
                  {/*<label>Customer Name: *</label>*/}
                  <Form.Item
                    name="mobile_number"
                    label="Mobile Number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the customer name",
                      },
                      { whitespace: false },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Type the customer name" />
                  </Form.Item>
                </Col>
                <Col span={11} style={{ marginTop: -80, marginBottom: -20 }}>
                  {/*<label>Customer Name: *</label>*/}
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the customer name",
                      },
                      { whitespace: false },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Type the customer name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row span={24} style={{ marginLeft: 440, marginTop: -40 }}>
                <Col
                  span={11}
                  style={{ marginTop: -85, marginBottom: -20, marginRight: 18 }}
                >
                  {/*<label>Customer Name: *</label>*/}
                  <Form.Item
                    name="country"
                    label="Country"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the customer name",
                      },
                      { whitespace: false },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Type the customer name" />
                  </Form.Item>
                </Col>
                <Col span={11} style={{ marginTop: -85, marginBottom: -20 }}>
                  {/*<label>Customer Name: *</label>*/}
                  <Form.Item
                    name="city"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the customer name",
                      },
                      { whitespace: false },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Type the customer name" />
                  </Form.Item>
                </Col>
              </Row>
              <Col span={12} style={{ alignItems: "start" }}>
                <Upload.Dragger
                  multiple
                  listType="picture"
                  action={"http://localhost:3000"}
                >
                  Drag file here or
                  <br />
                  <Button>Click Upload</Button>
                </Upload.Dragger>
              </Col>
              <Col span={12}>
                <Form.Item label="Gender" name="radiogroup">
                  <Radio.Group defaultValue={1}>
                    <Radio style={{ marginRight: 12 }} value={1}>
                      Male
                    </Radio>
                    <Radio value={2}>Female</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Divider />
              <Row
                gutter={[24, 0]}
                justify="center"
                align="middle"
                style={{ marginTop: -20 }}
              >
                {" "}
                <Col span={5}>
                  {/*<label>Code:*</label>*/}
                  <Form.Item
                    label="Name"
                    name="name"
                    gutter={[0, 0]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the code",
                      },
                      { whitespace: false },
                    ]}
                    hasFeedback
                    labelAlign="top"
                  >
                    <Input placeholder="Type the code" />
                  </Form.Item>
                </Col>{" "}
                <Col span={5}>
                  {/*<label>Code:*</label>*/}
                  <Form.Item
                    label="Designation"
                    name="designation"
                    gutter={[0, 0]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the code",
                      },
                      { whitespace: false },
                    ]}
                    hasFeedback
                    labelAlign="top"
                  >
                    <Input placeholder="Type the code" />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  {/*<label>Code:*</label>*/}
                  <Form.Item
                    label="Mobile"
                    name="mobile"
                    gutter={[0, 0]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the code",
                      },
                      { whitespace: false },
                    ]}
                    hasFeedback
                    labelAlign="top"
                  >
                    <Input placeholder="Type the code" />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  {/*<label>Code:*</label>*/}
                  <Form.Item
                    label="Email"
                    name="email"
                    gutter={[0, 0]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the code",
                      },
                      { whitespace: false },
                    ]}
                    hasFeedback
                    labelAlign="top"
                  >
                    <Input placeholder="Type the code" />
                  </Form.Item>
                </Col>
                <Button type="primary">Add</Button>
                <Row
                  gutter={[24, 0]}
                  justify="center"
                  align="middle"
                  style={{ marginTop: -20 }}
                >
                  <Col span={24}>
                    <Table
                      columns={columns2}
                      pagination={true}
                      dataSource={dataSource}
                      style={{ width: "100%" }}
                    ></Table>
                  </Col>
                </Row>
              </Row>
            </Row>
          </Form>
        </Modal>
      </header>
    </div>
  );
}

export default App;

import "./App.css";
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
} from "antd";
import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleFilled,
  SearchOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";

function App() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      code: "C00-001",
      type: "GENERAL",
      name: "Maneesha",
      mobile: "071-9028822",
      country: "SL",
      city: "GALLE",
      gender: "MALE",
    },
    {
      code: "C00-002",
      type: "GENERAL",
      name: "Nuwan",
      mobile: "071-9028562",
      country: "SL",
      city: "GALLE",
      gender: "MALE",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "Code",
      dataIndex: "code",
    },
    {
      key: "2",
      title: "Type",
      dataIndex: "type",
    },
    {
      key: "3",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "4",
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      key: "5",
      title: "Country",
      dataIndex: "country",
    },
    {
      key: "6",
      title: "City",
      dataIndex: "city",
    },
    {
      key: "7",
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

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      id: randomNumber,
      name: "Name " + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "Address " + randomNumber,
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
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
          width={1200}
          height={800}
          onOk={() => {
            setDataSource((prev) => {
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
            <Row
              gutter={[16, 6]}
              justify="center"
              style={{ marginTop: -20}}
            >
              {" "}
              <Col span={7}>
                {/*<label>Code:*</label>*/}
                <Form.Item
                  label="Code"
                  name="code"
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
              <Col span={7}>
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
              <Col span={7}>
                {/*<label>Customer Type:*</label>*/}
                <Form.Item
                  name="customer_type"
                  label="Customer Name"
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
              <Col span={7} style={{ marginTop: -20, marginBottom: -20 }}>
                {/*<label>Customer Name: *</label>*/}
                <Form.Item
                  name="customerName"
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
              <Col span={7} style={{ marginTop: -20, marginBottom: -20 }}>
                {/*<label>Company Name</label>*/}
                <Form.Item
                  name="companyName"
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
              <Col span={7} style={{ marginTop: -20, marginBottom: -20 }}>
                {/*<label>NIC/Passport/Driver's Licence: *</label>*/}
                <Form.Item
                  name="idType"
                  label="ID Type"
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
          </Form>
        </Modal>
      </header>
    </div>
  );
}

export default App;

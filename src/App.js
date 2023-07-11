import "./App.css";
import React, {ChangeEvent, useEffect, useState} from "react";

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
import axios from "./axios";
import Swal from "sweetalert2";
import $ from "jquery";

const {TextArea} = Input;

function App() {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    const [customers, setCustomerList] = useState([]);
    const [types, setTypesList] = useState([]);
    const [country, setCountryList] = useState([]);

    //hooks for text fields
    const [customerId, setCustomerId] = useState(0);
    const [customerCode, setCustomerCode] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [referenceNumber, setReferenceNumber] = useState("");
    const [customerType, setCustomerType] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [passport, setPassport] = useState("");
    const [billingAddress, setBillinAddress] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [countryTxt, setCountry] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [id, setId] = useState("");

    const [searchField, setSearchField] = useState("");
    const [searchValue, searchValueChange] = useState();


    const getAllCustomers = async () => {
        try {
            const response = await axios.get("/load-all-customers");
            setCustomerList(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    //
    // const searchBtn = async ()=>{
    //     try {
    //         const response = await axios.get("/load-all-customers");
    //         setCustomerList(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const handleSubmit = () => {
        let responseBody = {
            customer_code: customerCode,
            company_name: companyName,
            reference_no: referenceNumber,
            customer_type: customerType,
            customer_name: customerName,
            passport: passport,
            billing_address: billingAddress,
            mobile_number: mobileNumber,
            email: email,
            country: countryTxt,
            gender: gender,
            city: city,
            id: id,
        };

        axios
            .post("/save-customer", JSON.stringify(responseBody))
            .then((res) => {
                alert("submit!");
            })
            .catch((e) => {
                alert("error!");
                console.log(e);
            });
    };

    const loadCountry = async () => {
        try {
            const response = await axios.get("/load-all-countries");
            setCountryList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadTypes = async () => {
        try {
            const response = await axios.get("/load-all-customer-types");
            setTypesList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCustomers();
        loadTypes();
        loadCountry();
    }, []);

    const columns = [
        {
            title: "Code",
            dataIndex: "customer_code",
            key: "customer_code",
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
            key: "gender",
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
                            style={{color: "green", marginLeft: 12}}
                        />
                        <EditOutlined
                            onClick={() => {
                                // onEditStudent(record);
                            }}
                            style={{marginLeft: 12}}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                handleDelete();
                            }}
                            style={{color: "red", marginLeft: 12}}
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
                            style={{marginLeft: 12}}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                // onDeleteStudent(record);
                            }}
                            style={{color: "red", marginLeft: 12}}
                        />
                    </>
                );
            },
        },
    ];

    // const onDeleteStudent = (record) => {
    //   Modal.confirm({
    //     title: "Are you sure, you want to delete this student record?",
    //     okText: "Yes",
    //     okType: "danger",
    //     onOk: () => {
    //       setCustomerList((pre) => {
    //         return pre.filter((student) => student.id !== record.id);
    //       });
    //     },
    //   });
    // };
    const handleDelete = () => {
        if (window.confirm("Do you want to remove this jeep ?")) {
            axios
                .delete(`delete-customer/C00-001`)

                .then((response) => {
                    console.log(customerCode);
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        iconColor: "#ff4757",
                        backdrop: "true",
                        background: "#ffffff",
                        didOpen: (toast) => {
                            toast.addEventListener("mouseenter", Swal.stopTimer);
                            toast.addEventListener("mouseleave", Swal.resumeTimer);
                        },
                    });

                    // success , error , warning , info , question ,width,color
                    Toast.fire({
                        icon: "success",
                        title: "Delete Successfully!",
                    });
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error deleting data. ");
                });
        }
    };
    const onEditStudent = (record) => {
        setIsEditing(true);
        // setEditingStudent({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingStudent(null);
    };

    return (
        <div className="App">
            <header className="App-header" style={{color: "#fff"}}>
                {/* <Button onClick={onAddStudent}>Add a new Student</Button> */}
                <div style={{display: "flex", marginBottom: 3}}>
                    {/*//TODO search here */}
                    <Input
                        placeholder="search"
                        suffix={<SearchOutlined/>}
                        onChange={(e) => {
                            setSearchField(e.target.value.toString());
                            alert(e.target.value.toString());
                        }}
                        style={{borderRadius: 10, marginBottom: 3}}
                    />
                    <PlusCircleFilled
                        onClick={onEditStudent}
                        style={{color: "green", marginLeft: 470, marginBottom: 3}}
                    />
                    <VerticalAlignBottomOutlined
                        style={{color: "green", marginLeft: 5}}
                    />
                </div>
                <Table columns={columns} dataSource={customers} pagination={false}/>

                {/* //TODO Model starting ----------------------------------------------------------*/}
                <Modal
                    title="CUSTOMER DETAILS"
                    visible={isEditing}
                    okText="Save"
                    onCancel={resetEditing}
                    width={900}
                    height={800}
                    onOk={() => {
                        handleSubmit();
                        resetEditing();
                    }}
                    okButtonProps={{
                        style: {backgroundColor: "green", borderColor: "green"},
                        onClick: handleSubmit,
                    }}
                >
                    <Divider/>
                    <Form
                        form={form}
                        name="validateOnly"
                        layout="vertical"
                        autoComplete="off"
                        onFinishFailed={(error) => {
                            console.log({error});
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
                                    style={{marginTop: -20}}
                                >
                                    <Col span={8}>
                                        {/*<label>Code:*</label>*/}
                                        <Form.Item
                                            label="Code"
                                            name="code"
                                            value={customerCode}
                                            gutter={[0, 0]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter the code",
                                                },
                                                {whitespace: false},
                                            ]}
                                            hasFeedback
                                            labelAlign="top"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setCustomerCode(value);
                                            }}
                                        >
                                            <Input placeholder="Type the code"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        {/*<label>Reference Name</label>*/}
                                        <Form.Item
                                            label="Reference Number"
                                            name="reference_number"
                                            value={referenceNumber}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter the reference number",
                                                },
                                                {whitespace: false},
                                            ]}
                                            hasFeedback
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setReferenceNumber(value);
                                            }}
                                        >
                                            <Input placeholder="Reference Number"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        {/*<label>Customer Type:*</label>*/}
                                        <Form.Item
                                            name="customer_type"
                                            label="Customer Type"
                                            id="customerType"

                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please select the customer type",
                                                },
                                            ]}
                                            hasFeedback
                                            onChange={(e) => {
                                                const customerType = e.target.value;
                                                setCustomerType(customerType);
                                            }}
                                            value={customerType}
                                        >
                                            <Select placeholder="Select customer type">
                                                {types.map((type) => (
                                                    <Select.Option
                                                        key={type.type_id}
                                                        value={type.type_id}
                                                    >
                                                        {type.type}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} style={{marginTop: -20, marginBottom: -20}}>
                                        {/*<label>Customer Name: *</label>*/}
                                        <Form.Item
                                            name="customer_name"
                                            label="Customer Name"
                                            value={customerName}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter the customer name",
                                                },
                                                {whitespace: false},
                                            ]}
                                            hasFeedback
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setCustomerName(value);
                                            }}
                                        >
                                            <Input placeholder="Type the customer name"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} style={{marginTop: -20, marginBottom: -20}}>
                                        {/*<label>Company Name</label>*/}
                                        <Form.Item
                                            name="company_name"
                                            label="Company Name"
                                            value={companyName}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter the company name",
                                                },
                                                {whitespace: false},
                                            ]}
                                            hasFeedback
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setCompanyName(value);
                                            }}
                                        >
                                            <Input placeholder="Company Name"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} style={{marginTop: -20, marginBottom: -20}}>
                                        {/*<label>NIC/Passport/Driver's Licence: *</label>*/}
                                        <Form.Item
                                            name="idType"
                                            label="NIC/Passport"
                                            value={passport}
                                            height={100}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter the ID type",
                                                },
                                                {whitespace: false},
                                            ]}
                                            hasFeedback
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setPassport(value);
                                            }}
                                        >
                                            <Input placeholder="ID Type"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Image
                                    height={100}
                                    width={150}
                                    style={{borderRadius: 5, marginLeft: 110}}
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                            </Col>
                            {/* //TODO starting second raw --------------------------*/}
                            <Col
                                span={12}
                                style={{alignItems: "left", content: "left", marginTop: 0}}
                            >
                                <Form.Item
                                    name="billing_address"
                                    label="Billing Address"
                                    value={billingAddress}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter the company name",
                                        },
                                        {whitespace: false},
                                    ]}
                                    hasFeedback
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setBillinAddress(value);
                                    }}
                                >
                                    <Input.TextArea
                                        placeholder="Billing Address"
                                        autoSize={{minRows: 5, maxRows: 5}}
                                    />
                                </Form.Item>
                            </Col>
                            <Row span={24}>
                                <Col
                                    span={11}
                                    style={{marginTop: -80, marginBottom: -20, marginRight: 18}}
                                >
                                    {/*<label>Customer Name: *</label>*/}
                                    <Form.Item
                                        name="mobile_number"
                                        label="Mobile Number"
                                        value={mobileNumber}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the customer name",
                                            },
                                            {whitespace: false},
                                        ]}
                                        hasFeedback
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setMobileNumber(value);
                                        }}
                                    >
                                        <Input placeholder="Type the customer name"/>
                                    </Form.Item>
                                </Col>
                                <Col span={11} style={{marginTop: -80, marginBottom: -20}}>
                                    {/*<label>Customer Name: *</label>*/}
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        value={email}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the customer name",
                                            },
                                            {whitespace: false},
                                        ]}
                                        hasFeedback
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setEmail(value);
                                        }}
                                    >
                                        <Input placeholder="Type the customer name"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row span={24} style={{marginLeft: 440, marginTop: -40}}>
                                <Col
                                    span={11}
                                    style={{marginTop: -85, marginBottom: -20, marginRight: 18}}
                                >
                                    <Form.Item
                                        name="country_code"
                                        label="Country Code"
                                        value={countryTxt}
                                        id="countryCode"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCountry(value);
                                        }}
                                        // rules={[
                                        //   {
                                        //     required: true,
                                        //     message: "Please select the customer type",
                                        //   },
                                        // ]}
                                        hasFeedback
                                    >
                                        <Select placeholder="Select country code">
                                            {country.map((type) => (
                                                <Select.Option
                                                    key={type.country_code}
                                                    value={type.country_code}
                                                >
                                                    {type.country}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={11} style={{marginTop: -85, marginBottom: -20}}>
                                    {/*<label>Customer Name: *</label>*/}
                                    <Form.Item
                                        name="city"
                                        label="City"
                                        value={city}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the customer name",
                                            },
                                            {whitespace: false},
                                        ]}
                                        hasFeedback
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCity(value);
                                        }}
                                    >
                                        <Input placeholder="Type the customer name"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Col span={12} style={{alignItems: "start"}}>
                                <Upload.Dragger
                                    multiple
                                    listType="picture"
                                    action={"http://localhost:3000"}
                                >
                                    Drag file here or
                                    <br/>
                                    <Button>Click Upload</Button>
                                </Upload.Dragger>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Gender"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setGender(value);
                                    }}
                                    name="radiogroup"
                                    value={gender}
                                >
                                    <Radio.Group defaultValue={1}>
                                        <Radio style={{marginRight: 12}} value={1}>
                                            Male
                                        </Radio>
                                        <Radio value={2}>Female</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Divider/>
                            <Row
                                gutter={[24, 0]}
                                justify="center"
                                align="middle"
                                style={{marginTop: -20}}
                            >
                                {" "}
                                <Col span={5}>
                                    {/*<label>Code:*</label>*/}
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        value={customerName}
                                        gutter={[0, 0]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the code",
                                            },
                                            {whitespace: false},
                                        ]}
                                        hasFeedback
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCustomerName(value);
                                        }}
                                        labelAlign="top"
                                    >
                                        <Input placeholder="Type the code"/>
                                    </Form.Item>
                                </Col>{" "}
                                <Col span={5}>
                                    {/*<label>Code:*</label>*/}
                                    <Form.Item
                                        label="Designation"
                                        name="designation"
                                        // value={}
                                        gutter={[0, 0]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the code",
                                            },
                                            {whitespace: false},
                                        ]}
                                        // hasFeedbackonChange={(e) => {
                                        //   const value = e.target.value;
                                        //   (value);
                                        // }}
                                        labelAlign="top"
                                    >
                                        <Input placeholder="Type the code"/>
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    {/*<label>Code:*</label>*/}
                                    <Form.Item
                                        label="Mobile"
                                        name="mobile"
                                        value={mobileNumber}
                                        gutter={[0, 0]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the code",
                                            },
                                            {whitespace: false},
                                        ]}
                                        hasFeedback
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setMobileNumber(value);
                                        }}
                                        labelAlign="top"
                                    >
                                        <Input placeholder="Type the code"/>
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    {/*<label>Code:*</label>*/}
                                    <Form.Item
                                        label="Email"
                                        name="last_email"
                                        value={email}
                                        gutter={[0, 0]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the code",
                                            },
                                            {whitespace: false},
                                        ]}
                                        hasFeedback
                                        labelAlign="top"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setEmail(value);
                                        }}
                                    >
                                        <Input placeholder="Type the code"/>
                                    </Form.Item>
                                </Col>
                                <Button type="primary">Add</Button>
                                <Row
                                    gutter={[24, 0]}
                                    justify="center"
                                    align="middle"
                                    style={{marginTop: -20}}
                                >
                                    <Col>
                                        <Table
                                            columns={columns2}
                                            pagination={true}
                                            // dataSource={dataSource}
                                            style={{width: "100%"}}
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

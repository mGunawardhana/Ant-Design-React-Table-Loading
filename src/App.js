import "./App.css";
import React, {useEffect, useState} from "react";

import {Button, Col, Divider, Form, Image, Input, Modal, Radio, Row, Select, Table, Upload,} from "antd";
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
    const [countryArray, setCountryArrayList] = useState([]);

    //hooks for text fields
    const [customerId, setCustomerId] = useState(0);
    const [code, setCode] = useState('');
    const [companyName, setCompanyName] = useState("");
    const [refNo, setRefNo] = useState("");
    const [customerType, setCustomerType] = useState("");
    const [name, setName] = useState("");
    const [nicNo, setNicNo] = useState("");
    const [billingAddress, setBillinAddress] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState([]);
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [id, setId] = useState("");

    const [designation, setDesignation] = useState("");

    const [searchField, setSearchField] = useState("");
    const [searchValue, searchValueChange] = useState();


    /** array for storing customer details */
    // let customerDetails = [];
    //
    class ContactPersonDetail {
        constructor(name, designation, mobile, email) {
            this.name = name;
            this.designation = designation;
            this.mobile = mobile;
            this.email = email;
        }
    }

    let [customerDetails, setCustomerDetails] = useState([]);

    const handleAddCustomer = () => {
        let customer = new ContactPersonDetail(
            name,
            designation,
            mobileNumber,
            email
        );
        setCustomerDetails([...customerDetails, customer]);
    };

    const handleDeleteCustomer = (id) => {
        setCustomerDetails(customerDetails.filter((customer) => customer.id !== id));
    };

    const getAllCustomers = async () => {
        try {
            const response = await axios.get("customer/get-all-customers");
            setCustomerList(response.data.data);
            setAutoGenaratedValue();
        } catch (error) {
            console.log(error);
        }
    }

    const searchBtn = async () => {
        try {
            const response = await axios.get("customer/load-all-customers");
            setCustomerList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = () => {
        let requestBody = {
            id:"",
            code:code,
            refNo:refNo,
            customerType:customerType,
            name:name,
            companyName:companyName,
            nicNo:nicNo,
            billingAddress:billingAddress,
            mobile:mobileNumber,
            email:email,
            country:"country",
            city:city,
            gender:gender,
            contactPersonDetails:customerDetails
        }

        console.log(requestBody);

        axios
            .post("customer/save-customer",JSON.stringify(requestBody))
            .then((res) => {
                console.log(res.data);
                // alert("submit!");
            })
            .catch((e) => {
                // alert("error!");
                console.log(e);
            });
    };

    const loadCountry = async () => {
        try {
            const response = await axios.get("https://countryapi.io/api/all?apikey=uKjkhdhLwvY6L1s9I71vgQQVVEOuFJUoZ0IssYTi");
            setCountryArrayList(response.name);
        } catch (error) {
            console.log(error);
        }
    };

    const loadTypes = async () => {
        try {
            const response = await axios.get("customer-type-controller/get-all-customer-types");
            setTypesList(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };


const setAutoGenaratedValue = async () => {
  try {
    const response = await axios.get("customer?test=");
    console.log(response.data.data);
    let value = response.data.data;
    setCode(response.data.data);
    // document.getElementById("code").value = value;
  } catch (error) {
    console.log(error);
  }
};

    const initialValues = {
        code: code,
    };

    function deleteCustomer(id) {
        // Get the customer from the list of customers.
        const customer = customerDetails.find((customer) => customer.id === id);

        // Check if the customer is found.
        if (customer !== undefined) {
            // Remove the customer from the list of customers.
            const newCustomerDetails = customerDetails.filter((customer) => customer.id !== id);

            // Update the state of the component.
            setCustomerDetails(newCustomerDetails);
        }
    }



    useEffect(() => {
        getAllCustomers();
        loadTypes();
        // loadCountry();
        setAutoGenaratedValue();
    }, []);

    const columns = [
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
        },
        {
            key: "customerType",
            title: "Type",
            dataIndex: "customerType",
        },
        {
            key: "companyName",
            title: "Company Name",
            dataIndex: "companyName",
        },
        {
            key: "mobile",
            title: "Mobile",
            dataIndex: "mobile",
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
                            onClick={() => deleteCustomer(record.id)}
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
            key: "5",
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
                            onClick={(e) => {
                                handleDeleteCustomer();
                            }}
                            style={{color: "red", marginLeft: 12}}
                        />
                    </>
                );
            },
        },
    ];

    const handleDelete = () => {
        if (window.confirm("Do you want to remove this jeep ?")) {
            axios
                .delete(`/delete-customer-by-id/{code}`)

                .then((response) => {
                    console.log(code);
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
                    centered={true}
                    title="CUSTOMER DETAILS"
                    visible={isEditing}
                    okText="Save"
                    onCancel={resetEditing}
                    width={1000}
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
                        style={{ flex: 8 }}
                        onFinishFailed={(error) => {
                            console.log({error});
                        }}
                        initialValues={initialValues}
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
                                            id="code"
                                            label="Code"
                                            name="code"
                                            value={code}
                                            //TODO set code here
                                            gutter={[0, 0]}
                                            hasFeedback
                                            labelAlign="top"
                                        >
                                            <Input placeholder=""/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        {/*<label>Reference Name</label>*/}
                                        <Form.Item
                                            label="Reference Number"
                                            name="reference_number"
                                            value={refNo}
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
                                                setRefNo(value);
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

                                            // rules={[
                                            //     {
                                            //         required: true,
                                            //         message: "Please select the customer type",
                                            //     },
                                            // ]}
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
                                                        {type.customerType}
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
                                            value={name}
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
                                                setName(value);
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
                                            value={nicNo}
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
                                                setNicNo(value);
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
                                        value={country}
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
                                                    key={type.name}
                                                    value={type.name}
                                                >
                                                    {type.ad}
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
                                        value={name}
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
                                            setName(value);
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
                                        value={designation}
                                        gutter={[0, 0]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the code",
                                            },
                                            {whitespace: false},
                                        ]}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setDesignation(value);
                                        }}
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
                                <Button onClick={handleAddCustomer}>Add Customer</Button>

                                <Row
                                    gutter={[24, 0]}
                                    justify="center"
                                    align="middle"
                                    style={{marginTop: -20}}
                                >
                                    {/*<Col>*/}

                                    <Table
                                        columns={columns2}
                                        id="table"
                                        pagination={true}
                                        dataSource={customerDetails}
                                        onRowDelete={deleteCustomer}


                                    />

                                    {/*</Col>*/}
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

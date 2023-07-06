import "./App.css";
import {Button, Input, Modal,Form,  Table} from "antd";
import {useState} from "react";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusCircleFilled,
    VerticalAlignBottomOutlined,SearchOutlined
} from "@ant-design/icons";


function App() {
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
            gender: "MALE"
        }, {
            code: "C00-001",
            type: "GENERAL",
            name: "Maneesha",
            mobile: "071-9028822",
            country: "SL",
            city: "GALLE",
            gender: "MALE"
        }

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
        }, {
            key: "6",
            title: "City",
            dataIndex: "city",
        }, {
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
                        <EyeOutlined onClick={() => {
                            // onEditStudent(record);
                        }} style={{color: "green", marginLeft: 12}}
                        />
                        <EditOutlined
                            onClick={() => {
                                onEditStudent(record);
                            }}
                            style={{marginLeft: 12}}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteStudent(record);
                            }}
                            style={{color: "red", marginLeft: 12}}
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
        setEditingStudent({...record});
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingStudent(null);
    };
    return (
        <div className="App">
            <header className="App-header" style={{color: "#fff"}}>
                {/*<Button onClick={onAddStudent}>Add a new Student</Button>*/}
                <div style={{display:"flex",marginBottom:3}}>
                    <Input placeholder="search" suffix={<SearchOutlined />} style={{ borderRadius: 10, marginBottom: 3 }} />
                    <PlusCircleFilled  onClick={onEditStudent} style={{color: "green", marginLeft: 470,marginBottom:3}}/>
                    <VerticalAlignBottomOutlined style={{color: "green", marginLeft: 5}}/>
                </div>
                <Table columns={columns} dataSource={dataSource}></Table>
                <Modal
                    title="Edit Student"
                    visible={isEditing}
                    okText="Save"
                    onCancel={() => {
                        resetEditing();
                    }}
                    onOk={() => {
                        setDataSource((pre) => {
                            return pre.map((student) => {
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
                    <Input
                        value={editingStudent?.name}
                        onChange={(e) => {
                            setEditingStudent((pre) => {
                                return {...pre, name: e.target.value};
                            });
                        }}
                    />
                    <Input
                        value={editingStudent?.email}
                        onChange={(e) => {
                            setEditingStudent((pre) => {
                                return {...pre, email: e.target.value};
                            });
                        }}
                    />
                    <Input
                        value={editingStudent?.address}
                        onChange={(e) => {
                            setEditingStudent((pre) => {
                                return {...pre, address: e.target.value};
                            });
                        }}
                    />
                </Modal>
            </header>
        </div>
    );
}

export default App;

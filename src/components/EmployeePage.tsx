import React, { useEffect, useState } from "react";
import Router from 'next/router'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SyntheticEventData } from "react-dom/test-utils";
import { Button, Checkbox, Form, Input, Table, Space, Modal, Typography, Select, notification } from 'antd';
import { openNotificationWithIcon } from "./functions/notification";
const EmployeePage = () => {
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [role, setRole] = useState();
    const [pw, setPW] = useState();
    const [id, setId] = useState(Number);
    const [result, setResult] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState([]);
    const [errMsg,setErrMsg] = useState("");
    const [form] = Form.useForm();
    const [formCreate] = Form.useForm();

    const nameValue = Form.useWatch('name', form);
    const addressValue = Form.useWatch('address', form);
    const roleValue = Form.useWatch('role', form);
    const pwValue = Form.useWatch('password', form);
    const compIdValue = Form.useWatch('compId', form);
    const ageValue = Form.useWatch('age', form);
    const pattern = /^[1-9\b]+$/
    const AlphabetPattrn = /^[a-zA-Z]+$/
 
    const { Option } = Select;

    const showModal = (values: any) => {
        setIsModalOpen(true);
        form.setFieldsValue(values)
    };
    const showCreateModal = () => {
        setCreateModalOpen(true);
    };
    const handleCreateModalOk = (values: any) => {
        setCreateModalOpen(false);
        createUser(values);
        formCreate.resetFields()
    };
    const handleCancelModalOk = (values: any) => {
        setCreateModalOpen(false);
        formCreate.resetFields()

    }
    const createUser = async (values: any) => {
        try {
            const body = { name: values.name, address: values.address, password: values.password, companyId: parseInt(values.companyId), age: parseInt(values.age), role: values.role }
            console.log(body)
            const res = await axios.post('http://localhost:3000/api/createEmployee', body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                }
            })
                .then(respone => {
                    // alert("employee created")
                    getData();
                    openNotificationWithIcon("success","Created Successfully")

                })
                .catch(error => {
                    alert(error.response.data)
                })
            console.log(res)
        }
        catch (error) {
            console.error(error)
        }
    }

    const deleteUser = async (id: number) => {
        try {

            const res = await axios.delete('http://localhost:3000/api/deleteEmployee/', {
                data: { id: id }, headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token"),

                }
            })
                .then(respone => {
                    setId(0);
                    getData();

                })
                .catch(error => {
                    console.log(error)
                })
        }
        catch (error) {
            console.error(error)
        }
    }
    const handleOk = async () => {
        setIsModalOpen(false);
        try {

            const body = { id, name: nameValue }
            console.log(body)
            const res = await axios.put('http://localhost:3000/api/updateEmployee', body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token"),

                }
            })
                .then(respone => {
                    console.log(respone.data)
                    getData()
                })
                .catch(error => {
                    console.log(error)
                })


        }
        catch (error) {
            console.error(error)
        }
    };
    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/getEmployeeByComp/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token"),

                }
            })
                .then(respone => {
                    setResult(respone.data)
                    setId(id);

                })
                .catch(error => {
                    console.log(error)
                })


        }
        catch (error) {
            console.error(error)
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
    }, [])

    const onFinish = async (values: any) => {
        try {
            const res = await axios.get('http://localhost:3000/api/getEmployeeByComp/' + values.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token"),

                }
            })
                .then(respone => {
                    if (respone.data == "no record found") {
                        alert("no record found")
                    }
                    else {
                        setResult(respone.data)
                        let id = parseInt(values.id)
                        setId(id);
                    }



                })
                .catch(error => {
                    console.log(error)
                })


        }
        catch (error) {
            console.error(error)
        }
    };

    const onFinish2 = async (values: any) => {
        setIsModalOpen(false);
        try {

            const body = { id: values.id, name: values.name }
            console.log(body)
            const res = await axios.put('http://localhost:3000/api/updateEmployee', body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token"),

                }
            })
                .then(respone => {
                    console.log(respone.data)
                    getData()
                    alert("Employee updated")
                })
                .catch(error => {
                    console.log(error)
                })


        }
        catch (error) {
            console.error(error)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // const handleSubmit = async (event: any) => {

    //     try {
    //         // await fetch(`http://localhost:3000/api/getEmployeeByComp/?CompId=${CompId}`, {
    //         //   method: 'GET',
    //         //   headers: { 'Content-Type': 'application/json' },
    //         // }).then((response) => {
    //         //     return response.json();
    //         //   })
    //         //   .then(data => {
    //         //     console.log(data)
    //         //     return data.json();
    //         //     })
    //         //     .then(post => {
    //         //     console.log(post.id);
    //         //     });

    //         // const url = await axios.get('http://localhost:3000/api/getEmployeeByComp/', { params: { CompId: 1 } })
    //         // const { data } = await axios.get('http://localhost:3000/api/getEmployeeByComp/', { params: { CompId: 1 } });
    //         // console.log(data)
    //         // const requestConfig: AxiosRequestConfig = {
    //         //     method: 'get',
    //         //     url: 'http://localhost:3000/api/getEmployeeByComp/', 
    //         //     params: { CompId: 1 } 
    //         //   };

    //         //   try {
    //         //     const response: AxiosResponse<Response> = await axios(requestConfig); //funtion expects <AxiosResponse<Response>> as return.
    //         //     return response;
    //         //   } catch (err) {
    //         //     throw new Error('error');
    //         //   }

    //         const res = await axios.get('http://localhost:3000/api/getEmployeeByComp/'+companyId)
    //         .then(respone=>{
    //             setResult(respone.data)
    //         })
    //         .catch(error => { 
    //             console.log(error)
    //         })
    //         console.log(result)


    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    const ReturnData = (value: any) => {
        // this will throw JSX expression error
        return (
            <div>
                {value.length > 0 && (
                    <ul>
                        {value.map((user: any) => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }

    const checkLength = (e: any) => {
        const data = e.target.value
        let errMsg=""
        
        if(data.length <=8 || data.length>25){
            errMsg="name must be longer than 8 short than 25"
        }
        setErrMsg(errMsg)
        return errMsg;
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'CompanyId',
            dataIndex: 'companyId',
            key: 'companyId',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showModal(record)}>Update</Button>
                    <Button danger onClick={() => deleteUser(record.id)}>Delete</Button>
                </Space>
            ),
        }
    ];


    return (
        <>

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="id"
                    name="id"
                    rules={[
                        { required: true, message: 'Please input your id!' },
                        {
                            pattern: pattern,
                            message: 'ID must be a number and greater than 1',
                        }

                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Button type="primary" htmlType="submit" style={{ position: 'relative', bottom: '5px', left: '200px' }} onClick={showCreateModal} >
                Create
            </Button>


            <Modal title="Basic Modal" open={isCreateModalOpen} onOk={formCreate.submit} onCancel={handleCancelModalOk}>

                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={handleCreateModalOk}
                    autoComplete="off"
                    form={formCreate}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' },
                        {
                            pattern: AlphabetPattrn,
                            message: 'name must be alphabet only',
                        }]}
                    >
                        <Input maxLength={25} />
                        {/* <p style={{color:"red"}}>{errMsg}</p> */}
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please input your role!' }]}
                    >
                        <Select placeholder="Please select an option">
                            <Option value="employee">Employee</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item
                        label="CompId"
                        name="companyId"
                        rules={[
                            { required: true, message: 'Please input your Company ID!' },
                            {
                                pattern: pattern,
                                message: 'Must greater than 1',
                            }
                        ]}
                    >
                        <Input type="number" min={1} />
                    </Form.Item>
                    <Form.Item
                        label="Age"
                        name="age"
                        rules={[
                            { required: true, message: 'Please input your age!' },
                            {
                                pattern: pattern,
                                message: 'Must greater than 1',
                            }
                        ]}
                    >
                        <Input type="number" min={1} />
                    </Form.Item>
                </Form>
            </Modal>
            {/* <Typography>
                            <pre>Name Value: {nameValue}</pre>
                        </Typography>
                        <Typography>
                            <pre>Role Value: {roleValue}</pre>
                        </Typography>
                        <Typography>
                            <pre>Password Value: {pwValue}</pre>
                        </Typography>
                        <Typography>
                            <pre>Address Value: {addressValue}</pre>
                        </Typography>
                        <Typography>
                            <pre>Company ID Value: {compIdValue}</pre>
                        </Typography> */}

            {
                result.length === 0 ? (
                    <h1 style={{ display: "flex", justifyContent: "center" }}>No Result</h1>
                ) : (
                    <>
                        <Table dataSource={result} columns={columns} />;
                        {


                            <Modal title="Basic Modal" open={isModalOpen} onOk={form.submit} onCancel={handleCancel} >

                                <Form
                                    name="basic"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    style={{ maxWidth: 600 }}

                                    onFinish={onFinish2}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    form={form}

                                >
                                    <Form.Item
                                        label="id"
                                        name="id"
                                        rules={[{ required: true, message: 'Please input your id!' }]}
                                        hidden
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your name!' }
                                            ,
                                        {
                                            pattern: AlphabetPattrn,
                                            message: 'Must greater than 1',
                                        }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Address"
                                        name="address"
                                        rules={[{ required: true, message: 'Please input your Address!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Role"
                                        name="role"
                                        rules={[{ required: true, message: 'Please input your Role!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"

                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input type="password" />
                                    </Form.Item>
                                </Form>

                            </Modal>



                        }
                    </>
                )
            }
        </>



    )

}

export default EmployeePage
import React, { useEffect, useState } from "react";
import Router from 'next/router'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SyntheticEventData } from "react-dom/test-utils";
import { Button, Checkbox, Form, Input, Table, Space, Modal, Typography } from 'antd';

const CompanyPage =()=>{
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [role, setRole] = useState();
    const [pw, setPW] = useState();
    const [id, setId] = useState(Number);
    const [result, setResult] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const [form] = Form.useForm();
    const nameValue = Form.useWatch('name', form);
    const addressValue = Form.useWatch('address', form);
    const roleValue = Form.useWatch('role', form);
    const pwValue = Form.useWatch('password', form);
    const compIdValue = Form.useWatch('compId', form);
    const ageValue = Form.useWatch('age', form);

    useEffect(() => {
        getData();
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const showCreateModal = () => {
        setCreateModalOpen(true);
    };
    const handleCreateModalOk = () => {
        setCreateModalOpen(false);
        createUser();
    };
    const handleCancelModalOk = () => {
        setCreateModalOpen(false);
    }
    const createUser = async ()=>
    {
        try {

            const body ={name: nameValue,address:addressValue,password:pwValue,companyId:parseInt(compIdValue),age:parseInt(ageValue)}
            const res = await axios.post('http://localhost:3000/api/createEmployee',body)
                .then(respone => {
                    alert("employee created")
                })
                .catch(error => {
                    console.log(error)
                })
        }
        catch (error) {
            console.error(error)
        }
    }

    const deleteUser = async () => {
        try {

            const res = await axios.delete('http://localhost:3000/api/deleteEmployee/', { data: { id: id } })
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
            const res = await axios.put('http://localhost:3000/api/updateEmployee', body)
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
            const res = await axios.get('http://localhost:3000/api/getAllCompany')
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
            const res = await axios.get('http://localhost:3000/api/getEmployeeByComp/' + values.id)
                .then(respone => {
                    setResult(respone.data)
                    let id = parseInt(values.id)
                    setId(id);

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
            render: () => (
                <Space size="middle">
                    <Button type="primary" onClick={showModal}>Update</Button>
                    <Button danger onClick={() => deleteUser()}>Delete</Button>
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
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="id"
                    name="id"
                    rules={[{ required: true, message: 'Please input your id!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Button type="primary" htmlType="submit" onClick={showCreateModal}>
                Create
            </Button>
            <Modal title="Basic Modal" open={isCreateModalOpen} onOk={handleCreateModalOk} onCancel={handleCancelModalOk}>

                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}

                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your id!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your id!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please input your id!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your id!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="CompId"
                        name="compId"
                        rules={[{ required: true, message: 'Please input your Company ID!' }]}
                    >                        
                    <Input />
                    </Form.Item>
                    <Form.Item
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please input your age!' }]}
                    >                        
                    <Input />
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
                    <h1>No Result</h1>
                ) : (
                    <>
                        <Table dataSource={result} columns={columns} />;
                        {result.map((user: any) => (


                            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <Form
                                    name="basic"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    style={{ maxWidth: 600 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    form={form}
                                >
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        initialValue={user.name}
                                        rules={[{ required: true, message: 'Please input your id!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Address"
                                        name="address"
                                        initialValue={user.address}
                                        rules={[{ required: true, message: 'Please input your id!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Role"
                                        name="role"
                                        initialValue={user.role}
                                        rules={[{ required: true, message: 'Please input your id!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        initialValue={user.password}
                                        rules={[{ required: true, message: 'Please input your id!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Form>
                            </Modal>))}
                        
                    </>

                )
            }
        </>



    )

};

export default CompanyPage
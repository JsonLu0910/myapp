import React, { useState } from "react";
import Router from 'next/router'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import CompanyPage from "./CompanyPage";
import EmployeePage from "./EmployeePage";
import axios from "axios";
import { Button, Checkbox, Form, Input, Table, Space, Modal, Typography, Select } from 'antd';

const Login = () => {
  const [name, setName] = useState({});
  const [password, setPassword] = useState({});
  const navigate = useNavigate();
  const pattern = /^[1-9\b]+$/
  const AlphabetPattrn = /^[a-zA-Z]+$/
  const [formCreate] = Form.useForm();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const body = { name, password }
      // await fetch(`http://localhost:3000/api/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(body),
      // }).then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {

      //     var base64Url = data.token.split('.')[1];
      //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      //     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      //     }).join(''));

      //     // navigate('/Company')
      //     // return JSON.parse(jsonPayload);
      //     let valid_data = JSON.parse(jsonPayload)
      //     console.log(valid_data.role)
      //     if(valid_data.role ==="company")
      //     {
      //       navigate('/CompanyPage');
      //     }
      //     else if(valid_data.role ==="employee")
      //     {
      //       navigate('/EmployeePage');

      //     }
      //   })
      axios.post('http://localhost:3000/api/login', body)
        .then((response) => {
          if (response.data == "no record found") {
            alert("please check your name/password")
          }
          sessionStorage.setItem("token", response.data.token)
          console.log(response.data.token)
          var base64Url = response.data.token.split('.')[1];
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));

          // navigate('/Company')
          // return JSON.parse(jsonPayload);
          let valid_data = JSON.parse(jsonPayload)
          console.log(valid_data.role)
          if (valid_data.role === "company") {
            navigate('/CompanyPage');
          }
          else if (valid_data.role === "employee") {
            navigate('/EmployeePage');

          }
        })
    } catch (error) {
      console.error(error)
    }

  }
  const onFinish = async (values: any) => {
    // show loading
    try {
      const body = { name:values.name, password:values.password }

      const response = await axios.post('http://localhost:3000/api/login', body)

      if (response.data == "no record found") {
        alert("please check your name/password")
        return
      }
      sessionStorage.setItem("token", response.data.token)
      console.log(response.data.token)
      var base64Url = response.data.token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      // navigate('/Company')
      // return JSON.parse(jsonPayload);
      let valid_data = JSON.parse(jsonPayload)
      console.log(valid_data.role)
      if (valid_data.role === "company") {
        navigate('/CompanyPage');
      }
      else if (valid_data.role === "employee") {
        navigate('/EmployeePage');
      }

      // hide loading

    } catch (error: any) {
      console.log(error)
      console.log(error.response.data)
      alert(error)
      // jide loading
    }
    
    // show loading
    // axios.post('http://localhost:3000/api/login', body)
    //     .then((response) => {
    //       if (response.data == "no record found") {
    //         alert("please check your name/password")
    //         return
    //       }
    //       sessionStorage.setItem("token", response.data.token)
    //       console.log(response.data.token)
    //       var base64Url = response.data.token.split('.')[1];
    //       var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //       var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //       }).join(''));

    //       // navigate('/Company')
    //       // return JSON.parse(jsonPayload);
    //       let valid_data = JSON.parse(jsonPayload)
    //       console.log(valid_data.role)
    //       if (valid_data.role === "company") {
    //         navigate('/CompanyPage');
    //       }
    //       else if (valid_data.role === "employee") {
    //         navigate('/EmployeePage');

    //       }
    //     }).catch(() => {
    //       alert("invalid username or password")
    //     }).finally(() => {
    //       // no matter request fail/success, will come to here
    //       // example: loading
    //     })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
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
        label="UserName"
        name="name"
        rules={[
          { required: true, message: 'Please input your name!' },
          {
            pattern: AlphabetPattrn,
            message: 'name must be alphabet only',
          }
        ]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item
        label="Passwor"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' }]}
      >
        <Input type="password"/>
      </Form.Item> */}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>

  );
};

export default Login;
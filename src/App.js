import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import axios from 'axios';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Space } from 'antd';
import { fetchData } from '../src/redux/actions/Actions'
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons/lib/icons';
import '../src/App.scss'
let originData;


axios.get('https://reqres.in/api/users?page=1').then(function (response) {
      
       originData = response.data.data
       console.log(originData);
})

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


function App() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;
  let localdata = [];

  const dispatch =useDispatch();
    useEffect(() => {
        dispatch(fetchData());
        
        if( JSON.stringify(originData) !== JSON.stringify(localStorage.getItem('myData')) ){
          if(localStorage.getItem('myData')!==null){
            localdata = localStorage.getItem('myData');
            setData(JSON.parse(localdata))
          }
          else{
            setData(originData)
          }
        }
    }, []);

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const deletefun = (index) => {
    let newDataad = [...data];
    newDataad = newDataad.filter(function( obj ) {
      return obj.id !== index;
    });

    setData(newDataad)
    localStorage.setItem('myData', JSON.stringify(newDataad));

  }

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        localStorage.setItem('myData', JSON.stringify(newData));
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      width: '15%',
      editable: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      width: '15%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '30%',
      editable: true,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      width: '20%',
      editable: false,
      render: (t, r) => <img src={`${r.avatar}`} /> 
    },
    {
      title: '',
      width: '10%',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              <SaveOutlined style={{ fontSize: '40px', color: '#08c' }}/>
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a><CloseCircleOutlined style={{ fontSize: '40px', color: '#08c' }}/></a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditOutlined style={{ fontSize: '40px', color: '#08c' }}/>
          </Typography.Link>
        );
      },
    },
    {
      title: '',
      id: 'action',
      width: '10%',
      render: (text, record, index) => (
        <Space size="middle">
          <DeleteOutlined onClick={() =>deletefun(record.id)} style={{ fontSize: '40px', color: 'red' }}/>
        </Space>
      ),
    }
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
    <div >
      <h2 >INFILON ASSIGNMENT</h2>
    </div>
    <Form form={form} component={false}>
      <Table
        size="middle"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    </>
  );
  
}

export default App;

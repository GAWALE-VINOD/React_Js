import React, {useState} from 'react';
import {
    EditOutlined,
    DeleteOutlined,
    HeartTwoTone,
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined,
    HeartFilled
} from '@ant-design/icons';
import {Space, Divider, Modal, Input} from 'antd';
import {Card, Col, Row, Typography} from 'antd';

function App() {
    const [userData, setUsersData] = React.useState([]);
    const [editData, setEditData] = React.useState({
        name: '',
        email: '',
        phone: '',
        website: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    // for fetching data given API
    React.useEffect(() => {
        fetch(
            "https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((json) => {
                console.log('data', json)
                setUsersData(json)
            })
    }, [])

    // for delete user
    const handleRemoveItem = (id) => {
        setUsersData(userData.filter(item => item.id !== id));
    };

    const showModal = (obj) => {
        setEditData(obj)
        setIsModalOpen(true);
    };

    // for close model
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // for like user
    const setLikeData = (id) => {
        const newState = userData.map(obj => {
            if (obj.id === id) {
                return {
                    ...obj,
                    like: true
                };
            }
            return obj;
        });
        setUsersData(newState);
    }

    // for unlike user
    const setUnLikeData = (id) => {
        const newState = userData.map(obj => {
            if (obj.id === id) {
                return {
                    ...obj,
                    like: false
                };
            }
            return obj;
        });
        setUsersData(newState);
    }

    // for update user
    const updateData = (id) => {
        const newState = userData.map(obj => {
            if (obj.id === id) {
                return {
                    ...obj,
                    name: editData.name,
                    phone: editData.phone,
                    email: editData.email,
                    website: editData.website
                };
            }
            return obj;
        });
        setUsersData(newState);
        setIsModalOpen(false);
    };

    // for on change
    const onChangeData = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="App">
            <Card style={{width: '50'}}>
                {/* below tag for responsive row wise */}
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {userData.map((obj) => (
                        // below tag for responsive column wise
                        <Col span={{xs: 24, sm: 24, md: 12, lg: 6}}>
                            <div>
                                <Card
                                    // hoverable
                                    style={{width: '100%', marginLeft: 30, marginBottom: 10}}
                                    cover={
                                        <img className="xs: 24, sm: 24, md: 12, lg: 6"
                                            style={{height: 200}}
                                             alt="example"
                                             src={`https://avatars.dicebear.com/v2/avataaars/${obj.username}.svg?options[mood][]=happy`}
                                        />
                                    }
                                >
                                    <div align="left">
                                        <Typography level={4}>
                                            {obj.name}
                                        </Typography>
                                        <Typography level={3}>
                                            <MailOutlined/>: {obj.email}
                                        </Typography>
                                        <Typography level={3}>
                                            <PhoneOutlined/>: {obj.phone}
                                        </Typography>
                                        <Typography level={3}>
                                            <GlobalOutlined/>: {obj.website}
                                        </Typography>
                                    </div>
                                    <Divider/>
                                    <div>
                                        <Space style={{columnGap: '78px'}}>
                                            {obj.like !== true ? (
                                                <HeartTwoTone onClick={() => setLikeData(obj.id)}
                                                              twoToneColor="#eb2f96"/>
                                            ) : (
                                                <HeartFilled onClick={() => setUnLikeData(obj.id)}
                                                             style={{color: 'red'}}/>
                                            )}
                                            <EditOutlined onClick={() => showModal(obj)}/>
                                            <DeleteOutlined twoToneColor="#52c41a"
                                                            onClick={() => handleRemoveItem(obj.id)}/>
                                        </Space>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Card>
            {/*  for edit popup */}
            <Modal title="Edit User" open={isModalOpen} onOk={() => updateData(editData.id)} onCancel={handleCancel}>
                <div>
                    <Row style={{paddingBottom: 10}}>
                        <Input
                            name='name'
                            placeholder="name"
                            value={editData.name}
                            onChange={(e) => onChangeData(e)}
                        />
                    </Row>
                    <Row style={{paddingBottom: 10}}>
                        <Input
                            name='email'
                            placeholder="email"
                            value={editData.email}
                            onChange={(e) => onChangeData(e)}/>
                    </Row>
                    <Row style={{paddingBottom: 10}}>
                        <Input
                            name='phone'
                            placeholder="phone"
                            value={editData.phone}
                            onChange={(e) => onChangeData(e)}/>
                    </Row>
                    <Row style={{paddingBottom: 10}}>
                        <Input
                            name='website'
                            placeholder="website"
                            value={editData.website}
                            onChange={(e) => onChangeData(e)}/>
                    </Row>
                </div>
            </Modal>
        </div>
    )
}


export default App;

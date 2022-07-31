import { Layout, Menu, PageHeader, Button, notification } from 'antd'
import React, { useState } from 'react'
// import CardGrid from '../components/listngrids/cardgrid'
import { useSelector, useDispatch } from 'react-redux'
import { createCard } from '../redux/actions/cardActions'
import CardModal from '../components/modals/cardModal'
import { createBucket } from '../redux/actions/bucketActions'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

const { Header, Content } = Layout

const Home = () => {
  const [visible, setVisible] = useState(false)
  const cards = useSelector((state) => state.cards)
  const dispatch = useDispatch()

  const onCreate = (values, checked) => {
    cards.error &&
      notification['error']({
        message: 'Card could not be created',
        description:
          'Seems that you are not connected to internet and then try again.',
      })
    checked && dispatch(createBucket(values.bucket))
    dispatch(createCard(values.cardName, values.link, values.bucket))
    setVisible(false)
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: 'white' }}>
          <Menu
            mode='horizontal'
            // defaultSelectedKeys={['1']}
            items={[
              {
                key: 1,
                label: <Link to='/'>Home</Link>,
              },
              {
                key: 2,
                label: <Link to='/history'>History</Link>,
              },
            ]}
          />
        </Header>

        <PageHeader
          style={{ margin: '5px 30px' }}
          extra={[
            <Button
              type='primary'
              key='createCard'
              onClick={() => setVisible(true)}
            >
              Create Card
            </Button>,
          ]}
        />
        <CardModal
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false)
          }}
          type='create'
        />
        <Content
          style={{
            margin: '10px 50px',
            minHeight: '280px',
            padding: '24px',
            background: '#fff',
            borderRadius: '10px',
            alignItems: 'center',
          }}
        >
          {/* {cards.error ? (
            <Result
              status='warning'
              title='There are some problems with your connection.'
              extra={
                <Button
                  type='primary'
                  key='reload'
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              }
            />
          ) : (
            <CardGrid />
          )} */}
          <Outlet />
        </Content>
      </Layout>
    </>
  )
}

export default Home

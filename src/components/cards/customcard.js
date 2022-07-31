import React, { useState } from 'react'
import { Button, Card, Checkbox, Tag } from 'antd'
import { deleteCard, updateCard } from '../../redux/actions/cardActions'
import { useDispatch, useSelector } from 'react-redux'
import {
  EditOutlined,
  DeleteOutlined,
  ArrowsAltOutlined,
} from '@ant-design/icons'
import CardModal from '../modals/cardModal'
import VideoModal from '../modals/videoModal'
import { setHistoryLog } from '../../redux/actions/historyActions'

const CustomCard = ({ name, bucket, link, id }) => {
  const [visible, setVisible] = useState(false)
  const [vidModVisible, setVidModVisible] = useState(false)
  const [playing, setPlaying] = useState(false)

  const dispatch = useDispatch()

  let time = new Date()
  const selectedCards = useSelector((state) => state.cards.selectedcards)

  const onUpdate = (values) => {
    dispatch(
      updateCard(id, {
        name: values.cardName,
        link: values.link,
        bucket: values.bucket,
      })
    )
    setVisible(false)
  }

  return (
    <>
      <Card
        title={<Tag color='cyan'>{bucket}</Tag>}
        bordered={true}
        // style={selected ? { border: '1px solid dodgerblue' } : {}}
        hoverable
        actions={[
          <Checkbox value={JSON.stringify({ id: id, bucket: bucket })} />,
          <ArrowsAltOutlined
            key='open'
            onClick={() => {
              setVidModVisible(true)
              setPlaying(true)
              dispatch(setHistoryLog(name, link, time.toLocaleTimeString()))
            }}
          />,
          <EditOutlined key='edit' onClick={() => setVisible(true)} />,
          <Button
            type='text'
            danger
            disabled={selectedCards.length !== 0 ? true : false}
          >
            <DeleteOutlined
              onClick={() => dispatch(deleteCard(id))}
              key='delete'
            />
          </Button>,
        ]}
      >
        <Card.Meta
          title={name}
          description={link}
          style={{ justifyContent: 'center' }}
        />
      </Card>
      <CardModal
        visible={visible}
        onCreate={onUpdate}
        onCancel={() => {
          setVisible(false)
        }}
        type='edit'
        fields={{ id: id, name: name, link: link, bucket: bucket }}
      />
      <VideoModal
        visible={vidModVisible}
        playing={playing}
        cardName={name}
        link={link}
        onCancel={() => {
          setPlaying(false)
          setVidModVisible(false)
        }}
      />
    </>
  )
}

export default CustomCard

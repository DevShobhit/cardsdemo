import { Modal } from 'antd'
import React from 'react'
import ReactPlayer from 'react-player'
import Frame from 'react-frame-component'

const VideoModal = ({ visible, playing, onCancel, cardName, link }) => {
  return (
    <>
      <Modal
        title={cardName}
        centered
        visible={visible}
        onCancel={onCancel}
        destroyOnClose
        width={'90%'}
        footer={null}
        style={{
          textAlign: 'center',
        }}
      >
        <Frame
          style={{
            width: '100%',
            height: '70vh',
            border: 'none',
          }}
        >
          <ReactPlayer
            url={link}
            playing={playing}
            controls={true}
            width='98vw'
            height='95vh'
          />
        </Frame>
      </Modal>
    </>
  )
}

export default VideoModal

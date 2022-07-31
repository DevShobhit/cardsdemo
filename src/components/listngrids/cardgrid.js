import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCards,
  removeSelectedCards,
} from '../../redux/actions/cardActions'
import { Row, Col, Skeleton, Empty, Checkbox, Button, Modal } from 'antd'
import { fetchBuckets } from '../../redux/actions/bucketActions'
import CustomCard from '../cards/customcard'
import { setSelectedCards } from '../../redux/actions/cardActions'
// Use encrypted method to use id

const CardGrid = () => {
  const allCards = useSelector((state) => state.cards)
  const dispatch = useDispatch()
  const [showDelete, setShowDelete] = useState(false)
  const [visible, setVisible] = useState(false)

  const samebucketcards = (cards) => {
    const bucket = cards[0].bucket
    return (
      cards.filter((card) => card.bucket === bucket).length === cards.length
    )
  }

  useEffect(
    () => async () => {
      dispatch(fetchCards())
      dispatch(fetchBuckets())
    },
    [dispatch]
  )

  const deleteCards = () => {
    const cards = allCards.selectedcards.map((card) => JSON.parse(card))
    samebucketcards(cards) && dispatch(removeSelectedCards(cards))
    samebucketcards(cards) || setVisible(true)
  }

  const onChange = (checkedValues) => {
    checkedValues.length === 1 && setShowDelete(true)
    checkedValues.length === 0 && setShowDelete(false)
    dispatch(setSelectedCards(checkedValues))
  }

  return (
    <>
      {!allCards.cards.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Checkbox.Group onChange={onChange} style={{ width: '100%' }}>
          {showDelete ? (
            <Button type='danger' onClick={deleteCards}>
              Delete
            </Button>
          ) : (
            ''
          )}
          <Row
            gutter={[
              16,
              {
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              },
            ]}
          >
            <Col className='gutter-row' span={6}>
              <Skeleton loading={allCards.loading} active />
            </Col>
            <Col className='gutter-row' span={6}>
              <Skeleton loading={allCards.loading} active />
            </Col>
            <Col className='gutter-row' span={6}>
              <Skeleton loading={allCards.loading} active />
            </Col>
            <Col className='gutter-row' span={6}>
              <Skeleton loading={allCards.loading} active />
            </Col>

            {allCards.cards.map((card) => (
              <Col
                className='gutter-row'
                key={card.name + `${Math.random()}`}
                span={6}
              >
                <CustomCard
                  id={card.id}
                  name={card.name}
                  bucket={card.bucket}
                  link={card.link}
                />
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      )}
      <Modal
        title='SELECT SAME BUCKET CARDS'
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <p>Try Selecting the Cards with Same buckets</p>
      </Modal>
    </>
  )
}

export default CardGrid

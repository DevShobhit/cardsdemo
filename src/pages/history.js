import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchHistory } from '../redux/actions/historyActions'
import { Table } from 'antd'

function History() {
  const dispatch = useDispatch()
  const history = useSelector((state) => state.history)

  const columns = [
    {
      title: 'Card Name',
      dataIndex: 'cardname',
      key: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
  ]

  useEffect(() => {
    dispatch(fetchHistory())
  }, [dispatch])

  return (
    <>
      <Table dataSource={history} columns={columns} />
    </>
  )
}

export default History

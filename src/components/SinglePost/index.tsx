import React from 'react'
import { useParams } from 'react-router'

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { loading, data } = useQuery
}
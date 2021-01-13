import React, { useEffect, useState } from 'react'
import { FollowerBadge } from './FollowerBadge'
import './Overlay.css'

type ChatEvent = {
  name: string
}

type Listener = 'follower'

type StreamEvent = {
  detail: {
    listener: string
    event: ChatEvent
  }
}

export const Overlay = () => {
  const [newFollower, setNewFollower] = useState<string | undefined>(undefined)
  const handlers = {
    follower: (event: ChatEvent) => {
      setNewFollower(event.name)
    }
  }

  useEffect(() => {
    const chatEventHandler = (e: any) => {
      const obj = e as StreamEvent
      if (!obj.detail.event) {
        return
      }
      const [listener] = obj.detail.listener.split('-')
      const event = obj.detail.event

      const handler = handlers[listener as Listener]
      if (handler) {
        handler(event)
      }
    }

    window.addEventListener('onEventReceived', chatEventHandler)
    return () => {
      window.removeEventListener('onEventReceived', chatEventHandler)
    }
  })

  useEffect(() => {
    if (!newFollower) {
      return
    }
    const timeout = setTimeout(() => setNewFollower(undefined), 2500)
    return () => {
      clearTimeout(timeout)
    }
  }, [newFollower])

  return (
    <div>
      <span>Follower</span>
      {newFollower ? <FollowerBadge nickname={newFollower} /> : null}
    </div>
  )
}

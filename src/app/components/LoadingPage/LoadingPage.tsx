/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createRef, forwardRef, useImperativeHandle, useState } from "react";
import './loading-page.scss';

interface LoadScreenProps {
  loading?: boolean
}
export interface LoadScreenHandle {
  show: () => void;
  off: () => void;
}

export class Loading {
  //@ts-ignore
  private static loadRef: React.RefObject<LoadScreenHandle> = createRef();
  static register(ref: React.RefObject<LoadScreenHandle>) {
    this.loadRef = ref
  }
  static show() {
    this.loadRef.current?.show()
  }
  static off() {
    this.loadRef.current?.off()
  }
}

export const LoadScreen = forwardRef<LoadScreenHandle, LoadScreenProps>((props, ref) => {
  const [loading, setLoading] = useState(false)
  useImperativeHandle(ref, () => ({
    show() {
      setLoading(true)
    },
    off() {
      setLoading(false)
    },
  }))
  return (
    (loading || props.loading) ?
      <div className="load-container">
        <span className="loader"></span>
      </div>
      :
      null
  )
})
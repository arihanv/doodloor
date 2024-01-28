import { useRef, useState } from "react"
import { ReactSketchCanvas } from "react-sketch-canvas"

type Props = {
  setImage: React.Dispatch<React.SetStateAction<any>>
}

export default function SketchBoard({ setImage }: Props) {
  const drawingCanvas = useRef(null)
  return (
    <div className="relative h-full">
      <ReactSketchCanvas
        backgroundImage="black"
        ref={drawingCanvas}
        strokeWidth={10}
        className="relative h-full !rounded-none !border-none bg-black/50"
        strokeColor="white"
      />
      <div className="absolute inset-0 -z-10 m-auto flex select-none items-center justify-center opacity-30">
        Draw Here
      </div>
      {/* { (
        <button
            className="!text-white"
          onClick={() => {
            if (drawingCanvas.current) {
              (drawingCanvas.current as any)
                .exportImage("png")
                .then((data: any) => {
                    setImage(data)
                })
                .catch((e: any) => {
                  console.log(e);
                });
            }
          }}
        >
          Get Image
        </button>
      )} */}
    </div>
  )
}

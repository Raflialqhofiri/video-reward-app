import { useRef } from "react"

export default function Home() {
  const videos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4"
  ]

  return (
    <div style={{
      height: "100vh",
      overflowY: "scroll",
      scrollSnapType: "y mandatory"
    }}>
      {videos.map((src, index) => (
        <div key={index} style={{
          height: "100vh",
          scrollSnapAlign: "start",
          position: "relative"
        }}>
          <video
            src={src}
            controls
            autoPlay
            loop
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
      ))}
    </div>
  )
}
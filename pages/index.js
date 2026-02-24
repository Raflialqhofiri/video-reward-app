import { useState } from "react"

export default function Home() {
  const [coins, setCoins] = useState(0)

  const videos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4"
  ]

  const claimReward = () => {
    setCoins(coins + 10)
  }

  return (
    <div style={{
      height: "100vh",
      overflowY: "scroll",
      scrollSnapType: "y mandatory",
      background: "#000",
      color: "#fff"
    }}>
      
      {/* Coin Display */}
      <div style={{
        position: "fixed",
        top: 10,
        right: 20,
        zIndex: 1000,
        fontSize: "18px",
        fontWeight: "bold"
      }}>
        💰 {coins} Coins
      </div>

      {videos.map((src, index) => (
        <div key={index} style={{
          height: "100vh",
          scrollSnapAlign: "start",
          position: "relative"
        }}>
          <video
            src={src}
            autoPlay
            loop
            controls
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

          <button
            onClick={claimReward}
            style={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "12px 20px",
              fontSize: "16px",
              background: "gold",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold"
            }}
          >
            Claim +10 Coins
          </button>
        </div>
      ))}
    </div>
  )
}
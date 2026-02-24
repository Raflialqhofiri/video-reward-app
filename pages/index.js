import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [coins, setCoins] = useState(0)
  const rewardedRef = useRef({}) // supaya tiap video cuma bisa reward sekali

  const videos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4"
  ]

  // Load coin
  useEffect(() => {
    const savedCoins = localStorage.getItem("coins")
    if (savedCoins) {
      setCoins(parseInt(savedCoins))
    }
  }, [])

  // Save coin
  useEffect(() => {
    localStorage.setItem("coins", coins)
  }, [coins])

  const handleTimeUpdate = (index, currentTime) => {
    if (currentTime >= 10 && !rewardedRef.current[index]) {
      setCoins(prev => prev + 10)
      rewardedRef.current[index] = true
      alert("🎉 You earned +10 coins!")
    }
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
            onTimeUpdate={(e) =>
              handleTimeUpdate(index, e.target.currentTime)
            }
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
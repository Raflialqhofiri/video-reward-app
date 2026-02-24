import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [coins, setCoins] = useState(0)
  const [canClaimDaily, setCanClaimDaily] = useState(false)
  const rewardedRef = useRef({})

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

    const lastClaim = localStorage.getItem("dailyClaim")
    const today = new Date().toDateString()

    if (lastClaim !== today) {
      setCanClaimDaily(true)
    }
  }, [])

  // Save coin
  useEffect(() => {
    localStorage.setItem("coins", coins)
  }, [coins])

  const claimDailyReward = () => {
    const today = new Date().toDateString()
    localStorage.setItem("dailyClaim", today)
    setCoins(prev => prev + 20)
    setCanClaimDaily(false)
    alert("🎉 Daily reward +20 coins!")
  }

  const handleTimeUpdate = (index, currentTime) => {
    if (currentTime >= 10 && !rewardedRef.current[index]) {
      setCoins(prev => prev + 10)
      rewardedRef.current[index] = true
      alert("🎬 +10 coins for watching!")
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

      {/* Daily Reward Button */}
      {canClaimDaily && (
        <button
          onClick={claimDailyReward}
          style={{
            position: "fixed",
            top: 50,
            right: 20,
            padding: "8px 12px",
            background: "orange",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold"
          }}
        >
          Claim Daily +20
        </button>
      )}

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
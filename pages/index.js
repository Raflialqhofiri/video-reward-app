import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [coins, setCoins] = useState(0)
  const [canClaimDaily, setCanClaimDaily] = useState(false)
  const [liked, setLiked] = useState({})
  const rewardedRef = useRef({})

  const videos = [
    {
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      username: "rewardhub",
      caption: "Earn coins while watching 🔥"
    },
    {
      url: "https://www.w3schools.com/html/movie.mp4",
      username: "creator",
      caption: "Daily rewards available 💎"
    }
  ]

  useEffect(() => {
    const savedCoins = localStorage.getItem("coins")
    if (savedCoins) setCoins(parseInt(savedCoins))

    const lastClaim = localStorage.getItem("dailyClaim")
    const today = new Date().toDateString()
    if (lastClaim !== today) setCanClaimDaily(true)
  }, [])

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

  const toggleLike = (index) => {
    setLiked(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
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
        top: 15,
        right: 20,
        zIndex: 1000,
        fontWeight: "bold"
      }}>
        💰 {coins}
      </div>

      {/* Daily Reward */}
      {canClaimDaily && (
        <button
          onClick={claimDailyReward}
          style={{
            position: "fixed",
            top: 50,
            right: 20,
            padding: "6px 10px",
            background: "orange",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold"
          }}
        >
          +20 Daily
        </button>
      )}

      {videos.map((video, index) => (
        <div key={index} style={{
          height: "100vh",
          scrollSnapAlign: "start",
          position: "relative"
        }}>
          <video
            src={video.url}
            autoPlay
            loop
            controls={false}
            onTimeUpdate={(e) =>
              handleTimeUpdate(index, e.target.currentTime)
            }
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

          {/* Sidebar */}
          <div style={{
            position: "absolute",
            right: 10,
            bottom: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            fontSize: 24
          }}>
            <div onClick={() => toggleLike(index)} style={{cursor:"pointer"}}>
              {liked[index] ? "❤️" : "🤍"}
            </div>
            <div>💬</div>
            <div>🔗</div>
          </div>

          {/* Caption */}
          <div style={{
            position: "absolute",
            bottom: 40,
            left: 10
          }}>
            <div style={{fontWeight:"bold"}}>@{video.username}</div>
            <div>{video.caption}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import InputField from '../components/InputField'

const Timer = ({}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let intervalId

    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else {
          if (minutes === 0 && hours === 0) {
            clearInterval(intervalId)
            setIsActive(false)
          } else {
            if (minutes === 0) {
              setHours((hours) => hours - 1)
              setMinutes(59)
            } else {
              setMinutes((minutes) => minutes - 1)
            }
            setSeconds(59)
          }
        }
      }, 1000)
    } else {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [isActive, hours, minutes, seconds])

  return (
    <div>
      {isEditing ? (
        <div className="flex justify-center">
          <div>
            <InputField
              label={'Hours'}
              value={hours}
              onChange={(e) => {
                setHours(e.target.value)
              }}
            />
            <InputField
              label={'Minutes'}
              value={minutes}
              onChange={(e) => {
                setMinutes(e.target.value)
              }}
            />
            <InputField
              label={'Seconds'}
              value={seconds}
              onChange={(e) => {
                setSeconds(e.target.value)
              }}
            />
            <button
              onClick={() => setIsEditing(false)}
              className="bg-blue-500 text-stone-200 px-20 py-1 rounded-xl text-lg mt-1 ml-1"
            >
              &#10004;
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            <h1 className="text-green-500 text-6xl">{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h1>
          </div>
          <div
            id="timer-buttons"
            className="text-stone-500 flex justify-center bg-opacity-10 rounded-xl"
          >
            {isActive ? (
              <>
                <button
                  onClick={() => setIsActive(false)}
                  className="start text-xl text-green-800 m-2 bg-black bg-opacity-100 font-bold px-2 py-1 rounded-xl"
                >
                  Pause
                </button>
                <button
                  onClick={() => {
                    setIsActive(false)
                    setHours(0)
                    setMinutes(1)
                    setSeconds(0)
                  }}
                  className="start text-xl text-red-800 m-2 bg-black bg-opacity-100 font-bold px-2 py-1 rounded-xl"
                >
                  Stop
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsActive(true)}
                  className="start text-3xl text-green-800 m-2"
                >
                  &#9654;
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="start text-3xl text-yellow-800 m-2"
                >
                  &#9998;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Timer

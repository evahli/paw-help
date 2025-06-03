import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'
import dayjs from 'dayjs'

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const getLocation = async (setLocation) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation([position.coords.latitude, position.coords.longitude])
        }, (error) => {
            console.log(error)
        })
    } else {
        console.log('Geolocation not supported')
    }
}

function App() {
    const [count, setCount] = useState(0)
    const [location, setLocation] = useState(null)

    useEffect(() => {
        getLocation(setLocation)
    }, [])

    return (
        <>
            <div className="flex justify-center items-center">
                <a
                    href="https://vite.dev"
                    target="_blank"
                >
                    <img
                        src={viteLogo}
                        className="logo"
                        alt="Vite logo"
                    />
                </a>
                <a
                    href="https://react.dev"
                    target="_blank"
                >
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>

            {location && ( // wait for location before rendering map
                <div style={{ width: '400px', height: '400px', margin: '0', border: '1px solid #000' }}>
                    <MapContainer
                        style={{ width: '100%', height: '100%' }}
                        center={location}
                        zoom={13}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={location}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            )}
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p>It is {dayjs().format('YYYY-MM-DD HH:mm:ss')}</p>
            <p>Location: {location?.latitude}, {location?.longitude}</p>
        </>
    )
}

export default App

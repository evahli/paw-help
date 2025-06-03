import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'
import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'


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

export const App = () => {
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

            {location ? ( // wait for location before rendering map
                <div
                    style={{
                        width: '400px',
                        height: '400px',
                        margin: '0',
                        border: '1px solid #000',
                    }}
                >
                    <MapContainer
                        style={{ width: '100%', height: '100%' }}
                        center={location}
                        zoom={13}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={location}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            ): <p> No location provided, map cannot be rendered</p>}
            <div className="card">
                <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-sm text-gray-500">
                    It is {dayjs().format('YYYY-MM-DD HH:mm:ss')}
                </span>
                <span className="text-sm text-gray-500">
                    Location: {location?.[0]}, {location?.[1]}
                </span>
                <div className="flex flex-row gap-1">
                    <a
                        href="tel:123456789"
                        className="bg-blue-600 text-white hover:bg-blue-500 rounded-md p-2"
                    >
                        Test Call
                    </a>
                    <a
                        href="https://maps.google.com/maps?daddr=50.081343,14.4253195"
                        className="bg-blue-600 text-white hover:bg-blue-500 rounded-md p-2"
                    >
                        Visit Apify
                    </a>
                    <Button>I am shadcn button</Button>
                </div>
            </div>
        </>
    )
}

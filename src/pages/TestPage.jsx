import { ClinicCard } from '@/components/custom/ClinicCard'
import data from '@/data/kliniky_data_sample.json'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { getClinicIcon } from '@/lib/categoryIcons'
import { isEmergencyClinic, isHomeVetClinic, isVetCareClinic } from '@/lib/categorySorting'
import { useEffect, useState } from 'react'

const getLocation = async (setLocation) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation([position.coords.latitude, position.coords.longitude])
            },
            (error) => {
                console.log(error)
            }
        )
    } else {
        console.log('Geolocation not supported')
    }
}

export const TestPage = () => {
    const [location, setLocation] = useState(null)

    useEffect(() => {
        getLocation(setLocation)
    }, [])
    return (
        <div className="w-screen h-screen relative">
            <div className='bg-white h-[10vh] w-full fixed top-0 z-20'>Header</div>
            {location && (
                <MapContainer
                    className="w-screen h-[90vh] fixed top-[10vh] z-0"
                    center={location}
                    zoom={13}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {data.map((item) => (
                        <Marker
                            position={[item.location.lat, item.location.lng]}
                            icon={getClinicIcon(item)}
                        >
                            <Popup>
                                {item.title} <br />
                                {isEmergencyClinic(item) && 'Emergency'}
                                {isHomeVetClinic(item) && 'Vyjezd'}
                                {isVetCareClinic(item) && 'Klinika'}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}
            <div className="absolute top-[90vh] w-full p-4">
                <div className="flex flex-col gap-2">
                    <ClinicCard variant="emergency" />
                    <ClinicCard variant="vetCare" />
                    <ClinicCard variant="homeCare" />
                    <ClinicCard variant="vetCare" />
                    <ClinicCard variant="homeCare" />
                    <ClinicCard variant="emergency" />
                    <ClinicCard variant="homeCare" />
                    <ClinicCard variant="emergency" />
                    <ClinicCard variant="homeCare" />
                    <ClinicCard variant="homeCare" />
                    <ClinicCard variant="homeCare" />
                    <ClinicCard variant="homeCare" />
                </div>
            </div>
        </div>
    )
}

import { ClinicCard } from '@/components/ClinicCard'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { getClinicIcon } from '@/lib/categoryIcons'
import { isEmergencyClinic, isHomeVetClinic, isVetCareClinic } from '@/lib/categorySorting'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useMapVariantData } from '@/lib/useMapVariantData'
import { getLocation } from '@/lib/location'






export const TestPage = () => {
    const [location, setLocation] = useState(null)
    const {mapVariantData} = useMapVariantData({variant: "homeCare"})
  
    useEffect(() => {
        getLocation(setLocation)
    }, [])

    const { data } = useQuery({
        queryKey: ['clinics'],
        queryFn: () =>
            fetch('https://api.apify.com/v2/datasets/A9Iwh31T14DnUBqgY/items').then((res) =>
                res.json()
            ),
    })

    return (
        <div className="w-screen h-screen relative">
            <div className="bg-white h-[10vh] w-full fixed top-0 z-20">Header</div>
            {location && data && (
                <MapContainer
                    className="w-screen h-[90vh] fixed top-[10vh] z-0"
                    center={[location.latitude, location.longitude]}
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
                  {data?.map(clinic => (
                    <ClinicCard
                        clinicData={clinic}
                        variant="vetCare"
                    />
                  ))}
                </div>
            </div>
        </div>
    )
}

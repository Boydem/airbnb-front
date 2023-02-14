import GoogleMapReact from 'google-map-react'
import { useEffect, useRef, useState } from 'react'
import { StayPreview } from './stay-preview'

export function Map({ stays, onSelectStay, onAddToWishlist }) {
    const apiKey = 'AIzaSyB_EGN1HMBcl7uYM0IBR2jGP3-SGW3pznk'
    const currencySign = '$'
    const defaultProps = {
        center: {
            lat: 37.7749,
            lng: -122.4194,
        },
        zoom: 2,
    }
    const markers = stays.map(stay => ({
        lat: stay.loc.lat,
        lng: stay.loc.lng,
        price: currencySign + stay.price.toLocaleString(),
    }))
    const [currStay, setCurrStay] = useState(null)
    const currMarked = useRef()

    function onMarkerClick(idx) {
        const stay = stays[idx]
        stay._id = idx
        setCurrStay(stay)
    }

    return (
        <div className='index-map full'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{ styles: mapStyles }}
            >
                {markers.map((marker, idx) => (
                    <div className='marker-container' key={'m' + idx} lat={marker.lat} lng={marker.lng}>
                        <div
                            ref={currStay?._id === idx ? currMarked : null}
                            onClick={() => onMarkerClick(idx)}
                            className={`marker ${currStay._id === idx ? 'active' : ''}`}
                        >
                            {marker.price}
                        </div>
                    </div>
                ))}
                {currStay && (
                    <div
                        lat={currStay.loc.lat}
                        lng={currStay.loc.lng}
                        style={{ left: `${currMarked?.current?.offsetWidth / 2 || 0}px` }}
                        className='map-stay-preview'
                    >
                        <StayPreview
                            onSelectStay={onSelectStay}
                            onAddToWishlist={onAddToWishlist}
                            stay={currStay}
                            mapView={true}
                        />
                    </div>
                )}
            </GoogleMapReact>
        </div>
    )
}

const mapStyles = [
    {
        featureType: 'administrative.land_parcel',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                lightness: 45,
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi.attraction',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'poi.business',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'poi.medical',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text',
        stylers: [
            {
                color: '#bae3c5',
            },
        ],
    },
    {
        featureType: 'poi.place_of_worship',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.local',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit.station.airport',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'transit.station.bus',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'transit.station.rail',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#b3e6f4',
            },
            {
                lightness: 5,
            },
            {
                visibility: 'on',
            },
        ],
    },
]

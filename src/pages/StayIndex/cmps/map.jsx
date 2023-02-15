import GoogleMapReact from 'google-map-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { StayPreview } from './stay-preview'

export function Map({ stays, onSelectStay, onAddToWishlist }) {
    // Map setup and data
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
        _id: stay._id,
    }))

    // Preview stay states and data
    const [stayToPreview, setStayToPreview] = useState(null)
    const [elSelectedMarker, setElCurrentMarker] = useState(null)
    const elPreviewContainer = useRef(null)
    const [isZoomDisabled, setIsZoomDisabled] = useState(false)

    const onRefChange = useCallback(
        markerNode => {
            if (markerNode !== null) {
                // Makrer ref changed and exists
                setElCurrentMarker(markerNode)
                return
            }
            // Else unmounted marker ref
        },
        [stayToPreview]
    )

    function handleMapClick(evProps) {
        setStayToPreview(null)
    }

    function mapOptions() {
        return {
            styles: mapStyles,
            disableDoubleClickZoom: isZoomDisabled ? true : false,
        }
    }

    // Preview methods
    function onMarkerClick(ev, idx) {
        ev.stopPropagation()
        const stay = stays[idx]
        setStayToPreview(stay)
    }

    function onPreviewClick(ev) {
        ev.stopPropagation()
    }

    function handlePreviewMouseEnter() {
        setIsZoomDisabled(true)
    }

    function handlePreviewMouseLeave() {
        setIsZoomDisabled(false)
    }

    function previewConrtainerStyles() {
        return {
            left: `${elSelectedMarker?.offsetWidth / 2}px`,
            visibility: `${stayToPreview ? 'visibile' : 'hidden'}`,
        }
    }

    return (
        <div className='index-map full'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={mapOptions()}
                onClick={handleMapClick}
            >
                {markers.map((marker, idx) => (
                    <div className='marker-container' key={'m' + idx} lat={marker.lat} lng={marker.lng}>
                        <div
                            onClick={ev => onMarkerClick(ev, idx)}
                            ref={stayToPreview?._id === marker._id ? onRefChange : null}
                            className={`marker ${stayToPreview?._id === marker._id ? 'active' : ''}`}
                        >
                            {marker.price}
                        </div>
                    </div>
                ))}
                <div
                    onClick={onPreviewClick}
                    lat={stayToPreview?.loc.lat}
                    lng={stayToPreview?.loc.lng}
                    ref={elPreviewContainer}
                    style={previewConrtainerStyles()}
                    className='map-stay-preview'
                    onMouseEnter={handlePreviewMouseEnter}
                    onMouseLeave={handlePreviewMouseLeave}
                >
                    {stayToPreview && (
                        <StayPreview
                            onSelectStay={onSelectStay}
                            onAddToWishlist={onAddToWishlist}
                            stay={stayToPreview}
                            mapView={true}
                        />
                    )}
                </div>
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

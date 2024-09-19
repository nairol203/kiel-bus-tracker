import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'KVG Bus Tracker',
        short_name: "KVG Bus Tracker",
        description: "KVG Bus Tracker ist eine moderne und benutzerfreundliche Drittanbieterlösung, mit der Sie Echtzeitabfahrten von Bussen der KVG einsehen können.",
        start_url: '/',
        display: 'standalone',
        background_color: '#dfeffc',
        theme_color: '#1887e2',
        icons: [
            {
                "src": "/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            },
        ],
    }
}
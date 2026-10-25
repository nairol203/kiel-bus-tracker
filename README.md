# KVG Bus Tracker

KVG Bus Tracker ist eine moderne und benutzerfreundliche Drittanbieterlösung, mit der man Echtzeitabfahrten von Bussen der KVG einsehen kann.

https://bus.zao.dev

## Self host

You can self host this project with docker. You can use the prebuilt images from the github container registry or built it yourself.

```bash
docker run -p 3000:3000 -e TZ=Europe/Berlin ghcr.io/nairol203/bus-tracker:main
```

## Development

### 1. Clone the repository

```bash
git clone https://github.com/nairol203/bus-tracker.git
cd bus-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

## Licence

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html).

# Kiel Bus Tracker

An Alternative Frontend for Kiel's Real-Time Bus Departures.

https://bus.zao.dev

## Self host

### Podman

You can self host this project with podman. You can use the prebuilt images from the github container registry or built it yourself.

```bash
podman run -p 3000:3000 -e TZ=Europe/Berlin ghcr.io/nairol203/kiel-bus-tracker:main
```

### Manual

#### 1. Clone the repository

```bash
git clone https://github.com/nairol203/kiel-bus-tracker.git
cd kiel-bus-tracker
```

#### 2. Install dependencies and build code

```bash
npm ci
npm run build
```

#### 3. Start the standalone server

```bash
node .next/standalone/server.js
```

## Development

### 1. Clone the repository

```bash
git clone https://github.com/nairol203/kiel-bus-tracker.git
cd kiel-bus-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

## License

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html).

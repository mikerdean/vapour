# vapour

`vapour` is a web interface plugin for Kodi designed for use primarily with mobile devices in mind (although other devices are also catered for).

## Installation

1. Download the addon from the [releases tab](https://github.com/mikerdean/vapour).
2. Enable `Settings > Addons > Unknown resources` in Kodi
3. Use `Addons > Install from zip` option within Kodi and select the downloaded zip file

## Other information

To use this addon you will need to enable the following options in Kodi:

1. Enable `Settings > Services > Control > Allow Remote Control via HTTP`
2. Enable `Settings > Services > Control > Allow Remote Control from applications on this system`

`vapour` will attempt to connect to the default ports:

- HTTP Port: `8080`
- TCP Port: `9090`

You can change the default ports and host names if Kodi fails to connect to the defaults.

# Development

This project is developed using:

- SolidJS
- Vite
- Vitest
- TailwindCSS
- ...along with many other utility libraries!

To hack on this repo, you can clone the repository and then:

```
yarn install
```

To run the development server you can use:

```
yarn start
```

This will start a `vite` development server which can be accessed at the details summarised in the console.

To run the suite of tests, you can run:

```
yarn test
```

All tests are setup using `vitest` and will start a watcher process.

For a better development experience with this repo, you can use [Volta](https://docs.volta.sh/guide/getting-started) to ensure nodeJS and yarn are the minimum versions tested with this repository.

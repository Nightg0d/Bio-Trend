# Bio Trend Energy

Responsive Bio Trend Energy website rebuilt from the supplied visual reference.

Public navigation uses separate routes: `/`, `/about`, `/solutions`, `/process`,
`/impact`, `/projects`, and `/contact`. The admin panel remains available at
`/admin`.

## Commands

```powershell
npm install
npm run dev
npm run build
```

Run `npm run qa:visual` while the development server is available at
`http://localhost:5173` to capture desktop and mobile checks with Microsoft Edge.

## Assets

Production-ready images and the compressed website film are in `public/assets`.
The untouched source video is preserved locally in `source-assets` and excluded
from Git and production builds because of its size.

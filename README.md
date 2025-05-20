# Lemon Hill Aikido Test Prep

This project contains a React component used to practice Aikikai test requirements. It is built with [Vite](https://vitejs.dev/) and [Tailwind CSS](https://tailwindcss.com/).

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173` by default.

## Testing

Run unit tests with:

```bash
npm test
```

## Copying Files into Wix Velo

Follow these steps to embed the component in a Wix Velo site:

1. Run `npm run build` to create the `dist` folder.
2. In your Wix site, enable **Dev Mode** to open the Velo editor.
3. From the left sidebar, click **Public** and create a new folder for your app.
4. Upload all files from the `dist` folder into this Wix folder.
5. Add an **iframe** element to the page where you want the component.
6. Set the iframe's source to the URL of your uploaded `index.html` file.
7. Publish your site to see the React component running inside Wix.


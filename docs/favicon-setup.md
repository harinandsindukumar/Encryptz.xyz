# Favicon Setup Instructions

To properly set up your logo as the favicon for Encryptz, please follow these steps:

## 1. Place Your Logo
First, place your actual `e-removebg-preview.png` file in the `public` directory.

## 2. Generate Favicon Files
You'll need to convert your PNG image to several different sizes and formats for proper favicon support:

- `favicon.ico` (16x16, 32x32, 48x48 - multi-size ICO file)
- `favicon-16x16.png` (16x16 PNG)
- `favicon-32x32.png` (32x32 PNG)
- `apple-touch-icon.png` (180x180 PNG)

### Recommended Tools:
1. **Favicon.io** - https://favicon.io/
2. **RealFaviconGenerator** - https://realfavicongenerator.net/
3. **Convertio** - https://convertio.co/png-ico/

### Steps:
1. Go to one of the above tools
2. Upload your `e-removebg-preview.png` file
3. Generate the favicon package
4. Replace the files in the `public` directory:
   - `favicon.ico`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png`

## 3. Update Header Logo (Optional)
If you want to use your logo as the site's header logo instead of the text "Encryptz", you can update the Header component in `src/components/Header.tsx`:

Replace the text link with an image:
```jsx
<Link href="/" className="flex items-center">
  <Image 
    src="/e-removebg-preview.png" 
    alt="Encryptz Logo"
    width={40}
    height={40}
    className="mr-2"
  />
  <span className="text-2xl font-bold text-indigo-600">Encryptz</span>
</Link>
```

Remember to import `Image` from 'next/image' if you choose this approach.

## 4. Verify Setup
After adding the favicon files, restart your development server to ensure the changes take effect.
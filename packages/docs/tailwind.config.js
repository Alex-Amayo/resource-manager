/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./index.html",
    // Include the resource-manager-ui package content
    "../resource-manager-ui/src/**/*.{ts,tsx}",
  ],
}
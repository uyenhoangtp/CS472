Brief Information:
    1. Frontend (React + TypeScript):
        - Fetch data from the backend: Axios
        - Interface using Tailwind CSS
        - State Management: use React Context API
        - React Router v6+
    2. Backend (Express + TypeScript):
        - Use Express middleware for requests and handling errors
        - Use APIs: return data in JSON format, error handling and ppropriate HTTP status codes.
        - API with good client and server-side validation.
    3. Well-structure folders for client and server.
    4. Proper use of version control: GitHub
    5. Bonus Features:
        - Integrate the backend with ChatGPT APIs
        - Deploy the frontend on a service: Vercel
        - Deploy the backend on a service: Render


Key Features:
    1. Product List page:
        - Each product has id, name, description, category, price, dateAdded, averageRating
        - Show 10 products per page
        - Pagination
        - Search by product name
        - Filter by category
    2. Reviews page:
        - Show Product short information, review list, create new review form.
        - Each review: edit, delete.
        - Create new Review
    3. Cross function:
        - Create new review and check the rating calculated on Product page.
    4. Use ChatGPT to summarize all reviews of each product.
    

Check out the website:
    - Go to webpage: https://review-product-amber.vercel.app
    - Please wait few minutes to load the page. (reason is the free versions of Vercel and Render used)

Setup at your local:
    1. Server:
        - Edit or add new ".env" to your own OPENAI_API_KEY of ChatGPT, following the instruction of ".env .example".
            Or please use the website: https://review-product-amber.vercel.app
        - Run commands below:
            - npm i && npm run build
            - npm start
            Then, Server running on http://localhost:3000
    2. Client: 
        - Edit or add new ".env" file to this: VITE_API_URL=https://review-product-backend.onrender.com or follow the ".env .example"
        - Run commands below
            - npm install
            - npm run dev
            Then, Local:   http://localhost:5173/

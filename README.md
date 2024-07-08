# This is a Node.js Backend Project using MySql as Database

  1. Create a Schema in MySql DB.
  2. Run "npm install" for installing dependencies.
  3. Run the server using "npm start".
  4. Sequlize will automatically create the Database tables.
  5. Create a CSV file with headers as - Serial Number,Product Name,Input Image Urls

# Create a .env File and add the following Details

    DB_NAME=Schema Name (Mysql)
    DB_USER=username (Mysql)
    DB_PASS=password (Mysql)
    DB_HOST=localhost

# Postman Publically Accessible Link for testing APIs

  https://www.postman.com/altimetry-explorer-28796365/workspace/personal-workspace/collection/26863653-2dae269f-1fbd-4233-adca-1dbd09f858f9?action=share&creator=26863653

# Working

  1. Upload a csv file with required data set, and run the first API, a "requestId" would be generated.
  2. Copy this requestId, and add as params in the Status check API to check the status (pending or complete).
  3. Add this requestId inside the body of Webhook API, and send the request in order to process the images to a 50% lower quality. This would in return generate new images and add their path in a new CSV file.


# BunnyCDN ImgBox

WARNING! DO NOT DEPLOY ON WEBSITE/SERVER! This app was intended for local-use, as such no authentication system is implemented. 

A BunnyCDN unofficial Web Interface to ease with image hosting (imgBox like). The idea is to directly upload image(s) and get the <img> link tag.

<img width="928" alt="image" src="https://github.com/Faralha/BunnyCDN-Upload-Hub/assets/69440085/9cf8e310-83e8-43ad-a440-2da32d9f95f9">


## Run Locally

Clone the project

```bash
  git clone https://github.com/Faralha/BunnyCDN-Upload-Hub.git
```

Go to the project directory

```bash
  cd BunnyCDN-Upload-Hub
```

Install dependencies

```bash
  npm install
```

Configure .env variables (explanations below)
```env
SECRET : 

REGION : 

STORAGE_API : 

STORAGE_NAME 
```

Start the server

```bash
  node .
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET` : any random letters will do

`REGION` : your Storage Zone main Region. (ex. SG for Singapore)

`STORAGE_API` : Storage API Keys/Password, NOT ACCOUNT API KEYS (keys differ with each Storage Zones.)

`STORAGE_NAME` : The name of Storage Zone which you will use

## Features

- Retrieve Folders
- Upload directly to Storage Zones
- Create links from uploaded files
- File Explore (coming soon)


## Authors

- [@faralha](https://www.github.com/faralha)


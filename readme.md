WARNING! DO NOT DEPLOY ON WEBSITE/SERVER! This app was intended for local-use, as such no authentication system is implemented. 

# BunnyCDN ImgBox

A BunnyCDN unofficial Web Interface to ease with image hosting (imgBox like). The idea is to directly upload image(s) and get the <img> link tag.


<img width="928" alt="Screenshot 2024-07-10 202953" src="https://github.com/Faralha/BunnyCDN-ImageBox/assets/69440085/130f60f7-817d-49e2-b55c-38890a531a3e">

<img width="929" alt="image" src="https://github.com/Faralha/BunnyCDN-ImageBox/assets/69440085/808f533f-29dd-405c-ac16-3f701e576607">


## Run Locally

Clone the project

```bash
  git clone https://github.com/Faralha/BunnyCDN-ImageBox.git
```

Go to the project directory

```bash
  cd BunnyCDN-ImageBox
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

STORAGE_NAME :

PULL_ZONES :
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

`PULL_ZONES` : Pull Zones which assigned to your Storage Zones


## Features

- Retrieve Folders
- Upload directly to Storage Zones
- Create links from uploaded files
- File Explore (coming soon)


## Authors

- [@faralha](https://www.github.com/faralha)


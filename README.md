# Discord-File-Manager

## Description

Small project to transfer large files between a local computer and a discord server by splitting them into encrypted 10 MB chunks.

Users can upload, delete, and download files from the client side of the application while the server side communicates to Discord via the Discord.js API.

I do not condone abusing Discord's services and API. This was purely a for fun project for me to finally get my hands on full-stack development.

## Installation and Usage

**Tested only on a Windows 10 environment.**

### Environment Setup

1. Install Node.js
2. Clone repo and enter directory

### Dotenv File Configuration

1. Open `.env.sample` file in `X:/path/to/project/server/samples`
2. Follow direction in file, modify as needed
3. Renamed copied file as `.env` and move outside of sample folder to `X:/path/to/project/server`

#### Encryption Key Creation

To generate values for the `Encryption_Key` and `Encryption_IV` variables:

You can use the python script `GenerateEncryptionKeys.py` in `X:/path/to/project/server` if you have python installed.

OR

Generate them through your own means.

### Building Project

Open two terminals of the project directory

#### First Terminal: Client Folder

In one of the terminals, enter client directory:

```bash
cd client
```

Download dependencies:

```bash
npm install
```

#### Second terminal: Server folder

In the other terminal, enter server directory

```bash
cd server
```

Download dependencies (Ignore low severity warnings if any):

```bash
npm install
```

### Running Project

In the client terminal, run:

```bash
npm run preview
```

In the server terminal, run

```bash
npm run start
```

In the client terminal, click the link (`http://localhost:5173/`) that appears. The project is now ready to be used.

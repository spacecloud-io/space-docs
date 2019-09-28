---
title: "File Storage"
date: 2019-09-21T08:13:24+05:30
draft: true
weight: 5
---

The file storage module allows you to manage files in your app on a scalable file storage technology (eg: Amazon S3) without having to write any backend code.

## Features

- Create a folder
- Upload/download a file
- List all files/folders within a folder
- Delete a file/folder

## Use cases

- Making a file management app (eg: Google Drive)
- File sharing in any social media app (eg: Facebook, Instagram)
- Pictures for product catalogues in ecommerce apps (eg: Amazon)


## Supported file storage technologies

You can select one of the following storage technologies for your project in Space Cloud:

- Amazon S3
- Google Cloud Storage
- Local file system

## Configuring file storage module

Open your project in `Mission Control` and head to the `File Storage` section.

**Enable** the file storage module.

**Select** a appropriate file storage technology for your project. The default is `Local File Storage`.

Then copy paste the **connection string** of the selected file storage and hit **Save**. 

This connection string is used by Space Cloud to connect to the selected file storage. In case of Local File Storage, connection string is the path of the folder where you want to store all your files.

> **Note:** Before you can actually use the file storage module from frontend, you will also have to [add security rules](todo).

## How it works

The file storage module provides REST APIs for file management.

Whenever the client makes request for any file operation (eg: upload), Space Cloud validates whether the request is authorized by applying the security rules provided in the Mission Control. 

If the request is authorized, Space Cloud makes a corresponding request to the selected file storage technology and returns the result to client. Else it returns a `401` or `403` error to client. 

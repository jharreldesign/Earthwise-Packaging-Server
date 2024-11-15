<!-- Here we can also have a image/banner of our project. Either a logo or just anything that gives the read me some flare -->

# EARTHWISE PACKAGING

## Project Description

Welcome to **Earthwise Packaging**, where we’re on a mission to help the food industry go green!
<br /> Our site offers eco-friendly essentials, from compostable cups to biodegradable utensils.
<br />Think of us as an eco-supplier, making it easy for businesses to browse, buy, and breathe easier knowing they’re reducing waste.
<br />Together, we’re packing up pollution and unboxing a greener future one compostable fork at a time!

## Table of Contents

<!-- We give a small & short introduction for what our site provides/does -->

### 📚 | The books is a clickable emoji, so you can redirect back to this list!

- **_[Tech Stack](#tech-stack)_**
- **_[How to Download & Run](#how-to-download--run-the-project)_**
- **_[Features](#features)_**
  - **_[End-Point Charts](#endpoints-chart)_**
  - **_[Portals](#portals)_**
  - **_[Models](#models)_**
  - **_[Product Ideas](#items-listed-for-now-idea)_**
- **_[Developers](#who-created-this-project)_**
- **_[Credits](#credits)_**
- **_[Project Planning](#project-planning)_**
  - **_[ERD](#erd-plan)_**
  - **_[Wireframe](#site-wireframe)_**
- **_[Stretch Goals](#stretch-goals)_**

## Tech Stack

##### [📚](#table-of-contents)

| Section       | Technology Used           |
| ------------- | ------------------------- |
| **Database:** | MongoDB                   |
| **Backend:**  | Node.js, Express, _&_ JWT |
| **Frontend:** | Axios, CSS, _&_ React     |

## How to Download & Run the Project

##### [📚](#table-of-contents)

<!-- Here we just show how any other developers want to download this project -->

### Prerequisites

1. Node.js v14+
2. npm v6+
3. MongoDB Account

### Fork & Clone

1. Clone the repository: `git clone https://github.com/<yourusername>/earthwise-packaging.git`
2. Navigate into the directory: `cd earthwise-packaging`
3. Install dependencies: `npm install`

### Starting the Development Server

1. Run `npm run dev` to launch the local server.
2. Visit `http://localhost:3000` in your browser to see the project.
3. It is advised to run **both** the **_Back End_** _&_ **_Front End_** Simiulatiously.

## Features

##### [📚](#table-of-contents)

<!-- Here we will list all features that the site will provide so like that we can list off the: AAUS (As a user stories)  -->

### Endpoints Chart

##### [📚](#table-of-contents)

#### Endpoint for Users/Customers

| HTTP Method | URI                    | Description                                        | Is it an _MVP_? |
| ----------- | ---------------------- | -------------------------------------------------- | --------------- |
| `GET:`      | `/products`            | **Get** all `Products`                             | _Yes_           |
| `GET(ID):`  | `/products/:productId` | **Get** a single `Product`                         | _Yes_           |
| `GET:`      | `/cart`                | **Get** all `Products` inside the cart             | **_No_**        |
| `PUT:`      | `/cart/:CardId`        | **Update** a single `Product` amount from the cart | **_No_**        |
| `DELETE:`   | `/cart/:cartId`        | **Delete** a single `Product` from the cart        | **_No_**        |

#### Endpoints for Admins

| HTTP Method | URI                    | Description                                        | Is it an _MVP_? |
| ----------- | ---------------------- | -------------------------------------------------- | --------------- |
| `POST:`     | `/products`            | **Create** a `Product` listing into the data base  | _Yes_           |
| `PUT:`      | `/products/:productId` | **Update** a single `Product` from the data base   | _Yes_           |
| `DELETE:`   | `/products/:productId` | **Delete** a single `Product` from the data base   | _Yes_           |
| `PUT:`      | `/cart/:CardId`        | **Update** a single `Product` amount from the cart | **_No_**        |
| `DELETE:`   | `/cart/:cartId`        | **Delete** a single `Product` from the cart        | **_No_**        |

### Portals

##### [📚](#table-of-contents)

- Customer Only Portal/Access -> MVP
- Admin Only Portal/Access -> Post MVP

### Models

##### [📚](#table-of-contents)

---

#### 1. User/Customer Model

| Tag Name               | Syntax     | _Required_? |
| ---------------------- | ---------- | ----------- |
| `Email:`               | **String** | _Yes_       |
| `Full-Address:`        | **String** | _Yes_       |
| `Name:`                | **String** | _Yes_       |
| `Password:`            | **String** | _Yes_       |
| `Payment-Information:` | **String** | _Yes_       |
| `Company-Name:`        | **String** | **_No_**    |
| `Username:`            | **String** | **_No_**    |
| `Phone-Number:`        | **Number** | _Yes_       |

#### 2. Inventory/Product Options

| Tag Name                        | Syntax                 | _Required_? |
| ------------------------------- | ---------------------- | ----------- |
| `Product-Description:`          | **String**             | _Yes_       |
| `Product-Image:`                | **String**             | _Yes_       |
| `Product-Name:`                 | **String**             | _Yes_       |
| `Product-Quick-Facts:`          | **String**             | **_No_**    |
| `Reviews:`                      | **String (_Embeded_)** | **_No_**    |
| `In-Stock-Status:`              | **Number**             | _Yes_       |
| `Product-Price:`                | **Number**             | _Yes_       |
| `Product-SKU/Manufacturer-SKU:` | **Number**             | _Yes_       |
| `Quantity:`                     | **Number**             | _Yes_       |

---

### Items listed for now (_idea_)

##### [📚](#table-of-contents)

| Category                  | Products                                                                |
| ------------------------- | ----------------------------------------------------------------------- |
| `Food & Eating Supplies:` | Plates, Straws, Utensils, & Cups (hot, cold, & multiple sizes)          |
| `Kitchen Essentials:`     | Catering boxes/items, Liner sheets, To-go containers, & Carry-out boxes |

<!-- Decided to remove the rest and comment them just in case if we want to add them later but for now. I think I'll leave the first four. -->

<!--
| | paper bags, Kitchen hardware (spatulas, knives), Eco-friendly tape, |
| | Food trays, Trash bags, & lastly Gloves                             |
-->

## Who created this Project?

##### [📚](#table-of-contents)

| Developers | _What Part?_                 |
| ---------- | ---------------------------- |
| `Jason:`   | **Back** _&_ **Front** - End |
| `Jessica:` | **Back** _&_ **Front** - End |
| `Pedro:`   | CSS _&_ **Front** - End      |

## Credits

##### [📚](#table-of-contents)

<!-- Having credits is optional but it's good practice to give credits to other developers for using their code/product/or anything else that should be credited to them. -->

- Big thanks to _The Git Guild_ on the idea of setting up this Read me. <br /> _Socials:_ **[Youtube](https://www.youtube.com/watch?v=a8CwpGARAsQ)**

- Better ToC (Table of Contents) format, but also no page lag. Thanks to the Stack Overflow forums! <br /> **[Stack Overflow](https://stackoverflow.com/questions/11948245/markdown-to-create-pages-and-table-of-contents)**

## Stretch Goals

##### [📚](#table-of-contents)

| By who?     | _On what exactly_?                                                    | _Where_?                   |
| ----------- | --------------------------------------------------------------------- | -------------------------- |
| `Pedro:`    | The ability of the site prefetching data before the user even clicks. | **Front** End              |
| `Jason:`    | Shipping options with shipping progress.                              | **Back** End               |
| `Everyone:` | Being able to implement a search/filter feature.                      | **Back** _&_ **Front** End |

<div style="width:25%; margin: auto;">
  <img src="./assets/Site-Logo/favicon.ico" width="100px" alt="earthwise-packaging-logo">
</div>

# EARTHWISE PACKAGING (Back-End)

## Greetings

Welcome to the **Earthwise Packaging (Back-End)**!
<br/>I see you're a _curios_ one.
<br/>Fear not you are free to explore our **back-end** space!
<br/>You can _fork_ and add onto our project on your side or use this as a template!


## Table of Contents

### [📚](#table-of-contents) | The books is a clickable emoji, so you can redirect back to this list!

- [Tech Stack](#tech-stack)
- [Front End](#front-end-repo)
- [How to Download & Run the Project](#how-to-download--run-the-project)
- [Endpoints Chart](#endpoints-chart)
- [Portals](#portals)
- [Models](#models)
- [Who created this back-end?](#who-created-this-back-end)
- [Project backlog](#project-backlog)
- [Stretch Goals](#stretch-goals)

## Tech Stack

### [📚](#table-of-contents)

| Section       | Technology Used           |
| ------------- | ------------------------- |
| **Database:** | MongoDB                   |
| **Backend:**  | Node.js, Express, _&_ JWT |

## Front end repo

### [📚](#table-of-contents)

- [Front end](https://github.com/PedroCr05/earthwise-front-end)

- [Deployment Site](https://earthwisepackaging-ca248d6888bb.herokuapp.com/)

## How to Download & Run the Project

### [📚](#table-of-contents)

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

## Endpoints Chart

### [📚](#table-of-contents)

#### Endpoint for Users/Customers

| HTTP Method | URI                    | Description                                        | Is it an _MVP_? |
| ----------- | ---------------------- | -------------------------------------------------- | --------------- |
| `GET:`      | `/products`            | **Get** all `Products`                             | _Yes_           |
| `GET(ID):`  | `/products/:productId` | **Get** a single `Product`                         | _Yes_           |
| `GET:`      | `/cart`                | **Get** all `Products` inside the cart             | **_No_**        |
| `PUT:`      | `/cart/:cardId`        | **Update** a single `Product` amount from the cart | **_No_**        |
| `DELETE:`   | `/cart/:cartId`        | **Delete** a single `Product` from the cart        | **_No_**        |

#### Endpoints for Admins

| HTTP Method | URI                    | Description                                        | Is it an _MVP_? |
| ----------- | ---------------------- | -------------------------------------------------- | --------------- |
| `POST:`     | `/products`            | **Create** a `Product` listing into the data base  | _Yes_           |
| `PUT:`      | `/products/:productId` | **Update** a single `Product` from the data base   | _Yes_           |
| `DELETE:`   | `/products/:productId` | **Delete** a single `Product` from the data base   | _Yes_           |
| `PUT:`      | `/cart/:cardId`        | **Update** a single `Product` amount from the cart | **_No_**        |
| `DELETE:`   | `/cart/:cartId`        | **Delete** a single `Product` from the cart        | **_No_**        |

## Portals

### [📚](#table-of-contents)

- Customer Only Portal/Access -> MVP
- Admin Only Portal/Access -> Post MVP

## Models

### [📚](#table-of-contents)

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

| Tag Name                        | Syntax                  | _Required_? |
| ------------------------------- | ----------------------- | ----------- |
| `Product-Description:`          | **String**              | _Yes_       |
| `Product-Image:`                | **String**              | _Yes_       |
| `Product-Name:`                 | **String**              | _Yes_       |
| `Product-Quick-Facts:`          | **String**              | **_No_**    |
| `Reviews:`                      | **String (_Embedded_)** | **_No_**    |
| `In-Stock-Status:`              | **Number**              | _Yes_       |
| `Product-Price:`                | **Number**              | _Yes_       |
| `Product-SKU/Manufacturer-SKU:` | **Number**              | _Yes_       |
| `Quantity:`                     | **Number**              | _Yes_       |

### Items listed for our products

### [📚](#table-of-contents)

| Category                  | Products                                                                |
| ------------------------- | ----------------------------------------------------------------------- |
| `Food & Eating Supplies:` | Plates, Straws, Utensils, & Cups (hot, cold, & multiple sizes)          |
| `Kitchen Essentials:`     | Catering boxes/items, Liner sheets, To-go containers, & Carry-out boxes |

## Who created this back-end?

### [📚](#table-of-contents)

| Developers | Did they work on this repo? |
| ---------- | --------------------------- |
| `Jason:`   | [X]                         |
| `Jessica:` | [X]                         |
| `Pedro:`   | []                          |

## Project Backlog

##### [📚](#table-of-contents)

### [▶](https://github.com/users/jharreldesign/projects/1) Kanban/Back Logs

## Stretch Goals

##### [📚](#table-of-contents)

| By who?     | _On what exactly_?                               | _Where_?                   |
| ----------- | ------------------------------------------------ | -------------------------- |
| `Jason:`    | Shipping options with shipping progress.         | **Back** End               |
| `Everyone:` | Being able to implement a search/filter feature. | **Back** _&_ **Front** End |
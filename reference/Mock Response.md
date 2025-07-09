---
title: Mock Response

---

### 📄 Mock Response


---

### 🔐 Headers

All endpoints require the following header:

```http
Authorization: Bearer {token}
```

---
### 📄 Inventory API


#### 🔹 GET `/api/v1/inventory`

**Mock Response:**

```json
[
  {
    "id": 1,
    "project": {
      "id": 1,
      "name": "Testing project"
    },
    "item_code": 123,
    "item_name": "Steel Rod",
    "category": "Construction Material",
    "in_stock": true,
    "unit": 12,
    "reorder_level": 10,
    "last_update": "2022-02-02"
  },
  {
    "id": 2,
    "project": {
      "id": 2,
      "name": "Bridge Build"
    },
    "item_code": 124,
    "item_name": "Cement Bag",
    "category": "Building Supplies",
    "in_stock": false,
    "unit": 50,
    "reorder_level": 25,
    "last_update": "2022-03-15"
  }
]
```

---

#### 🔹 POST `/api/v1/inventory/create`

**Request Body:**

```json
{
  "project": 1,
  "item_code": 125,
  "item_name": "Bricks",
  "category": 3,
  "unit": 100,
  "reorder_level": 40
}
```

**Mock Response:**

```json
[
  {
    "id": 3,
    "project": {
      "id": 1,
      "name": "Testing project"
    },
    "item_code": 125,
    "item_name": "Bricks",
    "category": "Masonry",
    "in_stock": true,
    "unit": 100,
    "reorder_level": 40,
    "last_update": "2022-07-07"
  }
]
```


#### 🔹 PUT `/api/v1/inventory/edit/<int:id>`

**Request Body:**

```json
{
  "project": 1,
  "item_code": 125,
  "item_name": "Bricks",
  "category": 3,
  "unit": 100,
  "reorder_level": 40
}
```

**Mock Response:**

```json
[
  {
    "id": 3,
    "project": {
      "id": 1,
      "name": "Testing project"
    },
    "item_code": 125,
    "item_name": "Bricks",
    "category": "Masonry",
    "in_stock": true,
    "unit": 100,
    "reorder_level": 40,
    "last_update": "2022-07-07"
  }
]
```


#### 🔹 Delete `/api/v1/inventory/delete/<int:id>`

**Request Body:**
```jsonld!
{
    "message":"Successfully deleted"
}
```

### 📄 Project API
#### 🔹 GET `/api/v1/project`

**Mock Response:**

```json
[
  {
    "id": 1,
    "name":str,
    "description":str,
    "created_at":datetime,
    "started_at":datetime, 
  }
]
```

---

#### 🔹 POST `/api/v1/project/create`

**Request Body:**

```json
{
  "name":str,
  "description":str,
  "started_at":datetime, 
}
```


#### 🔹 POST `/api/v1/project/edit/1`

**Request Body:**

```json
{
  "name":str,
  "description":str,
  "started_at":datetime, 
}
```

#### 🔹 Delete `/api/v1/project/delete/<int:id>`

**Request Body:**
```jsonld!
{
    "message":"Successfully deleted"
}
```


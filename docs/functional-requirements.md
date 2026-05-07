# Functional Requirements

## Overview

This document defines the core functional requirements for the TODO application, a full-stack web app with a React frontend and a Node.js/Express backend.

---

## FR-1: View TODO Items

**Description:** The user shall be able to view a list of all existing TODO items.

- The application loads and displays all items from the backend on page load.
- Each item displays its name and a way to interact with it (e.g., delete).
- A loading indicator is shown while data is being fetched.
- An error message is shown if the fetch fails.

---

## FR-2: Add a TODO Item

**Description:** The user shall be able to add a new TODO item.

- The UI provides a text input and a submit button to add a new item.
- The item name must be a non-empty string.
- On successful submission, the new item is immediately visible in the list without a full page reload.
- An error message is displayed if the item cannot be added.

---

## FR-3: Delete a TODO Item

**Description:** The user shall be able to delete an existing TODO item.

- Each item in the list has a delete action.
- On deletion, the item is immediately removed from the list without a full page reload.
- The backend validates that the item exists before deletion; a 404 response is returned if it does not.
- An error message is displayed if the deletion fails.

---

## FR-4: Persist TODO Items

**Description:** TODO items shall be persisted in a database on the backend.

- Items are stored in a SQLite database managed by the backend server.
- Each item has a unique ID, a name, and a creation timestamp.
- Item names must not be empty; the backend validates and rejects invalid input with a 400 response.

---

## FR-5: API Health Check

**Description:** The backend shall expose a health check endpoint.

- A `GET /` endpoint returns a 200 status and a JSON body indicating the server is running.
- This endpoint can be used to verify the backend is available.

---

## API Summary

| Method | Endpoint          | Description               |
|--------|-------------------|---------------------------|
| GET    | `/`               | Health check              |
| GET    | `/api/items`      | Retrieve all TODO items   |
| POST   | `/api/items`      | Create a new TODO item    |
| DELETE | `/api/items/:id`  | Delete a TODO item by ID  |

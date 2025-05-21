from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_login_success():
    response = client.post("/token", data={"username": "admin", "password": "password"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_script_crud():
    token_resp = client.post("/token", data={"username": "admin", "password": "password"})
    token = token_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Create
    resp = client.post("/scripts", json={"name": "test script", "content": "print('hi')"}, headers=headers)
    assert resp.status_code == 200
    script_id = resp.json()["id"]

    # List
    resp = client.get("/scripts", headers=headers)
    assert resp.status_code == 200
    assert any(s["id"] == script_id for s in resp.json())

    # Update
    resp = client.put(f"/scripts/{script_id}", json={"content": "print('hello')"}, headers=headers)
    assert resp.status_code == 200
    assert resp.json()["content"] == "print('hello')"

    # Delete
    resp = client.delete(f"/scripts/{script_id}", headers=headers)
    assert resp.status_code == 200

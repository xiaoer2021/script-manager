from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from app.auth import authenticate_user, create_access_token, get_current_user
from datetime import timedelta

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scripts_db = {}

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="用户名或密码错误")
    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=timedelta(minutes=60)
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/scripts")
async def list_scripts(current_user=Depends(get_current_user)):
    return list(scripts_db.values())

@app.post("/scripts")
async def create_script(script: dict, current_user=Depends(get_current_user)):
    script_id = len(scripts_db) + 1
    script["id"] = script_id
    scripts_db[script_id] = script
    return script

@app.put("/scripts/{script_id}")
async def update_script(script_id: int, script: dict, current_user=Depends(get_current_user)):
    if script_id not in scripts_db:
        raise HTTPException(status_code=404, detail="脚本不存在")
    scripts_db[script_id].update(script)
    return scripts_db[script_id]

@app.delete("/scripts/{script_id}")
async def delete_script(script_id: int, current_user=Depends(get_current_user)):
    if script_id not in scripts_db:
        raise HTTPException(status_code=404, detail="脚本不存在")
    del scripts_db[script_id]
    return {"detail": "删除成功"}

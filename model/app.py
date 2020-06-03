import os

import uvicorn
from aitextgen import aitextgen
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
ai = aitextgen()
ai.quantize()


class RootBody(BaseModel):
    prefix: str = ""
    max_length: int = 1024


app.add_middleware(CORSMiddleware, allow_origins=["*"])


@app.post("/")
async def root(body: RootBody):
    result: str = ai.generate_one(
        prompt=body.prefix, max_length=body.max_length, temperature=0.7, top_p=0.9, repetition_penalty=1.2, cleanup=False
    )

    return {"text": result}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

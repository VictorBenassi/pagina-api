from fastapi import FastAPI
from fastapi.params import Header, Body

from Services.WebCrawler import WebCrawler

app = FastAPI()


@app.get("generate_slide")
async def root():
    return {"message": "To check documentation go to /docs"}

@app.post("/generate_slide")
async def generateSlide(
        slideDescription
):
    return WebCrawler().Begin(str(slideDescription))

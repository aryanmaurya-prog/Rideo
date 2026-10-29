from fastapi import APIRouter

router = APIRouter()


@router.get("")
def list_insights() -> dict[str, list[str]]:
    return {"insights": []}

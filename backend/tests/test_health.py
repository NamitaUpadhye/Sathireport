import os
import sys
import asyncio

# Ensure parent directory is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import httpx
from app.main import app


async def run_tests():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        # Test Root
        res_root = await client.get("/")
        assert res_root.status_code == 200, f"Expected 200, got {res_root.status_code}"
        assert "ReportSaathi" in res_root.json()["message"]
        print("✓ Root endpoint test passed")

        # Test Health
        res_health = await client.get("/api/health")
        assert res_health.status_code == 200, f"Expected 200, got {res_health.status_code}"
        data = res_health.json()
        assert data["status"] == "healthy"
        assert data["services"]["tesseract_ocr"]["available"] is True
        print("✓ Health endpoint test passed:", data["services"])

    print("\nAll baseline tests passed successfully!")


if __name__ == "__main__":
    asyncio.run(run_tests())

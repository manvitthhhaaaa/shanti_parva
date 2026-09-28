import requests
import json

BASE_URL = "http://127.0.0.1:8000/api"

TEST_QUERIES = [
    "I am struggling with anger.",
    "I don't know what my responsibility is.",
    "I am afraid of failure.",
    "I am dealing with conflict.",
    "I have to make a difficult decision."
]

def run_tests():
    print("=== SHANTI AI RAG PIPELINE TEST SUITE ===")
    
    # 1. Health check
    try:
        h = requests.get(f"{BASE_URL}/health", timeout=5).json()
        print(f"[OK] Backend Health Status: {h.get('status')} ({h.get('system')})")
    except Exception as e:
        print(f"[ERROR] Backend Health Check Failed: {e}")
        return

    # 2. Test 5 queries
    for idx, query in enumerate(TEST_QUERIES, 1):
        print(f"\n--------------------------------------------------")
        print(f"TEST {idx}: '{query}'")
        try:
            res = requests.post(f"{BASE_URL}/chat", json={"message": query, "use_live_api": False}, timeout=5)
            if res.status_code == 200:
                data = res.json()
                print(f"  Themes Detected     : {data.get('themes')}")
                print(f"  Concern Summary     : {data.get('user_concern_summary')}")
                if data.get('sources'):
                    source = data['sources'][0]
                    print(f"  Retrieved Source ID : {source.get('id')}")
                    print(f"  Part & Section      : {source.get('part')} - {source.get('section')}")
                    print(f"  Source URL          : {source.get('source_url')}")
                    print(f"  Translation         : \"{source.get('translation')[:80]}...\"")
                print(f"  Teaching Meaning    : {data.get('teaching_explanation')[:90]}...")
                print(f"  Modern Perspective  : {data.get('modern_perspective')[:90]}...")
                print(f"  Reflection Questions: {len(data.get('reflection_questions', []))} generated")
                print(f"  Demo Mode Flag      : {data.get('is_demo_mode')}")
                print(f"[PASSED] TEST {idx} OK")
            else:
                print(f"[FAILED] TEST {idx} status code {res.status_code}")
        except Exception as e:
            print(f"[ERROR] TEST {idx}: {e}")

if __name__ == "__main__":
    run_tests()

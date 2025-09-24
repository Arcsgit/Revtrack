#!/usr/bin/env python3
"""
Test script to verify that all Python dependencies are properly installed
and the scraping environment is working correctly.
"""

import sys
import json

def test_imports():
    """Test that all required packages can be imported."""
    try:
        import playwright
        print("✅ Playwright imported successfully")
    except ImportError as e:
        print(f"❌ Failed to import Playwright: {e}")
        return False
    
    try:
        import requests
        print("✅ Requests imported successfully")
    except ImportError as e:
        print(f"❌ Failed to import Requests: {e}")
        return False
    
    try:
        from bs4 import BeautifulSoup
        print("✅ BeautifulSoup imported successfully")
    except ImportError as e:
        print(f"❌ Failed to import BeautifulSoup: {e}")
        return False
    
    return True

def test_playwright_browsers():
    """Test that Playwright browsers are installed."""
    try:
        from playwright.sync_api import sync_playwright
        
        with sync_playwright() as p:
            # Test if Chromium is available
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto("https://example.com")
            title = page.title()
            browser.close()
            
            if title:
                print("✅ Playwright browser test successful")
                return True
            else:
                print("❌ Playwright browser test failed - no title retrieved")
                return False
                
    except Exception as e:
        print(f"❌ Playwright browser test failed: {e}")
        return False

def test_network_connectivity():
    """Test basic network connectivity."""
    try:
        import requests
        response = requests.get("https://httpbin.org/json", timeout=10)
        if response.status_code == 200:
            print("✅ Network connectivity test successful")
            return True
        else:
            print(f"❌ Network connectivity test failed - status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Network connectivity test failed: {e}")
        return False

def main():
    """Run all tests."""
    print("🧪 Testing RevTrack Python Environment")
    print("=" * 40)
    
    tests_passed = 0
    total_tests = 3
    
    print("\n1. Testing Python package imports...")
    if test_imports():
        tests_passed += 1
    
    print("\n2. Testing Playwright browser setup...")
    if test_playwright_browsers():
        tests_passed += 1
    
    print("\n3. Testing network connectivity...")
    if test_network_connectivity():
        tests_passed += 1
    
    print("\n" + "=" * 40)
    print(f"Tests completed: {tests_passed}/{total_tests} passed")
    
    if tests_passed == total_tests:
        print("🎉 All tests passed! Your environment is ready for RevTrack.")
        return True
    else:
        print("⚠️  Some tests failed. Please check the errors above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
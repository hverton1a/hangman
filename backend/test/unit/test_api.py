import unittest
import requests

class Test(unittest.TestCase):
    def test_health_check_endpoint_response_200(self):
        result = requests.get('http://localhost:5000')
        self.assertEqual(result.status_code,200)
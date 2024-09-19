import json

class Utils:
    @staticmethod
    def GetCredentials() -> dict:
        with open(r'Data/appConfig.json', 'r') as file:
            jsonString = file.read()
            return json.loads(jsonString)
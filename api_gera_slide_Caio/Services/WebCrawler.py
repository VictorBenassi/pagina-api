#project imports
from Services.Utils import Utils
#python imports
import requests
import time
import os
import json
#selenium Imports
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


class WebCrawler:
    def __init__(self):
        self.utils = Utils()
        self.credentialDict = self.utils.GetCredentials()
        self.initialUrl = 'https://gamma.app/create/generate'
        self.userName = self.credentialDict['username']
        self.password = self.credentialDict['password']
        self.driver = Service(ChromeDriverManager().install())
        #initializing Options
        self.driverOptions = webdriver.ChromeOptions()
        self.driverOptions.add_argument('--headless')
        self.driverOptions.add_argument('--disable-gpu')
        self.driverOptions.add_argument('--start-maximized')
        self.driverOptions.add_argument('--disable-dev-shm-usage')
        self.driverOptions.add_argument('--no-sandbox')
        self.driverOptions.add_argument('--private')
        self.driverOptions.add_argument('—-disk-cache-size=0')
        #Initializing Browser
        self.browser = webdriver.Chrome(service=self.driver, options=self.driverOptions)

    def waitWebObject(self, by_element, element_value):
        try:
            element_present = EC.presence_of_element_located((by_element, element_value))
            WebDriverWait(self.browser, 10).until(element_present)
        except Exception as e:
            print(e)
            time.sleep(0.5)

    def UsageExample(self):
        # remember that you can choose any By element in the first parameter of the functions that use By.
        byList = [By.CLASS_NAME, By.XPATH, By.TAG_NAME, By.ID, By.NAME, By.CSS_SELECTOR, By.LINK_TEXT]#etc...
        #retrive data from page element
        retrieveText = self.browser.find_element(By.XPATH, 'xpto').text
        #click on something in the page example
        self.browser.find_element(By.CLASS_NAME, 'a-button-inner').click()
        # get more than one element(like a table if needed)
        getElements = self.browser.find_elements(By.TAG_NAME, "tr")
        #get specific value from inside a page element
        self.browser.find_element(By.XPATH, 'xpath_to_element').get_attribute("innerHTML")
        #remove attribute from page example
        div = self.browser.find_element(By.ID, 'feedback-button')
        self.browser.execute_script("arguments[0].remove()", div)

    def Login(self):
        self.browser.find_element(By.ID, 'email').send_keys(self.userName)
        self.browser.find_element(By.ID, 'password').send_keys(self.password)
        self.browser.find_element(By.XPATH, "//button[contains(text(), 'Sign in')]").click()
        self.waitWebObject(By.XPATH, "//input[@placeholder='Describe what you'd like to make']")

    def GenerateSlide(self, slideDescription: str):
        self.browser.refresh()
        self.browser.get(self.initialUrl)
        self.waitWebObject(By.XPATH, "//input[@placeholder='Describe what you'd like to make']")
        self.browser.find_element(By.XPATH,
                                  "//input[@placeholder='Describe what you'd like to make']").send_keys(slideDescription)
        self.browser.find_element(By.XPATH, "//button[contains(text(), 'Generate outline')]").click()

    def Begin(self, slideDescription: str):
        self.browser.get(self.initialUrl)
        self.browser.maximize_window()
        self.browser.refresh()
        self.Login()
        self.GenerateSlide(slideDescription)






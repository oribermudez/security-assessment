# Totally Secure Math App Security Assessment and Improvements

By Ori Bermudez

## Introduction
The Totally Secure Math app is designed to help users store and evaluate mathematical equations securely. However, like any software application, it may contain vulnerabilities that could compromise its security. In this assessment, we focus on identifying and addressing vulnerabilities related to insecure data storage, improper authentication, code injection, insufficient input validation, and insecure code practices.

## Vulnerability Assessment

### 1. Insecure Data Storage
#### Description
The app stores sensitive user data, such as passwords, without adequate encryption, exposing it to potential unauthorized access.
#### Risks
This vulnerability could lead to data breaches, exposing user passwords and other sensitive information to malicious actors.

### 2. Improper Authentication
#### Description
The app employs simplistic username/password authentication without supplementary security measures like multi-factor authentication, making it vulnerable to brute force attacks or credential stuffing.
#### Risks
Improper authentication increases the risk of unauthorized access, allowing attackers to compromise user accounts and potentially steal sensitive data.

### 3. Code Injection
#### Description
The utilization of the eval() function in the Note component facilitates arbitrary code execution, opening the door to code injection attacks.
#### Risks
Code injection vulnerabilities can enable attackers to execute malicious code within the app's context[1], leading to unauthorized actions, data manipulation, or even complete compromise of the application's security.

### 4. Insufficient Input Validation
#### Description
The app lacks robust input validation, permitting users to input malicious code or unexpected data, which may result in security vulnerabilities.
#### Risks
Insufficient input validation increases the likelihood of code injection, data corruption, or unexpected behavior[2], potentially exposing the application to exploitation by malicious actors.

### 5. Insecure Code Practices
#### Description
Hardcoded credentials are utilized in the Login component, presenting an easy target for attackers seeking unauthorized access.
#### Risks
Insecurely stored credentials can be easily extracted by attackers, granting them unauthorized access to user accounts and potentially compromising sensitive data stored within the application.

## Security Measures

### a. Sensitive Data Storage
```javascript
// Is important to use appropriate encryption techniques and secure storage methods for sensitive data
const securelyStoreUserData = async (userData) => {
  try {
    const encryptedUserData = encryptData(JSON.stringify(userData), ENCRYPTION_KEY);
    await AsyncStorage.setItem("userData", encryptedUserData);
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};
```

### b. Secure Authentication
```javascript
// Implementation of secure authentication practices such as hashed passwords and salted hashing
// Example: Hash user passwords before storing them and compare hashed passwords during login
const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};
```

### c. Input Validation and Sanitization
```javascript
// Implementation of proper input validation to prevent code injection and unexpected data
// Example: Use a library like mathjs to evaluate mathematical expressions securely
import math from "mathjs";
function evaluateEquation() {
  try {
    const result = math.evaluate(props.text);
    Alert.alert("Result", "Result: " + result);
  } catch (error) {
    Alert.alert("Error", "Invalid equation");
  }
}
```

### d. Rectify Insecure Code Practices
```javascript
// Its important to avoid insecure code practices such as using hardcoded credentials
// Example: Remove hardcoded credentials and use secure authentication methods
const users = [
  { username: "joe", password: hashPassword("secret") },
  { username: "bob", password: hashPassword("password") },
];
```
## Importance of Security Measures
Implementing these security measures is crucial for safeguarding user data and preventing unauthorized access or malicious attacks. Proper encryption, secure authentication, input validation, and adherence to secure coding practices help mitigate the risk of data breaches, unauthorized access, and other security threats.

## Lessons Learned and Best Practices
Through this process, I've learned the importance of prioritizing security in software development. Moving forward, I will continue to:

- Regularly assess and update security measures to address emerging threats.
- Follow secure coding practices and utilize industry-standard security tools and libraries.
- By implementing these best practices, I aim to enhance the overall security posture of any applications I built to protect user data from potential risks and vulnerabilities.

## References
[1] X. Xiao, R. Yan, R. Ye, Q. Li, S. Peng and Y. Jiang, "Detection and Prevention of Code Injection Attacks on HTML5-Based Apps," 2015 Third International Conference on Advanced Cloud and Big Data, Yangzhou, China, 2015, pp. 254-261, doi: 10.1109/CBD.2015.48.
keywords: {Encoding;HTML;Feature extraction;Smart phones;Big data;Mobile applications;code injection;classification algorithm;machine learning;access control model;filter}

[2]H. Liu and H. B. Kuan Tan, "An Approach to Aid the Understanding and Maintenance of Input Validation," 2006 22nd IEEE International Conference on Software Maintenance, Philadelphia, PA, USA, 2006, pp. 370-379, doi: 10.1109/ICSM.2006.12.
keywords: {Software systems;Prototypes;Automatic control;Programming profession;Application software;Flow graphs;Databases;Software prototyping;Control systems;Guidelines},
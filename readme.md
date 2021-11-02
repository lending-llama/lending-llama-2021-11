# Set up

## Prerequisites
Install tools
* see `.tool-versions` – or use [asdf](https://asdf-vm.com/) directly 😉

Install dependencies
```
> cd <project dir>
> npm install
> cd frontend
> npm install
```
(No backend here; Gradle is clever enough to install dependencies by itself.)

## Run tests
```
> cd <project dir>
> npm run test
```

## See the app in action
```
> cd <project dir>
> npm run dev
```

Goto http://localhost:8081/


## IDE setup

Open project dir in IntelliJ IDEA
* When IDEA asks "Gradle build script found", click "Load"

Run tests. Use existing run configurations: 
"all tests" = "all backend tests" + "all frontend tests"

### Automatically restart backend on changes  
IntelliJ Settings: _Actions on Save_ > _Build project_
Make a backend change → see that it restarts automatically

---

### In case of problems with Java

Check project-specific settings
* Right-click on project ("lending-llama")  
* 'Open Module Settings'  
* Check 'Project' > 'Project SDK'

Check Gradle execution settings
* IntelliJ Settings 
* Build, Execution, Deployment > Build Tools > Gradle
* Gradle JVM → Project SDK

---

# Choices

Choices:
* npm over yarn
  * npm is on-board after installing Node.js
* Java _11 Zulu_
  * Even though slightly outdated, it’s default for client. Therefore, less risk of incompatibilities.
  * Client seems to be using SDKMAN + Zulu.
    SDKMAN is not an option; it provides no Node.   
    SDKMAN and asdf versioning for Zulu differ! SDKMAN gives the underlying OpenJDK version; whereas asdf the Zulu version (cp https://www.azul.com/downloads/?version=java-11-lts&package=jdk). 

---

# Clone for training

* Clone
* Modify target repository for Monitoror

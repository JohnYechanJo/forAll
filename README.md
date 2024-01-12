# ForAll

Welcome to the repository of  [**For All**](https://www.instagram.com/for.all_official/)'s project

## Installation and Usage

1. **Clone the Project**:
   Use Git to clone the project repository to your local machine.

   ```bash
   git clone <project git url>
   ```

2. **Navigate to the Project Directory**:
   Change to the project's root directory.

   ```bash
   cd forAll
   ```

3. **Configure Application Settings**:
   Place the `application.yml` file in the `src/main/resources` directory. You should check 1. port number 2. username 3. password

4. **Start the Application**:
   Use the Gradle wrapper to run the application. For Windows, use `gradlew.bat` instead of `./gradlew`.

   ```bash
   ./gradlew bootRun
   ```

5. **Access the Web Interface**:
   Open your browser and visit `http://localhost:8080/` to view the application.

## Branch and Commit Rule

1. **Branch Naming Convention**:
   Branches in this repository should be named after the respective functions or features they are associated with.
   Each branch should be created before starting work on a specific function or feature.

   ### Example:
   ```
   feature/customer-input
   ```

2. **Commit Message Convention**:
   
   Commit Message Format:
   ```
   [Date Author] Commit Message
   ```

   ### Example:
   ```
   [12.30 승범] 고객 정보입력 모델 구현
   ```



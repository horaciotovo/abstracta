## Repository Installation

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This installs:

- Playwright and browser drivers
- Allure test reporting tools
- ESLint for code quality
- TypeScript and related dependencies

### Step 3: Configure Environment

Copy the example environment file and configure for your environment:

```bash
# The repository includes pre-configured environment files:
# - .env.qa (QA environment)
# - .env.stg (Staging environment)
```

For local testing, create a `.env.local` file to override defaults:

```bash
# .env.local
ENVIRONMENT=qa
BASE_URL=https://your-qa-environment.com
TEST_USERNAME=your-test-username
TEST_PASSWORD=your-test-password
HEADLESS=false
```

For environment configuration details, see [ENV_SETUP.md](ENV_SETUP.md).

## Test Execution

### Run Tests for QA Environment

Execute all tests against the QA environment:

```bash
npm run test:qa
```

This command:

- Sets `ENVIRONMENT=qa`
- Runs Playwright tests with Chromium browser
- Generates test results with Allure integration
- Creates detailed reports in `allure-results/` directory

### Run Tests for STG Environment

Execute all tests against the Staging environment:

```bash
npm run test:stg
```

This command:

- Sets `ENVIRONMENT=stg`
- Runs Playwright tests with Chromium browser
- Generates test results with Allure integration
- Creates detailed reports in `allure-results/` directory

### Run Tests Locally (Development)

For local development and debugging:

```bash
# Run tests in headed mode (see browser)
npm run test
```

This uses the default QA environment and runs Playwright in headed mode.

### Run Specific Test Suites

Run tests from a specific folder or file:

```bash
# Run only authentication tests
npx playwright test tests/auth/

# Run only a specific test file
npx playwright test tests/auth/login.spec.ts

# Run tests matching a pattern
npx playwright test --grep "login"
```

````

For more options, see [Playwright CLI documentation](https://playwright.dev/docs/test-cli).

### View Available Test Cases

See [TEST_CASES.md](TEST_CASES.md) for a comprehensive list of all test cases, specifications, and expected results.

## Allure Report Generation

### Generate Allure Report

After running tests, generate a comprehensive Allure report:

```bash
npm run allure:generate
````

This command:

- Processes test results from `allure-results/` directory
- Generates static HTML report in `allure-report/` directory
- Includes test statistics, timelines, and detailed failure analysis
- Cleans previous reports and creates fresh output

### View Allure Report in Browser

Serve the generated Allure report and open it in your browser:

```bash
npm run allure:report
```

This command:

- Serves the Allure report on a local server
- Automatically opens the report in your default browser
- Provides interactive exploration of test results

The report includes:

- **Overview** - Test execution summary, pass/fail rates, duration
- **Test Cases** - Detailed results for each test with failure reasons
- **Trends** - Historical data on test performance and stability
- **Categories** - Test failures grouped by type
- **Timeline** - Chronological view of test execution

### Full QA Test Cycle

Complete workflow for running tests and generating reports:

**For QA Environment:**

```bash
# Run all tests
npm run test:qa

# Generate report
npm run allure:generate

# View report in browser
npm run allure:report
```

**For STG Environment:**

```bash
# Run all tests
npm run test:stg

# Generate report
npm run allure:generate

# View report in browser
npm run allure:report
```

### Clean Up Test Results

To remove old test results and start fresh:

```bash
# Remove test results
rm -r allure-results/

# Or on Windows PowerShell
Remove-Item -Recurse allure-results/
```

<div style="background-color: #bbdefb; border: 2px solid #1976d2; border-radius: 8px; padding: 20px; margin: 20px 0;">

## Code Quality

### Run ESLint

This repository uses ESLint to enforce code quality and consistency. Before committing code, run the linter to check for issues:

**Check for linting errors:**

```bash
npm run lint
```

**Fix linting errors automatically:**

```bash
npm run lint:fix
```

ESLint is configured to enforce:

- TypeScript best practices and strict type checking
- No usage of `any` type without proper justification
- Explicit function return types
- No unused variables
- Consistent naming conventions and code style

Run linting as part of your local development workflow and ensure all tests pass before submitting pull requests.

## Parallelization Applied

This repository implements a comprehensive multi-level parallelization strategy to optimize test execution performance and resource efficiency.

### Strategy Overview

**1. Full Test Parallelization**

- `fullyParallel: true` - All tests run in parallel by default across multiple workers
- Tests are distributed automatically across available CPU cores for faster execution
- Each test file runs independently without blocking others

**2. Worker Pool Management**

- **Both Local and CI Environments**: `workers: 2` - Uses 2 concurrent workers for efficient parallel test execution across all environments
- Balances performance with resource utilization to ensure tests complete quickly without overwhelming system resources

**3. Retry Strategy**

- **Local Development**: No retries (`retries: 0`) - Immediate feedback for faster debugging and development iteration
- **CI Environment**: 2 retries (`retries: 2`) - Transient failures are automatically retried to improve CI stability and reduce flaky test noise

**4. Browser Project Parallelization**
The configuration supports running tests across multiple browsers simultaneously:

- **Chromium** - Primary browser for testing modern web applications
- **Firefox** - Alternative browser for cross-browser validation
- **WebKit** - Safari compatibility testing

Each browser project runs in parallel when configured, allowing comprehensive cross-browser coverage without sequential overhead.

**5. Trace and Media Management**
To support efficient parallel execution and minimize resource overhead:

- `trace: 'retain-on-failure'` - Captures detailed execution traces only when tests fail, reducing storage overhead
- `video: 'retain-on-failure'` - Records video only for failed tests to aid in debugging
- `screenshot: 'only-on-failure'` - Captures screenshots only on failure to minimize disk I/O during parallel test runs

### Performance Benefits

- **Faster Local Development**: 2-worker parallelization reduces test suite execution time efficiently compared to serial execution
- **CI/CD Performance**: 2-worker configuration maintains performance while ensuring reproducible results in CI environments
- **Cross-Browser Coverage**: Parallel project execution enables comprehensive browser testing without sequential overhead
- **Optimized Resource Usage**: Failure-based trace and media collection reduces storage and memory requirements during parallel execution

###

Shards were not applied due to the amount of test are not significant to implement it.

### Running Parallel Tests

All test commands automatically use the parallelization configuration:

```bash
# Runs with 2 workers locally
npm run test

# Runs with 2 workers locally (QA environment)
npm run test:qa

# Runs with 2 workers locally (STG environment)
npm run test:stg

# In CI, automatically uses 2 workers with 2 retries
# (triggered by CI environment variable detection)
```

For detailed configuration, see [playwright.config.ts](playwright.config.ts).

## Parallelization Benefits for Multibrowsers

The following table compares test execution performance across different parallelization configurations when running tests across all three browsers (Chromium, Firefox, and WebKit):

| Metric                   | 1 Worker (Sequential)                | 2 Workers (Parallel)                | 3 Workers (Parallel)                | Best Performance     |
| ------------------------ | ------------------------------------ | ----------------------------------- | ----------------------------------- | -------------------- |
| **Configuration**        | `fullyParallel: false`, `workers: 1` | `fullyParallel: true`, `workers: 2` | `fullyParallel: true`, `workers: 3` | 2 Workers            |
| **Total Execution Time** | 3.0 minutes (180s)                   | 2.3 minutes (138s)                  | 2.5 minutes (150s)                  | **2.3m** ⚡          |
| **Tests Passed**         | 23                                   | 22                                  | 15                                  | —                    |
| **Tests Failed**         | 1                                    | 2                                   | 9                                   | —                    |
| **Browsers Tested**      | Chromium, Firefox, WebKit            | Chromium, Firefox, WebKit           | Chromium, Firefox, WebKit           | —                    |
| **Concurrency Level**    | Sequential (1x)                      | 2x Parallel                         | 3x Parallel                         | **2x optimal** 🎯    |
| **Time vs Sequential**   | Baseline                             | -23% (42s saved)                    | -17% (30s saved)                    | **42 seconds saved** |
| **Throughput**           | ~7-8s/test                           | ~5-6s/test                          | ~10s/test\*                         | —                    |

### Performance Comparison

#### Time Reduction

- **2 Workers vs Sequential**: 23.3% faster (saves 42 seconds)
- **3 Workers vs Sequential**: 16.7% faster (saves 30 seconds)
- **2 Workers vs 3 Workers**: 8% faster (saves 12 seconds)

#### Scalability Analysis

- **1→2 Workers**: 42 second improvement with stable test results ✅
- **2→3 Workers**: Performance regression observed - increased failures and timing issues ⚠️
- **Optimal Configuration**: 2 workers provides best balance of speed and stability
- **Note**: 3-worker configuration shows instability with resource contention causing timing-related test failures

### Key Insights

- **23.3% Time Reduction (Recommended)**: 2-worker configuration reduces execution time from 3.0 to 2.3 minutes with high stability (22 passed, 2 failed)
- **Parallel Efficiency with 2 Workers**: Optimal sweet spot for this test suite - maintains reliability while achieving significant speed gains
- **3-Worker Limitations**: While theoretically faster, 3 workers introduces resource contention causing:
  - 9 test failures (vs 2 with 2 workers)
  - Increased execution time to 2.5 minutes
  - Timing-sensitive test failures (navigation delays, element visibility timeouts)
- **Daily Impact (10 runs/day)**:
  - 2 Workers: Saves ~7 minutes daily with reliable results
  - 3 Workers: Creates instability with frequent test flakiness
- **CI/CD Benefits**: 2-worker configuration provides reliable automation without excessive resource overhead
- **Resource Tradeoff**: 2 workers uses minimal resources while maintaining excellent performance and test stability

### Performance Methodology

Results were captured by:

1. Running the complete test suite with `fullyParallel: false` and `workers: 1` (sequential baseline)
2. Running the complete test suite with `fullyParallel: true` and `workers: 2` (2x parallelization)
3. Running the complete test suite with `fullyParallel: true` and `workers: 3` (3x parallelization with latest code changes)
4. Recording total execution times, test outcomes, and calculating improvement percentages

### Recommendation

**Use 2 workers for optimal performance and stability** - The 2-worker configuration provides the best balance of execution speed (2.3 minutes, 23% faster than sequential) while maintaining high test reliability (22 passed, 2 failed). While 3 workers was initially faster in previous runs, the latest code changes have introduced timing-sensitive issues that cause resource contention and increased test failures at higher worker counts.

**Findings**

With the latest code changes, performance issues were detected when using 3 workers:

- **9 test failures** at 3-worker concurrency (vs 2 at 2 workers)
- **Navigation delays**: After clicking login button, redirect to profile page takes longer than expected
- **Element visibility timeout**: Welcome link not displayed within 5000ms threshold
- **Cart reload lag**: Cart list reload after deleting a product takes more time, causing test timeouts
- **Resource contention**: High concurrency (3 workers) exacerbates timing-sensitive issues in the application

**Recommendation**: Use 2-worker configuration with latest changes until application-level timing issues are resolved.

## Pipeline CI/CD

### GitHub Actions Automation

A GitHub Actions pipeline is implemented to automate test execution and report generation. The pipeline is configured to trigger automatically on every push to the repository.

**Pipeline Details:**

- **Trigger**: Pipeline executes automatically after each push
- **Repository**: [abstracta Actions](https://github.com/horaciotovo/abstracta/actions)
- **Workflow Reports**: Test results and reports are generated and linked in the workflow summary

**Available Reports in Summary:**

The workflow summary provides direct links to:

- **Playwright HTML Report** - Detailed test execution results with timeline and error details
- **Allure Report** - Comprehensive test metrics, statistics, and historical trend analysis

These reports allow you to quickly review test outcomes, identify failures, and track test quality over time without local setup.

## Executive Report

### Overview

The Executive Report provides a comprehensive analysis and summary of test execution results, designed for both technical and non-technical stakeholders.

### Report Generation Process

The executive summary report is generated using an AI-powered analysis workflow:

1. **Prompt Template** - [executive-summary.prompt.md](executive-report/executive-summary.prompt.md)
   - Defines the analysis framework and requirements
   - Specifies structured output format for executive-level findings
   - Establishes criteria for severity assessment and recommendations

2. **Data Source** - Allure Test Results
   - Raw test execution data from `allure-results/` directory
   - Includes test logs, screenshots, timelines, and failure details
   - Contains comprehensive metadata on test runs and outcomes

3. **Analysis** - AI-Powered Processing
   - Processes test results against the executive summary template
   - Identifies patterns, root causes, and trends
   - Generates actionable recommendations prioritized by impact

4. **Output** - [TEST_EXECUTION_SUMMARY.html](executive-report/TEST_EXECUTION_SUMMARY.html)
   - Professional HTML report with interactive styling
   - Includes execution overview, failure analysis, and recommendations
   - Exported as PDF for distribution to stakeholders

### Report Contents

The Executive Report includes:

- **Execution Overview** - Total tests, pass rates, and overall status
- **Failed Tests Analysis** - Detailed breakdown of failures with root causes
- **Detected Patterns** - Common trends and recurring issues
- **Root Cause Analysis** - Assessment across product, framework, infrastructure, and data dimensions
- **Actionable Recommendations** - Prioritized actions (Immediate, Preventive, Framework, Pipeline improvements)
- **Executive Conclusion** - Summary for technical and non-technical stakeholders
- **Feature-Level Summary** - Test results broken down by application feature

### Accessing the Report

- **HTML Format**: [executive-report/TEST_EXECUTION_SUMMARY.html](executive-report/TEST_EXECUTION_SUMMARY.html)
- **PDF Format**: Generated and exported from the HTML report for stakeholder distribution

### Workflow Example

```bash
# 1. Run tests and generate Allure results
npm run test:qa

# 2. Generate Allure HTML report
npm run allure:generate

# 3. Execute the prompt analysis on allure-results
# This processes the results using executive-summary.prompt.md
# and generates TEST_EXECUTION_SUMMARY.html

# 4. Export as PDF (if needed)
# The HTML report can be printed/exported to PDF from the browser
```

This approach ensures stakeholders receive clear, actionable insights into test quality and application stability without requiring technical knowledge of test automation frameworks.
